import axios from 'axios';

export const state = () => ({

})

export const getters = {

}

export const actions = {
    async register({ commit }, payload) {

        return await axios.post(`${process.env.API_URL}/signup`, payload)
            .then( ({ data }) => {
                //commit('setOrder', data);
                return data;
            })
            .catch(e => {
                console.log(e);
            });
    },
    async resendSMS({ commit }, payload) {

        return await axios.post(`${process.env.API_URL}/resend-sms`, payload)
            .then( ({ data }) => {
                //commit('setOrder', data);
                return data;
            })
            .catch(e => {
                console.log(e);
            });
    }
}

export const mutations = {

}