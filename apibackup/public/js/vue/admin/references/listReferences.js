const admin_all_references = document.getElementById('admin-all-references');

if (admin_all_references) {
  new Vue({
    el: "#admin-all-references",
    data() {
      return {
        references: [],
        total_pages: 1,
        page: 0,
        statusFilter: "",
        projectTypeFilter: "",
        nameFilter: "",
        startDayFilter: "",
        endDayFilter: "",
        filter: "",
        isProcessing: false,
      };
    },
    computed: {
      exportUrl() {
        return `/admin/exports/referals?startDate=${this.startDayFilter}&endDate=${this.endDayFilter}&${this.statusFilter}&${this.projectTypeFilter}&${this.nameFilter}`
      }
    },
    created() {
      axios
        .get(`${window.origin}/admin/nextReferences`)
        .then((res) => {
          const { references, total } = res.data;
          references.map((request) => {
            request.createdAt = moment(request.createdAt)
              .add(5, "hours")
              .format("DD/MM/YYYY");
          });
          this.page += 1;
          this.total_pages = Math.ceil(total / 10);
          this.references = references;
          this.isProcessing = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    mounted(){
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
          vue.getAdminOtherReferences(
            "",
            "date",
            "false",
            picker.startDate.format("YYYY-MM-DD"),
            picker.endDate.format("YYYY-MM-DD")
          );
        });
  
        $("#reportrange").on("cancel.daterangepicker", function (ev, picker) {
          $(this).val("");
          vue.getAdminOtherReferences("", "date", "false");
        });
    },
    methods: {
      getAdminOtherReferences(event, type, isNext, startDay, endDay) {
        if (this.isProcessing) return;

        this.isProcessing = true;
        this.references = [];
        let nextPage = this.page;
        let filterValue;
        
        if (startDay) this.startDayFilter = startDay
        if (endDay) this.endDayFilter = endDay

        if (event) filterValue = event.target.value

        if (isNext === "false") {
          nextPage -= 1;
        } else {
          nextPage += 1;
        }

        if (type === "status" && this.statusFilter !== `status=${filterValue}&`) {
          this.statusFilter = filterValue !== "nofilter" ? `status=${filterValue}&` : "";
          nextPage = 0;
        }

        if (type === "projectType" && this.projectTypeFilter !== `status=${filterValue}&`) {
          this.projectTypeFilter = filterValue !== "nofilter" ? `projectType=${filterValue}&` : "";
          nextPage = 0;
        }

        if (
          type === "name" &&
          this.nameFilter !== `status=${filterValue}&`
        ) {
          this.nameFilter =
            filterValue !== "nofilter" ? `name=${filterValue}&` : "";
          nextPage = 0;
        }
        this.filter = this.statusFilter
          .concat(this.projectTypeFilter)
          .concat(this.nameFilter);
        axios
          .get(`${window.origin}/admin/nextReferences?${
            this.filter
            }page=${nextPage}&startDate=${startDay || ""}&endDate=${
              endDay || ""
            }`
          )
          .then((res) => {
            let { references, total } = res.data;
            references.map((reference) => {
              reference.createdAt = moment(reference.createdAt)
                .add(5, "hours")
                .format("DD/MM/YYYY");
            });
            if (nextPage === 0) {
              this.page = 1;
            } else {
              this.page = nextPage;
            }
            this.total_pages = Math.ceil(total / 10);
            this.references = references;
            this.isProcessing = false;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      openReference(referredId) {
        return (window.location = `/admin/referido/detalles/${referredId}`);
      },
      getStatusName(status) {
        const statusesObject = {
          pending                    : 'Pendiente',
          deposit_payment_created    : 'Depósito',
          deposit_financial_created  : 'Depósito',
          process_separation_created : 'Separación',
          process_sale_completed     : 'En proceso de venta',
          process_canceled_created   : 'Desistió',
          reserv_created             : 'Reserva',
          reserv_canceled            : 'Reserva',
        }

        return statusesObject[status]
      },
      clearFilters() {
        this.statusFilter = "";
        this.nameFilter = "";
        this.projectTypeFilter = "";
        this.startDayFilter = "";
        this.endDayFilter = "";
        this.filter = "";
        
        document.getElementById('statusInput').value = 'nofilter';
        document.getElementById('noFilterStatus').selected = 'selected';
        document.getElementById('nameInput').value = 'nofilter';
        document.getElementById('noFilterName').selected = 'selected';
        document.getElementById('projectTypeInput').value = 'nofilter';
        document.getElementById('noFilterProjectTypeInput').selected = 'selected';
        document.getElementById('reportrange').value = '';
        
        this.getAdminOtherReferences(null, 'noType', 'false');
      }
    }
  });
}