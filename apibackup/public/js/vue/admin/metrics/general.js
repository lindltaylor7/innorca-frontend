const admin_general_metrics = document.getElementById('admin-general-metrics');

if (admin_general_metrics) {
  new Vue({
    el: "#admin-general-metrics",
    data() {
      return {
        apiUrl: `${location.origin}/api`,
        metrics: null,
        pathAnalytics: null,
        filter: {
          startDate: '',
          endDate: '',
        },
        processing: false,
      };
    },
    watch: {
      pathAnalytics() {
        this.initPathMetricChart()
      },
      filter() {
        this.getGeneralMetrics()
      }
    },
    created() {
      this.getGeneralMetrics()
    },
    mounted() {
      $("#reportrange").daterangepicker({
        autoUpdateInput: false,
        locale: {
          cancelLabel: "Eliminar",
          applyLabel: "Aplicar",
          daysOfWeek: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
          monthNames: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Setiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
        },
      })

      const vue = this
      $("#reportrange").on("apply.daterangepicker", function (_ev, picker) {
        $(this).val(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"))

        vue.filter = {
          startDate: picker.startDate.format("YYYY-MM-DD"),
          endDate: picker.endDate.format("YYYY-MM-DD"),
        }
      })

      $("#reportrange").on("cancel.daterangepicker", function (_ev, picker) {
        $(this).val("")

        vue.filter = { startDate: '', endDate: '' }
      })
    },
    methods: {
      startRequest() {
        this.processing = true
      },
      endRequest() {
        this.processing = false
      },
      getGeneralMetrics() {
        if (this.processing) return

        this.startRequest()
        axios.get(`${this.apiUrl}/metrics?startDate=${this.filter.startDate}&endDate=${this.filter.endDate}`)
          .then((res) => {
            const { data } = res

            const metrics = {
              cipsCount: data.cipsCount,
              requestsCount: data.requestsCount,
              referredsCount: data.referredsCount,
              usersCount: data.usersCount,
              budgetsCount: data.budgetsCount,
            }

            const pathAnalytics = data.pathAnalytics

            this.metrics = metrics
            this.pathAnalytics = pathAnalytics
            this.endRequest()
          })
          .catch((error) => {
            console.log(error.message)
            this.endRequest()
          })
      },
      clearFilters() {
        const rangePicker = document.getElementById('reportrange')
        rangePicker.value = ''
        this.filter = { startDate: '', endDate: '' }
      },
      initPathMetricChart() {
        const ctx = document.getElementById('mychart').getContext('2d')

        const pathAnalytics = this.pathAnalytics

        const pathAnalyticsObject = {
          noticias: 'Blog Menorca',
          inmuebles: 'Mis inmuebles',
          pagoCercano: 'Pagos más cercanos',
          construcciones: 'Mis construcciones',
          referidos: 'Mis referidos',
          consultas: 'Mis consultas',
          preguntas: 'Preguntas frecuentes',
          login: 'Inicios de sessión',
        }

        let labels = []
        let data = []
        for (const key of Object.keys(pathAnalytics)) {
          labels.push(pathAnalyticsObject[key])
          data.push(pathAnalytics[key] || 0)
        }

        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              label: 'Path Metrics',
              data: data,
              backgroundColor: [
                '#488f31',
                '#de425b',
                '#5498E0',
                '#d6d07c',
                '#f69b63',
                '#7ca545',
                '#ffe79e',
                '#fbc27b',
              ],
              hoverOffset: 4
            }]
          }
        })
      }
    }
  })
}