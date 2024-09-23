require("dotenv").config();

const { promisify } = require("util");
const crypto = require("crypto");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const validator = require("validator");
const mailChecker = require("mailchecker");
const moment = require("moment");
const axios = require("axios");
const apiclicksend = require("clicksend/api");
const multer = require("multer");
const path = require("path");
const OneSignal = require("onesignal-node");
const { proyectAttendantMapper } = require("./request.constants");
const util = require("../util");
// MAIL SENDER
// VALIDATORS
// DAY FORMATER
// HTTP REQUEST

// MAIL SENDER
// VALIDATORS
// DAY FORMATER
// HTTP REQUEST
// MONGO MODELS
const Point = require("../models/Point");
const Push = require("../models/Push");
const Notification = require("../models/Notification");
const Request = require("../models/Request");
const User = require("../models/User");
const Analytic = require("../models/Analytic");
const QuestionCategory = require("../models/QuestionCategory");
const QuestionAnswerRating = require("../models/QuestionAnswerRating");
const FrequentQuestion = require("../models/FrequentQuestion");
const CIP = require("../models/CIP");
const ExchangeRate = require("../models/ExchangeRate");
const { SperantV3 } = require("../services/sperant");

const Sperant = new SperantV3();
const { BIV1 } = require("../services/bi");

const BI = new BIV1();
const { MongoV1 } = require("../services/mongo");

const Mongo = new MongoV1();
const templates = require("../mails/templates");
const sendgrid = require("../mails/sendgrid");
const QuestionSubcategory = require("../models/QuestionSubcategory");

const errorCodes = require("../messages/error.codes");
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
const randomBytesAsync = promisify(crypto.randomBytes);

/**
 * GET /login
 * Login page.
 */
exports.getLogin = async (req, res) => {
  if (req.user) {
    return res.redirect("/inmuebles");
  }
  return res.render("account/login", {
    title: "Login",
  });
};

exports.postUploadManual = async (req, res) => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      // Uploads is the Upload_folder_name
      cb(null, "uploads");
    },
    filename(req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.originalname}`);
    },
  });

  // Define the maximum size for uploading
  // picture i.e. 1 MB. it is optional
  const maxSize = 5 * 1000 * 1000;

  const upload = multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter(req, file, cb) {
      // Set the filetypes, it is optional
      const filetypes = /jpeg|jpg|png|pdf/;
      const mimetype = filetypes.test(file.mimetype);

      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      if (mimetype && extname) {
        return cb(null, true);
      }

      cb(
        `${
          "Error: La subida de archivos solo soporta " +
          "los siguientes tipos de archivo - "
        }${filetypes}`
      );
    },
  }).single("file_manual");

  try {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err,
        });
      }

      return res.status(200).json({
        success: true,
        message: "El archivo ha subido correctamente",
      });
    });
  } catch (err) {
    console.log("uploading error", err);
  }
};

/**
 * @method
 * @desc Inicio de sesión
 * @param {integer} docType Tipo de Documento
 * @param {integer} docNumber Numero de Documento
 * @param {integer} password Contraseña
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example let user =  await User.findOne({ "profile.document": docNumber }).lean()

 /*     if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        let token = jwt.sign(
          { user_id: user._id, email: user.email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        user.token = token;

        // user
        res.status(200).json(user);
      }
 */
exports.postLoginM = async (req, res, next) => {
  // Our login logic starts here
  try {
    // Get user input
    const { docType, docNumber, password } = req.body;

    let docTypeB = "";

    if (docType === "CE") {
      docTypeB = "INMIGRATIONCARD";
    } else {
      docTypeB = docType;
    }

    const analytic = new Analytic({
      rawData: {
        docTypeB,
        docNumber,
      },
      type: "login_iniciado",
    });
    await analytic.save();

    if (
      req.body["g-recaptcha-response"] === undefined ||
      req.body["g-recaptcha-response"] === "" ||
      req.body["g-recaptcha-response"] === null
    ) {
      return res.status(200).json({
        success: false,
        message: "Se necesita un recaptcha válido",
      });
    }

    // Validate user input
    if (!(docType && docNumber && password)) {
      return res.status(200).json({
        success: false,
        message: "Se necesita ingresar número de documento y contraseña",
      });
    }

    try {
      // Validate if user exist in our database
      const user = await User.findOne({ "profile.document": docNumber });
      // const client = await Sperant.getClientByDocument(docNumber);
      const client = await Sperant.getClientByDocument(docNumber);
      if (!user) {
        if (client) {
          return res.status(200).json({
            success: false,
            code: "AUTH_NOT_REGISTERED_002",
            message: errorCodes.AUTH_NOT_REGISTERED_002.message,
          });
        }
        return res.status(200).json({
          success: false,
          code: 20003,
          message:
            "Lo sentimos. Este documento no pertenece a un cliente de Menorca.",
        });
      }

      // console.log('docType, user.profile.docType', docType, user.profile.docType);

      if (user.profile.docType !== docTypeB) {
        return res.status(200).json({
          success: false,
          code: 20001,
          message:
            "Por favor ingrese con el tipo de documento con el que está registrado.",
        });
      }

      // Update
      // var client = await Sperant.getClientById(sperantClientId);
      // let user =  await User.findOne({ "profile.sperantClientId": client.id });

      //const client = await Sperant.getClientByDocument(docNumber);

      /* if (!user.active) {
              return res.status(200).json({
                success: false,
                code: 20004,
                message: "Aún no está registrado en la Ventana Menorca. Activa tu cuenta usando el siguiente enlace:"
              });
            } */

      user.profile.name = `${client.firstName} ${client.lastName}`;
      user.profile.docType = client.documentType;
      user.profile.document = client.document;
      user.profile.phone = formatCellphone(client.phone);
      user.profile.mainTelephone = client.mainTelephone;
      user.profile.sperantEmail = client.email;
      user.profile.sperantClientId = client.id;
      // user.email = client.email;

      const correctPassword = await bcrypt.compare(password, user.password);

      const secretKey = "6LeJJnUeAAAAAMNdM1X5rgxe8Pen-poHQmKtSHNr";
      const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body["g-recaptcha-response"]}&remoteip=${req.connection.remoteAddress}`;

      const { data } = await axios.post(
        verificationURL,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
        }
      );

      /* return res.status(200).json({
              success: true,
              data: data
            }); */

      // data.success &&
      if (user && correctPassword) {
        // Create token
        const token = jwt.sign(
          {
            user_id: user._id,
            email: user.profile.sperantEmail,
          },
          "ventanamenorca9476928734"
        );

        if (token) {
          user.token = token;
          user.save();

          const analytic = new Analytic({
            rawData: {
              name: user.profile.name,
              docType: user.profile.docType,
              document: user.profile.document,
              sperantClientId: user.profile.sperantClientId,
            },
            type: "login_aprobado",
          });
          await analytic.save();

          return res.status(200).json({
            success: true,
            data: user,
          });
        }

        return res.status(200).json({
          success: false,
          message: "Error al validar.",
        });
      }

      return res.status(200).json({
        success: false,
        message: "La contraseña ingresada es incorrecta.",
      });
    } catch (err) {
      console.log(err);
      if (
        err.message == "Este número de documento no es de un cliente de Menorca"
      ) {
        return res.status(200).json({
          success: false,
          message: "Este número de documento no existe.",
        });
      }
      return res.status(200).json({
        success: false,
        message: err.message,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: err,
    });
  }
  // Our register logic ends here
};

exports.postLoginWithCellphone = async (req, res, next) => {
  const { body } = req;

  const { cellphone } = req.body;
  // Validate user input
  if (!cellphone) {
    return res.status(200).json({
      success: false,
      message: "Se necesita ingresar número de celular",
    });
  }

  const pin = Math.floor(1000 + Math.random() * 9000);

  const client = await Sperant.getClientByPhone(cellphone);

  if (!client) {
    return res.status(200).json({
      success: false,
      message: "El número ingresado no existe.",
    });
  }

  const user = await User.findOne({ "profile.sperantClientId": client.id });
  /* if (user == null) {
      return res.status(200).json({
        success: false,
        message: "El número ingresado no existe."
      });
    } */
  if (user) {
    if (!user.active) {
      return res.status(200).json({
        success: false,
        code: 20004,
        message:
          "Aún no está registrado en la Ventana Menorca. Activa tu cuenta usando el siguiente enlace:",
      });
    }

    console.log("sms code", pin);
    user.smsPin = pin;
    user.profile.name = `${client.firstName} ${client.lastName}`;
    user.profile.docType = client.documentType;
    user.profile.document = client.document;
    user.profile.phone = formatCellphone(client.phone);
    user.profile.mainTelephone = client.mainTelephone;
    user.profile.sperantEmail = client.email;

    user.save((err) => {
      if (err) {
        return res.status(200).send({
          success: false,
          message: "Error al guardar",
        });
      }
    });

    /* SMS */
    const smsApi = new apiclicksend.SMSApi(
      "serviciosmenorca@picnic.pe",
      "7DBC921B-98E1-D326-08A3-98C4023F1E90"
    );

    const smsMessage = new apiclicksend.SmsMessage();

    smsMessage.source = "sdk";
    smsMessage.to = `+51${cellphone}`;
    smsMessage.body = `Su codigo de verificacion para Ventana Menorca es: ${pin}`;

    const smsCollection = new apiclicksend.SmsMessageCollection();

    smsCollection.messages = [smsMessage];

    smsApi
      .smsSendPost(smsCollection)
      .then(
        (
          response // console.log(response.body);
        ) =>
          res.status(200).json({
            success: true,
            message: "Se ha enviado un SMS con el código.",
          })
      )
      .catch((err) => {
        console.error(err.body);
        return res.status(200).json({
          success: true,
          message: err,
        });
      });
    /* SMS */
  }

  return res.status(200).json({
    success: false,
    code: "AUTH_NOT_REGISTERED_002",
    message: "El número ingresado no existe.",
  });
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      console.log("Error : Failed to destroy the session during logout.", err);
    }
    req.user = null;
    res.redirect("/");
  });
};

/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/account");
  }
  return res.render("account/signup", {
    title: "Create Account",
  });
};

