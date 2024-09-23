const axios = require("axios");

const moment = require("moment");
const SperantService = require("./sperant.base");
const UtilsV3 = require("./sperantV3.utils");
const { ShortenedSperantClient, SperantClient } = require("./sperant.models");
const { ShortenedSperantProject, SperantProject } = require("./sperant.models");
const { SperantBudget } = require("./sperant.models");
const { SperantBank } = require("./sperant.models");
const { SperantUnit } = require("./sperant.models");
const { SperantPayment, SperantQuota } = require("./sperant.models");
const { SperantCIP } = require("./sperant.models");
const { SperantAttention, SperantTicket } = require("./sperant.models");

const { SperantException } = require("./sperant.exceptions");

const categoryAttentions = [
  {
    id: 12,
    name: "Casas-Observaciones",
  },

  {
    id: 13,
    name: "Lotes-Cancelación",
  },

  {
    id: 14,
    name: "Lotes-Cesión",
  },

  {
    id: 15,
    name: "Casas-Entrega",
  },

  {
    id: 16,
    name: "Lotes-Cheques",
  },

  {
    id: 17,
    name: "z_NO USAR-Entrega de contrato/compromiso",
  },

  {
    id: 19,
    name: "Lotes-Entrega",
  },

  {
    id: 20,
    name: "Lotes-Minutas",
  },

  {
    id: 21,
    name: "z_NO USAR-Lotes-Planos",
  },

  {
    id: 22,
    name: "HU-Urbanización",
  },

  {
    id: 23,
    name: "z_NO USAR-Lotes-Físico",
  },

  {
    id: 26,
    name: "Varios",
  },

  {
    id: 27,
    name: "Lotes-Recupero",
  },

  {
    id: 28,
    name: "Lotes-Refinanciamiento",
  },

  {
    id: 29,
    name: "Lotes-Resolución",
  },

  {
    id: 30,
    name: "Lotes-Reubicación",
  },

  {
    id: 31,
    name: "Lotes-Documentación",
  },

  {
    id: 32,
    name: "Lotes-Letras",
  },

  {
    id: 34,
    name: "Ventas",
  },

  {
    id: 35,
    name: "z_NO USAR-Lotes-Letras Devolución",
  },

  {
    id: 39,
    name: "Lotes-Cobranza",
  },

  {
    id: 41,
    name: "Lotes-construcción",
  },

  {
    id: 42,
    name: "Lotes-Reprogramación",
  },

  {
    id: 43,
    name: "z_NO USAR-Reprogramación Afirmativa Total",
  },

  {
    id: 44,
    name: "z_NO USAR-Reprogramación Negativa Total",
  },

  {
    id: 46,
    name: "Lotes-Pago Efectivo Letras",
  },

  {
    id: 48,
    name: "Casas-Garantía",
  },

  {
    id: 50,
    name: "Lotes - escritura pública",
  },

  {
    id: 51,
    name: "Lotes - resolución morosidad",
  },

  {
    id: 52,
    name: "Lotes-Resolución APC",
  },

  {
    id: 53,
    name: "Lotes-Cambio de Banco",
  },

  {
    id: 54,
    name: "Lotes-Recupero Por Morosidad",
  },

  {
    id: 55,
    name: "Lotes-Modificación De Datos",
  },

  {
    id: 56,
    name: "Lotes-Libro De Reclamaciones",
  },

  {
    id: 57,
    name: "Lotes-Notificación De Normas Convivencia",
  },

  {
    id: 58,
    name: "Lotes-Conversiones",
  },

  {
    id: 59,
    name: "Casas-Libro De Reclamaciones",
  },

  {
    id: 60,
    name: "Lotes - Consulta de deuda",
  },

  {
    id: 61,
    name: "Lotes - Estado de cuenta",
  },

  {
    id: 62,
    name: "Lotes - Información de Requisitos",
  },

  {
    id: 63,
    name: "Lotes- Habilitación de Agua",
  },

  {
    id: 64,
    name: "Lotes- Habilitación de Energía",
  },

  {
    id: 65,
    name: "Casas- Habilitación de Agua",
  },

  {
    id: 66,
    name: "Casas- Habilitación de Energía",
  },

  {
    id: 67,
    name: "Ventas-Tarjetas Referidos",
  },

  {
    id: 68,
    name: "Lotes-HR y PU",
  },

  {
    id: 69,
    name: "Lotes- Visita a Lote",
  },

  {
    id: 70,
    name: "Ventas-Entrega de Contrato",
  },

  {
    id: 71,
    name: "Ventas- Consulta de Ventas",
  },

  {
    id: 72,
    name: "Casas  Minutas",
  },

  {
    id: 73,
    name: "Casas  Escritura Pública",
  },

  {
    id: 74,
    name: "Casas  Desembolso",
  },

  {
    id: 75,
    name: "Lotes - Cambio de Dirección",
  },

  {
    id: 76,
    name: "Casas - Cambio de Dirección",
  },

  {
    id: 77,
    name: "Lotes - Incidencias de Construcción",
  },

  {
    id: 78,
    name: "Casas - Incidencias de Construcción",
  },
  {
    id: 85,
    name: "Adendas y cláusulas",
  },
];

const attentionTypes = [
  {
    id: 1,
    name: "Consulta",
    max_attention: 15,
    reminder_days: 3,
    color: "#f5B719",
  },
  {
    id: 2,
    name: "Reclamo/Queja",
    max_attention: 30,
    reminder_days: 3,
    color: "#f51919",
  },
  {
    id: 3,
    name: "Solicitud",
    max_attention: 7,
    reminder_days: 3,
    color: "#ff7519",
  },
  {
    id: 6,
    name: "Seguimiento",
    max_attention: 15,
    reminder_days: 3,
    color: "#9B00C7",
  },
];

/* const statusTickets = [
  {
    color: "#8e14b4",
    id: 1,
    name: "Registrado"
  },
  {
    color: "#F38400",
    id: 2,
    name: "En Proceso"
  },
  {
    color: "#00A617",
    id: 3,
    name: "Atendido"
  },
  {
    color: "#146EB4",
    id: 4,
    name: "Cerrado"
  }
]; */

const statusTickets = [
  {
    color: "#e8d0f0",
    secondaryColor: "#8e14b4",
    id: 1,
    name: "Registrado",
  },
  {
    color: "#fde6cc",
    secondaryColor: "#F38400",
    id: 2,
    name: "En Proceso",
  },
  {
    color: "#ccedd1",
    secondaryColor: "#00A617",
    id: 3,
    name: "Atendido",
  },
  {
    color: "#d0e2f0",
    secondaryColor: "#146EB4",
    id: 4,
    name: "Cerrado",
  },
];

const supervisors = [
  {
    email: "mirella.carrillo@menorca.com.pe",
    fname: "Mirella",
    id: 332,
    lname: "Carrillo Mosquera",
    username: "mirella.carrillo",
  },
  {
    email: "silvana.arauzo@menorca.com.pe",
    fname: "Silvana",
    id: 339,
    lname: "Arauzo Martinez",
    username: "sarauzom",
  },
  {
    email: "jesus.perez@menorca.com.pe",
    fname: "Jesus",
    id: 483,
    lname: "Perez Milachay",
    username: "jesus.perez",
  },
  {
    email: "moises.camones@menorca.com.pe",
    fname: "Moisés",
    id: 494,
    lname: "Camones Santiago",
    username: "moises.camones",
  },
  {
    email: "vanessa.urbano@menorca.com.pe",
    fname: "Vanessa",
    id: 476,
    lname: "Urbano Herrera",
    username: "vanessa.urbano",
  },
  {
    email: "nblas@menorca.com.pe",
    fname: "Norka",
    id: 5,
    lname: "Blas Landauro",
    phone: "991677088",
    username: "nblas",
  },
];

