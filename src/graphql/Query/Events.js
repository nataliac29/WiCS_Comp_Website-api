/* eslint-disable max-len */
// const User = require('../../models/User')
const { add } = require('date-fns')
const Events = require('../../models/Events')
const TrackEvents = require('../../models/TrackEvents')

const event = async ({ eventId: c }, _params, { loaders: { eventLoader } }) => eventLoader.load(c)

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
const allTrackEvents = async () => {
  const trackEvents = await TrackEvents.query()
  return trackEvents
}
// const subevents = async ({ eventId }) => {
//   const event = Events.query().findOne('id', eventId)
//   return event
// }
const getEventsByDate = async (obj, { timeFrame, startDate }) => {
  // console.log(`start date: ${startDate}`)
  // console.log(`Time frame: ${timeFrame}`)
  try {
    if (timeFrame) {
      const inputAsDate = new Date(startDate)
      const date = `${inputAsDate.getFullYear()}-${inputAsDate.getMonth() + 1}-${inputAsDate.getDate()}`

      const dateAsDate = new Date(date)

      const formattedStart = dateAsDate.toISOString()

      const formattedEnd = add(dateAsDate, { days: timeFrame === 'DAILY' ? 1 : 7 }).toISOString()

      const filteredEvents = await Events.query()
        .where('datetime', '>=', formattedStart)
        .andWhere('datetime', '<=', formattedEnd)

      return filteredEvents
    }
    const allEvents = await Events.query()
    return allEvents
  } catch (err) {
    throw new Error('Could not retrieve events')
  }
}


const resolver = {
  Query: {
    userEvents,
    events,
    userTrackEvents,
    allTrackEvents,
    getEventsByDate,
  },
  TrackEvent: {
    event,
  },
}

module.exports = resolver
