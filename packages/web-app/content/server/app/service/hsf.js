
module.exports = app => {

  return class HSFService extends app.Service {

    async invoke() {
      return 'hsf'
    }
  }
}
