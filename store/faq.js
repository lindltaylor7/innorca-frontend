import axios from 'axios';

export const state = () => ({
    questions: [],
    moreQuestions: [],
    questionCategories: [],
    nextQuestions: {},
    pagination: {
        limit: 5,
        page: 1,
        pages: 1, //total de páginas
        total: 20
    }
})

export const getters = {
    getQuestions(state) {
        return state.questions;
    },
    getMoreQuestions(state) {
        return state.moreQuestions;
    },
    getNextQuestions(state) {
        return state.nextQuestions;
    },
    getQuestionCategories(state) {
        return state.questionCategories;
    },
}

export const actions = {
    async fetchQuestions({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/t-preguntas-frecuentes`, obj.payload, { headers: {"x-access-token" : obj.token }, params: obj.params })
            .then( ({ data }) => {
                //console.log('fetchQuestions', data)
                commit('setQuestions', data.frequentQuestions);
                commit('setPagination', {pagination: data.pagination});
                return data;
            })
            .catch(e => {

            });
    },
    async fetchMoreQuestions({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/t-preguntas-frecuentes`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                //console.log('fetchQuestions', data)
                commit('setMoreQuestions', data);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchQuestionCategories({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/question-categories`/* , obj.payload */, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                commit('setQuestionCategories', data.questionCategories);
                return data;
            })
            .catch(e => {

            });
    },
    async rateQuestionAnswer({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/t-pregunta-frecuente/${obj.questionId}/rate`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },

}

export const mutations = {
    setQuestions(state, data) {
        state.nextQuestions = data.pagination;

        state.questions = data;
    },
    setPagination(state, data){
        state.pagination = { ...state.pagination, ...data.pagination }
    },
    setMoreQuestions(state, data) {
        //state.historyPayments = data;

        state.nextQuestions = data.pagination

        if (data.frequentQuestions && data.frequentQuestions.length > 0) {
            data.frequentQuestions.forEach((element) => {
                state.moreQuestions.push(element);
            });
        }
    },
    cleanMoreQuestions(state, data) {
        //state.historyPayments = data;

        state.moreQuestions = [];
        state.nextQuestions = {
            page: 1,
        };
    },
    setQuestionCategories(state, data) {
        state.questionCategories = data;
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