/**
 * @method
 * @desc Enlace de verificación
 * @param {object} req req
 * @param {object} res res
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getVerifyAccount = async (req, res) => {
  try {
    const { token } = req.params;
    // console.log('token',token);

    if (!token) {
      return res.status(404).send({
        success: false,
        message: "El enlace ha expirado o es incorrecto",
      });
    }

    try {
      const decoded = jwt.verify(token, "signupcomplete");
      console.log("decoded", decoded);
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: "El enlace ha expirado o es incorrecto",
      });
    }

    User.findOne({
      confirmationCode: token,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "El enlace ha expirado o es incorrecto",
          });
        }

        user.active = true;
        user.confirmationCode = "";

        user.save((err) => {
          if (err) {
            res.status(400).send({
              success: false,
              message: err,
            });
            return;
          }

          return res.status(200).json({
            success: true,
            message: "Cuenta confirmada",
          });
        });
      })
      .catch((e) => console.log("error", e));
  } catch (err) {
    console.log(err);
  }
};

/**
 * @method
 * @desc Listar todas las notificaciones
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getListNotification = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    const { query } = req;
    const { skip, page, limit } = util.formatPaginateValues(query);

    /* const conditions = {};

        if (query.title) conditions.question = { $regex: query.title, $options: 'i' };
        if (query.category) conditions.category = query.category; */

    const conditions = {
      user: userId,
      createdAt: {
        $gte: moment().add(-7, "days"),
      },
    };

    const notifications = await Notification.find(conditions)
      .sort({ order: 1 })
      .skip(skip)
      .limit(limit);
    const count = await Notification.countDocuments(conditions);

    return res.status(200).json({
      success: true,
      notifications,
      pagination: util.paginate(page, limit, count),
    });
  } catch (err) {
    console.log(err);
    res.status(200).send({
      success: false,
      message: err,
    });
  }
};

/**
 * @method
 * @desc Enviar notificación
 * @param {string} playerId playerId
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.postSendNotification = async (req, res, next) => {
  try {
    const client = new OneSignal.Client(
      "6fdfe5eb-52ba-4395-8468-718d0d10e431",
      "ZGExN2QwN2YtOGUxMy00ZjMxLWJlMWItNTkwNDA2MGRkODAw"
    );

    const notification = {
      contents: {
        en: "Notification from node",
        es: "Notificacion desde node",
      },
      include_player_ids: [
        "12c6a4f8-6270-11ec-87f6-d64f85ca6595",
      ] /* included_segments: ['Subscribed Users'],
            filters: [
              { field: 'tag', key: 'level', relation: '>', value: 10 }
            ] */,
    };

    // using async/await
    try {
      const response = await client.createNotification(notification);

      const token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, "ventanamenorca9476928734");
      const userId = decoded.user_id;

      const newNotification = new Notification();

      newNotification.user = userId;
      newNotification.message = JSON.stringify(notification.contents);
      // newNotification.markModified('notifications');

      newNotification.save((err, notification) => {
        if (err) return console.error(err);

        return res.status(200).json({
          success: true,
          message: `Notificacion enviada: ${response.body.id}`,
        });
      });
    } catch (e) {
      if (e instanceof OneSignal.HTTPError) {
        // When status code of HTTP response is not 2xx, HTTPError is thrown.

        return res.status(400).json({
          success: false,
          status: e.statusCode,
          message: e.body,
        });
      }
      return res.status(400).json({
        success: false,
        message: e,
      });
    }
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err,
    });
  }
};

/**
 * @method
 * @desc Guardar Player Id de OneSignal
 * @param {string} pushId Player Id
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.postSaveOneSignalUserId = async (req, res, next) => {
  try {
    const { body } = req;

    // console.log('body', body);

    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;
    console.log("userId", userId);

    const newPush = new Push();

    newPush.pushId = body.pushId;
    newPush.user = userId;
    newPush.markModified("pushes");

    newPush.save((err, push) => {
      if (err) return console.error(err);

      return res.status(200).json({
        success: true,
        message: push,
      });
    });
  } catch (err) {
    res.status(200).send({
      success: false,
      message: err,
    });
  }
};

exports.postChangePassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;

    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    const user = await User.findOne({ _id: userId });

    const correctPassword = await bcrypt.compare(password, user.password);
    // console.log(newPassword);
    // return;
    if (user && correctPassword) {
      console.log("user and password correct, saving new password");

      user.password = newPassword;
      user.save();

      return res.status(200).json({
        success: true,
        data: user,
        message: "La contraseña ha sido actualizada correctamente",
      });

      /* user.save((err) => {
                if (err) {
                  return res.status(200).send({
                    success: false,
                    message: err
                  });
                }

                return res.status(200).json({
                  success: true,
                  data: user
                });
              }); */
    }

    return res.status(200).json({
      success: false,
      message:
        "Hubo un error al cambiar la contraseña, por favor intentelo nuevamente.",
    });
  } catch (error) {
    if (error) {
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }
    console.log(error);
  }
};

