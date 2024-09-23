import Cookies from 'js-cookie';

const cookieparser = process.server ? require('cookieparser') : undefined;

let timer = '';

export const state = () => ({
	session: {
		token: null,
		user: {},
		loggedIn: false,
	},
	finishSession: false,
});

export const getters = {
	getFinishSession(state) {
		return state.finishSession;
	},
};

export const actions = {
	async nuxtServerInit({ commit, dispatch }, { req }) {
		let session = null;

		if (req.headers.cookie) {
			const parsed = cookieparser.parse(req.headers.cookie);
			try {
				session = JSON.parse(parsed.session);
				//console.log('session', session);
			} catch (err) {
				// No valid cookie found
			}
		}
		commit('setSession', session);

		dispatch('atencioncliente/fetchTicketOptions');
	},
	setTimeOutLogout({ dispatch }, data) {
		//let expirationTime = (new Date().getTime() + 120) * 60 * 1000;
		/*let expirationTime = 4 * 1000;

        timer = window.setInterval(() => {
            dispatch('askAboutSession');
        }, expirationTime);*/
	},
	askAboutSession({ commit }) {
		commit('setFinishSession', true);
	},
	logout() {
		Cookies.remove('session');

		localStorage.removeItem('budget_code');
		localStorage.removeItem('project_type');
		localStorage.removeItem('contract_num');
		localStorage.removeItem('budget_id');
		localStorage.removeItem('project_name');
		localStorage.removeItem('project_id');

		localStorage.removeItem('etapa');
		localStorage.removeItem('manzana');
		localStorage.removeItem('lote');

		localStorage.removeItem('budget_icon');

		if (timer) {
			clearTimeout(timer);
			console.log('timer end', timer);
		}

		//window.location.reload(true);
		window.location.href = '/login';
	},
};

export const mutations = {
	setSession(state, data) {
		if (data != null) {
			state.session = data;
		}
	},
	setFinishSession(state, data) {
		state.finishSession = data;
	},
};
