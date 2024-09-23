<template>
    <b-modal id="modal-1" centered title="Comunícate con un Ejecutivo de Atención al Cliente">
      <p class="m-0">
        Hola, para activar tu cuenta en la <b>“Ventana Menorca”</b> necesitamos validar tu identidad con el número de celular o correo electrónico que indicaste en tu contrato.<br><br>
        ¿Ya no usas esas cuentas? ¡No hay problema! Puedes contactarte con nosotros a <b>atencion.clientes@menorca.com.pe</b> para poder ayudarte.        
      </p>

      <template #modal-footer="{ close }">
        
          <span class="float-left text-green" @click="close()">CANCELAR</span>
          <!--<a class="float-left btn btn-white ml-5" @click="call()">LLAMAR</a>
          <a class="float-left btn btn-green ml-5" @click="goToWa()">ESCRIBIR POR WHATSAPP</a>-->
        
      </template>
    </b-modal>
</template>

<script>

export default {
    transition: "slide-left",
    data() {
        return {
            
        }
    },
    components: {
        
    },
    computed:{

    },
	  methods: {
        call() {
          window.open('tel:012032828');
        },
        goToWa() {
          window.open('https://wa.me/+51960641637?text=Hola,%20quisiera%20que%20me%20ayuden%20con%20la%20actualización%20de%20mis%20datos');
        }
    },
    async mounted() {

    }
}
</script>