import { Canvas } from "@react-three/fiber";
import Events from "../Events";
import Floor from "./floor";
import { Suspense, useEffect, useState } from "react";
import { NotEqualStencilFunc } from "three";
import {OrbitControls, Environment, Sky}from '@react-three/drei';
import NoticeBoard from "./noticeboard";
import { fetchStaffMember, fetchUserCalendarEvents } from "./api";
function Scene ({setIsStaff}){
    const  [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile]=useState({})
    const [isSignedIn, setIsSignedIn]=useState(false)
    const [user, setUser]=useState({})
    const  [calendarEvents, setcalendarEvents] = useState([])
    

    const handleProfile = async()=>{
        if(profile.email){
          const staffResponse = await fetchStaffMember(profile.email)
          const calendarEventsData = await fetchUserCalendarEvents(user)
          console.log("Calendar Events: ", calendarEventsData)
          setcalendarEvents(calendarEventsData)
          if(staffResponse.staffCheck){
            setIsStaff(true)
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
        <Canvas shadows>
            <Sky sunPosition={sunPosition}/>
            <Suspense fallback={null}>
            <ambientLight intensity={Math.PI / 2} />
            <directionalLight castShadow position={sunPosition} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <NoticeBoard isSignedIn={isSignedIn} isLoading={isLoading} setProfile={setProfile} user={user} setUser={setUser}/>
            <Floor/>
            <Events isSignedIn={isSignedIn} isLoading={isLoading} profile={profile} setIsLoading={setIsLoading}user={user} calendarEvents={calendarEvents}/>
            <OrbitControls
            minAzimuthAngle={-Math.PI*0.25}
            maxAzimuthAngle={Math.PI*0.25}
            minPolarAngle={Math.PI*0.4}
            maxPolarAngle={0}
            // maxZoom={0}
            // minZoom={20}
            enablePan={false}
            maxDistance={7}
            minDistance={3}
            />
            </Suspense>
        </Canvas>
        </>
    )
}

export default Scene