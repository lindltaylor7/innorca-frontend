<template>
	<div class="modal-form">
		<h5 class="modal-title">Nuevo Trámite</h5>
		<template>
			<p class="welcome">
				Por favor seleccione la el tipo de atención, categoría y proyecto sobre el cual desea realizar su
				atención:
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
			</p>

			<!-- Icon boxes -->
			<div class="request-options flex-row">
				<ButtonWizard
					@handleOptionSelected="handleOptionSelect"
					:img="require('~/assets/img/modals/solicitud_.png')"
					:title="'Solicitud'"
					:value="1" />
				<ButtonWizard
					@handleOptionSelected="handleOptionSelect"
					:img="require('~/assets/img/modals/reclamo.png')"
					:title="'Reclamo / Queja'"
					:value="2" />
				<ButtonWizard
					@handleOptionSelected="handleOptionSelect"
					:img="require('~/assets/img/modals/consulta.png')"
					:title="'Consulta'"
					:value="3" />
			</div>
			<hr />
			<!-- Next Button -->
			<button type="button" class="btn btn-green float-left mt-2" @click="handleNextButton">Siguiente →</button>
		</template>
	</div>
</template>
<script>
	import ButtonWizard from '../../components/modals/ButtonWizard.vue';

	export default {
		components: { ButtonWizard },
		data() {
			return {
				selected: '',
			};
		},
		methods: {
			handleNextButton() {
				this.$emit('nextModal', 1);
			},
			handleOptionSelect(value) {
				this.selected = value;
			},
		},
	};
</script>
<style lang=""></style>
