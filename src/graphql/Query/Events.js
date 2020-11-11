// const User = require('../../models/User')
const Events = require('../../models/Events')
const TrackEvents = require('../../models/TrackEvents')

const userEvents = async (obj, args, { user }) => {
  try {
    const e = await TrackEvents.query().select('eventId').where('userId', (user.id))
    const data = e.map(el => el.eventId)
    const n = await Events.query().where('id', 'in', data)
    return n
  } catch (err) {
    throw new Error('Failed to fetch user')
  }
}
const events = async () => {
  try {
    const e = await Events.query()
    return e
  } catch (err) {
    throw new Error('Failed to fetch user')
  }
}

const userTrackEvents = async (obj, args, { user }) => {
  try {
    const e = await TrackEvents.query().where('userId', user.id)
    return e
  } catch (err) {
    throw new Error('Failed to fetch user')
  }
}


const resolver = {
  Query: {
    userEvents,
    events,
    userTrackEvents,
  },
}

module.exports = resolver
