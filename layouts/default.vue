<template>
	<Nuxt />
</template>

<script>

import { mapActions } from 'vuex';
import { EVENTS } from '../core/constants/events';
import Cookies from "js-cookie";
export default {
	methods: {
		...mapActions({
			save: 'metrics/save',
			getUserAccount: 'account/getUserAccount',
			initMsal: 'contact/initMsal'
		})
	},
	async mounted() {
		const session = JSON.parse(Cookies.get("session") ?? null);

		const user = session ? await this.getUserAccount(session) : null;

		const payload = await this.getUserAgentPayload(user?.id);

		this.initMsal();

		await this.save({ type: EVENTS.registro.visitas, payload });
	},
}
</script>

<style>
</style>
