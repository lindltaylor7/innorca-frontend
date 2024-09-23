<template>
	<div id="mis-construcciones" class="mis-construcciones">
		<Menu :positionFixed="positionFixed" :logged="true" />
		<div class="page" v-bind:class="{ fixed: positionFixed }">
			<div class="container">
				<Sidebar />

				<!-- Page Content -->
				<div class="h-100 page-content">
					<div class="box">
						<div class="title-bar" v-if="visibleStep < 3">
							<div>
								<nuxt-link :to="{ path: '/construcciones' }" class="arrow-back"
									><img src="~assets/img/arrow-back.svg"
								/></nuxt-link>
							</div>
							<div><h3 class="title">Nueva cotización</h3></div>
						</div>

						<div class="title-bar--col" v-else>
							<h3 class="title">Cotización de proyecto:</h3>
						</div>

						<div class="form-steps">
							<!-- <div class="question-progress" v-if="visibleStep < 3">
                <div class="question-progress__step">pregunta 1 / 7</div>
                <div class="bar">
                  <span></span>
                </div>
              </div> -->

							<div class="step step-1" v-if="visibleStep < 3">
								<h3>Cuéntanos sobre tu nuevo proyecto</h3>
								<div class="mis-construcciones__col-2 question">
									<div>¿Qué desea construir?</div>
									<div>
										<div>
											<select
												id="que_desea_construir"
												v-model="questions.question1.que_desea_construir"
												@change="validate"
												required>
												<option value="-" selected>Seleccionar</option>
												<option value="Casa de 1 o 2 pisos">Casa de 1 o 2 pisos</option>
												<option value="Edificio de 3 pisos a más">
													Edificio de 3 pisos a más
												</option>
												<option value="Local comercial">Local comercial</option>
											</select>
											<label for="que_desea_construir" placeholder="Seleccionar"></label>
											<span v-if="errors.que_desea_construir === true" class="error">
												{{ errorForm.que_desea_construir }}
											</span>
										</div>
									</div>
								</div>
								<div class="mis-construcciones__col-2 question">
									<div>¿Cuándo desea empezar a construir?</div>
									<div>
										<div>
											<select
												id="cuando_construir"
												v-model="questions.question1.cuando_construir"
												@change="validate"
												required>
												<option value="-" selected>Seleccionar</option>
												<option value="Lo antes posible">Lo antes posible</option>
												<option value="En 6 meses">En 6 meses</option>
												<option value="Solo estoy bucando información de precios">
													Solo estoy bucando información de precios
												</option>
											</select>
											<label for="cuando_construir" placeholder="Seleccionar"></label>
											<span v-if="errors.cuando_construir === true" class="error">
												{{ errorForm.cuando_construir }}
											</span>
										</div>
									</div>
								</div>
								<div class="mis-construcciones__col-2 question">
									<div>¿Desea recibir asesoramiento?</div>
									<div>
										<div>
											<template>
												<div>
													<b-form-group label="" v-slot="{ ariaDescribedby }">
														<b-form-radio
															v-model="questions.question1.recibir_asesoramiento"
															:aria-describedby="ariaDescribedby"
															name="some-radios"
															value="true"
															@change="validate"
															>Sí por favor</b-form-radio
														>
														<b-form-radio
															v-model="questions.question1.recibir_asesoramiento"
															:aria-describedby="ariaDescribedby"
															name="some-radios"
															value="false"
															@change="validate"
															>No, no es necesario</b-form-radio
														>
													</b-form-group>
												</div>
											</template>
											<span v-if="errors.recibir_asesoramiento === true" class="error">
												{{ errorForm.recibir_asesoramiento }}
											</span>
										</div>
									</div>
								</div>
							</div>

							<div class="step step-2" v-if="visibleStep === 2">
								<h3>Bríndanos más detalles</h3>
								<div v-for="(n, key) in project.length" :key="key">
									<div class="mis-construcciones__col-2 question">
										<div>Indique en qué piso desea realizar su construcción</div>
										<div>
											<div>
												<select
													:id="'piso_construccion_' + key"
													v-model="project[key].floor"
													@change="getPrice(key)"
													required>
													<option value="-" selected>Seleccionar</option>
													<option value="Primer piso">Primer piso</option>
													<option value="Segundo piso">Segundo piso</option>
													<option value="Tercer piso y Azotea">Tercer piso y Azotea</option>
												</select>
												<label for="piso_construccion" placeholder="Seleccionar"></label>
												<span
													v-if="
														errors.ambientes[key].piso_construccion !== undefined &&
														errors.ambientes[key].piso_construccion === true
													"
													class="error">
													{{
														errors.ambientes[key].piso_construccion !== undefined &&
														errors.ambientes[key].piso_construccion
													}}
												</span>
											</div>
										</div>
									</div>
									<div class="mis-construcciones__col-2 question">
										<div>Mencione el tipo de ambiente que desea construir</div>
										<div>
											<div>
												<select
													:id="'tipo_ambiente_' + key"
													v-model="project[key].roomType"
													@change="getPrice(key)"
													required>
													<option value="-" selected>Seleccionar</option>
													<option value="Dormitorio">Dormitorio</option>
													<option value="Sala">Sala</option>
													<option value="Comedor">Comedor</option>
													<option value="Baño">Baño</option>
													<option value="Cocina">Cocina</option>
												</select>
												<label :for="'tipo_ambiente_' + key" placeholder="Seleccionar"></label>
												<span v-if="errors.ambientes[key].tipo_ambiente === true" class="error">
													{{ errors.ambientes[key].tipo_ambiente }}
												</span>
											</div>
										</div>
									</div>
									<div class="mis-construcciones__col-2 question">
										<div>Indicar el ancho y alto que desea en su construcción</div>
										<div>
											<div class="input-text-pair">
												<template>
													<div>
														<div>
															<select
																:id="'ancho_' + key"
																v-model="project[key].size1"
																@change="getSize2(key)"
																required>
																<option
																	value="-"
																	selected="selected"
																	disabled="disabled">
																	Ancho
																</option>
																<option value="1.5">1.5m</option>
																<option value="2">2m</option>
																<option value="3">3m</option>
																<option value="4">4m</option>
																<option value="5">5m</option>
																<option value="6">6m</option>
																<option value="7">7m</option>
																<option value="8">8m</option>
																<option value="9">9m</option>
															</select>
															<label :for="'ancho_' + key" placeholder="Ancho"></label>
															<span
																v-if="errors.ambientes[key].ancho === true"
																class="error">
																{{ errors.ambientes[key].ancho }}
															</span>
														</div>
													</div>
													<div>
														<div>
															<select
																:id="'alto_' + key"
																v-model="project[key].size2"
																@change="getPrice(key)"
																required>
																<option value="-" selected>Largo</option>
																<option
																	v-for="(size, key) in size2[key]"
																	:key="key"
																	:value="size">
																	{{ size }}m
																</option>
															</select>
															<label :for="'alto_' + key" placeholder="Largo"></label>
															<span
																v-if="errors.ambientes[key].alto === true"
																class="error">
																{{ errors.ambientes[key].alto }}
															</span>
														</div>
													</div>
												</template>
											</div>
										</div>
									</div>
									<div class="mis-construcciones__col-2 question mt-4">
										<div>Sub total ambiente</div>
										<div>
											<div>
												<template>
													<div class="total" v-if="project[key] !== undefined">
														S/{{ formatMoney(project[key].finalPrice) || 0 }}
													</div>
													<div class="total" v-else>S/ 0</div>
												</template>
											</div>
										</div>
									</div>
									<div class="question__remove" v-if="key >= 1">
										<button class="btn-text" @click.prevent="removeRoom(key)">
											Eliminar ambiente
										</button>
									</div>
								</div>

								<div class="form-steps__button-bar">
									<button class="btn btn-white" @click.prevent="addRoom">Añadir un ambiente</button>
								</div>
								<div class="form-steps__button-bar">
									<nuxt-link :to="{ path: '/construcciones' }"
										><button type="button" class="btn btn-text">Volver</button></nuxt-link
									>
									<button
										type="button"
										class="btn btn-green"
										@click.prevent="nextStep(3)"
										v-if="!this.limit">
										Cotizar
									</button>
								</div>
							</div>

							<div class="error text-center" v-if="this.limit">
								El espacio de construcción en tu propiedad no puede exceder de
								<strong>{{ (0.7 * meters).toFixed(2) }}m<sup>2</sup></strong
								>, actualmente has seleccionado
								<strong>{{ constructionSize }}m<sup>2</sup></strong> para construir.
							</div>

							<div class="step step-3" v-if="visibleStep === 3">
								<h4>Resumen de la cotización</h4>
								<div v-bind:class="[project.length == 1 ? oneItemClass : '']">
									<div class="card" v-for="(item, key) in project" :key="key">
										<div class="card__img">
											<img
												src="~assets/img/rooms/dormitorio.jpg"
												alt=""
												v-if="item.roomType == 'Dormitorio'" />
											<img
												src="~assets/img/rooms/sala.jpg"
												alt=""
												v-else-if="item.roomType == 'Sala'" />
											<img
												src="~assets/img/rooms/bano.jpg"
												alt=""
												v-else-if="item.roomType == 'Baño'" />
											<img
												src="~assets/img/rooms/cocina.jpg"
												alt=""
												v-else-if="item.roomType == 'Cocina'" />
											<img
												src="~assets/img/rooms/comedor.jpg"
												alt=""
												v-else-if="item.roomType == 'Comedor'" />
										</div>
										<div class="card__info">
											<div class="card__title">
												<h3 class="m-0">{{ item.roomType }} en {{ item.floor }}</h3>
											</div>
											<p>
												Costo de construcción por m2: S/{{
													areaPrice(item, key).toFixed(2)
												}}
												({{ item.size1 }}m x {{ item.size2 }}m)
											</p>
											<span class="card__price"
												>S/{{ formatMoney(project[key].finalPrice) }}</span
											>
											<span class="card__note">Costo Total*</span>
											<span class="card__obs">*montos referenciales</span>
											<div class="card__button">
												<button class="btn btn-green" @click.prevent="openModal(key)">
													VER DETALLES
												</button>
											</div>
										</div>
									</div>
								</div>
								<div class="step__buttons">
									<button class="btn btn-white m-0 mr-lg-2" @click.prevent="nextStep(2)">
										EDITAR COTIZACIÓN
									</button>
									<button
										class="btn btn-green m-0 ml-lg-2"
										v-if="btnSaveQuote"
										@click.prevent="saveQuote"
										:disabled="disabledBtnSaveQuote">
										GUARDAR COTIZACIÓN
									</button>
									<a
										@click.prevent="getPDFQuote(quote)"
										class="btn btn-white"
										v-if="btnDownloadQuote">
										DESCARGAR COTIZACIÓN
									</a>
									<b-alert show class="alert-msg" v-if="showAlert" v-html="alertMsg"></b-alert>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<b-modal
			id="modal-detalle"
			centered
			class="modal fade"
			tabindex="-1"
			:hide-footer="hideFooterModal"
			aria-hidden="true">
			<template #modal-header="{ close }">
				<h5 class="modal-title">Detalle de la cotización</h5>
				<button type="button" aria-label="Close" class="close" @click="close()">×</button>
			</template>
			<template>
				<div class="table">
					<div class="table__header detalle-cotizacion">
						<div>#</div>
						<div class="justify-content-start">MATERIALES EN CANTIDADES Y UNIDADES COMERCIALES</div>
						<div>CANT.</div>
						<div>UNIDAD</div>
						<div>PRECIO UNITARIO</div>
						<div>TOTAL</div>
					</div>
					<div class="table__body detalle-cotizacion" v-if="project[currentProject].materials !== undefined">
						<div
							class="detalle-cotizacion__row"
							v-for="(material, key) in project[currentProject].materials"
							:key="key">
							<div class="detalle-cotizacion__column">{{ parseInt(key + 1) }}</div>
							<div class="detalle-cotizacion__column">{{ material }}</div>
							<div class="detalle-cotizacion__column">
								{{ project[currentProject].quoteMaterials[key] }}
							</div>
							<div class="detalle-cotizacion__column">
								{{ project[currentProject].units[key] }}
							</div>
							<div class="detalle-cotizacion__column">
								{{ project[currentProject].prices[key] }}
							</div>
							<div class="detalle-cotizacion__column">
								{{ project[currentProject].parcialCost[key] }}
							</div>
						</div>
					</div>
					<div class="table__footer detalle-cotizacion" style="grid-template-columns: 1fr 1fr">
						<div>TOTAL</div>
						<div>S/ {{ formatMoney(project[currentProject].finalPrice) }}</div>
					</div>
				</div>
				<div class="buttons text-center mt-4">
					<button class="btn btn-green" @click.prevent="closeModal">CERRAR</button>
				</div>
			</template>
		</b-modal>

		<b-modal
			id="modal-proyecto"
			centered
			class="modal fade"
			tabindex="-1"
			:hide-footer="hideFooterModal"
			aria-hidden="true">
			<template #modal-header="{ close }">
				<h5 class="modal-title">Quiero comenzar con mi proyecto</h5>
				<button type="button" aria-label="Close" class="close" @click="close()">×</button>
			</template>
			<template>
				<div>
					<p>
						¡Hola Víctor! pronto un asesor se comunicara contigo para brindarte la asesoría que necesitas en
						el inicio de tu proyecto
					</p>
				</div>
				<div class="buttons text-center mt-4">
					<button class="btn btn-green" @click.prevent="closeModal">CERRAR</button>
				</div>
			</template>
		</b-modal>
	</div>
