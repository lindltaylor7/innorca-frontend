<template>
	<div id="mis_pagos">
		<Menu :positionFixed="positionFixed" :logged="true" />
		<div class="page" v-bind:class="{ fixed: positionFixed }">
			<div class="container">
				<Sidebar />

				<!-- Page Content -->
				<div class="h-100 page-content">
					<div class="box">
						<h3 class="title">Mis pagos</h3>

						<div class="row">
							<div class="col-lg-6">
								<div v-show="loadingGeneralInfo" class="card justify-content-center">
									<div class="loader-big"></div>
								</div>

								<div v-show="!loadingGeneralInfo" class="card">
									<h3 class="card-title mb-2">Información general</h3>

									<div class="info">
										<div>
											<h3 class="info-title">NÚMERO DE CONTRATO</h3>
											<span class="info-value">{{ contractNum }}</span>
											<img
												src="~assets/img/info-icon.svg"
												v-b-tooltip.hover.top="'Código asignado'"
												style="vertical-align: baseline" />
										</div>
										<div>
											<h3 class="info-title">TIPO DE PROYECTO</h3>
											<span class="info-value">{{ projectType }}</span>
										</div>
										<div class="text-center">
											<h3 class="info-title">
												{{ deudas ? 'TIENE DEUDAS' : 'NO TIENE DEUDAS' }}
											</h3>
											<span class="info-value" v-show="deudas < 3 && deudas !== 0"
												><img width="78px" src="~assets/img/faces/poker-face.svg"
											/></span>
											<span class="info-value" v-show="deudas >= 3 && deudas !== 0"
												><img width="78px" src="~assets/img/faces/sad-face.svg"
											/></span>
											<span class="info-value" v-show="deudas == 0"
												><img width="78px" src="~assets/img/faces/happy-face.svg"
											/></span>
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-6 mt-4 mt-lg-0">
								<div v-show="loadingPaymentProgress" class="card justify-content-center">
									<div class="loader-big"></div>
								</div>

								<div v-show="!loadingPaymentProgress" class="card justify-content-between">
									<div class="d-flex justify-content-between mb-2">
										<div>
											<h3 class="card-title">Progreso de pago</h3>
										</div>
										<div class="card-aux">
											<template v-if="completedQuotes"> {{ percentage }}% </template>
										</div>
									</div>

									<div class="card-progress mb-2">
										<i :style="'width:' + percentage + '%'"></i>
									</div>

									<div class="info info-progress mb-2">
										<div>
											<h3 class="info-title m-0">Abonado a la fecha:</h3>
											<span class="info-value">{{ formattedTotalAmount }}</span>
											<img
												src="~assets/img/info-icon.svg"
												v-b-tooltip.hover.top="'El importe incluye capital e intereses'"
												style="vertical-align: baseline" />
										</div>
										<div>
											<h3 class="info-title m-0 d-block text-right">Monto total:</h3>
											<span class="info-value">{{ formattedProjectTotal }}</span>
											<img
												src="~assets/img/info-icon.svg"
												v-b-tooltip.hover.top="'El importe incluye capital e intereses'"
												style="vertical-align: baseline" />
										</div>
									</div>

									<div class="info">
										<div>
											<small class="m-0"
												>Última actualización
												{{ $moment(lastUpdate).format('DD/MM/YYYY') }}</small
											>
										</div>

										<div>
											<small class="text-right m-0"
												>{{ completedQuotes }} / {{ pendingQuotes }} cuotas pagadas</small
											>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="row mt-4" v-if="percentage != 100">
							<div class="col-12">
								<div v-show="loadingGeneralInfo" class="card justify-content-center">
									<div class="loader-big"></div>
								</div>

								<div v-show="!loadingGeneralInfo" class="card">
									<div class="row">
										<div class="col-12 col-lg-6">
											<h3 class="card-title mb-2">Información de pago</h3>

											<div class="info info-payment" style="max-width: 315px">
												<div>
													<h3 class="info-title mb-2">DEUDA VENCIDA</h3>
													<span class="info-value mb-2 d-block">{{
														pendingBudgets ? pendingBudgets.formattedSaldo : '$0.00'
													}}</span>
													<img
														class="mb-2"
														height="15px"
														:srcset="
															this.iconSourceset(
																manualPendingBudgets ? manualPendingBudgets.icon : ''
															)
														"
														alt="" />
													<div class="mb-2">
														<span style="text-decoration: underline"
															><a
																:href="
																	manualPendingBudgets
																		? manualPendingBudgets.manualLink
																		: 'javascript:void(0)'
																"
																target="_blank"
																>Guía de pago</a
															></span
														>
													</div>
													<template>
														<b>{{
															pendingBudgets
																? pendingBudgets.totalQuotas == 1
																	? pendingBudgets.totalQuotas + ' Cuota'
																	: pendingBudgets.totalQuotas + ' Cuotas'
																: '0 Cuotas'
														}}</b>
														<img
															src="~assets/img/info-icon.svg"
															v-b-tooltip.hover.top="'Número de cuotas vencidas'" />
													</template>
												</div>
												<div>
													<h3 class="info-title mb-2">PRÓXIMA CUOTA</h3>
													<span class="info-value mb-2 d-block">{{
														nextPendingBudget ? nextPendingBudget.formattedSaldo : '$0.00'
													}}</span>
													<img
														class="mb-2"
														height="15px"
														:srcset="
															this.iconSourceset(
																manualPendingBudgets ? manualPendingBudgets.icon : ''
															)
														"
														alt="" />
													<div class="mb-2">
														<span style="text-decoration: underline"
															><a
																:href="
																	manualPendingBudgets
																		? manualPendingBudgets.manualLink
																		: 'javascript:void(0)'
																"
																target="_blank"
																>Guía de pago</a
															></span
														>
													</div>
													<b>{{
														nextPendingBudget ? nextPendingBudget.formattedExpiresAt : '---'
													}}</b>
												</div>
											</div>
										</div>
										<hr
											style="width: 100%; margin-left: 20px; margin-right: 20px"
											class="d-lg-none" />
										<!-- <div class="col-12 col-lg-6 mt-3 mt-lg-0">
                      <h3 class="card-title mb-2">Realizar pago</h3>
                      <p>¡Paga fácilmente con PagoEfectivo, estés donde estés!</p>

                      <div class="float-right mt-0 mt-lg-5">
                        <b>Pagar con</b>
                        <button @click="openModal" class="btn-pago-efectivo ml-2">
                          <img
                            src="~assets/img/pago-efectivo-logo.svg"
                            alt="Botón Pago Efectivo"
                          />
                        </button>
                      </div>
                    </div> -->
									</div>
								</div>
							</div>
						</div>

						<div id="sac_section" class="row mt-4" v-if="titular === 'titular'">
							<div class="col-12">
								<div class="card sm-card">
									<div class="row">
										<div class="col-12 col-lg-8">
											<h3 class="card-title mb-2">
												¿Tienes dificultades para pagar, y necesitas ayuda?
											</h3>
											<p>
												Ingrese al siguiente enlace y una de nuestras ejecutivas especializadas
												estara gustosa de atender sus consultas
											</p>
										</div>
										<div
											class="col-12 col-lg-4"
											style="display: flex; justify-content: end; align-items: end">
											<div class="float-right mt-4">
												<nuxt-link to="/atencion-al-cliente?ref=1" class="btn btn-white"
													>SOLICITAR ATENCIÓN</nuxt-link
												>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="row mt-4">
							<div class="col-12">
								<div v-show="loadingPaymentHistory" class="card justify-content-center">
									<div class="loader-big"></div>
								</div>

								<div v-show="!loadingPaymentHistory" class="card">
									<!--<table id="historial_pagos" class="table">
                                        <thead>
                                            <tr>
                                            <th scope="col"># LETRA</th>
                                            <th scope="col"># Cuota</th>
                                            <th scope="col">interés vencido</th>
                                            <th scope="col">mora</th>
                                            <th scope="col">total a pagar <img src="~assets/img/info-icon.svg" v-b-tooltip.hover.top="'Se considera valor de cuota, interés vencido, mora y descuento'"></th>
                                            <th scope="col">fecha de vcto.</th>
                                            <th scope="col">pagado</th>
                                            <th scope="col">saldo</th>
                                            <th scope="col">fecha de pago</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-bind:class="[overduePayments(payment), paidPayments(payment)]" v-for="payment in historyPayments" :key="payment.id">
                                                <td>{{ payment.nombre }}</td>
                                                <td>{{ (payment.moneda_venta == 'USD')? '$'+payment.monto_programado : 'S/'+payment.monto_programado }}</td>
                                                <td>{{ (payment.moneda_venta == 'USD')? '$'+payment.interes_vencido : 'S/'+payment.interes_vencido }}</td>
                                                <td>{{ (payment.moneda_venta == 'USD')? '$'+payment.mora : 'S/'+payment.mora }}</td>
                                                <td>{{ (payment.moneda_venta == 'USD')? '$'+( (parseFloat(payment.monto_programado) - parseFloat(payment.descuento)) +parseFloat(payment.interes_vencido)+parseFloat(payment.mora)).toFixed(2) : 'S/'+(parseFloat(payment.monto_programado)+parseFloat(payment.mora)).toFixed(2) }} </td>
                                                <td>{{ $moment(payment.fecha_vcto).format('DD/MM/YYYY') }}</td>
                                                <td>{{ (payment.moneda_venta == 'USD')? '$'+payment.monto_pagado : 'S/'+payment.monto_pagado }}</td>
                                                <td>{{ (payment.moneda_venta == 'USD')? '$'+payment.saldo : 'S/'+payment.saldo }}</td>
                                                <td>{{ (payment.fecha_pago) ? $moment(payment.fecha_pago).format('DD/MM/YYYY') : '--' }}</td>
                                            </tr>
                                            <tr v-if="nextHistory">
                                                <td colspan="9" @click="fetchMoreHistoryPayments()" style="cursor: pointer;">
                                                    <span class="see-more">VER MÁS</span> <div v-show="loadingFetchMorePaymentHistory" class="loader mt-2"></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>-->

									<div class="table">
										<div class="bar d-flex justify-content-between">
											<h3 class="card-title mb-2">Historial de pagos</h3>
											<b-dropdown :text="buttonTitle" variant="warning" class="dropdown-payment">
												<b-dropdown-item href="#" @click.prevent="filterPayments('all')"
													>Todos los estados</b-dropdown-item
												>
												<b-dropdown-item href="#" @click.prevent="filterPayments('completed')"
													>Completado</b-dropdown-item
												>
												<b-dropdown-item href="#" @click.prevent="filterPayments('pending')"
													>Pendiente</b-dropdown-item
												>
												<b-dropdown-item href="#" @click.prevent="filterPayments('expired')"
													>Expirado</b-dropdown-item
												>
											</b-dropdown>
										</div>

										<div class="table__header mis-pagos">
											<div># LETRA</div>
											<div># Cuota</div>
											<div>interés vencido</div>
											<div>mora</div>
											<div>
												total a pagar
												<img
													class="ml-2"
													src="~assets/img/info-icon.svg"
													v-b-tooltip.hover.top="
														'Se considera valor de cuota, interés vencido, mora y descuento'
													" />
											</div>
											<div>fecha de vcto.</div>
											<div>pagado</div>
											<div>saldo</div>
											<div>fecha de pago</div>
										</div>
										<div class="table__body mis-pagos">
											<div
												v-bind:class="[overduePayments(payment), paidPayments(payment)]"
												v-for="payment in historyPayments"
												:key="payment.id">
												<div>
													<span># LETRA</span>
													{{ payment.nombre }}
												</div>
												<div>
													<span># Cuota</span>
													{{
														payment.monto_programado | currency_format(payment.moneda_venta)
													}}
												</div>
												<div>
													<span>interés vencido</span>
													{{
														payment.interes_vencido | currency_format(payment.moneda_venta)
													}}
												</div>
												<div>
													<span>mora</span>
													{{ payment.mora | currency_format(payment.moneda_venta) }}
												</div>

												<div v-if="payment.moneda_venta == 'USD'">
													<span>total a pagar</span>
													{{
														(
															parseFloat(payment.monto_programado) -
															parseFloat(payment.descuento) +
															parseFloat(payment.interes_vencido) +
															parseFloat(payment.mora)
														).toFixed(2) | currency_format
													}}
												</div>
												<div v-else>
													<span>total a pagar</span>
													{{
														(
															parseFloat(payment.monto_programado) +
															parseFloat(payment.mora)
														).toFixed(2) | currency_format('PEN')
													}}
												</div>
												<div>
													<span>fecha de vcto.</span>
													{{ $moment(payment.fecha_vcto).format('DD/MM/YYYY') }}
												</div>
												<div>
													<span>pagado</span>
													{{ payment.monto_pagado | currency_format(payment.moneda_venta) }}
												</div>
												<div>
													<span>saldo</span>
													{{ payment.saldo | currency_format(payment.moneda_venta) }}
												</div>
												<div>
													<span>fecha de pago</span>
													{{
														payment.fecha_pago
															? $moment(payment.fecha_pago).format('DD/MM/YYYY')
															: '--'
													}}
												</div>
											</div>
										</div>
										<div class="table__footer"></div>

										<div v-if="nextHistory" class="text-center mt-3">
											<div @click="fetchMoreHistoryPayments()" style="cursor: pointer">
												<span
													class="see-more"
													:class="{ loading: loadingFetchMorePaymentHistory }"
													>VER MÁS</span
												>
											</div>
										</div>
									</div>

									<!--<small class="last-update">Última actualización 10/02/2022</small>-->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<b-modal
			id="modal_pagoefectivo"
			centered
			class="modal fade"
			tabindex="-1"
			:hide-footer="hideFooterModal"
			aria-hidden="true">
			<template #modal-header="{ close }">
				<h5 class="modal-title">Pagar por PagoEfectivo</h5>
				<button type="button" aria-label="Close" class="close" @click="close()">×</button>
			</template>

			<div class="pagoEfectivoDiv" v-if="pendingBudgets">
				<template v-if="cipState">
					<!--<div class="detail-pending-payments mt-4 text-center">
                        <p class="mb-2" style="font-size: 15px">Datos de código de pago (CIP) </p>

                        Codigo de pago (CIP): {{ existingCip.cip }}<br>
                        Total a pagar: {{ existingCip.formattedPayAmount }}<br>
                        Cantidad de letras: {{ existingCip.quantity }}<br>
                        Moneda: {{ existingCip.paymentIn }}<br>
                        Fecha de expiracion: {{ $moment(existingCip.formattedExpiresAt).format('MM/DD/YYYY HH:mm a') }}<br>

                        <br><br>
                        <button @click="generateCodeFromCIPState" class="btn btn-green">Generar Otro Código</button>
                    </div>-->

					<div class="finaliza-pago">
						<p class="mb-0 mr-3">Finaliza tu pago con:</p>
						<img src="~assets/img/logo-pagoefectivo.svg" /><br />
					</div>
					<div class="d-flex justify-content-center mt-3">
						<p class="mb-0 mr-3">Tipo de proyecto: <b>Menorca Lotes</b></p>
						<p class="mb-0 mr-3">
							Tipo de moneda:
							<b>{{ existingCip.paymentIn == 'USD' ? 'Dólares' : 'Soles' }}</b>
						</p>
					</div>

					<div class="cip-box">
						<ul>
							<li>
								<div class="cip-item">
									<div class="code">
										<h3>Código de pago (CIP)</h3>
										<span class="code-number">{{ existingCip.cip }}</span>
									</div>

									<div class="copy">
										<button class="btn btn-white" @click="copyCode(existingCip.cip)">
											<img src="~assets/img/icons/copy-icon.svg" alt="Copiar CIP" />
											COPIAR
										</button>
										<b-tooltip ref="tooltip" target="tooltip-button-show-event">
											Hello <strong>World!</strong>
										</b-tooltip>
									</div>

									<div class="amount">
										<h3>Monto a pagar</h3>
										<span>{{ existingCip.formattedPayAmount }}</span>
									</div>
								</div>
							</li>
						</ul>
					</div>

					<div class="due-date">
						<p class="m-0">
							<img src="~assets/img/icons/clock-icon.svg" alt="Reloj" /> Págalo antes del
							{{ existingCip.formattedExpiresAt }}
						</p>
					</div>

					<div class="share-code">
						<h3>Comparte tu código CIP por SMS</h3>

						<div>
							<input id="cellphone" v-model="cellphone" type="text" required="required" />
							<label for="cellphone" placeholder="Número de celular"></label>
						</div>

						<button @click="sendSMSCode(existingCip.cip)" class="btn btn-green">enviar cip por sms</button>
						<button @click="generateCodeFromCIPState" class="btn btn-green mt-4">
							Generar Otro Código
						</button>

						<div class="response-message" v-show="sendSMSCodeResponse">
							Tu código de pago (CIP) fue enviado al {{ cellphone }}
						</div>
					</div>

					<div class="banks">
						<h3>Puedes pagar en:</h3>
						<div class="banks-area">
							<img src="~assets/img/banks/bbva.svg" class="img-fluid" />
							<img src="~assets/img/banks/bcp.svg" class="img-fluid" />
							<img src="~assets/img/banks/interbank.svg" class="img-fluid" />

							<img src="~assets/img/banks/cajaarequipa.svg" class="img-fluid" />
							<img src="~assets/img/banks/scotiabank.svg" class="img-fluid" />
							<img src="~assets/img/banks/banbif.svg" class="img-fluid" />

							<img src="~assets/img/banks/westernunion.svg" class="img-fluid" />
							<img src="~assets/img/banks/bancopichincha.svg" class="img-fluid" />
							<img src="~assets/img/banks/moneygram.svg" class="img-fluid" />
						</div>
					</div>
				</template>

				<template v-else-if="step1">
					<div class="past-pending-payments my-5" v-if="!allPendingPayments.length">
						<div class="loader-big"></div>
					</div>

					<div class="past-pending-payments" v-if="allPendingPayments.length">
						<p class="mb-1">Está por pagar esta letra*</p>

						<b-form-checkbox-group
							class="checkbox-user-payment"
							:options="allPendingPayments"
							v-model="selectedUserPayments">
						</b-form-checkbox-group>

						<div class="detail-pending-payments mt-4">
							<p class="mb-1">Detalle de pago(s) seleccionado(s)</p>
							<table class="table table-borderless">
								<thead>
									<tr>
										<th scope="col">CONCEPTO</th>
										<th scope="col">MONTO</th>
										<th scope="col">VENCIMIENTO</th>
										<th scope="col">MORA</th>
										<th scope="col">TOTAL CUOTA</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(payment, index) in selectedPayments" :key="index">
										<td>{{ payment.code ? payment.code : '-' }}</td>
										<td>{{ payment.formattedSaldo }}</td>
										<td>{{ payment.formattedExpiresAt }}</td>
										<td>{{ payment.mora }}</td>
										<td>
											{{ (parseFloat(payment.saldo) + parseFloat(payment.mora)).toFixed(2) }}
										</td>
									</tr>
								</tbody>
							</table>

							<p class="mb-1">Total a pagar: {{ totalPayment }}</p>
						</div>

						<div class="text-center mt-3">
							<img class="pagar-con-pagoefectivo" src="~assets/img/pagar-con-pagoefectivo.svg" /><br />

							<button @click="generateCode" class="btn btn-green" :disabled="contactMenorca">
								Generar Código
							</button>

							<div class="text-danger" style="margin-top: 25px; font-size: 14px" v-if="contactMenorca">
								<b
									>Tienes 5 o más cuotas vencidas, por favor contáctate con nuestro
									<nuxt-link :to="{ hash: '#sac_section' }" @click.native="closePagoEfectivo"
										>servicio de atención al cliente</nuxt-link
									></b
								>
							</div>

							<div class="text-danger" style="margin-top: 25px; font-size: 14px">
								{{ errorMessage }}
							</div>
						</div>
					</div>
				</template>

				<template v-else-if="step2 && cip">
					<div class="finaliza-pago">
						<p class="mb-0 mr-3">Finaliza tu pago con:</p>
						<img src="~assets/img/logo-pagoefectivo.svg" /><br />
					</div>
					<div class="d-flex justify-content-center mt-3">
						<p class="mb-0 mr-3">Tipo de proyecto: <b>Menorca Lotes</b></p>
						<p class="mb-0 mr-3">
							Tipo de moneda: <b>{{ cip.paymentIn == 'USD' ? 'Dólares' : 'Soles' }}</b>
						</p>
					</div>

					<div class="cip-box">
						<ul>
							<li>
								<div class="cip-item">
									<div class="code">
										<h3>Código de pago (CIP)</h3>
										<span class="code-number">{{ cip.cip }}</span>
									</div>

									<div class="copy">
										<button class="btn btn-white" @click="copyCode(cip.cip)">
											<img src="~assets/img/icons/copy-icon.svg" alt="" /> COPIAR
										</button>
										<b-tooltip ref="tooltip" target="tooltip-button-show-event">
											Hello <strong>World!</strong>
										</b-tooltip>
									</div>

									<div class="amount">
										<h3>Monto a pagar</h3>
										<span>{{ cip.formattedPayAmount }}</span>
									</div>
								</div>
							</li>
						</ul>
					</div>

					<div class="due-date">
						<p class="m-0">
							<img src="~assets/img/icons/clock-icon.svg" alt="Reloj" /> Págalo antes del
							{{ cipExpires }}
						</p>
					</div>

					<div class="share-code">
						<h3>Comparte tu código CIP por SMS</h3>

						<div>
							<input id="cellphone" v-model="cellphone" type="text" required="required" />
							<label for="cellphone" placeholder="Número de celular"></label>
						</div>

						<button @click="sendSMSCode2(cip.cip)" class="btn btn-green">enviar cip por sms</button>

						<div class="response-message" v-show="sendSMSCodeResponse2">
							Tu código de pago (CIP) fue enviado al {{ cellphone }}
						</div>
					</div>

					<div class="banks">
						<h3>Puedes pagar en:</h3>
						<div class="banks-area">
							<img src="~assets/img/banks/bbva.svg" class="img-fluid" />
							<img src="~assets/img/banks/bcp.svg" class="img-fluid" />
							<img src="~assets/img/banks/interbank.svg" class="img-fluid" />

							<img src="~assets/img/banks/cajaarequipa.svg" class="img-fluid" />
							<img src="~assets/img/banks/scotiabank.svg" class="img-fluid" />
							<img src="~assets/img/banks/banbif.svg" class="img-fluid" />

							<img src="~assets/img/banks/westernunion.svg" class="img-fluid" />
							<img src="~assets/img/banks/bancopichincha.svg" class="img-fluid" />
							<img src="~assets/img/banks/moneygram.svg" class="img-fluid" />
						</div>
					</div>
				</template>
			</div>
		</b-modal>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import { mapGetters } from 'vuex';
	import Menu from '@/components/common/Menu';
	import Sidebar from '@/components/common/Sidebar';

	export default {
		middleware: 'auth',
		transition: 'slide-left',
		data() {
			return {
				name: '',

				contractNum: '',
				projectType: '',

				docType: '',
				document: '',
				gender: '',
				cellphone: '',
				secondaryTelephone: '',
				sperantEmail: '',
				email: '',
				address: '',
				lat: '',
				long: '',
				positionFixed: true,
				successMessage: '',
				errorMessage: '',

				deudas: 0,
				page: 1,
				nextHistory: true,

				selectedUserPayments: [],
				selectedPayments: [],
				previousPendingPayments: [],
				nextPendingPayment: '',
				nextPendingPayments: [],

				allPendingPayments: [],
				oldestPendingPayment: [],
				quotaToPay: true,
				disabledGenerateCode: false,

				cipState: false,
				step1: false,
				step2: false,

				existingCip: null,

				loadingGeneralInfo: true,
				loadingPaymentProgress: true,
				loadingPaymentHistory: true,
				loadingFetchMorePaymentHistory: false,

				sendSMSCodeResponse: false,
				sendSMSCodeResponse2: false,

				cip: null,
				cipExpires: '',

				hideFooterModal: true,
				dataSelecionada: [],

				contactMenorca: false,

				buttonTitle: 'Completado',
				status: '',
				titular: '',
			};
		},
		components: {
			Menu,
			Sidebar,
		},
		watch: {
			statusPayments(newArr) {
				let obj = {
					next: this.nextStatusPayments,
					payments: this.statusPayments,
				};
				this.$store.commit('property/setHistoryPayments', obj);
			},
			pendingBudgets(newObj) {
				//console.log('newObj---', newObj);
				if (typeof newObj !== 'undefined') {
					this.deudas = newObj.totalQuotas;
				} else {
					this.deudas = 0;
				}
			},
			nextHistoryPayments(newObj) {
				if (typeof newObj !== 'undefined') {
					this.nextHistory = newObj == 0 ? false : true;
				} else {
					this.nextHistory = true;
				}
			},
			selectedUserPayments(newArr) {
				//console.log('selectedPayments newObj---', newArr);
				var selectedIndex = this.allPendingPayments.findIndex((i, index) => {
					return i.id == newArr[newArr.length - 1];
				});

				//console.log('selectedIndex', selectedIndex);

				var selected = document.querySelectorAll('.custom-checkbox').forEach((item, i) => {
					if (i == 1) {
						console.log('entra 1');
						if (selectedIndex == -1) {
							document.querySelectorAll('.custom-checkbox')[1].querySelector('input').disabled = true;
						}
					}

					if (selectedIndex == i) {
						console.log('entra 2', i);
						if (i < document.querySelectorAll('.custom-checkbox').length - 1) {
							if (i > 0) {
								var previousPayment = document
									.querySelectorAll('.custom-checkbox')
									[i - 1].querySelector('input');
								previousPayment.disabled = true;
							}

							document.querySelectorAll('.custom-checkbox').forEach((item, j) => {
								if (j == i) {
									//console.log('j', j);
									document
										.querySelectorAll('.custom-checkbox')
										[j].querySelector('input').disabled = false;
								}

								if (j == i + 2) {
									//console.log('j', j);
									document
										.querySelectorAll('.custom-checkbox')
										[j].querySelector('input').disabled = true;
								}
							});

							var nextPayment = document
								.querySelectorAll('.custom-checkbox')
								[i + 1].querySelector('input');
							nextPayment.disabled = false;
						}
					}

					if (i == selectedIndex - 1) {
						if (selectedIndex == parseInt(document.querySelectorAll('.custom-checkbox').length - 1)) {
							document
								.querySelectorAll('.custom-checkbox')
								[selectedIndex - 1].querySelector('input').disabled = true;
						}
					}

					//return console.log('input-value 2', item.querySelector('input').value);
				});

				this.selectedPayments = this.allPendingPayments.filter((i) => {
					return newArr.includes(i.id);
				});
			},
			/*quotaToPay(newObj) {

				if (newObj !== false) {
						this.disabledGenerateCode = true;
				} else {
						this.disabledGenerateCode = false;
				}
		}*/
		},
		computed: {
			...mapGetters({
				user: 'account/getUser',
				statusPayments: 'property/getStatusPayments',
				nextStatusPayments: 'property/getNextStatusPayments',
				historyPayments: 'property/getHistoryPayments',
				nextHistoryPayments: 'property/getNextHistoryPayments',
				completedQuotes: 'property/getCompletedQuotes',
				pendingQuotes: 'property/getPendingQuotes',
				saldo: 'property/getSaldo',
				totalAmount: 'property/getTotalAmount',
				projectTotal: 'property/getProjectTotal',
				formattedTotalAmount: 'property/getFormattedTotalAmount',
				formattedProjectTotal: 'property/getFormattedProjectTotal',
				pendingBudgets: 'property/getPendingBudgets',
				nextPendingBudget: 'property/getNextPendingBudget',
				budgets: 'property/getBudgets',
				manualPendingBudgets: 'property/getManualPendingBudgets',
				manualNextPendingBudget: 'property/getManualNextPendingBudget',
				lastUpdate: 'property/getLastUpdate',
			}),
			percentage() {
				let percentage = (this.totalAmount * 100) / this.projectTotal;
				return (Math.round(percentage * 100) / 100).toFixed(2);
			},
			totalPayment() {
				let amount = 0;
				this.selectedPayments.map((item) => {
					amount += parseFloat(item.saldo) + parseFloat(item.mora);
				});

				return amount.toFixed(2);
			},
		},
		async mounted() {
			console.log('FILTER', this);

			const session = JSON.parse(Cookies.get('session'));

			const token = session.token;

			this.contractNum = localStorage.getItem('contract_num');
			this.projectType = localStorage.getItem('project_type');
			this.titular = localStorage.getItem('titular');
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
					page: this.page,
				},
			};

			this.$store.dispatch('property/fetchPaymentHistory', obj2).then(() => {
				this.loadingPaymentHistory = false;
			});

			this.$store.dispatch('property/fetchPaymentInformation', obj).then(() => {
				this.loadingGeneralInfo = false;
			});

			this.$store.dispatch('property/fetchProgress', obj).then(() => {
				this.loadingPaymentProgress = false;
			});

			if (this.$route.query.pe && this.$route.query.pe == 'ok') {
				//let pe = this.$route.query.pe;
				document.querySelector('.btn-pago-efectivo').click();
			}
		},
		methods: {
			filterPayments(status) {
				this.loadingPaymentHistory = true;

				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;

				this.contractNum = localStorage.getItem('contract_num');
				this.projectType = localStorage.getItem('project_type');

				switch (status) {
					case 'all':
						this.buttonTitle = 'Todos los estados';
						this.status = 'todos';
						break;
					case 'completed':
						this.buttonTitle = 'Completado';
						this.status = 'pagado';
						break;
					case 'pending':
						this.buttonTitle = 'Pendiente';
						this.status = 'pendiente';
						break;
					case 'expired':
						this.buttonTitle = 'Expirado';
						this.status = 'expirado';
						break;
					default:
						this.status = 'pendiente';
						this.buttonTitle = 'Pendiente';
				}

				this.page = 1;

				const obj2 = {
					token: token,
					payload: {
						budgetCode: localStorage.getItem('budget_code'),
						page: this.page,
						status: this.status,
					},
				};

				this.$store.dispatch('property/fetchPaymentStatus', obj2).then(() => {
					this.loadingPaymentHistory = false;
				});
			},
			paidPayments(payment) {
				return payment.monto_pagado > 0 ? 'paid-payment' : '';
			},
			overduePayments(payment) {
				return payment.saldo > 0 ? 'overdue-payment' : '';
			},
			iconSourceset(icon) {
				try {
					if (typeof icon !== 'undefined') {
						return `${require('~/assets/img/icons/' + icon)}`;
					}
				} catch (error) {}
			},
			refreshPaymentInfo() {
				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;

				const obj = {
					token: token,
					payload: {
						budgetCode: localStorage.getItem('budget_code'),
						projectType: localStorage.getItem('project_type'),
					},
				};

				//this.oldestPendingPayment = [];
				this.allPendingPayments = [];

				this.$store.dispatch('property/fetchPaymentInformation', obj).then(() => {
					this.loadingGeneralInfo = false;

					if (this.pendingBudgets) {
						this.pendingBudgets.payments.map((payment, index) => {
							payment.value = payment.id;
							payment.text = `Letra # ${payment.code !== undefined ? payment.code : '-'} / ${
								payment.formattedSaldo
							} / Vcto. ${payment.formattedExpiresAt}`;

							/*if (index !== 0) {
									payment.disabled = true;
							} else {
									payment.disabled = false;
							}*/

							this.allPendingPayments.push(payment);
						});
						if (this.pendingBudgets.payments.length < 5) {
							this.nextPendingBudget.payments.map((payment) => {
								payment.value = payment.id;
								payment.text = `Letra # ${payment.code !== undefined ? payment.code : '-'} / ${
									payment.formattedSaldo
								} / Vcto. ${payment.formattedExpiresAt}`;

								this.allPendingPayments.push(payment);
							});
						}
					}

					this.allPendingPayments.map((payment, index) => {
						//console.log('payment obj', payment, index);
						payment.disabled = true;

						if (index !== 0) {
							payment.disabled = true;
						} else {
							payment.disabled = false;
						}
					});

					//this.calcOldestPayment();

					//Si existen mas de 5 vencidas
					if (this.pendingBudgets.payments.length >= 5) {
						this.contactMenorca = true;

						this.allPendingPayments.map((payment, index) => {
							payment.disabled = true;
						});
					}
				});
			},

			copyCode(cip) {
				var copyText = cip;
				navigator.clipboard.writeText(copyText);
			},
			fetchMoreHistoryPayments() {
				this.loadingFetchMorePaymentHistory = true;

				this.page++;

				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;

				if (this.status) {
					const obj2 = {
						token: token,
						payload: {
							budgetCode: localStorage.getItem('budget_code'),
							page: this.page,
							status: this.status,
						},
					};

					this.$store.dispatch('property/fetchMorePaymentStatus', obj2).then((response) => {
						this.loadingFetchMorePaymentHistory = false;
					});
				} else {
					const obj2 = {
						token: token,
						payload: {
							budgetCode: localStorage.getItem('budget_code'),
							page: this.page,
						},
					};

					this.$store.dispatch('property/fetchMorePaymentHistory', obj2).then((response) => {
						this.loadingFetchMorePaymentHistory = false;
					});
				}
			},
			closePagoEfectivo() {
				this.$bvModal.hide('modal_pagoefectivo');
				this.$router.push('/atencion-al-cliente?ref=1');
			},
			async openModal() {
				this.sendSMSCodeResponse = false;
				this.sendSMSCodeResponse2 = false;

				await this.refreshPaymentInfo();
				await this.verifyIfCIPExist();

				//if (this.existingCip) {
				setTimeout(() => {
					this.$bvModal.show('modal_pagoefectivo');
				}, 500);
				//}
			},
			generateCode() {
				this.cipState = false;
				this.step1 = false;
				this.step2 = true;

				this.errorMessage = '';

				/*if (this.selectedPayments.length == 0) {
					this.errorMessage = 'Debe seleccionar al menos 1 letra para poder continuar';
			}*/

				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;

				let paymentsToSend = this.selectedPayments.map((i) => {
					return i.id;
				});

				const obj = {
					token: token,
					payload: {
						paymentIds: paymentsToSend,
					},
				};

				this.$store.dispatch('property/generateCips', obj).then((response) => {
					if (response.success) {
						this.cip = response.data;
						this.cipExpires = response.data.formattedExpiresAt;

						this.step2 = true;
					}
				});
			},
			verifyIfCIPExist() {
				this.selectedUserPayments = [];

				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;

				const obj = {
					token: token,
					payload: {},
				};

				this.$store.dispatch('property/verifyIfCIPExist', obj).then((response) => {
					if (response.cip == null) {
						this.existingCip = null;
					}

					if (response.cip && !response.afterDueDate) {
						this.cipState = true;
						this.existingCip = response.cip;
						console.log('existingCip', this.existingCip);
					} else {
						this.cipState = false;
						this.step1 = true;
						this.existingCip = null;
					}
				});
			},
			generateCodeFromCIPState() {
				this.cipState = false;
				this.step1 = true;
			},
			sendSMSCode(code) {
				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;

				const obj = {
					token: token,
					payload: {
						cipNumber: code,
						cellphone: this.cellphone,
						amount: this.existingCip.cip, //this.cips[0].formattedPayAmount,
						vctDate: this.$moment(this.cipExpires).format('MM/DD/YYYY HH:mm a'),
					},
				};

				this.$store.dispatch('property/sendSMSCips', obj).then((response) => {
					if (response.success) {
						this.sendSMSCodeResponse = true;
					}
				});
			},
			sendSMSCode2(code) {
				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;

				const obj = {
					token: token,
					payload: {
						cipNumber: code,
						cellphone: this.cellphone,
						amount: this.existingCip.cip, //this.cips[0].formattedPayAmount,
						vctDate: this.$moment(this.cipExpires).format('MM/DD/YYYY HH:mm a'),
					},
				};

				this.$store.dispatch('property/sendSMSCips', obj).then((response) => {
					if (response.success) {
						this.sendSMSCodeResponse2 = true;
					}
				});
			},
		},
	};
</script>
