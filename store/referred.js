import axios from "axios";

export const state = () => ({
	referrals: {},
	projects: {},
	properties: {},
	referralsBI: {}
});

export const getters = {
	getUserReferrals(state) {
		return state.referrals;
	},
	getProjectsList(state) {
		return state.projects;
	},
	getPropertiesList(state) {
		return state.properties;
	},
	userReferralsBI(state) {
		return state.referralsBI;
	}
};

export const actions = {
	async getUserReferrals({ commit }, obj) {
		return await axios
			.get(`${process.env.API_URL}/referidos`, {
				headers: { "x-access-token": obj.token },
			})
			.then(({ data }) => {
				commit("setReferrals", data);
				return data;
			})
			.catch((e) => { });
	},
	async userReferralsBI({ commit }, obj) {
		return await axios
			.post(`${process.env.API_URL}/referidos-bi`, obj, {
				headers: { "x-access-token": obj.token },
			})
			.then(({ data }) => {
				return data;
			})
			.catch((e) => { });
	},
	async createReferrals({ commit }, payload) {
		return await axios
			.post(`${process.env.API_URL}/referidos`, payload)
			.then(({ data }) => {
				return data;
			})
			.catch((e) => {
				console.log(e);
			});
	},
	async getProjectsList({ commit }, obj) {
		return await axios
			.get(`${process.env.API_URL}/proyectos`, {
				headers: { "x-access-token": obj.token },
			})
			.then(({ data }) => {
				commit("setProjectsList", data.data);
				return data;
			})
			.catch((e) => {
				console.log(e);
			});
	},
	async getPropertiesList({ commit }, obj) {
		return await axios
			.get(`${process.env.API_URL}/tipos-propiedad`, {
				headers: { "x-access-token": obj.token },
			})
			.then(({ data }) => {
				commit("setPropertiesList", data.data);
				return data;
			})
			.catch((e) => {
				console.log(e);
			});
	},
};

export const mutations = {
	setReferrals(state, data) {
		state.referrals = data;
	},
	setProjectsList(state, data) {
		state.projects = data;
	},
	setPropertiesList(state, data) {
		state.properties = data;
	},
};
