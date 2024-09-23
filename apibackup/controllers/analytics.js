const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Analytics = require('../models/Analytic');

exports.postRawData = async (req, res, next) => {
  try {
    // const token = req.headers['x-access-token'];
    // const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    // const userId = decoded.user_id;
    const { type, rawData } = req.body;

    // console.log('req.body', req.body);

    const event = new Analytics({
      type,
      rawData
    });

    await event.save();

    return res.status(200).json({
      success: true,
      moment,
      msg: 'Evento correctamente guardado'
    });
  } catch (error) {
    console.log(error);
    return res.redirect('back');
  }
};
