import axios from 'axios';

import Cookies from 'js-cookie';
import { } from 'vuex';

export const actions = {

	async save({ }, { type, payload = {}, db = true }) {

		const session = JSON.parse(Cookies.get("session") ?? null);
		const token = session?.token;

		const path = this.$router?.currentRoute?.path;
		const userId = this.state?.account?.user?._id



		if (path) payload.path = path;
		if (userId) payload.userId = userId;

		this.$gtm.push({ event: type, ...payload });

		console.log('[GTM]', { event: type, payload, db });

		try {
			return db ?
				await axios.post(`${process.env.API_URL}/events`, { rawData: payload, type },
					{
						headers: { "x-access-token": token }
					})
					.then(({ data }) => data)
					.catch(e => console.error(e))

				: true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}
