const fs = require('fs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const path = require('path');
const mime = require('mime');
const moment = require('moment');
const axios = require('axios');
const { Console } = require('console');
const { CodeStarNotifications } = require('aws-sdk');
const { updateBundle } = require('typescript');
const Environment = require('../models/Environment');
const Element = require('../models/Element');
const Material = require('../models/Material');
const mailtrap = require('../mails/mailtrap');
const sendgrid2 = require('../mails/sendgrid2');
const util = require('../util');
const Quote = require('../models/Quote');
const User = require('../models/User');
const { pdfFileSend, pdfFileDownload } = require('../util');
const { SperantV3 } = require('../services/sperant');
const { quoteRequest } = require('../mails/templates');

const Sperant = new SperantV3();
const { BIV1 } = require('../services/bi');

const BI = new BIV1();

const transporter = nodemailer.createTransport({
  service: 'SendinBlue',
  // host: process.env.MAIL_HOST,
  // port: process.env.MAIL_PORT,
  auth: {
    user: process.env.SENDINBLUE_USER,
    pass: process.env.SENDINBLUE_PASSWORD,
    // user: process.env.MAIL_USERNAME,
    // pass: process.env.MAIL_PASSWORD
  },
});

exports.getNextQuotes = async (req, res, next) => {
  try {
    let {
      status,
      month,
      startDate,
      endDate
    } = req.query;

    const { page } = req.query;

    const filter = {};
    filter['owner._id'] = req.user._id;
    if (status && status != '') {
      if (status == 'true') {
        filter.counseling = true;
      } else {
        filter.counseling = false;
      }
    }
    if (month && month != '') {
      month = parseInt(month);
      filter.month = month;
    }
    let skip = 0;
    if (page && page > 0) {
      skip = (page - 1) * 10;
    }

    if (startDate && startDate != '' && endDate && endDate != '') {
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
    const aggregate = (
      await Quote.aggregate([{
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner',
        },
      },
      {
        $unwind: {
          path: '$owner',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          month: {
            $month: '$createdAt',
          },
        },
      },
      {
        $match: filter,
      },
      {
        $facet: {
          count: [{
            $count: 'count',
          },],
          quotes: [{
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
      },
      ])
    )[0];
    const count = aggregate
      ? aggregate.count.length > 0
        ? aggregate.count[0].count
        : 0
      : 0;
    const quotes = aggregate
      ? aggregate.quotes.length > 0
        ? aggregate.quotes : [] : [];
    return res.send({
      quotes,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

exports.getQuote = async (req, res) => res.render('quote/quoteClient', {
  title: 'cotizador',
});

/**
 * @method
 * @desc Obtener cotizaciones en Mis Construcciones
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getQuotes = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    const userId = decoded.user_id;

    const filter = { owner: userId };
    const quotes = await Quote.find(filter, {}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: quotes,
      moment
    });
  } catch (error) {
    console.log(error);

    return res.status(200).json({
      success: false,
      message: error.message
    });
  }
};

exports.postQuote = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    const userId = decoded.user_id;
    const { payload } = req.body;

    const {
      sperantClientId,
      projectsNum,
      project,
      projectType,
      startDate,
      counseling,
      finalCost,
      propertyArea,
      totalCostNumber,
      codeUnit,
      budgetCode,
      projectTypeName
    } = payload;
    const projectsArr = [];
    const flag = 0;

    const addresses = [];
    const budgets = await Sperant.getClientActiveBudgets(sperantClientId);

    // console.log('budgets', budgets);

    await Promise.all(budgets.map(async (budget) => {
      const project = await Sperant.getClientProjects(sperantClientId);

      if (project != null) {
        const address = `${project[0].address}, ${project[0].state}, ${project[0].country}`;
        addresses.push(address);
      }
    }));

    let i = 0;
    if (projectsNum > 1) {
      for (i = 0; i < parseInt(projectsNum, 10); i++) {
        const materialsArr = [];
        const proj = {
          location: '',
          roomType: '',
          long: '',
          width: '',
          totalCost: '',
          materials: [],
          totalCostNumber: '',
        };
        for (let j = 0 + flag; j < 17 + flag; j++) {
          const material = {
            index: 0,
            name: '',
            quantity: 0,
            unit: '',
            price: '',
            parcialCost: '',
          };
          material.index = parseInt(j + 1, 10);
          material.name = project[i].materials[j];
          material.quantity = (project[i].quoteMaterials[j]);
          material.unit = project[i].units[j];
          material.price = project[i].prices[j];
          material.parcialCost = project[i].parcialCost[j];
          materialsArr.push(material);
        }
        proj.location = project[i].floor;
        proj.roomType = project[i].roomType;
        proj.long = project[i].size2;
        proj.width = project[i].size1;
        proj.totalCost = project[i].finalPrice;
        proj.totalCostNumber = project[i].finalPrice;
        proj.materials = materialsArr;
        projectsArr.push(proj);
      }
    } else {
      const materialsArr = [];
      const proj = {
        location: '',
        roomType: '',
        long: '',
        width: '',
        totalCost: '',
        materials: [],
      };
      for (let j = 0; j < 17; j++) {
        const material = {
          index: 0,
          name: '',
          quantity: 0,
          unit: '',
          price: '',
          parcialCost: '',
        };
        material.index = parseInt(j + 1, 10);
        material.name = project[i].materials[j];
        material.quantity = (project[i].quoteMaterials[j]);
        material.unit = project[i].units[j];
        material.price = project[i].prices[j];
        material.parcialCost = project[i].parcialCost[j];
        materialsArr.push(material);
      }
      proj.location = project[i].floor;
      proj.roomType = project[i].roomType;
      proj.long = project[i].size2;
      proj.width = project[i].size1;
      proj.totalCost = project[i].finalPrice;
      proj.totalCostNumber = project[i].finalPrice;
      proj.materials = materialsArr;
      projectsArr.push(proj);
    }

    const quoteArr = {
      userId,
      projectType,
      startDate,
      counseling,
      finalCost,
      totalCostNumber,
      addresses,
      'quoteType:': 'Web',
      'projects:': projectsArr[0].materials,
    };

    const user = await User.findById(userId);

    // FUNCIONES PARA EXTRAER CAMPOS EXTRAS
    let quotesNumber;
    const { DtotalQuotes, DprojectTotal } = await BI.getBudgetPaymentsQuotes(budgetCode, user.profile.document);
    quotesNumber = DtotalQuotes;
    if (DprojectTotal == 0) {
      const { DtotalQuotes } = await BI.getBudgetPaymentsPayments(budgetCode, user.profile.document);
      quotesNumber = DtotalQuotes;
    }

    const { id, contractStartDate } = await BI.getFechaContrato(budgetCode);

    const contractStartDateF = contractStartDate ? moment(contractStartDate).format('YYYY-MM-DD') : null;
    const complete = id ? '1' : '0';

    // const pendingBudgets = await Sperant.getPendingBudgets(budgetCode, projectTypeName);
    const nextPendingBudget = await Sperant.getNextPendingBudget(budgetCode, projectTypeName);

    const quoteQuantity = nextPendingBudget ? nextPendingBudget.formattedSaldo : '$0.00';
    // let withDebts = typeof pendingBudgets !== "undefined" ? pendingBudgets.totalQuotas : 0;
    // FIN DE FUNCIONES PARA EXTRAER CAMPOS EXTRA

    const quote = new Quote({
      owner: userId,
      projectType,
      startDate,
      counseling,
      finalCost,
      totalCostNumber,
      addresses,
      quoteType: 'Web',
      projects: projectsArr,

      codeUnit,
      contractStartDate: contractStartDateF,
      quotesNumber,
      quoteQuantity,
      // withDebts,
      propertyArea,
      complete
    });
    await quote.save();

    const { docPath, docName } = await pdfFileSend(quote, user);

    const subject = 'Cotización de proyecto de construcción Menorca';
    const withFile = true;

    setTimeout(async () => {
      const bitmap = fs.readFileSync(path.join(__dirname, `../uploads/${docName}`));

      const data_base64 = new Buffer(bitmap).toString('base64');

      // await mailtrap(user.email, subject, quoteRequest(user.profile.name), withFile, docName, docPath);
      const responseS = await sendgrid2(user.email, subject, quoteRequest(user.profile.name), withFile, docName, data_base64);

      fs.unlinkSync(docPath);
    }, 1000);

    return res.status(200).json({
      success: true,
      quoteArr,
      quoteId: quote._id,
      moment,
      msg: `Se ha enviado el detalle de la cotización a su correo electrónico: <strong>${user.email}</strong>`
    });
  } catch (error) {
    console.log(error);
    return res.redirect('back');
  }
};

exports.getQuoteDetail = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    const userId = decoded.user_id;
    const { payload } = req.body;
    const quoteId = req.params.id;
    const quote = await Quote.findById(quoteId);
    if (quote.owner != userId) {
      return res.status(200).json({
        success: false,
        msg: 'La cotización especificada no es suya',
        moment
      });
    }
    return res.status(200).json({
      success: true,
      title: 'cotizador',
      quote,
      moment
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: 'error',
      msg: 'Error al intentar obtener cotización',
      moment
    });
  }
};

exports.postQuote2 = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    const userId = decoded.user_id;
    const { payload } = req.body;

    const { sperantClientId, projectsNum } = payload;
    const projectsArr = [];
    const flag = 0;

    const addresses = [];
    const budgets = await Sperant.getClientActiveBudgets(sperantClientId);

    await Promise.all(budgets.map(async (budget) => {
      const project = await Sperant.getClientProjects(sperantClientId);
      if (project != null) {
        const address = `${project[0].address}, ${project[0].state}, ${project[0].country}`;
        addresses.push(address);
      }
    }));
    // const quoteId = req.params.id;
    const quoteId = '6239681b4324e3af189c3659';
    // const userId = '5eff6f947005dd0017b6d60d';
    const quote = await Quote.findById(quoteId);
    // const user = await User.findById(req.user.id);
    const user = await User.findById(userId);
    const { doc, docPath, docName } = await pdfFileDownload(quote, user);

    return res.status(200).json({
      success: true,
      moment
    });
  } catch (error) {
    console.log(error);
    return res.redirect('back');
  }
};

exports.getProjectQuote = async (req, res, next) => {
  try {
    // const { token } = req.body;
    // const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    // const userId = decoded.user_id;
    const { floor, size1, size2 } = req.body.payload;

    const filter = {};
    const filterElement = {};
    if (floor && floor !== '') {
      if (floor !== 'Primer piso') {
        filterElement.floor = 2;
      } else {
        filterElement.floor = 1;
      }
    }
    if (size1 && size1 !== '') {
      filter.side1 = Number(size1);
    }
    if (size2 && size2 !== '') {
      filter.side2 = Number(size2);
    }
    // cuadro 1
    const quantities = await Environment.findOne(filter);

    // precios de cada material
    const materialsObj = await Material.find();

    // cuadro 2
    const elements = await Element.find(filterElement);
    const materials = [];
    const prices = [];
    const units = [];
    for (let index = 0; index < materialsObj.length; index++) {
      materials.push(materialsObj[index].name);
      prices.push(materialsObj[index].price);
      units.push(materialsObj[index].unit);
    }
    const secondFloorElement = {
      column: 0,
      beam: 0,
      lightenedSlab: 0,
      subfloor: 0,
      cementFloor: 0,
      wall: 0,
      plaster: 0,
      paint: 0,
    };
    const quoteMaterialProto = {
      crushedStone: 0,
      grossSand: 0,
      fineSand: 0,
      cement: 0,
      water: 0,
      wire16: 0,
      wire8: 0,
      reforceSteel: 0,
      nail: 0,
      largeStone: 0,
      gravel: 0,
      roofBrick: 0,
      brick: 0,
      turpentine: 0,
      sandpaper: 0,
      sealer: 0,
      paint: 0,
    };
    const keys = [];

    for (const key in quantities._doc) {
      if (quantities._doc.hasOwnProperty(key)) {
        keys.push(key);
      }
    }

    if (filterElement.floor === 1) {
      for (let i = 7; i < 18; i++) {
        quoteMaterialProto.crushedStone = quantities._doc[keys[i]] * elements[i - 7].crushedStone
                    + quoteMaterialProto.crushedStone;
        quoteMaterialProto.grossSand = quantities._doc[keys[i]] * elements[i - 7].grossSand
                    + quoteMaterialProto.grossSand;
        quoteMaterialProto.fineSand = quantities._doc[keys[i]] * elements[i - 7].fineSand
                    + quoteMaterialProto.fineSand;
        quoteMaterialProto.cement = quantities._doc[keys[i]] * elements[i - 7].cement
                    + quoteMaterialProto.cement;
        quoteMaterialProto.water = quantities._doc[keys[i]] * elements[i - 7].water
                    + quoteMaterialProto.water;
        quoteMaterialProto.wire16 = quantities._doc[keys[i]] * elements[i - 7].wire16
                    + quoteMaterialProto.wire16;
        quoteMaterialProto.wire8 = quantities._doc[keys[i]] * elements[i - 7].wire8
                    + quoteMaterialProto.wire8;
        quoteMaterialProto.reforceSteel = quantities._doc[keys[i]] * elements[i - 7].reforceSteel
                    + quoteMaterialProto.reforceSteel;
        quoteMaterialProto.nail = quantities._doc[keys[i]] * elements[i - 7].nail
                    + quoteMaterialProto.nail;
        quoteMaterialProto.largeStone = quantities._doc[keys[i]] * elements[i - 7].largeStone
                    + quoteMaterialProto.largeStone;
        quoteMaterialProto.gravel = quantities._doc[keys[i]] * elements[i - 7].gravel
                    + quoteMaterialProto.gravel;
        quoteMaterialProto.roofBrick = quantities._doc[keys[i]] * elements[i - 7].roofBrick
                    + quoteMaterialProto.roofBrick;
        quoteMaterialProto.brick = quantities._doc[keys[i]] * elements[i - 7].brick
                    + quoteMaterialProto.brick;
        quoteMaterialProto.turpentine = quantities._doc[keys[i]] * elements[i - 7].turpentine
                    + quoteMaterialProto.turpentine;
        quoteMaterialProto.sandpaper = quantities._doc[keys[i]] * elements[i - 7].sandpaper
                    + quoteMaterialProto.sandpaper;
        quoteMaterialProto.sealer = quantities._doc[keys[i]] * elements[i - 7].sealer
                    + quoteMaterialProto.sealer;
        quoteMaterialProto.paint = quantities._doc[keys[i]] * elements[i - 7].paint
                    + quoteMaterialProto.paint;
      }
    } else {
      secondFloorElement.column = quantities.column;
      secondFloorElement.beam = quantities.beam;
      secondFloorElement.lightenedSlab = quantities.lightenedSlab;
      secondFloorElement.cementFloor = quantities.cementFloor;
      secondFloorElement.subfloor = quantities.subfloor;
      secondFloorElement.wall = quantities.wall;
      secondFloorElement.plaster = quantities.plaster;
      secondFloorElement.paint = quantities.paint;
      const codes = [];
      for (const key in secondFloorElement) {
        if (secondFloorElement.hasOwnProperty(key)) {
          codes.push(key);
        }
      }
      for (let i = 0; i < 8; i++) {
        quoteMaterialProto.crushedStone = secondFloorElement[codes[i]] * elements[i].crushedStone
                    + quoteMaterialProto.crushedStone;
        quoteMaterialProto.grossSand = secondFloorElement[codes[i]] * elements[i].grossSand
                    + quoteMaterialProto.grossSand;
        quoteMaterialProto.fineSand = secondFloorElement[codes[i]] * elements[i].fineSand
                    + quoteMaterialProto.fineSand;
        quoteMaterialProto.cement = secondFloorElement[codes[i]] * elements[i].cement
                    + quoteMaterialProto.cement;
        quoteMaterialProto.water = secondFloorElement[codes[i]] * elements[i].water
                    + quoteMaterialProto.water;
        quoteMaterialProto.wire16 = secondFloorElement[codes[i]] * elements[i].wire16
                    + quoteMaterialProto.wire16;
        quoteMaterialProto.wire8 = secondFloorElement[codes[i]] * elements[i].wire8
                    + quoteMaterialProto.wire8;
        quoteMaterialProto.reforceSteel = secondFloorElement[codes[i]] * elements[i].reforceSteel
                    + quoteMaterialProto.reforceSteel;
        quoteMaterialProto.nail = secondFloorElement[codes[i]] * elements[i].nail
                    + quoteMaterialProto.nail;
        quoteMaterialProto.largeStone = secondFloorElement[codes[i]] * elements[i].largeStone
                    + quoteMaterialProto.largeStone;
        quoteMaterialProto.gravel = secondFloorElement[codes[i]] * elements[i].gravel
                    + quoteMaterialProto.gravel;
        quoteMaterialProto.roofBrick = secondFloorElement[codes[i]] * elements[i].roofBrick
                    + quoteMaterialProto.roofBrick;
        quoteMaterialProto.brick = secondFloorElement[codes[i]] * elements[i].brick
                    + quoteMaterialProto.brick;
        quoteMaterialProto.turpentine = secondFloorElement[codes[i]] * elements[i].turpentine
                    + quoteMaterialProto.turpentine;
        quoteMaterialProto.sandpaper = secondFloorElement[codes[i]] * elements[i].sandpaper
                    + quoteMaterialProto.sandpaper;
        quoteMaterialProto.sealer = secondFloorElement[codes[i]] * elements[i].sealer
                    + quoteMaterialProto.sealer;
        quoteMaterialProto.paint = secondFloorElement[codes[i]] * elements[i].paint
                    + quoteMaterialProto.paint;
      }
    }

    const quoteMaterials = [];
    for (const key in quoteMaterialProto) {
      keys.push(key);
      quoteMaterialProto[key] = util.roundUp(quoteMaterialProto[key]);
    }
    for (const key in quoteMaterialProto) {
      keys.push(key);
      if (key == 'reforceSteel') {
        quoteMaterials.push(util.roundUp(quoteMaterialProto[key] / (0.89 * 9)));
      } else {
        quoteMaterials.push(util.roundUp(quoteMaterialProto[key]));
      }
    }

    // console.log('materials', materials);

    return res.status(200).json({
      success: true,
      quoteMaterials,
      materials,
      prices,
      units,
      title: 'cotizador',
    });
    // return res.status(200).json({
    //   success: true,
    // });
  } catch (error) {
    next(error);
  }
};

exports.getChangeQuoteStatus = async (req, res) => {
  try {
    const quoteId = req.params.id;
    const quote = await Quote.findById(quoteId);
    if (quote.owner != req.user.id) {
      req.flash('errors', {
        msg: 'La cotización especificada no es suya',
      });
      return res.redirect('back');
    }
    quote.startProject = true;
    await quote.save();
    req.flash('success', {
      msg: 'Se ha notificado al administrador',
    });
    return res.redirect('back');
  } catch (error) {
    console.log(error);
    req.flash('errors', {
      msg: 'Error al intentar obtener cotización',
    });
    return res.redirect('back');
  }
};

exports.sendQuoteDetail = async (req, res) => {
  try {
    const quoteId = req.params.id;
    const quote = await Quote.findById(quoteId);
    // const user = await User.findById(req.user.id);
    const user = await User.findById(req.query.userId);
    const { docPath, docName } = await pdfFileSend(quote, user);
    const mailOptions = {
      from: 'no-reply@menorca.com.pe',
      to: `${user.email}`,
      subject: 'Cotización de proyecto de construcción Menorca',
      text: 'Estimado cliente a petición suya se le envía la cotización generada el día de hoy.',
      attachments: [{
        filename: docName,
        path: docPath,
        contentType: 'application/pdf',
      },],
    };

    const response = await mailtrap(user.email, 'Cotización de proyecto de construcción Menorca', 'Estimado(a) cliente a petición suya se le envía la cotización generada el día de hoy.', docName, docPath);

    console.log('RESPONSE (sendQuoteDetail)', response);

    return res.status(200).json({
      response
    });
  } catch (error) {
    console.log(error);
    req.flash('errors', {
      msg: 'Error al enviar detalle de cotización cotización',
    });
    return res.redirect('back');
  }
};

exports.downloadQuoteDetail = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    const userId = decoded.user_id;
    const quoteId = req.params.id;
    const quote = await Quote.findById(quoteId);
    const user = await User.findById(userId);

    const { doc, docPath, docName } = await pdfFileDownload(quote, user);

    doc.pipe(fs.createWriteStream(docPath)).on('finish', () => {});

    doc.end();

    return res.status(200).json({
      success: true,
      urlDoc: `${process.env.BASE_URL}/images/uploads/${docName}`
    });
  } catch (error) {
    console.log(error);
    req.flash('errors', {
      msg: 'Error al enviar detalle de cotización cotización',
    });
  }
};

exports.getUnitSize = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    const userId = decoded.user_id;
    const { payload } = req.body;
    const {
      sperantClientId,
      budgetId
    } = payload;
    const units = [];
    const budgets = await Sperant.getClientActiveBudgets(sperantClientId);
    // console.log(‘budgets’, budgets);
    const unit = await Sperant.getUnits(budgetId);
    const construction = await Sperant.getUnits2(unit[0].id);
    // await Promise.all(budgets.map(async (budget) => {
    //   console.log(‘budget.id’, budget.id);
    //   console.log(‘construction’, construction);
    //   units.push(unit[0]);
    // }));
    return res.status(200).json({
      success: true,
      construction,
      moment,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: error.message
    });
  }
};

exports.postCounseling = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    const userId = decoded.user_id;
    const { counseling, contractNum } = req.body;

    await User.findOneAndUpdate({ _id: userId }, {
      counseling,
    });

    const { data } = await BI.getGCData(contractNum);

    console.log('=========================');
    console.log('data', data);
    console.log('process.env.MIBOLSILLO_API_URL', process.env.MIBOLSILLO_API_URL);
    console.log('process.env.MIBOLSILLO_API_APP_ID', process.env.MIBOLSILLO_API_APP_ID);
    console.log('=========================');

    if (data) {
      const response = await axios.post(process.env.MIBOLSILLO_API_URL, data, {
        headers: {
          'Content-Type': 'application/json',
          applicationId: process.env.MIBOLSILLO_API_APP_ID
        }
      });
    }

    return res.status(200).json({
      success: true,
      counseling,
      moment,
    });
  } catch (error) {
    console.log(error.response);
    if (error.response.status == 409) {
      return res.status(200).json({
        success: true
      });
    }
    return res.redirect('back');
  }
};
exports.postCheckNIF = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    const userId = decoded.user_id;
    const { budgetCode, contractNum } = req.body.payload;

    let checked = false;

    const isCompleted = await BI.isCompleted(budgetCode);
    const hasNIF = await BI.getEstadoNIF(contractNum);

    if (isCompleted && hasNIF.estado_nif !== null) {
      checked = true;
    } else {
      checked = false;
    }

    return res.status(200).json({
      success: true,
      checked,
      moment,
    });
  } catch (error) {
    console.log(error.response);
    if (error.response.status == 409) {
      return res.status(200).json({
        success: true
      });
    }
    // return res.redirect('back');
  }
};