exports.postResetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({ passwordResetToken: token });

    if (user == null) {
      return res.status(200).send({
        success: false,
        message: "El token no es válido o ha expirado",
      });
    }

    /* const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt); */
    user.password = password;
    // user.confirmationCode = '';

    const tokenJWT = jwt.sign(
      {
        user_id: user._id,
        email: user.profile.sperantEmail,
      },
      "ventanamenorca9476928734", // process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // return res.status(200).json(token);
    // save user token
    user.token = tokenJWT;

    user.save((err) => {
      if (err) {
        return res.status(200).send({
          success: false,
          message: err,
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    });
    // user.save();
  } catch (error) {
    if (error.message) {
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }
    console.log(error);
  }
};

exports.postCreatePasswordForAccount = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    // console.log(token, password);

    /* const decoded = jwt.verify(token, 'signupcomplete');
        var userId = decoded.user_id; */

    /* if (password.length < 6) {
          res.status(200).send({
            success: false,
            message: 'La contraseña debe ser mayor a 6'
          });
        } */

    // let user =  await User.findById(userId).lean();
    const user = await User.findOne({ confirmationCode: token });
    console.log("USER", user);
    /* console.log(user);
        return; */

    if (user == null) {
      return res.status(200).send({
        success: false,
        message: "El token no es válido o ha expirado",
      });
    }

    /* const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt); */
    user.password = password;
    // user.confirmationCode = '';

    const tokenJWT = jwt.sign(
      {
        user_id: user._id,
        email: user.profile.sperantEmail,
      },
      "ventanamenorca9476928734", // process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // return res.status(200).json(token);
    // save user token
    user.token = tokenJWT;
    user.active = true;

    user.save((err) => {
      if (err) {
        return res.status(200).send({
          success: false,
          message: err,
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    });
    // user.save();
  } catch (error) {
    if (error.message) {
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }
    console.log(error);
  }
};

exports.postVerifySMS = async (req, res, next) => {
  try {
    const { code, telephone } = req.body;

    User.findOne({ "profile.phone": telephone })
      .then((user) => {
        if (!user) {
          res.status(400).send({
            success: false,
            message: "El número ingresado no existe",
          });
        }

        console.log(user, code);

        if (user.smsPin == code) {
          user.smsPin = "";

          const token = jwt.sign(
            {
              user_id: user._id,
              email: user.profile.sperantEmail,
            },
            "ventanamenorca9476928734" // process.env.TOKEN_KEY,
            /* {
                            expiresIn: "2h",
                          } */
          );
          // return res.status(200).json(token);
          // save user token
          user.token = token;

          // user
          res.status(200).json({
            success: true,
            data: user,
          });
        } else {
          res.status(200).send({
            success: false,
            message: "El código ingresado no es válido",
          });
        }
      })
      .catch((error) => {
        res.status(200).send({
          success: false,
          message: "El número ingresado no existe",
        });
      });
  } catch (err) {}
};

exports.getVerifySMS = async (req, res, next) => {
  try {
    const { body } = req;

    const pin = Math.floor(1000 + Math.random() * 9000);
    // console.log(val);

    User.findOne({ "profile.phone": body.telephone })
      .then((user) => {
        if (!user) {
          res.status(400).send({
            success: false,
            message: "El número ingresado no existe",
          });
        }

        user.smsPin = pin;

        user.save((err) => {
          if (err) {
            res.status(400).send({
              success: false,
              message: "Error al guardar",
            });
          }

          return res.status(200).json({
            success: true,
            msg: "La información del perfil ha sido actualizada.",
          });
        });
      })
      .catch((error) => {
        res.status(400).send({
          success: false,
          message: "El número ingresado no existe",
        });
      });
  } catch (err) {}
};

exports.postResendSMS = async (req, res, next) => {
  try {
    const { userId } = req.body;

    /* console.log('userId', userId);
          return; */

    const existingUser = await User.findOne({
      "profile.sperantClientId": userId,
    });

    const token = jwt.sign({ user_id: existingUser.id }, "signupcomplete", {
      expiresIn: "2h",
    });

    // INSTANCE NEW USER
    // existingUser.confirmationCode = token;
    existingUser.passwordResetToken = token;
    existingUser.passwordResetExpires = Date.now() + 3600000;

    const activeAccountRecord = Date.now() + 3600000;

    const records = existingUser.activeAccountRecord;
    if (activeAccountRecord !== records[records.length - 1]) {
      existingUser.activeAccountRecord = records.concat([activeAccountRecord]);
    }

    const mailOptions = {
      to: existingUser.email,
      from: "no-reply@menorca.com.pe",
      subject: "Reinicio de contraseña de Menorca",
      text: `Hemos recibido su mensaje de restablecer contraseña.<br>
        Para continuar con el proceso haga click en el siguiente enlace: ${process.env.WEB_URL}/recuperar-contrasena/generar/${token} <br><br>
        Si no solicitó restablecer contraseña, ignore este correo.`,
    };

    await sendgrid(
      mailOptions.to,
      mailOptions.subject,
      templates.recoverPassword(token, existingUser.profile.name),
      async (response) => {
        // console.log('sendgrid response', response[0]);
        /* return res.status(200).send({
                  success: false,
                  code: 20004,
                  message: 'Datos actualizados sendgrid'
                }); */
      }
    );

    const smsApi = new apiclicksend.SMSApi(
      "serviciosmenorca@picnic.pe",
      "7DBC921B-98E1-D326-08A3-98C4023F1E90"
    );

    const smsMessage = new apiclicksend.SmsMessage();

    smsMessage.source = "sdk";
    smsMessage.to = `+51${existingUser.profile.phone}`;
    smsMessage.body = `Hemos recibido su mensaje de restablecer contraseña.\n
      Para continuar con el proceso haga click en el siguiente enlace: ${process.env.WEB_URL}/recuperar-contrasena/generar/${token} \n\n
      Si no solicitó restablecer contraseña, ignore este mensaje.`;

    const smsCollection = new apiclicksend.SmsMessageCollection();

    smsCollection.messages = [smsMessage];

    smsApi
      .smsSendPost(smsCollection)
      .then((response) => {
        // console.log(response.body);

        if (response.body.response_code == "SUCCESS") {
        }
      })
      .catch((err) => {
        console.error(err.body);
        return res.status(200).send({
          success: false,
          message: "Error al enviar SMS.",
        });
      });

    const savedUser = await existingUser.save();
    // console.log('savedUser', savedUser);

    return res.status(200).send({
      success: true,
      code: 30001,
      data: {
        email: formatEmail(existingUser.profile.sperantEmail),
        cellphone: formatTelephone(existingUser.profile.phone),
        user_id: userId,
      },
    });
  } catch (err) {}
};

/**
 * @method
 * @desc Registro
 * @param {integer} req Tipo de Documento
 * @param {integer} res Numero de Documento
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.postSignup = async (req, res) => {
  try {
    const { body } = req;

    const analyticIniciados = new Analytic({
      rawData: body,
      type: "registros_iniciados",
    });
    await analyticIniciados.save();

    const client = await Sperant.getClientByDocument(body.docNumber);

    let docType = "";

    if (body.docType === "CE") {
      docType = "INMIGRATIONCARD";
    } else {
      docType = body.docType;
    }

    if (client.documentType !== docType) {
      return res.status(200).json({
        success: false,
        code: 20001,
        message: "Por favor ingrese con el tipo de documento de su contrato",
      });
    }

    const budgets = await Sperant.getClientActiveBudgets(client.id);

    const validBudgets = await Sperant.getValidBudgets(budgets);

    if (validBudgets.length === 0) {
      let msg =
        "Debe poseer un inmueble en Menorca para poder registrarse en Ventana Menorca";
      return res.status(200).send({
        success: false,
        code: 20002,
        message: msg,
      });
    }

    const validBudgetId = validBudgets[0].id;
    const titular = await Sperant.getCoTitulars(validBudgetId, client.id);
    const existingUser = await User.findOne({
      "profile.document": body.docNumber,
    });

    if (existingUser && existingUser.active) {
      return res.status(200).send({
        success: false,
        code: 20003,
        message: "Un usuario con este numero de documento ya existe",
      });
    }

    const analytic = new Analytic({
      rawData: body,
      type: "registros_aprobados",
    });
    await analytic.save();

    if (existingUser && !existingUser.active) {
      const token = jwt.sign({ user_id: client.id }, "signupcomplete");

      // INSTANCE NEW USER
      existingUser.confirmationCode = token;

      const activeAccountRecord = Date.now() + 3600000;

      const records = existingUser.activeAccountRecord;
      if (activeAccountRecord !== records[records.length - 1]) {
        existingUser.activeAccountRecord = records.concat([
          activeAccountRecord,
        ]);
      }

      const emails = existingUser.profile.sperantEmail;
      const subject = "Confirmación de cuenta en Ventana Menorca";

      if (existingUser.profile.sperantEmail) {
        await sendgrid(
          emails,
          subject,
          templates.signupComplete(token, existingUser.profile.name),
          async (response) => {
            console.log("==================");
            console.log("sendgrid response", response);
            console.log("==================");
          }
        );
      }

      const smsApi = new apiclicksend.SMSApi(
        "serviciosmenorca@picnic.pe",
        "7DBC921B-98E1-D326-08A3-98C4023F1E90"
      );

      const smsMessage = new apiclicksend.SmsMessage();

      smsMessage.source = "sdk";
      smsMessage.to = `+51${existingUser.profile.phone}`;
      smsMessage.body = `Hola ${client.firstName}, gracias por registrarte en Ventana Menorca\n
      Completa tu registro haciendo clic en el siguiente enlace: ${process.env.WEB_URL}/completar-registro/${token}\n
      Atentamente,\n
      Ventana Menorca\n
      https://ventana.menorca.pe/`;

      const smsCollection = new apiclicksend.SmsMessageCollection();

      smsCollection.messages = [smsMessage];

      smsApi
        .smsSendPost(smsCollection)
        .then((response) => {
          // console.log(response.body);

          if (response.body.response_code === "SUCCESS") {
            console.log("success sms api");
          }
        })
        .catch((err) => {
          console.error(err.message);
          return res.status(200).send({
            success: false,
            message: "Error al enviar SMS.",
          });
        });

      const savedUser = await existingUser.save();

      return res.status(200).send({
        success: true,
        code: 30001,
        data: {
          email: savedUser.profile.sperantEmail
            ? formatEmail(savedUser.profile.sperantEmail)
            : "",
          cellphone: savedUser.profile.phone
            ? formatTelephone(savedUser.profile.phone)
            : "",
          user_id: client.id,
        },
      });
    }
    const token = jwt.sign({ user_id: client.id }, "signupcomplete", {
      expiresIn: "2h",
    });

    // INSTANCE NEW USER
    const newUser = new User({
      active: false,
      activeAccountRecord: [],
      confirmationCode: token,
      profile: {
        sperantClientId: client.id,
        name: `${client.firstName} ${client.lastName}`,
        docType: client.documentType,
        document: client.document,
        gender: client.gender,
        phone: formatCellphone(client.phone),
        mainTelephone: client.mainTelephone,
        sperantEmail: client.email,
        address: client.address,
      }, // password: body.password,
      email: client.email,
      titular: titular[0],
    });
    // INSTANCE NEW USER -END

    const activeAccountRecord = Date.now() + 3600000;

    const records = newUser.activeAccountRecord;
    if (activeAccountRecord !== records[records.length - 1]) {
      newUser.activeAccountRecord = records.concat([activeAccountRecord]);
    }

    // SAVE USER & LOGIN
    newUser.save(async (err) => {
      if (err) {
        console.log("error al guardar", err);
        res.status(200).send({
          success: false,
          message: err,
        });
        return;
      }

      const emails = newUser.profile.sperantEmail;
      const subject = "Confirmación de cuenta en Ventana Menorca";

      await sendgrid(
        emails,
        subject,
        templates.signupComplete(token, newUser.profile.name),
        async (response) => {
          const smsApi = new apiclicksend.SMSApi(
            "serviciosmenorca@picnic.pe",
            "7DBC921B-98E1-D326-08A3-98C4023F1E90"
          );

          const smsMessage = new apiclicksend.SmsMessage();

          smsMessage.source = "sdk";
          smsMessage.to = `+51${newUser.profile.phone}`;
          smsMessage.body = `Hola ${client.firstName}, gracias por registrarte en la Ventana Menorca\n
              Completa tu registro haciendo clic en el siguiente enlace: ${process.env.WEB_URL}/completar-registro/${token}\n
              Atentamente,\n
              Ventana Menorca\n
              https://ventana.menorca.pe/`;

          const smsCollection = new apiclicksend.SmsMessageCollection();

          smsCollection.messages = [smsMessage];

          smsApi
            .smsSendPost(smsCollection)
            .then((response) => {
              console.log("response.body", response.body);

              if (response.body.response_code === "SUCCESS") {
                return res.status(200).send({
                  success: true,
                  code: 30001,
                  data: {
                    email: formatEmail(newUser.profile.sperantEmail),
                    cellphone: formatTelephone(newUser.profile.phone),
                  },
                });
              }
            })
            .catch((err) => {
              console.error(err.body);
            });
        }
      );
    });
  } catch (error) {
    if (error.message) {
      // req.flash("errors", { msg: error.message });
      return res.status(200).json({
        success: false,
        code: "60003",
        message: error.message,
      });
      // return res.redirect('back');
    }
    console.log(error);
    // next(error);
  }
};

/**
 * GET /account
 * Profile page.
 */
exports.getAccount = async (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, "ventanamenorca9476928734");
  const userId = decoded.user_id;

  const user = await User.findOne({ _id: userId });
  let genderData = null;
  let gender = null;
  if (user.profile && user.profile.document && !user.profile.gender) {
    genderData = await BI.getUserGender(user.profile.document);
  }

  // if (genderData) {
  gender = user.profile.gender
    ? user.profile.gender
    : genderData.genero == "Masculino"
    ? "m"
    : "f";
  // }

  return res.status(200).json({
    success: true,
    data: user,
    id: user._id.toString(),
    gender,
  });
};

/**
 * @method
 * @desc Actualizar información de la cuenta
 * @param {string} email Correo
 * @param {integer} secondaryTelephone Teléfono de respaldo
 * @param {integer} address Dirección
 * @param {double} lat Latitud
 * @param {double} long Longitud
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.postUpdateProfile = async (req, res, next) => {
  // VALIDATIONS
  const { body } = req;
  const validationErrors = [];

  if (body.email == undefined) {
    validationErrors.push({
      message: "Debe ingresar un correo de recuperación",
      detail: "Asegurate que el correo de recuperación ingresado es correcto",
    });
  } else if (!validator.isEmail(body.email))
    validationErrors.push({
      message: "Por favor ingresa un correo de recuperación válido.",
    });

  if (body.secondaryTelephone == undefined) {
    validationErrors.push({
      message: "Debe ingresar un teléfono de respaldo",
      detail:
        "Asegurate que el teléfono teléfono de respaldo ingresado es correcto",
    });
  } else {
    const validRegEx = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$";
    if (!body.secondaryTelephone.match(validRegEx)) {
      validationErrors.push({
        message: "Debe ingresar un teléfono de respaldo válido.",
      });
    }
  }

  if (body.address == undefined) {
    validationErrors.push({
      message: "Debe ingresar una dirección",
      detail: "Asegurate que la dirección ingresada es correcta",
    });
  }

  if (validationErrors.length) {
    return res.status(200).json({
      success: false,
      errors: validationErrors,
    });
  }
  // END OF VALIDATIONS

  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, "ventanamenorca9476928734");
  const userId = decoded.user_id;

  body.email = validator.normalizeEmail(body.email, {
    gmail_remove_dots: false,
  });

  User.findById(userId, (err, user) => {
    if (err) {
      return next(err);
    }

    if (user.email !== body.email) {
      user.emailVerified = false;
    }

    user.email = body.email;
    user.profile.secondaryTelephone = body.secondaryTelephone;
    user.profile.address = body.address;

    if (body.newsletter == undefined) {
      user.newsletter = false;
    } else {
      body.newsletter = stringToBoolean(body.newsletter);
      user.newsletter = body.newsletter == true;
    }

    if (user.profile.point) {
      if (
        user.profile.point.coordinates[1] != body.lat ||
        user.profile.point.coordinates[0] != body.long
      ) {
        const newPoint = new Point({
          coordinates: [body.long, body.lat],
        });
        user.profile.point = newPoint;
      }
    } else {
      const newPoint = new Point({
        coordinates: [body.long, body.lat],
      });
      user.profile.point = newPoint;
    }

    if (
      body.long !== null ||
      body.long !== "" ||
      body.lat !== null ||
      body.lat !== ""
    ) {
      const newPoint = new Point({
        coordinates: [body.long, body.lat],
      });
      const record = user.profile.pointRecord;
      if (newPoint !== record[record.length - 1]) {
        user.profile.pointRecord = record.concat([newPoint]);
      }
    }

    if (body.email !== null || body.email !== "") {
      const emailrecord = user.profile.emailRecord;
      if (body.email !== emailrecord[emailrecord.length - 1]) {
        user.profile.emailRecord = emailrecord.concat([body.email]);
      }
    }
    if (body.secondaryTelephone !== null || body.secondaryTelephone !== "") {
      const record = user.profile.telephoneRecord;
      if (body.secondaryTelephone !== record[record.length - 1]) {
        user.profile.telephoneRecord = record.concat([body.secondaryTelephone]);
      }
    }
    if (body.address !== null || body.address !== "") {
      const addrecord = user.profile.addressRecord;
      if (body.address !== addrecord[addrecord.length - 1]) {
        user.profile.addressRecord = addrecord.concat([body.address]);
      }
    }

    try {
      user.save(async (err) => {
        if (err) {
          if (err.code === 11000) {
            return res.status(200).json({
              success: false,
              message:
                "La dirección de correo electrónico que ingresó ya está asociada a una cuenta.",
            });
          }
        }

        /* const client = await Sperant.postReferredClient(
                  "LISBETH GLORIA",
                  "DE LA CRUZ RAMOS",
                  "abc@picnic.pe",
                  19,
                  "992617659",
                  "777777777",
                  "comments",
                ) */
        const client = await Sperant.updateUser(
          /* user.profile.sperantClientId,
                         body.secondaryTelephone,
                         body.email, */
          user.profile.point.coordinates[0],
          user.profile.point.coordinates[1]
        );

        console.log(client);

        return res.status(200).json({
          success: true,
          message: "La información del perfil ha sido actualizada.",
        });
      });
    } catch (error) {
      console.log(error);
    }
  });
};

