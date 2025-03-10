import { useEffect, useMemo, useState } from "react"
import { fetchEvents, fetchUserCalendarEvents } from "./components/api"
import Poster from "./components/Poster.jsx"
import { handleError } from "./components/errorHandling.jsx"
import { Text } from "@react-three/drei"
import {A11ySection } from "@react-three/a11y"

function Events({
  events,
  setEvents,
  isLoading, 
  setIsLoading, 
  staffAction, 
  isSignedIn, 
  profile, 
  user, 
  setTargetedEvent, 
  targetedEvent,
  setIsError,
  setErrorText,
  isViewingPoster,
  setIsViewingPoster
}) {
   const  [calendarEvents, setcalendarEvents] = useState([])
   
    useEffect(()=>{
      const getEvents = async () => {
        await setIsLoading(true)
        await setIsError(false)
        await setErrorText(null)
        try{
          const data = await fetchEvents()
          if(!data){
            throw {response: {msg: "Could not fetch data from Server", status: 500}}
          }
          const eventsData = data.events
          if(Object.keys(user).length>0){
            const calendarEventsData = await fetchUserCalendarEvents(user)
            setcalendarEvents(calendarEventsData)
          }
            await setEvents(eventsData)
            await setIsLoading(false)
        }
        catch(err){
          const errorMessage = await handleError(err)
          await setErrorText(errorMessage)
          await setIsError(true)
        }
      }
      getEvents()
     },[profile, staffAction])

     const posterColours = useMemo(()=>{
      if(events === null || !events.length){
        return 0
      }
      else if(events.length >0){
        const colors = []
        for(let i=0; i< events.length; i++){
          colors.push(Math.random()*255)
        }
        return colors
      }
      else{
        return 0
      }

    }, [events])
    const posterTransform = useMemo(()=>{
      if(events === null || !events.length){
        return 0
      }
      else if(events.length>0){
        const transforms = []
        for(let i=0; i<events.length; i++){
          let transformObject = {
            position: [
              ((i%3)*(1+screen.width*0.0002))-(1+screen.width*0.0002),
              ((-i%4)*1.2)+1.9,
              (Math.random()*0.04)+0.1
            ],
            rotation: [0,0,(((Math.random()-0.5)*0.5))]
  
   
          }
          transforms.push(transformObject)
        }
        return transforms;
      }
      else{
        return 0
      }

    },[events])
     if(isLoading === true){
       return 0
      }
      if (isSignedIn === false){
        return 0
      }

      function noEventsBanner (){
        return (
          <group >
                              <group position={[0,0,0.1]} rotation={[0,0, 0]}>
                                  <mesh>
                                      <boxGeometry args={[3,0.5,0.1]}/>
                                      <meshStandardMaterial color={"black"}/>
                                  </mesh>
                                  <group>
                          <Text 
                              color="white"
                              anchorX="centre" 
                              anchorY="middle" 
                              fontSize="0.3" 
                              position={[-1.3,0.05,0.11]}>
                                  NO EVENTS, SORRY
                              </Text>
                      </group>
                              </group>
                      </group>
        )
      }
      return (
        <>
         <A11ySection
          label="Events Board"
          description="This is a Village Hall Noticeboard with lots of flyers for different events on it. Click the flyers or tab and enter to get a closer look and use the sign up and calendar buttons."
        >
            {events.length >0?null: noEventsBanner()}
             {
             events.map((event, index)=>{
              const calendarEntry = calendarEvents.filter((calendarEvent)=> calendarEvent.summary === event.name.text && new Date(event.start.utc).toDateString === new Date(calendarEvent.start.dateTime).toDateString)
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
                    eventData={event}
                    posterTransform={posterTransform[index]}
                    color={posterColours[index]}
                    user={user}
                    profile={profile}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setIsViewingPoster={setIsViewingPoster}
                    isViewingPoster={isViewingPoster}
                    />
                  )
                })}
                // </A11ySection>
           </>
         )
  }
  
  export default Events