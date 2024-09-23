<template>
	<div id="mis_datos">
		<Menu :positionFixed="positionFixed" :logged="true" />
		<div class="page" v-bind:class="{ fixed: positionFixed }">
			<div class="container">
				<Sidebar />

				<!-- Page Content -->
				<div class="h-100 page-content">
					<div class="box modal-form">
						<h3 class="title">Cambio de contraseña</h3>

						<div class="row">
							<div class="col-12 col-lg-6">
								<div class="position-relative">
									<!--<input v-model="password" id="password" type="password" required/>
                                    <label for="password" placeholder="Contraseña actual"></label>-->
									<input
										v-model="password"
										id="password"
										v-bind:class="{ error: errors.password }"
										type="password"
										ref="password"
										required />
									<label for="password" placeholder="Contraseña actual"></label>
									<img
										@click="togglePasswordVisibility('password')"
										src="~assets/img/icons/eye-solid.svg"
										alt=""
										style="
											width: 18px;
											position: absolute;
											right: 18px;
											top: 21px;
											cursor: pointer;
										" />
									<span v-if="errors.password === true" class="error">
										{{ errorForm.password }}
									</span>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-12 col-lg-6">
								<div class="position-relative">
									<!--<input v-model="newPassword" id="new_password" type="password" required/>
                                    <label for="new_password" placeholder="Nueva contraseña"></label>-->
									<input
										v-model="newPassword"
										id="new_password"
										v-bind:class="{ error: errors.newPassword }"
										type="password"
										ref="newPassword"
										required />
									<label for="new_password" placeholder="Nueva contraseña"></label>
									<img
										@click="togglePasswordVisibility('newPassword')"
										src="~assets/img/icons/eye-solid.svg"
										alt=""
										style="
											width: 18px;
											position: absolute;
											right: 18px;
											top: 21px;
											cursor: pointer;
										" />
									<span v-if="errors.newPassword === true" class="error">
										{{ errorForm.newPassword }}
									</span>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-12 col-lg-6">
								<div class="position-relative">
									<!--<input v-model="repeatPassword" id="repeat_password" type="password" required/>
                                    <label for="repeat_password" placeholder="Repetir nueva contraseña"></label>-->
									<input
										v-model="repeatPassword"
										id="repeat_password"
										v-bind:class="{ error: errors.repeatPassword }"
										type="password"
										ref="repeatPassword"
										required />
									<label for="repeat_password" placeholder="Repetir nueva contraseña"></label>
									<img
										@click="togglePasswordVisibility('repeatPassword')"
										src="~assets/img/icons/eye-solid.svg"
										alt=""
										style="
											width: 18px;
											position: absolute;
											right: 18px;
											top: 21px;
											cursor: pointer;
										" />
									<span v-if="errors.repeatPassword === true" class="error">
										{{ errorForm.repeatPassword }}
									</span>
								</div>
							</div>

							<div class="col-12">
								<div class="d-flex align-items-center" style="max-width: 270px">
									<button
										@click="update"
										class="btn btn-green btn-submit"
										:class="{ loading: loading }"
										:disabled="loading">
										Cambiar contraseña
									</button>
								</div>

								<div class="col-12">
									<div class="text-success" style="margin-top: 17px; font-size: 14px">
										{{ successMessage }}
									</div>
									<div class="text-danger" style="margin-top: 17px; font-size: 14px">
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
</template>

<script>
import Cookies from 'js-cookie';
import { mapActions, mapGetters } from 'vuex';
import Menu from '@/components/common/Menu';
import Sidebar from '@/components/common/Sidebar';

import { EVENTS } from '../../core/constants/events';

export default {
	transition: "slide-left",
	middleware: 'auth',
	data() {
		return {
			loading: false,
			positionFixed: true,
			password: '',
			newPassword: '',
			repeatPassword: '',
			successMessage: '',
			errorMessage: '',

			errors: {
				password: false,
				newPassword: false,
				repeatPassword: false,
			},

			errorForm: {
				password: "Ingrese su contraseña actual",
				newPassword: "Ingrese una nueva contraseña que contenga 8 caracteres como mínimo y una letra en mayúscula.",
				repeatPassword: "La contraseña de verificación no coincide.",
			},
		}
	},
	components: {
		Menu,
		Sidebar
	},
	computed: {
		...mapGetters({
			user: "account/getUser",
		}),
	},
	methods: {
		validate() {
			this.password === "" ? (this.errors.password = true) : (this.errors.password = false);
			!this.validatePassword(this.newPassword) ? (this.errors.newPassword = true) : (this.errors.newPassword = false);
			this.newPassword !== this.repeatPassword ? (this.errors.repeatPassword = true) : (this.errors.repeatPassword = false);
			if (
				!this.errors.password &&
				!this.errors.newPassword &&
				!this.errors.repeatPassword
			) {
				return true;
			} else {
				this.loading = false;
				return false;
			}
		},
		togglePasswordVisibility(value) {
			const type = this.$refs[value].getAttribute("type") === "password" ? "text" : "password";
			this.$refs[value].setAttribute("type", type);
		},
		async update() {

			const regex = /^(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

			this.successMessage = '';
			this.errorMessage = '';

			this.loading = true;

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {
					password: this.password,
					newPassword: this.newPassword
				}
			}

			if (this.validate()) {
				await this.$store.dispatch('account/changePassword', obj)
					.then(async (response) => {
						this.loading = false;

						if (response.success) {
							this.successMessage = response.message;

							await this.save({ type: EVENTS.registro.cambioContrasena });
						}

						if (!response.success) {
							this.errorMessage = response.message;
						}
					});
			}
		},
		validatePassword(value) {
			if (/^(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value)) {
				return true;
			} else {
				return false;
			}
		},
		...mapActions({
			save: 'metrics/save'
		})
	},
	async mounted() {

	}
}
</script>
