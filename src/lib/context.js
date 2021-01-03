const { isSameHour } = require('date-fns')
const { createToken, decodeToken } = require('./auth')
const User = require('../models/User')
const Admin = require('../models/Admin')
const { generateLoaders } = require('./dataloader')

// The method exported here sets the context for all resolvers and refreshes tokens
module.exports = async ({ req, res }) => {
  const context = { req, res, loaders: generateLoaders() }
  // If login or register, skip auth requirements
  if (req.body.operationName === 'login' || req.body.operationName === 'register') {
    return context
  }

  // Collect JWT, escape 'Bearer' prefix
  const jwt = req.headers.authorization ? req.headers.authorization.slice(7) : null

  if (!jwt) {
    // No JWT present for auth
    return context
  }
  try {
    const {
      sub, iat, iss,
    } = decodeToken(jwt)
    let user = {}
    switch (iss) {
      case 'USER':
        user = await User.query().findById(sub)
        context.user = user
        if (isSameHour(iat, new Date().getTime() / 1000)) {
          return context
        }
        // If token is more than an hour old, refresh it
        res.set('x-token', createToken({
          sub: user.id,
          iss,
        }))
        return context
      case 'ADMIN':
        user = await Admin.query().findById(sub)
        context.admin = user
        if (isSameHour(iat, new Date().getTime() / 1000)) {
          return context
        }
        // If token is more than an hour old, refresh it
        res.set('x-token', createToken({
          sub: user.id,
          iss,
        }))
        return context
      default:
        return context
    }


    // If failed context creation, make unathenticated request
  } catch (error) {
    return context
  }
}
