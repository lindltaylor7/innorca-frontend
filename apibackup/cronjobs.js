const dotenv = require('dotenv');

dotenv.config();

// PACKAGES
const schedule = require('node-schedule');
const moment = require('moment');
const { summaryQuotes } = require('./mails/templates');
const { sendMails } = require('./mails/sendmails');
// END OF PACKAGES

// MODELS
const Quote = require('./models/Quote');
require('./models/User');
// END OF MODELS

let jobs = [];

switch (process.env.NODE_ENV) {
  case 'development':
    // jobs = ['alerta_quotes_diaria'];
    break;

  case 'test':
    break;

  default:
    jobs = ['alerta_quotes_diaria'];
}

if (jobs.includes('alerta_quotes_diaria')) {
  // RECURSO ONLINE: https://crontab.guru/
  const oneAlert = new schedule.RecurrenceRule();
  oneAlert.rule = process.env.NODE_ENV == 'development' ? '*/1 * * * *' : '0 8 * * *';
  oneAlert.tz = 'America/Lima';

  schedule.scheduleJob(oneAlert, async () => {
    const today = moment().format('YYYY-MM-DD HH:mm:ss');

    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const yesterdayF = moment().subtract(1, 'days').format('DD/MM/YYYY');

    const quotes = await Quote.find({
      counseling: true,
      complete: {
        $eq: '1'
      },
      createdAt: {
        $gte: yesterday,
        $lte: today
      }
    }).populate('owner');

    const items = [];

    console.log('============================');
    console.log('today', today);
    console.log('yesterday', yesterday);
    console.log('quotes', quotes);
    console.log('============================');

    const processesAll = await quotes.map((quote, index) => {
      const contractDate = quote.contractStartDate ? moment(quote.contractStartDate).format('DD/MM/YYYY') : '---';
      const locationUnitArray = quote.codeUnit ? quote.codeUnit.split('-') : null;
      const propertyArea = quote.propertyArea ? parseFloat(quote.propertyArea) : '---';
      const propertyAreaMax = quote.propertyArea ? (propertyArea * 0.7).toFixed(2) : '---';

      const data = {
        quoteid: quote._id,
        username: quote.owner.profile.name,
        userdni: quote.owner.profile.document,
        userphone: quote.owner.profile.mainTelephone,
        useremail: quote.owner.email,
        projecttype: quote.projectType,
        startdate: quote.startDate,
        counseling: 'Sí',
        // withDebts: 'No',
        contractDate,
        quotesNumber: quote.quotesNumber ? quote.quotesNumber : '---',
        quoteQuantity: quote.quoteQuantity ? quote.quoteQuantity : '---',
        etapa: locationUnitArray ? locationUnitArray[1] : '---',
        mz: locationUnitArray ? locationUnitArray[2] : '---',
        lote: locationUnitArray ? locationUnitArray[3] : '---',
        propertyArea: (propertyArea !== '---' ? `${propertyArea}m2` : '---'),
        propertyAreaMax: (propertyAreaMax !== '---' ? `${propertyAreaMax}m2` : '---'),
        background: ((index + 1) % 2 == 0) ? '#FFFFFF' : '#ECF9F1',
        ambientes: []
      };

      quote.projects.map((project) => {
        const n = project.totalCostNumber;
        const descomposicion = n.toFixed(2).toString().split('.');
        const decimal = descomposicion[1];
        const numberFormatter = Intl.NumberFormat('es-PE');
        const formatted = numberFormatter.format(descomposicion[0]);

        data.ambientes.push({
          location: project.location,
          roomtype: project.roomType,
          anchoalto: `Largo: ${project.long}m / Ancho: ${project.width}m`,
          subtotal: `S/ ${`${formatted}.${decimal}`}`
        });
      });

      items.push(data);
    });

    await Promise.all(processesAll);

    console.log('============================');
    console.log('ITEMS', items);
    console.log('ITEMS LENGTH', items.length);
    console.log('============================');

    if (items.length) {
      // , 'foca12gt@gmail.com'
      // let emails = ['emilio@picnic.pe'];
      const emails = ['yenizzacabeza@progresissac.com', 'rreano@habitat.org', 'walter.castaneda@menorca.com.pe'];
      await sendMails(emails, 'Ventana Menorca - Listado de Cuotas', summaryQuotes(yesterdayF, items), 'CRONJOB', 'LISTADO DE CUOTAS', [], 'production');
    }

    console.log('¡Correos Enviados!');
  });
}
