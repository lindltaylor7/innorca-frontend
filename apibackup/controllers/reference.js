const moment = require("moment");

const { referralCreated } = require("../mails/templates");
const { SperantV3 } = require("../services/sperant");
const sendgrid2 = require("../mails/sendgrid2");
const mailtrap = require("../mails/mailtrap");

const Sperant = new SperantV3();

const User = require("../models/User");
const Referred = require("../models/Referred");
const jwt = require("jsonwebtoken");
const { referralAttendant } = require("./request.constants");
const { BIV1 } = require("../services/bi");
const { CostExplorer } = require("aws-sdk");
const {
  collapseTextChangeRangesAcrossMultipleVersions,
} = require("typescript");

const BI = new BIV1();

/**
 * @method
 * @desc Crear referido
 * @param {string} document document
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.createReferrals = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;
    const { body } = req;
    let message = "";

    const user = await User.findById(userId);
    const referralBiExistence = await BI.getReferralExistenceBI(
      body.payload.dni_referidor,
      body.payload.document
    );

    const referredExistence = await Referred.findOne({
      dni: body.payload.document,
    });

    let documentType = "";

    switch (body.payload.documentType) {
      case "1":
        documentType = "DNI";
        break;
      case "2":
        documentType = "CE";
        break;
      case "3":
        documentType = "RUC";
        break;
      case "4":
        documentType = "Pasaporte";
        break;
      default:
    }

    if (referralBiExistence.rows.length === 0) {
      const client = await Sperant.postReferredClient(
        body.payload.firstName,
        body.payload.lastName,
        body.payload.email,
        body.payload.projectId,
        body.payload.phone,
        body.payload.documentType,
        body.payload.document,
        body.payload.observation,
        body.payload.dni_referidor
      );

      if (referredExistence == null) {
        const referenceFullName = `${client.firstName} ${client.lastName}`;
        await Referred.create({
          referencerId: body.payload.referencerId,
          name: `${client.firstName} ${client.lastName}`,
          dni: body.payload.document,
          documentType,
          document: body.payload.document,
          email: body.payload.email,
          phone: body.payload.phone,
          projectId: body.payload.projectId,
          comments: client.observation,
          sperantId: client.id,
          projectList: [body.payload.projectId],
          sperantStatus: "pending",
          propertyType: body.payload.propertyType,
        });

        const subject = "Nuevo Referido de Menorca";

        const responseS = await sendgrid2(
          body.payload.email,
          subject,
          referralCreated(referenceFullName, user.profile.name),
          false
        );

        return res.status(200).json({
          success: true,
        });
      }
    } else {
      if (
        referredExistence != null &&
        referredExistence.referencerId == userId
      ) {
        message = "Ya has agregado a este referido";
      } else {
        message = "Este referido ya fue agregado por otro usuario";
      }
      return res.status(200).json({
        success: false,
        message: "El referido ya existe",
        case: message,
      });
    }
  } catch (error) {
    if (error.response && error.response.data) console.log(error.response.data);
    if (error === "Error at send the data to Sperant") {
      req.flash("info", {
        msg: "Fallo el envio a Sperant, vuelva a intentarlo más tarde.",
      });
      return res.redirect("back");
    }

    next(error);
  }
};

/**
 * @method
 * @desc Obtener referidos
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getReferences = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;

    const filter = { referencerId: userId };

    // listado total referidos
    const referrals = await Referred.find(filter, {}).sort({ createdAt: -1 });
    const referralWithProperty = [];
    const validPrizes = [];

    // listado referidos que cuentan con una propiedad
    const allReferrals = await referrals.map(async (item) => {
      const budgets = await Sperant.getClientActiveBudgets(item.sperantId);
      const validBudgets = await budgets.map(async (budget) => {
        const validBudget = await BI.getStatusReferral(budget.id);
        if (validBudget.data != undefined) {
          validPrizes.push(validBudget.data);
        }
        return {
          valid_budget: validBudget.data,
        };
      });

      const valid = await Promise.all(validBudgets);
      referralWithProperty.push({ item, ...valid[0] });

      return item;
    });

    await Promise.all(allReferrals);

    const sortedPrizes = validPrizes
      .sort((a, b) => b.fecha_impresion_contrato - a.fecha_impresion_contrato)
      .reverse();
    const finalPrizes = [];
    const finalPrizesSorted = await sortedPrizes.map(async (ref, i) => {
      const attendant = referralAttendant.filter((person) => {
        if (
          person.codigo_proyecto != undefined &&
          ref.codigo_proyecto != undefined
        ) {
          return person.codigo_proyecto == ref.codigo_proyecto;
        }
      });

      if (i === 0) {
        const prize = {
          codigo_proyecto: ref.codigo_proyecto,
          codigo_unidad: ref.codigo_unidad,
          fecha_impresion_contrato: ref.fecha_impresion_contrato,
          telefono: attendant[0].telefono,
          nombre: encodeURIComponent(attendant[0].nombre),
          prize: "S/ 500",
        };
        finalPrizes.push(prize);
      } else if (i === 1) {
        const prize = {
          codigo_proyecto: ref.codigo_proyecto,
          codigo_unidad: ref.codigo_unidad,
          fecha_impresion_contrato: ref.fecha_impresion_contrato,
          telefono: attendant[0].telefono,
          nombre: encodeURIComponent(attendant[0].nombre),
          prize: "S/ 600",
        };
        finalPrizes.push(prize);
      } else {
        const prize = {
          codigo_proyecto: ref.codigo_proyecto,
          codigo_unidad: ref.codigo_unidad,
          fecha_impresion_contrato: ref.fecha_impresion_contrato,
          telefono: attendant[0].telefono,
          nombre: encodeURIComponent(attendant[0].nombre),
          prize: "S/ 750",
        };
        finalPrizes.push(prize);
      }

      return ref;
    });

    await Promise.all(finalPrizesSorted);

    let arrReferrals = [];

    referralWithProperty.map((referral) => {
      if (referral.valid_budget != undefined) {
        finalPrizes.map((prize) => {
          if (prize.codigo_unidad == referral.valid_budget.codigo_unidad) {
            const premio = {
              prize,
            };
            const no = {
              caducidad: "Si",
            };
            const fecha = moment(
              referral.valid_budget.fecha_impresion_contrato
            );
            const fecha_caducidad = moment(fecha).add(30, "days");
            const now = moment(Date.now());
            const caducidad = now.diff(moment(fecha_caducidad), "days");

            if (caducidad > 0) {
              Object.assign(premio, no);
              const finalResult = Object.assign(referral, premio);
              arrReferrals.push(finalResult);
            } else {
              const finalResult = Object.assign(referral, premio);
              arrReferrals.push(finalResult);
            }
          }
        });
      } else {
        arrReferrals.push(referral);
      }

      return referral;
    });

    arrReferrals = arrReferrals.sort(
      (a, b) => b.item.createdAt - a.item.createdAt
    );

    return res.status(200).json({
      success: true,
      arrReferrals,
      moment,
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
 * @desc Obtener referidos
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getReferralsBI = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "ventanamenorca9476928734");
    const userId = decoded.user_id;
    const { body } = req;
    const { document } = body.payload;
    const response = await BI.getReferralsBI(document);

    await Promise.all(
      response.rows.map(async (item) => {
        const data = await Referred.findOne({ dni: item.documento });
        if (data === null) {
          await Referred.create({
            referencerId: userId,
            name: `${item.nombres} ${item.apellidos}`,
            dni: item.documento,
            email: item.email,
            phone: item.telefono,
            projectId: item.proyectos_relacionados,
            comments: item.observacion,
            sperantId: item.id,
            projectList: [item.proyectos_relacionados],
            sperantStatus: "pending",
            propertyType: "",
            createdAt: item.fecha_creacion,
          });
        }
      })
    );

    return res.status(200).json({
      success: true,
      // data: response.rows,
      moment,
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
 * @desc Obtener detalle de referido
 * @param {string} referredId referredId
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getReferredDetails = async (req, res, next) => {
  try {
    const { referredId } = req.params;

    const referred = await Referred.findById(referredId);

    const projectDict = [];

    for (let i = 0; i < referred.projectList.length; i++) {
      const projectId = referred.projectList[i];
      if (!projectDict.find((el) => el.id == projectId)) {
        const project = await Sperant.getProjectById(projectId);
        projectDict.push(project);
      }
    }

    return res.status(200).json({
      success: true,
      referred,
      projects: projectDict,
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
 * @desc Obtener proyectos
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Sperant.getProjectListTotal();
    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
    });
  }
};

/**
 * @method
 * @desc Obtener propiedades
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getProperties = async (req, res, next) => {
  try {
    const properties = await Sperant.getPropertyTypes();
    return res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
    });
  }
};
