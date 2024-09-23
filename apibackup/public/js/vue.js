const projectType = document.getElementById("projectType")
Vue.prototype.moment = moment.locale("es");
if (projectType) {
    new Vue({
        el: '#projectType',
        data() {
            return {
              subCategories: [],
              category: "",
              subCategory: '',
            } 
        },
        mounted: function () {
          console.log('scuakx2')
          var el = document.getElementById('projectType');
          this.category = el.getAttribute('data-category') || '';
          this.subCategory = el.getAttribute('data-subCategory') || '';

        },
        created(){
          console.log('scuak')
        },
        methods: {
            getSubCategories(event) {
                console.log(event)
                if (this.category != '') {
                    axios.get(`${window.origin}/api/getSubCategories/${this.category}`)
                        .then(({ data }) => {
                            this.subCategories = data.subCategories
                        })
                        .catch((err) => {
                            alert(err)
                            alert(`Error al obtener la lista de Subcategorias.`)
                        })
                }
            }
        },
        watch: {
            category: function () {
                console.log('scuakscuak');
                this.getSubCategories()
                this.subCategory = ''
            }
        }
    });
}

const user_all_requests = document.getElementById("use-all-requests");

if (user_all_requests) {
  new Vue({
    el: "#use-all-requests",
    data() {
      return {
        requests: [],
        total_pages: 1,
        page: 0,
        statusFilter: "",
        projectFilter: "",
        categoryFilter: "",
        subCategoryFilter: "",
        startDayFilter: "",
        endDayFilter: "",
        filter: "",
        isProcessing: true,
      };
    },
    created() {
      axios
        .get(`${window.origin}/nextRequests`)
        .then((res) => {
          const { requests, total } = res.data;

          console.log(requests)

          requests.map((request) => {
            request.createdAt = moment(request.createdAt)
              .add(5, "hours")
              .format("DD/MM/YYYY");
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
    methods: {
      getOtherRequests(event, type, isNext, startDay, endDay) {
        if (this.isProcessing) return;

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
        if (
          type === "subCategory" &&
          this.subCategoryFilter !== `status=${filterValue}&`
        ) {
          console.log("entrando");
          this.subCategoryFilter =
            filterValue !== "nofilter" ? `subCategory=${filterValue}&` : "";
          nextPage = 0;
        }
        this.filter = this.statusFilter
          .concat(this.projectFilter)
          .concat(this.categoryFilter)
          .concat(this.subCategoryFilter);

        axios
          .get(
            `${window.origin}/nextRequests?${
              this.filter
            }page=${nextPage}&startDate=${startDay || ""}&endDate=${
              endDay || ""
            }`
          )
          .then((res) => {
            let { requests, total } = res.data;

            requests.map((request) => {
              request.createdAt = moment(request.createdAt)
                .add(5, "hours")
                .format("DD/MM/YYYY");
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
        return (window.location = `/consulta/${index}`);
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
const admin_all_users = document.getElementById("admin-all-users");

if (admin_all_users) {
  new Vue({
    el: "#admin-all-users",
    data() {
      return {
        users: [],
        total_pages: 1,
        page: 0,
        filter: '',
        isProcessing: true,
      };
    },
    created() {
      axios
        .get(`${window.origin}/admin/nextUsers?page=${this.page + 1}`)
        .then((res) => {

          const { users, count } = res.data;

          this.page += 1;
          this.total_pages = Math.ceil(count / 20);
          this.users = users;
          this.isProcessing = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    methods: {
      getOtherUsers(isNextPage) {
        console.log(isNextPage)

        let nextPage;
        if ( isNextPage !== undefined ) {
          nextPage = isNextPage ? this.page + 1 : this.page - 1;
        } else {
          console.log('Holi')
          nextPage = 1;
        }

        axios
        .get(`${window.origin}/admin/nextUsers?page=${nextPage}&menorcaType=${this.filter}`)
        .then((res) => {

          const { users, count } = res.data;
          
          this.page = nextPage;
          this.total_pages = Math.ceil(count / 20);
          this.users = users;
          this.isProcessing = false;
        })
        .catch((err) => {
          console.log(err);
        });
      },
      openUser(index) {
        return (window.location = `/admin/usuario/${index}`);
      },
    },
    watch: {
        filter () {
          this.getOtherUsers();
      }
    }
  });
}

const admin_all_news = document.getElementById("admin-all-news");

if (admin_all_news) {
  new Vue({
    el: "#admin-all-news",
    data() {
      return {
        posts: [],
        total_pages: 1,
        page: 0,
        titleFilter: "",
        subtitleFilter: "",
        startDayFilter: "",
        endDayFilter: "",
        filter: "",
        isProcessing: true,
      };
    },
    created() {
      axios
        .get(`${window.origin}/admin/nextNews`)
        .then((res) => {
          const { posts, total } = res.data;

          posts.map((post) => {
            post.createdAt = moment(post.createdAt)
              .add(5, "hours")
              .format("DD/MM/YYYY");
          });

          this.page += 1;
          this.total_pages = Math.ceil(total / 10);
          this.posts = posts;
          this.isProcessing = false;
        })
        .catch((err) => {
          console.log(err);
        });
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
      });
      const vue = this;
      $("#reportrange").on("apply.daterangepicker", function (ev, picker) {
        $(this).val(
          picker.startDate.format("DD/MM/YYYY") +
            " - " +
            picker.endDate.format("DD/MM/YYYY")
        );
        vue.getAdminOtherNews(
          "",
          "date",
          "false",
          picker.startDate.format("YYYY-MM-DD"),
          picker.endDate.format("YYYY-MM-DD")
        );
      });

      $("#reportrange").on("cancel.daterangepicker", function (ev, picker) {
        $(this).val("");
        vue.getAdminOtherNews("", "date", "false");
      });
    },
    methods: {
      getAdminOtherNews(event, type, isNext, startDay, endDay) {
        if (this.isProcessing) return;
        this.isProcessing = true;
        this.posts = [];
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
          type === "title" &&
          this.titleFilter !== `status=${filterValue}&`
        ) {
          this.titleFilter =
            filterValue !== "nofilter" ? `title=${filterValue}&` : "";
          nextPage = 0;
        }

        if (
          type === "subTitle" &&
          this.subtitleFilter !== `status=${filterValue}&`
        ) {
          this.subtitleFilter =
            filterValue !== "nofilter" ? `subTitle=${filterValue}&` : "";
          nextPage = 0;
        }
        this.filter = this.titleFilter
          .concat(this.subtitleFilter);
        axios
          .get(`${window.origin}/admin/nextNews?${
            this.filter
            }page=${nextPage}&startDate=${startDay || ""}&endDate=${
              endDay || ""
            }`
          )
          .then((res) => {
            let { posts, total } = res.data;
            posts.map((post) => {
              post.createdAt = moment(post.createdAt)
                .add(5, "hours")
                .format("DD/MM/YYYY");
            });
            if (nextPage === 0) {
              this.page = 1;
            } else {
              this.page = nextPage;
            }
            this.total_pages = Math.ceil(total / 10);
            this.posts = posts;
            this.isProcessing = false;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  });
}
const all_news = document.getElementById("all-news");

if (all_news) {
  new Vue({
    el: "#all-news",
    data() {
      return {
        posts: [],
        total_pages: 1,
        page: 0,
        isProcessing: true,
      };
    },
    created() {
      axios
        .get(`${window.origin}/nextNews`)
        .then((res) => {
          const { posts, total } = res.data;

          posts.map((post) => {
            post.createdAt = moment(post.createdAt)
              .add(5, "hours")
              .format("DD/MM/YYYY");
          });

          this.page += 1;
          this.total_pages = Math.ceil(total / 10);
          this.posts = posts;
          this.isProcessing = false;
        })
        .catch((err) => {
          console.log(err);
        });
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
      });
      const vue = this;
      $("#reportrange").on("apply.daterangepicker", function (ev, picker) {
        $(this).val(
          picker.startDate.format("DD/MM/YYYY") +
            " - " +
            picker.endDate.format("DD/MM/YYYY")
        );
        vue.getAdminOtherNews(
          "",
          "date",
          "false",
          picker.startDate.format("YYYY-MM-DD"),
          picker.endDate.format("YYYY-MM-DD")
        );
      });

      $("#reportrange").on("cancel.daterangepicker", function (ev, picker) {
        $(this).val("");
        vue.getOtherNews("", "date", "false");
      });
    },
    methods: {
      trunk(cad){
        if (cad.length > 57) {
          var truncated = cad.trim().substring(0, 60).split(" ").slice(0, -1).join(" ") + "…";
          return truncated
        }else{
          return cad
        }
      },
      trunk2(cad){
        if (cad.length > 90) {
          var truncated = cad.trim().substring(0, 93).split(" ").slice(0, -1).join(" ") + "…";
          return truncated
        }else{
          return cad
        }
      },
      getOtherNews(event, type, isNext, startDay, endDay) {
        if (this.isProcessing) return;
        this.isProcessing = true;
        this.posts = [];
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
          type === "title" &&
          this.titleFilter !== `status=${filterValue}&`
        ) {
          this.titleFilter =
            filterValue !== "nofilter" ? `title=${filterValue}&` : "";
          nextPage = 0;
        }
        if (
          type === "subTitle" &&
          this.subtitleFilter !== `status=${filterValue}&`
        ) {
          this.subtitleFilter =
            filterValue !== "nofilter" ? `subTitle=${filterValue}&` : "";
          nextPage = 0;
        }
        this.filter = this.titleFilter
          .concat(this.subtitleFilter);
        axios
          .get(`${window.origin}/nextNews?${
            this.filter
            }page=${nextPage}&startDate=${startDay || ""}&endDate=${
              endDay || ""
            }`
          )
          .then((res) => {
            let { posts, total } = res.data;
            posts.map((post) => {
              post.createdAt = moment(post.createdAt)
                .add(5, "hours")
                .format("DD/MM/YYYY");
            });
            if (nextPage === 0) {
              this.page = 1;
            } else {
              this.page = nextPage;
            }
            this.total_pages = Math.ceil(total / 10);
            this.posts = posts;
            this.isProcessing = false;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  });
}

const quote = document.getElementById("quoteClient");

if(quote) {
  new Vue({
    el: "#quoteClient",
    data() {
      return {
        step:0,
        totalSteps:3,
        project: [],
        totalCost: 0,
        size2: [""],
        prices:[""],
        materials:[""],
        units:[""],
        clientForm: {},
        detail: {},
        flag: true
      }
    },
    created(){
      this.project = [{
        floor: "",
        roomType : "",
        meters: "",
        size1: "",
        size2: "",
        quoteMaterials: [""],
        finalPrice:0.00
      }],
      this.clientForm ={
        constructionType: "",
        constructionDate: "",
        counseling: false,
      }

    },
    methods: {
      changedFlag: function(){
        this.totalCost = 0
        for (let index = 0; index < this.project.length; index++) {
          if(this.project[index].finalPrice!=0 && this.size2[index].includes(this.project[index].size2)){
            this.totalCost = this.totalCost + this.project[index].finalPrice
            this.flag = false
          }else{
            this.flag = true
          }
        }
      },
      nextStep: function(){
        if(this.step==0){
          if(this.clientForm.constructionType!='' && this.clientForm.constructionType!=''){
            console.log("entro1")
            this.step++;
          }else{
            alert('Debes completar estos datos para continuar')
          }
        }else if(this.step!=0 && this.step!=3 && !this.flag){
          console.log("entro2")
          this.step++;
        }else{
          this.step++;
        }
      },
      prevStep: function(){
        this.step--;
      },
      addProject(){
        this.flag = true
        this.project.push({
          floor: "",
          roomType : "",
          meters: "",
          size1: "",
          size2: "",
          quoteMaterials: [""],
          finalPrice:0
        });
        this.changedFlag()
      },
      deleteProject(index){
        if(this.project.length > 1) this.project.splice(index,1);
        this.changedFlag()
      },
      getSize2(index){
        this.getQuote(index);
        if(this.project[index].size1 == "1.5"){
          this.size2[index]= ["1.5"]
        }else if(this.project[index].size1 == "2"){
          this.size2[index]= ["1.5","2"]
        }else if(this.project[index].size1 == "3"){
          this.size2[index]= ["2","3", "4", "5"]
        }else if(this.project[index].size1 == "4" || this.project[index].size1 == "5"){
          this.size2[index]= ["3", "4", "5"]
        }else if (this.project[index].size1 == "6" || this.project[index].size1 == "7" || this.project[index].size1 == "8" || this.project[index].size1 =="9"){
          this.size2[index] = ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15","16", "17", "18", "19", "20"]
        }
      },
      getQuote(index){
        this.flag = true
        if(this.project[index].floor!="" && this.project[index].size1!="" && this.project[index].size2!="" &&  this.size2[index].includes(this.project[index].size2)){
          axios
          .get(`${window.origin}/getQuote?floor=${this.project[index].floor}&size1=${this.project[index].size1}&size2=${this.project[index].size2}`)
          .then((res) => {
            let { materials,prices,units,quoteMaterials } = res.data;
            this.project[index].quoteMaterials = quoteMaterials;
            this.prices=prices;
            this.materials=materials;
            this.units=units;
            this.project[index].finalPrice= 0;
            for (let i = 0; i < this.project[index].quoteMaterials.length; i++) {
              this.project[index].finalPrice= this.project[index].finalPrice + this.project[index].quoteMaterials[i]*this.prices[i]
            }
            this.changedFlag()
          })
          .catch((err) => {
            console.log(err);
          });
        }
        
      },
      roundUp(n){
        n=String(n);
        const dec =n.split(".")
        let deci=parseInt(dec[0])
        if(parseInt(dec[1])>1){
          deci = deci + 1;
          return deci;
        }
        return parseInt(n)
      },
      formatMoney(pay){
        pay = Math.round((pay + Number.EPSILON) * 100) / 100
        pay = pay.toFixed(2)
        const dec =pay.split(".")
        const formatter = new Intl.NumberFormat('en-US');
        const splittedPay = (formatter.format(pay)).split(".")
        return `${splittedPay[0]+"."+dec[1]}`
      },
      formatMoneyFaik(pay){
        pay = Math.ceil(pay)
        const formatter = new Intl.NumberFormat('en-US');
        pay = formatter.format(pay)
        return pay
      },
      areaPrice(project){
        let a1= parseInt(project.size1);
        let a2 = parseInt(project.size2)
        let price = project.finalPrice/(a1*a2)
        return price;
      },
      getDetail(index){
        this.detail = this.project[index];
        this.step++;
      }

    },
    watch:{
      flag() {
        this.changedFlag();
      },
    }

  })
}

const user_all_quotes = document.getElementById("user-all-quotes");

if (user_all_quotes) {
  new Vue({
    el: "#user-all-quotes",
    data() {
      return {
        quotes: [],
        months:[0,1,2,3,4,5,6,7,8,9,10,11],
        monthFilter:"",
        total_pages: 1,
        page: 0,
        statusFilter: "",
        startDayFilter: "",
        endDayFilter: "",
        filter: "",
        isProcessing: true,
      };
    },
    created() {
      axios
        .get(`${window.origin}/nextQuotes`)
        .then((res) => {
          const { quotes, total } = res.data;
          quotes.map((quote) => {
            quote.createdAt = moment(quote.createdAt)
              .add(5, "hours")
              .format("DD/MM/YYYY");
          });

          this.page += 1;
          this.total_pages = Math.ceil(total / 10);
          this.quotes = quotes;
          this.isProcessing = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    mounted() {
      const cb = (start, end) => {
        const el = document.getElementById("reportrange");
        this.getOtherQuotes(
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
        vue.getOtherQuotes(
          "",
          "date",
          "false",
          picker.startDate.format("YYYY-MM-DD"),
          picker.endDate.format("YYYY-MM-DD")
        );
      });

      $("#reportrange").on("cancel.daterangepicker", function (ev, picker) {
        $(this).val("");
        vue.getOtherQuotes("", "date", "false");
      });
    },
    methods: {
      formatMoney(pay){
        pay = Math.ceil(pay)
        const formatter = new Intl.NumberFormat('en-US');
        pay = formatter.format(pay)
        return pay
      },
      momentMonth(month){
        const monthNames= [
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
        ]
        return monthNames[month]
      },
      getOtherQuotes(event, type, isNext, startDay, endDay) {
        if (this.isProcessing) return;

        this.isProcessing = true;
        this.quotes = [];
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
          type === "month" &&
          this.monthFilter !== `month=${filterValue}&`
        ) {
          this.monthFilter =
            filterValue !== "nofilter" ? `month=${filterValue}&` : "";
          nextPage = 0;
        }


        this.filter = this.statusFilter
          .concat(this.monthFilter);
        axios
          .get(
            `${window.origin}/nextQuotes?${
              this.filter
            }page=${nextPage}&startDate=${startDay || ""}&endDate=${
              endDay || ""
            }`
          )
          .then((res) => {
            let { quotes, total } = res.data;

            quotes.map((quote) => {
              quote.createdAt = moment(quote.createdAt)
                .add(5, "hours")
                .format("DD/MM/YYYY");
            });

            if (nextPage === 0) {
              this.page = 1;
            } else {
              this.page = nextPage;
            }
            this.total_pages = Math.ceil(total / 10);
            this.quotes = quotes;
            this.isProcessing = false;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      openQuote(index) {
        return (window.location = `/cotizacion/${index}`);
      },
      clearFilters() {
        this.monthFilter = "";
        this.statusFilter = "";
        this.startDayFilter = "";
        this.endDayFilter = "";
        this.filter = "";
        
        document.getElementById('monthInput').value = 'nofilter';
        document.getElementById('noFilterMonth').selected = 'selected';
        document.getElementById('statusInput').value = 'nofilter';
        document.getElementById('noFilterStatus').selected = 'selected';
        document.getElementById('reportrange').value = '';
        this.getOtherQuotes(null, 'noType', 'false');
      }
    },
  });
}

const admin_all_quotes = document.getElementById("admin-all-quotes");

if (admin_all_quotes) {
  new Vue({
    el: "#admin-all-quotes",
    data() {
      return {
        quotes: [],
        months:[0,1,2,3,4,5,6,7,8,9,10,11],
        total_pages: 1,
        page: 0,
        statusFilter: "",
        startProjectFilter: "",
        monthFilter:"",
        startDayFilter: "",
        endDayFilter: "",
        filter: "",
        amount:"",
        isProcessing: true,
      };
    },
    created() {
      axios
        .get(`${window.origin}/admin/nextQuotes`)
        .then((res) => {
          const { quotes, total, amount } = res.data;

          quotes.map((quote) => {
            quote.createdAt = moment(quote.createdAt)
              .add(5, "hours")
              .format("DD/MM/YYYY");
          });
          this.amount = this.formatMoney(amount)
          this.page += 1;
          this.total_pages = Math.ceil(total / 10);
          this.quotes = quotes;
          this.isProcessing = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    mounted() {
      const cb = (start, end) => {
        const el = document.getElementById("reportrange");
        this.getOtherQuotes(
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
        vue.getOtherQuotes(
          "",
          "date",
          "false",
          picker.startDate.format("YYYY-MM-DD"),
          picker.endDate.format("YYYY-MM-DD")
        );
      });

      $("#reportrange").on("cancel.daterangepicker", function (ev, picker) {
        $(this).val("");
        vue.getOtherQuotes("", "date", "false");
      });
    },
    methods: {
      formatMoney(pay){
        pay = Math.ceil(pay)
        const formatter = new Intl.NumberFormat('en-US');
        pay = formatter.format(pay)
        return pay
      },
      momentMonth(month){
        const monthNames= [
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
        ]
        return monthNames[month]
      },
      getOtherQuotes(event, type, isNext, startDay, endDay) {
        if (this.isProcessing) return;

        this.isProcessing = true;
        this.quotes = [];
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
          type === "startProject" &&
          this.startProjectFilter !== `startProject=${filterValue}&`
        ) {
          this.startProjectFilter =
            filterValue !== "nofilter" ? `startProject=${filterValue}&` : "";
          nextPage = 0;
        }
        if (
          type === "month" &&
          this.monthFilter !== `month=${filterValue}&`
        ) {
          this.monthFilter =
            filterValue !== "nofilter" ? `month=${filterValue}&` : "";
          nextPage = 0;
        }


        this.filter = this.statusFilter
          .concat(this.startProjectFilter)
          .concat(this.monthFilter);
        axios
          .get(
            `${window.origin}/admin/nextQuotes?${
              this.filter
            }page=${nextPage}&startDate=${startDay || ""}&endDate=${
              endDay || ""
            }`
          )
          .then((res) => {
            let { quotes, total, amount } = res.data;
            console.log(res.data.total)
            quotes.map((quote) => {
              quote.createdAt = moment(quote.createdAt)
                .add(5, "hours")
                .format("DD/MM/YYYY");
            });

            if (nextPage === 0) {
              this.page = 1;
            } else {
              this.page = nextPage;
            }
            this.amount = this.formatMoney(amount)
            this.total_pages = Math.ceil(total / 10);
            this.quotes = quotes;
            this.isProcessing = false;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      openQuote(index) {
        return (window.location = `/admin/cotizacion/${index}`);
      },
      clearFilters() {
        this.monthFilter = "";
        this.statusFilter = "";
        this.startProjectFilter = "";
        this.startDayFilter = "";
        this.endDayFilter = "";
        this.filter = "";

        document.getElementById('monthInput').value = 'nofilter';
        document.getElementById('noFilterMonth').selected = 'selected';
        document.getElementById('startProjectInput').value = 'nofilter';
        document.getElementById('noFilterstartProject').selected = 'selected';
        document.getElementById('statusInput').value = 'nofilter';
        document.getElementById('noFilterStatus').selected = 'selected';
        document.getElementById('reportrange').value = '';
        this.getOtherQuotes(null, 'noType', 'false');
      },
      formatMoney(pay){
        pay = Math.round((pay + Number.EPSILON) * 100) / 100
        pay = pay.toFixed(2)
        const dec =pay.split(".")
        const formatter = new Intl.NumberFormat('en-US');
        const splittedPay = (formatter.format(pay)).split(".")
        return `${splittedPay[0]+"."+dec[1]}`
      }
    },
  });
}

const admin_frequent_questions = document.getElementById("admin-frequent-questions");

if (admin_frequent_questions) {
  new Vue({
    el: '#admin-frequent-questions',
    data() {
      return {
        frequentQuestions: [],
        questionsCategories: [],
        pagination: {
          limit: 20,
          page: 0,
          pages: 1,
          total: 0,
        },
        selectedQuestion: null,
        search: {
          questionTitle: '',
          questionCategory: ''
        },
        pagesList: [],
        orderList: [],
        isProcessing: false,
      };
    },
    created() {
      this.getFrequentQuestions(this.pagination.page + 1)
      this.isProcessing = true;
      axios.get(`${window.origin}/admin/preguntas-frecuentes/categorias/obtener`)
        .then((res) => {
          const { questionsCategories } = res.data;
          this.questionsCategories = questionsCategories;
          this.isProcessing = false;
        })
        .catch((error) => {
          this.isProcessing = false;
          console.log(error);
        });
    },
    computed: {
      questionTitle() { return this.search.questionTitle },
      questionCategory() { return this.search.questionCategory },
      showActualQuestionOrder() {
        return  this.selectedQuestion ? `orden actual: ${this.selectedQuestion.order + 1}` : 'Elegir orden';
      }
    },
    watch: {
      questionTitle() {
        this.getFrequentQuestions(this.pagination.page);
      },
      questionCategory() {
        this.getFrequentQuestions(this.pagination.page);
      }
    },
    methods: {
      getFrequentQuestions(page) {
        if (this.isProcessing) return;
        this.isProcessing = true;
        axios.get(`${window.origin}/admin/preguntas-frecuentes/obtener?page=${page}&title=${this.questionTitle}&category=${this.questionCategory}`)
        .then((res) => {
          const { frequentQuestions, pagination } = res.data;
          this.frequentQuestions = frequentQuestions;
          this.pagination = pagination;
          this.pagesList = this.arrayRange(this.pagination.pages + 1, 1);
          this.orderList = this.arrayRange(this.pagination.total)
          this.isProcessing = false;
        })
        .catch((error) => {
          this.isProcessing = false;
          console.log(error);
        });
      },
      deleteFrequentQuestion(questionId) {
        axios.delete(`${window.origin}/admin/preguntas-frecuentes/${questionId}/eliminar`)
          .then((res) => {
            let requestPage = 1
            if (this.frequentQuestions.length == 1 && this.pagination.page > 1) requestPage = this.pagination.page - 1;
            this.getFrequentQuestions(requestPage)
          })
          .catch((error) => {
            this.isProcessing = false;
            console.log(error);
          })
      },
      arrayRange(stop, start = 0) {
        return [...Array(stop ).keys()].slice(start);
      },
      isActualPage(pageListItem) {
        return this.pagination.page == pageListItem
      },
      setSelectedQuestion(selectedQuestion) {
        this.selectedQuestion = selectedQuestion;
        $('#FrequentQuestion').modal('show')
      },
      changeQuestionOrder(newOrder) {
        this.isProcessing = true;
        axios.post(
          `${window.origin}/admin/preguntas-frecuentes/${this.selectedQuestion._id}/editar-orden`,
          { order: newOrder }
        ).then((res) => {
          this.selectedQuestion = res.data.frequentQuestion;
          this.isProcessing = false;
          this.getFrequentQuestions(this.pagination.page)
        }).catch((error) => {
          this.isProcessing = false;
          console.log(error);
        })
      }
    }
  });
}

const frequent_questions = document.getElementById("frequent-questions");

if (frequent_questions) {
  new Vue({
    el: '#frequent-questions',
    data() {
      return {
        frequentQuestions: [],
        questionsCategories: [],
        pagination: {
          limit: 20,
          page: 0,
          pages: 1,
          total: 0,
        },
        selectedQuestion: null,
        search: {
          questionTitle: '',
          questionCategory: ''
        },
        pagesList: [],
        isProcessing: false,
      };
    },
    created() {
      this.getFrequentQuestions(this.pagination.page + 1)
      this.isProcessing = true;
      axios.get(`${window.origin}/preguntas-frecuentes/categorias/obtener`)
        .then((res) => {
          const { questionsCategories } = res.data;
          this.questionsCategories = questionsCategories;
          this.isProcessing = false;
        })
        .catch((error) => {
          this.isProcessing = false;
          console.log(error);
        });
    },
    computed: {
      questionTitle() { return this.search.questionTitle },
      questionCategory() { return this.search.questionCategory },
    },
    watch: {
      questionTitle() {
        this.getFrequentQuestions(this.pagination.page);
      },
      questionCategory() {
        this.getFrequentQuestions(this.pagination.page);
      }
    },
    methods: {
      getFrequentQuestions(page) {
        if (this.isProcessing) return;
        this.isProcessing = true;
        axios.get(`${window.origin}/preguntas-frecuentes/obtener?page=${page}&title=${this.questionTitle}&category=${this.questionCategory}`)
        .then((res) => {
          const { frequentQuestions, pagination } = res.data;
          this.frequentQuestions = frequentQuestions;
          this.pagination = pagination;
          this.pagesList = this.arrayRange(this.pagination.pages + 1, 1);
          this.isProcessing = false;
        })
        .catch((error) => {
          this.isProcessing = false;
          console.log(error);
        });
      },
      arrayRange(stop, start = 0) {
        return [...Array(stop ).keys()].slice(start);
      },
      isActualPage(pageListItem) {
        return this.pagination.page == pageListItem
      },
    }
  });
}
