/**
 * Module dependencies.
 */
const express = require("express");
/**
 * Create Express server.
 */
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
const chalk = require("chalk");
const lusca = require("lusca");
const path = require("path");
const mongoose = require("mongoose");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

/**
 * Connect to MongoDB.
 */
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGODB_URI_PROD);
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/**
 * Express configuration.
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({
//   origin: 'https://ventana.menorca.pe'
// }));
app.use(
  cors({
    origin: "*",
  })
);
// app.options('*', cors());

app.set("host", process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0");
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const expressStatusMonitor = require("express-status-monitor");

app.use(expressStatusMonitor());

const compression = require("compression");

app.use(compression());

/* const sass = require('node-sass-middleware');
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
})); */

const morgan = require("morgan");

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    store: new MongoStore({
      url: process.env.MONGODB_URI_PROD,
      autoReconnect: true,
    }),
  })
);

const passport = require("passport");
// const passportConfig = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

const flash = require("express-flash");

app.use(flash());

app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.disable("x-powered-by");

app.use(async (req, res, next) => {
  const publicity = await Publicity.findOne({ disponible: 1 });
  res.locals.user = req.user;
  res.locals.pub = publicity;
  next();
});

app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (
    !req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)
  ) {
    req.session.returnTo = req.originalUrl;
  } else if (
    req.user &&
    (req.path === "/account" || req.path.match(/^\/api/))
  ) {
    req.session.returnTo = req.originalUrl;
  }
  next();
});

app.use(
  "/",
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);
// app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/chart.js/dist'), { maxAge: 31557600000 }));
// app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), { maxAge: 31557600000 }));
// app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }));
// app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));
// app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));

/**
 * PATH ANALYTICS Mws
 */

const pathAnalyticsMw = require("./middlewares/pathAnalytics.mw");

app.use(pathAnalyticsMw.saveVisitedPath);

/**
 * FIRST SERVER START MWs
 */

const serverStartMws = require("./middlewares/firstServerStart.mw");

app.use(serverStartMws.initQuestionsCategoryMw);

/**
 * APP ROUTES
 */
const routes = require("./routes");
require("./routes/routesAuth")(app);

app.use(routes);

/**
 * Error Handler.
 */
const errorHandler = require("errorhandler");
const Publicity = require("./models/Publicity");

if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Server Error");
  });
}

// CRON JOBS
require("./cronjobs");
// END OF CRON JOBS

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    `%s App is running at http://localhost:${app.get("port")} in %s mode`,
    chalk.green("✓"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
