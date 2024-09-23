const moment = require('moment');
moment.locale('es');

// * GET /
// * Home page.
// */
exports.goDaddy = async (req, res) => {
  try {
    return res.render("godaddy", {
      title: "Godaddy",
    });
  } catch (error) {
    console.log(error);
    req.flash('errors', { msg: 'Error' });
    return res.redirect('back');
  }
};

exports.index = async (_req, res) => {
  return res.redirect("/account");
};

exports.getFrequentQuestions = async (req, res) => {
  try {
    const { questionId } = req.query;

    return res.render('partials/frequentQuestions', {
      title: 'Preguntas Frecuentes',
      questionId
    });
  } catch (error) {
    console.log(error);
    req.flash('errors', { msg: 'Error' });
    res.redirect('back');
  }
};