/**
 * @param {string} baseURL
 * @param {string} authorizationToken
 */
const createRequestClient = (baseURL, authorizationToken) =>
  axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: authorizationToken,
      "Cache-Control": "no-cache",
    },
  });

class SperantV3 extends SperantService {
  constructor() {
    super();
    this.baseURL = "https://api.sperant.com/v3";
    this.authorizationToken = "57prHU6Rz36bAjtPFm4JI3Lkf5jcKJB88jDCFdv9";
    // this.baseURL = "https://api.eterniasoft.com/v3/";
    // this.authorizationToken = "bvU2ROy7EbCkMfOa1Fhm2noKTIblYYt7AiCGwOv4";
    this.RequestClient = createRequestClient(
      this.baseURL,
      this.authorizationToken
    );
  }

  /**
   * @param {string} clientDocument
   */
  checkExistingClient = async (clientDocument) => {
    const { data: response } = await this.RequestClient.get(
      `/clients?q=${clientDocument}`
    );
    const sperantData = response.data;
    if (sperantData.length == 0) return false;

    return true;
  };

  /**
   * @param {string} clientDocument
   */
  getShortenedSperantClient = async (clientDocument) => {
    const { data: response } = await this.RequestClient.get(
      `/clients?q=${clientDocument}`
    );
    const sperantData = response.data;
    if (sperantData.length == 0) {
      throw new SperantException({
        message: "Este número de documento no pertenece a Sperant.",
      });
    }

    const shortenedClient = sperantData[0];

    const shortenedSperantClient = new ShortenedSperantClient({
      id: shortenedClient.attributes.id,
    });

    return shortenedSperantClient;
  };

  updateUser = async (clientId, secondaryTelephone, email, lng, lat) => {
    const putData = {
      extra_fields: {
        actividad_economica_de_la_empresa: "advertising",
        celular_respaldo: "955404014",
        correo_recuperacion: "tec@picnic.pe",
      },
    };

    const response = await this.RequestClient.put("/clients/143775", putData);
    const { data: sperantData } = response;

    // const client = sperantData

    return true;
  };

  postCreateAttentionNote = async (
    attentionId,
    message,
    creatorId,
    creatorType
  ) => {
    const postData = {
      message,
      creator_id: creatorId,
      creator_type: creatorType == 0 ? "User" : "Client",
    };
    const { data: response } = await this.RequestClient.post(
      `/attentions/${attentionId}/notes`,
      postData
    );
    const { data: sperantData } = response;
    return sperantData;
  };

  postUploadNoteFile = async (noteId, file) => {
    const createRequestClientFile = axios.create({
      baseURL: this.baseURL,
      headers: {
        ...file.getHeaders(),
        Authorization: this.authorizationToken,
      },
    });
    const { data: response } = await createRequestClientFile.post(
      `/notes/${noteId}/files`,
      file
    );
    const { data: sperantData } = response;
    return sperantData;
  };

  /**
   * @param {string} noteId
   */
  getListFilesNote = async (noteId) => {
    const { data: response } = await this.RequestClient.get(
      `/notes/${noteId}/files`
    );
    const { data: sperantData } = response;
    const sperantAttentionNotes = sperantData;

    return sperantAttentionNotes;
  };

  getClientByPhone = async (clientPhone) => {
    const { data: response } = await this.RequestClient.get(
      `/clients?q=%2B51${clientPhone}`
    );
    const sperantData = response.data;
    if (sperantData.length == 0) {
      return null;
    }

    const client = sperantData[0];

    const sperantClient = await this.getClientById(client.attributes.id);
    return sperantClient;
  };

  /**
   * @param {string} clientId
   */
  getClientById = async (clientId) => {
    const { data: response } = await this.RequestClient.get(
      `/clients/${clientId}`
    );
    const sperantData = response.data;

    const client = sperantData;

    const sperantClient = new SperantClient({
      id: client.attributes.id,
      firstName: client.attributes.fname,
      lastName: client.attributes.lname,
      documentType: client.attributes.document_type,
      document: client.attributes.document,
      phone: client.attributes.phone,
      mainTelephone: client.attributes.main_telephone,
      email: client.attributes.email,
      gender: client.attributes.gender,
      coupleId: client.attributes.couple_id,
      country: client.attributes.ubication.country,
      state: client.attributes.ubication.state,
      address: client.attributes.ubication.address,
    });

    return sperantClient;
  };

  /**
   * @param {string} clientId
   */
  getShortenedSperantProjects = async (clientId) => {
    let shortenedProjects = [];
    let actualPage = 1;
    let lastPage = null;

    do {
      const { data: response } = await this.RequestClient.get(
        `/clients/${clientId}/projects`
      );
      const { links: sperantLinks, data: sperantData } = response;

      shortenedProjects = shortenedProjects.concat(sperantData);

      lastPage =
        lastPage || Number(UtilsV3.getQueryParam(sperantLinks.last, "page"));
      actualPage++;
    } while (actualPage <= lastPage);

    const shortenedSperantProjects = [];
    for (const shortenedProject of shortenedProjects) {
      const shortenedSperantProject = new ShortenedSperantProject({
        id: shortenedProject.attributes.id,
        code: shortenedProject.attributes.code,
        name: shortenedProject.attributes.name,
      });

      shortenedSperantProjects.push(shortenedSperantProject);
    }

    return shortenedSperantProjects;
  };

  getLastThreeTickets = async (budgetId, sperantId, page) => {
    console.log(
      `/attentions?budget_id=${budgetId}&titular_id=${sperantId}&page=${page}&limit=3`
    );
    const { data: response } = await this.RequestClient.get(
      `/attentions?budget_id=${budgetId}&titular_id=${sperantId}&page=${page}&limit=3`
    );

    const tickets = [];

    for (const ticket of response.data) {
      const status = {};

      const statusCode = statusTickets.filter(
        (item) => item.id == ticket.attributes.status_attention_id
      );
      status.code = statusCode[0];

      const sperantTicket = new SperantTicket({
        id: ticket.attributes.id,
        detail: ticket.attributes.detail,
        status,
      });

      tickets.push(sperantTicket);
    }

    return {
      tickets,
    };
  };

  getTickets = async (budgetId, sperantId, page) => {
    console.log(
      `/attentions?budget_id=${budgetId}&titular_id=${sperantId}&page=${page}`
    );
    const { data: response } = await this.RequestClient.get(
      `/attentions?budget_id=${budgetId}&titular_id=${sperantId}&page=${page}`
    );

    let length = 0;
    const tickets = [];

    for (const ticket of response.data) {
      const status = {};

      /* status.attention = await this.getStatusById(
            ticket.attributes.status_attention_id
          ); */

      const statusCode = statusTickets.filter(
        (item) => item.id == ticket.attributes.status_attention_id
      );
      // console.log('statusCode', statusCode);
      status.code = statusCode[0];

      const category = await this.getCategoryAttentionById(
        ticket.attributes.category_attention_id
      );
      const type = await this.getAttentionTypeById(
        ticket.attributes.attention_type_id
      );

      // console.log('ticket', ticket)

      const sperantTicket = new SperantTicket({
        id: ticket.attributes.id,
        code: ticket.attributes.code,
        detail: ticket.attributes.detail,
        // project: projectName,
        date: moment.unix(ticket.attributes.created_at).format("DD/MM/YYYY"),
        category,
        type,
        status,
      });

      tickets.push(sperantTicket);
      length++;
    }

    return {
      tickets,
      length,
    };
  };

