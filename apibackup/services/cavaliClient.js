const axios = require('axios');
const moment = require("moment");
const https = require('https');

const { SperantV3 } = require('../services/sperant')
const Sperant = new SperantV3()

const cavali = axios.create({
  baseURL: 'https://digitall.canvia.com:8090/letsoap/digitall-soap/remote',
  headers: {
    'Content-Type': 'text/xml',
  },
  auth: {
    username: 'soap_menorca',
    password: '1q2w3e4r'
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

exports.registroLetras = async (clientId, budgetId) => {
  let client;
  try {
    client = await Sperant.getClientById(clientId);
  } catch (error) {
    if (error.response.status != 200) throw new Error("Cliente no encontrado.");

    throw new Error(`SperantServiceError: ${error.response.data.error}`);
  }

  let budget;
  try {
    budget = await Sperant.getBudgetById(budgetId);
  } catch (error) {
    if (error.response.status != 200) throw new Error("Proforma no encontrada.");

    throw new Error(`SperantServiceError: ${error.response.data.error}`);
  }

  let clientBudgets = [];
  try {
    clientBudgets = await Sperant.getClientActiveBudgets(clientId);
  } catch (error) {
    if (error.response.status == 404) throw new Error("Budgets no encontrados.");

    throw new Error(`SperantServiceError: ${error.response.data.error}`);
  }

  const matchBudget = clientBudgets.find((el) => el.id == budgetId)
  if ( !matchBudget ) throw new Error("La proforma no corresponde al cliente indicado.")

  let project;
  try {
    project = await Sperant.getProjectById(matchBudget.projectId);
  } catch (error) {
    if (error.response.status != 200) throw new Error("Projecto no encontrado.");

    throw new Error(`SperantServiceError: ${error.response.data.error}`);
  }

  const { payments: unfilteredPayments } = await Sperant.getBudgetPayments(budget.code, project.projectType)
  let payments = []
  for (const unfilteredPayment of unfilteredPayments) {
    if ( unfilteredPayment.active == true ) {
      payments.push(unfilteredPayment)
    }
  }

  if( payments.length === 0 ) throw new Error("No existen letras activas en el Proyecto.");

  let aval = ''
  let representers = ''
  let listaAceptante = ''
  let couple = ''
  let cotitulars = ''
  let listaLetra= ''

  if ( budget.representerId ) {
    const representer = await Sperant.getClientById(budget.representerId);
  
    representers = representers + `<listaRpteLegal>
    <tipoDocumento>${representer.documentType || ''}</tipoDocumento>
    <numeroDocumento>${representer.document || ''}</numeroDocumento>
    <nombres>${representer.firstName || ''}</nombres>
    <apellidos>${representer.lastName || ''}</apellidos>
    <correoElectronico>${representer.email}</correoElectronico>
    </listaRpteLegal>
    `
  }

  if( client.id ) {
    const doc = client.document;
    
    const couple = await Sperant.getClientById(client.id);

    if ( doc != couple.document ) {
      couple = couple + `<listaAceptante>
    <tipoDocumento>${couple.documentType || ''}</tipoDocumento>
    <numeroDocumento>${couple.document || ''}</numeroDocumento>
    <nombres>${couple.firstName || ''}</nombres>
    <apellidos>${couple.lastName || ''}</apellidos>
    <domicilio>${couple.address ||''}</domicilio>
    <localidad>${couple.country || '' + '-' + couple.state || ''}</localidad>
    <correoElectronico>${couple.email || ''}</correoElectronico>
    <telefonoCasa>${couple.mainTelephone || ''}</telefonoCasa>
    <telefonoCelular>${couple.phone}</telefonoCelular>
    </listaAceptante>
    `
    }
  }

  const titulars = await Sperant.getTitulars(budget.id, client.id);

  if (titulars.length > 0) {
    for (const titular of titulars) {
      cotitulars = cotitulars + `<listaAceptante>>
    <tipoDocumento>${titular.documentType || ''}</tipoDocumento>
    <numeroDocumento>${titular.document || ''}</numeroDocumento>
    <nombres>${titular.firstName || ''}</nombres>
    <apellidos>${titular.lastName || ''}</apellidos>
    <domicilio>${titular.address || ''}</domicilio>
    <localidad>${titular.country || '' + '-' + titular.state || ''}</localidad>
    <correoElectronico>${titular.email || ''}</correoElectronico>
    <telefonoCasa>${titular.mainTelephone || ''}</telefonoCasa>
    <telefonoCelular>${titular.phone}</telefonoCelular>
    </listaAceptante>>
    `
    }
  }

  if ( client.documentType == 'RUC' ) {
    aval = `
    <aval>
      <tipoDocumento>${client.documentType ||''}</tipoDocumento>
      <numeroDocumento>${client.document || ''}</numeroDocumento>
      <nombres>${client.firstName || ''}</nombres>
      <apellidos>${client.lastName || ''}</apellidos>
      <domicilio>${client.address || ''}</domicilio>
      <localidad>${client.country || '' + '-' + client.state || ''}</localidad>
      <correoElectronico>${client.email || ''}</correoElectronico>
      <!-- Optional -->
      ${representers}
    </aval>
  `

  listaAceptante =`
  <listaAceptante>
    <tipoDocumento>${client.documentType || ''}</tipoDocumento>
    <numeroDocumento>${client.document || ''}</numeroDocumento>
    <nombres>${client.firstName || ''}</nombres>
    <apellidos>${client.lastName || ''}</apellidos>
    <domicilio>${client.address||''}</domicilio>
    <localidad>${client.country || '' + '-' + client.state || ''}</localidad>
    <correoElectronico>${client.email || ''}</correoElectronico>
    <telefonoCasa>${client.mainTelephone||''}</telefonoCasa>
    <telefonoCelular>${client.phone}</telefonoCelular>
    ${representers}
  </listaAceptante>
    `
  } else {
    listaAceptante=`
    <listaAceptante>
      <tipoDocumento>${client.documentType || ''}</tipoDocumento>
      <numeroDocumento>${client.document || ''}</numeroDocumento>
      <nombres>${client.firstName || ''}</nombres>
      <apellidos>${client.lastName || ''}</apellidos>
      <domicilio>${client.address||''}</domicilio>
      <localidad>${client.country || '' + '-' + client.state || ''}</localidad>
      <correoElectronico>${client.email || ''}</correoElectronico>
      <telefonoCasa>${client.mainTelephone || ''}</telefonoCasa>
      <telefonoCelular>${client.phone}</telefonoCelular>
    </listaAceptante>
    ${couple}
    ${cotitulars}
    `
  }

  for (const payment of payments) {
    if (payment.code.includes('-')) {
      listaLetra = listaLetra + `<listaLetra>
      <numeroLetra>${payment.code || ''}</numeroLetra>
      <referenciaGirador>${payment.code.split("-")[0].trim() || ''}</referenciaGirador>
      <fechaGiro>${payment.depositAt ? moment(payment.depositAt * 1000).format('DD/MM/YYYY') : moment().format('DD/MM/YYYY')}</fechaGiro>
      <lugarGiro>${project.state || ''}</lugarGiro>
      <fechaVencimiento>${moment(payment.expiresAt * 1000).format('DD/MM/YYYY') || ''}</fechaVencimiento>
      <moneda>DOLARES</moneda>
      <importe>${payment.saldo || 0.00}</importe>
      <lugarPago>${project.state || ''}</lugarPago>
      <plaza>${project.state || ''}</plaza>
      <nombreProyecto>${project.name || ''}</nombreProyecto>
    </listaLetra>
    `
    }
  }

  const transactionData = `
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
          <registroLetras xmlns="http://remote.soap.digitall.canvia.com/">
            <!-- Optional -->
            <arg0 xmlns="">
              <!-- Optional -->
                ${client.documentType == 'RUC' ? aval : ''}
                  <clausulasEspeciales>(1) En caso de mora, esta Letra de Cambio generara las tasa de interes compensatorio y moratorio
                      más alta de la ley permite a su último Tenedor.
                      (2) El plazo de su vencimiento podrá ser prorrogado por el Tenedor, por el plazo que este señale, sin que sea necesaria
                      la intervención del obligado principal ni de los solidarios.
                      (3) Esta Letra de Cambio no requiere ser protestada por falta de pago.
                      (4) Su importe debe ser pagado solo en la misma moneda que exprese este titulo valor</clausulasEspeciales>
                  <codMensajeContingencia></codMensajeContingencia>
                  <codigoVenta>${budget.contractNum || ''}</codigoVenta>
                  <contingencia></contingencia>
                  ${listaAceptante || ''}
                  ${listaLetra || ''}
                  <!--Optional:-->
                  <numeroDocumentoGirador>20173223626</numeroDocumentoGirador>
                  <!--Optional:-->
                  <rucCuentaMatriz>20173223626</rucCuentaMatriz>
                  <!--Optional:-->
                  <rucTitular>20173223626</rucTitular>
                  <!--Optional:-->
                  <tipoDocumentoGirador>RUC</tipoDocumentoGirador>
                  <!--Optional:-->
                  <tipoRegistro>VENT</tipoRegistro>
            </arg0>
          </registroLetras>
        </Body>
      </Envelope>
    `

  // console.log(transactionData)
  // throw 'dev error'
  return await cavali.post('/operationWS?WSDL', transactionData)
}
