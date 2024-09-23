require("dotenv").config();

// PACKAGES
const fs = require("fs");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// END OF PACKAGES

const sendgrid = async (
  to,
  subject,
  html,
  withFile = false,
  docName = null,
  docPath = null
) => {
  let msg = {
    from: {
      email: "contacto@menorca.com.pe", // process.env.SENDGRID_API_FROM,
      name: "Ventana Menorca",
    },
    to,
    subject,
    html,
    //replyTo: 'atencion.clientes@menorca.com.pe',
  };

  if (withFile) {
    msg = {
      from: {
        email: "contacto@menorca.com.pe", // process.env.SENDGRID_API_FROM,
        name: "Ventana Menorca",
      },
      to,
      subject,
      //replyTo: 'atencion.clientes@menorca.com.pe',
      html,
      attachments: [
        {
          content: docPath,
          filename: docName,
          ContentType: "application/pdf",
          disposition: "attachment",
        },
      ],
    };
  }

  const response = await sgMail.send(msg);
  return response;
};

module.exports = sendgrid;
