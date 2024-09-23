<template>
	<div id="login">
		<Menu />
		<div class="page">
			<div class="container">
				<div class="row">
					<div class="col-md-6 d-none d-md-block">
						<div class="img">
							<img class="img-j img-fluid" width="100%" src="~assets/img/login/login1.jpg" alt="" />
						</div>
					</div>
					<div class="col-12 col-md-6">
						<div class="box step-1 modal-form" v-show="!step2">
							<div class="container h-100">
								<div class="row align-items-center h-100">
									<div class="col-12">
										<div class="wrap">
											<h3 class="title">
												Ingresar a<br />
												Ventana Menorca
											</h3>

											<span class="switcher switcher-1">
												<input v-model="v_switch" type="checkbox" id="switcher-1" />
												<label for="switcher-1"></label>
											</span>

											<template v-if="!cellphoneLogin">
												<div>
													<select
														v-model="documentType"
														id="document_type"
														v-bind:class="{ error: errors.documentType }"
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

												<div>
													<input
														v-if="documentType == '' || documentType == '-'"
														v-model="documentNo"
														id="no_document"
														v-bind:class="{ error: errors.documentNo }"
														class="input-fix"
														type="text"
														required />

													<input
														v-if="documentType == 'dni'"
														v-model="documentNo"
														id="no_document"
														v-bind:class="{ error: errors.documentNo }"
														type="text"
														maxlength="8"
														@keypress="onlyNumber"
														class="input-fix"
														required />
													<input
														v-if="documentType == 'ce'"
														v-model="documentNo"
														id="no_document"
														v-bind:class="{ error: errors.documentNo }"
														type="text"
														maxlength="9"
														class="input-fix"
														required />
													<input
														v-if="documentType == 'ruc'"
														v-model="documentNo"
														id="no_document"
														v-bind:class="{ error: errors.documentNo }"
														type="text"
														maxlength="11"
														@keypress="onlyNumber"
														class="input-fix"
														required />
													<input
														v-if="documentType == 'pasaporte'"
														v-model="documentNo"
														id="no_document"
														v-bind:class="{ error: errors.documentNo }"
														type="text"
														maxlength="12"
														class="input-fix"
														required />
													<label for="no_document" placeholder="Número de documento"></label>
													<span v-if="errors.documentNo === true" class="error">
														{{ errorForm.documentNo }}
													</span>
												</div>

												<div>
													<input
														v-model="password"
														id="password"
														v-bind:class="{ error: errors.password }"
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
														v-bind:class="{ error: errors.cellphone }"
														type="text"
														required />
													<label for="no_celular" placeholder="Número de celular"></label>
													<span v-if="errors.cellphone === true" class="error">
														{{ errorForm.cellphone }}
													</span>
												</div>
											</template>

											<p class="float-right forgot-password">
												<nuxt-link to="/recuperar-contrasena"
													>¿Olvidaste tu contraseña?</nuxt-link
												>
											</p>

											<div class="d-flex align-items-center login-area">
												<button
													@click="login"
													class="btn btn-green btn-login btn-submit"
													:class="{ loading: loading }"
													:disabled="loading">
													Iniciar Sesión
												</button>
											</div>

											<div class="text-danger" style="margin-top: 9px; font-size: 14px">
												{{ errorMessage }}
											</div>

											<p class="register mt-3">
												¿Aún no estás registrado?
												<nuxt-link to="/signup">Regístrate aquí</nuxt-link>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="box step-2 modal-form" v-show="step2">
							<div class="container h-100">
								<div class="row align-items-center h-100">
									<div class="col-12">
										<div class="wrap">
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

											<button @click="verify" class="btn btn-green btn-login mt-2">
												Iniciar Sesión
											</button>

											<div class="text-danger" style="margin-top: 9px; font-size: 14px">
												{{ errorMessage }}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Cookies from 'js-cookie';
import { mapActions, mapGetters } from 'vuex';
import Menu from '@/components/common/Menu';

import { EVENTS } from '../../core/constants/events';
import { async } from 'q';

export default {
	middleware: 'no-auth',
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
		};
	},
	components: {
		Menu,
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

					var in120Minutes = new Date(new Date().getTime() + 120 * 60 * 1000);

					this.$store.commit('setSession', session);
					Cookies.set('session', session /*, { expires: in120Minutes }*/);

					this.$store.dispatch('setTimeOutLogout');

					if (!response.data.profile.point && response.data.profile.point.coordinates.length == 0) {
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
			if (!this.cellphoneLogin) {
				this.errorMessage = '';

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

							var in120Minutes = new Date(new Date().getTime() + 120 * 60 * 1000);

							this.$store.commit('setSession', session);
							Cookies.set('session', session /*, { expires: in120Minutes }*/);

							this.$store.dispatch('setTimeOutLogout');

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
							console.log(response);
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

				this.loading = true;

				const payload = {
					cellphone: this.cellphone,
				};

				if (this.validateCellphone()) {
					await this.$store.dispatch('login/loginWithCellphone', payload).then(async (response) => {
						this.loading = false;

						if (response.success == true) {
							console.log(response);
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

<style lang="scss"></style>
