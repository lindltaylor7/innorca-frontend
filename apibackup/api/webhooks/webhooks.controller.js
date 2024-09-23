const nodemailer = require("nodemailer")

const Referred = require('../../models/Referred')
const ReferredStatus = require('../../models/ReferredStatus')
const Dev = require('../../models/Dev')
const Webhooks = require('../../models/Webhooks')
const Notification = require('../../models/Notification')
const User = require('../../models/User')

const { SperantV3 } = require('../../services/sperant')
const Sperant = new SperantV3()

const templates = require('../../mails/templates');
const sendgrid = require('../../mails/sendgrid');

let transporter = nodemailer.createTransport({
  service: "SendinBlue",
  auth: {
    user: process.env.SENDINBLUE_USER,
    pass: process.env.SENDINBLUE_PASSWORD,
  },
})

const updateReferredStatusByBudgetCode = async (budgetCode, event) => {
  console.log(budgetCode, event)
  const budget = await Sperant.getBudgetByCode(budgetCode)

  const project = await Sperant.getProjectById(budget.projectId)

  const client = await Sperant.getClientById(budget.representerId)
  const update = await updateReferredStatus(budget.representerId, event)
  if (update) {
    await sendMailToReferred(client, project, event)
  }
}

const sendMailToReferred = async (client, project, event) => {
  const statusesObject = {
    pending                    : 'Pendiente',
    deposit_payment_created    : 'Depósito',
    deposit_financial_created  : 'Depósito',
    process_separation_created : 'Separación',
    process_sale_completed     : 'En proceso de venta',
    process_canceled_created   : 'Desistió',
    reserv_created             : 'Reserva',
    reserv_canceled            : 'Reserva',
  }

  const mailOptions = {
    to: client.email,
    from: "no-reply@menorca.com.pe",
    subject: `Cambio de estado su proyecto ${project.name}`,
    html: `
    <p>Se ha registrado un cambio de estado en un projecto:\n</p> <br>
    <p>Nombre del proyecto: ${project.name}\n</p> <br>
    <p>Evento: ${event}\n</p> <br>
    <p>Estado: ${statusesObject[event]}\n</p> <br>
    <p>Si ya consiguiste tu inmueble <a href="https://ventana.menorca.pe">pulsa aquí</a> para visitar Ventana Menorca</p>
    `
  }

  await transporter.sendMail(mailOptions)
}

const updateReferredStatus = async (sperantId, event) => {
  const referredDB = await Referred.findOne({ sperantId: sperantId })

  if (referredDB) {
    const newStatus = await ReferredStatus.create({ eventName: event })

    const statusArray = [ ...referredDB.statusList, newStatus._id ]
    referredDB.statusList = statusArray
    referredDB.sperantStatus = newStatus.eventName
    await referredDB.save()

    return true
  }
}

class WebhooksController {

