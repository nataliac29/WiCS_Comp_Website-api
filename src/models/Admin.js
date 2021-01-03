const BaseModel = require('./BaseModel')

class Admin extends BaseModel {
  static get tableName() {
    return 'admin'
  }
}

module.exports = Admin
