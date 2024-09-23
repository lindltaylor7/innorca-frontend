const nodemailer = require("nodemailer");
const { returnMoney, formatMoney } = require("../util");
const util = require('../util');
const moment = require("moment");
moment.locale("es");
//Para generar el excel
const Excel = require("exceljs");
//para el manejo de archivos
const fs = require("fs");
//Para manejar las rutas de directorios
const path = require("path");
const excelToJson = require("convert-excel-to-json");

const Post = require("../models/Post");
const Material = require("../models/Material");
const User = require("../models/User");
const Publicity = require("../models/Publicity");
const Request = require("../models/Request");
const Comment = require("../models/Comment");
const Referred = require("../models/Referred");
const Quote = require("../models/Quote");
const QuestionCategory = require('../models/QuestionCategory');
const FrequentQuestion = require('../models/FrequentQuestion');
const ExchangeRate = require('../models/ExchangeRate');

const mongoose = require('mongoose')

const { SperantV3 } = require('../services/sperant')
const Sperant = new SperantV3()

const categories = [
  { name: "Casas-Entrega", code: "01" },
  { name: "Casas-Garantía", code: "02" },
  { name: "Casas-Observaciones", code: "03" },
  { name: "HU-Urbanización", code: "04" },
  { name: "Lotes-Legal", code: "05" },
  { name: "Lotes-Cancelación", code: "06" },
  { name: "Lotes-Cesión", code: "07" },
  { name: "Lotes-Cheques", code: "08" },
  { name: "Lotes-Cobranza", code: "09" },
  { name: "Lotes-Construcción", code: "10" },
  { name: "Lotes-Documentación", code: "11" },
  { name: "Lotes-Entrega", code: "12" },
  { name: "Lotes-Letras", code: "13" },
  { name: "Lotes-Minutas", code: "14" },
  { name: "Lotes-Pago Efectivo Letras", code: "15" },
  { name: "Lotes-Pago Efectivo Trámites", code: "16" },
  { name: "Lotes-Recupero", code: "17" },
  { name: "Lotes-Refinanciamiento", code: "18" },
  { name: "Lotes-Reprogramación", code: "19" },
  { name: "Lotes-Resolución", code: "20" },
  { name: "Lotes-Reubicación", code: "21" },
  { name: "Varios", code: "22" },
  { name: "Ventas", code: "23" },
];

const subCategories = [
  { name: "Entrega de casa en Proyecto", cat: "01", code: "01" },
  { name: "Entrega de casa Tácita (Oficinas)", cat: "01", code: "02" },
  { name: "Agenda de Visita", cat: "02", code: "03" },
  { name: "Información de status", cat: "02", code: "04" },
  { name: "Agenda de Visita", cat: "03", code: "05" },
  { name: "Información de status", cat: "03", code: "06" },
  { name: "Informacion de Parques", cat: "04", code: "07" },
  { name: "Informacion de Pistas", cat: "04", code: "08" },
  { name: "Informacion de Reservorios (Agua)", cat: "04", code: "09" },
  { name: "Informacion de PETARs", cat: "04", code: "10" },
  { name: "Informacion de Cascadas", cat: "04", code: "11" },
  { name: "Informacion de Serv. Eléctrico", cat: "04", code: "12" },
  { name: "Informacion de Cartas Notariales", cat: "05", code: "13" },
  { name: "Tramites legales", cat: "05", code: "14" },
  { name: "Monto total a cancelar: $XXXX", cat: "06", code: "15" },
  { name: "Inicio de Tramite", cat: "07", code: "16" },
  { name: "Resultado Evaluación", cat: "07", code: "17" },
  { name: "Culminación de Tramite de Cesión", cat: "07", code: "18" },
  { name: "Endoso de cheques", cat: "08", code: "19" },
  { name: "Devolución de cheques", cat: "08", code: "20" },
  { name: "Informacion de deuda", cat: "09", code: "21" },
  { name: "Informacion lugar de pago", cat: "09", code: "22" },
  { name: "Cliente moroso", cat: "09", code: "23" },
  { name: "Inicio de Construcción", cat: "10", code: "24" },
  { name: "Retiro muro tableta", cat: "10", code: "25" },
  { name: "Limpieza de lote", cat: "10", code: "26" },
  { name: "Entrega contrato C-V", cat: "11", code: "27" },
  { name: "Entrega de Planos", cat: "11", code: "28" },
  { name: "Entrega de Lotes en Proyecto", cat: "12", code: "29" },
  { name: "Entrega de Lotes Tácita (Oficinas)", cat: "12", code: "30" },
  { name: "Devolución de Letras", cat: "13", code: "31" },
  { name: "Regularización firma letras", cat: "13", code: "32" },
  { name: "Inicio de tramite de minutas", cat: "14", code: "33" },
  { name: "Entrega de Minuta", cat: "14", code: "34" },
  { name: "PE Letra Completa", cat: "15", code: "35" },
  { name: "PE Letra pago a cuenta", cat: "15", code: "36" },
  { name: "PE Cancelación", cat: "16", code: "37" },
  { name: "PE Cesión", cat: "16", code: "38" },
  { name: "PE Refinanciamiento", cat: "16", code: "39" },
  { name: "PE Reprogramación", cat: "16", code: "40" },
  { name: "PE Otros Tramites", cat: "16", code: "41" },
  { name: "Recupero", cat: "17", code: "42" },
  { name: "Refinanciamiento con Amortización", cat: "18", code: "43" },
  { name: "Refinanciamiento sin Amortización", cat: "18", code: "44" },
  { name: "Reprogramación Total", cat: "19", code: "45" },
  { name: "Reprogramación Parcial", cat: "19", code: "46" },
  { name: "Exoneración de Mora", cat: "19", code: "47" },
  { name: "Resolución por Morosidad", cat: "20", code: "48" },
  { name: "Resolución APC", cat: "20", code: "49" },
  { name: "Reubicación por Reestructurac. Proyecto", cat: "21", code: "50" },
  { name: "Reubicación por acuerdo Comercial", cat: "21", code: "51" },
  { name: "Consultas", cat: "22", code: "52" },
  { name: "Informacion de ventas", cat: "23", code: "53" },
];

