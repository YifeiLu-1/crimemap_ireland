// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'Crimemap in Ireland',
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'A website which visuliaze crimes in Ireland' }
      ],
      htmlAttrs: {
        lang: 'en'
      },
      script: [
        // <script src="https://myawesome-lib.js"></script>
        { src: 'https://kit.fontawesome.com/6cd24b40c3.js' },
        { src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js' },
        { src: 'https://unpkg.com/leaflet@1.9.2/dist/leaflet.js' },
        { src: 'https://kit.fontawesome.com/6cd24b40c3.js' },
        { src: 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster-src.js' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;900&family=Ubuntu:wght@300;400;700&display=swap' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.2/dist/leaflet.css' },
        { rel: 'stylesheet', href: 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css' },
        { rel: 'stylesheet', href: 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css' }
      ]
    }
  },
  css: [
    // CSS file in the project
    '@/style.css'
  ]
})
