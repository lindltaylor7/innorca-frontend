const userController = require('../controllers/user');
const requestController = require('../controllers/request');
const adminController = require('../controllers/admin');
const referredController = require('../controllers/reference');
const quotesController = require('../controllers/quote');
const contactController = require('../controllers/contact');
const dashboardController = require('../controllers/dashboard');
const postController = require('../controllers/post');
const analyticsController = require('../controllers/analytics');
const auth = require('../middlewares/auth');
const { uploadSingle } = require('../middlewares/s3-upload');
const { uploadS3 } = require('../middlewares/aws-s3-upload');
const WebhooksController = require('../api/webhooks/webhooks.controller');

module.exports = (app) => {
  // WEBHOOKS
  // app.post('/sperant/status-change', WebhooksController.changeStatus)
  app.post('/webhooks/sperant/ticket/status-change', WebhooksController.changeTicketStatus);
  app.post('/webhooks/sperant/referral/check-prize', WebhooksController.checkReferralPrize);

  // RUTAS DE PRUEBA PARA LOS USUARIOS CON ACCESO
  // app.get('/dashboard/users', usuariosController.list);
  app.get('/analytics', userController.getAnalytics);

  app.post('/signup', userController.postSignup);
  app.post('/resend-sms', userController.postResendSMS);
  app.get('/completar-registro/:token', userController.getVerifyAccount);

  app.post('/upload-manual', auth, userController.postUploadManual);

  // Mis Datos
  app.get('/login', userController.getLogin); /** * */
  app.post('/login', userController.postLoginM);
  app.post('/login-cellphone', userController.postLoginWithCellphone);
  app.get('/logout', userController.logout); /** ** */
  app.get('/forgot', userController.getForgot); /** ** */
  app.post('/forgot', userController.postForgot);
  app.get('/reset/:token', userController.getReset); /** ** */
  app.post('/reset/:token', userController.postReset);
  app.get('/signup', userController.getSignup);

  app.post('/verify-sms', userController.postVerifySMS);
  app.get('/verify-sms', userController.getVerifySMS);

  app.post('/create-password', userController.postCreatePasswordForAccount);
  app.post('/reset-password', userController.postResetPassword);
  app.post('/change-password', userController.postChangePassword);

  app.get('/account', auth, userController.getAccount);
  app.post('/account/profile', auth, userController.postUpdateProfile);

  // Gestión de Pagos
  app.get('/inmuebles', auth, userController.getInmuebles); // SI
  app.post('/last-three-pendings', auth, userController.postLastThreePendings); // SI
  app.post('/payment-history', auth, userController.getPaymentHistory); // SI
  app.post('/payment-status', auth, userController.getPaymentStatus); // SI
  app.post('/payment-information', auth, userController.getPaymentInformation); // SI
  app.post('/validar-deudas', auth, userController.getValidarDeudas); // SI
  app.post('/create-cips', auth, userController.postCreateCIPS); // SI
  app.post('/obtener-estado', userController.postEstadoNIF); // SI
  app.post('/obtener-unidades', userController.getUnits); // SI
  app.post('/obtener-total-budget-pendings', userController.getTotalPendingBudgets); // SI
  app.post('/obtener-file-descargar', userController.getFileToDownload); // SI
  app.post('/obtener-estado-propiedad-mi-resumen', userController.getEstadoPropiedadMiResumen); // SI
  app.post('/send-sms-cips', auth, userController.postSendCIPSMS);
  app.post('/verify-if-cip-exist', auth, userController.verifyCIP);

  app.get('/estadocuenta', auth, userController.getEstadoCuenta); // NO
  app.get('/reciente-pago-pendiente', userController.getClosestPayment); // NO
  app.get('/proximos-pagos', auth, userController.getAllOtherPayments); // NO

  // Atención al cliente
  // Estado de la solicitud
  app.post('/consultas', auth, requestController.getAllRequets);
  app.get('/nueva-solicitud', auth, requestController.renderCreateRequest);
  app.post('/consultas/crear', auth, uploadS3.single('file'), userController.postCreateRequest);
  app.get('/consulta/:requestId', auth, requestController.getRequestDetail);
  app.post('/consulta/:requestId', auth, uploadS3.single('file'), requestController.postRequestDetail);
  app.get('/status/:requestId', auth, requestController.getRequestStatus);
  app.post('/preguntas-frecuentes', auth, userController.getFrequentQuestions);

  // Notificaciones Push
  app.post('/save-playerid', auth, userController.postSaveOneSignalUserId);
  app.post('/send-notification', auth, userController.postSendNotification);
  app.get('/notificaciones', auth, userController.getListNotification);

  app.post('/notificacions-seen', auth, userController.postNotificationsSeen);

  // Referidos
  app.get('/referidos', auth, referredController.getReferences);
  app.post('/contactos', auth, contactController.createContact);
  app.post('/crear-contactos', auth, contactController.createContacts);
  app.get('/contactos', auth, contactController.getContacts);
  app.post('/actualizar-contacto', auth, contactController.updateContact);
  app.get('/contactos/:contactId', auth, contactController.getContactDetails);
  app.post('/referidos', auth, referredController.createReferrals);
  app.get('/referido/detalles/:referredId', auth, referredController.getReferredDetails);
  app.post('/referidos-bi', auth, referredController.getReferralsBI);
  app.get('/proyectos', auth, referredController.getProjects);
  app.get('/tipos-propiedad', auth, referredController.getProperties);
  app.post('/auth-google', auth, contactController.authGoogle);

  // Mis construcciones
  app.get('/cotizaciones', auth, quotesController.getQuotes);
  app.get('/cotizaciones/descargar', quotesController.downloadQuoteDetail);
  app.post('/guardar-cotizacion', auth, quotesController.postQuote);
  app.get('/cotizacion/:id/enviar', quotesController.sendQuoteDetail);
  app.post('/precio-habitacion', auth, quotesController.getProjectQuote);
  app.get('/cotizacion/:id/descargar', auth, quotesController.downloadQuoteDetail);
  app.get('/cotizacion/:id', auth, quotesController.getQuoteDetail);
  app.post('/unidad', auth, quotesController.getUnitSize);
  app.post('/counseling', auth, quotesController.postCounseling);
  app.post('/check-nif', auth, quotesController.postCheckNIF);

  // Mi resumen
  app.post('/dashboard/payment-information', auth, dashboardController.getPaymentInformation);
  app.post('/dashboard/payment-progress', auth, dashboardController.postPaymentProgress);
  app.get('/dashboard/news', auth, dashboardController.getNews);
  app.post('/dashboard/last-three-payments', auth, dashboardController.getLastThreePayments);
  app.post('/dashboard/last-three-tickets', auth, dashboardController.getTickets);
  app.get('/dashboard/referrals', auth, dashboardController.getReferences);

  // Noticias
  app.get('/noticias', postController.getNews);
  app.get('/noticias/:id', postController.getPreview);
  app.get('/nextNews', postController.getNextNews);

  // Preguntas frecuentes
  app.post('/t-preguntas-frecuentes', userController.getAllFrequentQuestions);
  app.post('/t-pregunta-frecuente/:id/rate', auth ,userController.rateQuestionAnswer);
  app.get('/question-categories', userController.getQuestionsCategories)

  // Analítica
  app.post('/events', auth, analyticsController.postRawData);
};
