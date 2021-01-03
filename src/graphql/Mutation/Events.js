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

const changeTrackEventStatus = async (_obj, { input }) => {
  const {
    eventId, status,
  } = input
  const updateObj = { approved: status }

  const updatedTrackEvent = await TrackEvents.query()
    .findById(eventId)
    .patch(updateObj).returning('*')
  return updatedTrackEvent
}

const resolver = {
  Mutation: {
    addTrackEvents,
    changeTrackEventStatus,
  },
}

module.exports = resolver
