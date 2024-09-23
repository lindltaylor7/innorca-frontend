<template>
	<div id="mis_referidos">
		<Menu :positionFixed="positionFixed" :logged="true" />
		<div class="page" v-bind:class="{ fixed: positionFixed }">
			<div class="container">
				<Sidebar />

				<!-- Page Content -->
				<div class="h-100 page-content">
					<div class="box">
						<div>
							<b-tabs content-class="mt-3" v-model="tabIndex">
								<b-tab title="Mis referidos" active>
									<h3>¿Y tú ya ganaste dinero refiriendo?</h3>
									<div class="welcome-text">
										<div>
											<p>
												Hola <strong>{{ activeUser }}</strong
												>, recuerda que refiriendo a tus amigos y/o familiares puedes ganar
												desde S/500 soles hasta S/750 soles si ellos compran un lote o casa.
												¡Estáte atento a los incentivos donde duplicamos el beneficio! Enterate
												aquí en Ventana Menorca.
											</p>
										</div>
										<div><img src="~assets/img/commission.png" alt="" /></div>
									</div>

									<div class="table mt-2">
										<div class="bar">
											<div class="bar__container bar__container--text">
												<span class="bar__text"
													><strong>IMPORTANTE: </strong>El beneficio es por referido, no por
													lotes/casas compradas. Por ejemplo, si un cliente compra 4 lotes, el
													referido ganará 1 solo beneficio.</span
												>
											</div>
											<div class="bar__container bar__container--button">
												<button
													class="btn btn-green bar__button"
													@click="openModal('referidos')">
													NUEVO REFERIDO
												</button>
											</div>
										</div>
										<div
											class="table__header referidos"
											v-if="referralsList.arrReferrals && referralsList.arrReferrals.length > 0">
											<div>Fecha de creación</div>
											<div>Nombre</div>
											<div>Documento</div>
											<div>Celular</div>
											<div>Correo</div>
											<div>Estado</div>
											<div>Estado de premio</div>
										</div>
										<div class="table__body referidos">
											<div v-for="(referral, key) in referralsList.arrReferrals" :key="key">
												<div>
													<span>Fecha de creación</span>
													{{ $moment(referral.item.createdAt).format('DD/MM/YYYY') }}
												</div>
												<div><span>Nombre</span>{{ referral.item.name }}</div>
												<div>
													<span>Documento</span
													>{{ referral.item.dni || referral.item.document }}
												</div>
												<div><span>Celular</span>{{ referral.item.phone }}</div>
												<div><span>Correo</span>{{ referral.item.email }}</div>
												<div>
													<span>Estado</span>
													<div v-if="referral.prize != undefined">
														<div>COMPLETADO</div>
														<div class="completed">
															{{
																$moment(referral.prize.fecha_impresion_contrato).format(
																	'DD/MM/YYYY'
																)
															}}
														</div>
													</div>
													<div v-else>PENDIENTE</div>
												</div>
												<div>
													<span>Estado de premio</span>
													<div class="links">
														<template v-if="referral.prize != undefined">
															<button
																@click="
																	openWsp(
																		referral.prize.telefono,
																		referral.prize.nombre
																	)
																">
																<span class="link orange"
																	>Ganaste {{ referral.prize.prize }}</span
																>
																<span class="link green">¿Como cobrar?</span>
															</button>
														</template>
														<template v-else> --- </template>
													</div>
												</div>
											</div>
										</div>
										<div class="table__footer"></div>
									</div>
								</b-tab>
								<b-tab title="Mis contactos">
									<h3>¿Y tú ya ganaste dinero refiriendo?</h3>
									<div>
										<p>
											Te ayudamos a completar la informacion de tus referidos, te traemos
											diferentes opciones:
										</p>
										<ul>
											<li>Puedes importar a tus contactos desde tu email.</li>
											<li>Guardar contactos</li>
										</ul>
									</div>
									<div class="cards__import">
										<div>
											<div class="cards__content">
												<div>
													<img src="~assets/img/communicate.svg" alt="" />
												</div>

												<button class="btn btn-green" v-b-modal.modal-importar-contactos>
													importar contactos
												</button>
											</div>
										</div>
										<div>
											<div class="cards__content">
												<div>
													<img src="~assets/img/add-user.svg" alt="" />
												</div>

												<button class="btn btn-green" @click="openModal('contactos')">
													nuevo contacto
												</button>
											</div>
										</div>
									</div>
								</b-tab>
							</b-tabs>

							<div class="contacts" v-if="tabIndex == 1">
								<div class="contacts__list--ready" v-if="contactsList.length > 0">
									<h3>Mis contactos listos para referir</h3>
									<div class="welcome-text">
										<div>
											<p>
												Puedes ir armando tu lista de referidos añadiendo contactos, puedes
												importarlos o añadir su información manualmente, tenerlos aquí en tu
												lista de contactos hasta que decidas referirlos.
											</p>
										</div>
										<div>
											<img src="~assets/img/contact-book.svg" alt="" />
										</div>
									</div>

									<div class="table mt-3">
										<div class="table__header contactos">
											<div>Nombre / correo</div>
											<div>Documento / Celular</div>
											<div>COMENTARIO</div>
											<div>Proyecto de interés</div>
											<div></div>
										</div>
										<div class="table__body contactos">
											<div v-for="contact in contactsList" :key="contact.id">
												<div>
													<span>Nombre / correo<br /></span>
													<template
														v-if="
															contact[0].firstName !== '' && contact[0].lastName !== ''
														">
														{{ contact[0].firstName || '' }}
														{{ contact[0].lastName || '' }}
													</template>
													<template v-else>
														{{ contact[0].name || '' }}
													</template>
													<template v-if="contact[0].email !== ''">
														<br />{{ contact[0].email }}
													</template>
												</div>
												<div>
													<span>DNI / Teléfono</span>{{ contact[0].document }}
													{{ contact[0].phone }}
												</div>
												<div><span>COMENTARIO</span>{{ contact[0].comments }}</div>
												<div>
													<template v-if="contact[1] !== undefined && contact[2]">
														<span>Proyecto de interés</span>{{ contact[1].name }}<br />{{
															capitalizeWord(contact[2][0].attributes.name)
														}}
													</template>
												</div>
												<div>
													<b-dropdown
														id="dropdown-left"
														text=""
														variant="primary"
														class="m-2 dropdown-table">
														<b-dropdown-item
															href="#"
															@click.prevent="getContactById(contact[0]._id)"
															>editar</b-dropdown-item
														>
														<b-dropdown-item href="#">referir</b-dropdown-item>
													</b-dropdown>
													<div class="buttons">
														<button
															class="btn btn-text float-right"
															@click.prevent="getContactById(contact[0]._id)">
															EDITAR
														</button>
														<button
															class="btn btn-green float-right"
															@click.prevent="referContactById(contact[0]._id)">
															REFERIR
														</button>
													</div>
												</div>
											</div>
										</div>
										<div class="table__footer"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<b-modal
			id="modal_referido"
			centered
			class="modal fade"
			tabindex="-1"
			:hide-footer="hideFooterModal"
			aria-hidden="true">
			<template #modal-header="{ close }">
				<h5 class="modal-title" v-if="activeForm == 'referidos'">Nuevo referido</h5>
				<h5 class="modal-title" v-else-if="activeForm == 'contactos'">Nuevo contacto</h5>
				<h5 class="modal-title" v-else-if="activeForm == 'editar-contacto'">Editar contacto</h5>
				<h5 class="modal-title" v-else>Nuevo referido</h5>
				<button type="button" aria-label="Close" class="close" @click="close()">×</button>
			</template>

			<div class="modal-form">
				<template>
					<p class="welcome">
						Ingresa la información del contacto que deseas agregar a tu lista de referidos
					</p>
					<form action="" method="post" ref="addReferred">
						<div class="form">
							<div class="form-item">
								<div>
									<div>
										<input
											v-model.trim="nombre"
											id="nombre"
											v-bind:class="{ error: errors.nombre }"
											@keypress="isLetter($event)"
											type="text"
											required />
										<label for="nombre" placeholder="Nombre"></label>
										<span v-if="errors.nombre === true" class="error">
											{{ errorForm.nombre }}
										</span>
									</div>
								</div>
								<div>
									<div>
										<input
											v-model.trim="apellidos"
											id="apellidos"
											type="text"
											v-bind:class="{ error: errors.apellidos }"
											@keypress="isLetter($event)"
											required />
										<label for="apellidos" placeholder="Apellidos"></label>
										<span v-if="errors.apellidos === true" class="error">
											{{ errorForm.apellidos }}
										</span>
									</div>
								</div>
							</div>
							<div class="">
								<div>
									<div>
										<input
											v-model="celular"
											id="celular"
											type="text"
											v-bind:class="{ error: errors.celular }"
											maxlength="9"
											@keypress="onlyNumber"
											required />
										<label for="celular" placeholder="Celular"></label>
										<span v-if="errors.celular === true" class="error">
											{{ errorForm.celular }}
										</span>
									</div>
								</div>
							</div>
							<div class="form-item">
								<div>
									<div>
										<select
											v-model="document_type"
											id="document_type"
											v-bind:class="{ error: errors.document_type }"
											required>
											<option value="-" selected>Seleccionar</option>
											<option value="1">DNI</option>
											<option value="2">CE</option>
											<option value="3">RUC</option>
											<option value="4">Pasaporte</option>
										</select>
										<label for="document_type" placeholder="Tipo de documento"></label>
										<span v-if="errors.document_type === true" class="error">
											{{ errorForm.document_type }}
										</span>
									</div>
								</div>
								<div>
									<div>
										<input
											v-if="document_type == '' || document_type == '-'"
											v-model="document_no"
											id="no_document"
											v-bind:class="{ error: errors.document_no }"
											type="text"
											required />

										<input
											v-if="document_type == '1'"
											v-model="document_no"
											id="no_document"
											v-bind:class="{ error: errors.document_no }"
											type="text"
											minlength="8"
											maxlength="8"
											@keypress="onlyNumber"
											required />
										<input
											v-if="document_type == '2'"
											v-model="document_no"
											id="no_document"
											v-bind:class="{ error: errors.document_no }"
											type="text"
											minlength="12"
											maxlength="12"
											required />
										<input
											v-if="document_type == '3'"
											v-model="document_no"
											id="no_document"
											v-bind:class="{ error: errors.document_no }"
											type="text"
											minlength="11"
											maxlength="11"
											@keypress="onlyNumber"
											required />
										<input
											v-if="document_type == '4'"
											v-model="document_no"
											id="no_document"
											v-bind:class="{ error: errors.document_no }"
											type="text"
											minlength="12"
											maxlength="12"
											required />
										<label for="no_document" placeholder="Nro. de documento"></label>
										<span v-if="errors.document_no === true" class="error">
											{{ errorForm.document_no }}
										</span>
									</div>
								</div>
							</div>
							<div class="form-item">
								<div>
									<div>
										<select
											v-model="ubicacion_proyecto"
											id="ubicacion_proyecto"
											v-bind:class="{ error: errors.ubicacion_proyecto }"
											required>
											<option value="-" selected>Seleccionar proyecto</option>
											<option
												:value="project.id"
												v-for="project in sortedArray(this.arrProjects)"
												:key="project.id">
												{{ project.name }}
											</option>
										</select>
										<label for="ubicacion_proyecto" placeholder="Ubicación del proyecto"></label>
										<span v-if="errors.ubicacion_proyecto === true" class="error">
											{{ errorForm.ubicacion_proyecto }}
										</span>
									</div>
								</div>
								<div>
									<div>
										<select
											v-model="tipo_inmueble"
											id="tipo_inmueble"
											v-bind:class="{ error: errors.tipo_inmueble }"
											required>
											<option value="-">Seleccionar</option>
											<option :value="3">casa</option>
											<option :value="1">lote</option>
										</select>
										<!-- <select
                      v-model="tipo_inmueble"
                      id="tipo_inmueble"
                      v-bind:class="{ error: errors.tipo_inmueble }"
                      required
                    >
                      <option value="-" selected>Seleccionar</option>
                      <option
                        :value="tipo.id"
                        v-for="tipo in sortedArray(this.arrProperties)"
                        :key="tipo.id"
                      >
                        {{ tipo.name }}
                      </option>
                    </select> -->
										<label for="tipo_inmueble" placeholder="Tipo de inmueble"></label>
										<span v-if="errors.tipo_inmueble === true" class="error">
											{{ errorForm.tipo_inmueble }}
										</span>
									</div>
								</div>
							</div>
							<div>
								<div>
									<input
										v-model="correo_electronico"
										id="correo_electronico"
										type="text"
										class="input-fix"
										v-bind:class="{ error: errors.correo_electronico }"
										required />
									<label for="correo_electronico" placeholder="Correo electrónico"></label>
									<span v-if="errors.correo_electronico === true" class="error">
										{{ errorForm.correo_electronico }}
									</span>
								</div>
							</div>
							<div>
								<div>
									<textarea
										v-model="comentario"
										id="comentario"
										v-bind:class="{ error: errors.comentario }"
										required></textarea>
									<label for="comentario" placeholder="Comentario"></label>
									<span v-if="errors.comentario" class="error pt-3 mb-0 pb-0">
										{{ errorForm.comentario }}
									</span>
								</div>
							</div>
							<div class="modal-form__message" v-bind:class="{ active: errorActive }">
								{{ errorMessage }}
							</div>
							<div class="modal-form__terms">
								<p>
									* Para poder ofrecerle a tu referido información más personalizada, nos ayudaría que
									nos puedas proporcionar algunos datos adicionales como el motivo de su interés en el
									proyecto, su edad, es-tado civil, situación laboral, lugar de residencia, tu
									relación o parentezco con el mismo, entre otros.
								</p>
								<template>
									<div class="form-chk">
										<b-form-checkbox
											id="terms"
											v-model="terms"
											name="terms"
											value="true"
											unchecked-value="false">
											He leído y acepto los
											<a
												href="https://ventanamenorca.blob.core.windows.net/ventana/Te%CC%81rminos+y+condiciones+de+uso+de+la+plataforma+Ventana+Menorca.pdf"
												target="_blank"
												>Términos y Condiciones</a
											>
										</b-form-checkbox>
									</div>
								</template>
								<span v-if="errors.terms" class="error mt-0 mb-0 pb-0">
									{{ errorForm.terms }}
								</span>
								<template>
									<div class="form-chk">
										<b-form-checkbox
											id="politicas"
											v-model="politicas"
											name="politicas"
											value="true"
											unchecked-value="false"
											>He leído y acepto las
											<a
												href="https://ventanamenorca.blob.core.windows.net/ventana/Po%CC%81liticas+de+proteccio%CC%81n+de+datos.pdf"
												target="_blank"
												>Políticas de protección de datos</a
											>
										</b-form-checkbox>
									</div>
								</template>
								<span v-if="errors.politicas" class="error mt-0 mb-0 pb-0">
									{{ errorForm.politicas }}
								</span>
							</div>
							<div class="modal-form__buttons">
								<button
									type="button"
									class="btn btn-green float-right"
									id="btnRef"
									@click.prevent="sendForm">
									referir
								</button>
								<button type="button" class="btn float-right" @click="closeModal()">Cancelar</button>
							</div>
						</div>
					</form>
				</template>
			</div>
		</b-modal>

		<b-modal
			id="modal-importar-contactos"
			centered
			class="modal fade"
			tabindex="-1"
			:hide-footer="hideFooterModal"
			aria-hidden="true">
			<template #modal-header="{ close }">
				<h5 class="modal-title">Importar contactos</h5>
				<button type="button" aria-label="Close" class="close" @click="closeModalContact()">×</button>
			</template>

			<div class="modal-form">
				<template v-if="callGoogle == false">
					<p>Selecciona desde que plataforma deseas importar a tus contactos.</p>
					<div class="modal-form__box mb-0 pb-0">
						<div class="modal-form__col row justify-content-around align-items-baseline">
							<div>
								<div class="modal-form__rrss">
									<div>
										<img src="~assets/img/logo-gmail.png" alt="Contactos de Gmail" />
									</div>
									<div>
										<button class="btn btn-green" @click.prevent="authGoogle()">GOOGLE</button>
									</div>
								</div>
							</div>
							<div class="mt-4">
								<div class="modal-form__rrss">
									<div>
										<img src="~assets/img/Outlook-Logo.png" alt="Contactos de Outlook" />
									</div>
									<div>
										<button class="btn btn-green" @click.prevent="authOutlook()">OUTLOOK</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</template>
				<template v-else>
					<p>
						Selecciona a las personas que deseas importar a tu lista contactos, lo ideal sería que tengan
						correo y celular.
					</p>
					<div class="modal-form__box">
						<div class="modal-form__col--filter">
							<div>Mostrar por:</div>
							<div>
								<b-dropdown
									id="dropdown-left"
									:text="filters.filterTypeName"
									variant="primary"
									class="dropdown-filter">
									<b-dropdown-item @click.prevent="filterContacts('all')">Ver todo</b-dropdown-item>
									<b-dropdown-item @click.prevent="filterContacts('celular_email')"
										>Celular y correo electrónico</b-dropdown-item
									>
									<b-dropdown-item @click.prevent="filterContacts('celular')"
										>Solo celular</b-dropdown-item
									>
									<b-dropdown-item @click.prevent="filterContacts('email')"
										>Solo correo electrónico</b-dropdown-item
									>
								</b-dropdown>
							</div>
							<div>
								<div>
									<input
										type="text"
										name="search"
										id="search"
										v-model="filters.searchContactTextValue"
										required />
									<label for="search" placeholder="Buscar contacto"></label>
								</div>
							</div>
						</div>
						<div class="table">
							<div class="table__header lista-contactos">
								<div>NOMBRE Y APELLIDO</div>
								<div>CELULAR</div>
								<div>CORREO ELECTRÓNICO</div>
							</div>
							<div class="table__content-scroll">
								<!-- <div class="table__body lista-contactos" v-if="filteredList.length > 0">
									<div v-for="(person, key) in filteredList" :key="key">
										<template
											v-if="
												person.phoneNumbers != undefined || person.emailAddresses != undefined
											">
											<div>
												<input
													type="checkbox"
													v-model="selectedUsers"
													:value="person"
													:id="person.names[0].metadata.source.id" />
												<label :for="person.names[0].metadata.source.id">{{
													person.names[0].displayName
												}}</label>
											</div>
											<div>
												<div v-if="person.phoneNumbers != undefined">
													{{ (person.phoneNumbers[0] && person.phoneNumbers[0].value) || '' }}
												</div>
											</div>
											<div>
												<div v-if="person.emailAddresses != undefined">
													{{
														(person.emailAddresses[0] && person.emailAddresses[0].value) ||
														''
													}}
												</div>
											</div>
										</template>
									</div>
								</div> -->
								<div class="table__body lista-contactos" v-if="filteredList.length">
									<div v-for="(person, key) in filteredList" :key="key">
										<template v-if="person.phone || person.email">
											<div>
												<input
													type="checkbox"
													v-model="selectedUsers"
													:value="person"
													:id="person.networkId" />
												<label :for="person.networkId">{{ person.name }}</label>
											</div>
											<div class="pl-3 pl-lg-0">
												<div v-if="person.phone">
													{{ person.phone || '' }}
												</div>
											</div>
											<div class="pl-3 pl-lg-0">
												<div v-if="person.email">
													{{ person.email || '' }}
												</div>
											</div>
										</template>
									</div>
								</div>
								<div v-else>
									<p class="w-100 text-center mt-4">
										<strong>Aún no tienes contacto en esta red</strong>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div v-if="selectedUsers.length > 0" class="modal-form__selected">
						<p>Has selecionado estos contactos para importar:</p>
					</div>
					<div class="listado-correos">
						<div id="listado-correos">
							<span v-for="contact in filteredNameList" :key="contact.networkId"
								>{{ contact.name }}<button @click.prevent="deleteUser(contact.networkId)"></button
							></span>
						</div>
					</div>

					<div class="modal-form__buttons">
						<button type="button" class="btn btn-green float-right" @click="saveContact()">
							Importar contactos
						</button>
						<button type="button" class="btn float-right" @click="closeModalContact()">Cancelar</button>
						<button type="button" class="btn float-right" @click="getBackContact()">Regresar</button>
					</div>
				</template>
			</div>
		</b-modal>

		<b-modal
			id="modal-wsp"
			centered
			class="modal fade"
			tabindex="-1"
			:hide-footer="hideFooterModal"
			aria-hidden="true">
			<template #modal-header="{ close }">
				<h5 class="modal-title">Cobra tu premio de referido</h5>
				<button type="button" aria-label="Close" class="close" @click="close()">×</button>
			</template>

			<div class="modal-form">
				<template>
					<p>
						Hola <strong>{{ activeUser }}</strong
						>, para poder tramitar el cobro de tu premio debes de comunicarte con nuesro ejecutivo a través
						del siguiente número: Recuerda que tienes 30 días desde su compra para cobrarlo, pasado el
						tiempo caduca el beneficio
					</p>
					<div class="text-center">
						<button class="btn wsp">+51{{ wsp }}</button>
					</div>
					<div class="buttons text-center mt-4">
						<button class="btn btn-text" @click.prevent="closeModalWsp">CANCELAR</button>
						<a
							:href="`whatsapp://send?phone=51${wsp}&text=Hola%20${executive}%2C%20gan%C3%A9%20un%20bono%20por%20un%20referido%2C%20%C2%BFqu%C3%A9%20debo%20hacer%20para%20cobrarlo%3F`"
							class="btn btn-green"
							target="_blank">
							escribir por whatsapp
						</a>
					</div>
				</template>
			</div>
		</b-modal>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import { mapActions, mapGetters } from 'vuex';
	import Menu from '@/components/common/Menu';
	import Sidebar from '@/components/common/Sidebar';
	import Vue from 'vue';
	import Vuelidate from 'vuelidate';
	import moment from 'moment';
	import { EVENTS } from '../../core/constants/events';
	import { normalizeContacts } from '../../core/helpers/contactHelper';

	Vue.use(Vuelidate);
	export default {
		middleware: 'auth',
		transition: 'slide-left',
		data() {
			return {
				loading: false,
				document: '',
				errors: {
					nombre: false,
					celular: false,
					dni: false,
					ubicacion_proyecto: false,
					correo_electronico: false,
					tipo_inmueble: false,
					apellidos: false,
					comentario: false,

					document_type: false,
					document_no: false,
					politicas: false,
					terms: false,
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

				document_type: '',
				document_no: '',

				dni: '',
				ubicacion_proyecto: '',
				correo_electronico: '',
				tipo_inmueble: '',
				comentario: '',
				tabIndex: 0,
				errorActive: false,
				errorForm: {
					nombre: 'Ingrese un nombre válido',
					apellidos: 'Ingrese un apellido válido',
					celular: 'Ingrese un celular válido',
					dni: 'Ingrese un DNI válido',
					correo_electronico: 'Ingrese un correo válido',
					ubicacion_proyecto: 'Seleccione un proyecto',
					tipo_inmueble: 'Seleccione un tipo de inmueble',
					comentario: 'Ingrese un comentario',

					document_type: 'Selecciona un tipo de documento',
					document_no: 'Ingrese un número de documento',
					politicas: 'Debe aceptar las Políticas de privacidad',
					terms: 'Debe aceptar los términos y condiciones',
				},
				projects: {},
				arrProjects: [],
				arrProperties: [],
				activeForm: 'referidos',
				activeUser: {},
				callGoogle: false,
				search: '',
				contactsGoogle: [],
				selectedUsers: [],
				filters: {
					searchContactTextValue: '',
					filterType: '',
					filterTypeName: '',
				},
				prizes: [],
				wsp: '',
				executive: '',
				arrReferrals: [],
				politicas: 'false',
				terms: 'false',
			};
		},
		components: {
			Menu,
			Sidebar,
		},
		watch: {},
		computed: {
			...mapGetters({
				user: 'account/getUserAccount',
				referralsListBI: 'referred/userReferralsBI',
				referralsList: 'referred/getUserReferrals',
				contactsList: 'contact/getUserContacts',
				getContactDetails: 'contact/getContactDetails',
				getProjectsList: 'referred/getProjectsList',
				getPropertiesList: 'referred/getPropertiesList',
			}),
			commentsUpdated() {
				return this.errors.comentario;
			},

			filteredList() {
				if (this.filters.filterType === 'celular_email') {
					this.filters.filterTypeName = 'Celular y correo electrónico';

					return this.contactsGoogle.filter(
						({ name, phone, email }) =>
							phone &&
							email &&
							name?.toLowerCase().includes(this.filters.searchContactTextValue.toLowerCase())
					);
				}

				if (this.filters.filterType === 'celular') {
					this.filters.filterTypeName = 'Solo celular';

					return this.contactsGoogle.filter(
						({ name, phone, email }) =>
							!email &&
							phone &&
							name?.toLowerCase().includes(this.filters.searchContactTextValue.toLowerCase())
					);
				}

				if (this.filters.filterType === 'email') {
					this.filters.filterTypeName = 'Solo correo electrónico';

					return this.contactsGoogle.filter(
						({ email, name, phone }) =>
							!phone &&
							email &&
							name?.toLowerCase().includes(this.filters.searchContactTextValue.toLowerCase())
					);
				}

				this.filters.filterTypeName = 'Ver todo';

				return this.contactsGoogle.filter(({ name }) =>
					name.toLowerCase().includes(this.filters.searchContactTextValue.toLowerCase())
				);
			},
			// filteredList: function () {
			// 	if (this.filters.filterType === "celular_email") {
			// 		this.filters.filterTypeName = "Celular y correo electrónico";

			// 		return this.contactsGoogle
			// 			.filter((contact) => {
			// 				if (
			// 					Array.isArray(contact.phoneNumbers) &&
			// 					Array.isArray(contact.emailAddresses)
			// 				) {
			// 					return (
			// 						contact.phoneNumbers[0].value !== "" &&
			// 						contact.emailAddresses[0].value !== ""
			// 					);
			// 				}
			// 			})
			// 			.filter((person) => {
			// 				return person.names[0].displayName
			// 					.toLowerCase()
			// 					.includes(this.filters.searchContactTextValue.toLowerCase());
			// 			});
			// 	} else if (this.filters.filterType === "celular") {
			// 		this.filters.filterTypeName = "Solo celular";
			// 		return this.contactsGoogle
			// 			.filter((contact) => {
			// 				if (
			// 					Array.isArray(contact.phoneNumbers) &&
			// 					!Array.isArray(contact.emailAddresses)
			// 				) {
			// 					return contact.phoneNumbers[0].value !== "";
			// 				}
			// 			})
			// 			.filter((person) => {
			// 				return person.names[0].displayName
			// 					.toLowerCase()
			// 					.includes(this.filters.searchContactTextValue.toLowerCase());
			// 			});
			// 	} else if (this.filters.filterType === "email") {
			// 		this.filters.filterTypeName = "Solo correo electrónico";
			// 		return this.contactsGoogle
			// 			.filter((contact) => {
			// 				if (
			// 					!Array.isArray(contact.phoneNumbers) &&
			// 					Array.isArray(contact.emailAddresses)
			// 				) {
			// 					return contact.emailAddresses[0].value !== "";
			// 				}
			// 			})
			// 			.filter((person) => {
			// 				return person.names[0].displayName
			// 					.toLowerCase()
			// 					.includes(this.filters.searchContactTextValue.toLowerCase());
			// 			});
			// 	} else {
			// 		this.filters.filterTypeName = "Ver todo";
			// 		return this.contactsGoogle
			// 			.filter((contact) => {
			// 				return contact.names[0].displayName
			// 					.toLowerCase()
			// 					.includes(this.filters.searchContactTextValue.toLowerCase());
			// 			})
			// 			.filter((person) => {
			// 				return person.names[0].displayName
			// 					.toLowerCase()
			// 					.includes(this.filters.searchContactTextValue.toLowerCase());
			// 			});
			// 	}
			// },
			filteredNameList: function () {
				let name = '';
				if (this.selectedUsers.length > 0) {
					name = this.selectedUsers.map((contact) => {
						return contact;
					});
				} else {
					name = '';
				}

				return name;
			},
		},
		async mounted() {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			if (this.$route.query.code && this.$route.query.code != '') {
				let code = this.$route.query.code;
				this.authGoogle(code);
			}

			this.userAccount = await this.$store.dispatch('account/getUserAccount', { token }).then((response) => {
				this.document = response.data.profile.document;
				this.activeUser = response.data.profile.name;
				return response.data;
			});

			const obj = {
				token: token,
				payload: {
					document: this.document,
				},
			};

			await this.$store.dispatch('referred/getUserReferrals', { token }).then((response) => {});

			await this.$store.dispatch('referred/userReferralsBI', obj).then((response) => {});

			await this.$store.dispatch('contact/getUserContacts', { token }).then((response) => {});

			this.properties = await this.$store.dispatch('referred/getPropertiesList', { token }).then((response) => {
				this.properties = response.data;

				response.data.map((property, i) => {
					return this.arrProperties.push({
						name: property.attributes.name,
						id: property.attributes.id,
					});
				});

				return this.arrProperties;
			});
			await this.$store.dispatch('referred/getProjectsList', { token }).then((response) => {
				this.projects = response.data;

				response.data.map((project, i) => {
					return this.arrProjects.push({
						name: project.attributes.name,
						id: project.attributes.id,
					});
				});

				return this.arrProjects;
			});
		},
		methods: {
			...mapActions({
				save: 'metrics/save',
				authOutlookNew: 'contact/authOutlook',
			}),

			async authOutlook() {
				const res = await this.authOutlookNew();

				if (!res) return;

				this.contactsGoogle = res;

				this.openModalContact();
				this.callGoogle = true;
			},
			recordContactModal() {
				this.save({ type: EVENTS.referidos.clickImportContactos });
			},
			onlyNumber($event) {
				let keyCode = $event.keyCode ? $event.keyCode : $event.which;
				if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
					$event.preventDefault();
				}
			},
			onlyLetters($event) {
				let regex = new RegExp('^[a-zA-Z ]+$');
				let key = String.fromCharCode(!$event.charCode ? $event.which : $event.charCode);
				if (!regex.test(key)) {
					$event.preventDefault();
					return false;
				}
			},
			openModalContact() {
				this.tabIndex = 1;
				setTimeout(() => {
					this.$bvModal.show('modal-importar-contactos');
				}, 500);
			},
			getBackContact() {
				this.tabIndex = 1;
				this.callGoogle = false;
			},
			openModal(form) {
				if (this.activeForm !== form) {
					this.nombre = '';
					this.apellidos = '';
					this.celular = '';
					this.dni = '';

					this.document_type = '';
					this.document_no = '';

					this.ubicacion_proyecto = '';
					this.correo_electronico = '';
					this.tipo_inmueble = '';
					this.comentario = '';
				}

				this.activeForm = form;
				this.errors.nombre = false;
				this.errors.celular = false;
				this.errors.dni = false;

				this.errors.document_type = false;
				this.errors.document_no = false;

				this.errors.ubicacion_proyecto = false;
				this.errors.correo_electronico = false;
				this.errors.tipo_inmueble = false;
				this.errors.apellidos = false;
				this.errors.comentario = false;

				setTimeout(() => {
					this.$bvModal.show('modal_referido');
				}, 500);
			},
			openWsp(wsp, executive) {
				this.wsp = wsp;
				this.executive = executive;
				setTimeout(() => {
					this.$bvModal.show('modal-wsp');
				}, 500);
			},
			closeModal() {
				setTimeout(() => {
					this.$bvModal.hide('modal_referido');
				}, 100);
			},
			closeModalWsp() {
				setTimeout(() => {
					this.$bvModal.hide('modal-wsp');
				}, 100);
			},
			closeModalContact() {
				setTimeout(() => {
					this.$bvModal.hide('modal-importar-contactos');
					var t = setTimeout(() => {
						this.tabIndex = 1;
						this.callGoogle = false;
						clearTimeout(t);
					}, 500);
				}, 100);
			},
			isLetter(event) {
				let char = String.fromCharCode(event.keyCode);

				if (/^[a-zA-Z\s]*$/.test(char)) return true;
				else event.preventDefault();
			},
			statusReferred(status) {
				var translated = '';

				switch (status) {
					case 'pending':
						translated = 'Pendiente';
						break;
					case 'deposit_payment_created':
						translated = 'Depósito';
						break;
					case 'deposit_financial_created':
						translated = 'Depósito';
						break;
					case 'process_separation_created':
						translated = 'Separación';
						break;
					case 'process_sale_completed':
						translated = 'En proceso de venta';
						break;
					case 'process_canceled_created':
						translated = 'Desistió';
						break;
					case 'reserv_created':
						translated = 'Reserva';
						break;
					case 'reserv_canceled':
						translated = 'Reserva';
						break;
					default:
						translated = 'Pendiente';
				}
				return translated;
			},
			validate() {
				if (this.activeForm !== 'editar-contacto' && this.activeForm !== 'contactos') {
					console.log('1');
					this.errors.nombre = !(this.nombre?.trim() && /^([^0-9]*)$/.test(this.nombre));
					this.errors.apellidos = !(this.apellidos?.trim() && /^([^0-9]*)$/.test(this.apellidos));

					!this.validateEmail(this.correo_electronico)
						? (this.errors.correo_electronico = true)
						: (this.errors.correo_electronico = false);

					this.celular === '' ? (this.errors.celular = true) : (this.errors.celular = false);
					//this.dni === "" ? (this.errors.dni = true) : (this.errors.dni = false);
					this.ubicacion_proyecto === '' || this.ubicacion_proyecto === '-'
						? (this.errors.ubicacion_proyecto = true)
						: (this.errors.ubicacion_proyecto = false);
					this.tipo_inmueble === '' || this.tipo_inmueble === '-'
						? (this.errors.tipo_inmueble = true)
						: (this.errors.tipo_inmueble = false);
					this.comentario == '' ? (this.errors.comentario = true) : (this.errors.comentario = false);

					// Documento
					this.errorForm.document_no = 'Ingrese un número de documento';
					this.errors.document_no = false;

					this.document_type === '' || this.document_type === '-'
						? (this.errors.document_type = true)
						: (this.errors.document_type = false);

					if (this.document_no === '') {
						this.errors.document_no = true;
					} else {
						this.errors.document_no = false;

						if (this.document_type === '1') {
							if (!this.validateDNI(this.document_no)) {
								this.errors.document_no = true;
								this.errorForm.document_no = 'Debe ingresar sólo números de 8 dígitos';
							}
						}

						if (this.document_type === '2') {
							if (!this.validateCE(this.document_no)) {
								this.errors.document_no = true;
								this.errorForm.document_no = 'Debe ingresar sólo 12 dígitos';
							}
						}

						if (this.document_type === '3') {
							if (!this.validateRUC(this.document_no)) {
								this.errors.document_no = true;
								this.errorForm.document_no = 'Debe ingresar sólo números de 11 dígitos';
							}
						}

						if (this.document_type === '4') {
							if (!this.validatePasaporte(this.document_no)) {
								this.errors.document_no = true;
								this.errorForm.document_no = 'Debe ingresar sólo 12 dígitos';
							}
						}
					}

					this.politicas === 'false' ? (this.errors.politicas = true) : (this.errors.politicas = false);
					this.terms === 'false' ? (this.errors.terms = true) : (this.errors.terms = false);

					//validar form

					console.log(
						this.errors.nombre,
						this.errors.apellidos,
						this.errors.celular,
						this.errors.document_type,
						this.errors.document_no,
						this.errors.ubicacion_proyecto,
						this.errors.correo_electronico,
						this.errors.tipo_inmueble,
						this.errors.comentario,
						this.politicas,
						this.terms
					);

					if (
						!this.errors.nombre &&
						!this.errors.apellidos &&
						!this.errors.celular &&
						//!this.errors.dni &&
						!this.errors.document_type &&
						!this.errors.document_no &&
						!this.errors.ubicacion_proyecto &&
						!this.errors.correo_electronico &&
						!this.errors.tipo_inmueble &&
						!this.errors.comentario &&
						this.politicas == 'true' &&
						this.terms == 'true'
					) {
						return true;
					} else {
						return false;
					}
				} else if (this.activeForm === 'contactos') {
					console.log('2');
					this.nombre = this.nombre.trim();

					this.errors.nombre = !(this.nombre && /^([^0-9]*)$/.test(this.nombre));
					this.errors.apellidos = !(this.apellidos && /^([^0-9]*)$/.test(this.apellidos));

					// this.nombre === "" ? (this.errors.nombre = true) : (this.errors.nombre = false);

					// this.apellidos === ""
					// 	? (this.errors.apellidos = true)
					// 	: (this.errors.apellidos = false);

					!this.validateEmail(this.correo_electronico)
						? (this.errors.correo_electronico = true)
						: (this.errors.correo_electronico = false);

					return !(this.errors.nombre || this.errors.apellidos || this.errors.correo_electronico);
				} else {
					console.log('3');
					return true;
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
						id: this.id,
						referencerId: this.userAccount._id,
						firstName: this.nombre,
						lastName: this.apellidos,

						documentType: this.document_type,
						document: this.document_no,

						email: this.correo_electronico,
						phone: this.celular,
						projectId: this.ubicacion_proyecto,
						observation: this.comentario,
						propertyType: this.tipo_inmueble,
						dni_referidor: this.document,
					},
				};

				console.log('validate', this.validate());

				if (this.validate()) {
					if (this.activeForm == 'referidos' || this.activeForm === 'referir-contacto') {
						document.getElementById('btnRef').disabled = true;
						console.log('AAAAAA', this.activeForm);
						await this.$store.dispatch('referred/createReferrals', obj).then((response) => {
							this.loading = false;
							if (response.success) {
								document.getElementById('btnRef').disabled = false;
								this.closeModal();
								this.save({ type: EVENTS.referidos.nuevoReferido });
								//this.successMessage = response.message;
								this.nombre = '';
								this.apellidos = '';
								this.celular = '';

								this.document_type = '';
								this.document_no = '';

								this.ubicacion_proyecto = '';
								this.correo_electronico = '';
								this.tipo_inmueble = '';
								this.comentario = '';
							}

							if (!response.success) {
								this.errorActive = true;
								this.errorMessage = response.case;

								// if (response.errors) {
								//   response.errors.forEach((element) => {
								//     this.errorMessage = element.message;
								//   });
								// }
							}
						});
						await this.$store.dispatch('referred/getUserReferrals', { token }).then((response) => {});
					} else if (this.activeForm == 'contactos') {
						await this.$store.dispatch('contact/createContact', obj).then((response) => {
							this.loading = false;

							if (response.success) {
								this.closeModal();
								this.save({ type: EVENTS.referidos.nuevoContacto });
								this.nombre = '';
								this.apellidos = '';
								this.celular = '';

								this.document_type = '';
								this.document_no = '';

								this.ubicacion_proyecto = '';
								this.correo_electronico = '';
								this.tipo_inmueble = '';
								this.comentario = '';

								window.scrollTo({
									top: document.querySelector('.contacts__list--ready').offsetTop - 124,
									left: 0,
									behavior: 'smooth',
								});
							}

							if (!response.success) {
								this.errorActive = true;
								this.errorMessage = response.message;
							}
						});

						await this.$store.dispatch('contact/getUserContacts', { token }).then((response) => {});
					} else if (this.activeForm == 'editar-contacto') {
						await this.$store.dispatch('contact/updateContact', obj).then((response) => {
							this.loading = false;

							if (response.success) {
								this.closeModal();
								this.save({ type: EVENTS.referidos.editarContacto });

								this.nombre = '';
								this.apellidos = '';
								this.celular = '';

								this.document_type = '';
								this.document_no = '';

								this.ubicacion_proyecto = '';
								this.correo_electronico = '';
								this.tipo_inmueble = '';
								this.comentario = '';

								window.scrollTo({
									top: document.querySelector('.contacts__list--ready').offsetTop - 124,
									left: 0,
									behavior: 'smooth',
								});
							}

							if (!response.success) {
								this.errorActive = true;
								this.errorMessage = response.message;
							}
						});

						await this.$store.dispatch('contact/getUserContacts', { token }).then((response) => {});
					}
				}
			},
			async getContactById(contactId) {
				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;
				await this.$store.dispatch('contact/getContactDetails', { token, contactId }).then((response) => {
					this.openModal('editar-contacto');
					this.id = contactId;
					this.nombre = response.contact.firstName;
					this.apellidos = response.contact.lastName;
					this.celular = response.contact.phone;
					this.document_type = response.contact.documentType;
					this.document_no = response.contact.document;
					this.ubicacion_proyecto = response.contact.projectId;
					this.tipo_inmueble = response.contact.propertyType;
					this.correo_electronico = response.contact.email;
					this.comentario = response.contact.comments;
				});
			},
			async referContactById(contactId) {
				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;
				await this.$store.dispatch('contact/getContactDetails', { token, contactId }).then((response) => {
					this.openModal('referir-contacto');
					this.id = contactId;
					this.nombre = response.contact.firstName;
					this.apellidos = response.contact.lastName;
					this.celular = response.contact.phone;
					this.document_type = response.contact.documentType;
					this.document_no = response.contact.document;
					this.ubicacion_proyecto = response.contact.projectId;
					this.tipo_inmueble = response.contact.propertyType;
					this.correo_electronico = response.contact.email;
					this.comentario = response.contact.comments;
				});
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
			async authGoogle(code) {
				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;

				this.save({
					type: EVENTS.referidos.clickImportarContacto,
					payload: {
						type: 'google',
					},
				});

				await this.$store.dispatch('contact/authGoogle', { token, code }).then((response) => {
					if (response.url && response.url != '' && response.url != undefined) {
						window.location.href = response.url;
					} else if (response.saved != undefined && response.saved == true) {
						//window.location.href = "/mis-referidos#contactos";
						this.$router.push('#contactos');
						// this.contactsGoogle = response.people;
						this.contactsGoogle = normalizeContacts('google', response.people);

						this.openModalContact();
						this.callGoogle = true;
					} else if (response.people && response.people != undefined && response.people.length > 0) {
						this.openModalContact();
						this.callGoogle = true;
						this.contactsGoogle = response.people;
					}
				});
			},
			filterContacts(filter) {
				this.filters.filterType = filter;
			},
			async saveContact() {
				const session = JSON.parse(Cookies.get('session'));
				const token = session.token;

				let items = {};

				// const selected = this.selectedUsers.map((contact, i) => {
				// 	let phone;
				// 	let email;
				// 	//let arrContacts = [];

				// 	if (Array.isArray(contact.phoneNumbers)) {
				// 		phone = contact.phoneNumbers[0].value;
				// 	}
				// 	if (Array.isArray(contact.emailAddresses)) {
				// 		email = contact.emailAddresses[0].value;
				// 	}

				// 	let item = {
				// 		name: contact.names[0].displayName,
				// 		phone: phone,
				// 		email: email,
				// 		networkId: contact.names[0].metadata.source.id,
				// 	};

				// 	items = { ...items, ...item };

				// 	return items;
				// });

				const selected = this.selectedUsers;

				const obj = {
					token: token,
					payload: selected,
				};

				await this.$store.dispatch('contact/createContacts', obj).then((response) => {
					this.loading = false;

					if (response.success) {
						this.closeModalContact();
						this.successMessage = response.message;

						this.save({
							type: EVENTS.referidos.importarContacto,
							payload: {
								contactosImportados: selected?.length ?? 0,
							},
						});

						window.scrollTo({
							top: document.querySelector('.contacts__list--ready').offsetTop - 124,
							left: 0,
							behavior: 'smooth',
						});
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

				await this.$store.dispatch('contact/getUserContacts', { token }).then((response) => {});
			},
			deleteUser(id) {
				return document.getElementById(id).click();
			},
			doHash(hash) {
				window.location.hash = hash;
			},
			sortReferral() {
				let arrReferrals = [];
				this.referralsList.arrReferrals.map((item) => {
					arrReferrals.push(item);
					return item;
				});

				this.arrReferrals = arrReferrals.sort((a, b) => {
					var c = new Date(moment(a.createdAt).format('DD/MM/YYYY'));
					var d = new Date(moment(b.createdAt).format('DD/MM/YYYY'));
					return d - d;
				});
				console.log('asdasdasd', this.arrReferrals);

				return arrReferrals;
			},
			validateDNI(value) {
				if (/^\d{8}(?:[-\s]\d{4})?$/.test(value)) {
					return true;
				} else {
					return false;
				}
			},
			validateCE(value) {
				if (/^[a-zA-Z0-9]{12}$/.test(value)) {
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
		},
	};
</script>