  static changeTicketStatus = async (req, res, next) => {

      console.log('changeTicketStatus');

      try {
        const { body } = req

        const webhook = new Webhooks({
          rawData: body
        });
        await webhook.save();

        let dump = JSON.parse(body.dsp_body)
        let dataJSON = dump;

        /*return res.status(200).json({
          success: true,
          status: dataJSON
        });*/

        let code = dataJSON.attention.code;
        let supervisorObj = await Sperant.getAttendantByIdMod(30, dataJSON.attention.attendant_id);
        let supervisor = supervisorObj.fname + " " + supervisorObj.lname;
        let ticketId = dataJSON.attention.id;
        let status = dataJSON.attention.status;

        if(dataJSON.attention.attention_type == 'Seguimiento'){
          return res.status(200).json({
            success: false,
            status: 'Omitiendo alertas por tipo de atención: Seguimiento',
          });
        }

        let userId = dataJSON.attention.titular_id;
        //const user = await User.findById(userId);
        const user = await User.findOne({ 'profile.sperantClientId': userId });

        const mailOptions = {
          to: user.email,
          from: 'no-reply@menorca.com.pe',
          subject: 'Cambio de estado de solicitud'
        };

        if (status == 'Cerrado') {
          await sendgrid(mailOptions.to, mailOptions.subject, templates.statusClosed(user.profile.name, supervisor, code, status, ticketId), async (response) => {
          });
        } else {
          await sendgrid(mailOptions.to, mailOptions.subject, templates.statusUpdate(user.profile.name, supervisor, code, status, ticketId), async (response) => {
          });
        }

        let notificationMessage = `Su solicitud #${code} está en estado ${status}`;

        const newNotification = new Notification();
        newNotification.user = user._id;
        newNotification.message = notificationMessage;
        newNotification.read = false;

        const notificationSaved = await newNotification.save();

        return res.status(200).json({
          success: true,
          status: notificationSaved
        });

        console.log('body', body);

      } catch (error) {
        console.log(error)

        return res.status(200).json({
          success: false,
          status: error.message
        });
      }

  }
  static checkReferralPrize = async (req, res, next) => {

      //console.log('referral check prize');

      try {
        const { body } = req

        const webhook = new Webhooks({
          rawData: body
        });
        await webhook.save();

        let dump = JSON.parse(body.dsp_body)
        let dataJSON = dump;

        /*return res.status(200).json({
          success: true,
          status: dataJSON
        });*/

        // let code = dataJSON.attention.code;
        // let supervisorObj = await Sperant.getAttendantByIdMod(30, dataJSON.attention.attendant_id);
        // let supervisor = supervisorObj.fname + " " + supervisorObj.lname;
        // let ticketId = dataJSON.attention.id;
        // let status = dataJSON.attention.status;

        // let userId = dataJSON.attention.titular_id;
        // //const user = await User.findById(userId);
        // const user = await User.findOne({ 'profile.sperantClientId': userId });

        // const mailOptions = {
        //   to: user.email,
        //   from: 'no-reply@menorca.com.pe',
        //   subject: 'Cambio de estado de solicitud'
        // };

        // if (status == 'Cerrado') {
        //   await sendgrid(mailOptions.to, mailOptions.subject, templates.statusClosed(user.profile.name, supervisor, code, status, ticketId), async (response) => {
        //   });
        // } else {
        //   await sendgrid(mailOptions.to, mailOptions.subject, templates.statusUpdate(user.profile.name, supervisor, code, status, ticketId), async (response) => {
        //   });
        // }

        // let notificationMessage = `Su solicitud #${code} está en estado ${status}`;

        // const newNotification = new Notification();
        // newNotification.user = user._id;
        // newNotification.message = notificationMessage;
        // newNotification.read = false;

        // const notificationSaved = await newNotification.save();
        //console.log('body', body);
        return res.status(200).json({
          success: true,
          dump,
          //status: notificationSaved
        });

        

      } catch (error) {
        console.log(error)

        return res.status(200).json({
          success: false,
          status: error.message
        });
      }

  }


  static changeStatus = async (req, res, next) => {
    try {
      const { body } = req

      if (body.token === '68ea27c68b1c7c61a8ae9bb9fca91c79c52ad74b') {
        if (body.event_name == 'deposit_payment_created') {
          await updateReferredStatusByBudgetCode(body.deposit_payment.budget_code, body.event_name)

        } else if (body.event_name == 'deposit_financial_created') {
          await updateReferredStatusByBudgetCode(body.deposit.budget_code, body.event_name)

        } else if (body.event_name == 'process_separation_created') {
          await updateReferredStatusByBudgetCode(body.process_unit.budget_code, body.event_name)

        } else if (body.event_name == 'process_sale_completed') {
          await updateReferredStatusByBudgetCode(body.process_unit.budget_code, body.event_name)

        } else if (body.event_name == 'process_canceled_created') {
          await updateReferredStatusByBudgetCode(body.process_unit.budget_code, body.event_name)

        } else if (body.event_name == 'reserv_created') {
          await updateReferredStatusByBudgetCode(body.reserv.budget_code, body.event_name)

        } else if (body.event_name == 'reserv_canceled') {
          await updateReferredStatusByBudgetCode(body.reserv.budget_code, body.event_name)

        }
      }

      return res.status(200).json({
        success: true,
        status: "webhook"
      });
      return res.status(200).end()
    } catch (error) {
      console.log(error)

      return res.status(200).end()
    }
  }
}

module.exports = WebhooksController
