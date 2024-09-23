const moment = require('moment');
const { SperantV3 } = require('../services/sperant');

const Sperant = new SperantV3();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const path = require('path');
const { CostExplorer } = require('aws-sdk');
const User = require('../models/User');
const Contact = require('../models/Contact');
/**
 * @method
 * @desc Crear contacto
 * @param {string} document document
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.createContact = async (req, res, next) => {
  try {
    const { body } = req;
    // await Sperant.getProjectById(body.payload.projectId);
    let contactExistence = '';
    if (body.payload.document !== '') {
      contactExistence = await Contact.findOne({
        document: body.payload.document,
      });
    } else {
      await Contact.create({
        contactId: body.payload.referencerId,
        firstName: body.payload.firstName,
        lastName: body.payload.lastName,
        //dni: '',
        documentType: '',
        document: '',
        email: body.payload.email,
        phone: body.payload.phone,
        projectId: body.payload.projectId,
        comments: body.payload.observation,
        propertyType: body.payload.propertyType,
        networkId: body.payload.networkId,
      });
    }

    if (contactExistence == null) {
      await Contact.create({
        contactId: body.payload.referencerId,
        firstName: body.payload.firstName,
        lastName: body.payload.lastName,
        //dni: body.payload.document,
        documentType: body.payload.documentType,
        document: body.payload.document,
        email: body.payload.email,
        phone: body.payload.phone,
        projectId: body.payload.projectId,
        comments: body.payload.observation,
        propertyType: body.payload.propertyType,
        networkId: body.payload.networkId,
      });
    }

    return res.status(200).json({
      success: true,
    });

    // return res.status(200).json({
    //   success: false,
    //   message: 'El contacto ya existe',
    // });
  } catch (error) {
    if (error.response && error.response.data) console.log(error.response.data);

    next(error);
  }
};

/**
 * @method
 * @desc Crear múltiples contactos
 * @param {string} document document
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.createContacts = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    const userId = decoded.user_id;
    const { body } = req;
    let errors = {};

    const mapLoop = async () => {
      console.log('Start');

      const promises = body.payload.map(async (contact) => {
        const correo = contact.email;
        const celular = contact.phone;
        let existEmail;
        let existPhone;

        if (correo !== '' && correo !== undefined) {
          existEmail = await Contact.findOne({
            email: correo,
          });

          if (typeof existEmail === 'object' && existEmail !== null) {
            const error = { error: contact.name };
            errors = { ...errors, ...error };
          }
        }

        if (celular !== '' && celular !== undefined) {
          existPhone = await Contact.findOne({
            phone: celular,
          });
          if (typeof existPhone === 'object' && existPhone !== null) {
            const error = { error: contact.name };
            errors = { ...errors, ...error };
          }
        }

        if (
          (existEmail === null || existEmail === undefined)
          && (existPhone === null || existPhone === undefined)
        ) {
          console.log(correo, celular, contact.name);
          await Contact.create({
            contactId: userId,
            documentType: '',
            document: '',
            firstName: '',
            lastName: '',
            name: contact.name,
            email: correo,
            phone: celular,
            projectId: '',
            comments: '',
            propertyType: '',
            networkId: contact.networkId,
          });
        }

        return errors;
      });

      const allErrors = await Promise.all(promises);

      return res.status(200).json({
        success: true,
        errors: allErrors,
      });
    };

    mapLoop();
  } catch (error) {
    if (error.response && error.response.data) console.log(error.response.data);

    next(error);
  }
};

/**
 * @method
 * @desc Actualizar contacto
 * @param {string} document document
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.updateContact = async (req, res, next) => {
  try {
    const { body } = req;

    await Contact.findOneAndUpdate({ _id: body.payload.id },
      {
        firstName: body.payload.firstName,
        lastName: body.payload.lastName,
        //dni: body.payload.document,
        documentType: body.payload.documentType,
        document: body.payload.document,
        email: body.payload.email,
        phone: body.payload.phone,
        projectId: body.payload.projectId,
        comments: body.payload.observation,
        propertyType: body.payload.propertyType,
        networkId: body.payload.networkId,
      });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    if (error.response && error.response.data) console.log(error.response.data);

    next(error);
  }
};

/**
 * @method
 * @desc Obtener referidos
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getContacts = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    const userId = decoded.user_id;

    const filter = { contactId: userId };
    const contacts = await Contact.find(filter, {}).sort({ createdAt: -1 });
    const contactsFull = [];

    for (let i = 0; i < contacts.length; i++) {
      const { projectId, propertyType } = contacts[i];
      if (projectId !== '' && propertyType !== '') {
        const project = await Sperant.getProjectById(projectId);
        const property = await Sperant.getPropertyTypeById(propertyType);
        contactsFull.push([contacts[i], project, property]);
      } else {
        contactsFull.push([contacts[i]]);
      }
    }

    return res.status(200).json({
      success: true,
      data: contactsFull,
      moment,
    });
  } catch (error) {
    console.log(error);

    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @method
 * @desc Obtener detalle de contacto
 * @param {string} contactId contactId
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.getContactDetails = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId);

    return res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @method
 * @desc Autenticar web en google
 * @throws {Error} Error contiene un JSON con el parámetro de respuesta msg
 * @example { msg: "error message" }
 */
