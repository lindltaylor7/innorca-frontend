const jwt = require("jsonwebtoken");

const { promisify } = require("util");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const passport = require("passport");
const _ = require("lodash");
const validator = require("validator");
const mailChecker = require("mailchecker");
const { util, downloadFile, deleteFie } = require("../util");
const moment = require("moment");

const { SperantV3 } = require("../services/sperant");
const Sperant = new SperantV3();

const { BIV1 } = require("../services/bi");
const BI = new BIV1();

const User = require("../models/User");
const Request = require("../models/Request");
const Comment = require("../models/Comment");

const categories = [
  {
    name: "Casas-Entrega",
    code: "01",
  },
  {
    name: "Casas-Garantía",
    code: "02",
  },
  {
    name: "Casas-Observaciones",
    code: "03",
  },
  {
    name: "HU-Urbanización",
    code: "04",
  },
  {
    name: "Lotes-Legal",
    code: "05",
  },
  {
    name: "Lotes-Cancelación",
    code: "06",
  },
  {
    name: "Lotes-Cesión",
    code: "07",
  },
  {
    name: "Lotes-Cheques",
    code: "08",
  },
  {
    name: "Lotes-Cobranza",
    code: "09",
  },
  {
    name: "Lotes-Construcción",
    code: "10",
  },
  {
    name: "Lotes-Documentación",
    code: "11",
  },
  {
    name: "Lotes-Entrega",
    code: "12",
  },
  {
    name: "Lotes-Letras",
    code: "13",
  },
  {
    name: "Lotes-Minutas",
    code: "14",
  },
  {
    name: "Lotes-Pago Efectivo Letras",
    code: "15",
  },
  {
    name: "Lotes-Pago Efectivo Trámites",
    code: "16",
  },
  {
    name: "Lotes-Recupero",
    code: "17",
  },
  {
    name: "Lotes-Refinanciamiento",
    code: "18",
  },
  {
    name: "Lotes-Reprogramación",
    code: "19",
  },
  {
    name: "Lotes-Resolución",
    code: "20",
  },
  {
    name: "Lotes-Reubicación",
    code: "21",
  },
  {
    name: "Varios",
    code: "22",
  },
  {
    name: "Ventas",
    code: "23",
  },
];

