import axios from 'axios';

export const state = () => ({

})

export const actions = {
    async login({ commit }, payload) {

        return await axios.post(`${process.env.API_URL}/login`, payload)
            .then( ({ data }) => {
                //commit('setOrder', data);
                return data;
            })
            .catch(e => {
                console.log(e);
            });
    },
    async loginWithCellphone({ commit }, payload) {

        return await axios.post(`${process.env.API_URL}/login-cellphone`, payload)
            .then( ({ data }) => {
                //commit('setOrder', data);
                return data;
            })
            .catch(e => {
                console.log(e);
            });
    }
}