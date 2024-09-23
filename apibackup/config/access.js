const User = require("../models/User");

exports.isAdmin = async (req, res, next) => {
  
  try {
    const user = await User.findById(req.user._id);
    
    if ( user.type === 0 ){
    next();
    }
  } catch (error) {
    console.log(error);
  }
}

exports.isAdminCoti = async (req, res, next) => {
  
  try {
    const user = await User.findById(req.user._id);
    
    if ( user.type === 2 ){
    next();
    }
  } catch (error) {
    console.log(error);
  }
}