const { gql } = require('apollo-server-express')

module.exports = gql`

# These scalars are resolved in /lib/scalars.js and can be used as input or output type in schema.
scalar DateTime
scalar Date
scalar Time
scalar EmailAddress
scalar PhoneNumber

  type Query {
    user(id: ID!): User!
    userEvents: [Event!]
    events: [Event!]
    userViewer: User!
    adminViewer: Admin!
    userTrackEvents: [TrackEvent!]
    getUserById(id: ID!): User!
    getAdminById(id: String!): Admin!
    getEventsByDate(startDate: DateTime, timeFrame: Duration): [Event!]

    #all submissions
    allTrackEvents: [TrackEvent!]
    allUsers: [User!]!

    #filter compers by year
    getUsersByYear(year: String!): [User!]!

    #filter by any search
    getUsersByName(name: String!): [User]
  }

  type Mutation {
    userLogin(email: EmailAddress!, password: String!): AuthReturn!
    adminLogin(email: EmailAddress!, password: String!): AuthReturn!
    userRegister(input: RegisterInput!): User!
    adminRegister(input: RegisterInput!): Admin!
    addTrackEvents(input: AddTrackEventsInput!): Event!
    addEvents(input: AddEventsInput!): Event!
    changeTrackEventStatus(input: ChangeTrackInput!): TrackEvent!
    editAdmin(input: EditAdminInput!): Admin!
    editEvent(input: EditEventInput!): Event!
    removeEvents(events: [ID!]!): Boolean!}


  type Event {
    id: ID!
    eventname: String!
    type: String!
    datetime: DateTime!
    des: String!
    createdAt: DateTime!
  }
  type BasicUser {
    firstName: String!
    lastName: String!
  }

   enum EventTypeEnum {
    SmallSocial
    LargeSocial
    Educational
    Sponsorship
  }

  enum Duration {
    DAILY
    WEEKLY
  }

  type TrackEvent {
    id: ID!
    userId: ID!
    eventId: ID!
    photo: String
    des: String
    approved: String!
    addedAt: DateTime!
    event: Event!
    user: BasicUser!
  }
  
  input AddTrackEventsInput {
    userId: ID!
    eventId: ID!
    photo: String
    des: String
    addedAt: DateTime!
  }
  input EditEventInput {
    id: ID!
    eventname: String
    des: String
    datetime: DateTime
    type: String
  }

  input ChangeTrackInput {
    eventId: ID!
    status: String!
    userId: ID!
  }
  
  input AddEventsInput {
    eventname: String!
    type: EventTypeEnum!
    datetime: DateTime!
    des: String!
  }

  interface UserTraits {
    id: ID!
    email: EmailAddress!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User implements UserTraits {
    id: ID!
    email: EmailAddress!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    firstName: String!
    lastName: String!
    year: String!
    progress: Float!
  }
    type Admin implements UserTraits {
    id: ID!
    email: EmailAddress!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    firstName: String!
    lastName: String!
  }

  type Viewer implements UserTraits {
    id: ID!
    email: EmailAddress!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AuthReturn {
    token: String!
    user: Viewer!
  }

  input RegisterInput {
    email: EmailAddress!
    password: String!
    firstName: String!
    lastName: String!
    year: String
  }
  input EditAdminInput {
    email: EmailAddress
    password: String
    firstName: String
    lastName: String
  }
`