let transporter = nodemailer.createTransport({
  service: "SendinBlue",
  auth: {
    user: process.env.SENDINBLUE_USER,
    pass: process.env.SENDINBLUE_PASSWORD,
  },
});

/**
 * GET /Request Details
 */
exports.getAdminRequestDetail = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);
    const date = request.createdAt
    const comments = await Comment.find({ requestId: requestId }, {}).sort({
      createdAt: 1,
    });

    const userDetails = await User.findById(request.user, {
      profile: 1,
      email: 1,
    });

    if (req.user.type === 0) {
      return res.render("admin/adminRequestDetails", {
        request,
        comments,
        date,
        userDetails,
        title: "admin-solicitudes",
        moment,
      });
    } else {
      throw new Error("not allowed");
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Post /Request Details
 */
exports.postAdminRequestDetail = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    const { body } = req;

    const newComment = new Comment({
      requestId: requestId,
      userId: req.user._id,
      name: req.user.profile.name,
      userType: req.user.type,
      content: body.content,
      fileUrl: body.file,
    });

    await newComment.save();

    const request = await Request.findById(requestId).populate("user");

    request.status = 1;

    await request.save();
    const mailOptions = {
      to: request.user.email,
      from: "no-reply@menorca.com.pe",
      subject: "Nueva Solicitud registrada",
      text: `Tu solicitud ha sido respondida: \n
        Nombre del proyecto: ${request.nameProject}\n
        Asunto: ${request.subject}\n
        Respuesta: ${newComment.content}\n
        Detalle del proyecto: ${request.detail}\n\n`,
    };
    await transporter.sendMail(mailOptions);

    if (req.user.type === 0) {
      return res.redirect(`/admin/consulta/${requestId}`);
    } else {
      throw new Error("not allowed");
    }
  } catch (error) {
    next(error);
  }
};

