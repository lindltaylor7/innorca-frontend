<template>
	<div id='mis-construcciones' class='mis-construcciones'>
		<Menu :positionFixed='positionFixed' :logged='true' />
		<div class='page' v-bind:class='{ fixed: positionFixed }'>
			<div class='container'>
				<Sidebar />

				<!-- Page Content -->
				<div class='h-100 page-content'>
					<div class='box'>
						<h3 class='title mb-2'>Construcciones</h3>
						<p class='mb-3'>
							En esta sección podrás cotizar tus nuevos proyectos, estimar los costos y
						 	los materiales a utilizar.
						</p>
						<div>
							<div :class="{ 'mis-construcciones__col-2': titular==='titular' }">
								<div class='mis-construcciones__card'>
									<h2>Realiza una cotización</h2>
									<div>
										<div><img src='~assets/img/icon-money.svg' alt='' /></div>
										<div>
											<p>
												Cotiza los ambientes que deseas construir / ampliar en tu
												vivienda, y obtén el listado de materiales con precios
												aproximados.
											</p>
											<div class='mis-construcciones__buttons'>
												<nuxt-link :to="{ path: '/construcciones/nueva-cotizacion' }"
												>
													<button
														class='btn btn-green'
														@click='recordNuevaCotizacionEvent'
													>
														nueva cotización
													</button>
												</nuxt-link
												>
											</div>
										</div>
									</div>
								</div>
								<div class='mis-construcciones__card' v-if='titular==="titular"'>
									<h2>Realiza una construcción ahora mismo</h2>
									<div>
										<div><img src='~assets/img/icon-house.svg' alt='' /></div>
										<div>
											<p>
												Solicita el inicio de construcción / ampliación de vivienda en tu
												Lote Menorca. Para eso, te contactaremos con el Guardian
												Constructor y le enviaremos la información sobre tu lote /
												proyecto de construcción.
											</p>
											<div class='mis-construcciones__buttons'>
												<button
													class='btn btn-white'
													@click.prevent='openModalProject'
													v-if='checkNIF'
												>
													solicitar asesoría
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class='table__wrapper'>
							<h3 class='mb-2'>Historial de cotizaciones</h3>

							<div class='table__content m-0'>
								<div class='table__header misconstrucciones mb-2'>
									<div>Tipo de construcción</div>
									<div>Fecha tentativa</div>
									<div>Habitaciones</div>
									<div>Costo final</div>
									<div>FECHA</div>
									<div>ASESORÍA</div>
								</div>

								<template v-if='quotes.length > 0'>
									<div class='table__body misconstrucciones'>
										<div
											v-for='(quote, key) in quotes'
											:key='key'
											@click.prevent='goQuote(quote._id)'
										>
											<div>
												<div class='title'>Tipo de construcción</div>
												<div class='text'>
													<nuxt-link
														:to='{
                              path: `/construcciones/cotizacion/${quote._id}`,
                            }'
													>{{ quote.projectType }}
													</nuxt-link
													>
												</div>
											</div>
											<div>
												<div class='title'>Fecha tentativa</div>
												<div class='text'>{{ quote.startDate }}</div>
											</div>
											<div>
												<div class='title'>Habitaciones</div>
												<div class='text'>{{ quote.projects.length }}</div>
											</div>
											<div>
												<div class='title'>Costo final</div>
												<div class='text'>S/{{ quote.finalCost }}</div>
											</div>
											<div>
												<div class='title'>FECHA</div>
												<div class='text'>
													{{ $moment(quote.createdAt).format('DD/MM/YYYY HH:mm:ss') }}
												</div>
											</div>
											<div>
												<div class='title'>ASESORÍA</div>
												<div class='text'>
													<div v-if='quote.counseling'><strong>Si</strong></div>
													<div v-else>No</div>
												</div>
											</div>
										</div>
									</div>
								</template>
								<template v-else>
									<div class='text-center'>
										<strong>Aún no has generado ninguna cotización</strong>
									</div>
								</template>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<b-modal
			id='modal-proyecto'
			centered
			class='modal fade'
			tabindex='-1'
			:hide-footer='hideFooterModal'
			aria-hidden='true'
		>
			<template #modal-header='{ close }'>
				<h5 class='modal-title'>Quiero comenzar con mi proyecto</h5>
				<button type='button' aria-label='Close' class='close' @click='close()'>×</button>
			</template>
			<template>
				<div>
					<p>
						Su solicitud será enviada al Guardian Constructor, quien se pondrá en contacto
						con usted a la brevedad. Se enviará su cotización, ubicación de lote, datos de
						contacto y del financiamiento.
					</p>
					<!-- <label for="gc"
					  ><input type="checkbox" name="gc" id="gc" :value="gc" />He leído los términos
					  y acepto enviar mis datos personales a Guardían Constructor</label
					> -->
					<template>
						<div class='form-chk'>
							<b-form-checkbox
								id='gc'
								v-model='gc'
								name='gc'
								value='true'
								unchecked-value='false'
							>
								He leído
								<a href='/files/disclaimer-guardian-constructor.pdf' target='_blank'
								>los términos y condiciones</a
								>
								y acepto enviar mis datos personales a Guardían Constructor
							</b-form-checkbox>
						</div>
					</template>
				</div>
				<div class='buttons text-center mt-4'>
					<button
						class='btn btn-green'
						:class="[gc == 'true' ? '' : 'disabled']"
						@click.prevent='sendCounseling'
						id='btnGC'
					>
						Enviar
					</button>
				</div>
				<div v-if='enviado'>
					<p class='sent'>Su solictud ha sido enviada correctamente</p>
				</div>
			</template>
		</b-modal>

		<b-modal
			id='modal-proyecto-2'
			centered
			class='modal fade'
			tabindex='-1'
			:hide-footer='hideFooterModal'
			aria-hidden='true'
		>
		</b-modal>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import { mapActions, mapGetters } from 'vuex';
	import Menu from '@/components/common/Menu';
	import Sidebar from '@/components/common/Sidebar';
	import { EVENTS } from '../../core/constants/events';

	export default {
		middleware: 'auth',
		transition: 'slide-left',
		data() {
			return {
				positionFixed: true,
				successMessage: '',
				errorMessage: '',
				deudas: 0,
				page: 1,
				nextHistory: true,
				hideFooterModal: true,
				quotes: [],
				gc: false,
				enviado: false,
				checkNIF: false,
				titular: '',
			};
		},
		components: {
			Menu,
			Sidebar,
		},
		watch: {},
		computed: {
			...mapGetters({
				user: 'account/getUser',
			}),
			percentage() {
				let percentage = ((this.projectTotal - this.saldo) * 100) / this.projectTotal;
				return (Math.round(percentage * 100) / 100).toFixed(2);
			},
		},
		async mounted() {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			this.contractNum = localStorage.getItem('contract_num');
			this.projectType = localStorage.getItem('project_type');

			this.titular = localStorage.getItem("titular");

			const obj = {
				token: token,
				payload: {
					budgetCode: localStorage.getItem('budget_code'),
					projectType: localStorage.getItem('project_type'),
					contractNum: localStorage.getItem('contract_num'),
				},
			};

			await this.$store.dispatch('quote/getUserQuotes', obj).then((response) => {
				this.quotes = response.data;
			});

			await this.$store.dispatch('quote/getValidarDeudas', obj).then((response) => {
				this.deudas = response.pendingBudgets ? response.pendingBudgets.totalQuotas : 0;
			});

			await this.$store.dispatch('quote/postCheckNif', obj).then((response) => {
				this.checkNIF = response.checked;
			});
		},
		methods: {
			openModal() {
				this.refreshPaymentInfo();
				this.verifyIfCIPExist();

				setTimeout(() => {
					this.$bvModal.show('modal_pagoefectivo');
				}, 500);
			},
			openModalProject() {
				setTimeout(() => {
					if (!this.deudas) {
						this.$bvModal.show('modal-proyecto');
					} else {
						this.$bvModal.show('modal-proyecto-2');
					}
				}, 500);
			},
			closeModalProject() {
				setTimeout(() => {
					this.$bvModal.hide('modal-proyecto');
				}, 100);
			},
			goQuote(quoteId) {
				this.save({
					type: EVENTS.construcciones.clickHistorialCotizacion,
					payload: {
						cotizacionId: quoteId,
					},
				});

				this.$router.push(`/construcciones/cotizacion/${quoteId}`);
			},
			recordNuevaCotizacionEvent() {
				this.save({ db: false, type: EVENTS.construcciones.clickNuevaCotizacion });
			},
			async sendCounseling() {
				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;
				const obj = {
					token: token,
					counseling: this.gc,
					contractNum: localStorage.getItem('contract_num'),
				};
				await this.$store.dispatch('quote/postCounseling', obj).then((response) => {
					if (obj.counseling) {
						this.enviado = true;
						setTimeout(() => {
							this.$bvModal.hide('modal-proyecto');
						}, 1000);
					}
				});
			},
			...mapActions({
				save: 'metrics/save',
			}),
		},
	};
</script>
