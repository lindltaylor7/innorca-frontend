<template>
	<div id="atencion_cliente">
		<Menu :positionFixed="positionFixed" :logged="true" />
		<div class="page" v-bind:class="{ fixed: positionFixed }">
			<div class="container">
				<Sidebar />
				<!-- Page Content -->
				<div class="h-100 page-content">
					<div class="box">
						<h3 class="title mb-3">¿Tienes dudas? La respuesta podría estar aquí</h3>

						<div class="row">
							<div class="col-12">
								<div v-show="loadingQuestions" class="card justify-content-center">
									<div class="loader-big"></div>
								</div>

								<div v-show="!loadingQuestions" class="card sm-card question-list">
									<h3 class="subtitle-filters">Buscador</h3>
									<div class="filters">
										<div class="filter-field">
											<div>
												<input v-model="filter.form.title" id="buscar_text" class="input-fix"
													v-bind:class="{
														error: filter.errors.title,
													}" type="text" required />
												<label for="buscar_text" placeholder="Buscar"></label>
												<span v-if="filter.errors.title" class="error">
													{{ filter.errors.title }}
												</span>
											</div>
										</div>
										<div class="filter-field">
											<div>
												<select v-model="filter.form.category" id="category"
													v-bind:class="{ error: filter.errors.categories }" required>
													<!-- <option value="-" selected>Todo</option> -->
													<option v-for="questionCategory in questionCategoriesOptions"
														:key="questionCategory._id" :value="questionCategory"
														:selected="questionCategory.name == 'Todo'">
														<span
															v-if="!questionCategory.subcategories">&nbsp;&nbsp;&nbsp;</span>
														{{ questionCategory.name }}
													</option>
												</select>
												<label for="category" placeholder="Categorías"></label>
												<span v-if="filter.errors.categories" class="error">
													{{ filter.errors.categories }}
												</span>
											</div>
										</div>
										<div class="filter-button-space">
											<button class="btn btn-green" @click="toFilter()">Buscar</button>
										</div>
									</div>

									<Accordion v-for="question in questions" :title="question.question"
										:key="question._id">
										<div v-html="question.answer"></div>
										<div class="question-answer-rating">
											<span class="question-answer-rating__title">¿Te ha resultado útil esta
												información?</span>
											<div class="question-answer-rating__actions">
												<ButtonIconText @click="toRate(question, 1)"
													:iconSrc="require('~/assets/img/icons/icon_like.svg')"
													:active="question.rating > 0" text="SÍ" />
												<ButtonIconText @click="toRate(question, -1)"
													:active="question.rating < 0" text="NO"
													:iconSrc="require('~/assets/img/icons/icon_dislike.svg')" />
											</div>

											<p class="question-answer-rating__categories">
												categorias:
												<span v-for="(category, index) in question.categories"
													:key="category._id">
													<span class="categories-tag">
														{{ category.name }}
													</span>
													<span class="categories-tag__separator">
														{{ index == question.categories.length - 1 ? '' : ', ' }}
													</span>
												</span>
											</p>
										</div>
									</Accordion>

									<div v-if="nextMoreQuestions" class="text-center mt-3">
										<div @click="fetchMoreQuestions()" style="cursor: pointer">
											<span class="see-more" :class="{ loading: loadingFetchMoreQuestions }">VER
												MÁS</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="row mt-4">
							<div class="col-12">
								<div class="welcome-text mb-2">
									<h3 class="section-title m-0" v-if="titular === 'titular'">
										Crear solicitud de atención
									</h3>
									<h3 class="section-title m-0" v-else>Solicitudes de atención</h3>
									<p v-if="titular === 'titular'">
										Hola {{ userName }}, si tienes un inconveniente puedes generar una solicitud de
										atención y un agente de Menorca atenderá tu solicitud, recuerda que el tiempo
										aproximado de respuesta es de 48 a 72 horas.
									</p>

									<p v-else>
										Hola {{ userName }}, si tienes un inconveniente recuerda que solo el titular del
										immueble puede generar una solicitud de atención, luego de esto, un agente de
										Menorca atenderá la solicitud, recuerda que el tiempo aproximado de respuesta es
										de 48 a 72 horas.
									</p>

									<img src="~assets/img/faq-ticket.png" alt="" />
								</div>

								<div v-show="loadingTickets" class="card justify-content-center">
									<div class="loader-big"></div>
								</div>

								<div v-show="!loadingTickets" class="card">
									<div class="table">
										<div class="bar" v-if="titular === 'titular'">
											<button class="btn btn-green" @click="openCreateModal()">Crear
												Solicitud</button>
										</div>

										<div class="table__header atencion-cliente">
											<div># DE TICKET</div>
											<div>proyecto</div>
											<div>tipo de solicitud</div>
											<div>categoría atención</div>
											<div>fecha</div>
											<div>estado</div>
										</div>

										<template v-if="tickets.length > 0">
											<div class="table__body atencion-cliente">
												<div @click="goToDetail(ticket.id)" v-for="ticket in tickets"
													:key="ticket.id" style="cursor: pointer">
													<div>
														<span># de ticket</span>
														<div class="value-table">{{ ticket.code }}</div>
													</div>
													<div>
														<span>asunto</span>
														<div class="value-table asunto">{{ ticket.detail }}</div>
													</div>
													<div>
														<span>tipo de solicitud</span>
														<div class="value-table">{{ ticket.type }}</div>
													</div>
													<div>
														<span>categoría atención</span>
														<div class="value-table">{{ ticket.category }}</div>
													</div>
													<div>
														<span>fecha</span>
														<div class="value-table">{{ ticket.date }}</div>
													</div>
													<div>
														<span>estado</span>
														<span class="badge badge-primary" v-bind:style="{
															color: ticket.status.code.secondaryColor,
															backgroundColor: ticket.status.code.color,
														}">
															{{ ticket.status.code.name }}
														</span>
													</div>
												</div>
											</div>

											<div v-if="nextMoreTickets" class="text-center mt-3">
												<div @click="fetchMoreTickets()" style="cursor: pointer">
													<span class="see-more"
														:class="{ loading: loadingFetchMoreTickets }">VER MÁS</span>
												</div>
											</div>
										</template>

										<template v-else>
											<div class="text-center">
												<strong style="font-size: 16px" v-if="titular === 'titular'">Aún no has
													generado ninguna solicitud</strong>
												<strong v-else>No se encontraron solicitudes generadas</strong>
											</div>
										</template>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Modal />
	</div>
