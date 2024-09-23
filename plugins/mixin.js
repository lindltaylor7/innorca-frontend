import { UAParser } from 'ua-parser-js';
import Cookies from 'js-cookie';
import axios from 'axios';
import vue from 'vue';

vue.mixin({
	methods: {
		numberFormat(value) {
			const safeNumber = Number(value);

			return safeNumber.toLocaleString('en-Us');
		},
		async getIp() {
			try {
				const { data } = await axios('https://www.cloudflare.com/cdn-cgi/trace', {
					responseType: 'text'
				});

				const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;

				const ip = data.match(ipRegex)[0];

				return ip;
			} catch (error) {
				console.warn(error);

				return '';
			}
		},
		async getUserAgentPayload(userId = null) {
			const parser = new UAParser();

			const ip = await this.getIp();
			const res = parser.getResult();
			const fechaVisita = new Date().toISOString();

			const session = JSON.parse(Cookies.get("session") ?? '{}');

			const sperantClientId = session?.user?.sperantClientId;

			const { utm_source, utm_medium, utm_campaign } = this.$route.query;

			const path = this.$route.path;

			return {
				...res,
				ip,
				fechaVisita,
				sperantClientId: sperantClientId ?? null,
				userId,
				path,
				utm: {
					utm_source: utm_source ?? null,
					utm_medium: utm_medium ?? null,
					utm_campaign: utm_campaign ?? null
				}
			};
		},
	}
})
