<template>
	<div id="menu" v-bind:class="{ fixed: positionFixed }">
		<div class="container">
			<div class="nav">
				<div class="mobile-menu">
					<div>
						<img @click="openHambMenu" src="~assets/img/hamburguer-menu.svg" alt="" />
					</div>
					<div>
						<img src="../../assets/img/mobile-logo.svg" alt="" />
					</div>
					<div @click="toggleNotifications">
						<img class="bell-icon" width="30" height="30" src="~assets/img/bell-icon.svg" alt="" />
						<div v-if="hasNotifications" class="notification"></div>

						<div class="account-dropdown-notifications container" v-show="showNotifications">
							<ul>
								<li v-for="notification in notifications" :key="notification.id">
									{{ notification.message }}
								</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- -->

				<div class="overlay hamb-menu" v-bind:class="{ active: isActiveHambMenu }">
					<div class="header">
						<img class="logo" src="~assets/img/logo.svg" alt="Logo" />
						<img @click="closeHambMenu" class="btn-close" src="~assets/img/close-btn.svg" alt="Close" />
					</div>

					<div class="header-ext" v-if="!logged">
						<hr />
						<ul class="actions">
							<li>
								<a
									href="/login"
									aria-current="page"
									class="btn btn-white nuxt-link-exact-active nuxt-link-active"
									>Ingresa</a
								>
							</li>
							<li>
								<a href="/signup" class="btn btn-green">Regístrate</a>
							</li>
						</ul>
					</div>

					<div class="body" v-if="logged">
						<div class="properties-menu" @click="toggleProperties">
							<div class="property">
								<img :srcset="this.badgetSourceset(biicon)" alt="" class="image" />
								<div class="property-line"></div>
								<div class="text">
									<ul>
										<li>
											ET: <span>{{ etapa }} | </span>
										</li>
										<li>
											MZ: <span>{{ manzana }} | </span>
										</li>
										<li>
											LT: <span>{{ lote }}</span>
										</li>
									</ul>
								</div>
								<font-awesome-icon :icon="['fas', 'caret-down']" style="color: #00923e" />
							</div>

							<div class="property-dropdown" v-show="showProperties">
								<ul>
									<li v-if="budgets.length == 0">Cargando...</li>
									<li v-for="budget in budgets" :key="budget.id" @click="selectBudget(budget)">
										<div class="property-d">
											<img
												class="image"
												:srcset="badgetIconSourceset(budget.project_id)"
												alt="" />
											<!-- projectId -->
											<div class="property-line"></div>
											<div class="text">
												<ul>
													<li>
														Et: <span>{{ budget.etapa }}</span> |
													</li>
													<li>
														Mz: <span>{{ budget.manzana }} </span> |
													</li>
													<li>
														Lt: <span>{{ budget.lote }} </span>
													</li>
												</ul>
											</div>
										</div>
										<!--<h3>{{ budget.project.name }}</h3>
                    <small>No. contrato: {{ budget.contractNum }}</small>-->
									</li>
								</ul>
							</div>
						</div>

						<ul class="list" v-if="!loading">
							<hr />

							<li @click="goToInicio">
								<img src="~assets/img/icons/dashboard.png" />
								<span>Inicio</span>
							</li>
							<li @click="goToMisPagos">
								<img src="~assets/img/icons/money.png" />
								<span>Mis pagos</span>
							</li>
							<li @click="goToMisPropiedades">
								<img src="~assets/img/icons/house.png" />
								<span>Mis inmuebles</span>
							</li>
							<!--<li><img src="~assets/img/icons/text.png" /> <span>Novedades</span></li>-->
							<li @click="goToMisReferidos">
								<img src="~assets/img/icons/people.png" />
								<span>Mis referidos</span>
							</li>
							<li @click="goToAtencionAlCliente">
								<img src="~assets/img/icons/girl.png" />
								<span>Atención al cliente</span>
							</li>
							<li @click="goToMisConstrucciones">
								<img src="~assets/img/icons/building.png" />
								<span>Construcciones</span>
							</li>
							<li @click="goToPreguntasFrecuentes">
								<img src="~assets/img/icons/question.png" />
								<span>Preguntas frecuentes</span>
							</li>

							<hr />

							<li @click="goToProfile"><img src="~assets/img/icons/user.png" /> Mis datos personales</li>
							<li @click="goToChangePassword">
								<img src="~assets/img/icons/lock.png" /> Cambiar contraseña
							</li>

							<hr />
						</ul>

						<button @click="logout" class="btn btn-white nowrap">Cerrar Sesión</button>
					</div>
				</div>

				<div class="desktop-menu" v-if="logged">
					<nuxt-link to="/">
						<img class="logo" src="~assets/img/logo.svg" alt="Logo" />
						<div class="d-none">
							<v-idle
								@idle="logoutSession"
								@remind="showLogoutModal"
								:reminders="[30]"
								:duration="11900"
								:events="['mousemove', 'click']" />
						</div>
					</nuxt-link>

					<div class="right-actions">
						<ul class="list list-unstyled m-0" style="padding: 0">
							<li class="mr-3">
								<div class="properties-menu" @click="toggleProperties">
									<div class="property">
										<img class="image" :srcset="this.badgetSourceset(biicon)" alt="" />
										<div class="property-line"></div>
										<div class="text">
											<div>
												Et: {{ etapa }}<br />
												Mz: {{ manzana }}<br />
												Lt: {{ lote }}
											</div>
										</div>
										<font-awesome-icon :icon="['fas', 'caret-down']" style="color: #00923e" />
									</div>

									<div class="property-dropdown" v-show="showProperties">
										<ul>
											<li v-if="budgets.length == 0">Cargando...</li>
											<li
												v-for="budget in budgets"
												:key="budget.id"
												@click="selectBudget(budget)">
												<div class="property-d">
													<img
														class="image"
														:srcset="badgetIconSourceset(budget.project_id)"
														alt="" />
													<!-- projectId -->
													<div class="property-line"></div>
													<div class="text">
														<div>
															Et: {{ budget.etapa }}<br />
															Mz:
															{{ budget.manzana }}<br />
															Lt:
															{{ budget.lote }}
														</div>
													</div>
												</div>
												<!--<h3>{{ budget.project.name }}</h3>
                        <small>No. contrato: {{ budget.contractNum }}</small>-->
											</li>
										</ul>
									</div>
								</div>
							</li>
							<li class="mr-3">
								<div
									class=""
									style="
										position: relative;
										background: white;
										border-radius: 50px;
										padding: 11px;
										cursor: pointer;
									"
									@click="toggleNotifications">
									<img
										class="bell-icon"
										width="30"
										height="30"
										src="~assets/img/bell-icon.svg"
										alt="" />
									<div v-if="hasNotifications" class="notification"></div>

									<div class="account-dropdown-notifications" v-show="showNotifications">
										<ul>
											<li v-for="notification in notifications" :key="notification.id">
												{{ notification.message }}
											</li>
										</ul>
									</div>
								</div>
							</li>
							<li>
								<div
									class=""
									style="
										position: relative;
										background: white;
										border-radius: 50px;
										padding: 11px;
										cursor: pointer;
									"
									@click="toggle">
									<img class="account" src="~assets/img/user-circle.png" alt="" />

									<div class="account-dropdown" v-show="showMenu">
										<ul>
											<li @click="goToProfile">Mi Perfil</li>
											<li @click="logout">Cerrar Sesión</li>
										</ul>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div class="desktop-menu" v-else>
					<nuxt-link to="/">
						<img class="logo" src="~assets/img/logo.svg" alt="Logo" />
					</nuxt-link>

					<template v-if="inversed">
						<ul class="actions">
							<li>
								<nuxt-link to="/login" class="btn btn-green">Ingresa</nuxt-link>
							</li>
							<li>
								<nuxt-link to="/signup" class="btn btn-white">Regístrate</nuxt-link>
							</li>
						</ul>
					</template>
					<template v-else>
						<ul class="actions">
							<li v-show="true || !landing">
								<img
									@click="showUserHelperModal"
									class="icon-help"
									src="~assets/img/login/icon_help.svg"
									alt="" />
							</li>
							<li v-show="!landing">
								<nuxt-link to="/login" class="btn btn-white">Ingresa</nuxt-link>
							</li>
							<li>
								<nuxt-link to="/signup" class="btn btn-green">Regístrate</nuxt-link>
							</li>
						</ul>
					</template>
				</div>
			</div>
		</div>

		<b-modal id="modal_session" ref="modal_session" centered title="Aviso por inactividad" @hide="cancelLogout">
			<p class="m-0">
				No se ha detectado actividad en su cuenta. Por su seguridad en se cerrara sesión en unos segundos.
			</p>

			<template #modal-footer="{ close }" class="text-center">
				<span class="float-left text-green" @click="close()" style="cursor: pointer">CANCELAR</span>
				<a class="float-left btn btn-green ml-5" @click="logoutSession()">CERRAR SESIÓN</a>
			</template>
		</b-modal>
		<UserHelperModal />
	</div>
