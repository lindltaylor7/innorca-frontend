import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _219f5a64 = () => interopDefault(import('..\\pages\\atencion-al-cliente\\index.vue' /* webpackChunkName: "pages/atencion-al-cliente/index" */))
const _130a9cbc = () => interopDefault(import('..\\pages\\construcciones\\index.vue' /* webpackChunkName: "pages/construcciones/index" */))
const _863e3032 = () => interopDefault(import('..\\pages\\inicio\\index.vue' /* webpackChunkName: "pages/inicio/index" */))
const _1f6ae31f = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _62656beb = () => interopDefault(import('..\\pages\\mi-perfil\\index.vue' /* webpackChunkName: "pages/mi-perfil/index" */))
const _57a4b8ee = () => interopDefault(import('..\\pages\\mis-inmuebles\\index.vue' /* webpackChunkName: "pages/mis-inmuebles/index" */))
const _6e5216a4 = () => interopDefault(import('..\\pages\\mis-pagos\\index.vue' /* webpackChunkName: "pages/mis-pagos/index" */))
const _0254e3bf = () => interopDefault(import('..\\pages\\mis-referidos\\index.vue' /* webpackChunkName: "pages/mis-referidos/index" */))
const _df34a3c4 = () => interopDefault(import('..\\pages\\noticias\\index.vue' /* webpackChunkName: "pages/noticias/index" */))
const _4397e8ba = () => interopDefault(import('..\\pages\\preguntas-frecuentes\\index.vue' /* webpackChunkName: "pages/preguntas-frecuentes/index" */))
const _0cc7c8c2 = () => interopDefault(import('..\\pages\\recuperar-contrasena\\index.vue' /* webpackChunkName: "pages/recuperar-contrasena/index" */))
const _9b5df158 = () => interopDefault(import('..\\pages\\signup\\index.vue' /* webpackChunkName: "pages/signup/index" */))
const _a35fda2a = () => interopDefault(import('..\\pages\\construcciones\\nueva-cotizacion\\index.vue' /* webpackChunkName: "pages/construcciones/nueva-cotizacion/index" */))
const _2bc04e1a = () => interopDefault(import('..\\pages\\mi-perfil\\cambio-contrasena.vue' /* webpackChunkName: "pages/mi-perfil/cambio-contrasena" */))
const _3d70a1fe = () => interopDefault(import('..\\pages\\atencion-al-cliente\\detalle\\_id.vue' /* webpackChunkName: "pages/atencion-al-cliente/detalle/_id" */))
const _2c1a3292 = () => interopDefault(import('..\\pages\\construcciones\\cotizacion\\_id.vue' /* webpackChunkName: "pages/construcciones/cotizacion/_id" */))
const _bf4d2e34 = () => interopDefault(import('..\\pages\\noticias\\post\\_id.vue' /* webpackChunkName: "pages/noticias/post/_id" */))
const _7a943568 = () => interopDefault(import('..\\pages\\recuperar-contrasena\\generar\\_id.vue' /* webpackChunkName: "pages/recuperar-contrasena/generar/_id" */))
const _26e94311 = () => interopDefault(import('..\\pages\\completar-registro\\_id.vue' /* webpackChunkName: "pages/completar-registro/_id" */))
const _06fc54ec = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/atencion-al-cliente",
    component: _219f5a64,
    name: "atencion-al-cliente"
  }, {
    path: "/construcciones",
    component: _130a9cbc,
    name: "construcciones"
  }, {
    path: "/inicio",
    component: _863e3032,
    name: "inicio"
  }, {
    path: "/login",
    component: _1f6ae31f,
    name: "login"
  }, {
    path: "/mi-perfil",
    component: _62656beb,
    name: "mi-perfil"
  }, {
    path: "/mis-inmuebles",
    component: _57a4b8ee,
    name: "mis-inmuebles"
  }, {
    path: "/mis-pagos",
    component: _6e5216a4,
    name: "mis-pagos"
  }, {
    path: "/mis-referidos",
    component: _0254e3bf,
    name: "mis-referidos"
  }, {
    path: "/noticias",
    component: _df34a3c4,
    name: "noticias"
  }, {
    path: "/preguntas-frecuentes",
    component: _4397e8ba,
    name: "preguntas-frecuentes"
  }, {
    path: "/recuperar-contrasena",
    component: _0cc7c8c2,
    name: "recuperar-contrasena"
  }, {
    path: "/signup",
    component: _9b5df158,
    name: "signup"
  }, {
    path: "/construcciones/nueva-cotizacion",
    component: _a35fda2a,
    name: "construcciones-nueva-cotizacion"
  }, {
    path: "/mi-perfil/cambio-contrasena",
    component: _2bc04e1a,
    name: "mi-perfil-cambio-contrasena"
  }, {
    path: "/atencion-al-cliente/detalle/:id?",
    component: _3d70a1fe,
    name: "atencion-al-cliente-detalle-id"
  }, {
    path: "/construcciones/cotizacion/:id?",
    component: _2c1a3292,
    name: "construcciones-cotizacion-id"
  }, {
    path: "/noticias/post/:id?",
    component: _bf4d2e34,
    name: "noticias-post-id"
  }, {
    path: "/recuperar-contrasena/generar/:id",
    component: _7a943568,
    name: "recuperar-contrasena-generar-id"
  }, {
    path: "/completar-registro/:id?",
    component: _26e94311,
    name: "completar-registro-id"
  }, {
    path: "/",
    component: _06fc54ec,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
