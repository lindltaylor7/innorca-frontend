/**
 * Abstract Class SperantService.
 *
 * @class SperantService
 */
class SperantService {
  constructor() {
    if (this.constructor == SperantService) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }
  }

  checkExistingClient() {
    throw new Error('Method \'checkExistingClient\' must be implemented.');
  }

  getClientById() {
    throw new Error('Method \'getClientById\' must be implemented.');
  }

  getClientByDocument() {
    throw new Error('Method \'getClientByDocument\' must be implemented.');
  }

  getAllProjects() {
    throw new Error('Method \'getAllProjects\' must be implemented.');
  }

  getProjectById() {
    throw new Error('Method \'getProjectById\' must be implemented.');
  }

  getClientProjects() {
    throw new Error('Method \'getClientProjects\' must be implemented.');
  }

  getBudgetById() {
    throw new Error('Method \'getBudgetById\' must be implemented.');
  }

  getBudgetByCode() {
    throw new Error('Method \'getBudgetByCode\' must be implemented.');
  }

  getClientActiveBudgets() {
    throw new Error('Method \'getClientActiveBudgets\' must be implemented.');
  }

  getBank() {
    throw new Error('Method \'getBank\' must be implemented.');
  }

  getBanks() {
    throw new Error('Method \'getBanks\' must be implemented.');
  }

  getBudgetPayments() {
    throw new Error('Method \'getBudgetPayments\' must be implemented.');
  }

  getTitulars() {
    throw new Error('Method \'getTitulars\' must be implemented.');
  }

  getUnits() {
    throw new Error('Method \'getUnits\' must be implemented.');
  }

  getValidBudgets() {
    throw new Error('Method \'getValidBudgets\' must be implemented.');
  }

  postReferredClient() {
    throw new Error('Method \'postReferredClient\' must be implemented.');
  }

  postCreateCIP() {
    throw new Error('Method \'postCreateCIP\' must be implemented.');
  }

  postCreateAttention() {
    throw new Error('Method \'postCreateAttention\' must be implemented.');
  }

  getTitular() {
    throw new Error('Method \'getTitular\' must be implemented.');
  }
}

module.exports = SperantService;