</template>

<script>
import Cookies from "js-cookie";
import { mapActions, mapGetters } from "vuex";
import Menu from "@/components/common/Menu";
import Sidebar from "@/components/common/Sidebar";
import Accordion from "../../../components/common/Accordion.vue";
import { EVENTS } from '../../../core/constants/events';

export default {
	middleware: "auth",
	transition: "slide-left",
	data() {
		return {
			userAccount: {},
			showAlert: false,
			alertMsg: null,
			disabledBtnSaveQuote: false,
			oneItemClass: "one-item",
			btnSaveQuote: true,
			btnDownloadQuote: false,
			positionFixed: true,
			successMessage: "",
			errorMessage: "",
			page: 1,
			nextHistory: true,
			hideFooterModal: true,
			errorForm: {
				que_desea_construir: "Seleccione una opción",
				cuando_construir: "Seleccione una opción",
				recibir_asesoramiento: "Seleccione una opción",
			},
			errors: {
				que_desea_construir: false,
				cuando_construir: false,
				recibir_asesoramiento: false,
				ambientes: [
					{ piso_construccion: false, tipo_ambiente: false, ancho: false, alto: false },
					{ piso_construccion: false, tipo_ambiente: false, ancho: false, alto: false },
				],
			},
			questions: {
				question1: {
					que_desea_construir: "",
					cuando_construir: "",
					recibir_asesoramiento: "",
				},
				question2: [
					{
						piso_construccion: "",
						tipo_ambiente: "",
						ancho: "",
						alto: "",
					},
				],
			},
			visibleStep: 1,
			step: 0,
			totalSteps: 3,
			project: [],
			totalCost: 0,
			size2: [""],
			prices: [""],
			materials: [""],
			units: [""],
			clientForm: {},
			detail: {},
			flag: true,
			quote: "",
			currentProject: 0,
			meters: "",
			limit: false,
			constructionSize: "",
		};
	},
	created() {
		(this.project = [
			{
				floor: "",
				roomType: "",
				meters: "",
				size1: "",
				size2: "",
				quoteMaterials: [""],
				finalPrice: 0.0,
				materials: [],
				parcialCost: [],
				units: [],
				prices: [],
			},
		]),
			(this.clientForm = {
				constructionType: "",
				constructionDate: "",
				counseling: false,
			});
	},
	components: {
		Menu,
		Sidebar,
		Accordion,
	},
	watch: {},
	computed: {
		...mapGetters({
			user: "account/getUserAccount",
			//user: "quote/getUserQuotes",
		}),
		percentage() {
			let percentage = ((this.projectTotal - this.saldo) * 100) / this.projectTotal;
			return (Math.round(percentage * 100) / 100).toFixed(2);
		},
	},
	async mounted() {
		const session = JSON.parse(Cookies.get("session"));
		const token = session.token;
		this.userAccount = await this.$store
			.dispatch("account/getUserAccount", { token })
			.then((response) => {
				return response.data;
			});
		this.getUnitSize();
	},
	methods: {
		openModal(key) {
			this.currentProject = key;
			//this.getQuoteDetail(key);

			this.save({ db: false, type: EVENTS.construcciones.clickVerMasDetallesCotizacion });

			setTimeout(() => {
				this.$bvModal.show("modal-detalle");
			}, 500);
		},
		closeModal() {
			setTimeout(() => {
				this.$bvModal.hide("modal-detalle");
			}, 100);
		},
		validate() {
			this.questions.question1.que_desea_construir == "-" ||
				this.questions.question1.que_desea_construir == ""
				? (this.errors.que_desea_construir = true)
				: (this.errors.que_desea_construir = false);
			this.questions.question1.cuando_construir == "-" ||
				this.questions.question1.cuando_construir == ""
				? (this.errors.cuando_construir = true)
				: (this.errors.cuando_construir = false);
			this.questions.question1.recibir_asesoramiento == ""
				? (this.errors.recibir_asesoramiento = true)
				: (this.errors.recibir_asesoramiento = false);

			if (
				!this.errors.que_desea_construir &&
				!this.errors.cuando_construir &&
				!this.errors.recibir_asesoramiento
			) {
				this.visibleStep = 2;
			}
		},
		onlyNumber($event) {
			let keyCode = $event.keyCode ? $event.keyCode : $event.which;
			if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
				$event.preventDefault();
			}
		},
		addRoom() {
			let obj = {
				floor: "",
				roomType: "",
				size1: "",
				size2: "",
			};

			let errors = {
				piso_construccion: false,
				tipo_ambiente: false,
				ancho: false,
				alto: false,
			};
			this.errors.ambientes.push(errors);
			//this.questions.question2.push(obj);
			this.project.push({
				finalPrice: "",
				floor: "",
				meters: "",
				quoteMaterials: [],
				materials: [],
				units: [],
				parcialCost: [],
				prices: [],
				roomType: "",
				size1: "",
				size2: "",
			});
		},
		removeRoom(index) {
			let obj = {
				floor: "",
				roomType: "",
				size1: "",
				size2: "",
			};

			let errors = {
				piso_construccion: false,
				tipo_ambiente: false,
				ancho: false,
				alto: false,
			};
			// this.errors.ambientes.push(errors);
			// //this.questions.question2.push(obj);
			// this.project.push({
			//   finalPrice: "",
			//   floor: "",
			//   meters: "",
			//   quoteMaterials: [],
			//   materials: [],
			//   units: [],
			//   parcialCost: [],
			//   prices: [],
			//   roomType: "",
			//   size1: "",
			//   size2: "",
			// });

			this.project = this.project.filter(function (value, i, arr) {
				return i != index;
			});

			this.limitConstruction();
		},

		changedFlag: function () {
			this.totalCost = 0;
			for (let index = 0; index < this.project.length; index++) {
				if (
					this.project[index].finalPrice != 0 &&
					this.project[index].size1.includes(this.project[index].size2)
				) {
					this.totalCost = this.totalCost + this.project[index].finalPrice;
					this.flag = false;
				} else {
					this.flag = true;
				}
			}
		},
		async getPrice(index) {
			const session = JSON.parse(Cookies.get("session"));
			const token = session.token;
			let projectType = this.questions.question1.que_desea_construir;
			let startDate = this.questions.question1.cuando_construir;
			let counseling = this.questions.question1.recibir_asesoramiento;
			let floor = this.project[index].floor;
			let size1 = this.project[index].size1;
			let size2 = this.project[index].size2;
			let roomType = this.project[index].roomType;

			this.limitConstruction();

			const obj = {
				token: token,
				payload: {
					projectType: projectType,
					startDate: startDate,
					counseling: counseling,
					floor: floor,
					size1: size1,
					size2: size2,
					roomType: roomType,
				},
			};

			if (
				projectType != "-" &&
				projectType != "" &&
				startDate != "-" &&
				startDate != "" &&
				counseling != "-" &&
				counseling != "" &&
				size1 != "-" &&
				size1 != "" &&
				size2 != "-" &&
				size2 != "" &&
				roomType != "-" &&
				roomType != ""
			) {
				await this.$store.dispatch("quote/getPriceRoom", obj).then((response) => {
					let { materials, prices, units, quoteMaterials } = response;
					this.project[index].quoteMaterials = quoteMaterials;
					this.prices = prices;
					this.materials = materials;
					this.project[index].units = units;
					this.project[index].materials = materials;
					this.project[index].prices = prices;
					this.project[index].finalPrice = 0;
					this.project[index].meters =
						this.project[index].size1 * this.project[index].size2;

					for (let i = 0; i < this.project[index].quoteMaterials.length; i++) {
						this.project[index].parcialCost.push(
							this.formatMoney(this.project[index].quoteMaterials[index] * this.prices[i])
						);
						this.project[index].finalPrice =
							this.project[index].finalPrice +
							this.project[index].quoteMaterials[i] * this.prices[i];
					}
					this.changedFlag();
				});
			}
		},
		deleteProject(index) {
			if (this.project.length > 1) this.project.splice(index, 1);
			this.changedFlag();
		},
		getSize2(index) {
			//this.project[index].finalPrice = "";
			if (this.project[index].size1 == "1.5") {
				this.size2[index] = ["1.5"];
			} else if (this.project[index].size1 == "2") {
				this.size2[index] = ["1.5", "2"];
			} else if (this.project[index].size1 == "3") {
				this.size2[index] = ["2", "3", "4", "5"];
			} else if (this.project[index].size1 == "4" || this.project[index].size1 == "5") {
				this.size2[index] = ["3", "4", "5"];
			} else if (
				this.project[index].size1 == "6" ||
				this.project[index].size1 == "7" ||
				this.project[index].size1 == "8" ||
				this.project[index].size1 == "9"
			) {
				this.size2[index] = [
					"3",
					"4",
					"5",
					"6",
					"7",
					"8",
					"9",
					"10",
					"11",
					"12",
					"13",
					"14",
					"15",
					"16",
					"17",
					"18",
					"19",
					"20",
				];
			}
			this.getPrice(index);
		},
		roundUp(n) {
			n = String(n);
			const dec = n.split(".");
			let deci = parseInt(dec[0]);
			if (parseInt(dec[1]) > 1) {
				deci = deci + 1;
				return deci;
			}
			return parseInt(n);
		},
		formatMoney(pay) {
			pay = Math.round((pay + Number.EPSILON) * 100) / 100;
			pay = pay.toFixed(2);
			const dec = pay.split(".");
			const formatter = new Intl.NumberFormat("en-US");
			const splittedPay = formatter.format(pay).split(".");
			return `${splittedPay[0] + "." + dec[1]}`;
		},
		areaPrice(project, index) {
			let a1 = parseInt(project.size1);
			let a2 = parseInt(project.size2);
			let price = this.project[index].finalPrice / (a1 * a2);
			return price;
		},
		getDetail(index) {
			this.detail = this.project[index];
			this.step++;
		},
		nextStep(step) {
			this.visibleStep = step;

			if (step === 3) this.save({ type: EVENTS.construcciones.realizarCotizacion });
		},
		async saveQuote() {
			this.disabledBtnSaveQuote = true;

			const session = JSON.parse(Cookies.get("session"));
			const token = session.token;

			let totalCostNumber = this.project
				.map((item) => item.finalPrice)
				.reduce((a, b) => a + b);

			let finalCost = this.formatMoney(totalCostNumber);

			totalCostNumber = Math.round((totalCostNumber + Number.EPSILON) * 100) / 100;

			totalCostNumber = totalCostNumber.toFixed(2);

			const obj = {
				token: token,
				payload: {
					sperantClientId: this.userAccount.profile.sperantClientId,
					projectType: this.questions.question1.que_desea_construir,
					startDate: this.questions.question1.cuando_construir,
					counseling: this.questions.question1.recibir_asesoramiento,
					projectsNum: this.project.length,
					project: this.project,
					finalCost: finalCost,
					propertyArea: this.meters,
					totalCostNumber: totalCostNumber,
					codeUnit: localStorage.getItem("unit_code"),
					budgetCode: localStorage.getItem("budget_code"),
					projectTypeName: localStorage.getItem("project_type"),
				},
			};

			console.log("obj", obj);

			await this.$store.dispatch("quote/createQuote", obj).then((response) => {
				this.quote = response.quoteId;
				if (response.quoteId != "") {
					this.save({ type: EVENTS.construcciones.guardarCotizacion });

					this.btnDownloadQuote = true;
					this.btnSaveQuote = false;
					this.showAlert = true;
					this.alertMsg = response.msg;

				}
			});
		},
		async getPDFQuote(id) {
			const session = JSON.parse(Cookies.get("session"));
			const token = session.token;
			await this.$store.dispatch("quote/getPdfQuote", { token, id }).then((response) => {
				window.open(response.urlDoc, "_blank");
				return response;
			});
		},
		async getUnitSize() {
			const session = JSON.parse(Cookies.get("session"));
			const token = session.token;

			let budget_code = localStorage.getItem("budget_code");
			let budget_id = localStorage.getItem("budget_id");
			let project_id = localStorage.getItem("project_id");

			const obj = {
				token: token,
				payload: {
					sperantClientId: this.userAccount.profile.sperantClientId,
					budgetId: budget_id,
				},
			};

			return await this.$store.dispatch("quote/getUnitSize", obj).then((response) => {
				//console.log('=======================');
				//console.log('getUnitSize', response);
				//console.log('=======================');
				this.meters = response.construction.attributes.construction.total_area;
				return response;
			});
		},
		limitConstruction() {
			let size = this.project
				.map((item) => {
					if (
						item.size1 != "" &&
						item.size2 != "" &&
						item.size1 != NaN &&
						item.size2 != NaN
					) {
						return item.size1 * item.size2;
					}
					//return console.log(item.size1, item.size2);
				})
				.reduce((a, b) => a + b);

			this.constructionSize = size;

			if (size != NaN) {
				let totalArea = (0.7 * this.meters).toFixed(2);

				if (totalArea < size) {
					this.limit = true;
				} else {
					this.limit = false;
				}
			}
		},
		...mapActions({
			save: 'metrics/save'
		})
	},
};
</script>

<style lang="scss" scoped>
.question-list {
	.accordion:last-child {
		border-bottom: none !important;
	}
}
</style>
