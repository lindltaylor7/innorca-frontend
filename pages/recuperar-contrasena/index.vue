<template>
	<div id="register">
		<Menu />
		<div class="page">
			<div class="container">
				<div class="row">
					<div class="col-4">
						<div class="img">
							<img class="img-j img-fluid" src="~assets/img/register/register1.jpg" alt="" />
						</div>
					</div>
					<div class="col-8">
						<div class="box step-1" v-show="!step2">
							<div class="container h-100">
								<div class="row align-items-center h-100">
									<div class="col-12">
										<div class="wrap">
											<h3 class="title">Recuperación de contraseña</h3>

											<p class="info">Estimado cliente por favor ingrese su número de DNI</p>

											<div>
												<input
													v-model="documentNo"
													id="nro_dni"
													class="w-300"
													type="text"
													required />
												<label for="nro_dni" placeholder="Número de documento"></label>
											</div>

											<div class="d-flex align-items-center" style="max-width: 200px">
												<button @click="goToStep2" class="btn btn-green" :disabled="loading">
													Restablecer
												</button>
												<div v-show="loading" class="loader"></div>
											</div>

											<div class="text-danger" style="margin-top: 9px; font-size: 14px">
												{{ errorMessage }}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="box step-2" v-show="step2">
							<div class="container h-100">
								<div class="row align-items-center h-100">
									<div class="col-12">
										<div class="wrap">
											<h3 class="title">
												Para recuperar su contraseña de<br />
												Ventana Menorca
											</h3>

											<p class="info">
												Se envió un correo de confirmación a tu cuenta registrada al momento de
												tu compra:
											</p>

											<p class="obfuscate-s">{{ emailOb }}</p>

											<p class="info">de igual forma enviamos un SMS a tu número de celular:</p>

											<p class="obfuscate-s">{{ telephoneOb }}</p>

											<div class="text-success mb-4" style="margin-top: 17px; font-size: 14px">
												{{ successMessage }}
											</div>

											<p class="help">
												¿No te llegaron las notificaciones?
												<a href="javascript:void(0)" @click="resendSMS">Enviar de nuevo</a>
											</p>
											<p class="help">
												¿Ya no usas este email / número de celular?
												<a href="javascript:void(0)" v-b-modal.modal-1
													>Comunicate con un asesor</a
												>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<ComunicateAsesorModal />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Menu from '@/components/common/Menu';
import ComunicateAsesorModal from '@/components/common/ComunicateAsesorModal';

export default {
	transition: 'slide-left',
	data() {
		return {
			documentNo: '',
			errorMessage: '',
			emailOb: '',
			telephoneOb: '',
			userId: '',
			successMessage: '',
			loading: false,
			step2: false,
		};
	},
	components: {
		Menu,
		ComunicateAsesorModal,
	},
	computed: {
		...mapGetters({
			userHelperModalRef: 'account/getUserHelperModalRef',
		}),
	},
	methods: {
		async resendSMS() {
			this.successMessage = '';

			const payload = {
				userId: this.userId,
			};

			await this.$store.dispatch('signup/resendSMS', payload).then((response) => {
				if (response.success) {
					this.successMessage = 'Se enviaron nuevamente las notificaciones';
				}
			});
		},
		async goToStep2() {
			this.errorMessage = '';

			if (this.documentNo == '') {
				this.errorMessage = 'Por favor ingrese un número de documento';
				return;
			}

			this.loading = true;

			const payload = {
				docNumber: this.documentNo,
			};

			await this.$store.dispatch('account/forgotPassword', payload).then((response) => {
				this.loading = false;

				console.log('forgotPassword', response);

				if (response.success == true) {
					(this.emailOb = response.data.email),
						(this.telephoneOb = response.data.cellphone),
						(this.userId = response.data.user_id),
						(this.step2 = true);
				} else {
					if (response.code === 'AUTH_NOT_REGISTERED_002') {
						this.errorMessage = response.message;
						this.userHelperModalRef.show();
					}
				}
			});
		},
	},
	async mounted() {},
};
</script>

<style lang="scss">
</style>