require('dotenv').config();

const fs = require('fs');

const { promisify } = require('util');
const crypto = require('crypto');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const validator = require('validator');
const mailChecker = require('mailchecker');
const moment = require('moment');
const axios = require('axios');
const util = require('../util');
// MAIL SENDER
// VALIDATORS
// DAY FORMATER
// HTTP REQUEST

// MAIL SENDER
// VALIDATORS
// DAY FORMATER
// HTTP REQUEST
// MONGO MODELS
const Point = require('../models/Point');
const Push = require('../models/Push');
const Notification = require('../models/Notification');
const Request = require('../models/Request');
const User = require('../models/User');
const Analytic = require('../models/Analytic');
const QuestionCategory = require('../models/QuestionCategory');
const FrequentQuestion = require('../models/FrequentQuestion');
const CIP = require('../models/CIP');
const ExchangeRate = require('../models/ExchangeRate');
const Referred = require('../models/Referred')

const Post = require("../models/Post");

const { SperantV3 } = require('../services/sperant');

const Sperant = new SperantV3();

const { BIV1 } = require('../services/bi');

const BI = new BIV1();

const { MongoV1 } = require('../services/mongo');

const Mongo = new MongoV1();

const templates = require('../mails/templates');
const sendgrid = require('../mails/sendgrid');
const mailtrap = require('../mails/mailtrap');

const apiclicksend = require('clicksend/api.js');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const path = require('path');

exports.getReferences = async(req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, 'ventanamenorca9476928734');
        const userId = decoded.user_id;

        const filter = { referencerId: userId };

        const referrals = await Referred.find(filter, {}).sort({ createdAt: -1 }).countDocuments();

        return res.status(200).json({
            referrals: referrals
        });

    } catch (error) {
        return res.status(200).send({
            success: false,
            message: error
        });
    }
}

exports.getTickets = async(req, res, next) => {
    try {

        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, 'ventanamenorca9476928734');
        var userId = decoded.user_id;

        const body = req.body;

        let page = 1;
        let budgetCode = body.budgetCode;
        const budgetId = await Sperant.getBudgetByCode(budgetCode);
        const user = await User.findById(userId);

        if (user) {
            const { sperantClientId } = user.profile;

            const data = await Sperant.getLastThreeTickets(budgetId.id, sperantClientId, page);

            return res.status(200).json({
                tickets: data.tickets
            });
        }

        return res.status(200).send({
            success: false,
            message: "error"
        });

    } catch (error) {
        console.log(error);

        return res.status(200).send({
            success: false,
            message: error
        });
    }
}


exports.getLastThreePayments = async(req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, 'ventanamenorca9476928734');
        const userId = decoded.user_id;

        const { body } = req;

        const user = await User.findById(userId);

        const page = 1;
        const limit = 3;

        const response = await BI.fetchPaymentHistory(body.budgetCode, user.profile.document, page, limit);

        return res.status(200).send({
            success: true,
            payments: response.rows
        });
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: error.message
        });
    }
}


exports.getNews = async(req, res, next) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).limit(3)

        return res.status(200).json({
            success: true,
            posts
        });

    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        });
    }
}

exports.getPaymentInformation = async(req, res, next) => {
    try {
        const { budgetCode } = req.body;
        const { projectType } = req.body;

        const pendingBudgets = await Sperant.getPendingBudgets(budgetCode, projectType);
        const nextPendingBudget = await Sperant.getNextPendingBudget(budgetCode, projectType);

        // const manualPendingBudgets = pendingBudgets.payments.length > 0 ? pendingBudgets.payments[0].bank : '' ;
        const manualPendingBudgets = pendingBudgets.nextPaymentBank;
        const manualNextPendingBudget = nextPendingBudget.nextPaymentBank;

        return res.status(200).json({
            success: true,
            title: 'reciente-pago-pendiente',
            pendingBudgets,
            nextPendingBudget,
            manualPendingBudgets,
            manualNextPendingBudget
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        });
    }
};


exports.postPaymentProgress = async(req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, 'ventanamenorca9476928734');
        const userId = decoded.user_id;

        const { body } = req;

        const user = await User.findById(userId);

        let {
            DformattedTotalSaldo,
            DtotalSaldo,
            DtotalQuotes,

            DformattedTotalAmount,
            DtotalAmount,
            DcompletedQuotes,

            DformattedProjectTotal,
            DprojectTotal
        } = await BI.getBudgetPaymentsQuotes(body.budgetCode, user.profile.document);

        if (DprojectTotal == 0) {
            let {
                DformattedTotalSaldo,
                DtotalSaldo,
                DtotalQuotes,

                DformattedTotalAmount,
                DtotalAmount,
                DcompletedQuotes,

                DformattedProjectTotal,
                DprojectTotal
            } = await BI.getBudgetPaymentsPayments(body.budgetCode, user.profile.document);

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

                moment: moment()
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

            moment: moment()
        });


    } catch (error) {
        return res.status(200).send({
            success: false,
            message: error.message
        });
    }
}