exports.authGoogle = async (req, res, next) => {
  try {
    let vUrl;

    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, 'ventanamenorca9476928734');
    const userId = decoded.user_id;
    const gCode = req.body.code;
    const filter = { _id: userId };
    const contacts = await User.findOne(filter, {}).sort({ createdAt: -1 });
    const SCOPES = ['https://www.googleapis.com/auth/contacts.readonly'];
    const respPageSize = 1000;
    const fullPersonArray = [];
    let authorize;
    let getNewToken;
    let listConnectionNames;
    let readContacts;
    let fetchPageData;
    let writePersonData;

    fs.readFile(path.resolve(__dirname, './credentials.json'),
      (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Tasks API.
        authorize(JSON.parse(content), listConnectionNames);
      });

    authorize = async (credentials, callback) => {
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(client_id,
        client_secret,
        redirect_uris[0]);

      //      console.log("contacts.googleToken", contacts.googleToken);

      // Check if we have previously stored a token.
      // if (contacts.googleToken !== undefined && Object.entries(contacts.googleToken).length !== 0) {
      //   console.log('llega aquí si existe');
      //   oAuth2Client.setCredentials(contacts.googleToken);
      //   callback(oAuth2Client);
      // } else {
      //   console.log('llega aquí token no existe');
      //   getNewToken(oAuth2Client, callback);
      // }

      // try {
      //   console.log("try");
      //   oAuth2Client.setCredentials(contacts.googleToken);
      //   callback(oAuth2Client);
      // } catch (error) {
      //   console.log("catch");
      //   console.error(error);
      //   getNewToken(oAuth2Client, callback);
      // }

      try {
        oAuth2Client.setCredentials(contacts.googleToken);
      } catch (err) {
        getNewToken(oAuth2Client, callback);
      }
      getNewToken(oAuth2Client, callback);
      callback(oAuth2Client);
    };

    getNewToken = (oAuth2Client, callback) => {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });

      vUrl = authUrl;

      // console.log("Authorize this app by visiting this url:", authUrl);

      if (gCode && gCode !== '' && gCode !== undefined && gCode !== null) {
        oAuth2Client.getToken(gCode, async (err, token) => {
          if (err) return console.error('Error retrieving access token', err);
          oAuth2Client.setCredentials(token);
          // console.log("token from google", token);

          await User.findOneAndUpdate({ _id: userId },
            {
              googleToken: token,
            });

          // console.log("Token stored to BD mongo");
          callback(oAuth2Client);
        });
      }
    };

    listConnectionNames = (auth) => {
      const service = google.people({ version: 'v1', auth });
      readContacts(service);
    };

    readContacts = (service, nxtToken = null) => {
      // console.log("service", service);
      fetchPageData(service, nxtToken, (data) => {
        // console.log("data.connections", data.connections);
        const { connections } = data;

        connections.forEach((person) => {
          fullPersonArray.push(person);
          /*
            if (person.names && person.names.length > 0) {
              var phone_nr = "";
              if(person.phoneNumbers!= undefined){
                phone_nr = person.phoneNumbers[0].value
              }
              console.log("Name: "+person.names[0].displayName+" Phone: "+phone_nr);
            } else {
              console.log('No display name found for connection.');
            }
            */
        });

        nxtToken = data.nextPageToken;
        // console.log(`Next Page Token: ${nxtToken}`);

        if (nxtToken !== undefined) {
          // THIS IS THE LOOP FOR PAGINATION
          readContacts(service, nxtToken);
        } else {
          // ALL DATA FETCHED NOW IT'S TIME TO WRITE
          writePersonData();
        }
      });
    };

    fetchPageData = (service, page_token, callback) => {
      service.people.connections.list({
        resourceName: 'people/me',
        pageSize: respPageSize,
        pageToken: page_token,
        personFields: 'names,emailAddresses,phoneNumbers',
      },
      (err, resp) => {
        // if (err) {

        // }

        try {
          const { connections } = resp.data;
          next_page_token = resp.data.nextPageToken;

          if (connections) {
            callback(resp.data);
          } else {
            console.log('No connections found.');

            res.status(200).json({
              success: true,
              people: fullPersonArray,
              url: '',
              saved: true,
            });
          }
        } catch (err) {
          // console.log("error de apiiiii", vUrl);
          // return console.error(`The API returned an error: ${err}`);
          if (gCode === '' || gCode === undefined) {
            return res.status(200).json({
              success: true,
              url: vUrl,
              moment,
            });
          }
        }
      });
    };

    writePersonData = () => {
      // if (Object.keys(contacts.googleToken).length !== 0) {
      //   console.log('fullPersonArray', fullPersonArray[0].phoneNumbers);
      res.status(200).json({
        success: true,
        people: fullPersonArray,
        url: '',
        saved: true,
      });
      // } else {
      //   res.status(200).json({
      //     success: true,
      //     people: {},
      //     url: '',
      //     saved: false,
      //   });
      // }
    };
  } catch (error) {
    console.log(error);

    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};
