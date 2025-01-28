import axios from "axios"

const backEnd = axios.create({
    baseURL: "http://localhost:5050",
});

const google = axios.create({
    baseURL: 'https://accounts.google.com/o/oauth2/v2',
});
export const fetchEvents = ()=> {
    return backEnd
    .get("/events")
    .then(({data})=>{
        return data
    })
}
export const addAttendee = (eventID)=> {
    console.log(eventID)
    const attendeeData = {
        "user@email.com": "user"
      }
    return backEnd
    .patch(`/events/${eventID}/attendee`, attendeeData)
    .then(({data})=>{
        console.log("Added Attendee Response", data)
        return data
    })
}
export const removeAttendee = (eventID)=> {
    console.log(eventID)
    const attendeeData = {
        "user@email.com": "user"
      }
    return backEnd
    .patch(`/events/${eventID}/RemoveAttendee`, attendeeData)
    .then(({data})=>{
        console.log("Removed Attendee Response", data)
        return data
    })
}