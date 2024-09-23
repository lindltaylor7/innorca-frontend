const budgetPayments = document.getElementById('budget-payments')

if (budgetPayments) {
  new Vue({
    el: '#budget-payments',
    data() {
      return {
        apiUrl: `${location.origin}/api`,
        currentUrl: location.href,
        query: {
          projectId: '',
          budgetCode: '',
          contractNum: '',
        },
        project: {},
        payments: [],
        banks: [],
        saldoToSend: 0,
        saldo: 0,
        amount: 0,
        projectTotal: 0,
        lastThreePendings: [],
        showInfo: false,
        table: {
          show: false,
          filteredPayments: [],
          payments: [],
          paymentStatus: '',
          pagination: {
            page: 0,
            pages: 1,
            total: 0,
          },
          pagesList: [],
        },
        hasError: false,
        processing: false,
        continue: false,

        // PAGO EFECTIVO
        modal: {
          processstatus: '',
          errorMessage: null,
          payments: [],
          // MODAL PHASE 1
          phase1: false,
          processingPhase1: false,
          // MODAL PHASE 2
          phase2: false,
          processingPhase2: false,
          exchangeRate: null,
          exchangeRateToShow: 1,
          quantity: 1,
          saldo: 0,
          cipCurrency: null,
          // MODAL PHASE 3
          phase3: false,
          searchingCip: false,
          processingCip: false,
          cip: null,
        },
        hasExpiredPayments: false,
      }
    },
    created() {
      this.query.projectId = this.getQueryParam('projectId')
      this.query.budgetCode = this.getQueryParam('budgetCode')
      this.query.contractNum = this.getQueryParam('contractNum')

      this.getProject()
    },
    computed: {
      budgetCode() { return this.query.budgetCode },
      projectId() { return this.query.projectId },
      paymentStatus() {
        return this.table.paymentStatus
      },
      isLotes() {
        if (this.project.projectType && this.project.projectType.toLowerCase() == 'lotes') return true
        return false
      },
      cipCurrency() { return this.modal.cipCurrency }
    },
    watch: {
      paymentStatus() {
        this.filterTablePayments()
      },
      cipCurrency(newCipCurrency) {
        if (this.isLotes && newCipCurrency == 'PEN') {
          this.modal.exchangeRateToShow = this.modal.exchangeRate.value
        } else {
          this.modal.exchangeRateToShow = 1
        }
      }
    },
    methods: {
      getQueryParam(param) {
        const query = this.currentUrl.split('?')[1]
        const params = query.split("&")
        for (let i = 0; i < params.length; i++) {
          const pair = params[i].split("=")
          if(pair[0] == param) { return pair[1] }
        }
        return
      },
      enableTable () {
        this.table.show = true
      },
      getProject() {
        if (this.processing && !this.continue) return

        this.processing = true
        axios.get(`${this.apiUrl}/projects/${this.projectId}`)
          .then((res) => {
            const { project } = res.data

            this.project = project

            if (this.isLotes) {
              this.setModalCipCurrency('USD')
            } else {
              this.setModalCipCurrency('PEN')
            }

            this.continue = true
            this.getBanks()
          })
          .catch((error) => {
            this.processing = false
            this.continue = false
            this.hasError = true
            console.log(error.message)
          })
      },
      getBanks() {
        if (this.processing && !this.continue) return

        this.processing = true
        axios.get(`${this.apiUrl}/banks`)
          .then((res) => {
            const { banks } = res.data

            this.banks = banks

            this.continue = true
            this.getPayments()
          })
          .catch((error) => {
            this.processing = false
            this.continue = false
            this.hasError = true
            console.log(error.message)
          })
      },
      getPayments() {
        if (this.processing && !this.continue) return

        this.processing = true
        this.payments = []

        axios.get(`${this.apiUrl}/payments?projectType=${this.project.projectType}&budgetCode=${this.budgetCode}`)
          .then((res) => {
            const { payments, projectTotal, totalAmount, totalSaldo } = res.data
            this.payments = payments
            this.table.filteredPayments = payments
            this.saldo = totalSaldo
            this.amount = totalAmount
            this.projectTotal = projectTotal

            this.verifyHasExpiredPayments()
            this.computeModalPayments()
            this.setLastThreePendings()
            this.continue = true
            this.filterTablePayments()
            this.showInfo = true
            this.processing = false
          })
          .catch((error) => {
            this.processing = false
            this.continue = false
            this.hasError = true
            console.log(error)
            if (error.message) console.log(error.message)
          })
      },
      // PAGO EFECTIVO - WHETHER OR NOT IT SHOW CIP CURRENCY SELECTOR
      verifyHasExpiredPayments() {
        for (const payment of this.payments) {
          if (payment.status == 'expired') {
            this.hasExpiredPayments = true
            break
          }
        }
      },
      computeModalPayments() {
        for (const payment of this.payments) {
          if (payment.status == 'pending') {
            if (payment.status == 'completed') console.log('wtf!!!')
            this.modal.payments.push(payment)
          }
        }
      },
      setLastThreePendings() {
        let counter = 0
        for (const payment of this.payments) {
          if (counter == 3) break

          if (payment.status == 'pending' || payment.status == 'expired') {
            this.lastThreePendings.push(payment)
            counter++
          }
        }
      },
      filterTablePayments() {
        if (this.processing && !this.continue) return

        this.processing = true

        let tempFilteredPayments = []
        for (const payment of this.payments) {
          if (this.table.paymentStatus == '') {
            tempFilteredPayments.push(payment)
          } else {
            if ( payment.status == this.table.paymentStatus) {
              tempFilteredPayments.push(payment)
            }
          }
        }

        this.table.filteredPayments = tempFilteredPayments

        this.continue = true
        this.paginateTablePayments()
      },
      paginateTablePayments(page = 1) {
        if (this.processing && !this.continue) return

        let tempTablePayments = []
        for (let index = 0; index < this.table.filteredPayments.length; index++) {
          const payment = this.table.filteredPayments[index];
          if ( index >= 20 * (page - 1) && index < 20 * page  ) {
            tempTablePayments.push(payment)
          }
        }

        this.table.payments = tempTablePayments

        const tempPagination = {
          page: page,
          pages: Math.ceil(this.table.filteredPayments.length / 20),
          total: this.table.filteredPayments.length,
        }

        this.table.pagination = tempPagination

        this.table.pagesList = this.arrayRange(this.table.pagination.pages + 1, 1)
        this.continue = false
        this.processing = false
      },
      getBankName(bankId) {
        if (!bankId) return '-'

        const bank = this.banks.find((bank) => bank.id == bankId )
        if (!bank) return '-'

        return bank.name
      },
      getBankLink(bankId) {
        if (!bankId) return 'javascript:void(0)'

        const bank = this.banks.find((bank) => bank.id == bankId )
        if (!bank) return 'javascript:void(0)'

        return bank.mapLink
      },
      getBankManual(bankId) {
        if (!bankId) return 'javascript:void(0)'

        const bank = this.banks.find((bank) => bank.id == bankId )
        if (!bank) return 'javascript:void(0)'

        return bank.manualLink
      },
      arrayRange(stop, start = 0) {
        return [...Array(stop).keys()].slice(start)
      },
      formatDate(date) {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
      },
      isActualPage(pageListItem) {
        return this.table.pagination.page == pageListItem
      },
      // MODAL
      getExhangeRate() {
        if (this.modal.processingPhase1) return

        this.modal.processstatus = 'Obteniendo tipo de cambio'
        axios.get(`${this.apiUrl}/exchangeRates/actual`)
          .then((res) => {
            const { exchangeRate } = res.data

            this.modal.exchangeRate = exchangeRate
            this.modal.processstatus = 'Seleccionar cantidad de letras y moneda'
            this.modal.phase1 = false
            this.modal.phase2 = true
          })
          .catch((error) => {
            if (error.response.status == 404) {
              this.modal.processstatus = 'No hay tipo de cambio fijado, consulte con su administrador'
            } else {
              this.modal.searchingCip = false
              this.hasError = true
              console.log(error.message)
            }
          })
      },
      showModal() {
        $('#CipModal').modal('show')
        this.getCip()
      },
      getCip() {
        if (this.modal.processingCip) return

        this.modal.processstatus = 'Verificando CIP existente'

        this.modal.processingCip = true
        axios.get(`${this.apiUrl}/cips/${this.query.budgetCode}`)
          .then((res) => {
            const { cip } = res.data
            this.modal.cip = cip
            this.modal.processstatus = 'Datos de CIP'

            this.modal.processingCip = false

            if (!cip) {
              this.modal.phase1 = true
              if (!this.modal.exchangeRate) {
                if (this.isLotes) {
                  this.getExhangeRate()
                } else {
                  this.modal.processstatus = 'Seleccionar cantidad de letras y moneda'
                  this.modal.exchangeRate = 1
                  this.modal.phase1 = false
                  this.modal.phase2 = true
                }
              } else {
                this.modal.phase1 = false
                this.modal.processstatus = 'Seleccionar cantidad de letras y moneda'
                this.modal.phase2 = true
              }
            }
          })
          .catch((error) => {
            this.modal.processingCip = false
            this.hasError = true
            if(error.response) {
              console.dir(error.response)
            }
          })
      },
      computeCipInfo() {
        let saldo = 0
        for (let index = 0; index < this.modal.payments.length; index++) {
          const payment = this.modal.payments[index];
          if (index < this.modal.quantity) {
            saldo = this.sumNumbers(saldo, payment.saldo)
          } else {
            break
          }
        }

        this.modal.saldoToSend = saldo
        this.modal.saldo = this.timesAndRoundUp(saldo, this.modal.exchangeRateToShow)
      },
      toPhase3() {
        this.modal.processstatus = 'Vista Previa CIP'
        this.computeCipInfo()
        this.modal.phase2 = false
        this.modal.phase3 = true
      },
      backToPhase2() {
        this.modal.saldo = 0
        this.modal.phase3 = false
        this.modal.processstatus = 'Seleccionar cantidad de letras y moneda'
        this.modal.phase2 = true
      },
      hideModal() {
        $('#CipModal').modal('hide')
        var self = this
        setTimeout(() => {
          self.modal.cip = null
          self.modal.phase1 = false
          self.modal.phase2 = false
          self.modal.phase3 = false

          self.modal.quantity = 1
          self.modal.saldo = 0
        }, 175)
      },
      setModalCipCurrency(currency) {
        this.modal.cipCurrency = currency
      },
      setModalQuantity(quantity) {
        this.modal.quantity = quantity
      },
      showBenefitBtn(){
        if (this.isLotes) {
          if (this.modal.currency == 'USD') {
            if (this.modal.saldo > 5000) {
              return true
            }
          } else {
            if (this.modal.saldo > this.timesAndRoundUp(5000, this.modal.exchangeRateToShow)) {
              return true
            }
          }
        } else {
          if (this.modal.saldo > this.timesAndRoundUp(5000, this.modal.exchangeRateToShow)) {
            return true
          }
        }

        return false
      },
      // PAGO EFECTIVO - GENERATE CIPS
      generateCIP() {
        if (this.modal.processingCip) return

        this.modal.processingCip = true
        this.modal.processstatus = 'Solicitando CIP'

        const postData = {
          budgetCode: this.query.budgetCode,
          paymentId: this.modal.payments[0].id,
          currency: this.modal.cipCurrency,
          paymentType: this.isLotes ? 'Quota' : 'Payment',
          quantity: this.modal.quantity,
          saldo: this.modal.saldoToSend,
          mora: 0
        }

        axios.post(`${this.apiUrl}/cips`, postData)
          .then((res) => {
            const { cip } = res.data
            this.modal.processstatus = 'Datos de CIP'
            this.modal.phase1 = false
            this.modal.phase2 = false
            this.modal.phase3 = false

            this.modal.cip = cip
            this.modal.processingCip = false
            this.hasError = false
          })
          .catch((error) => {
            this.modal.processingCip = false
            this.hasError = true
            if(error.response) {
              console.dir(error.response)
            }
          })
      },
      buildWspMsg() {
        const msg = {text:`Quiero hacer un pago de ${this.modal.saldo} en ${this.modal.cipCurrency}, ¿Podrías ayudarme?`}
        let data = encodeURI(msg.text)

        return 'https://web.whatsapp.com/send?phone=+51942044085&text='+ data
      },
      formatDate(date) {
        if (!date) return '-'
        const d = new Date(date)
        const day = d.getDate().toString().length == 1 ? `0${d.getDate()}` : `${d.getDate()}`
        const month = (d.getMonth() + 1 ).toString().length == 1 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`
        return `${day}/${month}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
      },
      //
      sumNumbers(x, y) {
        return (new Big(x)).plus(new Big(y)).toNumber()
      },
      timesAndRoundUp(x, y) {
        const value = (new Big(x)).times(new Big(y))
        return value.round(2, 1).toNumber()
      }
    },
  })
}
