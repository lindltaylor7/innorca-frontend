<template>
	<div class="container-loader position-absolute">
		<div class="loader-big" v-if="visible"></div>
		<div class="validated" v-else @click="handleNextButton">
			<img src="~assets/img/modals/senal-aprobada.png" alt="Señal aproabada" />
			<h5 class="modal-title">Validado</h5>
		</div>
	</div>
</template>
<script>
	export default {
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
		left: -45%;
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
