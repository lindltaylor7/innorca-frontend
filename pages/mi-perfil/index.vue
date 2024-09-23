<template>
	<div id="mis_datos">
		<Menu :positionFixed="positionFixed" :logged="true" />
		<div class="page" v-bind:class="{ fixed: positionFixed }">
			<div class="container">
				<Sidebar />

				<!-- Page Content -->
				<div class="h-100 page-content editar-datos">
					<div class="box" v-if="user.profile">
						<h3 class="title">Mi perfil</h3>

						<div class="info d-flex align-items-center">
							<template v-if="gender == 'f'">
								<img class="img-fluid" src="~assets/img/user-female.png" alt="" />
							</template>
							<template v-else>
								<img class="img-fluid" src="~assets/img/user-male.png" alt="" />
							</template>

							<h3 class="info-title">
								Hola<br />
								{{ user.profile.name }}
							</h3>
						</div>

						<div class="row modal-form">
							<div class="col-12">
								<div>
									<input v-model="name" id="name" type="text" disabled />
									<label for="name" placeholder="Nombres y apellidos"></label>
								</div>
							</div>

							<div class="col-12 col-md-6">
								<div>
									<input v-model="docType" id="doctype" class="input-fix" type="text" disabled />
									<label for="doctype" placeholder="Tipo de documento"></label>
								</div>
							</div>

							<div class="col-12 col-md-6">
								<div>
									<input v-model="document" id="document" class="input-fix" type="text" disabled />
									<label for="document" placeholder="Número de documento"></label>
								</div>
							</div>

							<div class="col-12 col-md-6">
								<div>
									<input v-model="cellphone" id="telephone" class="input-fix" type="text" disabled />
									<label for="telephone" placeholder="Celular" class="fixed-label"></label>
								</div>
							</div>

							<div class="col-12 col-md-6">
								<div>
									<!--<input v-model="secondaryTelephone" id="recovery_telephone" type="text" required />
                                    <label for="recovery_telephone" placeholder="Celular de respaldo"></label>-->

									<input
										v-model="secondaryTelephone"
										id="recovery_telephone"
										class="input-fix"
										v-bind:class="{
											error: errors.secondaryTelephone,
										}"
										type="text"
										required />
									<label for="recovery_telephone" placeholder="Celular de respaldo"></label>
									<span v-if="errors.secondaryTelephone === true" class="error">
										{{ errorForm.secondaryTelephone }}
									</span>
								</div>
							</div>

							<div class="col-12 col-md-6">
								<div>
									<input v-model="sperantEmail" id="email" type="text" disabled />
									<label for="email" placeholder="Correo" class="fixed-label"></label>
								</div>
							</div>

							<div class="col-12 col-md-6">
								<div>
									<!--<input v-model="email" id="recovery_email" type="text" required/>
                                    <label for="recovery_email" placeholder="Correo de recuperación"></label>-->
									<input
										v-model="email"
										id="recovery_email"
										class="input-fix"
										v-bind:class="{ error: errors.email }"
										type="text"
										required />
									<label for="recovery_email" placeholder="Correo de recuperación"></label>
									<span v-if="errors.email === true" class="error">
										{{ errorForm.email }}
									</span>
								</div>
							</div>

							<!--<div class="col-6">
                                <div>
                                    <input id="search" type="text" required value="Av. Saenz Peña 1990" disabled />
                                    <label for="search" placeholder="Dirección de contacto"></label>
                                </div>
                            </div>-->

							<div class="col-12">
								<input v-model="lat" type="hidden" name="lat" />
								<input v-model="long" type="hidden" name="long" />

								<!--<div>
                                    <input v-model="address" id="address" type="text" required />
                                    <label for="address" placeholder="Dirección actual / Notificaciones"></label>
                                </div>-->

								<div>
									<!--<input v-model="address" type="text" ref="citySearch" @changed="changed" />-->
									<GmapAutocomplete
										ref="gmapAutocomplete"
										@place_changed="setPlace"
										v-bind:class="{ error: errors.address }"></GmapAutocomplete>
									<label
										for="address"
										placeholder="Dirección actual / Notificaciones"
										class="fixed-label-email"></label>
									<span v-if="errors.address === true" class="error">
										{{ errorForm.address }}
									</span>
								</div>
							</div>

							<div>
								<p class="obs">
									*Esta dirección no modifica la actualmente especificada en su compromiso de contrato
									(Revisar términos y condiciones)
								</p>
							</div>

							<div class="col-12">
								<!--<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15603.681154159254!2d-77.0239765!3d-12.1176064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c83e28585565%3A0x4ad752e285ae0442!2sMuseo%20de%20Sitio%20Huaca%20Pucllana!5e0!3m2!1ses!2spe!4v1641502833853!5m2!1ses!2spe" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>-->
								<!--<div style="height:400px;width:100%" ref="map"></div>-->
								<GmapMap
									:center="center"
									:zoom="18"
									map-type-id="roadmap"
									style="width: 100%; height: 400px">
									<GmapMarker
										:key="index"
										v-for="(m, index) in markers"
										:position="m.position"
										:clickable="true"
										:draggable="true"
										@dragend="gMapFunc($event.latLng)"
										@click="center = m.position" />
								</GmapMap>
							</div>

							<!--
                            <div class="col-12">
                                <div class="d-flex">
                                    <input type="checkbox"> Deseo recibir avisos publicitarios por parte de menorca.pe
                                </div>
                            </div>
                            -->

							<div class="col-12">
								<div class="d-flex align-items-center">
									<button
										@click="updateProfile"
										class="btn btn-green mt-4 btn-submit"
										v-bind:class="{ loading: loading }"
										:disabled="loading">
										Guardar cambios
									</button>
									<!--<div v-show="loading" class="loader"></div>-->
								</div>
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
</template>