</template>

<script>
import Cookies from 'js-cookie';
import { mapActions, mapGetters } from 'vuex';
import Menu from '@/components/common/Menu';
import Sidebar from '@/components/common/Sidebar';
import Accordion from '@/components/common/Accordion';
import ButtonIconText from '../../components/common/ButtonIconText.vue';
import { EVENTS } from '../../core/constants/events';
import Modal from './modal.vue';

export default {
	middleware: 'auth',
	transition: 'slide-left',
	data() {
		return {
			errors: {
				tipo_solicitud: false,
				categoria_atencion: false,
				proyecto: false,
				correo: false,
				celular: false,
				asunto: false,
				solicitud: false,
				contrato: false,
			},
			mainCategory: null,
			filter: {
				exceptions: {
					categories: [],
				},
				options: {
					categories: [],
				},
				form: {
					title: '',
					category: '',
				},
				errors: { title: null, category: null },
			},
			properties: {},
			positionFixed: true,
			successMessage: '',
			errorMessage: '',
			userAccount: {},
			hideFooterModal: true,
			dataSelecionada: [],

			tipo_solicitud: '',
			categoria_atencion: '',
			proyecto: '',
			correo: '',
			celular: '',
			asunto: '',
			solicitud: '',
			contrato: '',

			filteredBudgets: [],
			projectId: '',
			budgetId: '',
			contractNum: '',

			tabIndex: 0,
			errorActive: false,
			errorForm: {
				tipo_solicitud: 'Seleccione un tipo de solicitud',
				categoria_atencion: 'Seleccione una categoría de atención',
				proyecto: 'Seleccione un proyecto',
				correo: 'Ingrese un correo',
				celular: 'Ingrese un número de celular',
				asunto: 'Ingrese un asunto',
				solicitud: 'Ingrese una mensaje',
				contrato: 'Seleccione un contrato',
			},

			selectedUserPayments: [],
			selectedPayments: [],
			previousPendingPayments: [],
			nextPendingPayment: '',
			nextPendingPayments: [],

			allPendingPayments: [],
			oldestPendingPayment: [],
			quotaToPay: true,
			disabledGenerateCode: false,

			page: 1,

			loadingQuestions: true,
			loadingTickets: true,
			loadingFetchMoreTickets: false,
			loadingFetchMoreQuestions: false,
			nextMoreQuestions: true,
			nextMoreTickets: true,

			file: 0,
			image: '',
			fileName: '',
			imageDesktop: null,

			loadingImage: false,
			titular: '',
		};
	},
	components: {
		Menu,
		Sidebar,
		Accordion,
		ButtonIconText,
		Modal
	},
	watch: {
		nextTickets(newObj) {
			if (typeof newObj !== 'undefined') {
				this.nextMoreTickets = newObj === 0 ? false : true;
			} else {
				this.nextMoreTickets = true;
			}
		},
		nextQuestions(newObj) {
			if (typeof newObj !== 'undefined') {

				if (newObj.page === newObj.pages) {
					this.nextMoreQuestions = false;
				} else {
					this.nextMoreQuestions = true;
				}
			} else {
				this.nextMoreTickets = true;
			}
		},
		proyecto(val) {
			this.filterBudgets(val);
		},
		categoryAttentions() {
			//console.log("categoryAttentions", this.categoryAttentions);
		},
	},
	computed: {
		...mapGetters({
			user: 'account/getUser',
			typeAttentions: 'atencioncliente/getTypeAttentions',
			categoryAttentions: 'atencioncliente/getCategoryAttentions',
			budgets: 'atencioncliente/getBudgets',
			questions: 'atencioncliente/getQuestions',
			tickets: 'atencioncliente/getTickets',
			nextTickets: 'atencioncliente/getNextTickets',
			nextQuestions: 'atencioncliente/getNextQuestions',
			questionCategories: 'faq/getQuestionCategories',
		}),
		projects() {
			let projects = [];

			this.budgets.map((budget) => {
				const match = projects.find((project) => project.id == budget.project.id);
				if (!match) projects.push(budget.project);
			});

			return projects;
		},
		userName() {
			if (this.user !== undefined && this.user.profile !== undefined && this.user.profile.name) {
				let str = this.user.profile.name.split(' ')[0].toLowerCase();
				return str.charAt(0).toUpperCase() + str.slice(1);
			}
		},
		questionCategoriesOptions() {
			let categoriesOptions = []
			const acceptedCategoriesName = ['Atención al cliente']
			this.questionCategories.forEach((category) => {
				if (category.name == "Atención al cliente")
					this.filter.form.category = category;
				if (acceptedCategoriesName.includes(category.name)) {
					categoriesOptions.push(category)
					category.subcategories?.forEach(subcategories => {
						categoriesOptions.push(subcategories)
					})
				}
			})
			return categoriesOptions
		}
	},
	async created() {
		this.fetchQuestionCategories();
	},
	async mounted() {
		const session = JSON.parse(Cookies.get('session'));
		const token = session.token;

		this.titular = localStorage.getItem('titular');
		const obj = {
			token: token,
		};
		const obj2 = {
			token: token,
			payload: {
				page: this.page,
			},
		};

		const obj3 = {
			token: token,
			payload: {
				page: this.page,
				budgetCode: localStorage.getItem('budget_code'),
			},
			params: {

			}
		};


		this.$store.dispatch('atencioncliente/fetchTickets', obj3).then((response) => {
			this.loadingTickets = false;
			localStorage.setItem('titular_full_name', response.titularFullName);
		});

		this.$store.dispatch('atencioncliente/fetchTicketOptions', obj).then(() => { });

		await this.$store.dispatch('account/getUserAccount', { token }).then((response) => { });

		let referPayments = this.$route.query.ref;

		if (referPayments) {
			this.tipo_solicitud = {
				color: '#ff7519',
				id: 3,
				max_attention: 7,
				name: 'Solicitud',
				reminder_days: 3,
			};

			this.categoria_atencion = {
				id: 39,
				name: 'Lotes-Cobranza',
			};

			this.proyecto = this.projects[0].id;

			this.correo = this.user.email;
			this.celular = this.user.profile.phone;
			//this.asunto = '';

			setTimeout(() => {
				this.$bvModal.show('modal_sac');
			}, 500);
		}
	},
	methods: {
		openCreateModal() {
			this.$bvModal.show('modal_sac')
		},
		fetchQuestions() {

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;
			const filterForm = {
				category: this.mainCategory._id
			}
			const obj = {
				token: token,
				payload: {
					token: token,
					page: this.page,
				},
				params: filterForm,
			};
			this.$store.dispatch('atencioncliente/fetchQuestions', obj).then(() => {
				this.loadingQuestions = false;
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
		filterBudgets(id) {
			const filteredBudgets = this.budgets.reduce((acc, budget) => {
				if (id && budget.project.id != id) return acc;
				return [...acc, budget];
			}, []);



			this.contractNum = '';
			this.budgetId = '';
			this.filteredBudgets = filteredBudgets;
		},
		fetchMoreQuestions() {
			this.loadingFetchMoreQuestions = true;

			this.page++;

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {
					page: this.page,
				},
				params: {
					category: this.mainCategory._id
				}
			};

			this.$store.dispatch('atencioncliente/fetchMoreQuestions', obj).then((response) => {
				this.loadingFetchMoreQuestions = false;
			});
		},
		updateTicketsList() {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {
					page: 1,
					budgetCode: localStorage.getItem('budget_code'),
				},
			};

			this.$store.dispatch('atencioncliente/fetchTickets', obj).then(() => {
				this.loadingTickets = false;
			});
		},
		fetchMoreTickets() {
			this.loadingFetchMoreTickets = true;

			this.page++;

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {
					page: this.page,
					budgetCode: localStorage.getItem('budget_code'),
				},
			};

			this.$store.dispatch('atencioncliente/fetchMoreTickets', obj).then((response) => {
				this.loadingFetchMoreTickets = false;
			});
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
			return array.slice().sort(function (a, b) {
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

			await this.$store.dispatch('contact/getGoogleContacts', { token }).then((response) => {
				console.log('getGoogleContacts', response);
			});
		},
		validate() {
			this.tipo_solicitud === '' || this.tipo_solicitud === '-'
				? (this.errors.tipo_solicitud = true)
				: (this.errors.tipo_solicitud = false);

			this.categoria_atencion === '' || this.categoria_atencion === '-'
				? (this.errors.categoria_atencion = true)
				: (this.errors.categoria_atencion = false);

			this.proyecto === '' || this.proyecto === '-'
				? (this.errors.proyecto = true)
				: (this.errors.proyecto = false);

			!this.validateEmail(this.correo) ? (this.errors.correo = true) : (this.errors.correo = false);

			//console.log("this.celular", this.celular);
			this.celular === '' ? (this.errors.celular = true) : (this.errors.celular = false);
			this.asunto === '' ? (this.errors.asunto = true) : (this.errors.asunto = false);
			this.solicitud === '' ? (this.errors.solicitud = true) : (this.errors.solicitud = false);

			this.contrato === '' || this.contrato === '-'
				? (this.errors.contrato = true)
				: (this.errors.contrato = false);

			//validar form
			if (
				!this.errors.tipo_solicitud &&
				!this.errors.categoria_atencion &&
				!this.errors.proyecto &&
				!this.errors.correo &&
				!this.errors.celular &&
				!this.errors.asunto &&
				!this.errors.solicitud &&
				!this.errors.contrato
			) {
				return true;
			} else {
				return false;
			}
		},
		async sendForm() {
			this.loading = true;
			this.successMessage = '';
			this.errorMessage = '';
			this.errorActive = false;

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {
					typeAttention: JSON.stringify(this.tipo_solicitud),
					categoryAttention: JSON.stringify(this.categoria_atencion),
					projectId: this.proyecto,
					budgetId: this.contrato,
					email: this.correo,
					phone: this.celular,
					subject: this.asunto,
					detail: this.solicitud,
					file: this.imageDesktop, //this.file,
					fileName: this.fileName,
				},
			};

			if (this.validate()) {
				this.loading = false;

				await this.$store.dispatch('atencioncliente/createRequest', obj).then((response) => {
					if (response.success) {
						this.errorActive = false;
						this.errorMessage = '';

						this.save({
							type: EVENTS.atencionCliente.crearSolicitud,
							payload: {
								tipo: this.tipo_solicitud?.name,
								categoria: this.categoria_atencion?.name,
								proyecto: this.projects?.find((p) => p.id === this.proyecto)?.name,
							},
						});

						setTimeout(() => {
							this.$bvModal.hide('modal_sac');
						}, 100);

						this.updateTicketsList();
						this.cleanForm();
					} else {
						this.errorActive = true;
						this.errorMessage = response.message;
					}
				});
			}
		},
		cleanForm() {
			(this.tipo_solicitud = ''),
				(this.categoria_atencion = ''),
				(this.proyecto = ''),
				(this.correo = ''),
				(this.celular = ''),
				(this.asunto = ''),
				(this.solicitud = ''),
				(this.contrato = ''),
				(this.image = '');
			this.imageDesktop = null;
			this.fileName = '';
			this.$refs.file.value = null;
		},
		async openModal() {
			this.save({ type: EVENTS.atencionCliente.clickCrearSolicitud });
			setTimeout(() => {
				this.$bvModal.show('modal_sac');
			}, 500);
		},
		async closeModal() {
			setTimeout(() => {
				this.$bvModal.hide('modal_sac');
			}, 100);
		},
		goToDetail(id) {
			this.save({
				type: EVENTS.atencionCliente.clickHistorialAtencion,
				payload: {
					atencionId: id,
				},
			});

			this.$router.push('/atencion-al-cliente/detalle/' + id);
		},
		...mapActions({
			save: 'metrics/save',
		}),


		toRate(question, rateNumber) {
			if (!question || !rateNumber) {
				return;
			}

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;
			const obj = {
				token,
				questionId: question._id,
				payload: {
					rating: question.rating == rateNumber ? 0 : rateNumber,
				},
			};
			this.$store.dispatch('faq/rateQuestionAnswer', obj).then((data) => {
				if (data.success) {
					const payload = {
						question: data.frequentQuestion,
					};
					this.$store.commit('atencioncliente/modifyQuestionRate', payload);
				}
			});
		},
		toFilter() {
			let filterForm = {};
			if (this.filter.form.category?.questionCategory) {
				const subcategory = this.filter.form.category;
				filterForm.subcategory = subcategory._id;
				filterForm.category = subcategory.questionCategory;
			} else {
				filterForm.category = this.filter.form.category._id;
			}
			if (this.filter.form.title) {
				filterForm.title = this.filter.form.title
			}
			if (this.filter.exceptions.categories.includes(filterForm.category)) {
				filterForm.category = null;
			}
			filterForm.category = this.filter.options.categories?.find(cat => cat.name == 'Atención al cliente')?._id || filterForm.category
			this.loadingQuestions = true;
			/* Object.keys(this.filter.form).forEach(key => {
		const value = this.filter.form[key]
		if(value){
		  filterForm[key] = value
		}
	  }) */
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;
			const obj = {
				token: token,
				payload: {
					token: token,
					page: this.page,
				},
				params: filterForm,
			};
			this.page = 1;
			this.$store.commit('atencioncliente/cleanMoreQuestions');
			this.$store.dispatch('atencioncliente/fetchQuestions', obj).then(() => {
				this.loadingQuestions = false;
			});
		},
		fetchQuestionCategories() {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;
			const obj = {
				token: token,
				payload: {
					page: this.page,
				},
				params: {
					category: this.filter.options.categories?.find(cat => cat.name == 'Atención al cliente')?._id || null
				}
			};
			this.$store.dispatch('faq/fetchQuestionCategories', obj).then((data) => {
				data.questionCategories.forEach((item) => {
					if (item.name == 'Atención al cliente') {
						this.mainCategory = item
						this.fetchQuestions()
					}
				});
				//this.loadingFetchMoreQuestions = false;
			});
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
