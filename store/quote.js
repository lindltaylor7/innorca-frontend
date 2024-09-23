import axios from 'axios';

export const state = () => ({
	quotes: {},
	quotePdf: {},
	quote: {},
	unit: {},
	validarDeudas: '',
});

export const getters = {
	getUserQuotes(state) {
		return state.quotes;
	},
	getPdfQuote(state) {
		return state.quotePdf;
	},
	getQuoteDetail(state) {
		return state.quote;
	},
	getUnitSize(state) {
		return state.unit;
	},
	getValidarDeudas(state) {
		return state.validarDeudas;
	},
};

export const actions = {
	async getUserQuotes({ commit }, obj) {
		return await axios
			.get(`${process.env.API_URL}/cotizaciones`, {
				headers: { 'x-access-token': obj.token },
			})
			.then(({ data }) => {
				commit('setQuotes', data.data);
				return data;
			})
			.catch((e) => {});
	},
	async getValidarDeudas({ commit }, obj) {
		return await axios
			.post(`${process.env.API_URL}/validar-deudas`, obj.payload, { headers: { 'x-access-token': obj.token } })
			.then(({ data }) => {
				commit('setValidarDeudas', data);
				return data;
			})
			.catch((e) => {});
	},
	async getPriceRoom({ commit }, payload) {
		return await axios
			.post(`${process.env.API_URL}/precio-habitacion`, payload)
			.then(({ data }) => {
				return data;
			})
			.catch((e) => {
				console.log(e);
			});
	},
	async createQuote({ commit }, obj) {
		return await axios
			.post(`${process.env.API_URL}/guardar-cotizacion`, obj, {
				headers: { 'x-access-token': obj.token },
			})
			.then(({ data }) => {
				return data;
			})
			.catch((e) => {
				console.log(e);
			});
	},
	async getPdfQuote({ commit }, obj) {
		return await axios
			.get(`${process.env.API_URL}/cotizacion/${obj.id}/descargar`, {
				headers: { 'x-access-token': obj.token },
			})
			.then((response) => {
				commit('setPdfQuote', response.data);
				return response.data;
			})
			.catch((e) => {
				console.log(e);
			});
	},
	async getQuoteDetail({ commit }, obj) {
		return await axios
			.get(`${process.env.API_URL}/cotizacion/${obj.id}`, {
				headers: { 'x-access-token': obj.token },
			})
			.then((response) => {
				return response.data;
			})
			.catch((e) => {
				console.log(e);
			});
	},
	async getUnitSize({ commit }, obj) {
		return await axios
			.post(`${process.env.API_URL}/unidad`, obj, {
				headers: { 'x-access-token': obj.token },
			})
			.then(({ data }) => {
				return data;
			})
			.catch((e) => {
				console.log(e);
			});
	},
	async postCounseling({ commit }, obj) {
		return await axios
			.post(`${process.env.API_URL}/counseling`, obj, {
				headers: { 'x-access-token': obj.token },
			})
			.then(({ data }) => {
				return data;
			})
			.catch((e) => {
				console.log(e);
			});
	},
	async postCheckNif({ commit }, obj) {
		return await axios
			.post(`${process.env.API_URL}/check-nif`, obj, {
				headers: { 'x-access-token': obj.token },
			})
			.then(({ data }) => {
				return data;
			})
			.catch((e) => {
				console.log(e);
			});
	},
};

export const mutations = {
	setQuotes(state, data) {
		state.quotes = data;
	},
	setPdfQuote(state, data) {
		state.quotePdf = data;
	},
	setQuoteDetail(state, data) {
		state.quote = data;
	},
	setUnitSize(state, data) {
		state.unit = data;
	},
	setValidarDeudas(state, data) {
		state.validarDeudas = data;
	},
};
