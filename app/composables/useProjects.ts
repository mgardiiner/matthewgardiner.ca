// composables/useProjects.ts
export function useProjects() {
  const projects = [
    {
      slug: 'trendhunter-dashboard',
      title: 'Trend Hunter Dashboard',
      description: 'Internal tooling for insight tracking.',
      url: 'https://trendhunter.com/...' // if public
    },
    // add more here
  ]

  function getBySlug(slug: string) {
    return { project: projects.find(p => p.slug === slug) || null }
  }

  return { projects, getBySlug }
}
