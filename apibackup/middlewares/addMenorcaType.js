const User = require("../models/User");

exports.addMenorcaType = async (req, res, next) => {
  
  try {
    const user = await User.findById(req.user._id);
    
    const { sperantEmail, budgets } = user.profile;

    if ( user.type !== 0 ){
      user.profile.menorcaType = 2;
    }
    
    if ( budgets.length !== 0 ){
      user.profile.menorcaType = 1;
    }
    
    if ( sperantEmail && sperantEmail.includes('@menorca.pe') ){
      user.profile.menorcaType = 0;
    }
    
    await user.save();
    
    next();
  } catch (error) {
    console.log(error);
  }
}