const vueRequestCreate = document.getElementById('vue-requests-create')

if (vueRequestCreate) {
  new Vue({
    el: '#vue-requests-create',
    data() {
      return {
        picked: null,
        budgets: [],
        filteredBudgets: [],
        projects: [],

        projectId: '',
        budgetId: '',
        contractNum: '',
      }
    },
    watch: {
      projectId() {
        this.filterBudgets()
      },
      contractNum(val) {
        if (val) {
          const matchedBudget = this.filteredBudgets.find((budget) => budget.contractNum == val)
          this.budgetId = matchedBudget.id
        }
      }
    },
    mounted() {
      const dataBudgets = document.getElementById('vue-requests-create').getAttribute('data-budgets')
      this.budgets = JSON.parse(dataBudgets)

      let projects = []
      this.budgets.map((budget) => {
        const match = projects.find(project => project.id == budget.project.id)
        if (!match) projects.push(budget.project)
      })

      this.projects = projects
    },
    methods: {
      filterBudgets() {
        const filteredBudgets = this.budgets.reduce((acc, budget) => {
          if (this.projectId && budget.project.id != this.projectId) return acc
          return [ ...acc, budget ]
        }, [])

        this.contractNum = ''
        this.budgetId = ''
        this.filteredBudgets = filteredBudgets
      }
    }
  })
}