  getStatusById = async (statusId) => {
    let requestStatus;

    switch (statusId) {
      case 0:
        requestStatus = "Sin responder";
        break;
      case 1:
        requestStatus = "Registrado";
        break;
      case 2:
        requestStatus = "En Proceso";
        break;
      case 3:
        requestStatus = "Atendido";
        break;
      case 4:
        requestStatus = "Cerrado";
        break;
      default:
        requestStatus = "-";
        break;
    }

    return requestStatus;
  };

  /**
   * @param {ShortenedSperantProject[]} shortenedSperantProjects
   */
  getProjectsByIds = async (shortenedSperantProjects) => {
    const sperantProjects = [];
    for (const shortenedSperantProject of shortenedSperantProjects) {
      const sperantProject = await this.getProjectById(
        `${shortenedSperantProject.id}`
      );
      sperantProjects.push(sperantProject);
    }

    return sperantProjects;
  };

  /**
   * @param {string} clientDocument
   */
  getClientByDocument = async (clientDocument) => {
    const shortenedSperantClient = await this.getShortenedSperantClient(
      clientDocument
    );
    const sperantClient = await this.getClientById(shortenedSperantClient.id);

    return sperantClient;
  };

  getAllProjects = async () => {
    let shortenedProjects = [];
    let actualPage = 1;
    let lastPage = null;

    do {
      const { data: response } = await this.RequestClient.get(
        `/projects?page=${actualPage}`
      );
      const { links: sperantLinks, data: sperantData } = response;

      shortenedProjects = shortenedProjects.concat(sperantData);

      lastPage =
        lastPage || Number(UtilsV3.getQueryParam(sperantLinks.last, "page"));
      actualPage++;
    } while (actualPage <= lastPage);

    const shortenedSperantProjects = [];
    for (const shortenedProject of shortenedProjects) {
      const shortenedSperantProject = new ShortenedSperantProject({
        id: shortenedProject.attributes.id,
        code: shortenedProject.attributes.code,
        name: shortenedProject.attributes.name,
      });

      shortenedSperantProjects.push(shortenedSperantProject);
    }

    return shortenedSperantProjects;
  };

  /**
   * @param {string} projectId
   */
  getProjectById = async (projectId) => {
    const { data: response } = await this.RequestClient.get(
      `/projects/${projectId}`
    );
    const { data: sperantData } = response;

    const project = sperantData;

    const sperantProject = new SperantProject({
      id: project.attributes.id,
      code: project.attributes.code,
      name: project.attributes.name,
      projectType: project.attributes.project_type,
      propertyType: project.attributes.property_type,
      country: project.attributes.ubication.country,
      state: project.attributes.ubication.state,
      address: project.attributes.ubication.address,
    });

    return sperantProject;
  };

  getCategoryAttentionById = async (projectId) => {
    const categoryAttentions2 = await this.getCategoryAttentions();
    const projectItem = categoryAttentions2.filter((i) => i.id == projectId);
    return projectItem[0].attributes.name;
    // console.log("PROJECT ITEM ======>>>", projectItem[0].attributes.name);

    // const project = categoryAttentions.filter((i) => i.id == projectId);

    // return project[0].name;
  };

  getAttentionTypeById = async (projectId) => {
    const attentionTypes2 = await this.getTypeAttentionsById(projectId);

    //const projectItem = attentionTypes2.filter((i) => i.id == projectId);
    return attentionTypes2;

    // const project = attentionTypes.filter((i) => i.id == projectId);

    // return project[0].name;
  };

  /**
   * @param {string} clientId
   */
  getClientProjects = async (clientId) => {
    const shortenedSperantProjects = await this.getShortenedSperantProjects(
      clientId
    );
    const sperantProjects = await this.getProjectsByIds(
      shortenedSperantProjects
    );

    return sperantProjects;
  };

  /**
   * @param {string} budgetId
   */
  getBudgetById = async (budgetId) => {
    const { data: response } = await this.RequestClient.get(
      `/budgets/${budgetId}`
    );
    const sperantData = response.data;

    const budget = sperantData;

    const sperantBudget = new SperantBudget({
      id: budget.attributes.id,
      code: budget.attributes.code,
      projectId: budget.attributes.project_id,
      contractNum: budget.attributes.contract_num,
      active: budget.attributes.active,
      representerId: budget.attributes.representer_id,
    });

    return sperantBudget;
  };

  /**
   * @param {string} budgetCode
   */
  getBudgetByCode = async (budgetCode) => {
    const { data: response } = await this.RequestClient.get(
      `/budgets?q=${budgetCode}`
    );
    const [sperantData] = response.data;

    if (!sperantData) {
      new SperantException({ message: "Proforma no encontrada." });
    }

    const budget = sperantData;

    const sperantBudget = new SperantBudget({
      id: budget.attributes.id,
      code: budget.attributes.code,
      projectId: budget.attributes.project_id,
      contractNum: budget.attributes.contract_num,
      active: budget.attributes.active,
      representerId: budget.attributes.representer_id,
    });

    return sperantBudget;
  };

  addUnitCode = async (budgets) => {
    const sperantBudgets = [];

    for (const budget of budgets) {
      const { data: response } = await this.RequestClient.get(
        `budgets/${budget.id}/units`
      );

      // console.log('response budget------', response);

      budget.unitCode = response.data[0].attributes.code;

      const uCode = budget.unitCode.split("-");
      budget.etapa = uCode[1];
      budget.manzana = uCode[2];
      budget.lote = uCode[3];

      sperantBudgets.push(budget);
    }

    return sperantBudgets;
  };

  /**
   * @param {string} clientId
   */
  getClientActiveBudgets = async (clientId) => {
    let budgets = [];
    let actualPage = 1;
    let lastPage = null;
    do {
      console.log(
        `/clients/${clientId}/budget_process_active?page=${actualPage}`
      );
      const { data: response } = await this.RequestClient.get(
        `/clients/${clientId}/budget_process_active?page=${actualPage}`
      );

      const { links: sperantLinks, data: sperantData } = response;

      budgets = budgets.concat(sperantData);

      lastPage =
        lastPage || Number(UtilsV3.getQueryParam(sperantLinks.last, "page"));
      actualPage++;
    } while (actualPage <= lastPage);

    const sperantBudgets = [];
    for (const budget of budgets) {
      const sperantBudget = new SperantBudget({
        id: budget.attributes.id,
        code: budget.attributes.code,
        projectId: budget.attributes.project_id,
        contractNum: budget.attributes.contract_num,
        active: budget.attributes.active,
        representerId: budget.attributes.representer_id,
        created_at: moment
          .unix(budget.attributes.created_at)
          .format("YYYY-MM-DD HH:mm:ss"),
        funding_type: budget.attributes.funding_type,
        expire_date: moment
          .unix(budget.attributes.expire_date)
          .format("YYYY-MM-DD HH:mm:ss"),
      });

      sperantBudgets.push(sperantBudget);
    }

    return sperantBudgets;
  };

