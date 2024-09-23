
const { SperantV3 } = require('../../services/sperant')
const Sperant = new SperantV3()

class PaymentsController {
  static listBudgetPayments = async (req, res, next) => {
    try {
      const { query } = req

      if (!query.budgetCode || !query.projectType) throw '[budgetCode] and [projectType] query params are required'

      const { payments, projectTotal, totalAmount, totalSaldo } = await Sperant.getBudgetPayments(
        query.budgetCode,
        query.projectType,
      )

      return res.json({
        ok: true,
        payments: payments,
        projectTotal: projectTotal,
        totalAmount: totalAmount,
        totalSaldo: totalSaldo,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PaymentsController
