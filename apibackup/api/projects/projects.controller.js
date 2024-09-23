
const { SperantV3 } = require('../../services/sperant')
const Sperant = new SperantV3()

class ProjectsController {
  static showProject = async (req, res, next) => {
    try {
      const { params } = req

      if (!params.id) throw '[id] param are required'

      const project = await Sperant.getProjectById(params.id)

      return res.json({ ok: true, project: project })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProjectsController
