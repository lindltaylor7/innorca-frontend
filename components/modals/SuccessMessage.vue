<template>
	<div class="container-success">
		<img src="~assets/img/modals/senal-aprobada.png" class="w-25" alt="Señal aproabada" />
		<h3>!Felicitaciones!</h3>
		<p>Ya puedes iniciar tu trámite de minuta</p>
		<button class="btn btn-green float-left mt-2" @click="handleStartButton">Iniciar</button>
		<button class="btn btn-red float-left mt-2" @click="handleNextButton">Error</button>
	</div>
</template>
<script>
export default {
	methods: {
		handleNextButton() {
			this.$emit('nextModal', 3);
		},
		handleStartButton() {
			this.$emit('nextModal', 4);
		}
	},
};
</script>
<style>
.container-success {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
