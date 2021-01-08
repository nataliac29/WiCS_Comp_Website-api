const { UserInputError } = require('apollo-server-express')
const Admin = require('../../models/Admin')
const {
  hashPassword,
} = require('../../lib/auth')

const editAdmin = async (obj, { input }, { admin }) => {
  const {
    password, email, firstName, lastName,
  } = input
  const updateObj = { id: admin.id }

  if (firstName) { updateObj.firstName = firstName }
  if (lastName) { updateObj.lastName = lastName }

  if (password) {
    updateObj.password = await hashPassword(password)
  }

  if (email) {
    const emailAddressExists = await Admin.query()
      .whereNot({ id: admin.id }).findOne({ email })
    if (emailAddressExists) {
      throw new UserInputError('Email address is already in use')
    } else {
      updateObj.email = email
    }
  }

  const updatedAdmin = await Admin.query()
    .findById(admin.id)
    .patch(updateObj).returning('*')
  return updatedAdmin
}


const resolver = {
  Mutation: { editAdmin },
}

module.exports = resolver
