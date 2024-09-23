<template>
  <div id="register">
    <Menu />
    <div class="page">
      <div class="container">
        <div class="row">
          <div class="col-md-4 d-none d-sm-block">
            <div class="img">
              <img
                class="img-j img-fluid"
                src="~assets/img/register/register1.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="col-12 col-md-8">
            <div class="box step-1" v-show="!step2">
              <div class="container h-100">
                <div class="row align-items-center h-100">
                  <div class="col-12">
                    <div class="wrap modal-form">
                      <h3 class="title">
                        Activa tu cuenta<br />
                        Ventana Menorca
                      </h3>

                      <p class="info mb-4">
                        ¿Si has adquirido un inmueble en Menorca?<br />
                        tú puedes <b>activar tu cuenta</b> ahora mismo
                      </p>

                      <p class="info">
                        Ingresa tu número de documento para poder crear tu cuenta.
                      </p>

                      <div class="input-group mb-3">
                        <div class="first-child">
                          <select
                            v-model="documentType"
                            id="document_type"
                            v-bind:class="{ error: errors.documentType }"
                            required
                          >
                            <option value="-" selected>Seleccionar</option>
                            <option value="dni">DNI</option>
                            <option value="ce">CE</option>
                            <option value="ruc">RUC</option>
                            <option value="pasaporte">Pasaporte</option>
                          </select>
                          <label
                            for="document_type"
                            placeholder="Tipo de documento"
                          ></label>

                          <span v-if="errors.documentType === true" class="error">
                            {{ errorForm.documentType }}
                          </span>
                        </div>

                        <div class="last-child">
                          <input
                            v-if="documentType == '' || documentType == '-'"
                            v-model="documentNo"
                            id="no_document"
                            v-bind:class="{ error: errors.documentNo }"
                            type="text"
                            required
                          />

                          <input
                            v-if="documentType == 'dni'"
                            v-model="documentNo"
                            id="no_document"
                            v-bind:class="{ error: errors.documentNo }"
                            type="text"
                            minlength="8"
                            maxlength="8"
                            @keypress="onlyNumber"
                            required
                          />
                          <input
                            v-if="documentType == 'ce'"
                            v-model="documentNo"
                            id="no_document"
                            v-bind:class="{ error: errors.documentNo }"
                            type="text"
                            minlength="8"
                            maxlength="12"
                            required
                          />
                          <input
                            v-if="documentType == 'ruc'"
                            v-model="documentNo"
                            id="no_document"
                            v-bind:class="{ error: errors.documentNo }"
                            type="text"
                            minlength="11"
                            maxlength="11"
                            @keypress="onlyNumber"
                            required
                          />
                          <input
                            v-if="documentType == 'pasaporte'"
                            v-model="documentNo"
                            id="no_document"
                            v-bind:class="{ error: errors.documentNo }"
                            type="text"
                            minlength="12"
                            maxlength="12"
                            required
                          />
                          <label
                            for="no_document"
                            placeholder="Nro. de documento"
                          ></label>
                          <span v-if="errors.documentNo === true" class="error">
                            {{ errorForm.documentNo }}
                          </span>
                        </div>
                      </div>

                      <p class="terms">
                        Al registrarme acepto los
                        <nuxt-link to="/">Términos y condiciones</nuxt-link>
                      </p>
                      <p class="terms mb-3">
                        Al registrarme acepto las
                        <nuxt-link to="/">Políticas de protección de datos</nuxt-link>
                      </p>

                      <div class="d-flex align-items-center" style="max-width: 200px">
                        <button
                          @click="signUp"
                          class="btn btn-green btn-submit"
                          :class="{ loading: loading }"
                          :disabled="loading"
                        >
                          Ingresar
                        </button>
                      </div>

                      <div class="text-danger" style="margin-top: 17px; font-size: 14px">
                        {{ errorMessage }}
                      </div>

                      <!--<div v-show="registeredUser">
                          <nuxt-link to="/login" class="login">Iniciar Sesión</nuxt-link><br>
                          <nuxt-link to="/recuperar-contrasena" class="login">Recuperar Cuenta</nuxt-link>
                        </div>-->

                      <p class="login mt-3">
                        <nuxt-link to="/login">¿Ya estás registrado?</nuxt-link>
                      </p>
                      <p class="login mt-3">
                        <nuxt-link to="/recuperar-contrasena"
                          >¿Olvidaste tu contraseña?</nuxt-link
                        >
                      </p>
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
                        Crea tu cuenta<br />
                        Ventana Menorca
                      </h3>

                      <p class="info">
                        Se envió un correo de confirmación a tu cuenta registrada al
                        momento de tu compra:
                      </p>

                      <p class="obfuscate-s">{{ emailOb }}</p>

                      <p class="info">
                        de igual forma enviamos un SMS a tu número de celular:
                      </p>

                      <p class="obfuscate-s">{{ telephoneOb }}</p>

                      <div
                        class="text-success mb-4"
                        style="margin-top: 17px; font-size: 14px"
                      >
                        {{ successMessage }}
                      </div>

                      <p class="help">
                        ¿No te llegaron las notificaciones?
                        <a href="javascript:void(0)" @click="resendSMS"
                          >Enviar de nuevo</a
                        >
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
import { mapActions, mapGetters } from "vuex";
import Menu from "@/components/common/Menu";
import ComunicateAsesorModal from "@/components/common/ComunicateAsesorModal";

