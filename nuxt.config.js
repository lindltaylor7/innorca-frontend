export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Ventana Menorca',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: 'Accede a la información de tus inmuebles sin salir de casa, de una manera segura y accesible desde tu computador o dispositivo móvil.',
            },
            { hid: 'og:type', property: 'og:type', content: 'website' },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Ventana Menorca',
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: 'Accede a la información de tus inmuebles sin salir de casa, de una manera segura y accesible desde tu computador o dispositivo móvil.',
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: 'https://ventana.menorca.pe/og-fb.jpg',
            },
            { property: 'og:image:width', content: '1440' },
            { property: 'og:image:height', content: '800' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
            { name: 'apple-mobile-web-app-title', content: 'Ventana Menorca' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
        manifest: {
            name: 'test',
            lang: 'ja',
            // 'display':'standalone',
            title: 'test',
            'og:title': 'test',
            description: 'test',
            'og:description': 'test',
            theme_color: '#FFFFFF',
            background_color: '#FFFFFF',
            start_url: `./`,
            short_name: 'test',
            icons: [{
                src: `icon.png`,
                size: '144x144',
                type: 'image/png',
            },
            {
                src: `apple-touch-icon.png`,
                size: '128x128',
                type: 'image/png',
            },
            {
                src: `apple-touch-icon.png`,
                size: '152x152',
                type: 'image/png',
            },
            {
                src: `apple-touch-icon.png`,
                size: '180x180',
                type: 'image/png',
            },
            {
                src: `apple-touch-icon.png`,
                size: '192x192',
                type: 'image/png',
            },
            {
                src: `apple-touch-icon.png`,
                size: '256x256',
                type: 'image/png',
            },
            ],
        },
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/scss/style.scss'],

    env: {
        API_URL: process.env.API_URL,
        FILE_URL: process.env.FILE_URL,
        AZURE_APP_ID: process.env.AZURE_APP_ID
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/mixin.js',
        '@/plugins/filters.js',
        { src: '~/plugins/gMap.js', ssr: true },
        { src: '~/plugins/axios.js', ssr: false },
        { src: '~/plugins/recaptcha.js', ssr: false },
        { src: '@/plugins/idle-vue', ssr: false },
        { src: '@/plugins/gtm.js', ssr: true },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ['@nuxtjs/moment'],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        'nuxt-vuex-localstorage',
        '@nuxtjs/gtm', [
            'nuxt-fontawesome',
            {
                imports: [{
                    set: '@fortawesome/free-solid-svg-icons',
                    icons: ['fas'],
                },
                {
                    set: '@fortawesome/free-brands-svg-icons',
                    icons: ['fab'],
                },
                {
                    set: '@fortawesome/free-regular-svg-icons',
                    icons: ['far'],
                },
                ],
            },
        ],
    ],

    moment: {
        defaultTimezone: 'America/Lima',
        locales: ['es'],
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            name: 'Ventana Menorca',
            short_name: 'Ventana Menorca',
            lang: 'es',
            background_color: '#158a2f',
            // icons: [
            // 	{
            // 		src: 'icon.png',
            // 	},
            // ],
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [/^vue2-google-maps($|\/)/],
        babel: {
            compact: true,
        },
    },

    router: {
        base: process.env.NUXT_BASE_URL,
        //base: '/',
        /*scrollBehavior(to) {
          if (to.hash) {
            return window.scrollTo({
              top: document.querySelector(to.hash).offsetTop + window.innerHeight,
              behavior: 'smooth'
            })
          }
          return window.scrollTo({ top: 0, behavior: 'smooth' })
        }*/
    },

    server: {
        port: 3030, //8005
    },

    gtm: {
        enabled: true,
        id: 'GTM-T69LKP7',
    },
};
