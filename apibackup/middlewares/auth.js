const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(200).json({ error: "Un token es requerido para la autenticación" })
  }
  try {
    const decoded = jwt.verify(token, 'ventanamenorca9476928734'/*config.TOKEN_KEY*/);
    req.user = decoded;
  } catch (err) {
    return res.status(200).json({ error: "Token inválido" });
  }
  next();
};

module.exports = verifyToken;
