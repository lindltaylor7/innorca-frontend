'use strict';
require('dotenv').config();

// PACKAGES
const nodemailer = require('nodemailer');
const path = require('path');
// END OF PACKAGES

const createTrans = () => {

    return nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

};

const mailtrap = async(to, subject, html, withFile = false, docName = null, docPath = null) => {

    let data = {
        from: process.env.MAIL_FROM_ADDRESS,
        to,
        subject,
        html
    }

    if (withFile) {
        data = {
            from: process.env.MAIL_FROM_ADDRESS,
            to,
            subject,
            html,
            attachments: [{
                filename: docName,
                path: path.join(__dirname, `../uploads/${docName}`),
                contentType: 'application/pdf'
            }]
        }
    }


    const transporter = createTrans();
    const info = await transporter.sendMail(data);

    return info.messageId;
};

module.exports = mailtrap;