</template>

<script>
import Cookies from 'js-cookie';
import { mapActions, mapGetters } from 'vuex';
import { EVENTS } from '../../core/constants/events';
import UserHelperModal from '../modals/UserHelperModal.vue';

export default {
	data() {
		return {
			showMenu: false,
			showProperties: false,
			showNotifications: false,
			finishedLoadingBudgets: true,
			isActiveHambMenu: false,
			hasNotifications: false,
			loading: true,
			etapa: '',
			manzana: '',
			lote: '',
			budgetImageIcon: '',
			biicon: '',
			titular: '',
		};
	},
	components: { UserHelperModal },
	name: 'Menu',
	computed: {
		...mapGetters({
			budgets: 'property/getBudgets',
			notifications: 'atencioncliente/getNotifications',
			userHelperModalRef: 'account/getUserHelperModalRef',
		}),
	},
	watch: {
		notifications(newVal) {
			newVal.map((notification) => {
				if (notification.read === false) {
					this.hasNotifications = true;
				}
			});
		},
		budgetImageIcon(newVal) {
			if (newVal) {
				this.biicon = newVal;
			} else {
				this.biicon = 'sin-logo.svg';
			}
		},
		/*budgetImage() {
			//project_id

			if (localStorage.getItem("project_id") !== null) {
				return 'alto-piura.svg';
			} else {
				return 'sin-logo.svg';
			}

		},*/
		budgets(newVal) {
			if (newVal) {
				this.loading = false;
			}
		},
	},
	props: ['positionFixed', 'logged', 'inversed', 'landing'],
	methods: {
		badgetIconSourceset(icon) {
			try {
				if (typeof icon !== 'undefined') {
					let iconT;

					switch (icon) {
						case 36:
							iconT = 'alto-piura.svg';
							break;
						case 41:
							iconT = 'caleta-san-antonio.svg';
							break;
						case 55:
							iconT = 'colonial1050.svg';
							break;
						case 6:
							iconT = 'el-boulevard-de-san-antonio.svg';
							break;
						case 9:
							iconT = 'las-cascadas-de-san-antonio.svg';
							break;
						case 42:
							iconT = 'el-olivar-de-pisco.svg';
							break;
						case 13:
							iconT = 'la-estancia-de-santa-maria.svg';
							break;
						case 8:
							iconT = 'los-molinos-de-carabayllo.svg';
							break;
						case 14:
							iconT = 'portada-del-sol-ica.svg';
							break;
						case 52:
							iconT = 'posada-del-sol-chiclayo.svg';
							break;
						case 51:
							iconT = 'depas-mala.svg';
							break;
						case 31:
							iconT = 'san-antonio-de-mala.svg';
							break;
						case 30:
							iconT = 'san-antonio-pachacamac.svg';
							break;
						case 17:
							iconT = 'san-antonio-pachacamac.svg';
							break;
						case 19:
							iconT = 'urb-san-antonio-de-carapongo.svg';
							break;
						case 34:
							iconT = 'san-antonio-de-chiclayo.svg';
							break;
						case 50:
							iconT = 'villa-killari74.svg';
							break;
						case 54:
							iconT = 'villa-los-pecanos.svg';
							break;
						case 46:
							iconT = 'villa-santa-maria.svg';
							break;
						case 28:
							iconT = 'villa-saraja-ica.svg';
							break;
						case 38:
							iconT = 'posada-de-carabayllo.svg';
							break;
						case 49:
							iconT = 'praderas-el-olivar.svg';
							break;
						case 32:
							iconT = 'san-antonio-de-mala.svg';
							break;
						case 45:
							iconT = 'san-antonio-de-mala.svg';
							break;
						case 44:
							iconT = 'san-antonio-de-mala.svg';
							break;
						default:
							iconT = 'sin-logo.svg';
					}

					return `${require('~/assets/img/budgets/' + iconT)}`;
				}
			} catch (error) {}
		},
		badgetSourceset(icon) {
			try {
				if (typeof icon !== 'undefined') {
					return `${require('~/assets/img/budgets/' + icon)}`;
				}
			} catch (error) {}
		},
		selectBudget(budget) {
			console.log('hjabhsdhjkasb');
			localStorage.setItem('budget_id', budget.id);
			localStorage.setItem('budget_code', budget.code);
			localStorage.setItem('project_id', budget.project_id);
			localStorage.setItem('project_name', budget.project.name);
			localStorage.setItem('project_type', budget.project.projectType);
			localStorage.setItem('contract_num', budget.contract_num);
			localStorage.setItem('unit_code', budget.unit_code);

			localStorage.setItem('etapa', budget.etapa);
			localStorage.setItem('manzana', budget.manzana);
			localStorage.setItem('lote', budget.lote);

			this.setFirstBudget();
			this.selectBudgetIcon();

			window.location.reload();
		},
		toggleProperties() {
			this.showMenu = false;
			this.showNotifications = false;
			this.showProperties = !this.showProperties;
		},
		toggle() {
			this.showProperties = false;
			this.showNotifications = false;
			this.showMenu = !this.showMenu;
		},
		async toggleNotifications() {
			this.showProperties = false;
			this.showMenu = false;
			this.showNotifications = !this.showNotifications;

			if (this.showNotifications) {
				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;

				const obj = {
					token: token,
				};

				await this.$store.dispatch('account/notificationsSeen', obj).then((response) => {
					//this.loadingQuestions = false;
					if (response.success) {
						this.hasNotifications = false;
					}
				});
			}
		},
		goToInicio() {
			this.$router.push('/inicio');
		},
		goToMisPagos() {
			this.$router.push('/mis-pagos');
		},
		goToMisPropiedades() {
			this.$router.push('/mis-inmuebles');
		},
		goToMisConstrucciones() {
			this.$router.push('/construcciones');
		},
		goToMisReferidos() {
			this.$router.push('/mis-referidos');
		},
		goToAtencionAlCliente() {
			this.$router.push('/atencion-al-cliente');
		},
		goToPreguntasFrecuentes() {
			this.$router.push('/preguntas-frecuentes');
		},
		goToProfile() {
			this.$router.push('/mi-perfil');
		},
		goToChangePassword() {
			this.$router.push('/mi-perfil/cambio-contrasena');
		},
		openHambMenu() {
			this.isActiveHambMenu = true;
		},
		closeHambMenu() {
			this.isActiveHambMenu = false;
		},
		showLogoutModal() {
			this.$bvModal.show('modal_session');
		},
		cancelLogout() {
			this.$refs['modal_session'].hide();
		},
		logoutSession() {
			this.$store.dispatch('logout');
		},
		async logout() {
			this.$store.dispatch('logout');
		},
		callNotifications: function (token) {
			setInterval(() => {
				this.$store.dispatch('atencioncliente/listNotifications', { token }).then((response) => {});
			}, 5000);
		},
		setFirstBudget() {
			this.etapa = localStorage.getItem('etapa');
			this.manzana = localStorage.getItem('manzana');
			this.lote = localStorage.getItem('lote');
		},
		selectBudgetIcon() {
			var projectId = parseInt(localStorage.getItem('project_id'));

			switch (projectId) {
				case 36:
					this.budgetImageIcon = 'alto-piura.svg';
					break;
				case 41:
					this.budgetImageIcon = 'caleta-san-antonio.svg';
					break;
				case 55:
					this.budgetImageIcon = 'colonial1050.svg';
					break;
				case 6:
					this.budgetImageIcon = 'el-boulevard-de-san-antonio.svg';
					break;
				case 9:
					this.budgetImageIcon = 'las-cascadas-de-san-antonio.svg';
					break;
				case 42:
					this.budgetImageIcon = 'el-olivar-de-pisco.svg';
					break;
				case 13:
					this.budgetImageIcon = 'la-estancia-de-santa-maria.svg';
					break;
				case 8:
					this.budgetImageIcon = 'los-molinos-de-carabayllo.svg';
					break;
				case 14:
					this.budgetImageIcon = 'portada-del-sol-ica.svg';
					break;
				case 52:
					this.budgetImageIcon = 'posada-del-sol-chiclayo.svg';
					break;
				case 51:
					this.budgetImageIcon = 'depas-mala.svg';
					break;
				case 31:
					this.budgetImageIcon = 'san-antonio-de-mala.svg';
					break;
				case 30:
					this.budgetImageIcon = 'san-antonio-pachacamac.svg';
					break;
				case 17:
					this.budgetImageIcon = 'san-antonio-pachacamac.svg';
					break;
				case 19:
					this.budgetImageIcon = 'urb-san-antonio-de-carapongo.svg';
					break;
				case 34:
					this.budgetImageIcon = 'san-antonio-de-chiclayo.svg';
					break;
				case 50:
					this.budgetImageIcon = 'villa-killari74.svg';
					break;
				case 54:
					this.budgetImageIcon = 'villa-los-pecanos.svg';
					break;
				case 46:
					this.budgetImageIcon = 'villa-santa-maria.svg';
					break;
				case 28:
					this.budgetImageIcon = 'villa-saraja-ica.svg';
					break;
				case 38:
					this.budgetImageIcon = 'posada-de-carabayllo.svg';
					break;
				case 49:
					this.budgetImageIcon = 'praderas-el-olivar.svg';
					break;
				case 32:
					this.budgetImageIcon = 'san-antonio-de-mala.svg';
					break;
				case 45:
					this.budgetImageIcon = 'san-antonio-de-mala.svg';
					break;
				case 44:
					this.budgetImageIcon = 'san-antonio-de-mala.svg';
					break;
				default:
					this.budgetImageIcon = 'sin-logo.svg';
			}

			localStorage.setItem('budget_icon', this.budgetImageIcon);
		},
		showUserHelperModal() {
			this.userHelperModalRef?.show();
		},
	},
	beforeDestroy() {},
	async mounted() {
		if (this.logged) {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			this.callNotifications(token);

			const obj = {
				token: token,
			};
			this.titular = localStorage.getItem('titular');
			await this.$store.dispatch('property/fetchBudgets', { token }).then((response) => {
				if (response.success) {
					localStorage.getItem('budget_id')
						? localStorage.setItem('budget_id', localStorage.getItem('budget_id'))
						: localStorage.setItem('budget_id', this.budgets[0].id);
					localStorage.getItem('budget_code')
						? localStorage.setItem('budget_code', localStorage.getItem('budget_code'))
						: localStorage.setItem('budget_code', this.budgets[0].code);
					localStorage.getItem('project_id')
						? localStorage.setItem('project_id', localStorage.getItem('project_id'))
						: localStorage.setItem('project_id', this.budgets[0].project_id);
					localStorage.getItem('project_name')
						? localStorage.setItem('project_name', localStorage.getItem('project_name'))
						: localStorage.setItem('project_name', this.budgets[0].project_name);
					localStorage.getItem('project_type')
						? localStorage.setItem('project_type', localStorage.getItem('project_type'))
						: localStorage.setItem('project_type', this.budgets[0].project.projectType);
					localStorage.getItem('contract_num')
						? localStorage.setItem('contract_num', localStorage.getItem('contract_num'))
						: localStorage.setItem('contract_num', this.budgets[0].contract_num);
					localStorage.getItem('unit_code')
						? localStorage.setItem('unit_code', localStorage.getItem('unit_code'))
						: localStorage.setItem('unit_code', this.budgets[0].unit_code);

					localStorage.getItem('etapa')
						? localStorage.setItem('etapa', localStorage.getItem('etapa'))
						: localStorage.setItem('etapa', this.budgets[0].etapa);
					localStorage.getItem('manzana')
						? localStorage.setItem('manzana', localStorage.getItem('manzana'))
						: localStorage.setItem('manzana', this.budgets[0].manzana);
					localStorage.getItem('lote')
						? localStorage.setItem('lote', localStorage.getItem('lote'))
						: localStorage.setItem('lote', this.budgets[0].lote);

					this.setFirstBudget();
					this.selectBudgetIcon();
				}
			});

			await this.$store.dispatch('atencioncliente/fetchTicketOptions', obj).then(() => {
				//this.loadingQuestions = false;
				this.finishedLoadingBudgets = false;
			});

			await this.$store.dispatch('atencioncliente/listNotifications', { token }).then((response) => {});

			//this.selectBudget(this.budgets[0]);
		}
	},
};
</script>

<style lang="scss">
.account {
	cursor: pointer;
}
</style>
