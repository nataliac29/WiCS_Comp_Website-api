const { UserInputError } = require('apollo-server-express')
const User = require('../../models/User')
const {
  hashPassword, comparePassword, createToken,
} = require('../../lib/auth')


const login = async (obj, { email, password }, { res }) => {
  const user = await User.query().findOne({
    email,
  })
  if (!user) {
    throw new UserInputError('Invalid email or password')
  }

  const validPassword = await comparePassword(password, user.password)
  if (!validPassword) {
    throw new UserInputError('Invalid email or password')
  }


  // If successful login, set authentication information
  const payload = {
    sub: user.id,
  }
  const token = createToken(payload)
  res.set('x-token', token)

  return { token, user }
}

const register = async (obj, {
  input: {
    email, password, firstName, lastName, year,
  },
}, { res }) => {
  const passwordHash = await hashPassword(password)
  const emailExists = await User.query().findOne({ email })
  if (emailExists) {
    throw new UserInputError('Email is already in use')
  }

  const user = await User.query().insertAndFetch({
    email,
    password: passwordHash,
    firstName,
    lastName,
    year,
  })

  // If successful registration, set authentication information
  const payload = {
    sub: user.id,
  }
  const token = createToken(payload)
  res.set('x-token', token)

  return user
}

const resolver = {
  Mutation: { login, register },
}

module.exports = resolver
