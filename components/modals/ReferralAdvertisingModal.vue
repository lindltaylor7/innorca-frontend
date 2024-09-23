<template>
	<div>
		<b-modal
			id="modal-referral-advertising"
			ref="modal-referral-advertising"
			centered
			class="modal fade"
			tabindex="-1"
			:hide-footer="true"
			:hide-title="true"
			aria-hidden="true">
			<NuxtLink to="/mis-referidos">
				<picture class="banner-img">
					<img
						src="@/assets/img/modals/referral-advertising.png"
						alt="Refiere y gana 500 soles, 600 soles o 750 soles" />
				</picture>
			</NuxtLink>
		</b-modal>
	</div>
</template>
<script>
export default {
	methods: {
		showAdvertise() {
			this.$refs['modal-referral-advertising']?.show();
		},
		verifyAdvertisingDate() {
			const DEFAULT_TIME = 'T00:00:00.000-05:00';
			const LS_SAVED_DATE_KEY = 'date_to_show_advertising';
			const today = new Date();
			const dateToShowAdvertisingString = localStorage.getItem(LS_SAVED_DATE_KEY);
			if (dateToShowAdvertisingString) {
				const dateToShowAdvertising = new Date(dateToShowAdvertisingString + DEFAULT_TIME);
				const shouldShowModal = today - dateToShowAdvertising >= 0;
				if (shouldShowModal) {
					const dateToShowAdvertising = new Date(today.setDate(today.getDate() + 1));
					const dateToShowAdvertisingString = dateToShowAdvertising.toJSON().split('T')[0];
					localStorage.setItem(LS_SAVED_DATE_KEY, dateToShowAdvertisingString);
					this.showAdvertise();
				}
			} else {
				const dateToShowAdvertising = new Date(today.setDate(today.getDate() + 1));
				const dateToShowAdvertisingString = dateToShowAdvertising.toJSON().split('T')[0];
				localStorage.setItem(LS_SAVED_DATE_KEY, dateToShowAdvertisingString);
				this.showAdvertise();
			}
			//const today = Date.now();
			/* const date = today.toJSON().split('T')[0];
			console.group('Referral');
			console.log('Now: ', today.toISOString(), today);
			console.log('saved Date: ', savedDate);
			console.log('saved Date: ', new Date(savedDate.setDate(savedDate.getDate() + 1)));
			console.groupEnd(); */
			//localStorage.set('showedModalAdvertisingDate',)
		},
	},
	mounted() {
		this.verifyAdvertisingDate();
	},
};
</script>

