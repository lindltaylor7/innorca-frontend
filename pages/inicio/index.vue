<template>
	<div id="mi_resumen">
		<Menu :positionFixed="positionFixed" :logged="true" />
		<div class="page" v-bind:class="{ fixed: positionFixed }">
			<div class="container">
				<Sidebar />

				<!-- Page Content -->
				<div class="h-100 page-content position-relative">
					<div class="welcome-card">
						<template v-if="gender == 'f'">
							<img class="user-female" src="~assets/img/resumen/female-mi-resumen.svg" alt="" />
						</template>
						<template v-else>
							<img class="user-male" src="~assets/img/resumen/male-mi-resumen.svg" alt="" />
						</template>

						<div></div>
						<div class="text">
							<h1 class="welcome-title">
								¡{{ gender == 'f' ? 'Bienvenida' : 'Bienvenido' }} {{ name }}!
							</h1>
							<span>
								Puedes conocer tus pagos pendientes o pagar tu próxima letra además de conocer tu deuda
								total.
							</span>
						</div>
					</div>

					<div style="padding-top: 243px">
						<div class="box">
							<h3 class="title">Mi resumen</h3>

							<div class="row">
								<div class="col-12 col-lg-6">
									<div
										v-show="loadingReferrals"
										class="card justify-content-center"
										style="height: 213.5px">
										<div class="loader-big"></div>
									</div>
									<div v-show="!loadingReferrals" class="card">
										<h3 class="card-title mb-2">¡Refiere y gana!</h3>
										<p class="mb-2">
											Recuerda que refiriendo a tus amigos y/o familiares puedes ganar hasta
											S/750.00 soles
										</p>

										<ul class="list-unstyled m-0">
											<li>
												Has referido a:
												<span class="text-orange">
													{{ referrals }}
													{{ referrals == 1 ? 'persona' : 'personas' }}
												</span>
											</li>
											<!--<li>Has cobrado: <span class="text-orange">S/ 500.00</span></li>-->
											<li class="mt-3">
												<b v-b-modal.modal-popup class="fake-link">Entérate más</b>
												de nuestras recompensas
											</li>
										</ul>

										<div class="text-right mt-3">
											<nuxt-link to="/mis-referidos" class="btn btn-green">
												Referir Ahora
											</nuxt-link>
										</div>
									</div>

									<div
										v-show="loadingPayments"
										class="card justify-content-center mt-4"
										style="height: 222px">
										<div class="loader-big"></div>
									</div>

									<div v-show="!loadingPayments" class="card mt-4">
										<h3 class="card-title mb-2">Mis últimos pagos</h3>

										<ul v-if="payments" class="latest-payments">
											<li
												style="cursor: pointer"
												@click="goToPayments()"
												v-for="(payment, index) in payments"
												:key="index">
												<div>
													<header
														v-bind:class="[
															overduePayments(payment),
															paidPayments(payment),
														]">
														<span class="middot">&middot;</span>
														<h4>
															{{ paymentStatus(payment) }}
														</h4>
													</header>
												</div>
												<div class="d-flex justify-content-between">
													<span class="date" v-if="payment.fecha_pago !== null">
														{{ $moment(payment.fecha_pago).format('DD MMMM YYYY') }}
													</span>
													<span v-else>Aún no se ha efectuado el pago</span>
													<span class="amount">
														{{
															payment.monto_pagado | currency_format(payment.moneda_venta)
														}}
													</span>
												</div>
											</li>
										</ul>
									</div>

									<div
										v-show="loadingTickets"
										class="card justify-content-center mt-4"
										style="height: 259px">
										<div class="loader-big"></div>
									</div>

									<div v-show="!loadingTickets" class="card mt-4">
										<div class="d-flex justify-content-between mb-2">
											<div>
												<h3 class="card-title">Atención al cliente</h3>
											</div>
											<div>
												<span style="text-decoration: underline; font-size: 12px">
													<nuxt-link to="/atencion-al-cliente"> VER MÁS </nuxt-link>
												</span>
											</div>
										</div>

										<ul class="latest-tickets" v-if="tickets && tickets.length > 0">
											<li
												style="cursor: pointer"
												@click="goToDetail(ticket.id)"
												v-for="ticket in tickets.slice(0, 3)"
												:key="ticket.id">
												<div>
													<header
														v-bind:style="{
															color: ticket.status.code.secondaryColor,
														}">
														<span class="middot">&middot;</span>
														<h4>
															{{ ticket.status.code.name }}
														</h4>
													</header>
												</div>
												<div class="d-flex justify-content-between">
													<span class="detail">{{ ticket.detail }}</span>
													<span class="amount">
														<img src="~assets/img/arrow-right-green.png" alt="" />
													</span>
												</div>
											</li>
										</ul>
										<ul class="latest-payments" v-else>
											<li>No existen tickets para este usuario</li>
										</ul>
									</div>
								</div>

								<div class="col-12 col-lg-6 mt-4 mt-lg-0">
									<div
										v-show="loadingPaymentInfo"
										class="card justify-content-center"
										style="height: 271px">
										<div class="loader-big"></div>
									</div>

									<div v-show="!loadingPaymentInfo" class="card">
										<h3 class="card-title mb-2">Mi próxima letra a pagar</h3>

										<div class="info next-payment mb-2">
											<div>
												<h3 class="info-title mb-0">PRÓXIMO VENCIMIENTO</h3>
												<span class="info-value">
													{{
														nextPendingBudget
															? nextPendingBudget.formattedExpiresAt
															: '$0.00'
													}}
												</span>
												<br />
											</div>
											<div class="text-right">
												<span class="info-value green">
													{{ nextPendingBudget ? nextPendingBudget.formattedSaldo : '$0.00' }}
												</span>
												<br />
												<img
													height="15px"
													:srcset="
														this.iconSourceset(
															manualPendingBudgets ? manualPendingBudgets.icon : ''
														)
													"
													alt="" />
												<br />
												<span style="text-decoration: underline">
													<a
														:href="
															manualPendingBudgets
																? manualPendingBudgets.manualLink
																: 'javascript:void(0)'
														"
														target="_blank">
														Guía de pago
													</a>
												</span>
											</div>
										</div>

										<div class="info pending-payment m-0">
											<div class="text-center">
												<h3 class="info-title mb-2">
													{{ deudas ? 'TIENE DEUDAS' : 'NO TIENE DEUDAS' }}
												</h3>
												<div class="info-value" v-if="deudas < 3 && deudas !== 0">
													<img width="56px" src="~assets/img/faces/poker-face.svg" />
												</div>
												<div class="info-value" v-if="deudas >= 3 && deudas !== 0">
													<img width="56px" src="~assets/img/faces/sad-face.svg" />
												</div>
												<div class="info-value" v-if="deudas == 0">
													<img width="56px" src="~assets/img/faces/happy-face.svg" />
												</div>

												<router-link to="/mis-pagos" class="fake-link mt-2">
													Ver mis deudas
												</router-link>
											</div>
											<!-- <div class="d-flex align-items-end" v-if="percentage != 100">
												<div class="text-right mt-0 mt-lg-2">
													<b
														class="d-block mb-1"
														style="font-size: 11px; font-weight: 700; color: #000000">
														Puedes pagar ahora con
													</b>

													<nuxt-link to="/mis-pagos?pe=ok" class="btn-pago-efectivo d-block">
														<img
															src="~assets/img/pago-efectivo-logo.svg"
															alt="Botón Pago Efectivo" />
													</nuxt-link>
												</div>
											</div> -->
										</div>
									</div>

									<div
										v-show="loadingPaymentProgress"
										class="card justify-content-center mt-4"
										style="height: 161px">
										<div class="loader-big"></div>
									</div>

									<div v-show="!loadingPaymentProgress" class="card justify-content-between mt-4">
										<div class="account-progress">
											<div class="d-flex justify-content-between aling-items-center mb-3">
												<div>
													<h3 class="card-title">Progreso de pago</h3>
												</div>
												<div class="card-aux">
													<template v-if="completedQuotes"> {{ percentage }}%</template>
												</div>
											</div>

											<div class="card-progress mb-3">
												<i :style="'width:' + percentage + '%'"></i>
											</div>

											<div class="info info-progress mb-2">
												<div>
													<h3 class="info-title mb-0 mb-lg-2">Abonado a la fecha:</h3>
													<span class="info-value">
														{{ formattedTotalAmount }}
													</span>
													<img
														src="~assets/img/info-icon.svg"
														v-b-tooltip.hover.top="'El importe incluye capital e intereses'"
														style="vertical-align: baseline" />
												</div>
												<div>
													<h3 class="info-title justify-content-end mb-0 mb-lg-2">
														Monto total:
													</h3>
													<span class="info-value">
														{{ formattedProjectTotal }}
													</span>
													<img
														src="~assets/img/info-icon.svg"
														v-b-tooltip.hover.top="'El importe incluye capital e intereses'"
														style="vertical-align: baseline" />
												</div>
											</div>

											<div class="info mb-0">
												<div>
													<small class="mt-0">
														Última actualización
														{{ $moment(lastUpdate).format('DD/MM/YYYY') }}
													</small>
												</div>

												<div class="text-right">
													<small class="mt-0">
														{{ completedQuotes }} /
														{{ pendingQuotes }}
														cuotas pagadas
													</small>
												</div>
											</div>
										</div>
									</div>

									<div
										v-show="loadingPropertyState"
										class="card justify-content-center mt-4"
										style="height: 161px">
										<div class="loader-big"></div>
									</div>

									<div v-show="!loadingPropertyState" class="card mt-4">
										<div class="info project-status">
											<div class="text align-self-start">
												<div>
													<h3 class="card-title mb-2">Estado de mi inmueble</h3>
													<div style="line-height: 1.5">
														Gracias por confiar en nosotros, el estado actual es:
														<strong>{{ propertyStatus }}</strong>
													</div>
												</div>

												<span style="text-decoration: underline" class="mt-1">
													<nuxt-link to="/mis-inmuebles"> Ver mis inmuebles </nuxt-link>
												</span>
											</div>
											<div class="image">
												<img
													:srcset="
														this.propertySourceset(
															propertyImage ? propertyImage : 'paso-entrega-proyecto.png'
														)
													" />
												<h4>
													{{ propertyStatus ? propertyStatus : 'Firma del contrato' }}
												</h4>
											</div>
										</div>
									</div>

									<div class="card mt-4 frequent-questions">
										<div class="d-flex justify-content-between align-items-center mb-2">
											<div>
												<h3 class="card-title">Preguntas frecuentes</h3>
											</div>
											<div>
												<span style="text-decoration: underline; font-size: 12px">
													<nuxt-link to="/preguntas-frecuentes"> VER MÁS </nuxt-link>
												</span>
											</div>
										</div>

										<Accordion
											v-for="question in questions"
											:title="question.question"
											:key="question.id">
											<div v-html="question.answer"></div>
										</Accordion>
									</div>
								</div>
							</div>

							<hr />

							<div class="d-flex justify-content-between">
								<div>
									<h3 class="title" style="font-size: 19px; margin-bottom: 20px">Novedades</h3>
								</div>
								<div>
									<span style="text-decoration: underline; font-size: 12px">
										<nuxt-link to="/noticias">VER MÁS NOVEDADES</nuxt-link>
									</span>
								</div>
							</div>

							<!-- posts -->
							<div class="news mt-2" v-if="posts">
								<div class="news__item" v-for="post in posts" :key="post.id">
									<div class="post">
										<img :src="post.image" alt="" />

										<div class="body">
											<h4>{{ post.title }}</h4>
											<!-- <span class="time">
											  {{ $moment(post.updatedAt).format("DD/MM/YYYY") }}
											</span> -->

											<p v-html="post.content.split(' ').slice(0, 30).join(' ') + '...'"></p>

											<nuxt-link :to="'/noticias/post/' + post._id" class="see-more">
												Ver más
											</nuxt-link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<b-modal
			id="modal-popup"
			centered
			class="modal fade"
			size="lg"
			tabindex="-1"
			:hide-footer="true"
			aria-hidden="true">
			<template #modal-header="{ close }">
				<button type="button" aria-label="Close" class="close" @click="close">×</button>
			</template>

			<div class="modal-form">
				<template>
					<img class="img-fluid" src="~/assets/img/resumen/popup.png" alt="" />
				</template>
			</div>
		</b-modal>
		<ReferralAdvertisingModal />
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import { mapGetters } from 'vuex';
	import Menu from '@/components/common/Menu';
	import Sidebar from '@/components/common/Sidebar';
	import Accordion from '@/components/common/Accordion';
	import ReferralAdvertisingModal from '../../components/modals/ReferralAdvertisingModal.vue';

	export default {
		middleware: 'auth',
		transition: 'slide-left',
		data() {
			return {
				name: '',
				gender: '',
				positionFixed: true,
				loadingGeneralInfo: true,
				questions: [
					{
						id: 1,
						question: '¿Cuándo es la fecha de pago de las letras?',
						answer: 'La fecha de pago de las letras, se verifican en el cronograma que se encuentra adjunto a su contrato/compromiso.',
					},
					{
						id: 2,
						question: '¿Cuáles son los requisitos para realizar una cesión?',
						answer: '<p style="padding-left: 40px;">Requisitos</p><ul><li>La cesión procederá siempre y cuando, no se hayan cumplido lo siguientes requisitos de manera conjunta:<ol><li>La independización registral de la etapa en donde se encuentre el Lote.</li><li>La cancelación del saldo precio de venta.</li></ol></li><li>Se debe presentar una copia del DNI vigente del cedente (propietario) y del cesionario (tercero interesado en adquirir propiedad).</li><li>El cliente que realiza la solicitud de cesión debe estar al día en sus pagos.</li><li>La ficha de cesión brindada por Menorca debe estar firmada por el cedente y el cesionario (Es requisito indispensable que se proceda con la firma del contato de cesión, la solicitud aceptada no acredita el otorgamiento de la cesión).</li><li>El cesionario debe completar la ficha de conocimiento del cliente, la cual será brindada por Menorca.</li><li>El cesionario debe presentar 2 recibos de servicios (por ejemplo: agua, luz, telefonia fija, etc.).</li><li>Otros documentos que solicite la empresa en el proceso de evaluación.</li><li>El costo será según el tarifario vigente.</li><li>En caso el cesionario tenga el estado civil de casado:<ol><li>Debe presentar la copia certificada de la partida de matrimonio emitida por Reniec o el acta de matrimonio emitida por la Municipalidad.</li><li>En caso el cesionario tenga el estado civil de casado pero con separación de patrimonios: Debe presentar la copia certificada de la partida de matrimonio emitida por Reniec o el acta de matrimonio emitida por la Municipalidad y adicionalmente deberá presentar la copia literal de la inscripción de la separación de patrimonios emitida por Registros Públicos.</li></ol></li><li>En caso el cesionario tenga el estado civil sea divorciado: Debe presentar la copia literal de la inscripción del divorcio emitida por Registros Públicos.</li></ul>',
					},
					{
						id: 3,
						question: '¿Cuáles son los requisitos para realizar un refinanciamiento?',
						answer: '<ul>Requisitos:<li>El cliente debe presentear una copia del DNI vigente de todos los titulares.</li><li>El cliente debe estar al día en los pagos.</li><li>El trámite se solicita como mínimo con 15 días hábiles antes del próximo vencimiento de letra.</li><li>Se debe completar la solicitud simple de refinanciamiento brindada por Menorca.</li><li>Si el proceso es aceptado, el cliente deberá firmar las nuevas letras y la adenda que contenga el refinanciamiento (es requisito indispensable que se proceda con la firma de la adenda y las nuevas letras, la solicitud aceptada no acredita el otorgamiento del refinanciamento).</li><li>El costo será según el tarifario vigente. Cabe aclarar, que a este monto se le tendrá que sumar los costos de retiro de letras, que son variables en función al caso.</li><li>Si junto al refinanciamiento no amortiza su deuda (sujeto a variación según el tarifario vigente):<ol><li>Para el caso del contrato el costo de este trámite asciende a $300.00 dólares americanos.</li><li>Para el caso del compromiso el costo asciende a $200.00 dólares americanos. Cabe aclarar, que a estos montos se le tendrá que sumar los costos de retiro de letras, que son variables en función al caso.</li></ol></li></ul>',
					},
				],
				deudas: 0,
				loadingPaymentInfo: true,
				loadingPaymentProgress: true,
				loadingPayments: true,
				loadingTickets: true,
				loadingReferrals: true,
				loadingPropertyState: true,
				titular: '',
			};
		},
		components: {
			Menu,
			Sidebar,
			Accordion,
			ReferralAdvertisingModal,
		},
		watch: {
			pendingBudgets(newObj) {
				if (typeof newObj !== 'undefined') {
					this.deudas = newObj.totalQuotas;
				} else {
					this.deudas = 0;
				}
			},
		},
		computed: {
			...mapGetters({
				pendingBudgets: 'dashboard/getPendingBudgets',
				nextPendingBudget: 'dashboard/getNextPendingBudget',
				manualPendingBudgets: 'dashboard/getManualPendingBudgets',
				manualNextPendingBudget: 'dashboard/getManualNextPendingBudget',
				completedQuotes: 'dashboard/getCompletedQuotes',
				pendingQuotes: 'dashboard/getPendingQuotes',
				saldo: 'dashboard/getSaldo',
				totalAmount: 'dashboard/getTotalAmount',
				projectTotal: 'dashboard/getProjectTotal',
				formattedTotalAmount: 'dashboard/getFormattedTotalAmount',
				formattedProjectTotal: 'dashboard/getFormattedProjectTotal',
				propertyImage: 'dashboard/getPropertyImage',
				propertyStatus: 'dashboard/getPropertyStatus',
				propertyContent: 'dashboard/getPropertyContent',
				payments: 'dashboard/getLastThreePayments',
				tickets: 'dashboard/getLastThreeTickets',
				referrals: 'dashboard/getReferrals',
				posts: 'dashboard/getPosts',
				budgets: 'property/getBudgets',
				lastUpdate: 'dashboard/getLastUpdate',
			}),
			percentage() {
				let percentage = (this.totalAmount * 100) / this.projectTotal;
				return (Math.round(percentage * 100) / 100).toFixed(2);
			},
		},
		async mounted() {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			this.titular = localStorage.getItem('titular');

			if (
				localStorage.getItem('budget_code') === null &&
				localStorage.getItem('project_type') === null &&
				localStorage.getItem('contract_num') === null &&
				localStorage.getItem('budget_id') === null &&
				localStorage.getItem('project_id') === null &&
				localStorage.getItem('project_name') === null
			) {
				await this.$store.dispatch('property/fetchBudgets', { token }).then((response) => {
					localStorage.setItem('budget_id', this.budgets[0].id);
					localStorage.setItem('budget_code', this.budgets[0].code);
					localStorage.setItem('project_id', this.budgets[0].project_id);
					localStorage.setItem('project_name', this.budgets[0].project.name);
					localStorage.setItem('project_type', this.budgets[0].project.projectType);
					localStorage.setItem('contract_num', this.budgets[0].contract_num);
					localStorage.setItem('unit_code', this.budgets[0].unit_code);

					localStorage.setItem('etapa', this.budgets[0].etapa);
					localStorage.setItem('manzana', this.budgets[0].manzana);
					localStorage.setItem('lote', this.budgets[0].lote);
				});
			}

			if (this.budgets) {
				const obj = {
					token: token,
					payload: {
						budgetCode: localStorage.getItem('budget_code'),
						projectType: localStorage.getItem('project_type'),
					},
				};

				const obj2 = {
					token: token,
					payload: {
						budgetCode: localStorage.getItem('budget_code'),
						contractNum: localStorage.getItem('contract_num'),
					},
				};

				await this.$store.dispatch('account/getUserAccount', { token }).then((response) => {
					console.log('account/getUserAccount', response);
					this.name = response.data.profile.name;
					this.gender = response.gender;
				});

				this.$store.dispatch('dashboard/fetchLastThreePayments', obj).then(() => {
					this.loadingPayments = false;
				});

				this.$store.dispatch('dashboard/fetchLastThreeTickets', obj).then(() => {
					this.loadingTickets = false;
				});

				this.$store.dispatch('dashboard/fetchReferrals', obj).then(() => {
					this.loadingReferrals = false;
				});

				this.$store.dispatch('dashboard/fetchPaymentInfo', obj).then(() => {
					this.loadingPaymentInfo = false;
				});

				this.$store.dispatch('dashboard/fetchProgress', obj).then(() => {
					this.loadingPaymentProgress = false;
				});

				this.$store.dispatch('dashboard/fetchPropertyState', obj2).then(() => {
					this.loadingPropertyState = false;
				});

				this.$store.dispatch('dashboard/fetchNews', obj).then(() => {
					//this.loadingPropertyState = false;
				});
			}
		},
		methods: {
			goToPayments() {
				this.$router.push('/mis-pagos');
			},
			goToDetail(id) {
				this.$router.push('/atencion-al-cliente/detalle/' + id);
			},
			propertySourceset(icon) {
				try {
					if (typeof icon !== 'undefined') {
						return `${require('~/assets/img/properties/' + icon)}`;
					}
				} catch (error) {
					//console.log('error', error);
				}
			},
			iconSourceset(icon) {
				try {
					if (typeof icon !== 'undefined') {
						return `${require('~/assets/img/icons/' + icon)}`;
					}
				} catch (error) {}
			},
			paymentStatus(payment) {
				if (payment.monto_pagado > 0) {
					return 'Pagado';
				} else if (payment.saldo > 0) {
					return 'Vencida';
				}
			},
			paidPayments(payment) {
				return payment.monto_pagado > 0 ? 'pagada' : '';
			},
			overduePayments(payment) {
				return payment.saldo > 0 ? 'vencida' : '';
			},
		},
	};
</script>

<style lang="scss" scoped>
	.welcome-title {
		font-size: 18px !important;
	}

	.pending-payment {
		.fake-link {
			display: block;
			font-size: 12px;
		}
	}
</style>
