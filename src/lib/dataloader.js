const DataLoader = require('dataloader')
const TrackEvents = require('../models/TrackEvents')

// Given a list of user ids, return an array of objects where each object at an
// index in the array is associated to the the userId at the same index in the ids argument.

// If a subresolver returns an array instead of a single object, the batch function must return
// an array of arrays where where each array is a list of object. To make that change to the
// batch function, simply replace find in the .then call to filter.

const batchEvents = async ids => {
  const users = await TrackEvents.query()
    .whereIn('id', ids).select()
    .then(rows => ids.map(id => rows.find(x => x.id === id)))

  return users
}

const generateLoaders = () => ({
  eventLoader: new DataLoader(batchEvents),
})

module.exports = { generateLoaders }
