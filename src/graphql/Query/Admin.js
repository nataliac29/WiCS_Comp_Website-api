const Admin = require('../../models/Admin')

const adminViewer = async (_obj, _params, { admin }) => admin
const getAdminById = async (_obj, { id }) => Admin.query().findById(id)

// Suppose that admin is a subresolver to a table/object. The following code shows how
// the adminLoader from the context can be used to load the admins all at once where id is
// the attribute from the parent table.

// const admin = async ({ id }, _, { loaders }) => {
//   const { adminLoader } = loaders
//   return adminLoader.load(id)
// }

const resolver = {
  UserTraits: {
    __resolveType: () => null,
  },
  Query: { adminViewer, getAdminById },
}

module.exports = resolver
