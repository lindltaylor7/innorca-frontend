import axios from 'axios';

export const state = () => ({
    typeAttentions: [],
    categoryAttentions: [],
    budgets: [],
    questions: [],
    tickets: [],
    messages: [],
    nextTickets: "",
    nextQuestions: {},
    ticketDetail: [],
    notifications: []
})

export const getters = {
    getNotifications(state) {
        return state.notifications;
    },
    getTypeAttentions(state) {
        return state.typeAttentions;
    },
    getCategoryAttentions(state) {
        return state.categoryAttentions;
    },
    getBudgets(state) {
        return state.budgets;
    },
    getQuestions(state) {
        return state.questions;
    },
    getTickets(state) {
        return state.tickets;
    },
    getMessages(state) {
        return state.messages;
    },
    getNextTickets(state) {
        return state.nextTickets;
    },
    getNextQuestions(state) {
        return state.nextQuestions;
    },
    getTicketDetail(state) {
        return state.ticketDetail;
    },
}

export const actions = {
    async listNotifications({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/notificaciones`, { headers: { "x-access-token" : obj.token } })
            .then( ({ data }) => {
                //console.log('listNotifications', data);
                commit('setNotifications', data.notifications);
                return data;
            })
            .catch(e => {

            });
    },
    async createRequest({ commit }, obj) {

        let formData = new FormData();
        formData.append('typeAttention', obj.payload.typeAttention);
        formData.append('categoryAttention', obj.payload.categoryAttention);
        formData.append('projectId', obj.payload.projectId);
        formData.append('budgetId', obj.payload.budgetId);
        formData.append('email', obj.payload.email);
        formData.append('phone', obj.payload.phone);
        formData.append('subject', obj.payload.subject);
        formData.append('detail', obj.payload.detail);
        formData.append('file', obj.payload.file);
        formData.append('fileName', obj.payload.fileName);

        return await axios.post(`${process.env.API_URL}/consultas/crear`, formData, { headers: { 'Content-Type': 'multipart/form-data', "x-access-token" : obj.token } })
            .then( ({ data }) => {
                //console.log('creaeRequest', data);
                return data;
            })
            .catch(e => {

            });
    },
    async sendMessage({ commit }, obj) {

        let formData = new FormData();
        formData.append('id', obj.payload.id);
        formData.append('content', obj.payload.content);
        formData.append('fileName', obj.payload.fileName);
        formData.append('file', obj.payload.file);

        return await axios.post(`${process.env.API_URL}/consulta/${obj.payload.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data', "x-access-token" : obj.token } })
            .then( ({ data }) => {
                //console.log('creaeRequest', data);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchTicketOptions({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/nueva-solicitud`, { headers: { "x-access-token" : obj.token } })
            .then( ({ data }) => {
                //console.log('fetchTicketOptions', data)
                commit('setTypeAttentions', data.typeAttentions);
                commit('setCategoryAttentions', data.categoryAttentions);
                commit('setBudgets', data.budgets);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchQuestions({ commit }, obj) {

        //return await axios.post(`${process.env.API_URL}/preguntas-frecuentes`, obj.payload, { headers: {"x-access-token" : obj.token }, params: obj.params })
        return await axios.post(`${process.env.API_URL}/t-preguntas-frecuentes`, obj.payload, { headers: {"x-access-token" : obj.token }, params: obj.params })
            .then( ({ data }) => {
                //console.log('fetchQuestions', data)
                commit('setQuestions', data.frequentQuestions);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchMoreQuestions({ commit }, obj) {

        //return await axios.post(`${process.env.API_URL}/preguntas-frecuentes`, obj.payload, { headers: {"x-access-token" : obj.token }, params: obj.params })
        return await axios.post(`${process.env.API_URL}/t-preguntas-frecuentes`, obj.payload, { headers: {"x-access-token" : obj.token }, params: obj.params })
            .then( ({ data }) => {
                //console.log('fetchQuestions', data)
                commit('setMoreQuestions', data);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchTickets({ commit }, obj) {
        //console.log('obj store token', obj.token);
        return await axios.post(`${process.env.API_URL}/consultas`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                //console.log('fetchTickets', data)
                commit('setTickets', data);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchMoreTickets({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/consultas`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                commit('setMoreTickets', data);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchTicket({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/consulta/${obj.id}`, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                //console.log('fetchQuestions', data)
                commit('setMessages', data.notes);
                commit('setTicketDetail', data.sperantData);
                return data;
            })
            .catch(e => {

            });
    },
    
}

export const mutations = {
    setNotifications(state, data) {
        state.notifications = data;
    },
    setTypeAttentions(state, data) {
        state.typeAttentions = data;
    },
    setCategoryAttentions(state, data) {
        state.categoryAttentions = data;
    },
    setBudgets(state, data) {
        state.budgets = data;
    },
    setQuestions(state, data) {
        state.nextQuestions = data.pagination;

        state.questions = data;
    },
    setMoreQuestions(state, data) {
        //state.historyPayments = data;

        state.nextQuestions = data.pagination

        if (data.frequentQuestions && data.frequentQuestions.length > 0) {
            data.frequentQuestions.forEach((element) => {
                state.questions.push(element);
            });
        }
    },
    setTickets(state, data) {
        state.nextTickets = data.next;
        state.tickets = data.tickets;
    },
    setMoreTickets(state, data) {
        //state.historyPayments = data;

        state.nextTickets = data.next;

        if (data.tickets && data.tickets.length > 0) {
            data.tickets.forEach((element) => {
                state.tickets.push(element);
            });
        }
    },
    setMessages(state, data) {
        state.messages = data;
    },
    setTicketDetail(state, data) {
        state.ticketDetail = data;
    },
    cleanMoreQuestions(state, data) {
        //state.historyPayments = data;

        state.question = [];
        state.nextQuestions = {
            page: 1,
        };
    },
    modifyQuestionRate(state, data) {
        const {question} = data

        state.questions = state.questions.map((q)=>{
            if(q._id == question._id){
                q = {...question}
            }
            return {...q}
        });
    },
    
}