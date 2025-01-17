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

      const posterImage = events[0].logo
      return (
        <>
             {events.map((event, index)=>{
               return (
                   <Poster yRotation={(Math.random()-0.1)*0.5} xPosition={(index-4)*0.4} yPosition={(Math.random()-0.5)*2.5} zPosition={Math.random()*0.01} image={event.logo}/>
                 )
             })}
           </>
         )
  }
  
  export default Events