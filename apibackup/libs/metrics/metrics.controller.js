class MetricsController {
  static renderGeneralMetrics = async (_req, res, next) => {
    try {
      return res.render('admin/metrics/general', { title: 'Métricas generales' })
    } catch (error) {
      next(error)
    }
  }

  static renderRequestMetrics = async (_req, res, next) => {
    try {
      return res.render('admin/metrics/requests', { title: 'Metricas de consultas' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MetricsController