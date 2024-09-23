const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET,
    accessKeyId: process.env.AWS_ID,
    region: 'us-east-2'
});


const s3 = new aws.S3();
exports.uploadSingle = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ventanamenorca',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            try {
                console.log('key file',file);

                const splitted = file.originalname.split('.')
                const extension = splitted[splitted.length - 1]
                const name = 'restapi.jpg'//`${Date.now()}.${extension}`
                req.body.fileName = file.originalname
                const bodyName = `${file.fieldname}`
                req.body[bodyName] = `https://ventanamenorca.s3.us-east-2.amazonaws.com/${name}`
                req.body["docName"] = splitted[0]
                cb(null, name);
            } catch (error) {
                console.log('error', error);
            }
        }
    }),
});
