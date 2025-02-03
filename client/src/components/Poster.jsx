import { useFrame, useLoader } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { BoxGeometry, MeshStandardMaterial, TextureLoader } from "three"
import { useEffect, useRef, useState } from "react"
import { addAttendee, addEventToUserCalendar, removeAttendee, removeEventFromUserCalendar } from "./api"
import { A11y, useA11y } from "@react-three/a11y"
function Poster({
    posterTransform,
    eventData,
    color,
    profile,
    user, 
    calendarEventId, 
    setTargetedEvent, 
    targetedEvent,
    isLoading,
    setIsLoading
}){
    const [isClicked, setIsClicked] = useState(false)
    const [isfocused, setIsFocused] = useState(false)
    const [isGoing, setIsGoing] = useState(false)
    const [isPosterLoading, setIsPosterLoading] = useState()
    const [calenderID, setCalendarId] = useState(calendarEventId)
    const [isInUserCalendar, setIsInUserCalendar] = useState(false)
    const posterRef = useRef()
    const signUpButtonRef = useRef()
    const calendarButtonRef = useRef()
    function ExitPosterButton(){
        const a11y = useA11y()
        if(isClicked){
            return (
                <group 
                    position={[-0.2,-0.45,0.04]}
                    rotation={[0,0,0]}
                    scale={a11y.focus?[0.85,0.85,0.85]:[0.8,0.8,0.8]}
                        class="goingSticker" 
                        >
                            <mesh  
                            position={[0,0,0]}
                            rotation={[0,0,0]}
                            >
                                
                                            <planeGeometry args={[0.35,0.08,1]}/>
                                            <meshStandardMaterial color={`hsl(0, 57.50%, 59.40%)`}/>
                            </mesh>
                            <Text 
                    color={`hsl(${color}, 100%, 10%)`} 
                    anchorX="left" 
                    anchorY="top" 
                    fontSize="0.06" 
                    fontWeight="bold"
                    overflowWrap="normal"
                    maxWidth={0.5}
                    position={[-0.16,0.04,0.001]}
                    rotation={[0,0,0]}
                    >
                        Exit Poster
                    </Text>
                        </group>
            )
        }
        
    }
    function PosterMesh (){
        const a11y = useA11y()
        return(
        <group
        scale={isClicked?[1.2,1.2,1.2]:a11y.focus || a11y.hover?[1.4,1.4,1.4]:[1.2,1.2,1.2]}
        position={posterTransform.position}
        rotation={posterTransform.rotation}
        ref={posterRef}
        onPointerEnter={ (event) => {
            event.stopPropagation()
            isClicked? document.body.style.cursor = 'default':  document.body.style.cursor = 'pointer'
            // setIsFocused(true)
        } }
            onClick={(event)=>{
                event.stopPropagation()
                setTargetedEvent(eventData)
                
                setIsClicked(true)
            }}
            onPointerMissed={()=>{
                setIsClicked(false)
                setTargetedEvent({})
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
                    <A11y
                        disabled={targetedEvent.id === eventData.id?false:true}
                        role="button"
                        actionCall={handleSignUp}
                    >
                        <SignUpButton/>
                    </A11y>
                    <A11y
                        disabled={isGoing&&targetedEvent.id === eventData.id?false:true}
                        role="button"
                        actionCall={handlecalendarEvent}
                    >
                        <ShowCalendarButton/>
                    </A11y>
                    <A11y
                        disabled={targetedEvent.id === eventData.id?false:true}
                        role="button"
                        actionCall={(event)=>{
                
                            setTargetedEvent({})
                            
                            setIsClicked(false)
                        }}
                    >
                        <ExitPosterButton/>
                    </A11y>
                    <PosterLoading/>
    
            </group>
    
    
        </group>
        )
    }
    function SignUpButton(){
        const newA11y = useA11y()
        return(
            <group 
            ref={signUpButtonRef} 
            class="signUpButton" 
            position={[0.174,-0.03,-0.001]}
            scale={newA11y.focus || newA11y.hover? [1.35,1.35,3]:[1.3,1.3,1.3]}
            onPointerEnter={ (event) => {
                event.stopPropagation()
                 document.body.style.cursor = 'pointer'
                } }
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
        )
    }
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
    function ShowCalendarButton (){
        const a11y = useA11y()
        if(isGoing === true){
            return(
                <group 
                ref={calendarButtonRef} 
                class="Calendar Button"
                position={[-0.2,-0.33,-0.001]}
                scale={a11y.focus?[1,1.2,1]:[1,1,1]}        
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
        else{
            return(
                <>
                </>
            )
        }
    }
    function GoingToEventSticker (){
        return(
            <group 
                position={[0.2,-0.22,0.04]}
                rotation={[0,0,-posterTransform.rotation[2]]}
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
    function PosterLoading(){
        if(isPosterLoading){

            return (
                <group 
                position={[0-0,-0,0.04]}
                rotation={[0,0,(Math.PI*0.1)]}
                scale={[0.5,0.5,0.5]}
                class="goingSticker" 
                >
                    <mesh  
                    position={[0,0,0]}
                    rotation={[0,0,0]}
                    >
                        
                                    <planeGeometry args={[0.55,0.08,1]}/>
                                    <meshStandardMaterial color={`hsl(0, 0.00%, 0.00%)`}/>
                    </mesh>
                    <Text 
            color={"white"} 
            anchorX="left" 
            anchorY="top" 
            fontSize="0.06" 
            fontWeight="bold"
            overflowWrap="normal"
            maxWidth={0.5}
            position={[-0.24,0.04,0.001]}
            rotation={[0,0,0]}
            >
                LOADING FLYER
            </Text>
                </group>
        )
    }
    else{
        return (
            <>
            </>
        )
    }
    }
    async function handleSignUp(){
        setIsPosterLoading(true)
        if(isGoing === true){
            console.log("No longer attending")
            const attendeeData = {
                [profile.email]: profile.name
            }
            await removeAttendee(eventData, attendeeData)
            const targetedEventUpdate = {...targetedEvent}
            delete targetedEventUpdate.attendees[profile.email]
            console.log(targetedEvent)
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
        await setIsPosterLoading(false)
    }
    const handleIsGoing = async ()=>{
        setIsPosterLoading(true)
        if(eventData.attendees[profile.email]){
            await setIsGoing(true)
        }
        if(calendarEventId){
            console.log(eventData.name.text, " is in Calendar")
            await setIsInUserCalendar(true)
        }
        setIsPosterLoading(false)
    }

    useEffect(()=>{
        handleIsGoing()
    },[profile])

    useFrame((state)=>{
        isfocused? posterRef.current.position.z = posterTransform.position[2]+0.1: posterRef.current.position.z= posterTransform.position[2];
        isClicked? posterRef.current.position.z = state.camera.position.z - 1: posterRef.current.position.z= posterTransform.position[2];
        isClicked? posterRef.current.position.x = state.camera.position.x/1.2: posterRef.current.position.x= posterTransform.position[0];
        isClicked? posterRef.current.position.y = state.camera.position.y/1.1: posterRef.current.position.y= posterTransform.position[1];
        isClicked? posterRef.current.rotation.z = 0: posterRef.current.rotation.z= posterTransform.rotation[2];
        isClicked? posterRef.current.rotation.y = state.camera.rotation.y: posterRef.current.rotation.y= 0;    
        isClicked? posterRef.current.rotation.x = state.camera.rotation.x: posterRef.current.rotation.x= 0;    
    })

    const posterMap = useLoader(TextureLoader, "./homes-8194751_640.png")
    let imageWidth = 0.25
    let imageHeight = 0.25
   const date = new Date(eventData.start.utc)
    
    return(
        <>
        <A11y
            disabled={targetedEvent.id?true:false}
            role="button"
            actionCall={(event)=>{
                
                setTargetedEvent(eventData)
                
                setIsClicked(true)
            }}
        >
            <PosterMesh/>
        </A11y>
        </>
    )
}



export default Poster