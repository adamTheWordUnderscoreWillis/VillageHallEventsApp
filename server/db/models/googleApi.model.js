const {google} = require('googleapis')

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
   "http://localhost:5050/oauth2callback"
  );

exports.authorizeClient = async (state)=>{


      const scopes = [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/userinfo.profile'
      ];
      

        const authorizationUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            include_granted_scopes: true,
            state: state,
            response_type: 'code'
        });
    return authorizationUrl
}

exports.fetchToken = async (q, state)=>{

    if (q.error) {
        console.log('Error:' + q.error);
      } else if (q.state !== state) {
        throw new Error("State mismatch. Possible CSRF attack")
      } else {
        let { tokens } = await oauth2Client.getToken(q.code);
        oauth2Client.setCredentials(tokens);
        return oauth2Client
      }
}

exports.createCalendarEvent = async(event, auth)=>{

    const calendar = google.calendar({version: 'v3', auth})
      calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resource: event,
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        return ('Event created: %s', event.htmlLink);
      });
}