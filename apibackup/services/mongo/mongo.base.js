/**
 * Abstract Class SperantService.
 *
 * @class SperantService
 */
class SperantService {
  constructor() {
    if (this.constructor == SperantService) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  analytics() { throw new Error('Method \'checkExistingClient\' must be implemented.'); }

}

module.exports = SperantService;
