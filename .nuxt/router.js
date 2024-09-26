import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _81448598 = () => interopDefault(import('..\\pages\\atencion-al-cliente\\index.vue' /* webpackChunkName: "pages/atencion-al-cliente/index" */))
const _6fedb7ec = () => interopDefault(import('..\\pages\\construcciones\\index.vue' /* webpackChunkName: "pages/construcciones/index" */))
const _4d2b99d2 = () => interopDefault(import('..\\pages\\inicio\\index.vue' /* webpackChunkName: "pages/inicio/index" */))
const _d8191c22 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _2f6a12bb = () => interopDefault(import('..\\pages\\mi-perfil\\index.vue' /* webpackChunkName: "pages/mi-perfil/index" */))
const _315977be = () => interopDefault(import('..\\pages\\mis-inmuebles\\index.vue' /* webpackChunkName: "pages/mis-inmuebles/index" */))
const _3b56bd74 = () => interopDefault(import('..\\pages\\mis-pagos\\index.vue' /* webpackChunkName: "pages/mis-pagos/index" */))
const _47ecbae2 = () => interopDefault(import('..\\pages\\mis-referidos\\index.vue' /* webpackChunkName: "pages/mis-referidos/index" */))
const _a06e2564 = () => interopDefault(import('..\\pages\\noticias\\index.vue' /* webpackChunkName: "pages/noticias/index" */))
const _5da5dfea = () => interopDefault(import('..\\pages\\preguntas-frecuentes\\index.vue' /* webpackChunkName: "pages/preguntas-frecuentes/index" */))
const _26d5bff2 = () => interopDefault(import('..\\pages\\recuperar-contrasena\\index.vue' /* webpackChunkName: "pages/recuperar-contrasena/index" */))
const _624b5af8 = () => interopDefault(import('..\\pages\\signup\\index.vue' /* webpackChunkName: "pages/signup/index" */))
const _40b4c21b = () => interopDefault(import('..\\pages\\construcciones\\nueva-cotizacion\\index.vue' /* webpackChunkName: "pages/construcciones/nueva-cotizacion/index" */))
const _11d0c7c3 = () => interopDefault(import('..\\pages\\mi-perfil\\cambio-contrasena.vue' /* webpackChunkName: "pages/mi-perfil/cambio-contrasena" */))
const _e828fb9e = () => interopDefault(import('..\\pages\\atencion-al-cliente\\detalle\\_id.vue' /* webpackChunkName: "pages/atencion-al-cliente/detalle/_id" */))
const _5e5c7432 = () => interopDefault(import('..\\pages\\construcciones\\cotizacion\\_id.vue' /* webpackChunkName: "pages/construcciones/cotizacion/_id" */))
const _5eacdfd4 = () => interopDefault(import('..\\pages\\noticias\\post\\_id.vue' /* webpackChunkName: "pages/noticias/post/_id" */))
const _6c8c781c = () => interopDefault(import('..\\pages\\recuperar-contrasena\\generar\\_id.vue' /* webpackChunkName: "pages/recuperar-contrasena/generar/_id" */))
const _511b5b7e = () => interopDefault(import('..\\pages\\completar-registro\\_id.vue' /* webpackChunkName: "pages/completar-registro/_id" */))
const _445bd01c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _81448598,
    name: "atencion-al-cliente"
  }, {
    path: "/construcciones",
    component: _6fedb7ec,
    name: "construcciones"
  }, {
    path: "/inicio",
    component: _4d2b99d2,
    name: "inicio"
  }, {
    path: "/login",
    component: _d8191c22,
    name: "login"
  }, {
    path: "/mi-perfil",
    component: _2f6a12bb,
    name: "mi-perfil"
  }, {
    path: "/mis-inmuebles",
    component: _315977be,
    name: "mis-inmuebles"
  }, {
    path: "/mis-pagos",
    component: _3b56bd74,
    name: "mis-pagos"
  }, {
    path: "/mis-referidos",
    component: _47ecbae2,
    name: "mis-referidos"
  }, {
    path: "/noticias",
    component: _a06e2564,
    name: "noticias"
  }, {
    path: "/preguntas-frecuentes",
    component: _5da5dfea,
    name: "preguntas-frecuentes"
  }, {
    path: "/recuperar-contrasena",
    component: _26d5bff2,
    name: "recuperar-contrasena"
  }, {
    path: "/signup",
    component: _624b5af8,
    name: "signup"
  }, {
    path: "/construcciones/nueva-cotizacion",
    component: _40b4c21b,
    name: "construcciones-nueva-cotizacion"
  }, {
    path: "/mi-perfil/cambio-contrasena",
    component: _11d0c7c3,
    name: "mi-perfil-cambio-contrasena"
  }, {
    path: "/atencion-al-cliente/detalle/:id?",
    component: _e828fb9e,
    name: "atencion-al-cliente-detalle-id"
  }, {
    path: "/construcciones/cotizacion/:id?",
    component: _5e5c7432,
    name: "construcciones-cotizacion-id"
  }, {
    path: "/noticias/post/:id?",
    component: _5eacdfd4,
    name: "noticias-post-id"
  }, {
    path: "/recuperar-contrasena/generar/:id",
    component: _6c8c781c,
    name: "recuperar-contrasena-generar-id"
  }, {
    path: "/completar-registro/:id?",
    component: _511b5b7e,
    name: "completar-registro-id"
  }, {
    path: "/",
    component: _445bd01c,
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
