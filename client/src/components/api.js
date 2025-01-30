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

export const getUsernfo = (user) => {
  if (user) {
    console.log(user.access_token)
      axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
              }
          })
          .then((res) => {
            console.log(res.data)
              return res.data
          })
          .catch((err) => console.log(err));
  }
}