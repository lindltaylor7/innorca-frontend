<template>
	<div class="container-loader position-absolute">
		<div class="loader-big" v-if="visible"></div>
		<div class="validated" v-else @click="handleNextButton">
			<img src="~assets/img/modals/senal-aprobada.png" alt="Señal aproabada" />
			<h5 class="modal-title">{{ title }}</h5>
			<p>{{ subtitle }}</p>
			<!-- <button class="btn btn-green float-left mt-2" @click="handleNextButton">Iniciar</button>
			<button class="btn btn-red float-left mt-2" @click="handleNextButton">Error</button> -->
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			title: String,
			subtitle: String,
		},
		data() {
			return {
				visible: true,
			};
		},
		mounted() {
			setTimeout(() => {
				this.visible = false;
			}, 3000);
		},
		methods: {
			handleNextButton() {
				this.$emit('nextModal', 6);
			},
		},
	};
</script>
<style scoped>
	.container-loader {
		background-color: #fff;
		border-radius: 10px;
		border: 2px solid green;
		padding: 30px 0px;
		position: absolute;
		width: 600px;
		top: 25%;
		left: -5%;
	}

	img {
		width: 100px !important;
	}

	.validated {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
