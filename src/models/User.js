const { BelongsToOneRelation } = require('objection')
const BaseModel = require('./BaseModel')

class User extends BaseModel {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    const TrackEvents = require('./TrackEvents')
    return {
      trackevents: {
        relation: BelongsToOneRelation,
        modelClass: TrackEvents,
        join: {
          from: 'users.id',
          to: 'trackevents.userId',
        },
      },
    }
  }
}

module.exports = User