  /**
   * @param {string} bankId
   */
  getBank = async (bankId) => {
    if (!bankId) return undefined;

    const { data: response } = await this.RequestClient.get(
      `/ubications/${bankId}`
    );
    const { data: sperantData } = response;

    const bank = sperantData;

    const sperantBank = new SperantBank({
      id: bank.attributes.id,
      code: bank.attributes.bank_code,
      name: bank.attributes.bank_name,
      icon: UtilsV3.getBankIcon(bank.attributes.bank_code),
      mapLink: UtilsV3.getBankLink(bank.attributes.bank_name),
      manualLink: UtilsV3.getBankManual(bank.attributes.bank_code),
    });

    return sperantBank;
  };

  getBanks = async () => {
    let banks = [];
    let actualPage = 1;
    let lastPage = null;
    do {
      const { data: response } = await this.RequestClient.get(
        `/ubications?page=${actualPage}`
      );
      const { links: sperantLinks, data: sperantData } = response;

      banks = banks.concat(sperantData);

      lastPage =
        lastPage || Number(UtilsV3.getQueryParam(sperantLinks.last, "page"));
      actualPage++;
    } while (actualPage <= lastPage);

    const sperantBanks = [];
    for (const bank of banks) {
      const sperantBank = new SperantBank({
        id: bank.attributes.id,
        code: bank.attributes.bank_code,
        name: bank.attributes.bank_name,
        icon: UtilsV3.getBankIcon(bank.attributes.bank_code),
        mapLink: UtilsV3.getBankLink(bank.attributes.bank_name),
        manualLink: UtilsV3.getBankManual(bank.attributes.bank_code),
      });

      sperantBanks.push(sperantBank);
    }

    return sperantBanks;
  };

  getNextPendingBudget = async (budgetCode, projectType) => {
    // 1. Obtener todos los budgetPayments(cuotas) pending
    // 2. Comparar la fecha de cada uno con la fecha actual (menor a la actual)
    // 3. Sumar todas las cuotas vencidas (pending) y enviar obj deuda vencida = { 'valor': $601.25, 'cuotas': 2 cuotas }

    const isLots = !projectType || projectType == "Lotes";
    // const paymentType = isLots ? 'quotas' : 'payments'
    const paymentSchedule = isLots ? "Financiero" : "Hipotecario";
    const currency = isLots ? "USD" : "PEN";
    const formatCurrency = UtilsV3.numberToCurrency(currency);

    const options = {
      page: 1,
      limit: -1,
    };

    const payments = [];
    let actualPage = options.page || 1;
    let lastPage = null;

    let totalSaldo = 0;
    let nextPaymentBank = "";
    let counter = 0;
    let nextQuote = 0;

    if (budgetCode) {
      do {
        const { data: response } = await this.RequestClient.get(
          `/quotas?budget_code=${budgetCode}&status=pending&page=${actualPage}`
        );
        const { links: sperantLinks, data: sperantData } = response;

        if (response.data.length == 0) {
          const { data: response } = await this.RequestClient.get(
            `/payments?budget_code=${budgetCode}&status=pending&page=${actualPage}`
          );
          const { links: sperantLinks, data: sperantData } = response;

          if (sperantData.length == 0) {
            const { data: response } = await this.RequestClient.get(
              `/payments?budget_code=${budgetCode}&status=completed&page=${actualPage}`
            );
            const { links: sperantLinks, data: sperantData } = response;
            nextPaymentBank = await this.getBank(
              sperantData[0].attributes.ubication_id
            );
          } else {
            nextPaymentBank = await this.getBank(
              sperantData[0].attributes.ubication_id
            );
          }

          for (const rawPayment of sperantData) {
            if (
              moment(
                UtilsV3.getFormattedExpiresAt(rawPayment),
                "DD/MM/YYYY"
              ).isAfter(moment())
            ) {
              totalSaldo = UtilsV3.Sum(totalSaldo, rawPayment.attributes.saldo);
              nextQuote = rawPayment.attributes.saldo;
              payments.push(rawPayment);
              counter++;

              if (counter == 1) {
                break;
              }
              // break
            }

            if (payments.length == options.limit) {
              hasReachLimit = true;
              break;
            }
          }

          lastPage =
            lastPage ||
            Number(UtilsV3.getQueryParam(sperantLinks.last, "page"));
          actualPage++;
          if (options.page) break;
          if (hasReachLimit) break;
        } else {
          if (sperantData.length == 0) {
            const { data: response } = await this.RequestClient.get(
              `/quotas?budget_code=${budgetCode}&status=completed&page=${actualPage}`
            );
            const { links: sperantLinks, data: sperantData } = response;
            nextPaymentBank = await this.getBank(
              sperantData[0].attributes.ubication_id
            );
          } else {
            nextPaymentBank = await this.getBank(
              sperantData[0].attributes.ubication_id
            );
          }

          for (const rawPayment of sperantData) {
            if (
              moment(
                UtilsV3.getFormattedExpiresAt(rawPayment),
                "DD/MM/YYYY"
              ).isAfter(moment())
            ) {
              totalSaldo = UtilsV3.Sum(totalSaldo, rawPayment.attributes.saldo);
              nextQuote = rawPayment.attributes.saldo;
              payments.push(rawPayment);
              counter++;

              if (counter == 2) {
                break;
              }
              // break
            }

            if (payments.length == options.limit) {
              hasReachLimit = true;
              break;
            }
          }

          lastPage =
            lastPage ||
            Number(UtilsV3.getQueryParam(sperantLinks.last, "page"));
          actualPage++;
          if (options.page) break;
          if (hasReachLimit) break;
        }
      } while (actualPage <= lastPage);

      const sperantPayments = [];
      for (const payment of payments) {
        let sperantPayment;
        const expiresAt = UtilsV3.getExpiresAt(payment);
        const depositAt = UtilsV3.getDepositAt(payment);

        console.log("payment.attributes.saldo", payment.attributes.saldo);

        if (payment.type == "quotas") {
          sperantPayment = new SperantQuota({
            id: payment.attributes.id,
            code: payment.attributes.code,
            tag: payment.attributes.tag,
            formattedTag: UtilsV3.formatPaymentTag(payment.attributes.tag),
            amount: payment.attributes.amount,
            formattedAmount: formatCurrency(payment.attributes.amount),
            discount: payment.attributes.discount,
            formattedDiscount: formatCurrency(payment.attributes.discount),
            saldo: payment.attributes.saldo,
            formattedSaldo: formatCurrency(payment.attributes.saldo),
            active: payment.attributes.active,
            status: UtilsV3.getPaymentStatus(
              expiresAt,
              payment.attributes.status
            ),
            expiresAt,
            formattedExpiresAt: UtilsV3.getFormattedExpiresAt(payment),
            depositAt,
            schedule: paymentSchedule,
            bankId: payment.attributes.ubication_id,
            bank: payment.bank,
            mora: payment.attributes.mora,
            formattedMora: formatCurrency(payment.attributes.mora),
            currency: UtilsV3.numberToCurrency(currency),
          });
        } else {
          sperantPayment = new SperantPayment({
            id: payment.attributes.id,
            name: payment.attributes.name,
            tag: payment.attributes.tag,
            formattedTag: payment.attributes.tag,
            amountPaid: payment.attributes.amount_paid,
            formattedAmountPaid: formatCurrency(payment.attributes.amount_paid),
            saldo: payment.attributes.saldo,
            formattedSaldo: formatCurrency(payment.attributes.saldo),
            active: true,
            status: UtilsV3.getPaymentStatus(
              expiresAt,
              payment.attributes.status
            ),
            expiresAt,
            formattedExpiresAt: UtilsV3.getFormattedExpiresAt(payment),
            depositAt,
            schedule: paymentSchedule,
            mora: payment.attributes.mora,
            formattedMora: formatCurrency(payment.attributes.mora),
            currency: UtilsV3.numberToCurrency(currency),
          });
        }

        if (sperantPayment.active) {
          sperantPayments.push(sperantPayment);
        }
      }

      return {
        // formattedSaldo: totalSaldo ? formatCurrency(totalSaldo) : '',
        formattedSaldo: nextQuote ? formatCurrency(nextQuote) : "",
        nextPaymentBank,
        formattedExpiresAt: sperantPayments[0]
          ? sperantPayments[0].formattedExpiresAt
          : "",
        payments: sperantPayments,
      };
    }
    return {
      formattedSaldo: "",
      formattedExpiresAt: "",
      payments: "",
    };
  };

