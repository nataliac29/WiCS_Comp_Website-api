const eventsData = require('../../../data/events')


exports.seed = knex => knex('events').del()
  .then(() => knex('events').insert(eventsData))