/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isLength(req.body.password, { min: 6 })) {
    validationErrors.push({
      msg: "Password must be at least 6 characters long",
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    validationErrors.push({ msg: "Passwords do not match" });
  }

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/account");
  }

  User.findById(req.user.id, (err, user) => {
    if (err) {
      return next(err);
    }
    user.password = req.body.password;
    user.save((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "La contraseña ha sido cambiada." });
      res.redirect("/account");
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = (req, res, next) => {
  User.deleteOne({ _id: req.user.id }, (err) => {
    if (err) {
      return next(err);
    }
    req.logout();
    req.flash("info", { msg: "Your account has been deleted." });
    res.redirect("/");
  });
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
exports.getOauthUnlink = (req, res, next) => {
  const { provider } = req.params;
  User.findById(req.user.id, (err, user) => {
    if (err) {
      return next(err);
    }
    user[provider.toLowerCase()] = undefined;
    const tokensWithoutProviderToUnlink = user.tokens.filter(
      (token) => token.kind !== provider.toLowerCase()
    );
    // Some auth providers do not provide an email address in the user profile.
    // As a result, we need to verify that unlinking the provider is safe by ensuring
    // that another login method exists.
    if (
      !(user.email && user.password) &&
      tokensWithoutProviderToUnlink.length === 0
    ) {
      req.flash("errors", {
        msg:
          `The ${_.startCase(
            _.toLower(provider)
          )} account cannot be unlinked without another form of login enabled.` +
          " Please link another account or add an email address and password.",
      });
      return res.redirect("/account");
    }
    user.tokens = tokensWithoutProviderToUnlink;
    user.save((err) => {
      if (err) {
        return next(err);
      }
      req.flash("info", {
        msg: `${_.startCase(_.toLower(provider))} account has been unlinked.`,
      });
      res.redirect("/account");
    });
  });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/account");
  }
  const validationErrors = [];
  if (!validator.isHexadecimal(req.params.token)) {
    validationErrors.push({ msg: "Invalid Token.  Please retry." });
  }
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/forgot");
  }

  User.findOne({ passwordResetToken: req.params.token })
    .where("passwordResetExpires")
    .gt(Date.now())
    .exec((err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash("errors", {
          msg: "Password reset token is invalid or has expired.",
        });
        return res.redirect("/forgot");
      }
      res.render("account/reset", {
        title: "Password Reset",
      });
    });
};

/**
 * GET /account/verify/:token
 * Verify email address
 */
exports.getVerifyEmailToken = (req, res, next) => {
  if (req.user.emailVerified) {
    req.flash("info", {
      msg: "La dirección de correo electrónico ha sido verificada.",
    });
    return res.redirect("/account");
  }

  const validationErrors = [];
  if (req.params.token && !validator.isHexadecimal(req.params.token)) {
    validationErrors.push({ msg: "Invalid Token.  Please retry." });
  }
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/account");
  }

  if (req.params.token === req.user.emailVerificationToken) {
    User.findOne({ email: req.user.email })
      .then((user) => {
        if (!user) {
          req.flash("errors", {
            msg: "There was an error in loading your profile.",
          });
          return res.redirect("back");
        }
        user.emailVerificationToken = "";
        user.emailVerified = true;
        user = user.save();
        req.flash("info", {
          msg: "Thank you for verifying your email address.",
        });
        return res.redirect("/account");
      })
      .catch((error) => {
        req.flash("error", {
          msg: "There was an error when updating your profile.  Please try again later.",
        });
        return res.redirect("/account");
      });
  }
};

/**
 * GET /account/verify
 * Verify email address
 */
exports.getVerifyEmail = (req, res, next) => {
  if (req.user.emailVerified) {
    req.flash("info", {
      msg: "La dirección de correo electrónico ha sido verificada.",
    });
    return res.redirect("/account");
  }

  if (!mailChecker.isValid(req.user.email)) {
    req.flash("errors", {
      msg: "La dirección de correo electrónico es inválida y no se puede verificar. Actualice su dirección de correo electrónico e intente nuevamente.",
    });
    return res.redirect("/account");
  }

  const createRandomToken = randomBytesAsync(16).then((buf) =>
    buf.toString("hex")
  );

  const setRandomToken = (token) => {
    User.findOne({ email: req.user.email }).then((user) => {
      user.emailVerificationToken = token;
      user = user.save();
    });
    return token;
  };

  const sendVerifyEmail = (token) => {
    let transporter = nodemailer.createTransport({
      service: "SendinBlue",
      auth: {
        user: process.env.SENDINBLUE_USER,
        pass: process.env.SENDINBLUE_PASSWORD,
      },
    });
    const mailOptions = {
      to: req.user.email,
      from: "no-reply@menorca.com.pe",
      subject: "Verifique su dirección de correo electrónico en Menorca",
      text: `Gracias por registrarse en Menorca.\n\n
      Para verificar su dirección de correo electrónico, haga clic en el siguiente enlace o péguelo en su navegador:\n\n
        http://${req.headers.host}/account/verify/${token}\n\n
        \n\n
        Gracias!`,
    };

    return transporter
      .sendMail(mailOptions)
      .then(() => {
        req.flash("info", {
          msg: `An e-mail has been sent to ${req.user.email} with further instructions.`,
        });
      })
      .catch((err) => {
        if (err.message === "self signed certificate in certificate chain") {
          console.log(
            "WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production."
          );
          transporter = nodemailer.createTransport({
            service: "SendGrid",
            auth: {
              user: process.env.SENDGRID_USER,
              pass: process.env.SENDGRID_PASSWORD,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });
          return transporter.sendMail(mailOptions).then(() => {
            req.flash("info", {
              msg: `An e-mail has been sent to ${req.user.email} with further instructions.`,
            });
          });
        }
        console.log(
          "ERROR: Could not send verifyEmail email after security downgrade.\n",
          err
        );
        req.flash("errors", {
          msg: "Error sending the email verification message. Please try again shortly.",
        });
        return err;
      });
  };

  createRandomToken
    .then(setRandomToken)
    .then(sendVerifyEmail)
    .then(() => res.redirect("/account"))
    .catch(next);
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isLength(req.body.password, { min: 8 })) {
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  }
  if (req.body.password !== req.body.confirm) {
    validationErrors.push({ msg: "Passwords do not match" });
  }
  if (!validator.isHexadecimal(req.params.token)) {
    validationErrors.push({ msg: "Invalid Token.  Please retry." });
  }

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("back");
  }

  const resetPassword = () =>
    User.findOne({ passwordResetToken: req.params.token })
      .where("passwordResetExpires")
      .gt(Date.now())
      .then((user) => {
        if (!user) {
          req.flash("errors", {
            msg: "Password reset token is invalid or has expired.",
          });
          return res.redirect("back");
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        return user.save().then(
          () =>
            new Promise((resolve, reject) => {
              req.logIn(user, (err) => {
                if (err) {
                  return reject(err);
                }
                resolve(user);
              });
            })
        );
      });

  const sendResetPasswordEmail = (user) => {
    if (!user) {
      return;
    }
    let transporter = nodemailer.createTransport({
      service: "SendinBlue",
      auth: {
        user: process.env.SENDINBLUE_USER,
        pass: process.env.SENDINBLUE_PASSWORD,
      },
    });
    const mailOptions = {
      to: user.email,
      from: "no-reply@menorca.com.pe",
      subject: "La contraseña de Usuario de Menorca ha sido cambiada",
      text: `Hola,\n\nEsta es una confirmación de que la contraseña de su cuenta ${user.email} ha sido cambiada.\n`,
    };
    return transporter
      .sendMail(mailOptions)
      .then(() => {
        req.flash("success", {
          msg: "¡Éxito! Tu contraseña ha sido cambiada.",
        });
      })
      .catch((err) => {
        if (err.message === "self signed certificate in certificate chain") {
          console.log(
            "WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production."
          );
          transporter = nodemailer.createTransport({
            service: "SendinBlue",
            auth: {
              user: process.env.SENDINBLUE_USER,
              pass: process.env.SENDINBLUE_PASSWORD,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });
          return transporter.sendMail(mailOptions).then(() => {
            req.flash("success", {
              msg: "¡Éxito! Tu contraseña ha sido cambiada.",
            });
          });
        }
        console.log(
          "ERROR: Could not send password reset confirmation email after security downgrade.\n",
          err
        );
        req.flash("warning", {
          msg: "Your password has been changed, however we were unable to send you a confirmation email. We will be looking into it shortly.",
        });
        return err;
      });
  };

  resetPassword()
    .then(sendResetPasswordEmail)
    .then(() => {
      if (!res.finished) res.redirect("/");
    })
    .catch((err) => next(err));
};

/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/account");
  }
  res.render("account/forgot", {
    title: "Forgot Password",
  });
};