<script>
import Cookies from "js-cookie";
import { mapActions, mapGetters } from "vuex";
import Menu from "@/components/common/Menu";
import Sidebar from "@/components/common/Sidebar";

import { EVENTS } from '../../core/constants/events'

export default {
	middleware: "auth",
	transition: "slide-left",
	data() {
		return {
			name: "",
			docType: "",
			document: "",
			gender: "",
			cellphone: "",
			secondaryTelephone: "",
			sperantEmail: "",
			email: "",
			address: "",
			lat: "",
			long: "",
			positionFixed: true,
			loading: false,
			successMessage: "",
			errorMessage: "",

			errors: {
				secondaryTelephone: false,
				email: false,
				address: false,
			},

			errorForm: {
				secondaryTelephone: "Ingrese un número de respaldo",
				email: "Ingrese un correo válido",
				address: "Ingrese una dirección",
			},

			place: null,
			center: {
				lat: -12.064898,
				lng: -77.037317,
			},
			markers: [
				{
					position: {
						lat: -12.064898,
						lng: -77.037317,
					},
				},
			],
		};
	},
	components: {
		Menu,
		Sidebar,
	},
	computed: {
		...mapGetters({
			user: "account/getUser",
		}),
	},
	async mounted() {
		const session = JSON.parse(Cookies.get("session"));
		const token = session.token;

		await this.$store.dispatch("account/getUserAccount", { token }).then((response) => {
			console.log("response", response);
			this.name = response.data.profile.name;
			this.docType = response.data.profile.docType;
			this.document = response.data.profile.document;
			this.gender = response.data.profile.gender;
			this.cellphone = response.data.profile.phone;
			this.secondaryTelephone = response.data.profile.secondaryTelephone;
			this.sperantEmail = response.data.profile.sperantEmail;
			this.email = response.data.email;
			//this.address = response.data.profile.address;

			//console.log('response.data.profile.address', response.data.profile.address);

			if (response.data.profile.point) {
				this.$refs.gmapAutocomplete.$refs.input.value = response.data.profile.address;

				this.center.lat = response.data.profile.point.coordinates[1];
				this.center.lng = response.data.profile.point.coordinates[0];
				this.markers[0].position.lat = response.data.profile.point.coordinates[1];
				this.markers[0].position.lng = response.data.profile.point.coordinates[0];

				//this.lat = response.data.profile.point.coordinates[0];
				//this.long = response.data.profile.point.coordinates[1];
			}
		});

		//this.$maps.makeAutoComplete(this.$refs.citySearch);
		//this.$maps.showMap(this.$refs.map, this.long, this.lat);
	},
	methods: {
		setPlace(place) {
			console.log("place", place);

			this.address = place.formatted_address;

			this.center.lat = place.geometry.location.lat();
			this.center.lng = place.geometry.location.lng();
			this.markers[0].position.lat = place.geometry.location.lat();
			this.markers[0].position.lng = place.geometry.location.lng();
		},
		gMapFunc(evnt) {
			console.log("evnt---", evnt);
			this.center.lat = evnt.lat();
			this.center.lng = evnt.lng();
			this.markers[0].position.lat = evnt.lat();
			this.markers[0].position.lng = evnt.lng();

			const geocoder = new google.maps.Geocoder();

			geocoder.geocode({ latLng: evnt }, (result, status) => {
				if (status === google.maps.GeocoderStatus.OK) {
					console.log("geo value", result[0].formatted_address);
					this.$refs.gmapAutocomplete.$refs.input.value = result[0].formatted_address;
				}
			});
		},
		validate() {
			this.secondaryTelephone === ""
				? (this.errors.secondaryTelephone = true)
				: (this.errors.secondaryTelephone = false);
			!this.validateEmail(this.email)
				? (this.errors.email = true)
				: (this.errors.email = false);
			this.$refs.gmapAutocomplete.$refs.input.value === ""
				? (this.errors.address = true)
				: (this.errors.address = false);
			if (!this.errors.secondaryTelephone && !this.errors.email && !this.errors.address) {
				return true;
			} else {
				this.loading = false;
				return false;
			}
		},
		async updateProfile() {
			this.loading = true;

			this.successMessage = "";
			this.errorMessage = "";

			console.log(this.user.profile.secondaryTelephone);

			/*if (this.secondaryTelephone == '' || this.email == '' || this.$refs.gmapAutocomplete.$refs.input.value == '') {
					this.errorMessage = "Por favor ingrese un número de teléfono y email";
					return;
			}*/

			const session = JSON.parse(Cookies.get("session"));
			const token = session.token;

			const obj = {
				token: token,
				payload: {
					secondaryTelephone: this.secondaryTelephone,
					email: this.email,
					address: this.$refs.gmapAutocomplete.$refs.input.value,
					lat: this.markers[0].position.lat,
					long: this.markers[0].position.lng,
				},
			};

			if (this.validate()) {
				await this.$store.dispatch("account/updateAccount", obj)
					.then(async (response) => {
						console.log("response", response);
						this.loading = false;

						if (response.success) {
							this.successMessage = response.message;

							await this.save({ type: EVENTS.registro.actualizarDatos });
						}

						if (!response.success) {
							this.errorMessage = response.message;

							if (response.errors) {
								response.errors.forEach((element) => {
									this.errorMessage = element.message;
								});
							}
						}
					});
			}
		},
		validateEmail(value) {
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
				return true;
			} else {
				return false;
			}
		},
		...mapActions({
			save: 'metrics/save',
		})
	},
};
</script>