const subCategories = [
  {
    name: "Entrega de casa en Proyecto",
    cat: "01",
    code: "01",
  },
  {
    name: "Entrega de casa Tácita (Oficinas)",
    cat: "01",
    code: "02",
  },
  {
    name: "Agenda de Visita",
    cat: "02",
    code: "03",
  },
  {
    name: "Información de status",
    cat: "02",
    code: "04",
  },
  {
    name: "Agenda de Visita",
    cat: "03",
    code: "05",
  },
  {
    name: "Información de status",
    cat: "03",
    code: "06",
  },
  {
    name: "Informacion de Parques",
    cat: "04",
    code: "07",
  },
  {
    name: "Informacion de Pistas",
    cat: "04",
    code: "08",
  },
  {
    name: "Informacion de Reservorios (Agua)",
    cat: "04",
    code: "09",
  },
  {
    name: "Informacion de PETARs",
    cat: "04",
    code: "10",
  },
  {
    name: "Informacion de Cascadas",
    cat: "04",
    code: "11",
  },
  {
    name: "Informacion de Serv. Eléctrico",
    cat: "04",
    code: "12",
  },
  {
    name: "Informacion de Cartas Notariales",
    cat: "05",
    code: "13",
  },
  {
    name: "Tramites legales",
    cat: "05",
    code: "14",
  },
  {
    name: "Monto total a cancelar: $XXXX",
    cat: "06",
    code: "15",
  },
  {
    name: "Inicio de Tramite",
    cat: "07",
    code: "16",
  },
  {
    name: "Resultado Evaluación",
    cat: "07",
    code: "17",
  },
  {
    name: "Culminación de Tramite de Cesión",
    cat: "07",
    code: "18",
  },
  {
    name: "Endoso de cheques",
    cat: "08",
    code: "19",
  },
  {
    name: "Devolución de cheques",
    cat: "08",
    code: "20",
  },
  {
    name: "Informacion de deuda",
    cat: "09",
    code: "21",
  },
  {
    name: "Informacion lugar de pago",
    cat: "09",
    code: "22",
  },
  {
    name: "Cliente moroso",
    cat: "09",
    code: "23",
  },
  {
    name: "Inicio de Construcción",
    cat: "10",
    code: "24",
  },
  {
    name: "Retiro muro tableta",
    cat: "10",
    code: "25",
  },
  {
    name: "Limpieza de lote",
    cat: "10",
    code: "26",
  },
  {
    name: "Entrega contrato C-V",
    cat: "11",
    code: "27",
  },
  {
    name: "Entrega de Planos",
    cat: "11",
    code: "28",
  },
  {
    name: "Entrega de Lotes en Proyecto",
    cat: "12",
    code: "29",
  },
  {
    name: "Entrega de Lotes Tácita (Oficinas)",
    cat: "12",
    code: "30",
  },
  {
    name: "Devolución de Letras",
    cat: "13",
    code: "31",
  },
  {
    name: "Regularización firma letras",
    cat: "13",
    code: "32",
  },
  {
    name: "Inicio de tramite de minutas",
    cat: "14",
    code: "33",
  },
  {
    name: "Entrega de Minuta",
    cat: "14",
    code: "34",
  },
  {
    name: "PE Letra Completa",
    cat: "15",
    code: "35",
  },
  {
    name: "PE Letra pago a cuenta",
    cat: "15",
    code: "36",
  },
  {
    name: "PE Cancelación",
    cat: "16",
    code: "37",
  },
  {
    name: "PE Cesión",
    cat: "16",
    code: "38",
  },
  {
    name: "PE Refinanciamiento",
    cat: "16",
    code: "39",
  },
  {
    name: "PE Reprogramación",
    cat: "16",
    code: "40",
  },
  {
    name: "PE Otros Tramites",
    cat: "16",
    code: "41",
  },
  {
    name: "Recupero",
    cat: "17",
    code: "42",
  },
  {
    name: "Refinanciamiento con Amortización",
    cat: "18",
    code: "43",
  },
  {
    name: "Refinanciamiento sin Amortización",
    cat: "18",
    code: "44",
  },
  {
    name: "Reprogramación Total",
    cat: "19",
    code: "45",
  },
  {
    name: "Reprogramación Parcial",
    cat: "19",
    code: "46",
  },
  {
    name: "Exoneración de Mora",
    cat: "19",
    code: "47",
  },
  {
    name: "Resolución por Morosidad",
    cat: "20",
    code: "48",
  },
  {
    name: "Resolución APC",
    cat: "20",
    code: "49",
  },
  {
    name: "Reubicación por Reestructurac. Proyecto",
    cat: "21",
    code: "50",
  },
  {
    name: "Reubicación por acuerdo Comercial",
    cat: "21",
    code: "51",
  },
  {
    name: "Consultas",
    cat: "22",
    code: "52",
  },
  {
    name: "Informacion de ventas",
    cat: "23",
    code: "53",
  },
];

exports.getAllRequets = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    const body = req.body;

    let page = body.page;
    let budgetCode = body.budgetCode;

    const budgetId = await Sperant.getBudgetByCode(budgetCode);
    const titular = await Sperant.getTitular(budgetId.id);

    const user = await User.findById(userId);
    const titularType = user.titular;

    const titularClientId = titular[0].attributes.id;
    const titularFullName = `${titular[0].attributes.fname} ${titular[0].attributes.lname}`;
    if (user) {
      const { sperantClientId } = user.profile;

      let data = "";
      let next = "";

      if (titularType === "titular") {
        data = await Sperant.getTickets(budgetId.id, sperantClientId, page);

        next = await Sperant.getTickets(budgetId.id, sperantClientId, page + 1);
      } else {
        data = await Sperant.getTickets(budgetId.id, titularClientId, page);
        next = await Sperant.getTickets(budgetId.id, titularClientId, page + 1);
      }

      return res.status(200).json({
        tickets: data.tickets,
        next: next.length,
        moment,
        categories,
        subCategories,
        title: "solicitudes",
        titularFullName,
      });
    }

    return res.status(200).send({
      success: false,
      message: "error",
    });
  } catch (error) {
    console.log(error);

    return res.status(200).send({
      success: false,
      message: error,
    });
  }
};

