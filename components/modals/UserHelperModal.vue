<template>
	<div>
		<b-modal
			id="modal-user-helper"
			ref="modal-user-helper"
			centered
			class="modal fade"
			tabindex="-1"
			:hide-footer="true"
			:hide-title="true"
			aria-hidden="true">
			<template #modal-header>
				<h5 class="modal-title">Importante</h5>
				<button type="button" aria-label="Close" class="close" @click="closeModalContact()">
					<img src="@/assets/img/close-btn.svg" width="24" height="24" alt="" />
				</button>
			</template>

			<div class="modal-helpers">
				<p class="helper-message">
					<span class="font-weight-bolder">¿Necesita ayuda para ingresar?</span>
					Por favor póngase en contacto con nosotros:
				</p>
				<ul class="helper-list">
					<li class="helper-list-item d-flex align-items-center">Email: atención.clientes@menorca.com.pe</li>
					<li class="helper-list-item d-flex align-items-center">Call center: 2032828 / Opc: 3</li>
				</ul>
				<div class="d-flex justify-content-center">
					<button class="btn btn-green" @click="closeModalContact">ACEPTAR</button>
				</div>
			</div>
		</b-modal>
	</div>
</template>
<script>
export default {
	/* computed: {
		...mapGetters({
			userHelperModalRef: 'account/getUserHelperModalRef',
		}),
	}, */
	methods: {
		generateModalRef() {
			const modal = this.$refs['modal-user-helper'];
			return {
				show: () => {
					modal?.show();
				},
			};
		},
		saveModalRef() {
			this.$store.commit('account/setUserHelperModalRef', this.generateModalRef());
		},
		/* showModal() {
			this.userHelperModalRef?.show();
		}, */
		closeModalContact() {
			this.$refs['modal-user-helper'].hide();
		},
	},
	mounted() {
		this.saveModalRef();
	},
};
</script>
