<template>
	<main id="landing">
		<Menu :landing="true" />

		<section class="welcome">
			<div class="container">
				<div class="row-grid">
					<div class="grid-item">
						<h1>
							Bienvenido a<br />
							Ventana Menorca
						</h1>
						<p>
							Accede a la información de tus inmuebles sin salir de casa, de una manera segura y accesible
							desde tu computador o dispositivo móvil.
						</p>

						<h3>¿Qué puedes encontrar aquí?</h3>
						<ul>
							<li>Revisa el <b>detalle de tus pagos.</b></li>
							<li>Encuentra <b>cómo y donde pagar</b> tus letras.</li>
							<li><b>Gana dinero</b> con el programa de referidos Menorca.</li>
							<li>Visualiza la <b>información completa</b> de tus inmuebles.</li>
							<li>
								Realiza consultas o solicitudes a nuestro equipo de
								<b>atención al cliente.</b>
							</li>
						</ul>
					</div>
					<div class="grid-item">
						<div class="bg-menorca">
							<div class="form modal-form">
								<div class="wrap" v-show="!step2">
									<h3 class="title">Ingresar a Ventana Menorca</h3>

									<span class="switcher switcher-1">
										<input v-model="v_switch" type="checkbox" id="switcher-1" />
										<label for="switcher-1"></label>
									</span>

									<template v-if="!cellphoneLogin">
										<div class="input-group mb-0 mb-md-3">
											<div class="first-child">
												<select
													v-model="documentType"
													id="document_type"
													v-bind:class="{
														error: errors.documentType,
													}"
													required>
													<option value="-" selected>Seleccionar</option>
													<option value="dni">DNI</option>
													<option value="ce">CE</option>
													<option value="ruc">RUC</option>
													<option value="pasaporte">Pasaporte</option>
												</select>
												<label for="document_type" placeholder="Tipo de documento"></label>

												<span v-if="errors.documentType === true" class="error">
													{{ errorForm.documentType }}
												</span>
											</div>

											<div class="last-child">
												<input
													v-if="documentType == '' || documentType == '-'"
													v-model="documentNo"
													id="no_document"
													v-bind:class="{
														error: errors.documentNo,
													}"
													type="text"
													required />

												<input
													v-if="documentType == 'dni'"
													v-model="documentNo"
													id="no_document"
													v-bind:class="{
														error: errors.documentNo,
													}"
													type="text"
													minlength="8"
													maxlength="8"
													@keypress="onlyNumber"
													required />
												<input
													v-if="documentType == 'ce'"
													v-model="documentNo"
													id="no_document"
													v-bind:class="{
														error: errors.documentNo,
													}"
													type="text"
													minlength="9"
													maxlength="9"
													required />
												<input
													v-if="documentType == 'ruc'"
													v-model="documentNo"
													id="no_document"
													v-bind:class="{
														error: errors.documentNo,
													}"
													type="text"
													minlength="11"
													maxlength="11"
													@keypress="onlyNumber"
													required />
												<input
													v-if="documentType == 'pasaporte'"
													v-model="documentNo"
													id="no_document"
													v-bind:class="{
														error: errors.documentNo,
													}"
													type="text"
													minlength="12"
													maxlength="12"
													required />
												<label for="no_document" placeholder="Nro. de documento"></label>
												<span v-if="errors.documentNo === true" class="error">
													{{ errorForm.documentNo }}
												</span>
											</div>
										</div>

										<div>
											<input
												v-model="password"
												id="password"
												v-bind:class="{
													error: errors.password,
												}"
												type="password"
												required />
											<label for="password" placeholder="Contraseña"></label>
											<span v-if="errors.password === true" class="error">
												{{ errorForm.password }}
											</span>
										</div>
									</template>

									<template v-else>
										<div>
											<input
												v-model="cellphone"
												id="no_celular"
												v-bind:class="{
													error: errors.cellphone,
												}"
												type="text"
												required />
											<label for="no_celular" placeholder="Número de celular"></label>
											<span v-if="errors.cellphone === true" class="error">
												{{ errorForm.cellphone }}
											</span>
										</div>
									</template>

									<p class="float-right forgot-password">
										<!-- <nuxt-link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</nuxt-link> -->
										<a href="" @click="navigateHandler($event, '/recuperar-contrasena')"
											>¿Olvidaste tu contraseña?</a
										>
									</p>

									<div class="login-area d-flex align-items-center">
										<button
											@click="login"
											class="btn btn-green btn-login btn-submit"
											:class="{ loading: loading }"
											:disabled="loading">
											Iniciar Sesión
										</button>
									</div>

									<div class="text-danger" style="margin-top: 25px; font-size: 14px">
										{{ errorMessage }}
									</div>

									<p class="register">
										¿Aún no estás registrado?
										<a @click="navigateHandler($event, '/signup')" href="">Regístrate aquí</a>
									</p>
								</div>

								<div class="wrap" v-show="step2">
									<h3 class="title">
										Ingresar a<br />
										Ventana Menorca
									</h3>

									<span class="switcher switcher-1">
										<input v-model="v_switch" type="checkbox" id="switcher-1" />
										<label for="switcher-1"></label>
									</span>

									<p>
										Se envió un mensaje de texto a su<br />
										número: <b>{{ sendCellphone }}</b>
									</p>
									<p class="register mt-3">
										¿No es su número?
										<a href="javascript:void(0)" @click="stepBack()">cambiar aquí</a>
									</p>

									<div class="box-number">
										<input
											v-model="num1"
											@input="numberOnly(num1, $event)"
											type="text"
											id="dig1"
											name="dig1"
											class="form-control"
											maxlength="1"
											pattern="[+-]?\d+(?:[.,]\d+)?"
											inputmode="numeric"
											autocomplete="off"
											required="" />
										<input
											v-model="num2"
											@input="numberOnly(num2, $event)"
											type="text"
											id="dig2"
											name="dig2"
											class="form-control"
											maxlength="1"
											pattern="[+-]?\d+(?:[.,]\d+)?"
											inputmode="numeric"
											autocomplete="off"
											required="" />
										<input
											v-model="num3"
											@input="numberOnly(num3, $event)"
											type="text"
											id="dig3"
											name="dig3"
											class="form-control"
											maxlength="1"
											pattern="[+-]?\d+(?:[.,]\d+)?"
											inputmode="numeric"
											autocomplete="off"
											required="" />
										<input
											v-model="num4"
											@input="numberOnly(num4, $event)"
											type="text"
											id="dig4"
											name="dig4"
											class="form-control"
											maxlength="1"
											pattern="[+-]?\d+(?:[.,]\d+)?"
											inputmode="numeric"
											autocomplete="off"
											required="" />
									</div>

									<!--<p class="register mt-3">¿No llego el sms? <nuxt-link to="/">reenviar</nuxt-link></p>-->

									<button
										@click="verify"
										class="btn btn-green btn-login mt-2 btn-submit"
										:class="{ loading: loading }">
										Iniciar Sesión
									</button>

									<div class="text-danger" style="margin-top: 25px; font-size: 14px">
										{{ errorMessage }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="benefits">
			<div class="container">
				<h3 class="section-title">¡Conoce los beneficios de Ventana Menorca!</h3>

				<div class="container mt-4">
					<div class="row">
						<div class="col-12 col-md-3">
							<div class="benefit-item">
								<h4>Gana dinero</h4>
								<img src="~assets/img/landing/benefits/commission.png" alt="" />
								<p class="text">Obtén ganancias siendo parte del programa de referidos de Menorca</p>
							</div>
						</div>

						<div class="col-12 col-md-3">
							<div class="benefit-item">
								<h4>Realiza tus pagos</h4>
								<img src="~assets/img/landing/benefits/pay-per-click.png" alt="" />
								<p class="text">
									Encuentra donde pagar y cómo hacerlo desde cualquier lugar de forma rápida y segura
								</p>
							</div>
						</div>

						<div class="col-12 col-md-3">
							<div class="benefit-item">
								<h4>Atención preferencial</h4>
								<img src="~assets/img/landing/benefits/queries.png" alt="" />
								<p class="text">
									Realiza tus consultas y solicitudes a través de nuestro canal de atención al cliente
								</p>
							</div>
						</div>

						<div class="col-12 col-md-3">
							<div class="benefit-item">
								<h4>Tus inmuebles</h4>
								<img src="~assets/img/landing/benefits/property.png" alt="" />
								<p class="text">
									Gestiona tus construcciones y administra los documentos de tus inmuebles
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="address">
			<div class="container">
				<h3 class="section-title">¡Encuéntranos en cualquiera de nuestras oficinas de ventas!</h3>

				<div class="container">
					<div class="row office-list">
						<div v-for="(oficina, index) in oficinas" :key="index" class="col-12 col-md-3">
							<div class="office-item">
								<div class="header">
									<h3>{{ oficina.nombre }}</h3>
								</div>
								<div class="body">
									<ul>
										<li>
											<img src="~assets/img/landing/address/place-icon.svg" class="mr-2" alt="" />
											{{ oficina.direccion }}
										</li>
										<li>
											<img
												src="~assets/img/landing/address/telephone-icon.svg"
												class="mr-2"
												alt="" />
											{{ oficina.tel }}
										</li>
										<li>
											<img src="~assets/img/landing/address/clock-icon.svg" class="mr-2" alt="" />
											{{ oficina.horario }}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<Footer />
	</main>
</template>

<script>
import Cookies from 'js-cookie';
import { mapActions, mapGetters } from 'vuex';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';

import { OFICINAS } from '@/core/constants/oficinas';
import { EVENTS } from '../core/constants/events';

export default {
	transition: 'slide-left',
	data() {
		return {
			documentType: '',
			documentNo: '',
			password: '',
			cellphone: '',
			sendCellphone: '',
			num1: '',
			num2: '',
			num3: '',
			num4: '',
			loading: false,
			step2: false,
			v_switch: true,
			errorMessage: '',
			cellphoneLogin: false,

			errors: {
				documentType: false,
				documentNo: false,
				password: false,
				cellphone: false,
			},

			errorForm: {
				documentType: 'Selecciona un tipo de documento',
				documentNo: 'Ingrese un número de documento',
				password: 'Ingrese una contraseña',
				cellphone: 'Ingrese un número de celular',
			},
			oficinas: OFICINAS,
		};
	},
	components: {
		Menu,
		Footer,
	},
	watch: {
		v_switch(val) {
			if (val == false) {
				this.cellphoneLogin = true;
			} else {
				this.cellphoneLogin = false;
			}
		},
	},
	computed: {
		...mapGetters({
			userHelperModalRef: 'account/getUserHelperModalRef',
		}),
	},
	methods: {
		async navigateHandler(e, route) {
			e.preventDefault();

			const keys = {
				'/signup': EVENTS.registro.clickRegistrate,
				'/recuperar-contrasena': EVENTS.registro.clickRecuperarContrasena,
			};

			const payload = await this.getUserAgentPayload();

			await this.save({ type: keys[route], payload, db: false });

			this.$router.push(route);
		},
		stepBack() {
			this.step2 = false;
		},
		validateDocument() {
			//Reset
			this.errorForm.documentNo = 'Ingrese un número de documento';
			this.errors.documentNo = false;

			this.documentType === '' || this.documentType === '-'
				? (this.errors.documentType = true)
				: (this.errors.documentType = false);

			if (this.documentNo === '') {
				this.errors.documentNo = true;
			} else {
				this.errors.documentNo = false;

				if (this.documentType === 'dni') {
					if (!this.validateDNI(this.documentNo)) {
						this.errors.documentNo = true;
						this.errorForm.documentNo = 'Debe ingresar sólo números de 8 dígitos';
					}
				}

				if (this.documentType === 'ce') {
					if (!this.validateCE(this.documentNo)) {
						this.errors.documentNo = true;
						this.errorForm.documentNo = 'Debe ingresar 9 dígitos';
					}
				}

				if (this.documentType === 'ruc') {
					if (!this.validateRUC(this.documentNo)) {
						this.errors.documentNo = true;
						this.errorForm.documentNo = 'Debe ingresar sólo números de 11 dígitos';
					}
				}

				if (this.documentType === 'pasaporte') {
					if (!this.validatePasaporte(this.documentNo)) {
						this.errors.documentNo = true;
						this.errorForm.documentNo = 'Debe ingresar sólo 12 dígitos';
					}
				}
			}

			this.password === '' ? (this.errors.password = true) : (this.errors.password = false);

			if (!this.errors.documentType && !this.errors.documentNo && !this.errors.password) {
				return true;
			} else {
				this.loading = false;
				return false;
			}
		},
		validateCellphone() {
			this.cellphone === '' ? (this.errors.cellphone = true) : (this.errors.cellphone = false);
			if (!this.errors.cellphone) {
				return true;
			} else {
				this.loading = false;
				return false;
			}
		},
		async verify() {
			this.errorMessage = '';

			if (this.num1 == '' || this.num2 == '' || this.num3 == '' || this.num4 == '') {
				this.errorMessage = 'Por favor ingrese el código de verificación';
				return;
			}

			this.loading = true;

			var code = this.num1 + this.num2 + this.num3 + this.num4;

			const payload = {
				telephone: this.cellphone,
				code: code,
			};

			await this.$store.dispatch('account/verifySMS', payload).then((response) => {
				this.loading = false;

				if (response.success == true) {
					var session = {
						token: response.data.token,
						user: {
							address: response.data.profile.address,
							docType: response.data.profile.docType,
							document: response.data.profile.document,
							phone: response.data.profile.phone,
							name: response.data.profile.name,
							sperantClientId: response.data.profile.sperantClientId,
							sperantEmail: response.data.profile.sperantEmail,
						},
						loggedIn: true,
					};

					//var in120Minutes = new Date(new Date().getTime() + 120 * 60 * 1000);

					this.$store.commit('setSession', session);
					Cookies.set('session', session /*, { expires: in120Minutes }*/);

					this.$store.dispatch('setTimeOutLogout');

					//console.log('response.data.profile.point.coordinates', response.data.profile.point.coordinates);

					if (
						typeof response.data.profile.point == 'undefined' ||
						response.data.profile.point.coordinates.length == 0
					) {
						this.$router.push('/mi-perfil');
					} else {
						this.$router.push('/inicio');
					}
				} else if (response.success == false) {
					this.errorMessage = response.message;
				}
			});
		},
		async login() {
			//this.step2 = true;

			if (!this.cellphoneLogin) {
				this.errorMessage = '';

				/*if (this.documentType == '' || this.documentNo == '' || this.password == '') {
					this.errorMessage = "Por favor seleccione e ingrese un número de documento y contraseña";
					return;
				}*/

				this.loading = true;

				await this.$recaptchaLoaded();
				const token = await this.$recaptcha('login');

				const payload = {
					docType: this.documentType.toUpperCase(),
					docNumber: this.documentNo,
					password: this.password,
					'g-recaptcha-response': token,
				};

				if (this.validateDocument()) {
					await this.$store.dispatch('login/login', payload).then(async (response) => {
						this.loading = false;

						if (response.success == true) {
							var session = {
								token: response.data.token,
								user: {
									address: response.data.profile.address,
									docType: response.data.profile.docType,
									document: response.data.profile.document,
									phone: response.data.profile.phone,
									name: response.data.profile.name,
									sperantClientId: response.data.profile.sperantClientId,
									sperantEmail: response.data.profile.sperantEmail,
								},
								loggedIn: true,
							};

							//console.log('session', session);

							//var in120Minutes = new Date(new Date().getTime() + 120 * 60 * 1000);

							this.$store.commit('setSession', session);
							Cookies.set('session', session /*, { expires: in120Minutes }*/);

							this.$store.dispatch('setTimeOutLogout');

							//console.log('response.data.profile.point.coordinates', response.data.profile.point.coordinates);

							await this.save({
								type: EVENTS.registro.login,
								payload: { docType: payload.docType, docNumber: payload.docNumber },
							});

							if (
								typeof response.data.profile.point == 'undefined' ||
								response.data.profile.point.coordinates.length == 0
							) {
								this.$router.push('/mi-perfil');
							} else {
								this.$router.push('/inicio');
							}
						} else if (response.success == false) {
							this.errorMessage = response.message;
							if (response.code === 'AUTH_NOT_REGISTERED_002') {
								this.userHelperModalRef.show();
							}
						}
					});
				}
			} else {
				this.errorMessage = '';

				this.sendCellphone = this.cellphone;

				/*if (this.cellphone == '') {
					this.errorMessage = "Por favor ingrese un número de celular";
					return;
				}*/

				this.loading = true;

				const payload = {
					cellphone: this.cellphone,
				};

				if (this.validateCellphone()) {
					await this.$store.dispatch('login/loginWithCellphone', payload).then(async (response) => {
						this.loading = false;

						if (response.success == true) {
							this.step2 = true;

							await this.save({
								type: EVENTS.registro.login,
								payload: { docType: 'CELULAR', docNumber: this.cellphone },
							});

							return;
						} else if (response.success == false) {
							this.errorMessage = response.message;
						}
					});
				}
			}
		},
		numberOnly: function (item, e) {
			item = e.target.value.replace(/[^\d]/g, '');
			e.target.value = item;

			if (item == '') {
				return;
			} else {
				if (e.target.id !== 'dig4') {
					e.target.nextElementSibling.focus();
				}
			}
		},
		deleteNumber: function (item, e) {
			//previousElementSibling
		},
		onlyNumber($event) {
			let keyCode = $event.keyCode ? $event.keyCode : $event.which;
			if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
				$event.preventDefault();
			}
		},
		validateDNI(value) {
			if (/^\d{8}(?:[-\s]\d{4})?$/.test(value)) {
				return true;
			} else {
				return false;
			}
		},
		validateCE(value) {
			if (/^[a-zA-Z0-9]{9}$/.test(value)) {
				return true;
			} else {
				return false;
			}
		},
		validateRUC(value) {
			if (/^\d{11}$/.test(value)) {
				return true;
			} else {
				return false;
			}
		},
		validatePasaporte(value) {
			if (/^[a-zA-Z0-9]{12}$/.test(value)) {
				return true;
			} else {
				return false;
			}
		},
		...mapActions({
			save: 'metrics/save',
		}),
	},
	async mounted() {},
};
</script>
