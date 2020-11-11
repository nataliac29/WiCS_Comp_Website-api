const casual = require('casual')


casual.define('events', () => ({
  id: casual.uuid,
  eventname: casual.title,
  type: casual.random_element(['SmallSocial',
    'LargeSocial', 'Sponsorship', 'Educational']),
  datetime: casual.moment,
  des: casual.description,
  createdAt: casual.moment,
}))

const eventsData = []

for (let i = 0; i < 20; ++i) {
  eventsData.push(casual.events)
}

module.exports = eventsData
