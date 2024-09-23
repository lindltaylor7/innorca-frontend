<template>
  <!-- Sidebar -->

  <simplebar class="sidebar" data-simplebar-auto-hide="true" style="height: 82vh">
    <div class="container" v-if="!loading">
      <!-- <div>
				<input id="search" type="text" required />
				<label for="search" placeholder="Buscar"></label>
			</div> -->

      <template
        v-if="
          $route.path == '/mi-perfil' || $route.path == '/mi-perfil/cambio-contrasena'
        "
      >
        <ul class="list">
          <li @click="goToInicio" :class="{ active: $route.path == '/inicio' }">
            <img src="~assets/img/icons/dashboard.png" /> Inicio
          </li>
          <li @click="goToProfile" :class="{ active: $route.path == '/mi-perfil' }">
            <img src="~assets/img/icons/user.png" /> Mis datos personales
          </li>
          <li
            @click="goToChangePassword"
            :class="{
              active: $route.path == '/mi-perfil/cambio-contrasena',
            }"
          >
            <img src="~assets/img/icons/lock.png" /> Cambiar contraseña
          </li>
        </ul>
      </template>
      <template v-else>
        <ul class="list">
          <li @click="goToInicio" :class="{ active: $route.path == '/inicio' }">
            <img src="~assets/img/icons/dashboard.png" /> Inicio
          </li>
          <li @click="goToMisPagos" :class="{ active: $route.path == '/mis-pagos' }">
            <img src="~assets/img/icons/money.png" /> Mis pagos
          </li>
          <li
            @click="goToMisPropiedades"
            :class="{ active: $route.path == '/mis-inmuebles' }"
          >
            <img src="~assets/img/icons/house.png" /> Mis inmuebles
          </li>

          <li
            @click="goToMisReferidos"
            :class="{ active: $route.path == '/mis-referidos' }"
          >
            <img src="~assets/img/icons/people.png" /> Mis referidos
          </li>
          <li
            @click="goToAtencionAlCliente"
            :class="{
              active:
                $route.path == '/atencion-al-cliente' ||
                $route.path.includes('/atencion-al-cliente/detalle'),
            }"
          >
            <img src="~assets/img/icons/girl.png" /> Atención al cliente
          </li>
          <li
            @click="goToMisConstrucciones"
            :class="{
              active:
                $route.path == '/construcciones' ||
                $route.path.includes('/construcciones/nueva-cotizacion'),
            }"
          >
            <img src="~assets/img/icons/building.png" /> Construcciones
          </li>
          <li
            @click="goToPreguntasFrecuentes"
            :class="{
              active: $route.path == '/preguntas-frecuentes',
            }"
          >
            <img src="~assets/img/icons/question.png" /> Preguntas Frecuentes
          </li>
        </ul>
      </template>
    </div>
  </simplebar>
</template>

<script>
import router from "vue-router";
import Cookies from "js-cookie";
import { mapGetters } from "vuex";
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
  transition: "slide-left",
  data() {
    return {
      loading: true,
    };
  },
  components: {
    simplebar,
  },
  watch: {
    budgets(newVal) {
      if (newVal) {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      budgets: "property/getBudgets",
    }),
  },
  async mounted() {
    const session = JSON.parse(Cookies.get("session"));
    const token = session.token;

    if (
      localStorage.getItem("budget_code") === null &&
      localStorage.getItem("project_type") === null &&
      localStorage.getItem("contract_num") === null &&
      localStorage.getItem("budget_id") === null &&
      localStorage.getItem("project_id") === null &&
      localStorage.getItem("project_name") === null
    ) {
      await this.$store.dispatch("property/fetchBudgets", { token }).then((response) => {
        if (response.success) {
          localStorage.setItem("budget_id", this.budgets[0].id);
          localStorage.setItem("budget_code", this.budgets[0].code);
          localStorage.setItem("project_id", this.budgets[0].project_id);
          localStorage.setItem("project_name", this.budgets[0].project.name);
          localStorage.setItem("project_type", this.budgets[0].project.projectType);
          localStorage.setItem("contract_num", this.budgets[0].contract_num);
          localStorage.setItem("unit_code", this.budgets[0].unit_code);

          localStorage.setItem("etapa", this.budgets[0].etapa);
          localStorage.setItem("manzana", this.budgets[0].manzana);
          localStorage.setItem("lote", this.budgets[0].lote);
        }
      });
    } else {
      this.loading = false;
    }
  },
  methods: {
    goToInicio() {
      this.$router.push("/inicio");
    },
    goToMisPagos() {
      this.$router.push("/mis-pagos");
    },
    goToProfile() {
      this.$router.push("/mi-perfil");
    },
    goToChangePassword() {
      this.$router.push("/mi-perfil/cambio-contrasena");
    },
    goToMisPropiedades() {
      this.$router.push("/mis-inmuebles");
    },
    goToMisConstrucciones() {
      this.$router.push("/construcciones");
    },
    goToMisReferidos() {
      this.$router.push("/mis-referidos");
    },
    goToAtencionAlCliente() {
      this.$router.push("/atencion-al-cliente");
    },
    goToPreguntasFrecuentes() {
      this.$router.push("/preguntas-frecuentes");
    },
  },
};
</script>
