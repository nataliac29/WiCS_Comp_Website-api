const User = require('../../models/User')


const userViewer = async (obj, args, { user }) => user
const getUserById = async (obj, { id }) => {
  try {
    const e = await User.query().findById(id)
    return e
  } catch (err) {
    throw new Error('Failed to fetch user')
  }
}

const allUsers = async () => {
  const users = User.query()
  return users
}

// Suppose that user is a subresolver to a table/object. The following code shows how
// the userLoader from the context can be used to load the users all at once where id is
// the attribute from the parent table.

// const user = async ({ id }, _, { loaders }) => {
//   const { userLoader } = loaders
//   return userLoader.load(id)
// }

const resolver = {
  UserTraits: {
    __resolveType: () => null,
  },
  Query: {
    userViewer,
    getUserById,
    allUsers,
  },
}

module.exports = resolver
