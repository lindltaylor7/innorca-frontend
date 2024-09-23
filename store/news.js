import axios from "axios";

export const state = () => ({
    news: [],
    post: [],
});

export const getters = {
    getNews(state) {
        return state.news;
    },
    getPost(state) {
        return state.post;
    },
}

export const actions = {
    async fetchNews({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/noticias`)
            .then(({ data }) => {
                //console.log('data', data.budgets)//projectType
                commit('setNews', data.posts);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchPost({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/noticias/${obj.id}`)
            .then(({ data }) => {
                //console.log('data', data);
                commit('setPost', data);
                return data;
            })
            .catch(e => {

            });

    },
}

export const mutations = {
    setNews(state, data) {
        state.news = data;
    },
    setPost(state, data) {
        state.post = data;
    },
};