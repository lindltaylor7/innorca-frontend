const validator = require('validator')

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: "SendinBlue",
  auth: {
    user: process.env.SENDINBLUE_USER,
    pass: process.env.SENDINBLUE_PASSWORD,
  },
})

const Request = require('../../../models/Request')

const { SperantV3 } = require('../../../services/sperant')
const Sperant = new SperantV3()

class RequestsController {
  static renderCreateRequest = async (req, res, next) => {
    try {
      const { sperantClientId } = req.user.profile

      const budgets = await Sperant.getClientActiveBudgets(sperantClientId)
      const validBudgets = await Sperant.getValidBudgets(budgets)

      return res.render('requests/create', {
        title: 'solicitudes',
        budgets: validBudgets,
      })
    } catch (error) {
      next(error)
    }
  }

  static createRequest = async (req, res, next) => {
    try {
      const { body } = req

      if (!validator.isEmail(body.email)) {
        req.flash("errors", { msg: 'Ingrese un correo válido' })
        return res.redirect('back')
      }

      const phoneNumberRegEx = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$";
      if (!body.phone.match(phoneNumberRegEx)) {
        req.flash("errors", { msg: 'Ingrese un número télefonico válido.' })
        return res.redirect('back')
      }

      const project = await Sperant.getProjectById(body.projectId)

      const units = await Sperant.getUnits(body.budgetId)
      if ( !units.length ) {
        req.flash("errors", { msg: `No existen unidades para la proforma selectionada` })
        return res.redirect('back')
      }

      const attention = await Sperant.postCreateAttention(
        units[0].id,
        body.budgetId,
        req.user.profile.sperantClientId,
        `${body.subject} - ${body.detail}`,
        body.fileName ? `${body.fileName}: ${body.file}` : ''
      )

      const newRequest = new Request({
        user: req.user._id,
        userName: req.user.profile.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        nameProject: project.name,
        projectId: project.id,
        contract_num: body.contractNum,
        detail: body.detail,
        fileUrl: body.file,
        fileName: body.fileName,
        typeConsult: body.typeConsult,
        typeProduct: body.typeProduct,
        sperantRawData: attention
      })
      await newRequest.save()

      const consultType = [ 'Consulta de Atención al Cliente', 'Consulta de Cobranzas', 'Otras consultas', 'Sugerencias' ]
      const mailOptions = {
        to: `${consultType[newRequest.typeConsult] == 'Consulta de Cobranzas' ? 'atencion.clientes@menorca.com.pe, cobranzas@cobranzas.menorca.com.pe' : 'atencion.clientes@menorca.com.pe'}`,
        from: 'no-reply@menorca.com.pe',
        subject: `VENTANA MENORCA: ${consultType[newRequest.typeConsult]}`,
        text: `Nueva Solicitud: \n
          Correo: ${newRequest.email}\n
          Telefono: ${newRequest.phone}\n
          Número de contrato: ${newRequest.contract_num}\n
          Nombre del proyecto: ${newRequest.nameProject}\n
          Detalle del proyecto: ${newRequest.detail}\n\n`,
      }
      await transporter.sendMail(mailOptions)

      req.flash("success", { msg: `Se ha enviado su solicitud satisfactoriamente` })
      return res.redirect("/consultas")
    } catch (error) {
      if (error.response) console.log(error.response.data)
      next(error)
    }
  }
}

module.exports = RequestsController
