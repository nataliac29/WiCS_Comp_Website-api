const adminData = require('../../../data/admin')


exports.seed = knex => knex('admin').del()
  .then(() => knex('admin').insert(adminData))
