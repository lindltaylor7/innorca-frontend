<template>
	<div id="register-completar-registro">
		<Menu />
    <div class="page">
      <div class="container">
        <div class="row">
          <div class="col-4">
            <div class="img">
              <img class="img-j img-fluid" src="~assets/img/register/register1.jpg" alt="">
            </div>
          </div>
          <div class="col-8">
            <div class="box step-1" v-show="!step2">

              <div class="container h-100">

                <div class="row align-items-center h-100">

                  <div class="col-12">

                    <div class="wrap">
                        <h3 class="title">¡Un paso más y listo!</h3>

                        <p class="info">Genera una contraseña para tu cuenta:</p>

                        <div>
                            <input v-model="password" id="password" type="password" required />
                            <label for="password" placeholder="Contraseña nueva"></label>
                        </div>

                        <div>
                            <input v-model="repeatPassword" id="repeat_password" type="password" required />
                            <label for="repeat_password" placeholder="Repetir contraseña nueva"></label>
                        </div>

                        <div class="d-flex align-items-center" style="max-width:200px;">
                          <button @click="createAccount" class="btn btn-green" :disabled="loading">Crear cuenta</button>
                          <div v-show="loading" class="loader"></div>
                        </div>

                        <div class="text-danger" style="margin-top: 17px;font-size: 14px;">
                          {{ errorMessage }}
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
	</div>
</template>

<script>
import Cookies from 'js-cookie';
import { mapGetters } from 'vuex';
import Menu from '@/components/common/Menu';

export default {
    transition: "slide-left",
    data() {
        return {
            password: '',
            repeatPassword: '',
            errorMessage: '',
            loading: false,
            step2: false
        }
    },
    components: {
        Menu
    },
    computed:{

    },
	methods: {
      async  createAccount() {

        this.errorMessage = "";

        if (this.password == '' || this.repeatPassword == '') {
            this.errorMessage = "Por favor ingrese una contraseña";
            return;
        }

        if (this.password !== this.repeatPassword) {
            this.errorMessage = "Las contraseñas no coinciden";
            return;
        }

        this.loading = true;

        const payload = {
          token: this.$route.params.id,
          password: this.password
        }

        await this.$store.dispatch('account/createPassword', payload)
          .then( ( response ) => {

            console.log('response', response);
            this.loading = false;
            
            if (response.success == true) {
              
                var session = {
                    "token": response.data.token,
                    "user": {
                      address: response.data.profile.address,
                      docType: response.data.profile.docType,
                      document: response.data.profile.document,
                      phone: response.data.profile.phone,
                      name: response.data.profile.name,
                      sperantClientId: response.data.profile.sperantClientId,
                      sperantEmail: response.data.profile.sperantEmail
                    },
                    "loggedIn": true
                }

                console.log('session', session);

                this.$store.commit('setSession', session)
                Cookies.set('session', session);

                this.$router.push('/mi-perfil');

            } else if (response.success == false) {
              console.log(response);
              this.errorMessage = response.message;
            }

          });


      }
    },
    async mounted() {

    }
}
</script>

<style lang="scss">

</style>