  getPendingBudgets = async (budgetCode, projectType) => {
    // 1. Obtener todos los budgetPayments(cuotas) pending
    // 2. Comparar la fecha de cada uno con la fecha actual (menor a la actual)
    // 3. Sumar todas las cuotas vencidas (pending) y enviar obj deuda vencida = { 'valor': $601.25, 'cuotas': 2 cuotas }

    const isLots = !projectType || projectType == "Lotes";
    // const paymentType = isLots ? 'quotas' : 'payments'
    const paymentSchedule = isLots ? "Financiero" : "Hipotecario";
    const currency = isLots ? "USD" : "PEN";
    const formatCurrency = UtilsV3.numberToCurrency(currency);

    const options = {
      page: 1,
      limit: -1,
    };

    const payments = [];
    let actualPage = options.page || 1;
    let lastPage = null;

    let totalSaldo = 0;
    let totalQuotas = 0;

    let nextPaymentBank = "";

    do {
      const { data: response } = await this.RequestClient.get(
        `/quotas?budget_code=${budgetCode}&status=pending&page=${actualPage}`
      );
      const { links: sperantLinks, data: sperantData } = response;

      if (response.data.length == 0) {
        console.log("enviar payments");

        const { data: response } = await this.RequestClient.get(
          `/payments?budget_code=${budgetCode}&status=pending&page=${actualPage}`
        );
        const { links: sperantLinks, data: sperantData } = response;

        if (sperantData.length == 0) {
          // console.log('entra aqui 1');
          const { data: response } = await this.RequestClient.get(
            `/payments?budget_code=${budgetCode}&status=completed&page=${actualPage}`
          );
          const { links: sperantLinks, data: sperantData } = response;

          // console.log('entra aqui 1.2', response);

          nextPaymentBank = await this.getBank(
            sperantData[0].attributes.ubication_id
          );
        } else {
          // console.log('entra aqui 2');
          nextPaymentBank = await this.getBank(
            sperantData[0].attributes.ubication_id
          );
        }

        for (const rawPayment of sperantData) {
          rawPayment.bank = nextPaymentBank;

          if (
            moment(
              UtilsV3.getFormattedExpiresAt(rawPayment),
              "DD/MM/YYYY"
            ).isBefore(moment())
          ) {
            totalSaldo = UtilsV3.Sum(totalSaldo, rawPayment.attributes.saldo);
            totalQuotas += 1;
            payments.push(rawPayment);
          } else if (
            moment(
              UtilsV3.getFormattedExpiresAt(rawPayment),
              "DD/MM/YYYY"
            ).isAfter(moment())
          ) {
            break;
          }

          if (payments.length == options.limit) {
            hasReachLimit = true;
            break;
          }
        }

        lastPage =
          lastPage || Number(UtilsV3.getQueryParam(sperantLinks.last, "page"));
        actualPage++;
        if (options.page) break;
        if (hasReachLimit) break;
      } else {
        if (sperantData.length == 0) {
          // console.log('entra aqui 1');
          const { data: response } = await this.RequestClient.get(
            `/quotas?budget_code=${budgetCode}&status=completed&page=${actualPage}`
          );
          const { links: sperantLinks, data: sperantData } = response;

          // console.log('entra aqui 1.2', response);

          nextPaymentBank = await this.getBank(
            sperantData[0].attributes.ubication_id
          );
        } else {
          // console.log('entra aqui 2');
          nextPaymentBank = await this.getBank(
            sperantData[0].attributes.ubication_id
          );
        }

        for (const rawPayment of sperantData) {
          rawPayment.bank = nextPaymentBank;

          if (
            moment(
              UtilsV3.getFormattedExpiresAt(rawPayment),
              "DD/MM/YYYY"
            ).isBefore(moment())
          ) {
            totalSaldo = UtilsV3.Sum(totalSaldo, rawPayment.attributes.saldo);
            totalQuotas += 1;
            payments.push(rawPayment);
          } else if (
            moment(
              UtilsV3.getFormattedExpiresAt(rawPayment),
              "DD/MM/YYYY"
            ).isAfter(moment())
          ) {
            break;
          }

          if (payments.length == options.limit) {
            hasReachLimit = true;
            break;
          }
        }

        lastPage =
          lastPage || Number(UtilsV3.getQueryParam(sperantLinks.last, "page"));
        actualPage++;
        if (options.page) break;
        if (hasReachLimit) break;
      }
    } while (actualPage <= lastPage);

    const sperantPayments = [];

    console.log("sperantPayments v2--------", sperantPayments);

    for (const payment of payments) {
      let sperantPayment;
      const expiresAt = UtilsV3.getExpiresAt(payment);
      const depositAt = UtilsV3.getDepositAt(payment);
      if (payment.type == "quotas") {
        sperantPayment = new SperantQuota({
          id: payment.attributes.id,
          code: payment.attributes.code,
          tag: payment.attributes.tag,
          formattedTag: UtilsV3.formatPaymentTag(payment.attributes.tag),
          amount: payment.attributes.amount,
          formattedAmount: formatCurrency(payment.attributes.amount),
          discount: payment.attributes.discount,
          formattedDiscount: formatCurrency(payment.attributes.discount),
          saldo: payment.attributes.saldo,
          formattedSaldo: formatCurrency(payment.attributes.saldo),
          active: payment.attributes.active,
          status: UtilsV3.getPaymentStatus(
            expiresAt,
            payment.attributes.status
          ),
          expiresAt,
          formattedExpiresAt: UtilsV3.getFormattedExpiresAt(payment),
          depositAt,
          schedule: paymentSchedule,
          bankId: payment.attributes.ubication_id,
          bank: payment.bank,
          mora: payment.attributes.mora,
        });
      } else {
        sperantPayment = new SperantPayment({
          id: payment.attributes.id,
          name: payment.attributes.name,
          tag: payment.attributes.tag,
          formattedTag: payment.attributes.tag,
          amountPaid: payment.attributes.amount_paid,
          formattedAmountPaid: formatCurrency(payment.attributes.amount_paid),
          saldo: payment.attributes.saldo,
          formattedSaldo: formatCurrency(payment.attributes.saldo),
          active: true,
          status: UtilsV3.getPaymentStatus(
            expiresAt,
            payment.attributes.status
          ),
          expiresAt,
          formattedExpiresAt: UtilsV3.getFormattedExpiresAt(payment),
          depositAt,
          schedule: paymentSchedule,
          mora: payment.attributes.mora,
        });
      }

      if (sperantPayment.active) {
        sperantPayments.push(sperantPayment);
      }
    }

    return {
      saldo: totalSaldo,
      nextPaymentBank,
      formattedSaldo: formatCurrency(totalSaldo),
      totalQuotas,
      nextPaymentBank,
      payments: sperantPayments,
    };
  };

