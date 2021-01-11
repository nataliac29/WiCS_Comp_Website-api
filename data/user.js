const casual = require('casual')

// 'password' hashed with bcrypt scheme
const password = '$2a$10$rQEY9CNl4OC.UtiyRgKnZeW0KaWnEANMKAxfIpNDQCgiCybm3G1fy'

casual.define('user', () => ({
  id: casual.uuid,
  firstName: casual.first_name,
  lastName: casual.last_name,
  year: casual.year,
  email: casual.email,
  progress: casual.double(from = 0, to = 100),
  password,
  createdAt: casual.moment,
  updatedAt: casual.moment,
}))


const userData = []

for (let i = 0; i < 20; ++i) {
  userData.push(casual.user)
}

module.exports = userData
