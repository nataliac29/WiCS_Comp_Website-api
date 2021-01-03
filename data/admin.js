/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
const casual = require('casual')

// 'password' hashed with bcrypt scheme
const password = '$2a$10$rQEY9CNl4OC.UtiyRgKnZeW0KaWnEANMKAxfIpNDQCgiCybm3G1fy'

casual.define('admin', () => ({
  id: casual.uuid,
  email: casual.email,
  password,
  firstName: casual.first_name,
  lastName: casual.last_name,
  createdAt: casual.moment,
  updatedAt: casual.moment,
}))


const adminData = []

for (let i = 0; i < 20; ++i) {
  adminData.push(casual.admin)
}

module.exports = adminData