exports.getAdminAllRequests = async (req, res, next) => {
  try {
    const projects = await Request.aggregate([
      // {$match: {nameProject: 'San Antonio de Mala 3' }},
      { $group: { _id: "$nameProject" } },
    ]);

    return res.render("admin/adminAllRequests", {
      categories,
      title: "admin-solicitudes",
      projects,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminNextRequests = async (req, res, next) => {
  try {
    const { status, project, category, startDate, endDate } = req.query;

    const { page } = req.query;

    let filter = {};

    if (status) {
      filter.status = Number(status);
    }

    if (project) {
      filter.nameProject = project;
    }

    if (category) {
      filter.category = category;
    }

    let skip = 0;
    if (page && page > 0) {
      skip = (page - 1) * 10;
    }

    if (startDate && startDate != "" && endDate && endDate != "") {
      filter.createdAt = {
        $gte: moment(startDate)
          .utc(false)
          .hours(0)
          .minutes(0)
          .seconds(0)
          .format(),
        $lte: moment(endDate)
          .utc(false)
          .hours(23)
          .minutes(59)
          .seconds(59)
          .format(),
      };
    }
    const requests = await Request.find(filter).sort({ createdAt: -1 }).skip(skip).limit(10);
    const count = await Request.countDocuments(filter);

    return res.send({
      requests,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminCloseRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    request.status = 2;

    await request.save();

    return res.redirect(`/admin/consulta/${requestId}`);
  } catch (error) {
    next(error);
  }
};

// exports.getAdminAllReferences = async (req, res, next) => {
//   try {
//     const referencesStatuses = await Referred.aggregate([
//       { $group: { _id: "$sperantStatus" } },
//     ]);
//     const references = await Referred.find().populate("referencerId");

//     console.log(referencesStatuses)
//     return res.render("admin/adminAllReferences", {
//       references,
//       referencesStatuses,
//       title: "admin-referencias",
//     });
//   } catch (error) { }
// };

exports.getAdminNextReferences = async (req, res, next) => {
  try {
    console.log('hallo')
    const { status, projectType, name, startDate, endDate } = req.query;

    const { page } = req.query;

    let filter = {};

    if (status) {
      let filterStatusList = []
      if (status == 'pending') {
        filterStatusList = ['pending']
      } else if (status == 'deposit') {
        filterStatusList = [ 'deposit_payment_created', 'deposit_financial_created' ]
      } else if (status == 'saleprocess' ) {
        filterStatusList = [ 'process_separation_created' ]
      } else if (status == 'desist') {
        filterStatusList = [ 'process_canceled_created' ]
      } else if (status == 'reserv') {
        filterStatusList = [ 'reserv_created', 'reserv_canceled' ]
      }

      filter.sperantStatus = { $in: filterStatusList };
    }

    console.log(filter)

    if (projectType) {
      filter.projectType = projectType;
    }

    if (name) {
      filter.name = name;
    }

    let skip = 0;
    if (page && page > 0) {
      skip = (page - 1) * 10;
    }

    if (startDate && startDate != "" && endDate && endDate != "") {
      filter.createdAt = {
        $gte: moment(startDate).utc(false).hours(0).minutes(0).seconds(0).format(),
        $lte: moment(endDate).utc(false).hours(23).minutes(59).seconds(59).format(),
      };
    }

    const references = await Referred.find(filter).sort({ createdAt: -1 }).skip(skip).limit(10);
    const count = await Referred.countDocuments(filter);

    return res.json({
      references,
      total: count,
    });
  } catch (error) {
    console.log(error)
    return res.json({
      ok:false,
      msg: 'error'
    })
  }
};

exports.getAdminReferredDetails = async (req, res, next) => {
  try {
    const { referredId } = req.params;

    const referred = await Referred.findById(referredId);

    const projectDict = []
    
    for (let i = 0; i < referred.projectList.length; i++) {
      const projectId = referred.projectList[i]
      if (!projectDict.find(el => el.id == projectId)) { 
        const project = await Sperant.getProjectById(projectId)
        projectDict.push(project)
      }
    }
    
    const referencer = await User.findById(referred.referencerId);

    return res.render("admin/adminReferenceDetails", {
      title: "admin-referencias",
      referred,
      projects: projectDict,
      referencer,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminUpdateRefferred = async (req, res, next) => {
  try {
    const { referredId } = req.params;

    const { status } = req.body;

    const referred = await Referred.findById(referredId);

    referred.status = status;

    await referred.save();

    return res.redirect(`/admin/referido/detalles/${referredId}`);
  } catch (error) {
    next(error);
  }
};

exports.getAdminMetrics = async (req, res, next) => {
  try {
    // Request and Referred Count
    const requestCount = await Request.countDocuments();
    const referredCount = await Referred.countDocuments();

    // Top Referencers
    const topReferencerIds = await Referred.aggregate([
      { $group: { _id: "$referencerId", count: { $sum: 1 } } },
    ])
      .sort({ count: -1 })
      .limit(3);

    const topReferencers = [];
    for (let index = 0; index < 3; index++) {
      if (topReferencerIds[index]) {
        const referencer = await User.findById(topReferencerIds[index]._id);
        topReferencers.push(referencer);
      }
    }

    // Top Requestd Projects
    const topRequestedProjects = await Request.aggregate([
      { $group: { _id: { nameProject: "$nameProject" }, count: { $sum: 1 } } },
    ])
      .sort({ count: -1 })
      .limit(3);

    // Count Referred by Clients and Workers
    const countReferredByMenorcaType = await User.aggregate([
      {
        $group: {
          _id: { menorcaType: "$profile.menorcaType" },
          count: { $sum: 1 },
        },
      },
    ]);
    let countReferredClient = countReferredByMenorcaType.find(
      (element) => element._id.menorcaType === 1
    );
    let countReferredWorkers = countReferredByMenorcaType.find(
      (element) => element._id.menorcaType === 0
    );

    if (countReferredClient) {
      countReferredClient = countReferredClient.count;
    }

    if (countReferredWorkers) {
      countReferredWorkers = countReferredWorkers.count;
    }

    return res.render("admin/adminMetrics", {
      requestCount,
      referredCount,
      topReferencers,
      topRequestedProjects,
      countReferredClient,
      countReferredWorkers,
      title: "admin-metricas",
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminAllUsers = async (req, res, next) => {
  return res.render("admin/adminAllUsers");
};

exports.getAdminNextUsers = async (req, res, next) => {
  try {
    const { page, menorcaType } = req.query;

    const skip = page !== null ? (page - 1) * 20 : 0;

    let filter = {};

    if (menorcaType !== undefined && menorcaType !== "") {
      filter = { "profile.menorcaType": menorcaType };
    }
    const users = await User.find(filter).skip(skip).limit(20);
    const count = await User.find(filter).countDocuments();

    return res.send({
      users,
      title: "admin-usuarios",
      count,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminUserDetails = async (req, res, next) => {
  try {
    const { userId: id } = req.params;

    const userData = await User.findById(id);

    return res.render("admin/adminUserDetails", {
      userData,
      title: "admin-usuarios",
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminAllNews = async (req, res, next) => {
  try {
    const allNews = await Post.find();
    return res.render("admin/adminAllNews", {
      allNews,
      title: "admin-noticias",
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminNextNews = async (req, res, next) => {
  try {
    const { title, subTitle, startDate, endDate } = req.query;

    const { page } = req.query;

    let filter = {};

    if (title) {
      filter.title = title;
    }

    if (subTitle) {
      filter.subTitle = subTitle;
    }

    let skip = 0;
    if (page && page > 0) {
      skip = (page - 1) * 10;
    }

    if (startDate && startDate != "" && endDate && endDate != "") {
      filter.createdAt = {
        $gte: moment(startDate)
          .utc(false)
          .hours(0)
          .minutes(0)
          .seconds(0)
          .format(),
        $lte: moment(endDate)
          .utc(false)
          .hours(23)
          .minutes(59)
          .seconds(59)
          .format(),
      };
    }
    const posts = await Post.find(filter).skip(skip).limit(10);
    const count = await Post.countDocuments(filter);

    return res.send({
      posts,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCreateNew = async (req, res, next) => {
  try {
    return res.render("admin/createNew", { title: "admin-noticias" });
  } catch (error) {
    next(error);
  }
};

exports.postCreateNew = async (req, res, next) => {
  try {
    const body = req.body;
    const newPost = new Post({
      title: body.title,
      subTitle: body.subTitle,
      image: body.image,
      content: body.content,
      fileUrl: body.file,
      link: body.link,
    });
    await newPost.save();
    req.flash("success", { msg: `La noticia ${newPost.title} se ha creado!` });
    return res.redirect("/admin/noticias");
  } catch (error) {
    next(error);
  }
};

exports.getUpdateNew = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.render("admin/updateNew", { post, title: "admin-noticias" });
  } catch (error) {
    next(error);
  }
};

exports.postUpdateNew = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const body = req.body;
    post.title = body.title || post.title;
    post.subTitle = body.subTitle || post.subTitle;
    post.image = body.image || post.image;
    post.content = body.content || post.content;
    post.fileName = body.fileName || post.fileName;
    post.fileUrl = body.file || post.fileUrl;
    post.link = body.link || post.link;
    await post.save();
    req.flash("success", {
      msg: `La noticia ${post.title} se ha actualizado!`,
    });
    return res.redirect("/admin/noticias");
  } catch (error) {
    next(error);
  }
};

exports.getExport = async (req, res, next) => {
  try {
    const users = await User.find();
    const workbook = new Excel.Workbook();
    var sheet = workbook.addWorksheet("Usuarios");
    sheet.columns = [
      { header: "Nombres y apellidos", key: "name", width: 30 },
      { header: "Tipo de documento", key: "docType", width: 18 },
      { header: "Número de documento", key: "document", width: 20 },
      { header: "Telefóno por defecto", key: "mainTelephone", width: 20 },
      { header: "Telefóno secundario", key: "secondaryTelephone", width: 20 },
      { header: "Historial telefónico", key: "telephoneRecord", width: 30 },
      { header: "Correo electrónico Sperant", key: "sperantEmail", width: 40 },
      { header: "Correo electrónico actual", key: "email", width: 40 },
      { header: "Historial de correos", key: "emailRecord", width: 30 },
      { header: "Dirección actual", key: "address", width: 40 },
      { header: "Coordenada actual(long,lat)", key: "point", width: 40 },
      { header: "Referencia actual", key: "reference", width: 30 },
      { header: "Historial de direcciones", key: "addressRecord", width: 30 },
      {
        header: "Historial de coordenadas(long,lat)",
        key: "pointRecord",
        width: 30,
      },
    ];

    sheet.getRow(1).font = { bold: true };
    const rows = [];
    users.forEach((user) => {
      let points = "";
      for (i = 0; i < user.profile.pointRecord.length; i++) {
        if (i != user.profile.pointRecord.length - 1) {
          points =
            points +
            "(" +
            user.profile.pointRecord[i].coordinates.toString() +
            "),";
        } else {
          points =
            points +
            "(" +
            user.profile.pointRecord[i].coordinates.toString() +
            ")";
        }
      }
      rows.push({
        name: user.profile.name || "",
        docType: user.profile.docType || "",
        document: user.profile.document || "",
        mainTelephone: user.profile.mainTelephone || "",
        secondaryTelephone: user.profile.secondaryTelephone || "",
        telephoneRecord: user.profile.telephoneRecord.toString() || "",
        sperantEmail: user.profile.sperantEmail || "",
        email: user.email || "",
        emailRecord: user.profile.emailRecord.toString() || "",
        address: user.profile.address || "",
        point: user.profile.point
          ? "(" + user.profile.point.coordinates.toString() + ")"
          : "",
        reference: user.profile.reference || "",
        addressRecord: user.profile.addressRecord.toString() || "",
        pointRecord: user.profile.pointRecord ? points : "",
      });
    });
    sheet.addRows(rows);
    const currentMoment = moment().format("DD-MM-YYYY,hh:mm");
    const filename = `Usuarios-(${currentMoment}).xlsx`;
    const filepath = path.join(__dirname, `../uploads/${filename}`);
    fs.appendFileSync(filepath);
    workbook.xlsx.writeFile(filepath).then(function () {
      res.download(filepath, filename, (err) => {
        if (err) next(err);

        fs.unlinkSync(filepath);
      });
    });
  } catch (error) {
    req.flash("errors", { msg: "Ups! Hubo un error" });
    return res.redirect("back");
  }
};

exports.getUpdatePublicity = async (req, res, next) => {
  try {
    const publicity = await Publicity.findOne();
    return res.render("admin/updatePublicity", {
      publicity,
      title: "admin-noticias",
    });
  } catch (error) {
    next(error);
  }
};

exports.postUpdatePublicity = async (req, res, next) => {
  try {
    const body = req.body;
    const publicity = await Publicity.findOne();
    if (publicity) {
      publicity.disponible = body.disponible || publicity.disponible;
      publicity.image = body.image || publicity.image;
      publicity.link = body.link || publicity.link;
      await publicity.save();
      req.flash("success", { msg: `Publicidad actializada!` });
      return res.redirect("/admin/noticias");
    } else {
      const newPublicity = new Publicity({
        disponible: body.disponible,
        image: body.image,
        link: body.link,
      });
      await newPublicity.save();
      req.flash("success", { msg: `Publicidad creada!` });
      return res.redirect("/admin/noticias");
    }
  } catch (error) {
    next(error);
  }
};

exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    return res.render("admin/adminMaterials", {
      materials,
      title: "admin-materiales",
    });
  } catch (error) {
    console.log(error);
    req.flash("errors", { msg: `Error al subir Excel!` });
    return res.redirect("back");
  }
};

exports.postMaterials = async (req, res) => {
  try {
    const { file } = req;
    const filePath = file.path;
    const result = excelToJson({
      sourceFile: filePath,
      header: {
        rows: 1,
      },
    });
    let excelArr = []
    let codes = []
    for (let key in result) {
      if (result.hasOwnProperty(key)) {
        codes.push(key);
      }
    }
    if (result[[codes[0]]].length > 0) {
      for (let index = 0; index < result[[codes[0]]].length; index++) {
        if (result[[codes[0]]][index].A == 'PIEDRA CHANCADA DE 1/2"') {
          excelArr.splice(0, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'ARENA GRUESA') {
          excelArr.splice(1, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'ARENA FINA') {
          excelArr.splice(2, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'CEMENTO PORTLAND TIPO MS (42.5KG)') {
          excelArr.splice(3, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'AGUA') {
          excelArr.splice(4, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'ALAMBRE NEGRO RECOCIDO # 16') {
          excelArr.splice(5, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'ALAMBRE NEGRO RECOCIDO # 8') {
          excelArr.splice(6, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'ACERO DE REFUERZO fy= 4,200 Kg/cm2  G-60') {
          excelArr.splice(7, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'CLAVOS C/CABEZA DE 2 1/2PLG, 3PLG, 3 1/2PLG, 4PLG') {
          excelArr.splice(8, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'PIEDRA GRANDE (MAX. 8PLG)') {
          excelArr.splice(9, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'GRAVILLA') {
          excelArr.splice(10, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'LADRILLO DE ARCILLA P/TECHO DE 15x30x30 cm') {
          excelArr.splice(11, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'LADRILLO KK DE ARCILLA 24x13x9 cm') {
          excelArr.splice(12, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'AGUARRAS') {
          excelArr.splice(13, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'LIJA PARA FIERRO') {
          excelArr.splice(14, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'SELLADOR PARA MUROS P/PINTURA OLEO MATE') {
          excelArr.splice(15, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        } else if (result[[codes[0]]][index].A == 'PINTURA OLEO MATE') {
          excelArr.splice(16, 0, { name: result[[codes[0]]][index].A, unit: result[[codes[0]]][index].B, price: result[[codes[0]]][index].C })
        }
      }
    } else {
      req.flash('errors', { msg: `Formato excel erroneo!` });
      return res.redirect('/admin/materiales');
    }
    console.log(excelArr)
    const oldMaterial = await Material.find()
    if (oldMaterial.length > 0) {
      await Material.deleteMany()
    }
    await Material.insertMany(excelArr).then(function () {
      fs.unlinkSync(filePath);
    });

    req.flash('success', { msg: `Materiales actualizados!` });
    return res.redirect('/admin/materiales');
  } catch (error) {
    console.log(error);
    req.flash("errors", { msg: "error!" });
    return res.redirect("back");
  }
};

exports.getQuotes = async (req, res) => {
  return res.render("admin/adminQuotes", {
    title: "admin-cotizaciones",
  });
};

exports.getQuoteDetail = async (req, res) => {
  try {
    const quoteId = req.params.id
    const quote = await Quote.findById(quoteId)
    return res.render("quote/quoteDetail", {
      title: "admin-cotizaciones",
      quote
    });
  } catch (error) {
    console.log(error)
    req.flash("errors", {
      msg: "Error al intentar obtener cotización",
    });
    return res.redirect('back');
  }
};

exports.getNextQuotes = async (req, res, next) => {
  try {
    let { status, startProject, month, startDate, endDate } = req.query;

    const { page } = req.query;

    let filter = {};

    if (status && status != '') {
      if (status == 'true') {
        filter.counseling = true;
      } else {
        filter.counseling = false;
      }

    }
    if (startProject && startProject != '') {
      if (startProject == 'true') {
        filter.startProject = true;
      } else {
        filter.startProject = false;
      }
    }
    if (month && month != "") {
      console.log(month)
      month = parseInt(month)
      filter.month = month
    }

    let skip = 0;
    if (page && page > 0) {
      skip = (page - 1) * 10;
    }

    if (startDate && startDate != "" && endDate && endDate != "") {
      filter.createdAt = {
        $gte: moment(startDate)
          .utc(false)
          .hours(0)
          .minutes(0)
          .seconds(0)
          .format(),
        $lte: moment(endDate)
          .utc(false)
          .hours(23)
          .minutes(59)
          .seconds(59)
          .format(),
      };
    }
    const sumAggregate = (
      await Quote.aggregate([
        {
          $addFields: {
            month: {
              $month: '$createdAt'
            }
          }
        },
        {
          $match: filter,
        },
        {
          $group: {
            _id: null,
            amount: {
              $sum: "$totalCostNumber"
            }
          }
        }
      ])
    )[0];
    const aggregate = (
      await Quote.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
          },
        },
        {
          $unwind: {
            path: "$owner",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            month: {
              $month: '$createdAt'
            }
          }
        },
        {
          $match: filter,
        },
        {
          $facet: {
            count: [
              {
                $count: "count",
              },
            ],
            quotes: [
              {
                $sort: {
                  createdAt: -1,
                },
              },
              {
                $skip: skip,
              },
              {
                $limit: 10,
              },
            ],
          },
        }
      ])
    )[0];
    // const quotes = await Quote.find(filter).skip(skip).sort({createdAt: -1}).limit(10);
    const count = aggregate
      ? aggregate.count.length > 0
        ? aggregate.count[0].count
        : 0
      : 0;
    const quotes = aggregate
      ? aggregate.quotes.length > 0
        ? aggregate.quotes
        : []
      : [];
    const amount = sumAggregate
      ? sumAggregate.amount
        ? sumAggregate.amount
        : 0
      : 0;
    return res.send({
      amount,
      quotes,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

exports.exportQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find().populate("owner");
    const workbook = new Excel.Workbook();
    var sheet = workbook.addWorksheet("Cotizaciones");
    sheet.columns = [
      { header: "Tipo de construción", key: "type", width: 30 },
      { header: "Usuario", key: "user", width: 18 },
      { header: "Número de documento", key: "document", width: 20 },
      { header: "Correo electrónico", key: "email", width: 20 },
      { header: "Número de contacto", key: "telephone", width: 20 },
      { header: "Origen de captación", key: "origin", width: 30 },
      { header: "Fecha tentativa", key: "dateTentative", width: 40 },
      { header: "Habitaciones", key: "rooms", width: 40 },
      { header: "Costo final", key: "finalPrice", width: 30 },
      { header: "Fecha", key: "dateCreated", width: 40 },
      { header: "Asesoria", key: "counseling", width: 40 },
      { header: "Comenzar proyecto", key: "start", width: 30 },
      { header: "Lotes", key: "addresses", width: 30 }
    ];

    sheet.getRow(1).font = { bold: true };
    const rows = [];
    quotes.forEach((quote) => {
      let pay = Math.ceil(quote.totalCostNumber)
      let formatter = new Intl.NumberFormat('en-US');
      pay = "S/" + formatter.format(pay)
      let addresses = ''
      quote.addresses.forEach((a, i) => {
        if (quote.addresses.length == 1) {
          addresses = a
        } else if (i < quote.addresses.length - 1) {
          addresses = addresses + a + " | "
        } else {
          addresses = addresses + a
        }
      })
      rows.push({

        type: quote.projectType || "",
        user: quote.owner.profile.name || "",
        document: quote.owner.profile.document || "",
        email: quote.owner.profile.sperantEmail || quote.owner.email || "",
        telephone: quote.owner.profile.main_telephone || quote.owner.profile.secondaryTelephone || "",
        origin: quote.quoteType || "",
        dateTentative: quote.startDate || "",
        rooms: quote.projects.length + " habitaciones" || "",
        finalPrice: pay || "",
        dateCreated: moment(quote.createdAt).add(5, "hours").format("DD/MM/YYYY") || "",
        counseling: quote.counseling ? 'Si' : 'No' || "",
        start: quote.startProject ? 'Si' : 'No',
        addresses: quote.addresses && quote.addresses.length > 0 ? addresses : ""
      });
    });
    sheet.addRows(rows);
    const currentMoment = moment().format("DD-MM-YYYY,hh:mm");
    const filename = `Cotizaciones-(${currentMoment}).xlsx`;
    const filepath = path.join(__dirname, `../uploads/${filename}`);
    fs.appendFileSync(filepath);
    workbook.xlsx.writeFile(filepath).then(function () {
      res.download(filepath, filename, (err) => {
        if (err) next(err);
        fs.unlinkSync(filepath);
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.listFrequentQuestions = async (_req, res, next) => {
  return res.render("admin/listFrequentQuestions", {
    title: "admin-preguntas-frecuentes",
  });
};

exports.getFrequentQuestions = async (req, res, next) => {
  try {
    const { query } = req;
    const { skip, page, limit } = util.formatPaginateValues(query);

    let conditions = {}

    if(query.title) conditions.question =  { $regex: query.title, $options: 'i' };
    if(query.category) conditions.category = query.category;


    const frequentQuestions = await FrequentQuestion.find(conditions).sort({ order: 1 }).skip(skip).limit(limit);
    const count = await FrequentQuestion.countDocuments(conditions);

    return res.json({
      frequentQuestions: frequentQuestions,
      pagination: util.paginate(page, limit, count),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getQuestionsCategories = async (_req, res, next) => {
  try {
    const questionsCategories = await QuestionCategory.find({});

    return res.json({
      questionsCategories: questionsCategories,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.createFrequentQuestions = async (_req, res, next) => {
  try {
    const questionCategories = await QuestionCategory.find({})

    return res.render("admin/createFrequentQuestions", {
      title: "admin-preguntas-frecuentes",
      questionCategories: questionCategories,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postCreateFrequentQuestions = async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.category || body.category == 'no category') {
      req.flash('info', { msg: 'Debe elegir una categoría' });
      return res.redirect('back');
    }

    const questionCount = await FrequentQuestion.countDocuments();
    await FrequentQuestion.create({
      question: body.question,
      answer: body.answer,
      order: questionCount,
      category: body.category,
    })

    return res.redirect('/admin/preguntas-frecuentes')
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateFrequentQuestions = async (req, res, next) => {
  try {
    const { params } = req;

    const questionCategories = await QuestionCategory.find({})
    const frequentQuestion = await FrequentQuestion.findById(params.id).populate('category')

    return res.render('admin/updateFrequentQuestions', {
      title: 'actualizar-pregunta-frecuente',
      frequentQuestion: frequentQuestion,
      questionCategories: questionCategories,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postUpdateFrequentQuestions = async (req, res, next) => {
  try {
    const { params, body } = req;

    await FrequentQuestion.findByIdAndUpdate(
      params.id,
      {
        question: body.question ,
        answer: body.answer,
        category: body.category,
      },
      { new: true }
    );
    
    req.flash('success', { msg: 'Pregunta editada exitosamente' })
    return res.redirect(`/admin/preguntas-frecuentes`)
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postUpdateorderFrequentQuestions = async (req, res, next) => {
  try {
    const { params, body } = req;

    const newOrder = Number(body.order)

    const frequentQuestion = await FrequentQuestion.findById(params.id)
    if ( frequentQuestion.order == newOrder || isNaN(newOrder) ) return res.status(400).json({ msg: 'Invalid new question order' })

    const updatedFrequentQuestion = await FrequentQuestion.findByIdAndUpdate(params.id, { order: newOrder }, { new: true });

    const isNewOrderGreater = newOrder > frequentQuestion.order

    const greaterThan = isNewOrderGreater ? frequentQuestion.order : newOrder - 1;
    const lesserThan = isNewOrderGreater ?  newOrder + 1 : frequentQuestion.order;

    await FrequentQuestion.updateMany(
      { _id: {
          $ne: frequentQuestion._id
        },
        order: { $gt: greaterThan, $lt: lesserThan },
      },
      { $inc: { order: isNewOrderGreater ? -1 : 1 } },
    );


    return res.json({
      msg: 'Frequent question order updated successfully',
      frequentQuestion: updatedFrequentQuestion,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteUpdateFrequentQuestions = async (req, res, next) => {
  try {
    const { params } = req;

    const frequentQuestion =  await FrequentQuestion.findByIdAndDelete(params.id)
    await FrequentQuestion.updateMany(
      { order: { $gt: frequentQuestion.order } },
      { $inc: { order: -1 } },
    );

    return res.json({
      msg: 'Frequent question deleted successfully'
    })
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.getExchangeRate = async (req, res, next) => {
  try {
    const exchangeRate = await ExchangeRate.findOne({ name: 'actual' })
    return res.render("admin/exchangeRate", {
      title: 'tipo-cambio',
      exchangeRate: exchangeRate,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.postUpdateExchangeRate = async (req, res, next) => {
  try {
    const { body } = req;

    const count = await ExchangeRate.countDocuments()
    if (!count) {
      await ExchangeRate.create({ name: 'actual', value: body.value })
    } else {
      await ExchangeRate.findOneAndUpdate({ name: 'actual' }, { value: body.value || value })
    }

    req.flash('success', { msg: 'Tipo de cambio actualizado exitosamente.' })
    return res.redirect('back')
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.exportRequests = async (req, res, next) => {
  try {
    const cols = [
      { header: 'Nombre', key: 'userName' },
      { header: 'Nombre del proyecto', key: 'nameProject' },
      { header: 'Estado', key: 'status' },
      { header: 'Fecha de creación', key: 'createdAt' },
      { header: 'Hora de creación', key: 'creationHour' },
      { header: 'Dias transcurridos', key: 'diffDays' },
      { header: 'Correo', key: 'email' },
      { header: 'Asunto', key: 'subject' },
      { header: 'Descripción', key: 'detail' },
      { header: 'Comentarios', key: 'commentsHistory' },
    ]

    const { status, project, startDate, endDate } = req.query;

    let filter = {};

    if (status) filter.status = Number(status);

    if (project) filter.nameProject = project;

    if (startDate && startDate != "" && endDate && endDate != "") {
      filter.createdAt = {
        $gte: moment(startDate).utc(false).hours(0).minutes(0).seconds(0).format(),
        $lte: moment(endDate).utc(false).hours(23).minutes(59).seconds(59).format(),
      };
    }
    const requests = await Request.find(filter).sort({ createdAt: -1 }).populate('user')

    const rows = await Promise.all(requests.map(async (request) => {
      let created = request.createdAt
      let status
      if (request.status == 0) status = 'Sin responder'
      else if (request.status == 1) status = 'Respondido'
      else status = 'Finalizado'

      let commentsHistory = ''
      if (request.status != 0) {
        const aggregate = await Comment.aggregate([
          { $match: { requestId: mongoose.Types.ObjectId(request._id) } },
          { $group: { _id:'comments', comments: { $push: '$content' } } }
        ])

        if (aggregate[0] && aggregate[0].comments) {
          commentsHistory = aggregate[0].comments.join(', ')
        }
      }

      return {
        userName: request.userName,
        nameProject: request.nameProject,
        status: status,
        createdAt: moment(created).format("DD/MM/YYYY"),
        creationHour: moment(created).format('HH:mm:ss'),
        diffDays: parseInt(moment.duration(moment().diff(created)).asDays()),
        email: request.user.email,
        subject: request.subject,
        detail: request.detail,
        commentsHistory: commentsHistory,
      }
    }))

    console.log('creating workbook')

    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet('Consultas')

    worksheet.columns = cols
    worksheet.addRows(rows)

    const currentMoment = moment().format("DD-MM-YYYY,hh:mm")
    const filename = `Consultas-(${currentMoment}).xlsx`
    const filepath = path.join(__dirname, `../uploads/${filename}`)

    fs.appendFileSync(filepath)

    workbook.xlsx.writeFile(filepath).then(function () {
      res.download(filepath, filename, (err) => {
        if (err) next(err)
        fs.unlinkSync(filepath)
      })
    })
  } catch (error) {
    console.log(error)
    req.flash('error', { msg: 'Ups, hubo un error, inténtelo más tarde' })
    res.redirect('back')
  }
}

exports.exportReferals = async (req, res, next) => {
  try {
    const cols = [
      { header: 'Nombre referidor', key: 'referrerName' },
      { header: 'DNI referidor', key: 'referrerDocument' },
      { header: 'Correo referidor', key: 'referreremail' },
      { header: 'Teléfono referidor', key: 'referrerPhone' },
      { header: 'Nombre referido', key: 'referalName' },
      { header: 'DNI referido', key: 'referalDocument' },
      { header: 'Correo referido', key: 'referalEmail' },
      { header: 'Teléfono referido', key: 'referalPhone' },
      { header: 'Proyecto de interés', key: 'project' },
      { header: 'Comentarios', key: 'comments' },
      { header: 'Estado de la referencia', key: 'status' },
    ]

    const { status, projectType, name, startDate, endDate } = req.query;

    let filter = {};

    if (status) filter.sperantStatus = status

    if (projectType) filter.projectType = projectType

    if (name) filter.name = name

    if (startDate && startDate != "" && endDate && endDate != "") {
      filter.createdAt = {
        $gte: moment(startDate).utc(false).hours(0).minutes(0).seconds(0).format(),
        $lte: moment(endDate).utc(false).hours(23).minutes(59).seconds(59).format(),
      }
    }

    const references = await Referred.find(filter).populate('referencerId')

    const projects = await Sperant.getAllProjects()

    const projectDictionary = {}

    const rows = references.map(referal => {
      let projectName
      if (!projectDictionary[referal.projectId]) {
        const project = projects.find(project => project.id == referal.projectId )
        if (project) {
          projectDictionary[referal.projectId] = project.name
          projectName = projectDictionary[referal.projectId]
        }
      } else {
        projectName = projectDictionary[referal.projectId]
      }

      return {
        referrerName: referal.referencerId.profile.name,
        referrerDocument: referal.referencerId.profile.document,
        referreremail: referal.referencerId.email,
        referrerPhone: referal.referencerId.mainTelephone,
        referalName: referal.name,
        referalDocument: referal.dni,
        referalEmail: referal.email,
        referalPhone: referal.phone,
        project: projectName,
        comments: referal.comments,
        status: referal.sperantStatus,
      }
    })

    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet('Referidos')

    worksheet.columns = cols
    worksheet.addRows(rows)

    const currentMoment = moment().format("DD-MM-YYYY,hh:mm")
    const filename = `Referidos-(${currentMoment}).xlsx`
    const filepath = path.join(__dirname, `../uploads/${filename}`)

    fs.appendFileSync(filepath)

    workbook.xlsx.writeFile(filepath).then(function () {
      res.download(filepath, filename, (err) => {
        fs.unlink(filepath, (err) => {
          if (err) console.log(error)
          console.log('deleted')
        })
      })
    })
  } catch (error) {
    console.log(error)
    req.flash('error', { msg: 'Ups, hubo un error, inténtelo más tarde' })
    res.redirect('back')
  }
}