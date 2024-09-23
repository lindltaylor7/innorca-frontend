const jwt = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const accessKeyId = process.env.AWS_ID;
const secretAccessKey = process.env.AWS_SECRET;

const s3 = new aws.S3({
    accessKeyId,
    secretAccessKey,
});


exports.uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "ventanamenorca",
        acl: "public-read",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            const splitted = file.originalname.split('.')
            const extension = splitted[splitted.length - 1]
                // + shortid.generate()
            const name = Date.now() + shortid.generate() + "-" + "." + extension
            req.body.file = `https://ventanamenorca.s3.us-east-2.amazonaws.com/${name}`
            cb(null, name);
        },
    }),
});