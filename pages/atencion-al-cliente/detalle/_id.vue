<template>
	<div id='atencion_cliente'>
		<Menu :positionFixed='positionFixed' :logged='true' />
		<div class='page' v-bind:class='{ fixed: positionFixed }'>
			<div class='container'>
				<Sidebar />

				<!-- Page Content -->
				<div class='h-100 page-content'>
					<div class='box'>
						<h3 class='title' v-if='!loadingTicket'>
							Consulta #{{ ticketDetail.code }}
							<span
								class='badge badge-primary'
								v-bind:style='{
									color: ticketDetail.status.secondaryColor,
									backgroundColor: ticketDetail.status.color,
								}'
							>{{ ticketDetail.status.name }}</span
							>
						</h3>

						<div class='chat'>
							<div v-if='loadingTicket' class='chat__info mb-4 mb-lg-0 justify-content-center'>
								<div class='loader-big'></div>
							</div>

							<div v-if='!loadingTicket' class='chat__info mb-4 mb-lg-0'>
								<div>
									<h3 class='chat__title'>DETALLES DE SOLICITUD</h3>

									<div class='chat__info-detail'>
										<div class='header-title'>tipo de atención</div>
										<div class='detail'>
											{{ ticketDetail.type.name }}
										</div>
									</div>

									<div class='chat__info-detail'>
										<div class='header-title'>categoría de atención</div>
										<div class='detail'>
											{{ ticketDetail.sperantCategory.name }}
										</div>
									</div>

									<div class='chat__info-detail'>
										<div class='header-title'>Nombre del proyecto</div>
										<div class='detail'>
											{{ ticketDetail.project.name }}
										</div>
									</div>

									<!--<div class="chat__info-detail">
                                        <div class="header-title">
                                            número de contrato
                                        </div>
                                        <div class="detail">
                                            {{ ticketDetail.budget_id }}
                                        </div>
                                    </div>-->

									<div class='chat__info-detail'>
										<div class='header-title'>asunto</div>
										<div class='detail ellipsis'>
											{{ ticketDetail.detail }}
										</div>
									</div>

									<div class='chat__info-detail' v-if='ticketDetail.attendant'>
										<div class='header-title'>Responsable de la atención</div>
										<div class='detail'>
											{{ ticketDetail.attendant.fname + ' ' + ticketDetail.attendant.lname }}
										</div>
									</div>
								</div>

								<div class=''>
									<div class='chat__info-detail m-0'>
										<div class='header-title'>NOTA:</div>
										<div class='detail'>El tiempo aproximado de respuesta es de 48 a 72 horas.</div>
									</div>
								</div>
							</div>

							<div v-if='loadingTicket' class='chat__message justify-content-center'>
								<div class='loader-big'></div>
							</div>

							<div v-if='!loadingTicket' class='chat__message'>
								<simplebar class='chat-board' data-simplebar-auto-hide='true' ref='chatArea'>
									<!--<div v-if="messages.length == 0">
                                            Aún no ha respondido a esta atención
                                        </div>-->

									<template>
										<div class='owner-message'>
											<div class='header'>

												<span v-if='titular==="titular"'>{{ username }} </span>
												<span v-else>{{ titularFullName }}</span>
												<span class='time'></span>
											</div>
											<!--{{ (message.files.length > 0) ? message.files[0].attributes.url : '0' }}-->
											<div class='body'>
												<div v-html='ticketDetail.detail'></div>
												<div v-html='ticketDetail.observation'></div>
											</div>
										</div>

										<div
											v-bind:class='[menorcaMessage(message.attributes.creator_type)]'
											v-for='message in messages'
											:key='message.id'>
											<div class='header'>
												<span
												>{{
														message.user == 'Ventana Menorca'
															? ticketDetail.attendant.fname +
															' ' +
															ticketDetail.attendant.lname
															: message.user
													}}
												</span>
												<span class='time'>{{
														$moment
															.unix(message.attributes.created_at)
															.format('DD/MM/YYYY hh:mm A')
													}}</span>
											</div>
											<!--{{ (message.files.length > 0) ? message.files[0].attributes.url : '0' }}-->
											<div class='body'>
												<div v-html='message.attributes.message'></div>
												<div class='file' v-if='message.files.length > 0'>
													<div>Archivo adjunto</div>
													<a :href='message.files[0].attributes.url' target='_blank'>{{
															message.files[0].attributes.url
														}}</a>
												</div>
											</div>
										</div>
									</template>
								</simplebar>
								<div class='chat-input' v-if='titular==="titular"'>
									<div>
										<label class='custom-file-upload'>
											<input
												id='file'
												type='file'
												ref='file'
												accept='image/*, application/pdf'
												@change='onFileChange' />
											<img src='~assets/img/chat/add-file.png' alt='' />
											Adjuntar
										</label>
									</div>
									<input v-model='textToSend' type='text' placeholder='Escriba aquí su consulta...' />
									<button class='btn-send' @click='sendMessage'>
										<img src='~assets/img/chat/send-icon.png' alt='' />
									</button>

									<div v-if='fileName'>
										<div class='remove-file' @click='removeFile'>
											{{ fileName }}
											<img src='~assets/img/remove-btn.png' alt='Remover archivo' />
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
	import { mapGetters } from 'vuex';
	import Menu from '@/components/common/Menu';
	import Sidebar from '@/components/common/Sidebar';
	import Accordion from '@/components/common/Accordion';
	import simplebar from 'simplebar-vue';
	import 'simplebar/dist/simplebar.min.css';

	export default {
		middleware: 'auth',
		transition: 'slide-left',
		data() {
			return {
				errors: {
					nombre: false,
					celular: false,
					dni: false,
					ubicacion_proyecto: false,
					correo_electronico: false,
					tipo_inmueble: false,
					apellidos: false,
				},
				properties: {},
				positionFixed: true,
				successMessage: '',
				errorMessage: '',
				userAccount: {},
				hideFooterModal: true,
				dataSelecionada: [],
				id: '',
				nombre: '',
				apellidos: '',
				celular: '',
				dni: '',
				ubicacion_proyecto: '',
				correo_electronico: '',
				tipo_inmueble: '',
				comentario: '',
				tabIndex: 0,
				errorActive: false,
				errorForm: {
					nombre: 'Ingrese un nombre',
					apellidos: 'Ingrese un apellido',
					celular: 'Ingrese un celular válido',
					dni: 'Ingrese un DNI válido',
					correo_electronico: 'Ingrese un correo válido',
					ubicacion_proyecto: 'Seleccione un proyecto',
					tipo_inmueble: 'Seleccione un tipo de inmueble',
					comentario: 'Ingrese un comentario',
				},
				projects: {},
				arrProjects: [],
				arrProperties: [],
				activeForm: 'referidos',
				activeUser: {},

				selectedUserPayments: [],
				selectedPayments: [],
				previousPendingPayments: [],
				nextPendingPayment: '',
				nextPendingPayments: [],

				allPendingPayments: [],
				oldestPendingPayment: [],
				quotaToPay: true,
				disabledGenerateCode: false,

				loading: false,
				loadingTicket: true,

				loadingGeneralInfo: true,
				loadingPaymentProgress: true,
				loadingPaymentHistory: true,
				loadingFetchMorePaymentHistory: false,

				textToSend: null,
				fileName: '',
				imageDesktop: null,
				username: null,
				titular: '',
				titularFullName: '',
			};
		},
		components: {
			Menu,
			Sidebar,
			Accordion,
			simplebar,
		},
		watch: {},
		computed: {
			...mapGetters({
				user: 'account/getUser',
				messages: 'atencioncliente/getMessages',
				ticketDetail: 'atencioncliente/getTicketDetail',
			}),
		},
		async mounted() {
			this.loading = true;

			const session = JSON.parse(Cookies.get('session'));

			const token = session.token;

			this.titular = localStorage.getItem('titular');
			this.titularFullName = localStorage.getItem('titular_full_name');

			const payload = {
				token: token,
				id: this.$route.params.id,
			};

			let response = await this.$store.dispatch('atencioncliente/fetchTicket', payload);

			if (response.success === true) {
				this.loading = false;

			} else if (response.success === false) {
				this.errorMessage = response.message;
			}
			this.loading = false;
			this.loadingTicket = false;
			this.scrollToEnd();
			/*.then( ( response ) => {

				console.log('response', response);
				this.loading = false;

				if (response.success == true) {
					this.scrollToEnd();

				} else if (response.success == false) {
					console.log(response);
					this.errorMessage = response.message;
				}

			});*/

			await this.$store.dispatch('account/getUserAccount', { token })
				.then((response) => {
					this.username = response.data.profile.name;
				});

		},
		methods: {
			scrollToEnd() {
				setTimeout(() => {
					const container = this.$refs.chatArea.SimpleBar.getScrollElement();

					var maxScrollPosition = container.scrollHeight;
					this.$refs.chatArea.SimpleBar.getScrollElement().scrollTop = maxScrollPosition;
				}, 0);
			},
			async updateTicket() {
				const session = JSON.parse(Cookies.get('session'));

				const token = session.token;

				const payload = {
					token: token,
					id: this.$route.params.id,
				};

				await this.$store.dispatch('atencioncliente/fetchTicket', payload)
					.then((response) => {
						this.loading = false;

						if (response.success === true) {

						} else if (response.success === false) {
							this.errorMessage = response.message;
						}

					});
			},
			onFileChange(e) {

				if (e.target.files.length) {
					const file = e.target.files[0];
					this.imageDesktop = file;
					this.fileName = file.name;
				} else {
					this.imageDesktop = null;
					this.fileName = '';
				}
			},
			removeFile() {
				this.$refs.file.value = null;
				this.imageDesktop = null;
				this.fileName = '';
			},
			async sendMessage() {

				if (this.textToSend == null || this.textToSend.trim().length == 0) {
					return;
				}

				//this.loading = true;
				this.successMessage = '';
				this.errorMessage = '';
				this.errorActive = false;

				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;

				const obj = {
					token: token,
					payload: {
						id: this.$route.params.id,
						content: this.textToSend,
						fileName: this.fileName,
						file: this.imageDesktop,
					},
				};

				//if (this.validate()) {
				//this.loading = false;

				await this.$store.dispatch('atencioncliente/sendMessage', obj).then((response) => {
					this.updateTicket();
					this.textToSend = '';
					this.fileName = '';
					this.imageDesktop = null;
					this.$refs.file.value = null;
					this.scrollToEnd();
				});
				//}
			},
			menorcaMessage(type) {
				return type == 'Client' ? 'owner-message' : 'menorca-message';
			},
			async openModal() {

				setTimeout(() => {
					this.$bvModal.show('modal_sac');
				}, 500);

			},
			onlyNumber($event) {
				let keyCode = $event.keyCode ? $event.keyCode : $event.which;
				if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
					$event.preventDefault();
				}
			},
			generateCodeFromCIPState() {
				this.cipState = false;
				this.step1 = true;
			},
			sortedArray(array) {
				return array.slice().sort(function(a, b) {
					return a.name > b.name ? 1 : -1;
				});
			},
			validateEmail(value) {
				if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
					return true;
				} else {
					return false;
				}
			},
			capitalizeWord(str) {
				const str2 = str.charAt(0).toUpperCase() + str.slice(1);
				return str2;
			},
			async getGContacts() {
				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;

				await this.$store
					.dispatch('contact/getGoogleContacts', { token })
					.then((response) => {
					});
			},
			goToDetail() {
				this.$router.push('/atencion-al-cliente/detalle/c30918');
			},
		},
	};
</script>

<style>
	input[type='file'] {
		display: none;
	}

	.custom-file-upload {
		display: inline-block;
		cursor: pointer;
		text-decoration: underline;
		color: green;
	}
</style>
