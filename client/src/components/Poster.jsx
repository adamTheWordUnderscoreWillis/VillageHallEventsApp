import { useFrame, useLoader } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import {TextureLoader } from "three"
import { useEffect, useRef, useState } from "react"
import { addAttendee, addEventToUserCalendar, removeAttendee, removeEventFromUserCalendar } from "./api"
import { A11y, A11ySection, useA11y } from "@react-three/a11y"
import { handleError } from "./errorHandling"
function Poster({
    posterTransform,
    eventData,
    color,
    profile,
    user, 
    calendarEventId, 
    setTargetedEvent, 
    targetedEvent,
    isViewingPoster,
    setIsViewingPoster
}){
    const [isClicked, setIsClicked] = useState(false)
    const [isGoing, setIsGoing] = useState(false)
    const [isPosterLoading, setIsPosterLoading] = useState()
    const [calenderID, setCalendarId] = useState(calendarEventId)
    const [isInUserCalendar, setIsInUserCalendar] = useState(false)
    const posterRef = useRef()
    const colourPalette = {
        banner: `hsl(${color}, 50%, 60%)`,
        body: `hsl(${(color+180)%360}, 50%, 70%)`,
        bannerText: `hsl(${(color+180)%360}, 80%, 50%)`,
        bodyText: `hsl(${(color+180)%360}, 70%, 10%)`,
        buttonText: `hsl(${(color+180)%360}, 70%, 93%)`,
        posterButton: `hsl(${(color)%360}, 100%, 30%)`,
        isGoing: `hsl(${(color+180)%360}, 40%, 50%)`
    }

    const Pounds = new Intl.NumberFormat(
        'en-GB',
        {
            style: 'currency',
            currency: 'GBP'
        }
    )
    
    function PosterMesh (){
        const a11y = useA11y()
        return(
        <group
        scale={isClicked?[1.2,1.2,1.2]:a11y.focus || a11y.hover?[1.4,1.4,1.4]:[1.2,1.2,1.2]}
        position={posterTransform.position}
        rotation={posterTransform.rotation}
        ref={posterRef}
            
            >
            {isGoing || isPosterLoading ? GoingToEventSticker(): null}
            <group class="posterHeader">
                <Text 
                color={colourPalette.bodyText} 
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
                            <meshStandardMaterial color={colourPalette.banner }/>
                </mesh>
            </group>
            <group class="body">
                <Text 
                color={colourPalette.bodyText} 
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
                                <meshStandardMaterial color={colourPalette.body }/>
                </mesh>
                <mesh  
                position={[0.175,0.124,0]}>
                                <planeGeometry args={[imageWidth, imageHeight ]}/>
                                <meshStandardMaterial map={posterMap}/>
                </mesh>
                <mesh  
                position={[0.175,0.124,-0.001]}>
                                <planeGeometry args={[imageWidth+0.01, imageHeight+0.01]}/>
                                <meshStandardMaterial color={colourPalette.banner}/>
                </mesh>
            </group>
            <group class="posterFooter">
                <Text 
                color={colourPalette.bodyText} 
                anchorX="left" 
                anchorY="top" 
                fontSize="0.06"
                fontWeight="bold"
                overflowWrap="normal"
                maxWidth={0.5}
                position={[-0.28,-0.35,0]}
                >
                    {Pounds.format(eventData.price)}
                </Text>
                <Text 
                color={colourPalette.bodyText} 
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
                color={colourPalette.bodyText} 
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
                                    <meshStandardMaterial color={colourPalette.banner }/>
                    </mesh>
                    <A11y
                        disabled={isPosterLoading || !isClicked?true:false}
                        role="button"
                        description="Button to to sign up for event or cancel your booking if you're already going."
                        actionCall={handleSignUp}
                        onPointerEnter={(event)=>{
                            event.stopPropagation()
                        }}
                    >
                        <SignUpButton/>
                    </A11y>
                    <A11y
                        description="Button to add event to your google calendar"
                        disabled={!isGoing|| !isClicked|| isPosterLoading ?true:false}
                        role="button"
                        actionCall={handlecalendarEvent}
                        onPointerEnter={(event)=>{
                            event.stopPropagation()
                        }}
                    >
                        <ShowCalendarButton/>
                    </A11y>
                    <A11y
                        disabled={!isClicked?true:false}
                        role="button"
                        description="Exits the selected poster"
                        actionCall={(event)=>{
                
                            setIsViewingPoster(false)
                            setIsClicked(false)
                        }}
                        onPointerEnter={(event)=>{
                            event.stopPropagation()
                        }}
                    >
                        <ExitPosterButton/>
                    </A11y>
    
            </group>
    
    
        </group>
        )
    }
    function SignUpButton(){
        const newA11y = useA11y()
        return(
            <group 
            class="signUpButton" 
            position={[0.174,-0.03,-0.001]}
            scale={newA11y.focus || newA11y.hover? [1.35,1.35,3]:[1.3,1.3,1.3]}
            >
                <mesh  
                position={[0,0,0]}>
                                <planeGeometry args={[0.2,0.04,1]}/>
                                <meshStandardMaterial color={isGoing? `hsl(0, 100.00%, 60.40%)` :colourPalette.posterButton }/>
                </mesh>
                <Text 
        color={isGoing?colourPalette.buttonText:colourPalette.buttonText} 
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
                setIsPosterLoading(true)
                await removeEventFromUserCalendar(user, calenderID)
                setIsInUserCalendar(false)
                setCalendarId("")
            }
            catch(err){
                handleError(err)
            }
            setIsPosterLoading(false)
        }
        else{
            try{
                setIsPosterLoading(true)
                const newEvent = await addEventToUserCalendar(user,eventData)
                if(!newEvent){
                    throw {msg: "Could not get Events", Status: 404}
                }
                setCalendarId(newEvent.id)
                setIsInUserCalendar(true)
                
            }
            catch(err){
                handleError(err)
            }
            setIsPosterLoading(false)
        }
    }
    function ShowCalendarButton (){
        const a11y = useA11y()
        if(isGoing === true){
            return(
                <group 
                class="Calendar Button"
                position={[0.16,-0.1,-0.001]}
                scale={a11y.focus|| a11y.hover?[1.2,1.2,1.2]:[1,1,1]}        
                >
                    <mesh  
                    position={[0.01,-0.025,0]}>
                                    <planeGeometry args={[0.26,0.1,1]}/>
                                    <meshStandardMaterial color={isInUserCalendar?colourPalette.posterButton:colourPalette.posterButton }/>
                    </mesh>
                    <Text 
            color={colourPalette.buttonText} 
            anchorX="left" 
            anchorY="top" 
            fontSize="0.035" 
            fontWeight="bold"
            overflowWrap="normal"
            maxWidth={0.9}
            position={[-0.11,0.03,0.001]}
            >
                {isInUserCalendar? "Remove from\ncalendar?" :"Add to\ncalendar?"}
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
    function ExitPosterButton(){
        const a11y = useA11y()
        if(isClicked){
            return (
                <group 
                    position={[-0.2,-0.45,0.04]}
                    rotation={[0,0,0]}
                    scale={a11y.focus || a11y.hover?[0.85,0.85,0.85]:[0.8,0.8,0.8]}
                        class="goingSticker" 
                        >
                            <mesh  
                            position={[0,0,0]}
                            rotation={[0,0,0]}
                            >
                                
                                            <planeGeometry args={[0.35,0.08,1]}/>
                                            <meshStandardMaterial color={colourPalette.posterButton}/>
                            </mesh>
                            <Text 
                    color={colourPalette.buttonText} 
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
    function GoingToEventSticker (){
        return(
            <group 
                position={[0.25,-0.29,0.04]}
                rotation={[0,0,-posterTransform.rotation[2]]}
                scale={[1.3,1.3,1.3]}
                    class="goingSticker" 
                    >
                        <mesh  
                        position={[0,0,0]}
                        rotation={[0,0,0]}
                        >
                            
                                        <planeGeometry args={[0.35,0.08,1]}/>
                                        <meshStandardMaterial color={isPosterLoading?`hsl(132, 6.80%, 14.30%)`:`hsl(133, 60%, 50%)`}/>
                        </mesh>
                        <Text 
                color={isPosterLoading?`hsl(0, 0.00%, 94.10%)`:`hsl(${color}, 100%, 10%)`} 
                anchorX="left" 
                anchorY="top" 
                fontSize="0.06"
                fontWeight="bold"
                overflowWrap="normal"
                maxWidth={0.5}
                position={[-0.14,0.045,0.001]}
                rotation={[0,0,0]}
                >
                    {isPosterLoading?" Loading!":"I'm Going!"}
                </Text>
                    </group>
        )
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
            await setTargetedEvent(targetedEventUpdate)
            if(isInUserCalendar){
                try{
                    await removeEventFromUserCalendar(user, calenderID)
                    setIsInUserCalendar(false)
                    setCalendarId("")
                }
                catch(err){
                    handleError(err)
                }
            }
        }
        else{
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
            await setIsInUserCalendar(true)
        }
        setIsPosterLoading(false)
    }

    useEffect(()=>{
        handleIsGoing()
    },[profile])

    useFrame((state)=>{
        isClicked? posterRef.current.position.z = state.camera.position.z - 1.3: posterRef.current.position.z= posterTransform.position[2];
        isClicked? posterRef.current.position.x = state.camera.position.x/1.4: posterRef.current.position.x= posterTransform.position[0];
        isClicked? posterRef.current.position.y = state.camera.position.y/1.1: posterRef.current.position.y= posterTransform.position[1];
        isClicked? posterRef.current.rotation.z = 0: posterRef.current.rotation.z= posterTransform.rotation[2];
        isClicked? posterRef.current.rotation.y = state.camera.rotation.y: posterRef.current.rotation.y= 0;    
        isClicked? posterRef.current.rotation.x = state.camera.rotation.x: posterRef.current.rotation.x= 0;    
    })

    const posterMap = useLoader(TextureLoader, "./homes-8194751_640.webp")
    let imageWidth = 0.25
    let imageHeight = 0.25
   const date = new Date(eventData.start.utc)
    
    return(
        <>
        <A11ySection
            label={`Flyer for and event titled ${eventData.name.text}`}
            description={`A flyer for an event called ${eventData.name.text} on ${date.toDateString()} at ${date.toLocaleTimeString("en-US",{hour:"2-digit", minute: "2-digit"})}`}
        >
            <A11y
                disabled={isViewingPoster ?true:false}
                role="button"
                description={`Flyer for and event titled ${eventData.name.text}`}
                activationMsg={`${eventData.name.text} flyer selected`}
                actionCall={(event)=>{
                    setIsViewingPoster(true)
                    
                    setTargetedEvent(eventData)
                    
                    setIsClicked(true)
                }}
                onPointerEnter={(event)=>{
                    event.stopPropagation()
                }}
                onPointerMissed={()=>{
                    setIsClicked(false)
                    setIsViewingPoster(false)
                }}
                >
                <PosterMesh/>
            </A11y>
        </A11ySection>
        </>
    )
}



export default Poster