/**
 * @method
 * @desc Restablecer contraseña
 * @param {integer} email Correo
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.postForgot = async (req, res, next) => {
  const { docNumber } = req.body;

  const createRandomToken = randomBytesAsync(16).then((buf) =>
    buf.toString("hex")
  );

  const setRandomToken = async (token, emailExist) => {
    let user = await User.findOne({ "profile.document": docNumber });
    const client = await Sperant.getClientByDocument(docNumber);

    if (!user) {
      if (client) {
        return res.status(200).json({
          success: false,
          code: "AUTH_NOT_REGISTERED_002",
          message: errorCodes.AUTH_NOT_REGISTERED_002.message,
        });
      }
      return res.status(200).json({
        success: false,
        message:
          "Lo sentimos. Este documento no pertenece a un cliente de Menorca.",
      });
    }

    if (!client) {
      return res.status(200).json({
        success: false,
        message: "Esta cuenta no existe.",
      });
    }
    //let user = await User.findOne({ 'profile.sperantClientId': client.id });

    if (!user.active) {
      return res.status(200).json({
        success: false,
        message:
          "Aún no está registrado en la Ventana Menorca. Activa tu cuenta usando el siguiente enlace:",
      });
    }

    user.profile.name = `${client.firstName} ${client.lastName}`;
    user.profile.docType = client.documentType;
    user.profile.document = client.document;
    user.profile.phone = formatCellphone(client.phone);
    user.profile.mainTelephone = client.mainTelephone;
    user.profile.sperantEmail = client.email;
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    user = user.save();

    return user;
  };

  const sendForgotPasswordEmail = async (user) => {
    if (!user) {
      return;
    }
    const token = user.passwordResetToken;

    const mailOptions = {
      to: user.email,
      from: "no-reply@menorca.com.pe",
      subject: "Reinicio de contraseña de Menorca",
      text: `Hemos recibido su mensaje de restablecer contraseña.<br>
      Para continuar con el proceso haga click en el siguiente enlace: ${process.env.WEB_URL}/recuperar-contrasena/generar/${token} <br><br>
      Si no solicitó restablecer contraseña, ignore este correo.`,
    };

    console.log("=======================");
    console.log("token", token);
    console.log("user", user.profile);
    console.log("=======================");

    await sendgrid(
      mailOptions.to,
      mailOptions.subject,
      templates.recoverPassword(token, user.profile.name),
      async (response) => {
        /* SMS */
        const smsApi = new apiclicksend.SMSApi(
          "serviciosmenorca@picnic.pe",
          "7DBC921B-98E1-D326-08A3-98C4023F1E90"
        );

        const smsMessage = new apiclicksend.SmsMessage();

        smsMessage.source = "sdk";

        // console.log('user sms', user.profile.phone)

        smsMessage.to = `+51${user.profile.phone}`;
        smsMessage.body = `Hemos recibido su mensaje de restablecer contraseña.\n
            Para continuar con el proceso haga click en el siguiente enlace: ${process.env.WEB_URL}/recuperar-contrasena/generar/${token} \n\n
            Si no solicitó restablecer contraseña, ignore este mensaje.`;

        const smsCollection = new apiclicksend.SmsMessageCollection();

        smsCollection.messages = [smsMessage];

        smsApi
          .smsSendPost(smsCollection)
          .then((response) => {
            // console.log(response.body);

            if (response.body.response_code == "SUCCESS") {
              res.status(200).send({
                success: true,
                message: `Un correo ha sido enviado a ${user.email} con las instrucciones para restablecer contraseña.`,
                data: {
                  email: formatEmail(user.email),
                  cellphone: formatTelephone(user.profile.phone),
                  user_id: user.profile.sperantClientId,
                },
              });
            }
          })
          .catch((err) => {
            console.error(err.body);
          });
        /* SMS */
      }
    );
  };

  try {
    await createRandomToken.then(setRandomToken).then(sendForgotPasswordEmail);
    // .then(() => res.redirect("/forgot"))
    //.catch(next);
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Ocurrió un error en el proceso de recuperación de contraseña.",
    });
  }
};

/**
 * GET /inmuebles
 */
exports.getInmuebles = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    const user = await User.findById(userId);

    const budgets = await Sperant.getClientActiveBudgets(
      user.profile.sperantClientId
    );
    // const validBudgets = await Sperant.getValidBudgets(budgets);

    const validBudgets = await budgets.map(async (budget) => {
      const validBudget = await BI.getValidBudget(budget.id);
      return validBudget.data;
    });

    const valid = await Promise.all(validBudgets);

    if (valid.length == 0) {
      return res.status(200).send({
        success: false,
        message: "Usted no posee imnuebles.",
      });
    }

    // const modBudgets = await Sperant.addUnitCode(valid);

    return res.status(200).send({
      success: true,
      budgets: valid,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPaymentStatus = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    const { body } = req;

    const user = await User.findById(userId);

    const { page } = body;
    const limit = 5;
    const { status } = body;

    const response = await BI.fetchPaymentStatus(
      body.budgetCode,
      user.profile.document,
      status,
      page,
      limit
    );
    const next = await BI.fetchPaymentStatus(
      body.budgetCode,
      user.profile.document,
      status,
      page + 1,
      limit
    );

    return res.status(200).send({
      success: true,
      payments: response.rows,
      next: next.rows.length,
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getPaymentHistory = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    const { body } = req;

    const user = await User.findById(userId);

    const { page } = body;
    const limit = 5;

    const response = await BI.fetchPaymentHistory(
      body.budgetCode,
      user.profile.document,
      page,
      limit
    );
    const next = await BI.fetchPaymentHistory(
      body.budgetCode,
      user.profile.document,
      page + 1,
      limit
    );

    return res.status(200).send({
      success: true,
      payments: response.rows,
      next: next.rows.length,
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: error.message,
    });
  }
};

exports.postLastThreePendings = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    const { body } = req;

    const user = await User.findById(userId);
    // const response = await BI.fetchPaymentHistory(body.budgetCode, 5);

    const {
      DformattedTotalSaldo,
      DtotalSaldo,
      DtotalQuotes,

      DformattedTotalAmount,
      DtotalAmount,
      DcompletedQuotes,

      DformattedProjectTotal,
      DprojectTotal,
    } = await BI.getBudgetPaymentsQuotes(
      body.budgetCode,
      user.profile.document
    );

    if (DprojectTotal == 0) {
      const {
        DformattedTotalSaldo,
        DtotalSaldo,
        DtotalQuotes,

        DformattedTotalAmount,
        DtotalAmount,
        DcompletedQuotes,

        DformattedProjectTotal,
        DprojectTotal,
      } = await BI.getBudgetPaymentsPayments(
        body.budgetCode,
        user.profile.document
      );

      return res.status(200).send({
        success: true,

        completedQuotes: DcompletedQuotes,
        totalQuotes: DtotalQuotes,
        totalAmount: DtotalAmount,
        totalSaldo: DtotalSaldo,
        projectTotal: DprojectTotal,

        formattedTotalSaldo: DformattedTotalSaldo,
        formattedTotalAmount: DformattedTotalAmount,
        formattedProjectTotal: DformattedProjectTotal,

        moment: moment(),
      });
    }

    return res.status(200).send({
      success: true,

      completedQuotes: DcompletedQuotes,
      totalQuotes: DtotalQuotes,
      totalAmount: DtotalAmount,
      totalSaldo: DtotalSaldo,
      projectTotal: DprojectTotal,

      formattedTotalSaldo: DformattedTotalSaldo,
      formattedTotalAmount: DformattedTotalAmount,
      formattedProjectTotal: DformattedProjectTotal,

      moment: moment(),
    });

    // let isCompleted = await BI.isCompleted(body.budgetCode
    // console.log('isCompleted', isCompleted);

    /* if (isCompleted) {
            return res.status(200).send({
              success: true,
              isCompleted: true
            });
        } else { */

    // }
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @method
 * @desc Historial de pagos
 * @param {string} budgetCode budgetCode
 * @param {string} user_id Id de Usuario
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getEstadoCuenta = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    // return res.status(200).json({ userId: userId });

    const { body } = req;
    // const cipDb = await CIP.findOne({ budgetCode: query.budgetCode, user: req.user._id })
    const cipDb = await CIP.findOne({
      budgetCode: body.budgetCode,
      user: userId,
    });

    return res.status(200).json({ cip: cipDb });
    /* return res.render('projects/budgetPayments', {
          cip: cipDb
        }) */
  } catch (error) {
    next(error);
  }
};

