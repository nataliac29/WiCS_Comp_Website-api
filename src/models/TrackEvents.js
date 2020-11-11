const { HasManyRelation } = require('objection')
const BaseModel = require('./BaseModel')


class TrackEvents extends BaseModel {
  static get tableName() {
    return 'trackevents'
  }

  static get relationMappings() {
    const User = require('./User')
    const Event = require('./Events')

    return {
      users: {
        relation: HasManyRelation,
        modelClass: User,
        join: {
          from: 'trackevents.userId',
          to: 'users.id',
        },
      },
      events: {
        relation: HasManyRelation,
        modelClass: Event,
        join: {
          from: 'trackevents.eventId',
          to: 'events.id',
        },
      },
    }
  }
}

module.exports = TrackEvents
