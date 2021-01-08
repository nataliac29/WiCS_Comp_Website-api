/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
// const { UserInputError } = require('apollo-server-express')
// const Events = require('../../models/Events')
// const fs = require('fs')
// const readline = require('readline')
// const { google } = require('googleapis')
const TrackEvents = require('../../models/TrackEvents')

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

const changeTrackEventStatus = async (_obj, { input }) => {
  const {
    eventId, status, userId
  } = input
  const updateObj = { approved: status }

  const updateProgress = await TrackEvents.query()
    .where('userId', userId)

  console.log(updateProgress.filter(el => el.type))

  // fs.readFile('credentials.json', (err, content) => {
  //   // if (err) return console.log('Error loading client secret file:', err)
  //   // Authorize a client with credentials, then call the Google Drive API.
  //   authorize(JSON.parse(content), runSample)
  // })

  const updatedTrackEvent = await TrackEvents.query()
    .findById(eventId)
    .patch(updateObj).returning('*')
  return updatedTrackEvent
}

const resolver = {
  Mutation: {
    addTrackEvents,
    changeTrackEventStatus,
  },
}

module.exports = resolver
