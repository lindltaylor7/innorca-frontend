<template>
	<div class="container-success">
		<img src="~assets/img/modals/exclamacion.png" class="w-25" alt="Señal aprobada" />
		<p>
			Hemos identificado que todavía no es apto para recibir la minuta. Esto se debe a una de las siguientes
			razones:
		</p>
		<ul>
			<li>Aún falta completar el proceso de independización. <a href="">Conoce más</a></li>
			<li>Quedan pagos por cancelar. <a href="">Conoce más</a></li>
		</ul>
		<p>
			Estamos aquí para apoyarle en cada paso del proceso y resolver cualquier duda o inquietud que pueda tener.
		</p>
		<button class="btn btn-green float-left mt-2">Solicitar Ayuda</button>
	</div>
</template>
<script>
	export default {};
</script>
<style scoped>
	.container-success {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
