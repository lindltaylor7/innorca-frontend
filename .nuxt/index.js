import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_bootstrapvue_daf7bbfe from 'nuxt_plugin_bootstrapvue_daf7bbfe' // Source: .\\bootstrap-vue.js (mode: 'all')
import nuxt_plugin_templatesplugine5fb72f8_c08f88ae from 'nuxt_plugin_templatesplugine5fb72f8_c08f88ae' // Source: .\\templates.plugin.e5fb72f8.js (mode: 'all')
import nuxt_plugin_gtm_80356db0 from 'nuxt_plugin_gtm_80356db0' // Source: .\\gtm.js (mode: 'all')
import nuxt_plugin_nuxtvuexlocalstorage_464acbc5 from 'nuxt_plugin_nuxtvuexlocalstorage_464acbc5' // Source: .\\nuxt-vuex-localstorage.js (mode: 'client')
import nuxt_plugin_workbox_40277e6e from 'nuxt_plugin_workbox_40277e6e' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_1a1c24ee from 'nuxt_plugin_metaplugin_1a1c24ee' // Source: .\\pwa\\meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_1ec3ca62 from 'nuxt_plugin_iconplugin_1ec3ca62' // Source: .\\pwa\\icon.plugin.js (mode: 'all')
import nuxt_plugin_axios_8665945c from 'nuxt_plugin_axios_8665945c' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_moment_28f5d3f4 from 'nuxt_plugin_moment_28f5d3f4' // Source: .\\moment.js (mode: 'all')
import nuxt_plugin_mixin_17d0d3ca from 'nuxt_plugin_mixin_17d0d3ca' // Source: ..\\plugins\\mixin.js (mode: 'all')
import nuxt_plugin_filters_14a52510 from 'nuxt_plugin_filters_14a52510' // Source: ..\\plugins\\filters.js (mode: 'all')
import nuxt_plugin_gMap_8f3e83a8 from 'nuxt_plugin_gMap_8f3e83a8' // Source: ..\\plugins\\gMap.js (mode: 'all')
import nuxt_plugin_axios_5659d192 from 'nuxt_plugin_axios_5659d192' // Source: ..\\plugins\\axios.js (mode: 'client')
import nuxt_plugin_recaptcha_4dc33226 from 'nuxt_plugin_recaptcha_4dc33226' // Source: ..\\plugins\\recaptcha.js (mode: 'client')
import nuxt_plugin_idlevue_5afdf601 from 'nuxt_plugin_idlevue_5afdf601' // Source: ..\\plugins\\idle-vue (mode: 'client')
import nuxt_plugin_gtm_2cfa83cb from 'nuxt_plugin_gtm_2cfa83cb' // Source: ..\\plugins\\gtm.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Ventana Menorca","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Accede a la información de tus inmuebles sin salir de casa, de una manera segura y accesible desde tu computador o dispositivo móvil."},{"hid":"og:type","property":"og:type","content":"website"},{"hid":"og:title","property":"og:title","content":"Ventana Menorca"},{"hid":"og:description","property":"og:description","content":"Accede a la información de tus inmuebles sin salir de casa, de una manera segura y accesible desde tu computador o dispositivo móvil."},{"hid":"og:image","property":"og:image","content":"https:\u002F\u002Fventana.menorca.pe\u002Fog-fb.jpg"},{"property":"og:image:width","content":"1440"},{"property":"og:image:height","content":"800"},{"name":"format-detection","content":"telephone=no"},{"name":"apple-mobile-web-app-capable","content":"yes"},{"name":"apple-mobile-web-app-status-bar-style","content":"black"},{"name":"apple-mobile-web-app-title","content":"Ventana Menorca"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"favicon.ico"}],"manifest":{"name":"test","lang":"ja","title":"test","og:title":"test","description":"test","og:description":"test","theme_color":"#FFFFFF","background_color":"#FFFFFF","start_url":".\u002F","short_name":"test","icons":[{"src":"icon.png","size":"144x144","type":"image\u002Fpng"},{"src":"apple-touch-icon.png","size":"128x128","type":"image\u002Fpng"},{"src":"apple-touch-icon.png","size":"152x152","type":"image\u002Fpng"},{"src":"apple-touch-icon.png","size":"180x180","type":"image\u002Fpng"},{"src":"apple-touch-icon.png","size":"192x192","type":"image\u002Fpng"},{"src":"apple-touch-icon.png","size":"256x256","type":"image\u002Fpng"}]},"style":[],"script":[{"hid":"gtm-script","innerHTML":"if(!window._gtm_init){window._gtm_init=1;(function(w,n,d,m,e,p){w[d]=(w[d]==1||n[d]=='yes'||n[d]==1||n[m]==1||(w[e]&&w[e][p]&&w[e][p]()))?1:0})(window,navigator,'doNotTrack','msDoNotTrack','external','msTrackingProtectionEnabled');(function(w,d,s,l,x,y){w[x]={};w._gtm_inject=function(i){if(w.doNotTrack||w[x][i])return;w[x][i]=1;w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https:\u002F\u002Fwww.googletagmanager.com\u002Fgtm.js?id='+i;f.parentNode.insertBefore(j,f);};w[y]('GTM-T69LKP7')})(window,document,'script','dataLayer','_gtm_ids','_gtm_inject')}"}],"noscript":[{"hid":"gtm-noscript","pbody":true,"innerHTML":"\u003Ciframe src=\"https:\u002F\u002Fwww.googletagmanager.com\u002Fns.html?id=GTM-T69LKP7&\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\" title=\"gtm\"\u003E\u003C\u002Fiframe\u003E"}],"__dangerouslyDisableSanitizersByTagID":{"gtm-script":["innerHTML"],"gtm-noscript":["innerHTML"]}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_bootstrapvue_daf7bbfe === 'function') {
    await nuxt_plugin_bootstrapvue_daf7bbfe(app.context, inject)
  }

  if (typeof nuxt_plugin_templatesplugine5fb72f8_c08f88ae === 'function') {
    await nuxt_plugin_templatesplugine5fb72f8_c08f88ae(app.context, inject)
  }

  if (typeof nuxt_plugin_gtm_80356db0 === 'function') {
    await nuxt_plugin_gtm_80356db0(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_nuxtvuexlocalstorage_464acbc5 === 'function') {
    await nuxt_plugin_nuxtvuexlocalstorage_464acbc5(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_40277e6e === 'function') {
    await nuxt_plugin_workbox_40277e6e(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_1a1c24ee === 'function') {
    await nuxt_plugin_metaplugin_1a1c24ee(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_1ec3ca62 === 'function') {
    await nuxt_plugin_iconplugin_1ec3ca62(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_8665945c === 'function') {
    await nuxt_plugin_axios_8665945c(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_28f5d3f4 === 'function') {
    await nuxt_plugin_moment_28f5d3f4(app.context, inject)
  }

  if (typeof nuxt_plugin_mixin_17d0d3ca === 'function') {
    await nuxt_plugin_mixin_17d0d3ca(app.context, inject)
  }

  if (typeof nuxt_plugin_filters_14a52510 === 'function') {
    await nuxt_plugin_filters_14a52510(app.context, inject)
  }

  if (typeof nuxt_plugin_gMap_8f3e83a8 === 'function') {
    await nuxt_plugin_gMap_8f3e83a8(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_axios_5659d192 === 'function') {
    await nuxt_plugin_axios_5659d192(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_recaptcha_4dc33226 === 'function') {
    await nuxt_plugin_recaptcha_4dc33226(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_idlevue_5afdf601 === 'function') {
    await nuxt_plugin_idlevue_5afdf601(app.context, inject)
  }

  if (typeof nuxt_plugin_gtm_2cfa83cb === 'function') {
    await nuxt_plugin_gtm_2cfa83cb(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
