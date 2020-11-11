const { BelongToOneRelation } = require('objection')
const BaseModel = require('./BaseModel')

class Events extends BaseModel {
  static get tableName() {
    return 'events'
  }

  static get relationMappings() {
    const TrackEvents = require('./TrackEvents')
    return {
      trackevents: {
        relation: BelongToOneRelation,
        modelClass: TrackEvents,
        join: {
          from: 'events.id',
          to: 'trackevents.eventId',
        },
      },
    }
  }
}

module.exports = Events
