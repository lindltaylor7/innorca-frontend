const { SperantV3 } = require('../services/sperant')
const Sperant = new SperantV3()

exports.isMenorcaClient = async (req, res, next) => {
  const { sperantClientId, sperantEmail } = req.user.profile;

  if (sperantEmail && sperantEmail.includes('@menorca.pe')) {
    next();
  }

  const budgets = await Sperant.getClientActiveBudgets(sperantClientId);

  if (budgets.length > 0) {
    next();
  } else {
    req.flash("errors", {
      msg: "Para poder accerder a cotizaciones, debes de tener al menos un lote o casa adquirido en Menorca.",
    });
    return res.redirect('back');
  }
}