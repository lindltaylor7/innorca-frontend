

exports.getBanksMap = (req, res, next) => {
  try {
    let { bankname,title } = req.query;
    if(!title){
      title="inmuebles"
    }
    return res.render('maps/bankMap.pug', {
      bankname,
      title
    })
  } catch (error) {
    console.log(error);
    next(error);
  }
}