  getPendingBudgetsCount = async (budgetCode) => {
    const response = await this.RequestClient.get(
      `/quotas?budget_code=${budgetCode}&status=pending&page=1`
    );

    return {
      total: response.data.meta.page.total,
    };
  };

  getBudgetPayment = async (paymentId) => {
    const currency = "USD";
    const formatCurrency = UtilsV3.numberToCurrency(currency);

    const payments = [];

    const { data: response } = await this.RequestClient.get(
      `/quotas/${paymentId}`
    );

    payments.push(response);

    /* return {
        data: payments
      } */

    const sperantPayments = [];
    for (let payment of payments) {
      payment = payment.data;

      let sperantPayment;
      const expiresAt = UtilsV3.getExpiresAt(payment);
      const depositAt = UtilsV3.getDepositAt(payment);
      if (payment.type == "quotas") {
        sperantPayment = new SperantQuota({
          id: payment.attributes.id,
          code: payment.attributes.code,
          tag: payment.attributes.tag,
          formattedTag: UtilsV3.formatPaymentTag(payment.attributes.tag),
          amount: payment.attributes.amount,
          formattedAmount: formatCurrency(payment.attributes.amount),
          discount: payment.attributes.discount,
          formattedDiscount: formatCurrency(payment.attributes.discount),
          saldo: payment.attributes.saldo,
          formattedSaldo: formatCurrency(payment.attributes.saldo),
          active: payment.attributes.active,
          status: UtilsV3.getPaymentStatus(
            expiresAt,
            payment.attributes.status
          ),
          expiresAt,
          formattedExpiresAt: UtilsV3.getFormattedExpiresAt(payment),
          depositAt,
          bankId: payment.attributes.ubication_id,
        });
      } else {
        sperantPayment = new SperantPayment({
          id: payment.attributes.id,
          name: payment.attributes.name,
          tag: payment.attributes.tag,
          formattedTag: payment.attributes.tag,
          amountPaid: payment.attributes.amount_paid,
          formattedAmountPaid: formatCurrency(payment.attributes.amount_paid),
          saldo: payment.attributes.saldo,
          formattedSaldo: formatCurrency(payment.attributes.saldo),
          active: true,
          status: UtilsV3.getPaymentStatus(
            expiresAt,
            payment.attributes.status
          ),
          expiresAt,
          formattedExpiresAt: UtilsV3.getFormattedExpiresAt(payment),
          depositAt,
        });
      }

      if (sperantPayment.active) {
        sperantPayments.push(sperantPayment);
      }
    }

    const paymentValues = UtilsV3.computePaymentValues(sperantPayments);

    return {
      data: sperantPayments,
    };
  };

  /**
   * @param {string} budgetCode
   * @param {string} projectType
   * @param {{ status: string , page: number, limit: number }} options
   */
  getBudgetPayments = async (budgetCode, projectType, options = {}) => {
    let hasReachLimit = false;

    const isLots = !projectType || projectType == "Lotes";
    const paymentType = isLots ? "quotas" : "payments";
    const paymentSchedule = isLots ? "Financiero" : "Hipotecario";
    const currency = isLots ? "USD" : "PEN";
    const formatCurrency = UtilsV3.numberToCurrency(currency);

    const payments = [];
    let actualPage = options.page || 1;
    let lastPage = null;

    const { data: resp } = await this.RequestClient.get(
      `/quotas?budget_code=${budgetCode}&status=completed`
    );
    const { data: resp2 } = await this.RequestClient.get(
      `/quotas?budget_code=${budgetCode}&status=pending`
    );

    console.log(`/quotas?budget_code=${budgetCode}&status=completed`);
    console.log(`/quotas?budget_code=${budgetCode}&status=pending`);

    const completedQuotes = resp.meta.page.total;
    const pendingQuotes = resp2.meta.page.total;

    do {
      const queryParams = `?budget_code=${budgetCode}&status=${options.status}&page=${actualPage}`;
      const { data: response } = await this.RequestClient.get(
        `/${paymentType}${queryParams}`
      );
      console.log(`/${paymentType}${queryParams}`);

      const { links: sperantLinks, data: sperantData } = response;
      for (const rawPayment of sperantData) {
        payments.push(rawPayment);

        if (payments.length == options.limit) {
          hasReachLimit = true;
          break;
        }
      }

      lastPage =
        lastPage || Number(UtilsV3.getQueryParam(sperantLinks.last, "page"));
      actualPage++;
      if (options.page) break;
      if (hasReachLimit) break;
    } while (actualPage <= lastPage);

    const sperantPayments = [];
    for (const payment of payments) {
      let sperantPayment;
      const expiresAt = UtilsV3.getExpiresAt(payment);
      const depositAt = UtilsV3.getDepositAt(payment);
      if (payment.type == "quotas") {
        sperantPayment = new SperantQuota({
          id: payment.attributes.id,
          code: payment.attributes.code,
          tag: payment.attributes.tag,
          formattedTag: UtilsV3.formatPaymentTag(payment.attributes.tag),
          amount: payment.attributes.amount,
          formattedAmount: formatCurrency(payment.attributes.amount),
          discount: payment.attributes.discount,
          formattedDiscount: formatCurrency(payment.attributes.discount),
          saldo: payment.attributes.saldo,
          formattedSaldo: formatCurrency(payment.attributes.saldo),
          active: payment.attributes.active,
          status: UtilsV3.getPaymentStatus(
            expiresAt,
            payment.attributes.status
          ),
          expiresAt,
          formattedExpiresAt: UtilsV3.getFormattedExpiresAt(payment),
          depositAt,
          schedule: paymentSchedule,
          bankId: payment.attributes.ubication_id,
        });
      } else {
        sperantPayment = new SperantPayment({
          id: payment.attributes.id,
          name: payment.attributes.name,
          tag: payment.attributes.tag,
          formattedTag: payment.attributes.tag,
          amountPaid: payment.attributes.amount_paid,
          formattedAmountPaid: formatCurrency(payment.attributes.amount_paid),
          saldo: payment.attributes.saldo,
          formattedSaldo: formatCurrency(payment.attributes.saldo),
          active: true,
          status: UtilsV3.getPaymentStatus(
            expiresAt,
            payment.attributes.status
          ),
          expiresAt,
          formattedExpiresAt: UtilsV3.getFormattedExpiresAt(payment),
          depositAt,
          schedule: paymentSchedule,
        });
      }

      if (sperantPayment.active) {
        sperantPayments.push(sperantPayment);
      }
    }

    const paymentValues = UtilsV3.computePaymentValues(sperantPayments);

    return {
      payments: sperantPayments,
      pages: lastPage,
      completedQuotes,
      pendingQuotes,
      totalAmount: paymentValues.totalAmount,
      projectTotal: paymentValues.projectTotal,
      totalSaldo: paymentValues.totalSaldo,
      formattedProjectTotal: formatCurrency(paymentValues.projectTotal),
      formattedTotalAmount: formatCurrency(paymentValues.totalAmount),
      formattedTotalSaldo: formatCurrency(paymentValues.totalSaldo),
    };
  };

