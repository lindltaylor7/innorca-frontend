const CIP = require('../../models/CIP')
const Request = require('../../models/Request')
const Referred = require('../../models/Referred')
const User = require('../../models/User')
const Budget = require('../../models/Quote')
const Metric = require('../../models/Metric')

class MetricsController {
  static listGeneralMetrics = async (req, res, next) => {
    try {
      const { query } = req

      let filter = {}
      if ( query.startDate ) filter.createdAt = { $gt: new Date(query.startDate), $lt: new Date(query.endDate) }

      const cipsCount = await CIP.countDocuments(filter)

      const requestsCount = await Request.countDocuments(filter)

      const referredsCount = await Referred.countDocuments(filter)

      const usersCount = await User.countDocuments(filter)

      const budgetsCount = await Budget.countDocuments(filter)

      const pathAnalytics = await Metric.aggregate([
        { $match: filter },
        { $group: { _id: '$pathName', count: { $sum: 1 } } },
      ])

      let pathAnalyticsCount = {
        noticias: 0,
        inmuebles: 0,
        pagoCercano: 0,
        construcciones: 0,
        referidos: 0,
        consultas: 0,
        preguntas: 0,
        login: 0,
      }
      for (const path of pathAnalytics) {
        pathAnalyticsCount[path._id] = path.count
      }

      return res.json({
        ok: true,
        cipsCount: cipsCount,
        requestsCount: requestsCount,
        referredsCount: referredsCount,
        usersCount: usersCount,
        budgetsCount: budgetsCount,
        pathAnalytics: pathAnalyticsCount,
      })
    } catch (error) {
      next(error)
    }
  }

  static listRequestsMetrics = async (req, res, next) => {
    try {
      const { query } = req

      let filterRequest = {}
      if ( query.startDate ) filterRequest.createdAt = { $gt: new Date(query.startDate), $lt: new Date(query.endDate) }

      const requestsMetricsCount = await Metric.countDocuments({ ...filterRequest, pathName: 'consultas' })
      const requestsCount = await Request.countDocuments(filterRequest)

      let filterTypeConsult = {}
      if ( query.startDateTypeConsult ) filterTypeConsult.createdAt = { $gt: new Date(query.startDateTypeConsult), $lt: new Date(query.endDateTypeConsult) }

      const typeConsultMetrics = await Request.aggregate([
        { $match: filterTypeConsult },
        { $group: { _id: '$typeConsult', count: { $sum: 1 } } },
      ])

      let filterTypeProduct = {}
      if ( query.startDateTypeProduct ) filterTypeProduct.createdAt = { $gt: new Date(query.startDateTypeProduct), $lt: new Date(query.endDateTypeProduct) }

      const typeProductCount = await Request.aggregate([
        { $match: filterTypeProduct },
        { $group: { _id: '$typeProduct', count: { $sum: 1 } } },
      ])

      let filterProjectName = {}
      if ( query.startDateProjectName ) filterProjectName.createdAt = { $gt: new Date(query.startDateProjectName), $lt: new Date(query.endDateProjectName) }

      const projectNameCount = await Request.aggregate([
        { $match: filterProjectName },
        { $group: { _id: '$nameProject', count: { $sum: 1 } } },
      ])

      return res.json({
        ok: true,
        requestsMetricsCount: requestsMetricsCount,
        requestsCount: requestsCount,
        typeConsultMetrics: typeConsultMetrics,
        typeProductCount: typeProductCount,
        projectNameCount: projectNameCount,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MetricsController