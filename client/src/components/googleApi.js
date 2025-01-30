const gapi = window.gapi;
const google = window.google;

const CLIENT_ID = '648611715479-ir065jvp0akr5i1tihs609c1s59rdogr.apps.googleusercontent.com';
const API_KEY = 'AIzaSyChVdiMMKDQyQKM7XsYXjISmIQHml_TS68';
const CALENDAR_DOC ='https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const SCOPES = `https://www.googleapis.com/auth/calendar`;

const accessToken = localStorage.getItem('access_token');
const expiresIn = localStorage.getItem('expires_in')

let gapiInited = false, gisInited = false, tokenClient;

export const gapiLoaded = () => {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [CALENDAR_DOC],
  });
  gapiInited = true;
  
  if(accessToken && expiresIn){
      gapi.client.setToken({
          accessToken: accessToken,
          expiresIn: expiresIn
      })
  }
}

export const gisLoaded = () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
  });
  
  gisInited = true;
  
}

export const AuthorizeToken = () => {
  tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
          console.log("The Resp: ",resp)
          throw (resp);
        }
    
    const {access_token, expires_in} = gapi.client.getToken();
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('expires_in', expires_in)
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
  }

export const handleSignoutClick = () => {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    localStorage.clear();
    setIsSignedIn(false)
  }
}

export const addEvent = () =>{
  const event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Googles developer products.',
  'start': {
    'dateTime': '2025-01-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2025-01-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'},
  ],
};
  const request = gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
  })
  request.execute((event)=>{
      console.log(event)
  },(error)=>{
      console.error(error)
  })

}