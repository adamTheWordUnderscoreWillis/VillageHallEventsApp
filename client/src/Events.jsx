import { useEffect, useState } from "react"
import { fetchEvents } from "./components/api"
import Poster from "./components/poster"

function Events() {
   const  [events, setEvents] = useState(null)
    useEffect(()=>{
    
      const getEvents = async () => {
        const data = await fetchEvents()
        const eventsData = data.events
        await setEvents(eventsData)
      }
      getEvents()
     },[])
     
     if(events === null){
       return 0
      }

      const posterImage = events[0].logo.url
      console.log("This is the Poster Image", posterImage)
      return (
           <>
             <Poster image={posterImage}/>
             {/* {events.map((event)=>{
                 return (
                     <p>{event.name.text}</p>
                 )
             })} */}
           </>
         )
  }
  
  export default Events