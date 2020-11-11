const { UserInputError } = require('apollo-server-express')
const Events = require('../../models/Student')
const TrackEvents = require('../../models/Course')
const {
  hashPassword,
} = require('../../lib/auth')

const addTrackEvents = async (obj, { input }, { user }) => {
  const {
    firstName, lastName, age, timeZone, course, workshop, email, password,
  } = input

  const emailAddressExists = await Student.query().findOne({ email })
  if (emailAddressExists) {
    throw new UserInputError('Email address is already in use')
  }

  const courseId = await Course.query().findOne({ courseName: course, type: 'COURSE' })
  if (!courseId) {
    throw new UserInputError('Course name not found')
  }

  const workshopId = await Course.query().findOne({ courseName: workshop, type: 'WORKSHOP' })
  if (!workshopId) {
    throw new UserInputError('Workshop name not found')
  }

  const passwordHash = await hashPassword(password)

  const newStudent = await Student.query().insertAndFetch({
    password: passwordHash,
    firstName,
    lastName,
    email,
    timeZone,
    course: courseId.id,
    workshop: workshopId.id,
    age,
  })
  return newStudent
}

const resolver = {
  Mutation: {
    addStudent, editStudent, removeStudents, editStudentAsInstructor,
  },
}

module.exports = resolver
