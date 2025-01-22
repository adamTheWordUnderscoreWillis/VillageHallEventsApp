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

      // const posterImage = events[0].logo
      return (
        <>
             {events.map((event, index)=>{
               return (
                   <Poster key={event.id} yRotation={(Math.random()-0.1)*0.5} xPosition={(index-4)*0.4} yPosition={(Math.random()-0.5)*2} zPosition={(Math.random()*0.04)+0.1} image={event}/>
                 )
             })}
           </>
         )
  }
  
  export default Events