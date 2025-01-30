import { Canvas } from "@react-three/fiber";
import Poster from "./poster";
import Events from "../Events";
import Floor from "./floor";
import { Suspense, useEffect, useState } from "react";
import { NotEqualStencilFunc } from "three";
import {OrbitControls, Environment}from '@react-three/drei';
import NoticeBoard from "./noticeboard";
import { fetchStaffMember } from "./api";
function Scene ({setIsStaff}){
    const  [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile]=useState({})
    const [isSignedIn, setIsSignedIn]=useState(false)
    

    const handleProfile = async()=>{
        if(profile.email){
          console.log("profile: ", profile)
          const staffResponse = await fetchStaffMember(profile.email)
          if(staffResponse.staffCheck){
            setIsStaff(true)
          }
          console.log(staffResponse)
          setIsSignedIn(true)
        }
        else{
          setIsSignedIn(false)
        }
    }
    
    useEffect(()=>{
        handleProfile()
        }, [profile])
    return(
        <>
        <Canvas>
            <Suspense fallback={null}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <NoticeBoard isSignedIn={isSignedIn} isLoading={isLoading} setProfile={setProfile}/>
            <Floor/>
            <Events isSignedIn={isSignedIn} isLoading={isLoading} profile={profile} setIsLoading={setIsLoading}/>
            <OrbitControls
            minAzimuthAngle={-Math.PI / 5}
            maxAzimuthAngle={Math.PI / 5}
            minPolarAngle={Math.PI/ 4}
            maxPolarAngle={Math.PI - Math.PI / 3}
            />
            </Suspense>
        </Canvas>
        </>
    )
}

export default Scene