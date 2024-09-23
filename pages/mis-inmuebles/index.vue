<template>
	<div id="mis_propiedades">
		<Menu :positionFixed="positionFixed" :logged="true" />
		<div class="page" v-bind:class="{ fixed: positionFixed }">
			<div class="container">
				<Sidebar />

				<!-- Page Content -->
				<div class="h-100 page-content">
					<div class="box">
						<h3 class="title">Mis inmuebles</h3>

						<div class="row align-items-center">
							<div class="col-12 col-lg-7 mb-3 mb-lg-0">
								<div v-show="loadingGeneralInfo" class="card justify-content-center">
									<div class="loader-big"></div>
								</div>

								<div v-show="!loadingGeneralInfo" class="card">
									<div class="info mb-4">
										<div class="w-50">
											<h3 class="info-title">NOMBRE DEL PROYECTO</h3>
											<span class="info-value color-green">{{ projectName }}</span>
										</div>
										<div class="terreno-icon-container">
											<img src="~assets/img/properties/terreno-icon.png" width="80" />
										</div>
									</div>
									<div class="info">
										<div class="w-50">
											<h3 class="info-title">TIPO DE PROYECTO</h3>
											<span class="info-value">{{ projectType }}</span>
										</div>
										<div class="w-50">
											<h3 class="info-title">NÚMERO DE CONTRATO</h3>
											<span class="info-value">{{ contractNum }}</span>
											<img
												src="~assets/img/info-icon.svg"
												v-b-tooltip.hover.top="'Código asignado'"
												style="vertical-align: baseline" />
										</div>
									</div>
								</div>
							</div>
							<div class="col-12 col-lg-5">
								<div v-show="loadingGeneralInfo" class="card justify-content-center">
									<div class="loader-big"></div>
								</div>

								<div v-show="!loadingGeneralInfo">
									<img :srcset="getImgTipoProyecto()" alt="" class="proyecto-img" />
								</div>
							</div>
							<div class="col-12">
								<hr class="my-4" />
							</div>
						</div>

						<h3 class="subtitle">Estado de mi propiedad</h3>

						<div class="row mb-4" v-show="loadingPropertyStateSteps">
							<div class="col-12">
								<div class="card justify-content-center">
									<div class="loader-big"></div>
								</div>
							</div>
						</div>

						<div
							class="row no-gutters pasos-listado justify-content-between"
							v-show="!loadingPropertyStateSteps && casuistica == '1'">
							<div class="step-item">
								<div
									class="card paso-estado-card"
									:class="{
										completado: pasosCompletados.includes(1),
										'paso-siguiente-completado': pasosCompletados.includes(2),
										'paso-max': this.pasoMax == 1,
									}">
									<div class="paso-numero">1</div>
									<div class="paso-img paso-firma-contrato"></div>
									<div class="paso-titulo">Firma del contrato</div>
								</div>
								<div class="status completed">
									{{ pasosCompletados.includes(1) ? 'Completado' : 'Pendiente' }}
								</div>
							</div>
							<div class="step-item">
								<div
									class="card paso-estado-card"
									:class="{
										completado: pasosCompletados.includes(2),
										'paso-siguiente-completado': pasosCompletados.includes(3),
										'paso-max': this.pasoMax == 2,
									}">
									<div class="paso-numero">2</div>
									<div class="paso-img paso-pago-financiamiento"></div>
									<div class="paso-titulo">Pago completado</div>
								</div>
								<div class="status completed">
									{{
										pasosCompletados.includes(2)
											? 'Completado'
											: pasosCompletados.includes(1)
											? 'En proceso'
											: 'Pendiente'
									}}
								</div>
							</div>
							<div class="step-item">
								<div
									class="card paso-estado-card"
									:class="{
										completado: pasosCompletados.includes(3),
										'paso-siguiente-completado': pasosCompletados.includes(4),
										'paso-max': this.pasoMax == 3,
									}">
									<div class="paso-numero">3</div>
									<div class="paso-img paso-entrega-proyecto"></div>
									<div class="paso-titulo">Entrega de mi propiedad</div>
								</div>
								<div class="status completed">
									{{
										pasosCompletados.includes(3)
											? 'Completado'
											: pasosCompletados.includes(2)
											? 'En proceso'
											: 'Pendiente'
									}}
								</div>
							</div>
							<div class="step-item">
								<div
									class="card paso-estado-card"
									:class="{
										completado: pasosCompletados.includes(4),
										'paso-siguiente-completado': pasosCompletados.includes(5),
										'paso-max': this.pasoMax == 4,
									}">
									<div class="paso-numero">4</div>
									<div class="paso-img paso-minuta"></div>
									<div class="paso-titulo">Entrega de minuta *</div>
								</div>
								<div class="status completed">
									{{
										pasosCompletados.includes(4)
											? 'Completado'
											: pasosCompletados.includes(3)
											? 'En proceso'
											: 'Pendiente'
									}}
								</div>
							</div>
							<!-- <div class="step-item">
                <div
                  class="card paso-estado-card"
                  :class="{
                    completado: pasosCompletados.includes(5),
                    'paso-max': this.pasoMax == 5,
                  }"
                >
                  <div class="paso-numero">5</div>
                  <div class="paso-img paso-inde-terre"></div>
                  <div class="paso-titulo">Registros públicos</div>
                </div>
                <div class="status completed">
                  {{
                    pasosCompletados.includes(5)
                      ? "Completado"
                      : pasosCompletados.includes(4)
                      ? "En proceso"
                      : "Pendiente"
                  }}
                </div>
              </div> -->
						</div>
						<div
							class="row no-gutters pasos-listado justify-content-between"
							v-show="!loadingPropertyStateSteps && casuistica == '2'">
							<div class="step-item">
								<div
									class="card paso-estado-card"
									:class="{
										completado: pasosCompletados.includes(1),
										'paso-siguiente-completado': pasosCompletados.includes(2),
										'paso-max': this.pasoMax == 1,
									}">
									<div class="paso-numero">1</div>
									<div class="paso-img paso-firma-contrato"></div>
									<div class="paso-titulo">Firma del contrato</div>
								</div>
								<div class="status completed">
									{{ pasosCompletados.includes(1) ? 'Completado' : 'Pendiente' }}
								</div>
							</div>
							<div class="step-item">
								<div
									class="card paso-estado-card"
									:class="{
										completado: pasosCompletados.includes(2),
										'paso-siguiente-completado': pasosCompletados.includes(3),
										'paso-max': this.pasoMax == 2,
									}">
									<div class="paso-numero">2</div>
									<div class="paso-img paso-entrega-proyecto"></div>
									<div class="paso-titulo">Entrega de mi propiedad</div>
								</div>
								<div class="status completed">
									{{
										pasosCompletados.includes(2)
											? 'Completado'
											: pasosCompletados.includes(1)
											? 'En proceso'
											: 'Pendiente'
									}}
								</div>
							</div>
							<div class="step-item">
								<div
									class="card paso-estado-card"
									:class="{
										completado: pasosCompletados.includes(3),
										'paso-siguiente-completado': pasosCompletados.includes(4),
										'paso-max': this.pasoMax == 3,
									}">
									<div class="paso-numero">3</div>
									<div class="paso-img paso-pago-financiamiento"></div>
									<div class="paso-titulo">Pago completado</div>
								</div>
								<div class="status completed">
									{{
										pasosCompletados.includes(3)
											? 'Completado'
											: pasosCompletados.includes(2)
											? 'En proceso'
											: 'Pendiente'
									}}
								</div>
							</div>
							<div class="step-item">
								<div
									class="card paso-estado-card"
									:class="{
										completado: pasosCompletados.includes(4),
										'paso-siguiente-completado': pasosCompletados.includes(5),
										'paso-max': this.pasoMax == 4,
									}">
									<div class="paso-numero">4</div>
									<div class="paso-img paso-minuta"></div>
									<div class="paso-titulo">Entrega de minuta *</div>
								</div>
								<div class="status completed">
									{{
										pasosCompletados.includes(4)
											? 'Completado'
											: pasosCompletados.includes(3)
											? 'En proceso'
											: 'Pendiente'
									}}
								</div>
							</div>
							<!-- <div class="step-item">
                <div
                  class="card paso-estado-card"
                  :class="{
                    completado: pasosCompletados.includes(5),
                    'paso-max': this.pasoMax == 5,
                  }"
                >
                  <div class="paso-numero">5</div>
                  <div class="paso-img paso-inde-terre"></div>
                  <div class="paso-titulo">Registros públicos</div>
                </div>
                <div class="status completed">
                  {{
                    pasosCompletados.includes(5)
                      ? "Completado"
                      : pasosCompletados.includes(4)
                      ? "En proceso"
                      : "Pendiente"
                  }}
                </div>
              </div> -->
						</div>

						<div>
							<p class="obs">
								(*) MENORCA te sugiere que realices la inscripción de tu minuta de compraventa en los
								Registros Públicos, con la finalidad de que el inmueble aparezca inscrito a tu nombre.
							</p>
						</div>

						<h3 class="subtitle mb-2">Anexos</h3>
						<div class="row" v-show="loadingAnexos">
							<div class="col-12">
								<div class="card justify-content-center">
									<div class="loader-big"></div>
								</div>
							</div>
						</div>
						<div class="row anexos-listado" v-show="!loadingAnexos">
							<div class="col-12 col-lg-6 anexo-item-container" v-if="urlImgPlanoLote">
								<div class="anexo-item">
									<div>Plano de inmueble</div>
									<button
										class="btn btn-green float-right"
										@click="openModal('Plano de inmueble', 'plano_de_lote.png', urlImgPlanoLote)">
										VER
									</button>
								</div>
							</div>
							<div class="col-12 col-lg-6 anexo-item-container" v-if="urlImgPlanoProyecto">
								<div class="anexo-item">
									<div>Plano de proyecto</div>
									<button
										class="btn btn-green float-right"
										@click="
											openModal('Plano de proyecto', 'plano_de_proyecto.png', urlImgPlanoProyecto)
										">
										VER
									</button>
								</div>
							</div>
							<!--
                            <div class="col-12 col-lg-6 anexo-item-container">
                                <div class="anexo-item">
                                    <div>Mapa de cercanías</div>
                                    <button class="btn btn-green float-right" @click="openModal('apa de cercanías')">
                                        VER
                                    </button>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6 anexo-item-container">
                                <div class="anexo-item">
                                    <div>Plano Urbanización</div>
                                    <button class="btn btn-green float-right" @click="openModal('Plano Urbanización')">
                                        VER
                                    </button>
                                </div>
                            </div>
                            -->
							<div class="col-12 col-lg-6 anexo-item-container" v-if="fileContratoFirmado">
								<div class="anexo-item">
									<div>Contrato firmado</div>
									<!-- @click="downloadFile(urlFileContratoFirmado)" -->
									<!-- @click="downloadFile('https://sperant.s3.amazonaws.com/menorca/budgets/89924/process_unit/98386/final_contract/412484.pdf', 'contrato_firmado.pdf')" -->
									<button
										:disabled="downloadButtonDisabled"
										class="btn btn-green float-right"
										@click="downloadFile(urlFileContratoFirmado, 'contrato_firmado.pdf')">
										DESCARGAR
									</button>
								</div>
							</div>
							<!--
                            <div class="col-12 col-lg-6 anexo-item-container">
                                <div class="anexo-item">
                                    <div>Plano de distribución de Casas</div>
                                    <button class="btn btn-green float-right" @click="openModal('Plano de distribución de Casas')">
                                        VER
                                    </button>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6 anexo-item-container">
                                <div class="anexo-item">
                                    <div>Adendas</div>
                                    <button class="btn btn-green float-right" @click="openModal('Adendas')">
                                        VER
                                    </button>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6 anexo-item-container">
                                <div class="anexo-item">
                                    <div>Licencia de HU</div>
                                    <button class="btn btn-green float-right" @click="openModal('Licencia de HU')">
                                        VER
                                    </button>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6 anexo-item-container">
                                <div class="anexo-item">
                                    <div>Licencia de edificaciones</div>
                                    <button class="btn btn-green float-right" @click="openModal('Licencia de edificaciones')">
                                        VER
                                    </button>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6 anexo-item-container">
                                <div class="anexo-item">
                                    <div>Partida del predio matriz</div>
                                    <button class="btn btn-green float-right" @click="openModal('Partida del predio matriz')">
                                        VER
                                    </button>
                                </div>
                            </div>
                            <div class="col-12 col-lg-6 anexo-item-container">
                                <div class="anexo-item">
                                    <div>Partida independizada</div>
                                    <button class="btn btn-green float-right" @click="openModal('Partida independizada')">
                                        VER
                                    </button>
                                </div>
                            </div>
                            -->
						</div>
					</div>
				</div>
			</div>
		</div>

		<b-modal
			id="modal_verarchivo"
			size="lg"
			centered
			class="modal fade"
			tabindex="-1"
			:hide-footer="hideFooterModal"
			aria-hidden="true">
			<template #modal-header="{ close }">
				<h5 class="modal-title">{{ tituloModal }}</h5>
				<button type="button" aria-label="Close" class="close" @click="close()">×</button>
			</template>
			<div>
				<img :src="fileModal" class="img-fluid" />
				<div class="text-center mt-3">
					<button
						type="button"
						:disabled="downloadButtonDisabled"
						class="btn btn-green"
						@click="downloadFile(fileModal, nombreArchivo)">
						DESCARGAR
					</button>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import { mapActions, mapGetters } from 'vuex';
	import Menu from '@/components/common/Menu';
	import Sidebar from '@/components/common/Sidebar';
	import { EVENTS } from '../../core/constants/events';

	export default {
		middleware: 'auth',
		transition: 'slide-left',
		data() {
			return {
				anexosMenorcaAWS3: 'https://planosanexos.blob.core.windows.net/blobstorage1/', // https://anexosmenorca.s3.us-west-2.amazonaws.com/ANEXOS/
				positionFixed: true,
				loadingGeneralInfo: true,
				loadingPropertyStateSteps: true,
				loadingAnexos: true,
				hideFooterModal: true,

				budgetId: null,
				budgetCode: null,
				projectName: '',
				projectType: '',
				contractNum: '',

				//pasosCompletados: [1, 2, 3],
				pasosCompletados: [1],
				pasoMax: null,

				tipoProyecto: null,
				casuistica: '1',
				tituloModal: '',
				nombreArchivo: '',
				fileModal: null,
				imgPlanoLote: null,
				urlImgPlanoLote: null,
				urlImgPlanoProyecto: null,
				downloadButtonDisabled: false,
				urlFileContratoFirmado: null,
				fileContratoFirmado: null,
			};
		},
		components: {
			Menu,
			Sidebar,
		},
		computed: {
			...mapGetters({
				user: 'account/getUser',
			}),
		},
		async mounted() {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			this.budgetId = localStorage.getItem('budget_id');
			this.budgetCode = localStorage.getItem('budget_code');
			this.projectName = localStorage.getItem('project_name');
			this.projectType = localStorage.getItem('project_type');
			this.contractNum = localStorage.getItem('contract_num');

			await this.getEstadoPropiedad();
			await this.getPendingBudgets();

			await this.getUnits();
			await this.verificarContratoArchivo();

			if (this.pasosCompletados.includes(3) && !this.pasosCompletados.includes(2)) {
				this.casuistica = '2';
				this.pasosCompletados = [1, 2];
			}

			this.pasoMax = Math.max(...this.pasosCompletados);

			this.loadingGeneralInfo = false;
			this.loadingPropertyStateSteps = false;
			this.loadingAnexos = false;
		},
		methods: {
			async openModal(titulo, nombreArchivo, file = null) {
				this.tituloModal = titulo;
				this.nombreArchivo = nombreArchivo;
				this.fileModal = file;

				this.$bvModal.show('modal_verarchivo');

				this.save({ type: EVENTS.misInmuebles.clickAnexos, payload: { titulo } });
			},
			getImgTipoProyecto() {
				let imgTipoProyecto;

				switch (this.tipoProyecto) {
					case 'lote':
						imgTipoProyecto = 'lotes.png';
						break;

					case 'casa':
						imgTipoProyecto = 'casas.png';
						break;

					case 'Campo':
						imgTipoProyecto = 'campo.png';
						break;

					case 'estacionamiento simple':
						imgTipoProyecto = 'departamentos.png';
						break;

					case 'departamento flat':
						imgTipoProyecto = 'departamentos.png';
						break;

					case 'depósito':
						imgTipoProyecto = 'departamentos.png';
						break;

					case 'Playa':
						imgTipoProyecto = 'playa.png';
						break;

					default:
						imgTipoProyecto = 'proyecto-img.png';
				}

				return `${require('~/assets/img/properties/' + imgTipoProyecto)}`;
			},
			async verificarContratoArchivo() {
				await this.$store
					.dispatch('property/getFileToDownload', { file: this.urlFileContratoFirmado })
					.then((response) => {
						if (!response) {
							this.fileContratoFirmado = null;
						} else {
							this.fileContratoFirmado = response;
						}
					})
					.catch((e) => {
						console.log('error');
					});
			},
			async downloadFile(file, nombreArchivo) {
				this.downloadButtonDisabled = true;

				let archivoCargado = null;

				if (nombreArchivo == 'plano_de_lote.png') {
					archivoCargado = this.imgPlanoLote;
				} else if (nombreArchivo == 'plano_de_proyecto.png') {
					archivoCargado = this.imgPlanoProyecto;
				} else {
					archivoCargado = this.fileContratoFirmado;
				}

				if (!archivoCargado) {
					let response = await this.$store.dispatch('property/getFileToDownload', { file });

					if (nombreArchivo == 'plano_de_lote.png') {
						this.imgPlanoLote = response;
					}

					if (nombreArchivo == 'plano_de_proyecto.png') {
						this.imgPlanoProyecto = response;
					}

					archivoCargado = response;
				}

				let raw = Buffer.from(archivoCargado.file).toString('base64');
				let dataBuffer = 'data:' + archivoCargado.headers['content-type'] + ';base64,' + raw;

				var docUrl = document.createElement('a');
				docUrl.href = dataBuffer;
				docUrl.setAttribute('download', nombreArchivo);
				document.body.appendChild(docUrl);
				docUrl.click();

				this.downloadButtonDisabled = false;
			},
			async getEstadoPropiedad() {
				await this.$store
					.dispatch('property/fetchEstadoNIF', { contractNum: this.contractNum })
					.then((response) => {
						if (response.response.estado_nif == 'NIF') {
							this.pasosCompletados.push(3);
						}
					});
			},
			async getUnits() {
				await this.$store
					.dispatch('property/fetchBudgetUnits', {
						budgetId: this.budgetId,
						budgetCode: this.budgetCode,
					})
					.then((response) => {
						this.tipoProyecto = response.tipoUnidadPrincial;
						if (response.units.length) {
							let codeSplit = response.units[0].code.split('-');
							let codeImgPlanoProyecto = codeSplit[0] + '-' + codeSplit[1];
							this.urlImgPlanoProyecto = `${this.anexosMenorcaAWS3}${codeImgPlanoProyecto}.png`;
							this.urlImgPlanoLote = `${this.anexosMenorcaAWS3}${response.units[0].code}.png`;
						}
						this.urlFileContratoFirmado = `https://sperant.s3.amazonaws.com/menorca/budgets/${this.budgetId}/process_unit/${response.processUnitId}/final_contract/${this.contractNum}.pdf`;
					});
			},
			async getPendingBudgets() {
				await this.$store
					.dispatch('property/getTotalPendingBudgets', { budgetCode: this.budgetCode })
					.then((response) => {
						if (!response.pendingBudgets.total) {
							this.pasosCompletados.push(2);
						}
					});
			},
			...mapActions({
				save: 'metrics/save',
			}),
		},
	};
</script>

<style scoped>
	.paso-firma-contrato {
		background: url('~assets/img/properties/paso-firma-contrato.png') no-repeat center;
	}

	.paso-entrega-proyecto {
		background: url('~assets/img/properties/paso-entrega-proyecto.png') no-repeat center;
	}

	.paso-pago-financiamiento {
		background: url('~assets/img/properties/paso-pago-financiamiento.png') no-repeat center;
	}

	.paso-minuta {
		background: url('~assets/img/properties/paso-minuta.png') no-repeat center;
	}

	.paso-inde-terre {
		background: url('~assets/img/properties/paso-inde-terre.png') no-repeat center;
	}
</style>
