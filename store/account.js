import axios from 'axios';

export const state = () => ({
	user: {},
	userHelperModalRef:null,
})

export const getters = {
	getUser(state) {
		return state.user;
	},
	getUserAccount(state) {
		return state.user;
	},
	getUserHelperModalRef(state) {
		return state.userHelperModalRef;
	}
}

export const actions = {
	async getUserAccount({ commit }, obj) {

		return await axios.get(`${process.env.API_URL}/account`, { headers: { "x-access-token": obj.token } })
			.then(({ data }) => {
				localStorage.setItem("titular","")
				localStorage.setItem("titular", data.data.titular)
				commit('setUser', data.data);
				return data;
			})
			.catch(e => {

			});
	},
	async updateAccount({ commit }, obj) {

		return await axios.post(`${process.env.API_URL}/account/profile`, obj.payload, { headers: { "x-access-token": obj.token } })
			.then(({ data }) => {
				//commit('setUser', data.data);
				return data;
			})
			.catch(e => {

			});
	},
	async forgotPassword({ commit }, payload) {

		return await axios.post(`${process.env.API_URL}/forgot`, payload)
			.then(({ data }) => {
				return data;
			})
			.catch(e => {
				console.log(e);
			});
	},
	async verifySMS({ commit }, payload) {

		return await axios.post(`${process.env.API_URL}/verify-sms`, payload)
			.then(({ data }) => {
				return data;
			})
			.catch(e => {
				console.log(e);
			});
	},
	async createPassword({ commit }, payload) {

		return await axios.post(`${process.env.API_URL}/create-password`, payload)
			.then(({ data }) => {
				return data;
			})
			.catch(e => {
				console.log(e);
			});
	},
	async resetPassword({ commit }, payload) {

		return await axios.post(`${process.env.API_URL}/reset-password`, payload)
			.then(({ data }) => {
				return data;
			})
			.catch(e => {
				console.log(e);
			});
	},
	async changePassword({ commit }, obj) {

		return await axios.post(`${process.env.API_URL}/change-password`, obj.payload, { headers: { "x-access-token": obj.token } })
			.then(({ data }) => {
				//commit('setUser', data.data);
				return data;
			})
			.catch(e => {

			});
	},
	async notificationsSeen({ commit }, obj) {

		return await axios.post(`${process.env.API_URL}/notificacions-seen`, {}, { headers: { "x-access-token": obj.token } })
			.then(({ data }) => {
				//commit('setUser', data.data);
				return data;
			})
			.catch(e => {

			});
	},

}

export const mutations = {
	setUser(state, data) {
		state.user = data;
	},
	setUserHelperModalRef(state, data) {
		state.userHelperModalRef = data;
	},
}
