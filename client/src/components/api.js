import axios from "axios"

const backEnd = axios.create({
    baseURL: "http://localhost:5050",
});

export const fetchEvents = ()=> {
    return backEnd
    .get("/events")
    .then(({data})=>{
        return data
    })
}
export const addAttendee = (event)=> {
    console.log(event.id)
    const attendeeData = {
        "user@email.com": "user"
      }
    return backEnd
    .patch(`/events/${event.id}/attendee`, attendeeData)
    .then(({data})=>{
        console.log("Added Attendee Response", data)
        return data
    })
}
export const removeAttendee = (event)=> {
    console.log(event.id)
    const attendeeData = {
        "user@email.com": "user"
      }
    return backEnd
    .patch(`/events/${event.id}/RemoveAttendee`, attendeeData)
    .then(({data})=>{
        console.log("Removed Attendee Response", data)
        return data
    })
}
export const authorize = async ()=>{
    const authorization = await backEnd.get("/google/authentication")
    return authorization

}

export const trySampleRequest = () => {
    var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
    if (params && params['access_token']) { 
      console.log("got token")
      // User authorized the request. Now, check which scopes were granted.
      if (params['scope'].includes('https://www.googleapis.com/auth/drive.metadata.readonly')) {
        // User authorized read-only Drive activity permission.
        // Calling the APIs, etc.
        var xhr = new XMLHttpRequest();
        xhr.open('GET',
        'https://www.googleapis.com/drive/v3/about?fields=user&' +
        'access_token=' + params['access_token']);
        xhr.onreadystatechange = function (e) {
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response);
          } else if (xhr.readyState === 4 && xhr.status === 401) {
            // Token invalid, so prompt for user permission.
            console.log("This far")
            oauth2SignIn();
          }
        };
        xhr.send(null);
      }
    }
}