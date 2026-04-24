import { readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative, sep, normalize } from 'node:path'
import Components from 'unplugin-vue-components/vite'

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Turn an absolute path into a regex fragment that matches both / and \
// and also matches inside Vite ids like "/@fs/<abs path>?..."
function absPathToIdFragment(absPath: string) {
  const norm = normalize(absPath).replace(/\\/g, '/') // normalize to forward slashes
  const escaped = escapeRegExp(norm)
  return escaped.replace(/\//g, '[\\\\/]')
}

function getPageDirsRecursive(base: string) {
  const out: string[] = []
  for (const name of readdirSync(base)) {
    const full = join(base, name)
    if (!statSync(full).isDirectory()) continue
    if (name === 'components') continue
    out.push(full)
    out.push(...getPageDirsRecursive(full))
  }
  return out
}

function depthFromPagesRoot(pagesRootAbs: string, dirAbs: string) {
  const rel = relative(pagesRootAbs, dirAbs)
  if (!rel || rel === '.') return 0
  return rel.split(sep).filter(Boolean).length
}

export default defineNuxtConfig({
  srcDir: 'app/',
  ssr: false,
  nitro: { preset: 'github-pages' },
  app: {
    baseURL: '/',
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/base.css'],

  modules: ['@nuxtjs/tailwindcss'],

  // Global shared components only
  components: [{ path: '~/components', pathPrefix: false }],

  vite: {
    plugins: (() => {
      const pagesRootAbs = join(process.cwd(), 'app/pages')

      // Only create plugins for folders that actually have a /components folder
      const pageDirsWithComponents = getPageDirsRecursive(pagesRootAbs)
        .filter((d) => existsSync(join(d, 'components')))
        // IMPORTANT: run deepest folders first so nested wins over parent
        .sort((a, b) => depthFromPagesRoot(pagesRootAbs, b) - depthFromPagesRoot(pagesRootAbs, a))

      return pageDirsWithComponents.map((pageDirAbs) => {
        const componentsDirAbs = join(pageDirAbs, 'components')
        const depth = depthFromPagesRoot(pagesRootAbs, pageDirAbs)

        const frag = absPathToIdFragment(pageDirAbs)

        // Matches Vite ids that contain the absolute folder path, with optional "/@fs/"
        // and optional query params
        const topLevelSubtree = new RegExp(`(?:^|.*)(?:\\/\\@fs\\/)?${frag}[\\\\/].*\\.vue(?:\\?.*)?$`)
        const folderOnly = new RegExp(`(?:^|.*)(?:\\/\\@fs\\/)?${frag}[\\\\/][^\\\\/]+\\.vue(?:\\?.*)?$`)

        return Components({
          dirs: [componentsDirAbs],
          deep: true,
          include: [depth === 1 ? topLevelSubtree : folderOnly],
        })
      })
    })(),
  },
})