import axios from 'axios';

export const state = () => ({
    user: {},
    pendingBudgets: "",
    nextPendingBudget: "",
    manualPendingBudgets: "",
    manualNextPendingBudget: "",
    completedQuotes: "",
    pendingQuotes: "",
    saldo: "",
    totalAmount: "",
    projectTotal: "",
    formattedTotalSaldo: "",
    formattedTotalAmount: "",
    formattedProjectTotal: "",
    propertyImage: "",
    propertyStatus: "",
    propertyContent: "",
    payments: [],
    tickets: [],
    referrals: 0,
    posts: [],
    lastUpdate: ""
})

export const getters = {
    getPendingBudgets(state) {
        return state.pendingBudgets;
    },
    getNextPendingBudget(state) {
        return state.nextPendingBudget;
    },
    getManualPendingBudgets(state) {
        return state.manualPendingBudgets;
    },
    getManualNextPendingBudget(state) {
        return state.manualNextPendingBudget;
    },
    getCompletedQuotes(state) {
        return state.completedQuotes;
    },
    getPendingQuotes(state) {
        return state.pendingQuotes;
    },
    getSaldo(state) {
        return state.saldo;
    },
    getTotalAmount(state) {
        return state.totalAmount;
    },
    getProjectTotal(state) {
        return state.projectTotal;
    },
    getFormattedTotalAmount(state) {
        return state.formattedTotalAmount;
    },
    getFormattedProjectTotal(state) {
        return state.formattedProjectTotal;
    },
    getPropertyImage(state) {
        return state.propertyImage;
    },
    getPropertyStatus(state) {
        return state.propertyStatus;
    },
    getPropertyContent(state) {
        return state.propertyContent;
    },
    getLastThreePayments(state) {
        return state.payments;
    },
    getLastThreeTickets(state) {
        return state.tickets;
    },
    getReferrals(state) {
        return state.referrals;
    },
    getPosts(state) {
        return state.posts;
    },
    getLastUpdate(state) {
        return state.lastUpdate;
    },
}

export const actions = {
    async fetchPaymentInfo({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/dashboard/payment-information`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                commit('setManualPendingBudgets', data.manualPendingBudgets);
                commit('setManualNextPendingBudget', data.manualNextPendingBudget);
                commit('setPendingBudgets', data.pendingBudgets);
                commit('setNextPendingBudget', data.nextPendingBudget);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchProgress({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/dashboard/payment-progress`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                commit('setCompletedQuotes', data.completedQuotes);
                commit('setPendingQuotes', data.totalQuotes);
                commit('setSaldo', data.saldo);
                commit('setTotalAmount', data.totalAmount);
                commit('setProjectTotal', data.projectTotal);
                commit('setFormattedTotalAmount', data.formattedTotalAmount);
                commit('setFormattedProjectTotal', data.formattedProjectTotal);
                commit('setLastUpdate', data.moment);
                return data;
            })
            .catch(e => {
                console.log(e);
            });
    },
    async fetchPropertyState({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/obtener-estado-propiedad-mi-resumen`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                commit('setPropertyStateImage', data.data.image);
                commit('setPropertyStateStatus', data.data.status);
                commit('setPropertyStateContent', data.data.content);
                return data;
            })
            .catch(e => {
                console.log(e);
            });
    },
    async fetchLastThreePayments({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/dashboard/last-three-payments`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                commit('setLastThreePayments', data.payments);
                return data;
            })
            .catch(e => {
                console.log(e);
            });
    },
    async fetchLastThreeTickets({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/dashboard/last-three-tickets`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                commit('setLastThreeTickets', data.tickets);
                return data;
            })
            .catch(e => {
                console.log(e);
            });
    },
    async fetchReferrals({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/dashboard/referrals`, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                commit('setReferrals', data.referrals);
                return data;
            })
            .catch(e => {
                console.log(e);
            });
    },
    async fetchNews({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/dashboard/news`, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                commit('setPosts', data.posts);
                return data;
            })
            .catch(e => {
                console.log(e);
            });
    },

}

export const mutations = {
    setPendingBudgets(state, data) {
        state.pendingBudgets = data;
    },
    setNextPendingBudget(state, data) {
        state.nextPendingBudget = data;
    },
    setManualPendingBudgets(state, data) {
        state.manualPendingBudgets = data;
    },
    setManualNextPendingBudget(state, data) {
        state.manualNextPendingBudget = data;
    },
    setCompletedQuotes(state, data) {
        state.completedQuotes = data;
    },
    setPendingQuotes(state, data) {
        state.pendingQuotes = data;
    },
    setSaldo(state, data) {
        state.saldo = data;
    },
    setTotalAmount(state, data) {
        state.totalAmount = data;
    },
    setProjectTotal(state, data) {
        state.projectTotal = data;
    },
    setFormattedTotalAmount(state, data) {
        state.formattedTotalAmount = data;
    },
    setFormattedProjectTotal(state, data) {
        state.formattedProjectTotal = data;
    },
    setPropertyStateImage(state, data) {
        state.propertyImage = data;
    },
    setPropertyStateStatus(state, data) {
        state.propertyStatus = data;
    },
    setPropertyStateContent(state, data) {
        state.propertyContent = data;
    },
    setLastThreePayments(state, data) {
        state.payments = data;
    },
    setLastThreeTickets(state, data) {
        state.tickets = data;
    },
    setReferrals(state, data) {
        state.referrals = data;
    },
    setPosts(state, data) {
        state.posts = data;
    },
    setLastUpdate(state, data) {
        state.lastUpdate = data;
    },
}