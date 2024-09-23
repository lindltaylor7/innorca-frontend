const admin_requests_metrics = document.getElementById('admin-requests-metrics');

if (admin_requests_metrics) {
  new Vue({
    el: "#admin-requests-metrics",
    data() {
      return {
        apiUrl: `${location.origin}/api`,
        apiPath: 'metrics/requests',
        metrics: null,
        filter: {
          startDate: '',
          endDate: '',

          startDateTypeConsult: '',
          endDateTypeConsult: '',

          startDateTypeProduct: '',
          endDateTypeProduct: '',

          startDateProjectName: '',
          endDateProjectName: '',

          all: ''
        },
        processing: false,
      };
    },
    watch: {
      metrics() {
        this.initPathMetricChart()
        this.initPathMetricChart2()
      },
      filter() {
        this.getRequestsMetrics()
      }
    },
    created() {
      this.getRequestsMetrics()
    },
    mounted() {
      const data = {
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
      }

      const vue = this

      $("#reportrange").daterangepicker(data)

      $("#reportrange").on("apply.daterangepicker", function (_ev, picker) {
        $(this).val(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"))

        vue.filter = {
          startDate: picker.startDate.format("YYYY-MM-DD"),
          endDate: picker.endDate.format("YYYY-MM-DD"),
        }
      })

      $("#reportrange").on("cancel.daterangepicker", function (_ev, picker) {
        $(this).val("")

        vue.filter = { ...vue.filter, startDate: '', endDate: '' }
      })

      /////////////
      $("#reportrange2").daterangepicker(data)

      $("#reportrange2").on("apply.daterangepicker", function (_ev, picker) {
        $(this).val(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"))

        vue.filter = {
          ...vue.filter,
          startDateTypeConsult: picker.startDate.format("YYYY-MM-DD"),
          endDateTypeConsult: picker.endDate.format("YYYY-MM-DD"),
        }
        console.log(vue.filter)
      })

      $("#reportrange2").on("cancel.daterangepicker", function (_ev, picker) {
        $(this).val("")

        vue.filter = { ...vue.filter, startDateTypeConsult: '', endDateTypeConsult: '' }
      })

      /////////////
      $("#reportrange3").daterangepicker(data)

      $("#reportrange3").on("apply.daterangepicker", function (_ev, picker) {
        $(this).val(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"))

        vue.filter = {
          ...vue.filter,
          startDateTypeProduct: picker.startDate.format("YYYY-MM-DD"),
          endDateTypeProduct: picker.endDate.format("YYYY-MM-DD"),
        }
      })

      $("#reportrange3").on("cancel.daterangepicker", function (_ev, picker) {
        $(this).val("")

        vue.filter = { ...vue.filter, startDateTypeProduct: '', endDateTypeProduct: '' }
      })

      /////////////
      $("#reportrange4").daterangepicker(data)

      $("#reportrange4").on("apply.daterangepicker", function (_ev, picker) {
        $(this).val(picker.startDate.format("DD/MM/YYYY") + " - " + picker.endDate.format("DD/MM/YYYY"))

        vue.filter = {
          ...vue.filter,
          startDateProjectName: picker.startDate.format("YYYY-MM-DD"),
          endDateProjectName: picker.endDate.format("YYYY-MM-DD"),
        }
      })

      $("#reportrange4").on("cancel.daterangepicker", function (_ev, picker) {
        $(this).val("")

        vue.filter = { ...vue.filter, startDateProjectName: '', endDateProjectName: '' }
      })
    },
    methods: {
      startRequest() {
        this.processing = true
      },
      endRequest() {
        this.processing = false
      },
      getRequestsMetrics() {
        if (this.processing) return

        this.startRequest()
        axios.get(`${this.apiUrl}/${this.apiPath}?startDate=${this.filter.startDate || ''}&endDate=${this.filter.endDate || ''}&startDateTypeConsult=${this.filter.startDateTypeConsult || ''}&endDateTypeConsult=${this.filter.endDateTypeConsult || ''}&startDateTypeProduct=${this.filter.startDateTypeProduct || ''}&endDateTypeProduct=${this.filter.endDateTypeProduct || ''}&startDateProjectName=${this.filter.startDateProjectName || ''}&endDateProjectName=${this.filter.endDateProjectName || ''}&all=${this.filter.all || ''}`)
          .then((res) => {
            const { data } = res

            const metrics = {
              requestsMetricsCount: data.requestsMetricsCount,
              requestsCount: data.requestsCount,
              typeConsultMetrics: data.typeConsultMetrics,
              typeProductCount: data.typeProductCount,
              projectNameCount: data.projectNameCount,
            }

            this.metrics = metrics
            console.dir(metrics.projectNameCount)
            this.endRequest()
          })
          .catch((error) => {
            console.log(error.message)
            this.endRequest()
          })
      },
      findAttentionTypeName(id) {
        const metric = this.metrics.typeConsultMetrics.find((el) => el._id == id)
        if (!metric) return '0'
        return metric.count
      },
      applyToAll() {
        const rangePicker = document.getElementById('reportrange')
        if (!rangePicker.value) return

        console.log(rangePicker.value)
        const rangePicker2 = document.getElementById('reportrange2')
        const rangePicker3 = document.getElementById('reportrange3')
        const rangePicker4 = document.getElementById('reportrange4')
        rangePicker2.value = rangePicker.value
        rangePicker3.value = rangePicker.value
        rangePicker4.value = rangePicker.value

        this.filter = {
          startDate: this.filter.startDate,
          endDate: this.filter.endDate,
          startDateTypeConsult: this.filter.startDate,
          endDateTypeConsult: this.filter.endDate,
          startDateTypeProduct: this.filter.startDate,
          endDateTypeProduct: this.filter.endDate,
          startDateProjectName: this.filter.startDate,
          endDateProjectName: this.filter.endDate,
        }
      },
      clearFilters() {
        const rangePicker = document.getElementById('reportrange')
        rangePicker.value = ''
        this.filter = { ...this.filter, startDate: '', endDate: '' }
      },
      clearFilters2() {
        const rangePicker = document.getElementById('reportrange2')
        rangePicker.value = ''
        this.filter = { ...this.filter, startDateTypeConsult: '', endDateTypeConsult: '' }
      },
      clearFilters3() {
        const rangePicker = document.getElementById('reportrange3')
        rangePicker.value = ''
        this.filter = { ...this.filter, startDateTypeProduct: '', endDateTypeProduct: '' }
      },
      clearFilters4() {
        const rangePicker = document.getElementById('reportrange4')
        rangePicker.value = ''
        this.filter = { ...this.filter, startDateProjectName: '', endDateProjectName: '' }
      },
      initPathMetricChart() {
        const ctx = document.getElementById('mychartattention').getContext('2d')

        const typeConsultMetrics = this.metrics.typeConsultMetrics

        const typeConsultMetricsObject = {
          0: 'Consulta de atención al cliente',
          1: 'Consulta de cobranzas',
          2: 'Otras consultas',
        }

        let labels = []
        let data = []
        for (let i = 0; i < typeConsultMetrics.length; i++) {
          const element = typeConsultMetrics[i];
          if ([0, 1, 2].includes(element._id)) {
            labels.push(typeConsultMetricsObject[element._id])
            data.push(element.count)
          }
        }

        const char1 = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              label: 'Tipo de atención',
              data: data,
              backgroundColor: [ '#488f31', '#de425b', '#5498E0' ],
              hoverOffset: 4
            }]
          }
        })
      },
      initPathMetricChart2() {
        const ctx2 = document.getElementById('mycharttype').getContext('2d')

        const mycharttype = this.metrics.typeProductCount

        const typeProductCountObject = { 0: 'Casas', 1: 'Lotes' }

        let labels2 = []
        let data2 = []
        for (let i = 0; i < mycharttype.length; i++) {
          const element = mycharttype[i];
          if ([0, 1, 2].includes(element._id)) {
            labels2.push(typeProductCountObject[element._id])
            data2.push(element.count)
          }
        }

        const chart2 = new Chart(ctx2, {
          type: 'doughnut',
          data: {
            labels: labels2,
            datasets: [{
              label: 'Tipo de proyecto',
              data: data2,
              backgroundColor: [
                '#488f31',
                '#de425b',
              ],
              hoverOffset: 4
            }]
          }
        })
      }
    }
  })
}