const { createTableIfNotExists } = require('../helpers')

exports.up = async knex => createTableIfNotExists(knex, 'events', table => {
    table
        .uuid('id')
        .notNullable()
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'))

    table
        .string('eventname').notNullable()

    table
        .string('type').notNullable()

    table
        .datetime('datetime').notNullable()
    
    table
        .text('des').notNullable()    

    table.timestamp('createdAt').defaultTo(knex.fn.now())

})
exports.down = async knex => knex.schema.dropTableIfExists('events')