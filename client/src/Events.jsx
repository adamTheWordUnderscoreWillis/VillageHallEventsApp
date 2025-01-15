import { useEffect, useState } from "react"
import { fetchEvents } from "./components/api"

function Events() {
   const  [events, setEvents] = useState(0)
    useEffect(()=>{
    
      const getEvents = async () => {
        const data = await fetchEvents()
        const eventsData = data.events
        console.log(eventsData)
        await setEvents(eventsData)
      }
      getEvents()
     },[])

    return (
      <>
        {events.map((event)=>{
            return (
                <p>{event.name.text}</p>
            )
        })}
      </>
    )
  }
  
  export default Events