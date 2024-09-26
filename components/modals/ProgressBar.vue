<template>
	<div class="modal-form">
		<h5 class="modal-title">Solicitud de Minuta</h5>
		<h6>Documentos Requeridos</h6>
		<HorizontalCircles />
		<table>
			<tbody>
				<tr>
					<th><p>Consulta y registro de solicitud</p></th>
					<th></th>
				</tr>
				<tr>
					<th><p>Validación de la documentación solicitada</p></th>
					<th></th>
				</tr>
				<tr>
					<th><p>Proceso de elaboración de minuta</p></th>
					<th></th>
				</tr>
				<tr>
					<th><p>Minuta se encuentra en Oficina central</p></th>
					<th></th>
				</tr>
			</tbody>
		</table>
		<hr />
		<button class="btn btn-green">Continuar</button>
		<button class="btn btn-secondary">Enviar mensaje</button>
	</div>
</template>
<script>
	import HorizontalCircles from './HorizontalCircles.vue';
	export default {
		components: { HorizontalCircles },
		data() {
			return {
				progress: 40,
				documentos: [
					{ name: 'Consulta y registro de solicitud', status: 'checked' },
					{ name: 'Validación de la documentación solicitada', status: 'unchecked' },
					{ name: 'Proceso de elaboración de minuta', status: 'unchecked' },
					{ name: 'Minuta se encuentra en Oficina central', status: 'unchecked' },
				],
			};
		},
	};
</script>
<style scoped>
	h6 {
		font-size: 20px;
		font-weight: 900 !important;
		color: gray;
	}

	th p {
		font-weight: normal !important;
	}
</style>
