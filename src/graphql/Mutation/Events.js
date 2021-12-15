/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
// const { UserInputError } = require('apollo-server-express')
// const Events = require('../../models/Events')
// const fs = require('fs')
// const readline = require('readline')
// const { google } = require('googleapis')
const TrackEvents = require('../../models/TrackEvents')
const User = require('../../models/User')
const Events = require('../../models/Events')

// // If modifying these scopes, delete token.json.
// const SCOPES = [
//   'https://www.googleapis.com/auth/drive.metadata.readonly',
//   'https://www.googleapis.com/auth/drive',
//   'https://www.googleapis.com/auth/drive.file',
//   'https://www.googleapis.com/auth/drive.appdata',
// ]
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = 'token.json'

// // Load client secrets from a local file.


// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//   const { client_secret, client_id, redirect_uris } = credentials.installed
//   const oAuth2Client = new google.auth.OAuth2(
//     client_id, client_secret, redirect_uris[0],
//   )

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getAccessToken(oAuth2Client, callback)
//     oAuth2Client.setCredentials(JSON.parse(token))
//     callback(oAuth2Client)
//   })
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getAccessToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   })
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   })
//   rl.question('Enter the code from that page here: ', code => {
//     rl.close()
//     oAuth2Client.getToken(code, (err, token) => {
//       // if (err) return console.error('Error retrieving access token', err)
//       oAuth2Client.setCredentials(token)
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
//         if (err) return console.error(err)
//         // console.log('Token stored to', TOKEN_PATH)
//       })
//       callback(oAuth2Client)
//     })
//   })
// }

// async function runSample(auth) {
//   // Obtain user credentials to use for the request
//   const drive = google.drive({ version: 'v3', auth })
//   const fileSize = fs.statSync('puppy.jpeg').size
//   const res = await drive.files.create(
//     {
//       requestBody: {
//         name: 'test',
//       },
//       media: {
//         body: fs.createReadStream('puppy.jpeg'),
//       },
//     },
//     {
//       // Use the `onUploadProgress` event from Axios to track the
//       // number of bytes uploaded to this point.
//       onUploadProgress: evt => {
//         const progress = (evt.bytesRead / fileSize) * 100
//         readline.clearLine(process.stdout, 0)
//         readline.cursorTo(process.stdout, 0)
//         process.stdout.write(`${Math.round(progress)}% complete`)
//       },
//     },
//   )
//   // console.log(res.data)
// }

const addTrackEvents = async (obj, { input }, { user }) => {
  const {
    eventId, photo, des, addedAt,
  } = input

  const newTrackEvent = await TrackEvents.query().insertAndFetch({
    eventId,
    userId: user.id,
    photo,
    des,
    addedAt,
  })
  return newTrackEvent
}
const addEvents = async (obj, { input }) => {
  const {
    eventname, des, datetime, type,
  } = input

  const newEvent = await Events.query().insertAndFetch({
    eventname,
    datetime: datetime.toISOString(),
    des,
    type,
  })
  return newEvent
}

const editEvent = async (obj, { input }) => {
  const {
    id, eventname, datetime, des, type,
  } = input
  const updateObj = { id }

  if (eventname) { updateObj.eventname = eventname }
  if (datetime) { updateObj.datetime = datetime }

  if (des) {
    // updateObj.password = des
    updateObj.des = des
  }

  // if (type) {
  //   if (type !== ('LargeSocial' || 'SmallSocial' || 'Sponsorship' || 'Educational')) {
  //     throw new Error('Please add correct type')
  //   } else {
  //     updateObj.type = type
  //   }
  // }

  if (type) {
    if (type === 'SmallSocial') {
      updateObj.type = type
    } else if (type === 'LargeSocial') {
      updateObj.type = type
    } else if (type === 'Educational') {
      updateObj.type = type
    } else if (type === 'Sponsorship') {
      updateObj.type = type
    } else {
      throw new Error('Wrong event type')
    }
  }

  const updatedEvent = await Events.query()
    .findById(id)
    .patch(updateObj).returning('*')
  return updatedEvent
}
const batchEvents = async ids => {
  const events = await Events.query()
    .whereIn('id', ids).select()

  return events
}

const changeTrackEventStatus = async (_obj, { input }) => {
  const {
    eventId, status, userId,
  } = input
  const updateObj = { approved: status }

  const updatedTrackEvent = await TrackEvents.query()
    .findById(eventId)
    .patch(updateObj).returning('*')

  const currEvents = await TrackEvents.query()
    .where('userId', userId).whereNot('approved', 'false').whereNot('approved', 'pending')
  const eventIds = currEvents.map(el => el.eventId)

  const events = await batchEvents(eventIds)
  let SmallSocial = events.filter(el => el.type === 'SmallSocial').length
  let LargeSocial = events.filter(el => el.type === 'LargeSocial').length
  let Sponsorship = events.filter(el => el.type === 'Sponsorship').length
  let Educational = events.filter(el => el.type === 'Educational').length

  let currProg = 0

  if (SmallSocial >= 1) {
    currProg++
    SmallSocial--
  } else if (LargeSocial >= 1) {
    currProg++
    LargeSocial--
  } else if (Sponsorship >= 1) {
    currProg++
    Sponsorship--
  } else if (Educational >= 1) {
    currProg++
    Educational--
  }

  currProg += (SmallSocial + LargeSocial + Sponsorship + Educational >= 2)
    ? 2 : (SmallSocial + LargeSocial + Sponsorship + Educational)

  User.query().findById(userId).patch({ progress: currProg })

  // console.log(updateProgress.filter(el => el.type))

  // fs.readFile('credentials.json', (err, content) => {
  //   // if (err) return console.log('Error loading client secret file:', err)
  //   // Authorize a client with credentials, then call the Google Drive API.
  //   authorize(JSON.parse(content), runSample)
  // })


  return updatedTrackEvent
}
const removeEvents = async (_obj, { events }) => {
  try {
    const del = await Events.query().delete().whereIn('id', events)
    return events.length === del
  } catch (error) {
    throw new Error('Unable to delete events')
  }
}

const resolver = {
  Mutation: {
    addTrackEvents,
    changeTrackEventStatus,
    addEvents,
    editEvent,
    removeEvents,
  },
}

module.exports = resolver
