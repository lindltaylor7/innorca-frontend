const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    required: true
  },
});

const userSchema = new mongoose.Schema({
  active: { type: Boolean, default: false },
  activeAccountRecord: [{ type: Date }],
  confirmationCode: String,
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: Boolean,
  newsletter: Boolean,
  smsPin: String,
  token: String,
  tokens: Array,
  googleToken: Object,
  microsoftToken: Array,
  counseling: Boolean,
  // tipo de usuario 0: Admin,  1:Common 2:Admin-quotes 3:Secretary
  type: { type: Number, default: 1 },
  titular: String,
  profile: {
    name: String,
    docType: String,
    document: { type: String, unique: true },
    mainTelephone: String,
    sperantEmail: String,
    sperantClientId: String,
    projects: Array,
    budgets: [{ type: String }],
    // 0 Trabajador, 1 cliente, 2 ni trabajador ni cliente
    menorcaType: Number,
    gender: String,
    phone: String,
    // Longitud, Latitud
    point: pointSchema,
    address: String,
    addressRecord: [{ type: String }],
    emailRecord: [{ type: String }],
    pointRecord: [pointSchema],
    reference: String,
    website: String,
    picture: String,
    secondaryTelephone: String,
    telephoneRecord: [{ type: String }]
  }
}, { timestamps: true });

userSchema.index({ 'profile.point': '2dsphere' }, { background: false });
/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