exports.renderCreateRequest = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    var userId = decoded.user_id;

    const user = await User.findById(userId);
    const { sperantClientId } = user.profile;

    const budgets = await Sperant.getClientActiveBudgets(sperantClientId);
    //const validBudgets = await Sperant.getValidBudgets(budgets);
    const validBudgets = await budgets.map(async (budget) => {
      const validBudget = await BI.getValidBudget(budget.id);
      return validBudget.data;
    });

    const valid = await Promise.all(validBudgets);

    const categoryAttentions = await Sperant.getCategoryAttentions();
    categoryAttentions.sort((a, b) =>
      a.attributes.name > b.attributes.name
        ? 1
        : b.attributes.name > a.attributes.name
        ? -1
        : 0
    );
    const typeAttentions = await Sperant.getTypeAttentions();
    typeAttentions.map((type, index) => {
      if (type.id == "6") typeAttentions.splice(index, 1);
    });

    return res.status(200).send({
      success: true,
      title: "solicitudes",
      budgets: valid,
      categoryAttentions: categoryAttentions,
      typeAttentions: typeAttentions,
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getRequestStatus = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    let requestStatus;

    switch (request.status) {
      case 0:
        requestStatus = "Sin responder";
        break;
      case 1:
        requestStatus = "Respondido";
        break;
      case 2:
        requestStatus = "Cerrado";
        break;
    }

    return res.status(200).json({
      success: true,
      status: request.sperantStatus,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

exports.getRequestDetail = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    console.log("requestId", requestId);

    /*const sperantData = await Sperant.getAttention(requestId);
    sperantData.status = await Sperant.getAttentionStatus(
      sperantData.status_attention_id
    );
    sperantData.type = await Sperant.getAttentionType(
      sperantData.attention_type_id
    );
    request.sperantCategory = await Sperant.getAttentionCategory(
      sperantData.category_attention_id
    );*/

    //const date = request.createdAt;

    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    const user = await User.findOne({ _id: userId });

    const sperantData = await Sperant.getAttention(requestId);

    sperantData.attendant = await Sperant.getAttendantByIdMod(
      sperantData.project_id,
      sperantData.attendant_id
    );
    //console.log('sperantData.attendant', sperantData.attendant);

    sperantData.project = await Sperant.getProjectNameById(
      sperantData.project_id
    );
    sperantData.status = await Sperant.getAttentionStatusCode(
      sperantData.status_attention_id
    );
    sperantData.type = await Sperant.getAttentionType(
      sperantData.attention_type_id
    );
    sperantData.sperantCategory = await Sperant.getAttentionCategory(
      sperantData.category_attention_id
    );

    let notes = (await Sperant.getListNotes(requestId)) || [];

    const sperantClient = await Sperant.getClientById(
      user.profile.sperantClientId
    ); //1948

    /*const comments = await Comment.find({ requestId: requestId }, {}).sort({
      createdAt: 1,
    });*/

    //const comments = await Sperant.getFileFromNote(requestId);

    if (notes.length > 0) {
      await Promise.all(
        notes.map(async (note) => {
          /*const comment = comments.find(
          (comment) =>
            comment.sperantRawData.id.toString() == note.id.toString()
        );*/
          note.user =
            note.attributes.creator_id &&
            note.attributes.creator_id == sperantClient.id
              ? sperantClient.lastName.concat(", ", sperantClient.firstName)
              : "Ventana Menorca";
          /*note.createdAt = comment
          ? comment.createdAt
          : note.attributes.created_at * 1000;*/
          note.files = await Sperant.getListFilesNote(note.id);
        })
      );
      notes.reverse();
    }

    /*const userDetails = await User.findById(request.user, {
      profile: 1,
      email: 1,
    });*/

    /*request.sperantRawData = sperantData;
    await request.save();*/

    //if (req.user.type === 1) {

    return res.status(200).json({
      //request,
      sperantData,
      notes, //date,
      //userDetails,
      //sperantData,
      title: "solicitudes",
      moment,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};

/*exports.getRequestDetail = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    const comments = await Comment.find({ requestId: requestId }, {}).sort({ createdAt: 1 });

    return res.status(200).send({
      request,
      comments,
      moment,
      title:"solicitudes"
    });


  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error
    });
  }
}*/

/**
 * Post /Request Details
 */
exports.postRequestDetail = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    //const { body } = req;

    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");

    var userId = decoded.user_id;

    let user = await User.findById(userId);

    const { body } = req;

    /*console.log(body.content);
    return;*/
    const note = await Sperant.postCreateAttentionNote(
      requestId, //request.sperantRawData.id,
      body.content,
      user.profile.sperantClientId,
      1
    );

    let fileUrl = body.file;

    console.log("fileUrl", typeof fileUrl);

    if (body.fileName != "") {
      console.log("paso");
      const form = await downloadFile(fileUrl, body.fileName);
      const responseFile = await Sperant.postUploadNoteFile(note.id, form);
      if (responseFile) {
        await deleteFie(body.fileName);
      }
    }

    //await newComment.save();

    return res.status(200).send({
      success: true,
      fileUploaded: "",
      message: "Mensaje enviado",
    });

    //return res.redirect(`/consulta/${requestId}`);
  } catch (error) {
    console.log(error);
    //next(error);
    return res.status(400).send({
      success: false,
      message: error,
    });
  }
};