exports.getAllOtherPayments = async (req, res, next) => {
  try {
    const { body } = req;

    let { projectType } = body;
    if (body.projectType == "expired") projectType = "pending";

    const project = await Sperant.getProjectById(body.projectId);

    const page = body.page ? body.page : 1;

    /* console.log('project', project)
        return */

    const { payments, pages } = await Sperant.getBudgetPayments(
      body.budgetCode,
      projectType,
      {
        status: body.status,
        page,
      }
    );

    console.log(payments.length);
    return res.send({
      payments,
      pagination: {
        page,
        limit: 20,
        pages,
        total: payments.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllRequets = async (req, res, next) => {
  try {
    // const body = req.body;

    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;
    const requests = await Request.find({ user: userId });
    const projects = await Request.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$nameProject" } },
    ]);

    return res.status(200).json({
      requests,
      moment,
      categories,
      subCategories,
      projects,
      title: "solicitudes",
    });
    /* return res.render("requests/allRequests", { requests, moment,categories,subCategories,
          projects,title:"solicitudes" }); */
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getCreateRequest = async (req, res, next) => {
  try {
    const { sperantClientId } = req.user.profile;
    const projects = await Sperant.getClientProjects(sperantClientId);

    return res.status(200).json({
      categories,
      subCategories,
      projects,
      title: "solicitudes",
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const response = await Mongo.analytics();
    const arr = response.data;

    const tutorials = [];
    arr.forEach((obj) => {
      console.log("obj", obj);
      tutorials.push({
        type: obj._id.type,
        date: obj.date,
        count: obj.count,
      });
    });

    const excel = require("exceljs");
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Tutorials");
    worksheet.columns = [
      {
        header: "Date",
        key: "date",
        width: 25,
      },
      {
        header: "Type",
        key: "type",
        width: 25,
      },
      {
        header: "Count",
        key: "count",
        width: 25,
      },
    ];

    worksheet.addRows(tutorials);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "analytics.xlsx"
    );
    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });

    /* return res.status(200).json({
          title: 'Analytics',
          data: response
        }); */
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: error.message,
    });
  }
};

exports.postCreateRequest = async (req, res, next) => {
  try {
    const { body } = req;

    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    const user = await User.findById(userId);

    const { sperantClientId } = user.profile;

    console.log("body file", body.file);

    const categoryAttention = JSON.parse(body.categoryAttention);

    const typeAttention = JSON.parse(body.typeAttention);

    if (!validator.isEmail(body.email)) {
      return res.status(200).json({
        success: false,
        message: "Ingrese un correo válido.",
      });
    }

    const phoneNumberRegEx = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$";
    if (!body.phone.match(phoneNumberRegEx)) {
      return res.status(200).json({
        success: false,
        message: "Ingrese un número télefonico válido.",
      });
    }

    const project = await Sperant.getProjectById(body.projectId);
    if (!project) {
      return res.status(200).json({
        success: false,
        message: "No se encontró un proyecto",
      });
    }

    const units = await Sperant.getUnits(body.budgetId);
    if (!units.length) {
      return res.status(200).json({
        success: false,
        message: "No existen unidades para la proforma selectionada",
      });
    }

    const budgetId = await Sperant.getBudgetById(body.budgetId);

    const exists = await Sperant.verifyIfSameCategoryExists(
      categoryAttention,
      budgetId.id,
      sperantClientId
    );

    if (exists) {
      return res.status(200).json({
        success: false,
        message:
          "No puede crear una solicitud ya que existe otra solicitud con la misma categoría abierta",
      });
    }

    const proyectAttendant = proyectAttendantMapper[project.id];

    /* console.log('proyectAttendant', proyectAttendant);
        return; */

    let observations = `<br>${body.detail} ` + "<br>"; // body.detail + (body.fileName) ? `${body.fileName}: ${body.file}`:
    observations += body.fileName
      ? `<div class="file"><div>Archivo adjunto</div> <a href="${body.file}" target="_blank">${body.file}</a></div>`
      : "";
    /* body.fileName
          ? `${body.fileName}: ${body.file}`
          : ''; */

    const attention = await Sperant.postCreateAttention(
      units[0].id,
      body.budgetId,
      user.profile.sperantClientId,
      body.subject,
      categoryAttention.id,
      typeAttention.id,
      observations,
      proyectAttendant
    );
    const newRequest = new Request({
      user: user._id,
      userName: user.profile.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      nameProject: project.name,
      projectId: project.id,
      contract_num: body.contractNum,
      sperantObservation: observations,
      sperantCategory: {
        id: categoryAttention.id,
        name: categoryAttention.name,
      },
      sperantType: {
        id: typeAttention.id,
        name: typeAttention.name,
      },
      detail: body.detail,
      fileUrl: body.file,
      fileName: body.fileName,
      typeConsult: body.typeConsult,
      typeProduct: body.typeProduct,
      sperantRawData: attention,
    });
    const bool = await newRequest.save();

    /* return res.status(200).json({
          success: true,
          data: attention
        }); */

    const { code } = attention;
    const supervisorObj = await Sperant.getAttendantByIdMod(
      project.id,
      attention.attendantId
    );
    const supervisor = `${supervisorObj.fname} ${supervisorObj.lname}`;
    const ticketId = attention.id;
    const status = "Registrado";

    const mailOptions = {
      to: user.email,
      from: "no-reply@menorca.com.pe",
      subject: "Creación de solicitud",
    };

    await sendgrid(
      mailOptions.to,
      mailOptions.subject,
      templates.statusCreated(
        user.profile.name,
        supervisor,
        code,
        status,
        ticketId
      ),
      async (response) => {}
    );

    const mailOptionsMenorca = {
      to: "atencion.clientes@menorca.com.pe", // to: `rcastro@picnic.pe`,
      from: "no-reply@menorca.com.pe",
      subject: "VENTANA MENORCA: Creación de solicitud",
      text: `Nueva Solicitud: <br>
        Correo: ${user.email}<br>
        Telefono: ${user.profile.mainTelephone}<br>
        Número de contrato: ${body.budgetId}<br>
        Nombre del proyecto: ${project.name}<br>`,
    };
    await sendgrid(
      mailOptionsMenorca.to,
      mailOptionsMenorca.subject,
      templates.statusCreatedToMenorca(
        user.profile.name,
        mailOptionsMenorca.text
      ),
      async (response) => {}
    );

    return res.status(200).json({
      success: true,
      data: bool,
    });
  } catch (error) {
    // next(error);
    console.log("error new ticket", error);

    return res.status(200).send({
      success: false,
      message: error,
    });
  }
};

exports.postNotificationsSeen = async (req, res, next) => {
  const filter = { read: false };
  const all = await Notification.find(filter);

  const processes = await all.map(async (obj) => {
    obj.read = true;
    await obj.save();
  });
  await Promise.all(processes);

  return res.status(200).json({
    success: true,
    data: processes,
  });
};

/**
 * GET /ultimo Pago
 */

exports.getLastPayment = async (req, res, next) => {
  try {
    const { query } = req;

    const project = await Sperant.getProjectById(`${query.projectId}`);

    const { payments: pendings } = await Sperant.getBudgetPayments(
      query.budgetCode,
      project.projectType,
      {
        status: "pending",
        limit: 1,
      }
    );

    const nextPayment = pendings[0];

    if (!nextPayment) {
      req.flash("info", { msg: "No tiene próxima letra a pagar" });
      return res.redirect("back");
    }

    const nextPaymentBank = await Sperant.getBank(nextPayment.bankId);

    const { payments: completed } = await Sperant.getBudgetPayments(
      query.budgetCode,
      project.projectType,
      { status: "completed" }
    );

    const lastPaid = completed.length >= 0 ? completed[0] : undefined;

    const cipDB = await CIP.findOne({
      budgetCode: query.budgetCode,
      user: req.user._id,
    });

    return res.render("projects/lastpaymentDetail", {
      title: "último pago",
      lastPaid,
      nextPayment,
      nextPaymentBank,
      budgetCode: query.budgetCode,
      projectType: project.projectType,
      cip: cipDB,
    });
  } catch (error) {
    console.log(error.response.data);
    next(error);
  }
};

exports.getNextRequests = async (req, res, next) => {
  try {
    const { status, project, category, subCategory, startDate, endDate } =
      req.query;

    const { page } = req.query;

    const filter = { user: req.user._id };

    if (status) {
      filter.status = Number(status);
    }

    if (project) {
      filter.nameProject = project;
    }

    if (category) {
      filter.category = category;
    }
    if (subCategory) {
      filter.subCategory = subCategory;
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
    const requests = await Request.find(filter)
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(10);

    const count = await Request.find(filter).count();

    return res.send({
      requests,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPaymentInformation = async (req, res, next) => {
  try {
    const { budgetCode, projectType } = req.body;

    const pendingBudgets = await Sperant.getPendingBudgets(
      budgetCode,
      projectType
    );
    const nextPendingBudget = await Sperant.getNextPendingBudget(
      budgetCode,
      projectType
    );

    // console.log('nextPendingBudget', nextPendingBudget);

    // const manualPendingBudgets = pendingBudgets.payments.length > 0 ? pendingBudgets.payments[0].bank : '' ;
    const manualPendingBudgets = pendingBudgets.nextPaymentBank;
    const manualNextPendingBudget = nextPendingBudget.nextPaymentBank;

    return res.status(200).json({
      success: true,
      title: "reciente-pago-pendiente",
      pendingBudgets,
      nextPendingBudget,
      manualPendingBudgets,
      manualNextPendingBudget,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getValidarDeudas = async (req, res, next) => {
  try {
    const { budgetCode, projectType } = req.body;

    const pendingBudgets = await Sperant.getPendingBudgets(
      budgetCode,
      projectType
    );

    return res.status(200).json({
      success: true,
      pendingBudgets,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @method
 * @desc Obtener próxima letra a pagar
 * @param {string} sperantClientId sperantClientId
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getClosestPayment = async (req, res, next) => {
  try {
    // const { sperantClientId } = req.user.profile;
    const { sperantClientId } = req.body;

    const budgets = await Sperant.getClientActiveBudgets(sperantClientId);

    const validBudgets = await Sperant.getValidBudgets(budgets);

    let selectedPayment;
    let selectedProject;
    let selectedBudget;
    for (const budget of validBudgets) {
      const project = await Sperant.getProjectById(budget.projectId);

      const { payments } = await Sperant.getBudgetPayments(
        budget.code,
        project.projectType,
        {
          status: "pending",
          limit: 1,
        }
      );

      if (payments[0]) {
        if (!selectedPayment) {
          selectedPayment = payments[0];
          selectedProject = project;
          selectedBudget = budget;
        } else {
          const currentExpiresAt = new Date(selectedPayment.expiresAt * 1000);
          const newExpiresAt = new Date(payments[0].expiresAt * 1000);
          if (currentExpiresAt < newExpiresAt) {
            selectedPayment = payments[0];
            selectedProject = project;
            selectedBudget = budget;
          }
        }
      }
    }

    if (!selectedPayment) {
      return res.status(200).json({
        success: true,
        message: "No hay pagos pendientes",
      });
      // return res.redirect('back');
    }

    let bank = {};
    if (selectedPayment.type == "quotas") {
      bank = await Sperant.getBank(selectedPayment.bankId);
    }

    // const cipDB = await CIP.findOne({ budgetCode: selectedBudget.code, user: req.user._id })
    const cipDB = await CIP.findOne({
      budgetCode: selectedBudget.code,
      user: req.user._id,
    })
      .sort({ _id: -1 })
      .limit(1);

    /* return res.render('projects/closestPayment', {
          title: 'reciente-pago-pendiente',
          payment: selectedPayment,
          project: selectedProject,
          budget: selectedBudget,
          bank: bank,
          cip: cipDB,
        }); */

    return res.status(200).json({
      title: "reciente-pago-pendiente",
      payment: selectedPayment,
      project: selectedProject,
      budget: selectedBudget,
      bank,
      cip: cipDB,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllFrequentQuestions = async (req, res, next) => {
  try {
    //const { query } = req;
    const { title, category, subcategory } = req.query;
    const { limit = 5, page, token } = req.body;
    // const { skip, page, limit } = util.formatPaginateValues(query);

    //const limit = 5;
    // let skip = (page > 1) ? page * 5 : 0;
    let skip = 0;
    if (page && page > 0) {
      skip = (page - 1) * limit;
    }

    const conditions = {};

    if (title) {
      /* conditions.question = {
        $regex: title,
        $options: 'i'
      }; */
      conditions.$or = [
        {
          question: {
            $regex: title,
            $options: "iu",
          },
        },
        {
          answer: {
            $regex: title,
            $options: "iu",
          },
        },
      ];
    }
    if (category) conditions.categories = category;
    if (subcategory) conditions.subcategories = subcategory;
    console.log(conditions);
    const frequentQuestions = await FrequentQuestion.find(conditions)
      .populate("categories", "_id name")
      .populate("subcategories", "_id name questionCategory")
      .sort({ order: 1 })
      .skip(skip)
      .limit(limit);
    const count = await FrequentQuestion.countDocuments(conditions);

    let dbResponses;
    if (token) {
      const userDecoded = jwt.verify(
        token,
        "ventanamenorca9476928734" /*config.TOKEN_KEY*/
      );
      const dbRequests = frequentQuestions.map(async (fq) => {
        const qaRating = await QuestionAnswerRating.findOne({
          frequentQuestion: fq._id,
          user: userDecoded.user_id,
        });
        fq._doc.rating = qaRating?.rating ?? 0;
        return fq;
      });
      dbResponses = await Promise.all(dbRequests);
    }

    return res.json({
      frequentQuestions: dbResponses ?? frequentQuestions,
      pagination: util.paginate(page, limit, count),
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      success: false,
      message: error,
    });
    // next(error);
  }
};

/**
 * @method
 * @desc Obtener preguntas frequentes
 * @param {integer} page page
 * @param {integer} limit limit
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getFrequentQuestions = async (req, res, next) => {
  try {
    const { query } = req;
    // const { skip, page, limit } = util.formatPaginateValues(query);

    const { body } = req;
    const { page } = body;
    const limit = 5;
    // let skip = (page > 1) ? page * 5 : 0;
    let skip = 0;
    if (page && page > 0) {
      skip = (page - 1) * 5;
    }

    const conditions = {};

    if (query.title) {
      conditions.question = {
        $regex: query.title,
        $options: "i",
      };
    }
    if (query.category) conditions.category = query.category;

    const frequentQuestions = await FrequentQuestion.find(conditions)
      .sort({ order: 1 })
      .skip(skip)
      .limit(limit);
    const count = await FrequentQuestion.countDocuments(conditions);

    return res.json({
      frequentQuestions,
      pagination: util.paginate(page, limit, count),
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      success: false,
      message: error,
    });
    // next(error);
  }
};

/**
 * @method
 * @desc Obtener preguntas frequentes
 * @param {integer} id id de la pregunta frecuente
 *                      (una vez obtenida se le asigna como `questionId`)
 * @param {integer} rating servirá para obtener la calificación del usuario
 *  posibles valores: -1, 0, 1.
 *  - -1 : indica dislike
 *  - 0 : indica que quitaron la valoración
 *  - 1 : indica like
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.rateQuestionAnswer = async (req, res, next) => {
  const { user } = req;
  const { id: questionId } = req.params;
  const { rating } = req.body;

  const ratings = {
    DISLIKE: -1,
    UNRATE: 0,
    LIKE: 1,
  };

  if (
    ![ratings.DISLIKE, ratings.UNRATE, ratings.LIKE].includes(Number(rating))
  ) {
    return res.json({
      success: false,
      message: "Calificación no válida.",
      rating,
    });
  }

  try {
    let dbResponse;
    const questionAnswer = await QuestionAnswerRating.findOne({
      frequentQuestion: questionId,
      user: user.user_id,
    });

    if (rating === ratings.UNRATE) {
      if (questionAnswer) {
        dbResponse = await questionAnswer.remove();
        const frequentQuestion = await FrequentQuestion.findById(questionId)
          .populate("categories", "_id name")
          .populate("subcategories", "_id name questionCategory");
        return res.json({
          success: true,
          message: "Se ha quitado la calificación.",
          frequentQuestion: { ...frequentQuestion.toJSON(), rating },
          //dbResponse
        });
      }
    }

    if (!questionAnswer) {
      dbResponse = await QuestionAnswerRating.create({
        frequentQuestion: questionId,
        user: user.user_id,
        rating,
      });
    } else {
      questionAnswer.rating = rating;
      dbResponse = await questionAnswer.save();
    }

    const frequentQuestion = await FrequentQuestion.findById(questionId)
      .populate("categories", "_id name")
      .populate("subcategories", "_id name questionCategory");
    return res.json({
      success: true,
      message: "Se ha registrado la calificación.",
      frequentQuestion: { ...frequentQuestion.toJSON(), rating },
    });
  } catch (error) {
    console.log("Error al calificar question: ", error);
    return res.json({
      success: false,
      message: "No se pudo calificar la respuesta.",
      error,
    });
  }
};
/* exports.removeQuestionAnswerRating = async (req, res, next) => {
  const { user } = req
  const { id:questionId } = req.params;
  try {
    
    const dbResponse = await QuestionAnswerRating.deleteOne({ frequentQuestion: questionId, user: user.user_id })

    return res.json({
      success: true,
      message: "Se ha quitado la calificación."
    })
  } catch (error) {
    return res.json({
      success: false,
      message:"No se pudo quitar la calificación de la respuesta.",
    })
  }
} */

exports.getQuestionsCategories = async (_req, res, next) => {
  // const qsub = await QuestionSubcategory.find({})
  // console.log(qsub);
  try {
    const questionCategories = await QuestionCategory.find({})
      .populate("subcategories", "_id name questionCategory")
      .select("name subcategories");
    return res.json({
      succes: true,
      questionCategories,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "No se pudo obtener el listado de las categorías.",
    });
  }
};

exports.verifyCIP = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    // Get latest CIP
    const cip = await CIP.findOne({ user: userId }).sort({ _id: -1 });
    const { body } = req;

    /* let dueDate = moment(cip.formattedExpiresAt).format("MM/DD/YYYY HH:mm a");
        let today = moment().format("DD/MM/YYYY HH:mm a"); */

    // let localdate = new Date().toLocaleString({timeZone: "America/Lima"})

    if (cip !== null) {
      /* let dueDate = moment.utc(moment(cip.formattedExpiresAt), 'YYYY-MM-DD[T]HH:mm[Z]');
            let today = moment.utc(moment(), 'YYYY-MM-DD[T]HH:mm[Z]'); */

      const dueDate = moment(cip.formattedExpiresAt, "DD/MM/YYYY HH:mm");
      const today = moment();

      const afterDueDate = moment(today).isAfter(dueDate);

      console.log("dueDate", dueDate, "today", today);

      return res.status(200).json({
        success: true, // userId: userId,
        cip,
        afterDueDate,
        dueDate,
        today,
      });
    }

    return res.status(200).json({
      success: true, // userId: userId,
      cip: null,
      afterDueDate: "",
      dueDate: "",
      today: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

exports.postSendCIPSMS = async (req, res, next) => {
  const { body } = req;

  const cips = body.cipsToSend;
  const { cellphone } = body;
  const { cipNumber } = body;
  const { amount } = body;
  const { vctDate } = body;

  /* SMS */
  const smsApi = new apiclicksend.SMSApi(
    "serviciosmenorca@picnic.pe",
    "7DBC921B-98E1-D326-08A3-98C4023F1E90"
  );

  const smsMessage = new apiclicksend.SmsMessage();

  smsMessage.source = "sdk";
  smsMessage.to = `+51${cellphone}`;
  smsMessage.body = `Ventana Menorca: Paga tu cuota con el CIP ${cipNumber} por ${amount} a la empresa PagoEfectivo antes del ${vctDate}`;

  const smsCollection = new apiclicksend.SmsMessageCollection();

  smsCollection.messages = [smsMessage];

  smsApi
    .smsSendPost(smsCollection)
    .then(
      (
        response // console.log(response.body);
      ) =>
        res.status(200).json({
          success: true,
          message: "Se ha enviado un SMS con el código.",
        })
    )
    .catch((err) => {
      console.error(err.body);
      return res.status(200).json({
        success: true,
        message: err,
      });
    });
  /* SMS */
};

exports.postCreateCIPS = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    const { body } = req;

    const { paymentIds } = body;
    const { projectType } = body;
    const currency = "USD"; // body.currency

    /* return res.status(200).json({
          success: true,
          paymentIds: paymentIds
        }); */

    const cips = [];
    let type;
    let amount = 0;
    let exchangeRate = 1;

    for (paymentId of paymentIds) {
      const { data: nextPayment } = await Sperant.getBudgetPayment(paymentId); /// quotas/4279509

      /* return res.status(200).json({
               success: true,
               nextPayment: nextPayment
             }); */

      if (nextPayment) {
        // let exchangeRate = 1
        if (nextPayment[0].type == "quotas" && body.currency == "PEN") {
          const exchangeRateDB = await ExchangeRate.findOne({ name: "actual" });

          if (exchangeRateDB) {
            exchangeRate = exchangeRateDB.value;
          }
        }

        type = nextPayment[0].type;

        amount += nextPayment[0].saldo;

        /* return res.status(200).json({
                     success: true,
                     nextPaymentid: nextPayment,
                   }); */
        // console.log('nextPayment id 31', nextPayment);

        /* let cip = await Sperant.postCreateCIP(
                     nextPayment.id,
                     nextPayment.type == 'quotas' ? 'Quota' : 'Payment',
                     nextPayment.saldo,//1000.82, //nextPayment.saldo
                     exchangeRate,
                     currency,
                     // req.user.profile.sperantEmail,
                     'xamay56756@hype68.com',
                     0,
                   )

                   console.log('CIP', cip);

                   let cipDb = await CIP.create({
                     user: userId,
                     cipId: cip.id,
                     code: cip.code,
                     budgetCode: body.budgetCode,
                     paymentId: cip.paymentId,
                     paymentType: cip.paymentType,
                     type: cip.type,
                     cip: cip.cip,
                     quantity: 1,
                     exchangeRate: exchangeRate,
                     payAmount: cip.payAmount,
                     formattedPayAmount: cip.formattedPayAmount,
                     paymentIn: cip.paymentIn,
                     expiresAt: cip.expiresAt,
                     formattedExpiresAt: cip.formattedExpiresAt,
                   }) */

        // cips.push(cipDb)
      }
    }

    const cip = await Sperant.postCreateCIP(
      paymentIds[0],
      type == "quotas" ? "Quota" : "Payment",
      amount, // 1000.82, //nextPayment.saldo
      exchangeRate,
      currency, // req.user.profile.sperantEmail,
      "xamay56756@hype68.com",
      0
    );

    const analytic = new Analytic({
      rawData: {
        cip,
      },
      type: "codigo_pagoefectivo_generado",
    });
    await analytic.save();

    const cipDb = await CIP.create({
      user: userId,
      cipId: cip.id,
      code: cip.code,
      budgetCode: body.budgetCode,
      paymentId: cip.paymentId,
      paymentType: cip.paymentType,
      type: cip.type,
      cip: cip.cip,
      quantity: 1,
      exchangeRate,
      payAmount: cip.payAmount,
      formattedPayAmount: cip.formattedPayAmount,
      paymentIn: cip.paymentIn,
      expiresAt: cip.expiresAt,
      formattedExpiresAt: cip.formattedExpiresAt,
    });

    return res.status(200).json({
      success: true,
      message: "CIPS creados exitosamente",
      data: cip,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @method
 * @desc Generar Pago (Crear CIP)
 * @param {string} currency currency
 * @param {string} projectType projectType
 * @param {string} budgetCode budgetCode
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta message
 * @example { message: "error message" }
 */
exports.postCreateCIP = async (req, res, next) => {
  try {
    const { body } = req;

    if (body.currency != "USD" && body.currency != "PEN") {
      /* req.flash('errors', { msg: 'InvalidCurrency' })
            return res.redirect('back') */
      return res.status(400).json({
        success: false,
        message: "Moneda inválida",
      });
    }

    if (body.projectType.toLowerCase() == "Lotes" && body.currency != "PEN") {
      /* req.flash('errors', { msg: 'Tipo de cambio inválido' })
            return res.redirect('back') */
      return res.status(400).json({
        success: false,
        message: "Tipo de cambio inválido",
      });
    }

    const { payments: pendings } = await Sperant.getBudgetPayments(
      body.budgetCode,
      body.projectType,
      {
        status: "pending",
        limit: 1,
      }
    );

    const nextPayment = pendings[0];

    if (!nextPayment) {
      /* req.flash('errors', { msg: 'No tiene próxima letra a pagar' })
            return res.redirect('back') */
      return res.status(400).json({
        success: false,
        message: "No tiene próxima letra a pagar",
      });
    }

    let exchangeRate = 1;
    if (nextPayment.type == "quotas" && body.currency == "PEN") {
      const exchangeRateDB = await ExchangeRate.findOne({ name: "actual" });
      if (!exchangeRateDB) {
        return res.json({
          success: false,
          message:
            "Tipo de cambio no encontrado, por favor contacta con el administrador",
        });
      }

      exchangeRate = exchangeRateDB.value;
    }

    const cip = await Sperant.postCreateCIP(
      nextPayment.id,
      nextPayment.type == "quotas" ? "Quota" : "Payment",
      nextPayment.saldo, // 1000.82, //nextPayment.saldo
      exchangeRate,
      body.currency, // req.user.profile.sperantEmail,
      "xamay56756@hype68.com",
      0
    );

    const cipDb = await CIP.create({
      user: req.user.id,
      cipId: cip.id,
      code: cip.code,
      budgetCode: body.budgetCode,
      paymentId: cip.paymentId,
      paymentType: cip.paymentType,
      type: cip.type,
      cip: cip.cip,
      quantity: 1,
      exchangeRate,
      payAmount: cip.payAmount,
      formattedPayAmount: cip.formattedPayAmount,
      paymentIn: cip.paymentIn,
      expiresAt: cip.expiresAt,
      formattedExpiresAt: cip.formattedExpiresAt,
    });

    // req.flash('success', { msg: 'CIP creado exitosamente' })
    return res.status(200).json({
      success: true,
      message: "CIP creado exitosamente",
      data: cipDb,
    });
    // return res.redirect('back')
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @method
 * @desc Obtener el estado NIF del proceso
 * @param {string} contractNum contractNum
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.postEstadoNIF = async (req, res, next) => {
  try {
    // const token = req.headers["x-access-token"];
    // const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    // var userId = decoded.user_id;

    const { body } = req;

    const response = await BI.getEstadoNIF(body.contractNum);

    return res.status(200).send({
      success: true,
      response,
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getUnits = async (req, res, next) => {
  try {
    // const token = req.headers["x-access-token"];
    // const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    // var userId = decoded.user_id;

    const { body } = req;

    const units = await Sperant.getUnits(body.budgetId);
    const processUnitId = await BI.getProcessUnitId(body.budgetId);
    const tipoUnidadPrincial = await BI.getTipoUnidadPrincial(body.budgetCode);

    return res.status(200).send({
      success: true,
      units,
      processUnitId: processUnitId.process_unit_id,
      tipoUnidadPrincial: tipoUnidadPrincial.tipo_unidad_principal,
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getTotalPendingBudgets = async (req, res, next) => {
  try {
    const { budgetCode } = req.body;

    const pendingBudgets = await Sperant.getPendingBudgetsCount(budgetCode);

    return res.status(200).json({
      success: true,
      pendingBudgets,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFileToDownload = async (req, res, next) => {
  try {
    const response = await axios({
      url: req.body.file,
      method: "GET",
      responseType: "arraybuffer",
    });

    const { headers } = response;
    const file = response.data;

    return res.status(200).json({
      success: true,
      headers,
      file,
    });
  } catch (error) {
    next(error);
  }
};

exports.getEstadoPropiedadMiResumen = async (req, res, next) => {
  try {
    const { body } = req;

    console.log("==================");
    console.log("body", body);
    console.log("==================");

    const pasosCompletados = [1];
    const pasosFaltantes = [];

    const pendingBudgets = await Sperant.getPendingBudgetsCount(
      body.budgetCode
    );
    const estadoNIF = await BI.getEstadoNIF(body.contractNum);

    if (!pendingBudgets.total) {
      pasosCompletados.push(2);
    }

    if (estadoNIF && estadoNIF.estado_nif == "NIF") {
      pasosCompletados.push(3);
    }

    for (let a = 1; a <= 5; a++) {
      if (!pasosCompletados.includes(a)) {
        pasosFaltantes.push(a);
      }
    }

    const pasoMax = Math.max(...pasosCompletados);
    let contentTxtEstadoMiPropiedad =
      "Gracias por confiar en nosotros, ya ha completado todos los pasos.";

    if (pasosFaltantes.length) {
      const primerPasoFaltante = pasosFaltantes[0];
      let missingStatus;

      switch (primerPasoFaltante) {
        case 2:
          missingStatus = "Pago completado";
          break;

        case 3:
          missingStatus = "Entrega de mi propiedad";
          break;

        case 4:
          missingStatus = "Entrega de minuta";
          break;

        default:
          missingStatus = "Registros públicos";
      }

      contentTxtEstadoMiPropiedad = `Gracias por confiar en nosotros, el paso faltante por completar es: <strong>${missingStatus}</strong>`;
    }

    let stepImg;
    let stepName;

    switch (pasoMax) {
      case 1:
        stepImg = "paso-firma-contrato.png";
        stepName = "Firma del contrato";
        break;

      case 2:
        stepImg = "paso-pago-financiamiento.png";
        stepName = "Pago completado";
        break;

      case 3:
        stepImg = "paso-entrega-proyecto.png";
        stepName = "Entrega de mi propiedad";
        break;

      case 4:
        stepImg = "paso-minuta.png";
        stepName = "Entrega de minuta";
        break;

      default:
        stepImg = "paso-inde-terre.png";
        stepName = "Registros públicos";
    }

    const data = {
      image: stepImg,
      status: stepName,
      content: contentTxtEstadoMiPropiedad,
    };

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

function formatEmail(emailString) {
  /* var splitEmail = emailString.split("@")
    var domain = splitEmail[1];
    var name = splitEmail[0];
    return  name.substring(0,3).concat("*********@").concat(domain) */
  return emailString.replace(/(\w{1})(.*)(\w{1})@(.*)/, "$1******$3@$4");
}

function formatTelephone(telephoneString) {
  return telephoneString.replace(/(\d{1})(.*)(\d{3})/, "$1******$3");
}

function stringToBoolean(string) {
  switch (string.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;

    case "false":
    case "no":
    case "0":
    case null:
      return false;

    default:
      return Boolean(string);
  }
}

function formatCellphone(string) {
  // Remove all spaces
  let mobile = string.replace(/ /g, "");

  // If string starts with +, drop first 3 characters
  if (string.slice(0, 1) == "+") {
    mobile = mobile.substring(3);
  }

  return mobile;
}
