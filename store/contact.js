import axios from "axios";
import * as msal from '@azure/msal-browser'

import { normalizeContacts } from '../core/helpers/contactHelper';

export const state = () => ({
  contacts: {},
  contact: {},
  googleContacts: {},
  username: '',
  myMSALObj: null
});

export const getters = {
  getUserContacts(state) {
    return state.contacts;
  },
  getContactDetails(state) {
    return state.contact;
  },
  getGoogleContacts(state) {
    return state.googleContacts;
  },
};

export const actions = {
  async getUserContacts({ commit }, obj) {
    return await axios
      .get(`${process.env.API_URL}/contactos`, {
        headers: { "x-access-token": obj.token },
      })
      .then(({ data }) => {
        commit("setContacts", data.data);
        return data;
      })
      .catch((e) => { });
  },
  async createContact({ commit }, payload) {
    return await axios
      .post(`${process.env.API_URL}/contactos`, payload)
      .then(({ data }) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async createContacts({ commit }, obj) {
    return await axios
      .post(`${process.env.API_URL}/crear-contactos`, obj, {
        headers: { "x-access-token": obj.token },
      })
      .then(({ data }) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async updateContact({ commit }, payload) {
    return await axios
      .post(`${process.env.API_URL}/actualizar-contacto`, payload, {
        headers: { "x-access-token": payload.token },
      })
      .then(({ data }) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async getContactDetails({ commit }, payload) {
    return await axios
      .get(`${process.env.API_URL}/contactos/${payload.contactId}`, {
        headers: { "x-access-token": payload.token },
      })
      .then(({ data }) => {
        commit("setContact", data.data);
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async authGoogle({ commit }, payload) {
    console.log("payload to google", payload);

    return await axios
      .post(`${process.env.API_URL}/auth-google`, payload, {
        headers: { "x-access-token": payload.token },
      })
      .then(({ data }) => {
        commit("setGoogleContact", data.data);
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  },

  initMsal({ commit }) {
    const msalConfig = {
      auth: {
        clientId: process.env.AZURE_APP_ID,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "https://ventana.menorca.pe/mis-referidos",
      },
      cache: {
        // cacheLocation: "sessionStorage", // This configures where your cache will be stored
        // storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge

        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
        secureCookies: false
      },
      system: {
        loggerOptions: {
          loggerCallback: (level, message, containsPii) => {
            if (containsPii) {
              return;
            }
            switch (level) {
              case msal.LogLevel.Error:
                console.error(message);
                return;
              case msal.LogLevel.Info:
                console.info(message);
                return;
              case msal.LogLevel.Verbose:
                console.debug(message);
                return;
              case msal.LogLevel.Warning:
                console.warn(message);
                return;
            }
          }
        }
      }
    };

    const myMSALObj = new msal.PublicClientApplication(msalConfig);

    commit('setMyMSALObj', myMSALObj);
  },
  async authOutlook({ commit, state }) {
    const myMSALObj = state.myMSALObj;

    const loginRequest = {
      scopes: ["User.Read", "Contacts.Read", "Contacts.ReadWrite"],
      redirectUri: false
    };


    try {
      const currentAccounts = myMSALObj.getAllAccounts();
      const account = myMSALObj.getAccountByUsername(currentAccounts[0]?.username);

      const logoutRequest = {
        account,
        onRedirectNavigate: () => false
      };

      await myMSALObj.logoutPopup(logoutRequest);

      const response = await myMSALObj.loginPopup(loginRequest)

      if (response !== null) {
        commit('setUsername', response?.account?.username);

        const accessToken = response?.accessToken;
        if (!accessToken) return;

        const res = await axios.get('https://graph.microsoft.com/v1.0/me/contacts', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const contacts = normalizeContacts('outlook', res?.data?.value?.filter(r => r.displayName));

        return contacts;

      } else {
        if (currentAccounts.length === 0) {
          return;
        } else if (currentAccounts.length > 1) {
          console.warn("Multiple accounts detected.");
        } else if (currentAccounts.length === 1) {
          commit('setUsername', currentAccounts[0].username);
        }
      }

    } catch (error) {
      console.error(error);
      return false;
    }
  },
  selectAccount({ commit, state }) {
    const myMSALObj = state.myMSALObj;

    const currentAccounts = myMSALObj.getAllAccounts();

    if (currentAccounts.length === 0) {
      return;
    } else if (currentAccounts.length > 1) {
      console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
      commit('setUsername', currentAccounts[0].username);
    }
  }
};

export const mutations = {
  setContacts(state, data) {
    state.contacts = data;
  },
  setContact(state, data) {
    state.contact = data;
  },
  setGoogleContact(state, data) {
    state.googleContacts = data;
  },
  setUsername(state, data) {
    state.username = data;
  },
  setMyMSALObj(state, data) {
    state.myMSALObj = data;
  }
};
