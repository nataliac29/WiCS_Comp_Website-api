const trackeventsData = require('../../../data/trackevents')

exports.seed = knex => knex('trackevents').del()
  .then(() => knex('trackevents').insert(trackeventsData))
