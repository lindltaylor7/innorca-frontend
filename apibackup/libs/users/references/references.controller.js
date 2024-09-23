const Referred = require('../../../models/Referred')
const ReferredStatus = require('../../../models/ReferredStatus')

const { SperantV3 } = require('../../../services/sperant')
const Sperant = new SperantV3()

class ReferencesController {
  static renderCreateReferral = async (req, res, next) => {
    try {
      const { sperantClientId } = req.user.profile

      const budgets = await Sperant.getClientActiveBudgets(sperantClientId)

      if (budgets.length == 0) {
        req.flash("info", {
          msg: "Debes tener almenos un proyecto con estado de cuenta para poder referenciar.",
        })
        return res.redirect('back')
      }

      const projects = await Sperant.getAllProjects()

      return res.render('reference/refer', {
        title: 'referidos',
        projects: projects,
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static createReferral = async (req, res, next) => {
    try {
      const { body } = req

      // throw 'dev error'
      const existingDocument = await Sperant.checkExistingClient(body.dni)
      if (existingDocument) {
        req.flash('info', { msg: 'El dni del cliente que quiere ingresar ya se encuentra registrado en Menorca' })
          return res.redirect('back')
      }

      
      const projectIdArray = Array.isArray(body.projectId) ? body.projectId : [body.projectId]

      for (let i = 0; i < projectIdArray.length; i++) {
        const projectId = projectIdArray[i]
        
        const client = await Sperant.postReferredClient(
          body.name,
          body.lastname,
          body.email,
          projectId,
          body.phone,
          body.dni,
          body.comments,
        )

        if ( i == 0 ) {
          const existingEmail = client.document != body.dni
          if (existingEmail) {
            req.flash('info', { msg: 'El email del cliente que quiere ingresar ya se encuentra registrado en Menorca' })
              return res.redirect('back')
          }  
          const newReferredStatus = await ReferredStatus.create({ eventName: 'pending' })
    
          await Referred.create({
            referencerId: req.user._id,
            name: `${client.firstName} ${client.lastName}`,
            dni: client.document,
            email: client.email,
            phone: client.phone,
            projectId: projectIdArray[projectIdArray.length - 1],
            projectList: projectIdArray,
            comments: body.comments,
            sperantId: client.id,
            statusList: [ newReferredStatus._id ],
            sperantStatus: 'pending',
            sperantRawData: client,
          })
        }

      }


      req.flash("success", { msg: "Referencia añadida con éxito." })

      return res.redirect('/referidos')
    } catch (error) {
      if (error.response && error.response.data) console.log(error.response.data)
      if (error === 'Error at send the data to Sperant') {
        req.flash("info", { msg: 'Fallo el envio a Sperant, vuelva a intentarlo más tarde' })
        return res.redirect('back')
      }

      next(error)
    }
  }
}

module.exports = ReferencesController