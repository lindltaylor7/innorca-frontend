<template>
	<div id="mis-construcciones" class="mis-construcciones">
		<Menu :positionFixed="positionFixed" :logged="true" />
		<div class="page" v-bind:class="{ fixed: positionFixed }">
			<div class="container">
				<Sidebar />

				<!-- Page Content -->
				<div class="h-100 page-content">
					<div class="box">
						<div class="title-bar">
							<div>
								<nuxt-link :to="{ path: '/construcciones' }" class="arrow-back"
									><img src="~assets/img/arrow-back.svg"
								/></nuxt-link>
							</div>
							<div><h3 class="title">Detalle de la cotización</h3></div>
						</div>

						<div class="form-steps">
							<div class="step step-3">
								<h4>Detalles de cotización</h4>
								<div :class="[projectsLength == 1 ? oneItemClass : '']" v-if="projectsLength != ''">
									<div class="card" v-for="(item, key) in quoteDetail.projects" :key="key">
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
											<h3>{{ item.roomType }} en {{ item.location }}</h3>
											<p>
												Costo de construcción por m2: S/
												{{ areaPrice(item) }} ({{ item.width }}m x {{ item.long }}m)
											</p>
											<span class="card__price">S/{{ formatMoney(Number(item.totalCost)) }}</span>
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
								<div class="step__buttons" v-if="projectsLength != ''">
									<button @click.prevent="getPDFQuote" class="btn btn-white">
										DESCARGAR COTIZACIÓN
									</button>
								</div>
								<div v-else class="loading">Cargando</div>
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
					<div
						class="table__body detalle-cotizacion"
						v-if="quoteDetail.projects[currentProject].materials !== undefined">
						<div
							class="detalle-cotizacion"
							v-for="(material, key) in quoteDetail.projects[currentProject].materials"
							:key="key">
							<div class="detalle-cotizacion__row">{{ parseInt(key + 1) }}</div>
							<div class="detalle-cotizacion__row">{{ material.name }}</div>
							<div class="detalle-cotizacion__row">{{ material.quantity }}</div>
							<div class="detalle-cotizacion__row">{{ material.unit }}</div>
							<div class="detalle-cotizacion__row">{{ material.price }}</div>
							<div class="detalle-cotizacion__row">
								{{ material.parcialCost | currency_format('PEN') }}
							</div>
						</div>
					</div>
					<div class="table__footer detalle-cotizacion">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div>TOTAL</div>
						<div>S/ {{ quoteDetail.finalCost }}</div>
					</div>
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
			oneItemClass: "one-item",
			downloadQuote: false,
			positionFixed: true,
			successMessage: "",
			errorMessage: "",
			page: 1,
			nextHistory: true,
			hideFooterModal: true,
			visibleStep: 1,
			quoteDetail: {
				addresses: [],
				counseling: false,
				createdAt: "",
				finalCost: "",
				owner: {},
				projectType: "",
				quoteType: "",
				startDate: "",
				startProject: "",
				totalCostNumber: "",
				updatedAt: "",
				projects: [
					{
						location: {},
						long: "",
						materials: [],
						roomType: "",
						totalCost: "",
						totalCostNumber: "",
						width: "",
					},
				],
			},
			projectsLength: "",
			currentProject: 0,
		};
	},
	created() { },
	components: {
		Menu,
		Sidebar,
		Accordion,
	},
	watch: {},
	computed: {
		...mapGetters({
			user: "account/getUserAccount",
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

		const obj = {
			token: token,
			id: this.$route.params.id,
		};

		this.quoteDetail = await this.$store
			.dispatch("quote/getQuoteDetail", obj)
			.then((response) => {
				this.projectsLength = response.quote.projects.length;

				return response.quote;
			});
	},
	methods: {
		openModal(key) {
			this.currentProject = key;
			//this.getQuoteDetail(key);
			setTimeout(() => {
				this.$bvModal.show("modal-detalle");
			}, 500);
		},
		closeModal() {
			setTimeout(() => {
				this.$bvModal.hide("modal-detalle");
			}, 100);
		},
		onlyNumber($event) {
			let keyCode = $event.keyCode ? $event.keyCode : $event.which;
			if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
				$event.preventDefault();
			}
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
		areaPrice(item) {
			let a1 = parseInt(item.width);
			let a2 = parseInt(item.long);
			let price = item.totalCost / (a1 * a2);
			return price.toFixed(2);
		},
		async getPDFQuote() {
			console.log("getPDFQuote ID", this.$route.params.id);
			const session = JSON.parse(Cookies.get("session"));
			const token = session.token;

			this.save({ type: EVENTS.construcciones.descargarCotizacion })

			await this.$store
				.dispatch("quote/getPdfQuote", { token, id: this.$route.params.id })
				.then((response) => {
					console.log("getPdfQuote", response);
					window.open(response.urlDoc, "_blank");
					return response;
				});
		},
		...mapActions({
			save: 'metrics/save'
		})
	},
};
</script>