import { EVENTS } from "../../core/constants/events";

export default {
  middleware: "no-auth",
  transition: "slide-left",
  data() {
    return {
      documentType: "",
      documentNo: "",
      loading: false,
      errorMessage: "",
      successMessage: "",
      emailOb: "",
      telephoneOb: "",
      userId: "",
      registeredUser: false,
      step2: false,

      errors: {
        documentType: false,
        documentNo: false,
      },

      errorForm: {
        documentType: "Selecciona un tipo de documento",
        documentNo: "Ingrese un número de documento",
      },
    };
  },
  components: {
    Menu,
    ComunicateAsesorModal,
  },
  computed: {},
  methods: {
    async resendSMS() {
      this.successMessage = "";

      const payload = {
        userId: this.userId,
      };

      await this.$store.dispatch("signup/resendSMS", payload).then((response) => {
        if (response.success) {
          this.successMessage = "Se enviaron nuevamente las notificaciones";
        }
      });
    },
    validateDocument() {
      //Reset
      this.errorForm.documentNo = "Ingrese un número de documento";
      this.errors.documentNo = false;

      //console.log('this.documentNo', this.documentNo);

      this.documentType === "" || this.documentType === "-"
        ? (this.errors.documentType = true)
        : (this.errors.documentType = false);

      if (this.documentNo === "") {
        this.errors.documentNo = true;
      } else {
        this.errors.documentNo = false;

        if (this.documentType === "dni") {
          if (!this.validateDNI(this.documentNo)) {
            this.errors.documentNo = true;
            this.errorForm.documentNo = "Debe ingresar sólo números de 8 dígitos";
          }
        }

        if (this.documentType === "ce") {
          if (!this.validateCE(this.documentNo)) {
            this.errors.documentNo = true;
            this.errorForm.documentNo = "Debe ingresar 9 dígitos";
          }
        }

        if (this.documentType === "ruc") {
          if (!this.validateRUC(this.documentNo)) {
            this.errors.documentNo = true;
            this.errorForm.documentNo = "Debe ingresar sólo números de 11 dígitos";
          }
        }

        if (this.documentType === "pasaporte") {
          if (!this.validatePasaporte(this.documentNo)) {
            this.errors.documentNo = true;
            this.errorForm.documentNo = "Debe ingresar sólo 12 dígitos";
          }
        }
      }

      console.log("errors", this.errors.documentNo);

      if (!this.errors.documentType && !this.errors.documentNo) {
        return true;
      } else {
        this.loading = false;
        return false;
      }
    },
    async signUp() {
      this.errorMessage = "";

      /*if (this.documentType == '' || this.documentNo == '') {
				this.errorMessage = "Por favor seleccione e ingrese un número de documento";
				return;
			}*/

      this.loading = true;

      const payload = {
        docType: this.documentType.toUpperCase(),
        docNumber: this.documentNo,
      };

      if (this.validateDocument()) {
        await this.$store.dispatch("signup/register", payload).then(async (response) => {
          console.log("response", response);
          this.loading = false;

          if (response.message == "Este número de documento no pertenece a Sperant.") {
            this.errorMessage = "Este número de documento no existe.";
          }

          if (response.code == "20001" || response.code == "20002") {
            this.errorMessage = response.message;
          }

          if (response.code == "20003") {
            //this.$router.push('/signup/usuario-registrado');
            this.errorMessage = "Estimado cliente, usted ya se encuentra registrado.";
            this.registeredUser = true;
          }

          if (response.code == "30001") {
            if (response.data.email) {
              this.emailOb = response.data.email;
            }

            if (response.data.cellphone) {
              this.telephoneOb = response.data.cellphone;
            }

            if (response.data.user_id) {
              this.userId = response.data.user_id;
            }

            const data = {
              userId: this.userId,
              path: this.$route.path,
              docType: this.documentType,
              docNumber: this.documentNo,
            };

            await this.save({ type: EVENTS.registro.signup, payload: data });

            this.step2 = true;
          }
        });
      }
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    validateDNI(value) {
      if (/^\d{8}(?:[-\s]\d{4})?$/.test(value)) {
        return true;
      } else {
        return false;
      }
    },
    validateCE(value) {
      if (/^[a-zA-Z0-9]{9}$/.test(value)) {
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
    ...mapActions({
      save: "metrics/save",
    }),
  },
  async mounted() {},
};
</script>

<style lang="scss"></style>
