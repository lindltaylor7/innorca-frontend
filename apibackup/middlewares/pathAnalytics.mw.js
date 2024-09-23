const Metric = require('../models/Metric')

const saveVisitedPath = async (req, res, next) => {
  try {
    const { headers } = req

    let pathName
    switch (req.path) {
      case '/noticias': pathName = 'noticias'
        break;
      case '/inmuebles': pathName = 'inmuebles'
        break;
      case  '/reciente-pago-pendiente': pathName = 'pagoCercano'
        break;
      case '/cotizaciones': pathName = 'construcciones'
        break;
      case '/referidos': pathName = 'referidos'
        break;
      case '/consultas': pathName = 'consultas'
        break;
      case  'preguntas-frecuentes': pathName = 'preguntas'
        break;
      case '/account':
        if (headers.referer && headers.referer.includes('/login') ) {
          pathName = 'login'
        }
        break;
    }

    if (pathName) {
      await Metric.create({ pathName: `${pathName}` })
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { saveVisitedPath }