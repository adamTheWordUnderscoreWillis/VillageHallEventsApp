import { useEffect, useMemo, useRef, useState } from "react"
import { fetchEvents, fetchUserCalendarEvents } from "./components/api"
import Poster from "./components/poster"

function Events({
  isLoading, 
  setIsLoading, 
  staffAction, 
  isSignedIn, 
  profile, 
  user, 
  setTargetedEvent, 
  targetedEvent
}) {

   const  [events, setEvents] = useState(null)
   const  [calendarEvents, setcalendarEvents] = useState([])
   
    useEffect(()=>{
      const getEvents = async () => {
        await setIsLoading(true)
        const data = await fetchEvents()
        const eventsData = data.events
        const calendarEventsData = await fetchUserCalendarEvents(user)
        console.log("Calendar Events: ", calendarEventsData)
        setcalendarEvents(calendarEventsData)
        console.log("This was the staff Action", staffAction)
        await setEvents(eventsData)
        await setIsLoading(false)
      }
      getEvents()
     },[profile, staffAction])

     const posterColours = useMemo(()=>{
      if(events === null) return 0

      const colors = []
      for(let i=0; i< events.length; i++){
        colors.push(Math.random()*255)
      }
      return colors
    }, [events])
     if(isLoading === true){
       return 0
      }
      if (isSignedIn === false){
        return 0
      }
      return (
        <>
             {events.map((event, index)=>{
              const calendarEntry = calendarEvents.filter((calendarEvent)=> calendarEvent.summary === event.name.text && event.start.utc === calendarEvent.start.dateTime)
              let calendarEventId
              if(calendarEntry.length){
                calendarEventId = calendarEntry[0].id
              }
               return (
                   <Poster
                   setTargetedEvent={setTargetedEvent}
                   targetedEvent={targetedEvent}
                   calendarEventId={calendarEventId}
                   key={`${event.id}poster`} 
                   yRotation={(Math.random()-0.1)*0.5} 
                   xPosition={(index-4)*0.4} 
                   yPosition={(index%2*1.5)-(0.5+(Math.random()*0.5))} 
                   zPosition={(Math.random()*0.04)+0.1} 
                   eventData={event}
                   color={posterColours[index]}
                   user={user}
                   profile={profile}
                   />
                 )
             })}
           </>
         )
  }
  
  export default Events