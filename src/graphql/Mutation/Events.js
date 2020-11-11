// const { UserInputError } = require('apollo-server-express')
// const Events = require('../../models/Events')
const TrackEvents = require('../../models/TrackEvents')

const addTrackEvents = async (obj, { input }, { user }) => {
  const {
    eventId, photo, des, addedAt,
  } = input

  const newTrackEvent = await TrackEvents.query().insertAndFetch({
    eventId,
    userId: user.id,
    photo,
    des,
    addedAt,
  })
  return newTrackEvent
}

const resolver = {
  Mutation: {
    addTrackEvents,
  },
}

module.exports = resolver
