import axios from "axios";

export const state = () => ({
    budgets: [],
    historyPayments: [],
    nextHistoryPayments: "",
    completedQuotes: "",
    pendingQuotes: "",
    saldo: "",
    totalAmount: "",
    projectTotal: "",
    formattedTotalSaldo: "",
    formattedTotalAmount: "",
    formattedProjectTotal: "",
    contractNum: "",
    projectType: "",
    pendingBudgets: "",
    nextPendingBudget: "",
    manualPendingBudgets: "",
    manualNextPendingBudget: "",

    statusPayments: "",
    nextStatusPayments: "",

    lastUpdate: ""
});

export const getters = {
    getBudgets(state) {
        return state.budgets;
    },
    getStatusPayments(state) {
        return state.statusPayments;
    },
    getNextStatusPayments(state) {
        return state.nextStatusPayments;
    },
    getHistoryPayments(state) {
        return state.historyPayments;
    },
    getNextHistoryPayments(state) {
        return state.nextHistoryPayments;
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
    getFormattedTotalSaldo(state) {
        return state.formattedTotalSaldo;
    },
    getFormattedTotalAmount(state) {
        return state.formattedTotalAmount;
    },
    getFormattedProjectTotal(state) {
        return state.formattedProjectTotal;
    },
    getLastUpdate(state) {
        return state.lastUpdate;
    },
}

export const actions = {
    async fetchBudgets({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/inmuebles`, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                //console.log('data', data.budgets)//projectType
                commit('setBudgets', data.budgets);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchProgress({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/last-three-pendings`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                //console.log('data', data);
                //commit('setHistoryPayments', data.payments);
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

            });

    },
    async fetchPaymentInformation({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/payment-information`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                //console.log('data', data);
                commit('setManualPendingBudgets', data.manualPendingBudgets);
                commit('setManualNextPendingBudget', data.manualNextPendingBudget);
                commit('setPendingBudgets', data.pendingBudgets);
                commit('setNextPendingBudget', data.nextPendingBudget);
                return data;
            })
            .catch(e => {

            });

    },
    async fetchPaymentHistory({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/payment-history`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                //console.log('data', data);
                commit('setHistoryPayments', data);
                return data;
            })
            .catch(e => {

            });

    },
    async fetchMorePaymentHistory({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/payment-history`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                //console.log('data', data);
                commit('setMoreHistoryPayments', data);
                return data;
            })
            .catch(e => {

            });

    },
    async fetchPaymentStatus({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/payment-status`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                //console.log('data', data);
                commit('setStatusPayments', data);
                return data;
            })
            .catch(e => {

            });

    },
    async fetchMorePaymentStatus({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/payment-status`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                //console.log('data', data);
                commit('setMoreStatusPayments', data);
                return data;
            })
            .catch(e => {

            });

    },
    async generateCips({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/create-cips`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                //console.log('data', data);
                return data;
            })
            .catch(e => {

            });

    },
    async sendSMSCips({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/send-sms-cips`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                //console.log('data', data);
                return data;
            })
            .catch(e => {

            });

    },
    async verifyIfCIPExist({ commit }, obj) {
        return await axios.post(`${process.env.API_URL}/verify-if-cip-exist`, obj.payload, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                //console.log('data', data);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchQuestions({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/preguntas-frecuentes`, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                console.log('fetchQuestions', data)
                    //commit('setBudgets', data.budgets);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchEstadoNIF({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/obtener-estado`, obj, { headers: { "x-access-token": obj.token } })
            .then(({ data }) => {
                return data;
            })
            .catch(e => {

            });

    },
    async fetchBudgetUnits({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/obtener-unidades`, obj)
            .then(({ data }) => {
                return data;
            })
            .catch(e => {

            });

    },
    async getTotalPendingBudgets({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/obtener-total-budget-pendings`, obj)
            .then(({ data }) => {
                return data;
            })
            .catch(e => {

            });

    },
    async getFileToDownload({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/obtener-file-descargar`, obj)
            .then(({ data }) => {
                return data;
            })
            .catch(e => {

            });

    },
}

export const mutations = {
    setBudgets(state, data) {
        state.budgets = data;
    },
    setHistoryPayments(state, data) {
        //state.historyPayments = data;

        state.nextHistoryPayments = data.next;

        if (data.payments) {
            state.historyPayments = data.payments;
            /*data.payments.forEach(element => {
                      state.historyPayments.push(element);
                  });*/
        }
    },
    setMoreHistoryPayments(state, data) {
        //state.historyPayments = data;

        state.nextHistoryPayments = data.next;

        if (data.payments && data.payments.length > 0) {
            data.payments.forEach((element) => {
                state.historyPayments.push(element);
            });
        }
    },
    setStatusPayments(state, data) {

        state.nextStatusPayments = data.next;

        if (data.payments) {
            state.statusPayments = data.payments;
        }
    },
    setMoreStatusPayments(state, data) {
        state.nextStatusPayments = data.next;

        if (data.payments && data.payments.length > 0) {
            data.payments.forEach((element) => {
                state.statusPayments.push(element);
            });
        }
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
    setFormattedTotalAmount(state, data) {
        state.formattedTotalAmount = data;
    },
    setFormattedTotalSaldo(state, data) {
        state.formattedTotalSaldo = data;
    },
    setFormattedProjectTotal(state, data) {
        state.formattedProjectTotal = data;
    },
    setLastUpdate(state, data) {
        state.lastUpdate = data;
    },
};