<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4">
          <img src="~assets/img/footer/logo-menorca.svg" alt="" />
        </div>

        <div class="col-12 col-md-4">
          <h4>Te podria interesar</h4>
          <ul>
            <li>Visita la web Menorca</li>
            <li>Construcciones</li>
            <li>Ir al portal del propietario</li>
            <li>Manual del portal del propietario</li>
            <li>Preguntas frecuentes</li>
            <li>Términos y Condiciones</li>
            <li>Política de protección de datos</li>
            <li>Guardián Constructor</li>
          </ul>
        </div>

        <div class="col-12 col-md-4">
          <h4>Servicio al cliente Menorca</h4>
          <ul>
            <li>
              <img src="~assets/img/footer/telephone-icon.svg" alt="" /> (01) 203 2828
              opc. 3
            </li>
            <li>
              <img src="~assets/img/footer/email-icon.svg" alt="" />
              atencion.clientes@menorca.com.pe
            </li>
            <li>
              <img src="~assets/img/footer/place-icon.svg" alt="" /> Av. Javier Prado Este
              488 (Torre Orquídeas), San Isidro.
            </li>
          </ul>

          <h4>Síguenos</h4>
          <!--<img src="~assets/img/socials.png" alt="">-->
          <ul class="socials">
            <li>
              <a href="https://www.facebook.com/menorcalotes" target="_blank">
                <font-awesome-icon :icon="['fab', 'facebook-f']" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/c/MENORCAINVERSIONES" target="_blank">
                <font-awesome-icon :icon="['fab', 'youtube']" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/menorcainversiones?igshid=10cetn29cdmvu"
                target="_blank"
              >
                <font-awesome-icon :icon="['fab', 'instagram']" />
              </a>
            </li>
            <li>
              <a href="https://tiktok.com/@menorcainversiones" target="_blank">
                <font-awesome-icon :icon="['fab', 'tiktok']" />
              </a>
            </li>
            <li>
              <a
                href="https://pe.linkedin.com/company/menorca-inversiones-s-a-c"
                target="_blank"
              >
                <font-awesome-icon :icon="['fab', 'linkedin']" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="row text-center">
        <div class="col-12">
          <small>© Menorca 2019 | Todos los derechos reservados</small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  name: "Footer",
  computed: {},
  methods: {},
  mounted() {
    //alert('footer');
  },
};
</script>
