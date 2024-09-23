const { registroLetras, cancelacionLetras, anulacionLetras, eliminarOperacion } = require("../services/cavaliClient");
exports.sendInstallments = async (req, res, next)=>{
  try {
    if( req.user && req.user.type == 1 ) {
      req.flash("errors", { msg: "no tiene permiso para acceder a esta funcionalidad!" });
      return res.redirect('/');
    }
    const { query } = req;
    let response;
    try {
      response = await registroLetras(query.client_id, query.budget_id)
      
    } catch (error) {
      console.log('-------')
      if (error.response && error.response.data) {
        console.log(error.response.data)
      } else {
        console.log(error)
      }
      console.log('-------')
      return res.redirect('back');
    }
    let message = 'Letras registradas correctamente.'
    let message2 = ''
    if (response.data) {
      message2 = response.data.split("<codigoOperacion>");
      message2 = message2[1].split("</codigoOperacion>")[0]
    }

    if (message2=='000') {
      message = response.data.split("<descripcionError>");
      message = message[1].split("</descripcionError>")[0]
      req.flash("warning", {
        msg: message,
      });
      return res.render("secretary/sendInstallments", {
        message,
        title: "secretary-installments"
      });
    } else {
      req.flash("success", {
        msg: "Letras registradas correctamente.",
      });
      return res.render("secretary/sendInstallments", {
        message,
        title: "secretary-installments"
      });
    }
    
  } catch (error) {
    console.log(error)
    req.flash("errors", { msg: error });
    return res.render("secretary/sendInstallments", {
      message: error,
      title: "secretary-installments"
    });
  }
}
exports.cancelInstallments = async (req, res, next)=>{
  try {
    if(req.user&&req.user.type==1){
      req.flash("errors", {
        msg: "no tiene permiso para acceder a esta funcionalidad!",
      });
      return res.redirect('/')
    }
    const { date , letter_number } = req.query;
    const response = await cancelacionLetras(date,letter_number)
    let message = 'Letras canceladas correctamente.'
    let message2 = ''
    console.log(response)
    if(response.data){
      message2 = response.data.split("<codigoOperacion>");
      message2 = message2[1].split("</codigoOperacion>")[0]
    }
    if(message2=='000'){
      message = response.data.split("<descripcionError>");
      message = message[1].split("</descripcionError>")[0]
      req.flash("warning", {
        msg: message,
      });
      return res.render("secretary/sendInstallments", {
        message,
        title: "secretary-installments"
      });
    }else{
      req.flash("success", {
        msg: "Letras canceladas correctamente.",
      });
      return res.render("secretary/sendInstallments", {
        message,
        title: "secretary-installments"
      });
    }
    
  } catch (error) {
    console.log(error)
    req.flash("errors", {
      msg: error,
    });
    return res.render("secretary/sendInstallments", {
      message: error,
      title: "secretary-installments"
    });
  }
}
exports.annulInstallments = async (req, res, next)=>{
  try {
    if(req.user&&req.user.type==1){
      req.flash("errors", {
        msg: "no tiene permiso para acceder a esta funcionalidad!",
      });
      return res.redirect('/')
    }
    const { date , letter_number } = req.query;
    const response = await anulacionLetras(date,letter_number)
    let message = 'Letras anuladas correctamente.'
    let message2 = ''
    console.log(response)
    if(response.data){
      message2 = response.data.split("<codigoOperacion>");
      message2 = message2[1].split("</codigoOperacion>")[0]
    }
    if(message2=='000'){
      message = response.data.split("<descripcionError>");
      message = message[1].split("</descripcionError>")[0]
      req.flash("warning", {
        msg: message,
      });
      return res.render("secretary/sendInstallments", {
        message,
        title: "secretary-installments"
      });
    }else{
      req.flash("success", {
        msg: "Letras anuladas correctamente.",
      });
      return res.render("secretary/sendInstallments", {
        message,
        title: "secretary-installments"
      });
    }
    
  } catch (error) {
    console.log(error)
    req.flash("errors", {
      msg: error,
    });
    return res.render("secretary/sendInstallments", {
      message: error,
      title: "secretary-installments"
    });
  }
}
exports.deleteInstallments = async (req, res, next)=>{
  try {
    if(req.user&&req.user.type==1){
      req.flash("errors", {
        msg: "no tiene permiso para acceder a esta funcionalidad!",
      });
      return res.redirect('/')
    }
    const { sales_code } = req.query;
    const response = await eliminarOperacion(sales_code)
    let message = 'Operación eliminada correctamente.'
    let message2 = ''
    console.log(response)
    if(response.data){
      message2 = response.data.split("<codigoOperacion>");
      message2 = message2[1].split("</codigoOperacion>")[0]
    }
    if(message2=='000'){
      message = response.data.split("<descripcionError>");
      message = message[1].split("</descripcionError>")[0]
      req.flash("warning", {
        msg: message,
      });
      return res.render("secretary/sendInstallments", {
        message,
        title: "secretary-installments"
      });
    }else{
      req.flash("success", {
        msg: "Operación eliminada correctamente.",
      });
      return res.render("secretary/sendInstallments", {
        message,
        title: "secretary-installments"
      });
    }
    
  } catch (error) {
    console.log(error)
    req.flash("errors", {
      msg: error,
    });
    return res.render("secretary/sendInstallments", {
      message: error,
      title: "secretary-installments"
    });
  }
}
exports.prepaidInstallments = async (req, res, next)=>{
  try {
    if(req.user&&req.user.type==1){
      req.flash("errors", {
        msg: "no tiene permiso para acceder a esta funcionalidad!",
      });
      return res.redirect('/')
    }
    const { client_id, budget_id, date , letter_number} = req.query;
    try {
      const response = await anulacionLetras(date,letter_number)
      console.log(response.data)
    } catch (error) {
        throw 'Error al anular letras';
    }
    const response = await registroLetras(client_id,budget_id)
    let message = 'Letras registradas correctamente.'
    let message2 = ''
    console.log(response)
    if(response.data){
      message2 = response.data.split("<codigoOperacion>");
      message2 = message2[1].split("</codigoOperacion>")[0]
    }
    if(message2=='000'){
      message = response.data.split("<descripcionError>");
      message = message[1].split("</descripcionError>")[0]
      req.flash("warning", {
        msg: message,
      });
      return res.render("secretary/sendInstallments", {
        message,
        title: "secretary-installments"
      });
    }else{
      req.flash("success", {
        msg: "Letras registradas correctamente.",
      });
      return res.render("secretary/sendInstallments", {
        message,
        title: "secretary-installments"
      });
    }
    
  } catch (error) {
    console.log(error)
    req.flash("errors", {
      msg: error,
    });
    return res.render("secretary/sendInstallments", {
      message: error,
      title: "secretary-installments"
    });
  }
}
exports.sessionInstallments = async (req, res, next)=>{
  try {
    if(req.user&&req.user.type==1){
      req.flash("errors", {
        msg: "no tiene permiso para acceder a esta funcionalidad!",
      });
      return res.redirect('/')
    }
    const { client_id, budget_id, date , letter_number } = req.query;
    try {
      const response = await anulacionLetras(date,letter_number)
      console.log(response.data)
    } catch (error) {
        throw 'Error al anular letras';
    }
    const response = await registroLetras(client_id,budget_id)
    let message = 'Letras registradas correctamente.'
    let message2 = ''
    console.log(response)
    if(response.data){
      message2 = response.data.split("<codigoOperacion>");
      message2 = message2[1].split("</codigoOperacion>")[0]
    }
    if(message2=='000'){
      message = response.data.split("<descripcionError>");
      message = message[1].split("</descripcionError>")[0]
      req.flash("warning", {
        msg: message,
      });
      return res.render("secretary/sendInstallments", {
        message,
        title: "secretary-installments"
      });
    }else{
      req.flash("success", {
        msg: "Letras registradas correctamente.",
      });
      return res.render("secretary/sendInstallments", {
        message,
        title: "secretary-installments"
      });
    }
    
  } catch (error) {
    console.log(error)
    req.flash("errors", {
      msg: error,
    });
    return res.render("secretary/sendInstallments", {
      message: error,
      title: "secretary-installments"
    });
  }
}

