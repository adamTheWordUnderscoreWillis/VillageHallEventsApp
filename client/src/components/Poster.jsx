import { useFrame, useLoader } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { BoxGeometry, MeshStandardMaterial, TextureLoader } from "three"
import { useEffect, useRef, useState } from "react"
import { addAttendee, addEventToUserCalendar, removeAttendee, removeEventFromUserCalendar } from "./api"

function Poster({
    yRotation, 
    xPosition,
    yPosition,
    zPosition,
    eventData,
    color,
    profile,
    user, 
    calendarEventId, 
    setTargetedEvent, 
    targetedEvent
}){
    const [isClicked, setIsClicked] = useState(false)
    const [isfocused, setIsFocused] = useState(false)
    const [isGoing, setIsGoing] = useState(false)
    const [calenderID, setCalendarId] = useState(calendarEventId)
    const [isInUserCalendar, setIsInUserCalendar] = useState(false)
    const posterRef = useRef()
    const signUpButtonRef = useRef()
    const calendarButtonRef = useRef()
    
    async function handlecalendarEvent (){
        if(isInUserCalendar){
            try{
                await removeEventFromUserCalendar(user, calenderID)
                setIsInUserCalendar(false)
                setCalendarId("")
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            try{
                const newEvent = await addEventToUserCalendar(user,eventData)
                setCalendarId(newEvent.id)
                setIsInUserCalendar(true)

            }
            catch(err){
                console.log(err)
            }
        }
    }
    function showCalendarButton (){
        return(
            <group 
            ref={calendarButtonRef} 
            class="Calendar Button"
            position={[-0.2,-0.33,-0.001]}
            onPointerEnter={ (event) => {
                event.stopPropagation()
                 document.body.style.cursor = 'pointer'
                } }
            onClick={handlecalendarEvent}
            >
                <mesh  
                position={[0.2,0,0]}>
                                <planeGeometry args={[0.6,0.04,1]}/>
                                <meshStandardMaterial color={`hsl(${(color+ 15)%360}, 50%, 30%)` }/>
                </mesh>
                <Text 
        color={`hsl(${color}, 100%, 90%)`} 
        anchorX="left" 
        anchorY="top" 
        fontSize="0.04" 
        fontWeight="bold"
        overflowWrap="normal"
        maxWidth={0.9}
        position={[-0.09,0.03,0.001]}
        >
            {isInUserCalendar? "Remove from calendar" :"Pop it in the calendar?"}
        </Text>
            </group>
        )
    }
    function GoingToEventSticker (){
        return(
            <group 
                position={[0.2,-0.22,0.04]}
                rotation={[0,0,-yRotation]}
                scale={[1.3,1.3,1.3]}
                    class="goingSticker" 
                    >
                        <mesh  
                        position={[0,0,0]}
                        rotation={[0,0,0]}
                        >
                            
                                        <planeGeometry args={[0.35,0.08,1]}/>
                                        <meshStandardMaterial color={`hsl(133, 60%, 50%)`}/>
                        </mesh>
                        <Text 
                color={`hsl(${color}, 100%, 10%)`} 
                anchorX="left" 
                anchorY="top" 
                fontSize="0.06" 
                fontWeight="bold"
                overflowWrap="normal"
                maxWidth={0.5}
                position={[-0.14,0.04,0.001]}
                rotation={[0,0,0]}
                >
                    I'm Going!
                </Text>
                    </group>
        )
    }
    
    async function handleSignUp(){
        if(isGoing === true){
            console.log("No longer attending")
            const attendeeData = {
                [profile.email]: profile.name
              }
            await removeAttendee(eventData, attendeeData)
            const targetedEventUpdate = {...targetedEvent}
            delete targetedEventUpdate.attendees[profile.email]
            await setTargetedEvent(targetedEventUpdate)
            if(isInUserCalendar){
                try{
                    await removeEventFromUserCalendar(user, calenderID)
                    setIsInUserCalendar(false)
                    setCalendarId("")
                }
                catch(err){
                    console.log(err)
                }
            }
        }
        else{
            console.log("signed Up!")
            await addAttendee(eventData, profile)
            const AddTargetEvent = {...targetedEvent}
            AddTargetEvent.attendees[profile.email] = profile.name
            await setTargetedEvent(AddTargetEvent)
        }
        setIsGoing(!isGoing)
    }
    const handleIsGoing = async ()=>{
        if(eventData.attendees[profile.email]){
            console.log(eventData.attendees[profile.email])
            await setIsGoing(true)
        }
        if(calendarEventId){
            console.log(eventData.name.text, " is in Calendar")
            await setIsInUserCalendar(true)
        }
    }

    useEffect(()=>{
        handleIsGoing()
    },[profile])

    useFrame((state)=>{
        isfocused? posterRef.current.position.z = zPosition+0.1: posterRef.current.position.z= zPosition;
        isClicked? posterRef.current.position.z = state.camera.position.z -1: posterRef.current.position.z= zPosition;
        isClicked? posterRef.current.position.x = state.camera.position.x/1.5: posterRef.current.position.x= xPosition;
        isClicked? posterRef.current.position.y = state.camera.position.y/1.5: posterRef.current.position.y= yPosition;
        isClicked? posterRef.current.rotation.z = 0: posterRef.current.rotation.z= yRotation;
        isClicked? posterRef.current.rotation.y = state.camera.rotation.y: posterRef.current.rotation.y= 0;    
        isClicked? posterRef.current.rotation.x = state.camera.rotation.x: posterRef.current.rotation.x= 0;    
    })

    const posterMap = useLoader(TextureLoader, eventData.logo.url)
    let imageWidth = 0.25
    let imageHeight = 0.25
   const date = new Date(eventData.start.utc)
    


    return(
        <>
        <group
        scale={[1.4,1.4,1.4]}
        position={[xPosition ,yPosition,zPosition]}
        rotation={[0,0,yRotation]}
        ref={posterRef}
        onPointerEnter={ (event) => {
            event.stopPropagation()
            isClicked? document.body.style.cursor = 'default':  document.body.style.cursor = 'pointer'
            setIsFocused(true)
        } }
        onPointerLeave={
            () => { 
                document.body.style.cursor = 'default' 
                setIsFocused(false)
                
            } }
            onClick={(event)=>{
                event.stopPropagation()
                setTargetedEvent(eventData)
                
                setIsClicked(true)
            }}
            onPointerMissed={()=>{
                setIsClicked(false)
                // setTargetedEvent({})
            }}
            >
            {isGoing ? GoingToEventSticker(): null}
            <group class="posterHeader">
                <Text 
                color={`hsl(${color}, 100%, 95%)`} 
                anchorX="left" 
                anchorY="top" 
                fontSize="0.06"
                fontWeight="bold"
                overflowWrap="normal"
                maxWidth={0.6}
                position={[-0.29,0.44,0]}
                >
                    {eventData.name.text}
                </Text>
                <mesh  
                    position={[0,0.35,-0.001]}>
                            <planeGeometry args={[0.6,0.2,1]}/>
                            <meshStandardMaterial color={`hsl(${color}, 100%, 10%)` }/>
                </mesh>
            </group>
            <group class="body">
                <Text 
                color={`hsl(${color}, 100%, 10%)`} 
                anchorX="left" 
                anchorY="top" 
                fontSize="0.04" 
                fontWeight="bold"
                overflowWrap="normal"
                maxWidth={0.3}
                position={[-0.28,0.24,0]}
                >
                    {eventData.description.text}
                </Text>
                <mesh  
                position={[0,0,-0.0015]}>
                                <planeGeometry args={[0.6,0.9,1]}/>
                                <meshStandardMaterial color={`hsl(${color}, 50%, 70%)` }/>
                </mesh>
                <mesh  
                position={[0.175,0.124,0]}>
                                <planeGeometry args={[imageWidth, imageHeight ]}/>
                                <meshStandardMaterial map={posterMap}/>
                </mesh>
                <mesh  
                position={[0.175,0.124,-0.001]}>
                                <planeGeometry args={[imageWidth+0.01, imageHeight+0.01]}/>
                                <meshStandardMaterial color={`hsl(${color}, 100%, 15%)`}/>
                </mesh>
            </group>
            <group class="posterFooter">
                <Text 
                color={`hsl(${color}, 100%, 90%)`} 
                anchorX="left" 
                anchorY="top" 
                fontSize="0.06"
                fontWeight="bold"
                overflowWrap="normal"
                maxWidth={0.5}
                position={[-0.28,-0.35,0]}
                >
                    {`£${eventData.price}`}
                </Text>
                <Text 
                color={`hsl(${color}, 100%, 90%)`} 
                anchorX="right" 
                anchorY="top" 
                fontSize="0.04" 
                fontWeight="bold"
                overflowWrap="normal"
                maxWidth={0.5}
                position={[0.28,-0.35,0]}
                >
                    {date.toDateString()}
                </Text>
                <Text 
                color={`hsl(${color}, 100%, 90%)`} 
                anchorX="right" 
                anchorY="top" 
                fontSize="0.04" 
                fontWeight="bold"
                overflowWrap="normal"
                maxWidth={0.5}
                position={[0.28,-0.395,0]}
                >
                    {date.toLocaleTimeString("en-US",{hour:"2-digit", minute: "2-digit"})}
                </Text>
                    
                    <mesh  
                    position={[0,-0.4,-0.001]}>
                                    <planeGeometry args={[0.6,0.1,1]}/>
                                    <meshStandardMaterial color={`hsl(${color}, 100%, 10%)` }/>
                    </mesh>
                    <group 
                    ref={signUpButtonRef} 
                    class="signUpButton" 
                    position={[0.174,-0.03,-0.001]}
                    scale={[1.3,1.3,1.3]}
                    onPointerEnter={ (event) => {
                        event.stopPropagation()
                         document.body.style.cursor = 'pointer'
                        } }
                    onClick={handleSignUp}
                    >
                        <mesh  
                        position={[0,0,0]}>
                                        <planeGeometry args={[0.2,0.04,1]}/>
                                        <meshStandardMaterial color={isGoing? `hsl(0, 100.00%, 60.40%)` :`hsl(${(color+ 15)%360}, 100%, 60%)` }/>
                        </mesh>
                        <Text 
                color={`hsl(${color}, 100%, 10%)`} 
                anchorX="left" 
                anchorY="top" 
                fontSize="0.04" 
                fontWeight="bold"
                overflowWrap="normal"
                maxWidth={0.5}
                position={[-0.09,0.03,0.001]}
                >
                    {isGoing? "Cancel..." :"Sign Up!"}
                </Text>
                    </group>
                {isGoing? showCalendarButton(): null}

            </group>


        </group>
        </>
    )
}
export default Poster