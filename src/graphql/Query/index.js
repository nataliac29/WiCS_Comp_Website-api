const { merge } = require('lodash')
const User = require('./User')
const Events = require('./Events')
const Admin = require('./Admin')

const resolvers = [User, Events, Admin]

module.exports = merge(...resolvers)
