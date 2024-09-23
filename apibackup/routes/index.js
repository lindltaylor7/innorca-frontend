const express = require('express');

const router = express.Router();

const bodyparser = require('body-parser');
const cors = require('cors');

const path = require('path');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, '../uploads') });

const passportConfig = require('../config/passport');

/**
 * Controllers (route handlers).
 */
const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const requestController = require('../controllers/request');
const adminController = require('../controllers/admin');
const apiController = require('../controllers/api');
const referredController = require('../controllers/reference');
const contactController = require('../controllers/contact');
const mapsController = require('../controllers/map');
const postController = require('../controllers/post');
const quoteController = require('../controllers/quote');
const secretaryController = require('../controllers/secretary');
/**
 * API keys and Passport configuration.
 */

const { uploadSingle } = require('../middlewares/s3-upload');
const { isMenorcaClient } = require('../middlewares/isMenorcaClient');
const { addMenorcaType } = require('../middlewares/addMenorcaType');
const accessConfig = require('../config/access');

/**
 * SPERANT API ROUTES.
 */
const ApiRouter = require('../api/api.router');

router.use('/api', ApiRouter);

const authMenorca = require('../middlewares/auth');
// router.use(authMenorca)

/* router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

router.use(bodyparser.urlencoded({extended: true}));
router.use(bodyparser.json()); */

/* router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));
router.use(cors()); */

/**
 * Primary app routes.
 */
router.get('/servicios/registro-letras/sperant-cavali', secretaryController.sendInstallments);
router.get('/.well-known/pki-validation/godaddy.html', homeController.goDaddy);
// router.post('/', homeController.postRequest);

// router.post('/signup', userController.postSignup);

const { updateUserData } = require('../middlewares/sperantMigration.mw');

router.use(updateUserData);

/**
 * LIBS ROUTES.
 */
const LibsRouter = require('../libs/libs.router');

router.use('/', LibsRouter);

router.get('/', passportConfig.isAuthenticated, homeController.index);
router.get('/account/verify', passportConfig.isAuthenticated, userController.getVerifyEmail);
router.get('/account/verify/:token', passportConfig.isAuthenticated, userController.getVerifyEmailToken);

// router.get('/account', passportConfig.isAuthenticated, addMenorcaType, userController.getAccount);
// router.post('/account/profile', userController.postUpdateProfile);

router.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
router.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
router.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);
//router.get('/preguntas-frecuentes', homeController.getFrequentQuestions);
// router.get('/preguntas-frecuentes/obtener', passportConfig.isAuthenticated, userController.getFrequentQuestions);
router.get('/preguntas-frecuentes/categorias/obtener', passportConfig.isAuthenticated, userController.getQuestionsCategories);

/**
 * Admin routes.
 */
router.get('/admin/consulta/:requestId', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminRequestDetail);
router.post('/admin/consulta/:requestId', passportConfig.isAuthenticated, accessConfig.isAdmin, uploadSingle.single('file'), adminController.postAdminRequestDetail);
router.get('/admin/consultas', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminAllRequests);
router.get('/admin/nextRequests', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminNextRequests);
router.get('/admin/request/close/:requestId', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminCloseRequest);
router.get('/admin/exports/requests', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.exportRequests);

// router.get('/admin/referencias', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminAllReferences);
router.get('/admin/nextReferences', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminNextReferences);
router.get('/admin/referido/detalles/:referredId', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminReferredDetails);
router.get('/admin/exports/referals', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.exportReferals);

// router.post('/admin/actualizar/referido/:referredId', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminUpdateRefferred);
router.get('/admin/metricas', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminMetrics);
router.get('/admin/usuarios', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminAllUsers);
router.get('/admin/nextUsers', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminNextUsers);
router.get('/admin/usuario/:userId', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminUserDetails);
router.get('/admin/noticias', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminAllNews);
router.get('/admin/nextNews', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getAdminNextNews);
router.get('/admin/noticias/crear', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getCreateNew);
router.post('/admin/noticias/crear', passportConfig.isAuthenticated, accessConfig.isAdmin, uploadSingle.single('file'), adminController.postCreateNew);
router.get('/admin/noticias/:id/editar', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getUpdateNew);
router.post('/admin/noticias/:id/editar', passportConfig.isAuthenticated, accessConfig.isAdmin, uploadSingle.single('file'), adminController.postUpdateNew);
router.get('/admin/noticias/:id/previsualizar', passportConfig.isAuthenticated, accessConfig.isAdmin, postController.getPreview);
router.get('/admin/noticias/:id/visible', passportConfig.isAuthenticated, accessConfig.isAdmin, postController.setVisible);
router.get('/admin/usuarios/exportar', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getExport);
router.get('/admin/publicidad/editar', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getUpdatePublicity);
router.post('/admin/publicidad/editar', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.postUpdatePublicity);
// FREQUENT QUESTIONS
router.get('/admin/preguntas-frecuentes', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.listFrequentQuestions);
router.get('/admin/preguntas-frecuentes/obtener', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getFrequentQuestions);
router.get('/admin/preguntas-frecuentes/categorias/obtener', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getQuestionsCategories);
router.get('/admin/preguntas-frecuentes/crear', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.createFrequentQuestions);
router.post('/admin/preguntas-frecuentes/crear', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.postCreateFrequentQuestions);
router.get('/admin/preguntas-frecuentes/:id/editar', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.updateFrequentQuestions);
router.post('/admin/preguntas-frecuentes/:id/editar', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.postUpdateFrequentQuestions);
router.post('/admin/preguntas-frecuentes/:id/editar-orden', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.postUpdateorderFrequentQuestions);
router.delete('/admin/preguntas-frecuentes/:id/eliminar', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.deleteUpdateFrequentQuestions);

