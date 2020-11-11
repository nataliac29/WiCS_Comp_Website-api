const { merge } = require('lodash')
const User = require('./User')
const Events = require('./Events')

const resolvers = [User, Events]

module.exports = merge(...resolvers)
