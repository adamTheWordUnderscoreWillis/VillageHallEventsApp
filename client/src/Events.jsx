import { useEffect, useMemo, useRef, useState } from "react"
import { fetchEvents } from "./components/api"
import Poster from "./components/poster"

function Events({isLoading, setIsLoading, isSignedIn, profile}) {
   const  [events, setEvents] = useState(null)
   
    useEffect(()=>{
      
      const getEvents = async () => {
        await setIsLoading(true)
        const data = await fetchEvents()
        const eventsData = data.events
        await setEvents(eventsData)
        await setIsLoading(false)
      }
      getEvents()
     },[])
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
               return (
                   <Poster 
                   key={event} 
                   yRotation={(Math.random()-0.1)*0.5} 
                   xPosition={(index-4)*0.4} 
                   yPosition={(index%2*1.5)-(0.5+(Math.random()*0.5))} 
                   zPosition={(Math.random()*0.04)+0.1} 
                   image={event}
                   color={posterColours[index]}
                   profile={profile}
                   />
                 )
             })}
           </>
         )
  }
  
  export default Events