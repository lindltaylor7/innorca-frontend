require("dotenv").config();

// PACKAGES
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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" /* process.env.SENDGRID_API_KEY */
);
// END OF PACKAGES

const sendgrid = (to, subject, html, cb) => {
  const msg = {
    from: {
      email: "contacto@menorca.com.pe", // process.env.SENDGRID_API_FROM,
      name: "Ventana Menorca",
    },
    to,
    subject,
    html,
  };

  sgMail
    .send(msg)
    .then((response) => {
      cb(response);
    })
    .catch((err) => {
      cb(err);
    });
};

module.exports = sendgrid;
