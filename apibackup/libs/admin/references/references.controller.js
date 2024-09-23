const Referred = require('../../../models/Referred')

class ReferencesController {
  static listReferences = async (_req, res, next) => {
    try {
      const references = await Referred.find({}).populate('referencerId')

      return res.render("admin/references/listReferences", {
        title: "admin-referencias",
        references,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ReferencesController