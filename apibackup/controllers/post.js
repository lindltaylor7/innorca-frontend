const { promisify } = require("util");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const passport = require("passport");
const _ = require("lodash");
const validator = require("validator");
const mailChecker = require("mailchecker");
const util = require("../util");
const moment = require("moment");
moment.locale('es');
const Post = require("../models/Post");

const User = require("../models/User");
const { userInfo } = require("os");

exports.getNews = async(req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt : -1})

    return res.status(200).json({
        success: true,
        posts,
        title:"noticias"
    });

  } catch (error) {

    return res.status(200).json({
        success: false,
        message: error.message
    });

  }
}

exports.getPreview = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    let title = "noticias";
    /*if(req.user.type==0){
      title="admin-noticias"
    }else{
      title="noticias"
    }*/

    return res.status(200).json({
        success: true,
        post,
        moment,
        title
    });

  } catch (error) {
    return res.status(200).json({
        success: false,
        message: error.message
    });
  }
}

exports.getNextNews = async (req, res, next) => {
  try {
    const { page } = req.query;
    let filter = {};
    let skip = 0;
    if (page && page > 0) {
      skip = (page - 1) * 10;
    }
    filter.disponible= true;
    const posts = await Post.find(filter).sort({ createdAt : -1}).skip(skip).limit(10);
    const count = await Post.find(filter).count();

    return res.status(200).json({
        success: true,
        posts,
        total: count,
    });

  } catch (error) {

    return res.status(200).json({
        success: false,
        message: error.message
    });

  }
};

exports.setVisible = async (req,res,next) =>{
  try{
    const id = req.params.id;
    const currentPost = await Post.findById(id);
    if(currentPost.disponible==true){
      currentPost.disponible = false
      await currentPost.save()
      req.flash('errors', { msg: `La noticia ${currentPost.title} ya no es visible ` });
      return res.redirect('back')
    }
    if(currentPost.disponible==false){
      currentPost.disponible = true
      await currentPost.save()
      req.flash('success', { msg: `La noticia ${currentPost.title} es ahora visible ` });
      return res.redirect('back')
    }


  }catch(err){
    return next(err)
  }
}
