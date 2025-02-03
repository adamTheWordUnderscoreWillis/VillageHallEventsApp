import { Canvas } from "@react-three/fiber";
import Events from "../Events";
import Floor from "./floor";
import { Suspense, useEffect, useState } from "react";
import { NotEqualStencilFunc } from "three";
import {OrbitControls, Environment, Sky}from '@react-three/drei';
import NoticeBoard from "./noticeboard";
import { fetchStaffMember, fetchUserCalendarEvents } from "./api";
import { StaffNavBar } from "./StaffNavBar";
import { handleError } from "./errorHandling";
import {A11yAnnouncer} from "@react-three/a11y"
function Scene (){
    const  [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile]=useState({})
    const [isSignedIn, setIsSignedIn]=useState(false)
    const [user, setUser]=useState({})
    const [isStaff, setIsStaff]=useState(false)
    const [targetedEvent, setTargetedEvent]= useState({})
    const [staffAction, setStaffAction] = useState()
    const [isError, setIsError] = useState(false)
    const [errorText, setErrorText] = useState(null)
    const  [events, setEvents] = useState(null)
    
    

    const handleProfile = async()=>{
        if(profile.email){
          try{
            const staffResponse = await fetchStaffMember(profile.email)
            if(staffResponse.staffCheck){
              setIsStaff(true)
            }
          }
          catch(err){
            handleError(err)
          }
          setIsSignedIn(true)
        }
        else{
          setIsSignedIn(false)
        }
    }
    
    useEffect(()=>{
        handleProfile()
        }, [profile])
    const sunPosition = [2,1.6,2]
    return(
        <>
        {isStaff?
          <StaffNavBar 
            setStaffAction={setStaffAction} 
            profile={profile}
            setTargetedEvent={setTargetedEvent} 
            targetedEvent={targetedEvent}
            events={events}
            staffAction={staffAction}
            />
            :null}
        <Canvas 
        shadows
        >
            <Sky 
              sunPosition={sunPosition}
              />
            <Suspense 
              fallback={null}
              >
            <ambientLight 
              intensity={Math.PI / 2} 
              />
            <directionalLight 
              castShadow position={sunPosition} 
              angle={0.15} 
              penumbra={1} 
              decay={0} 
              intensity={Math.PI} 
              />
            <NoticeBoard 
            targetedEvent={targetedEvent}
              setIsStaff={setIsStaff} 
              isSignedIn={isSignedIn} 
              isLoading={isLoading} 
              setProfile={setProfile} 
              user={user} 
              setUser={setUser}
              isError={isError}
              errorText={errorText}
              />
            <Floor/>
            <Events 
              staffAction={staffAction} 
              targetedEvent={targetedEvent}
              setTargetedEvent={setTargetedEvent} 
              isSignedIn={isSignedIn} 
              isLoading={isLoading} 
              profile={profile} 
              setIsLoading={setIsLoading}
              user={user}
              setIsError={setIsError}
              setErrorText={setErrorText}
              events={events}
              setEvents={setEvents}
            />
            <OrbitControls
              minAzimuthAngle={-Math.PI*0.1}
              maxAzimuthAngle={Math.PI*0.1}
              minPolarAngle={Math.PI*0.47}
              maxPolarAngle={0}
              enablePan={false}
              maxDistance={7}
              minDistance={3}
            />
            </Suspense>
        </Canvas>
        <A11yAnnouncer/>
        </>
    )
}

export default Scene