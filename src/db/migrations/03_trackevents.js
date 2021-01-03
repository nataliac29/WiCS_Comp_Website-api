const { createTableIfNotExists } = require('../helpers')

exports.up = async knex => createTableIfNotExists(knex, 'trackevents', table => {
  table
    .uuid('id')
    .notNullable()
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))

  table
    .uuid('userId')
    .references('users.id')
    .notNullable()

  table
    .uuid('eventId')
    .references('events.id')
    .notNullable()

  table
    .string('photo')

  table
    .text('des')

  table
    .boolean('approved')
    .notNullable()
    .defaultTo(false)

  table.timestamp('addedAt').defaultTo(knex.fn.now())
})
exports.down = async knex => knex.schema.dropTableIfExists('trackevents')
