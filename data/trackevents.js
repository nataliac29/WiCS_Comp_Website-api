const casual = require('casual')
const userData = require('./user')
const eventsData = require('./events')


casual.define('trackevents', ({ userId, eventId }) => ({
    id: casual.uuid,
    userId,
    eventId,
    photo: casual.url,
    des: casual.description,
    addedAt: casual.moment,
}))

const trackeventsData = []

for (let i = 0; i < 20; ++i) {
    const user = casual.random_element(userData)
    const events = casual.random_element(eventsData)
    userId = user.id;
    eventId = events.id
    trackeventsData.push(casual.trackevents({ userId, eventId }))

}

module.exports = trackeventsData