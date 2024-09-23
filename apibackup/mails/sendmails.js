'use strict';
const dotenv = require('dotenv');
dotenv.config();

// PACKAGES
//const { saveEmailSent, saveError } = require('../controllers/functions');
const sendgrid2 = require('./sendgrid2');
const mailtrap = require('./mailtrap');
// END OF PACKAGES

exports.sendMails = async(emails, subject, useTemplate, model, reason, bcc = [], environmentName = null) => {

    let environment = environmentName || process.env.NODE_ENV;

    if (environment == 'development') {

        try {

            let response = await mailtrap(emails, subject, useTemplate);
            //let identifiers = Array.isArray(emails) ? JSON.stringify(emails) : emails;
            //let quantity = Array.isArray(emails) ? emails.length : 1;

            //await saveEmailSent(identifiers, quantity, 'MAILTRAP', reason, response);
            console.log("Message sent: %s", response);

        } catch (err) {

            //let errorData = { emails, subject, reason, environment };

            //await saveError(model, reason, errorData, err.message);
            console.error('ERROR', err);

        }

    } else {

        try {

            /*let identifiers;

            if (Array.isArray(emails)) {
                identifiers = emails.concat(bcc);
            } else {
                identifiers = [emails].concat(bcc);
            }*/

            let response = await sendgrid2(emails, subject, useTemplate);
            //let quantity = identifiers.length;

            //await saveEmailSent(JSON.stringify(identifiers), quantity, 'SENDGRID', reason, response);
            console.log("Message sent: %s", response[0]);

        } catch (err) {

            //let errorData = { emails, subject, reason, environment };

            //await saveError(model, reason, errorData, err.message);
            console.error('ERROR', err);

        }

    }

};