router.get('/admin/tipo-cambio', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.getExchangeRate);
router.post('/admin/tipo-cambio', passportConfig.isAuthenticated, accessConfig.isAdmin, adminController.postUpdateExchangeRate);

router.get('/admin/materiales', passportConfig.isAuthenticated, accessConfig.isAdminCoti, adminController.getMaterials);
router.post('/admin/materiales', passportConfig.isAuthenticated, accessConfig.isAdminCoti, upload.single('materialsExcel'), adminController.postMaterials);
router.get('/admin/cotizaciones', passportConfig.isAuthenticated, accessConfig.isAdminCoti, adminController.getQuotes);

router.get('/admin/nextQuotes', passportConfig.isAuthenticated, accessConfig.isAdminCoti, adminController.getNextQuotes);
router.get('/admin/cotizacion/:id', passportConfig.isAuthenticated, accessConfig.isAdminCoti, adminController.getQuoteDetail);

router.get('/admin/cotizaciones/exportar', passportConfig.isAuthenticated, accessConfig.isAdminCoti, adminController.exportQuotes);

/**
 * Request routes.
 */
router.get('/noticias', passportConfig.isAuthenticated, postController.getNews);
router.get('/noticias/:id', passportConfig.isAuthenticated, postController.getPreview);
router.get('/nextNews', passportConfig.isAuthenticated, postController.getNextNews);
/**
 * Request routes.
 */
// router.get('/consultas', passportConfig.isAuthenticated, userController.getAllRequets);
router.get('/nextRequests', passportConfig.isAuthenticated, userController.getNextRequests);

// router.get('/consulta/:requestId', passportConfig.isAuthenticated, requestController.getRequestDetail);
// router.post('/consulta/:requestId', passportConfig.isAuthenticated, uploadSingle.single('file'), requestController.postRequestDetail);

// router.get('/consultas/crear', passportConfig.isAuthenticated, userController.getCreateRequest);
// router.post('/consultas/crear', passportConfig.isAuthenticated, uploadSingle.single('file'), userController.postCreateRequest);

/**
 * Project routes.
 */
// router.get('/inmuebles', passportConfig.isAuthenticated, userController.getInmuebles);
// router.get('/estadocuenta', passportConfig.isAuthenticated, userController.getEstadoCuenta);
// router.get('/proximos-pagos', passportConfig.isAuthenticated, userController.getAllOtherPayments);
// router.get('/ultimoPago', passportConfig.isAuthenticated, userController.getLastPayment);
// router.post('/crearCip', passportConfig.isAuthenticated, userController.postCreateCIP);
// router.get('/reciente-pago-pendiente', passportConfig.isAuthenticated, userController.getClosestPayment);

/**
 * References routes.
 */
// router.get('/referir', passportConfig.isAuthenticated, isMenorcaClient, referredController.getRefer);
// router.post('/referir', passportConfig.isAuthenticated, isMenorcaClient, referredController.postRefer);

// router.get('/referidos', passportConfig.isAuthenticated, isMenorcaClient, referredController.getReferences);
// router.get('/referido/detalles/:referredId', passportConfig.isAuthenticated, isMenorcaClient, referredController.getReferredDetails);
/**
 * Quote routes.
 */
router.get('/nextQuotes', passportConfig.isAuthenticated, isMenorcaClient, quoteController.getNextQuotes);
router.get('/cotizaciones', passportConfig.isAuthenticated, isMenorcaClient, quoteController.getQuotes);
router.get('/cotizacion/:id', passportConfig.isAuthenticated, isMenorcaClient, quoteController.getQuoteDetail);
// , passportConfig.isAuthenticated, isMenorcaClient
//router.get('/cotizacion/:id/enviar', quoteController.sendQuoteDetail);
router.get('/cotizacion/:id/descargar', passportConfig.isAuthenticated, isMenorcaClient, quoteController.downloadQuoteDetail);
router.get('/cotizacion/:id/comenzar', passportConfig.isAuthenticated, isMenorcaClient, quoteController.getChangeQuoteStatus);

router.get('/cotizador', passportConfig.isAuthenticated, isMenorcaClient, quoteController.getQuote);
router.post('/cotizador', passportConfig.isAuthenticated, isMenorcaClient, quoteController.postQuote);
router.get('/getQuote', passportConfig.isAuthenticated, isMenorcaClient, quoteController.getProjectQuote);
/**
 * Secretary examples routes.
 */

/**
 * API examples routes.
 */
router.get('/mapa/banco', passportConfig.isAuthenticated, mapsController.getBanksMap);

/**
 * API examples routes.
 */
router.get('/api/getSubCategories/:id', apiController.getSubCategories);

module.exports = router;