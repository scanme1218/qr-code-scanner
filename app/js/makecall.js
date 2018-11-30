// Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
const accountSid = 'AC6dafc5415c5cadafb887126f8d37f794';
const authToken = '53b5696578c9f25b4c81a1d09aaef1f2';
const client = require('twilio')(accountSid, authToken);

client.calls.create(
  {
    url: 'https://handler.twilio.com/twiml/EH3904c3143b78b03201440c557cd145ba',
    to: '+19252163691',
    from: '+19254034227'
  },
  (err, call) => {
    console.log(call.sid);
  }
);
