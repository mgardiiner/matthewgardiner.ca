<template>
  <div
    class="min-h-screen bg-slate-950 text-slate-100 [--accent:#22d3ee] [--accent2:#a78bfa]"
  >
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

