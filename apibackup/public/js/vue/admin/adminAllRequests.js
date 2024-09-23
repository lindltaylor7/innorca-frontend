const admin_all_requests = document.getElementById("admin-all-requests");

if (admin_all_requests) {
  new Vue({
    el: "#admin-all-requests",
    data() {
      return {
        requests: [],
        total_pages: 1,
        page: 0,
        statusFilter: "",
        projectFilter: "",
        categoryFilter: "",
        startDayFilter: "",
        endDayFilter: "",
        filter: "",
        isProcessing: true,
      };
    },
    created() {
      axios
        .get(`${window.origin}/admin/nextRequests`)
        .then((res) => {
          const { requests, total } = res.data;

          requests.map((request) => {

            let created = request.createdAt
            
            request.createdAt = moment(created).format("DD/MM/YYYY");

            request.creationHour =  moment(created).format('HH:mm:ss');

            request.diffDays = parseInt( moment.duration(moment().diff(created)).asDays() );
          });

          this.page += 1;
          this.total_pages = Math.ceil(total / 10);
          this.requests = requests;
          this.isProcessing = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    mounted() {
      const cb = (start, end) => {
        const el = document.getElementById("reportrange");
        this.getOtherRequests(
          "",
          "date",
          "false",
          start.format("YYYY-MM-DD"),
          end.format("YYYY-MM-DD")
        );
      };

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
      });
      const vue = this;
      $("#reportrange").on("apply.daterangepicker", function (ev, picker) {
        $(this).val(
          picker.startDate.format("DD/MM/YYYY") +
            " - " +
            picker.endDate.format("DD/MM/YYYY")
        );
        vue.getOtherRequests(
          "",
          "date",
          "false",
          picker.startDate.format("YYYY-MM-DD"),
          picker.endDate.format("YYYY-MM-DD")
        );
      });

      $("#reportrange").on("cancel.daterangepicker", function (ev, picker) {
        $(this).val("");
        vue.getOtherRequests("", "date", "false");
      });
    },
    computed: {
      exportUrl() {
        return `/admin/exports/requests?startDate=${this.startDayFilter}&endDate=${this.endDayFilter}&${this.statusFilter}&${this.projectFilter}`
      }
    },
    methods: {
      getOtherRequests(event, type, isNext, startDay, endDay) {
        if (this.isProcessing) return;

        if (startDay) this.startDayFilter = startDay
        if (endDay) this.endDayFilter = endDay

        this.isProcessing = true;
        this.requests = [];
        let nextPage = this.page;
        let filterValue;

        if (event) {
          filterValue = event.target.value;
        }

        if (isNext === "false") {
          nextPage -= 1;
        } else {
          nextPage += 1;
        }

        if (
          type === "status" &&
          this.statusFilter !== `status=${filterValue}&`
        ) {
          this.statusFilter =
            filterValue !== "nofilter" ? `status=${filterValue}&` : "";
          nextPage = 0;
        }

        if (
          type === "project" &&
          this.projectFilter !== `status=${filterValue}&`
        ) {
          this.projectFilter =
            filterValue !== "nofilter" ? `project=${filterValue}&` : "";
          nextPage = 0;
        }

        if (
          type === "category" &&
          this.categoryFilter !== `status=${filterValue}&`
        ) {
          console.log("entrando");
          this.categoryFilter =
            filterValue !== "nofilter" ? `category=${filterValue}&` : "";
          nextPage = 0;
        }

        this.filter = this.statusFilter
          .concat(this.projectFilter)
          .concat(this.categoryFilter);

        axios
          .get(
            `${window.origin}/admin/nextRequests?${
              this.filter
            }page=${nextPage}&startDate=${startDay || ""}&endDate=${
              endDay || ""
            }`
          )
          .then((res) => {
            let { requests, total } = res.data;

            requests.map((request) => {

              let created = request.createdAt
              request.createdAt = moment(created).format("DD/MM/YYYY");
  
              request.creationHour =  moment(created).format('HH:mm:ss');
  
              request.diffDays = parseInt( moment.duration(moment().diff(created)).asDays() );
            });

            if (nextPage === 0) {
              this.page = 1;
            } else {
              this.page = nextPage;
            }
            this.total_pages = Math.ceil(total / 10);
            this.requests = requests;
            this.isProcessing = false;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      openRequest(index) {
        return (window.location = `/admin/consulta/${index}`);
      },
      clearFilters() {
        this.statusFilter = "";
        this.projectFilter = "";
        this.categoryFilter = "";
        this.subCategoryFilter = "";
        this.startDayFilter = "";
        this.endDayFilter = "";
        this.filter = "";
        document.getElementById('statusInput').value = 'nofilter';
        document.getElementById('noFilterStatus').selected = 'selected';
        document.getElementById('projectInput').value = 'nofilter';
        document.getElementById('noFilterProject').selected = 'selected';
        document.getElementById('reportrange').value = '';
        this.getOtherRequests(null, 'noType', 'false');
      }
      
    },
  });
}