  getTitulars = async (budgetId, clientId) => {
    const { data: response } = await this.RequestClient.get(
      `/budgets/${budgetId}/titulars`
    );
    const { data: sperantData } = response;

    const titulars = sperantData;

    const sperantTitulars = [];

    for (const titular of titulars) {
      if (titular.attributes.id != clientId) {
        const sperantClient = await this.getClientById(titular.id);
        sperantTitulars.push(sperantClient);
      }
    }

    return sperantTitulars;
  };

  /**
   * @param {string} budgetId
   */
  getUnits = async (budgetId) => {
    const { data: response } = await this.RequestClient.get(
      `/budgets/${budgetId}/units`
    );
    const { data: sperantData } = response;

    const units = sperantData;

    const sperantUnits = [];

    for (const unit of units) {
      const sperantUnit = new SperantUnit({
        id: unit.id,
        code: unit.attributes.code,
        name: unit.attributes.name,
        commercialStatus: unit.attributes.commercial_status,
      });
      sperantUnits.push(sperantUnit);
    }

    return sperantUnits;
  };

  /**
   * @param {string} budgetId
   */
  getUnits2 = async (unitId) => {
    console.log("unitId", unitId);
    const { data: response } = await this.RequestClient.get(`/units/${unitId}`);
    const { data: sperantData } = response;
    const units = sperantData;
    return units;
    // const { data: sperantData } = response;

    // const units = sperantData;

    // let sperantUnits = [];

    // for (const unit of units) {
    //     const sperantUnit = new SperantUnit({
    //         id: unit.id,
    //         code: unit.attributes.code,
    //         name: unit.attributes.name,
    //         commercialStatus: unit.attributes.commercial_status,
    //         construction: unit.attributes.construction,
    //     });
    //     sperantUnits.push(sperantUnit);
    // }

    // return sperantUnits;
  };

  /**
   * @param {SperantBudget[]} budgets
   */
  getValidBudgets = async (budgets) => {
    const validBudgets = [];
    /** @type {SperantProject[]} */
    const projectsDictionary = [];

    for (const budget of budgets) {
      let project = projectsDictionary.find(
        (project) => project.id == budget.projectId
      );
      if (!project) {
        project = await this.getProjectById(budget.projectId);
      }

      if (project) {
        projectsDictionary.push(project);

        const units = await this.getUnits(budget.id);

        if (!units[0]) continue;
        const comercialStatus = units[0].commercialStatus;

        if (project.projectType == "Lotes") {
          if (
            comercialStatus != "entregado" &&
            comercialStatus != "proceso de entrega" &&
            comercialStatus != "vendido"
          ) {
            continue;
          }
        } else if (
          comercialStatus == "proceso de separación" ||
          comercialStatus == "separado"
        ) {
          continue;
        }

        const { payments } = await this.getBudgetPayments(
          budget.code,
          project.projectType,
          { page: 1 }
        );

        let hasPaidSignature = false;
        let hasSeparation = false;
        let hasPaidSeparation = false;
        for (const payment of payments) {
          if (
            payment.formattedTag.toLowerCase() == "firma de contrato" &&
            payment.status == "completed"
          ) {
            hasPaidSignature = true;
          }
          if (payment.formattedTag.toLowerCase() == "separación") {
            hasSeparation = true;
            if (payment.status == "completed") {
              hasPaidSeparation = true;
            }
          }
        }

        if (hasSeparation) {
          if (hasPaidSignature && hasPaidSeparation) {
            validBudgets.push({
              ...budget,
              project,
            });
          }
        } else if (hasPaidSignature) {
          validBudgets.push({
            ...budget,
            project,
          });
        }
      }
    }

    return validBudgets;
  };

  postReferredClient = async (
    firstName,
    lastName,
    email,
    projectId,
    phone,
    documentType,
    document,
    observation,
    dni_referidor
  ) => {
    const postData = {
      fname: firstName,
      email,
      input_channel_id: 21, // referido ventana menorca
      source_id: 3, // referidos
      interest_type_id: 3, // high
      lname: lastName,
      project_id: projectId,
      phone,
      document_type_id: documentType, // 1,
      document,
      observation: observation || "",
      extra_fields: {
        medio_captacion_dni_referidor2: dni_referidor,
      },
    };

    const { data: response } = await this.RequestClient.post(
      "/clients",
      postData
    );
    const { data: sperantData } = response;

    const client = sperantData;

    const sperantClient = new SperantClient({
      id: client.attributes.id,
      firstName: client.attributes.fname,
      lastName: client.attributes.lname,
      documentType: client.attributes.document_type,
      document: client.attributes.document,
      phone: client.attributes.phone,
      mainTelephone: client.attributes.main_telephone,
      email: client.attributes.email,
      gender: client.attributes.gender,
      coupleId: client.attributes.couple_id,
      country: client.attributes.ubication.country,
      state: client.attributes.ubication.state,
      address: client.attributes.ubication.address,
      inputChannel: client.attributes.input_channel,
      captationWay: client.attributes.captation_way,
    });

    return sperantClient;
  };

  postCreateCIP = async (
    paymentId,
    paymentType,
    saldo,
    exchange,
    currency,
    email
  ) => {
    const date = new Date().getTime();

    const postData = {
      code: `${paymentId}-${date}`,
      paymentId,
      paymentType,
      amount: saldo,
      amountExchanged: UtilsV3.Times(saldo, exchange),
      exchange,
      currency,
      email,
      agentId: 444,
      mora: 0,
    };

    const formatCurrency = UtilsV3.numberToCurrency(currency);

    const { data: response } = await this.RequestClient.post("/cips", postData);
    const { data: sperantData } = response;

    const cip = sperantData;

    const sperantCIP = new SperantCIP({
      id: cip.id,
      code: postData.code,
      paymentId: postData.paymentId,
      paymentType: postData.paymentType,
      type: cip.type,
      cip: cip.attributes.cip,
      cipUrl: cip.attributes.cip_url,
      payAmount: cip.attributes.pay_amount,
      formattedPayAmount: formatCurrency(cip.attributes.pay_amount),
      paymentIn: cip.attributes.payment_in,
      expiresAt: cip.attributes.expire_at,
      formattedExpiresAt: UtilsV3.formaPaymentstDate(
        cip.attributes.expire_at,
        true
      ),
    });

    return sperantCIP;
  };

  getCategoryAttentions = async () => {
    const { data: response } = await this.RequestClient.get(
      "/category_attentions"
    );
    const { data: sperantData } = response;

    const categoryAttentions = sperantData;

    return categoryAttentions;
  };

  getCategoryAttentionsById = async (id) => {
    const { data: response } = await this.RequestClient.get(
      `/category_attentions/${id}`
    );
    const { data: sperantData } = response;

    // console.log('categoryAttentionId', sperantData.attributes.name);
    const categoryAttentionId = sperantData.attributes.name;

    return categoryAttentionId;
  };

  getTypeAttentions = async () => {
    const { data: response } = await this.RequestClient.get("/attention_types");
    const { data: sperantData } = response;

    const typeAttentions = sperantData;

    return typeAttentions;
  };

  getTypeAttentionsById = async (id) => {
    const { data: response } = await this.RequestClient.get(
      `/attention_types/${id}`
    );
    const { data: sperantData } = response;

    const typeAttentionId = sperantData.attributes.name;

    return typeAttentionId;
  };

  verifyIfSameCategoryExists = async (
    categoryAttention,
    budgetId,
    sperantId
  ) => {
    let exists = false;
    const page = 1;

    const { data: response } = await this.RequestClient.get(
      `/attentions?budget_id=${budgetId}&titular_id=${sperantId}&page=${page}`
    );

    const { total } = response.meta.page;
    const totalPages = Math.ceil(total / 20);

    for (let i = 1; i <= totalPages; i++) {
      const { data: resp } = await this.RequestClient.get(
        `/attentions?budget_id=${budgetId}&titular_id=${sperantId}&page=${i}`
      );

      for (const ticket of resp.data) {
        if (categoryAttention.id == ticket.attributes.category_attention_id) {
          const statusCode = statusTickets.filter(
            (item) => item.id == ticket.attributes.status_attention_id
          );

          console.log("statusCode", statusCode);

          if (statusCode[0].id != 4) {
            exists = true;
            break;
          }
        }
      }
    }

    return exists;
  };

  postCreateAttention = async (
    unitId,
    budgetId,
    titularId,
    detail,
    category_attention_id,
    attention_type_id,
    observation,
    attendant_id
  ) => {
    const postData = {
      unit_id: unitId,
      budget_id: budgetId,
      titular_id: titularId,
      status_attention_id: 1,
      category_attention_id,
      origin_attention_id: 11,
      attention_type_id,
      detail,
      observation,
      creator_id: attendant_id,
      utm_source: "Ventana Menorca",
    };

    const { data: response } = await this.RequestClient.post(
      "/attentions",
      postData
    );
    const { data: sperantData } = response;

    const attention = sperantData;

    const sperantAttention = new SperantAttention({
      id: attention.attributes.id,
      code: attention.attributes.code,
      titularId: attention.attributes.titular_id,
      createdAt: attention.attributes.created_at,
      attentionTypeId: attention.attributes.attention_type_id,
      statusAttentionId: attention.attributes.status_attention_id,
      originAttentionId: attention.attributes.origin_attention_id,
      categoryAttentionId: attention.attributes.category_attention_id,
      creatorId: attention.attributes.creator_id,
      projectId: attention.attributes.project_id,
      blockId: attention.attributes.block_id,
      unitId: attention.attributes.unit_id,
      budgetId: attention.attributes.budget_id,
      detail: attention.attributes.detail,
      duration: attention.attributes.duration,
      attendantId: attention.attributes.attendant_id,
      handingDate: attention.attributes.handing_date,
      expirationAt: attention.attributes.expiration_at,
      origin: attention.attributes.origin,
      utmSource: attention.attributes.utm_source,
      observation: attention.attributes.observation,
    });

    return sperantAttention;
  };

  getProjectListTotal = async () => {
    let projects = [];

    const { data: response } = await this.RequestClient.get("/projects");
    const { data: sperantData } = response;
    projects = projects.concat(sperantData);

    const sperantProjects = [];
    for (const project of projects) {
      sperantProjects.push(project);
    }

    return sperantProjects;
  };

  getPropertyTypes = async () => {
    let properties = [];

    const { data: response } = await this.RequestClient.get("/property_types");
    const { data: sperantData } = response;
    properties = properties.concat(sperantData);

    const sperantProperties = [];
    for (const property of properties) {
      sperantProperties.push(property);
    }

    return sperantProperties;
  };

  getPropertyTypeById = async (propertyType) => {
    let properties = [];

    const { data: response } = await this.RequestClient.get(
      `/property_types/${propertyType}`
    );
    const { data: sperantData } = response;
    properties = properties.concat(sperantData);

    return properties;
  };

  getAttention = async (attentionID) => {
    const { data: response } = await this.RequestClient.get(
      `/attentions/${attentionID}`
    );
    const { data: sperantData } = response;

    const sperantAttention = sperantData.attributes;
    sperantAttention.type = sperantData.type;
    return sperantAttention;
  };

  getAttendantByIdMod = async (projectId, attendantId) => {
    const supervisor = supervisors.filter((item) => item.id == attendantId);

    return supervisor[0];
  };

  getAttendantById = async (projectId, attendantId) => {
    const { data: response } = await this.RequestClient.get(
      `/projects/${projectId}/supervisors`
    );
    const { data: sperantData } = response;

    const dataSperant = sperantData;
    let supervisor = null;

    if (dataSperant.length > 0) {
      dataSperant.forEach((item) => {
        if (item.attributes.id == attendantId) {
          supervisor = item.attributes;
        }
      });
    }

    return supervisor;
  };

  getProjectNameById = async (id) => {
    const { data: response } = await this.RequestClient.get(`/projects/${id}`);
    const { data: sperantData } = response;

    const sperantAttention = {
      id: sperantData.attributes.id,
      name: sperantData.attributes.name,
    };

    return sperantAttention;
  };

  /**
   * @param {string} statusID
   */
  getAttentionStatus = async (statusID) => {
    const { data: response } = await this.RequestClient.get(
      `/status_attentions/${statusID}`
    );
    const { data: sperantData } = response;

    const sperantAttention = sperantData.attributes;

    return sperantAttention;
  };

  getAttentionStatusCode = async (statusID) => {
    const statusCode = statusTickets.filter((item) => item.id == statusID);

    return statusCode[0];
  };

  /**
   * @param {string} categoryID
   */
  getAttentionCategory = async (statusID) => {
    const { data: response } = await this.RequestClient.get(
      `/category_attentions/${statusID}`
    );
    const { data: sperantData } = response;

    const sperantAttention = sperantData.attributes;

    return sperantAttention;
  };

  /**
   * @param {string} typeID
   */
  getAttentionType = async (typeID) => {
    const { data: response } = await this.RequestClient.get(
      `/attention_types/${typeID}`
    );
    const { data: sperantData } = response;

    const sperantAttention = sperantData.attributes;

    return sperantAttention;
  };

  /**
   * @param {string} noteId
   */
  getListNotes = async (noteId) => {
    const { data: response } = await this.RequestClient.get(
      `/attentions/${noteId}/notes`
    );
    const { data: sperantData } = response;
    const sperantAttentionNotes = sperantData;

    return sperantAttentionNotes;
  };

  /**
   * @param {string} budgetId
   * @param {string} clientId
   * @param {{ status: string , page: number, limit: number }} options
   */
  getCoTitulars = async (budgetId, clientId) => {
    const { data: response } = await this.RequestClient.get(
      `/budgets/${budgetId}/titulars`
    );
    const { data: sperantData } = response;
    const sperantTitulars = [];

    for (const titular of sperantData) {
      if (titular.attributes.id === clientId) {
        sperantTitulars.push(titular.attributes.cotitular_type);
      }
    }

    return Promise.all(sperantTitulars);
  };

  getTitular = async (budgetId) => {
    const { data: response } = await this.RequestClient.get(
      `/budgets/${budgetId}/titulars`
    );
    const { data: sperantData } = response;

    const sperantTitulars = [];

    for (const titular of sperantData) {
      if (titular.attributes.cotitular_type === "titular") {
        sperantTitulars.push(titular);
      }
    }

    return Promise.all(sperantTitulars);
  };
}

module.exports = SperantV3;
