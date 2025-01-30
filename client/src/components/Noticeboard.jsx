import { Text } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { Group } from "three"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { addEventToUserCalendar, getUsernfo } from "./api";

function NoticeBoard ({isLoading, isSignedIn, setProfile, user, setUser}){
    const signInButtonRef = useRef()
    const signOutButtonRef = useRef()
    

    const login = useGoogleLogin({
        onSuccess: tokenResponse => setUser(tokenResponse),
      });
    
         useEffect(()=>{
          //  gapiLoaded()
            // gisLoaded()
         }, [])
    
         useEffect(()=>{
          const intialiseUser = async ()=>{
              if(user.access_token){
                const profileData = await getUsernfo(user)
                await setProfile(profileData)
                
              }
          }
          intialiseUser()
        },[user]);

    const logout = ()=>{
        console.log("log out")
        googleLogout();
        setProfile({})
    }

    function loadingBanner (){
        return(
            <group>
                    <mesh position={[0,0,0.1]} rotation={[0,0,0]} >
                        <planeGeometry args={[4,3,1]}/>
                        <meshStandardMaterial color={"brown"}/>
                    </mesh>
                    <group position={[0,0,0.3]} rotation={[0,0,(Math.PI*0.1)]}>
                        <mesh>
                            <boxGeometry args={[3,0.5,0.1]}/>
                            <meshStandardMaterial color={"red"}/>
                        </mesh>
                        <Text 
              color="black" 
              anchorX="centre" 
              anchorY="middle" 
              fontSize="0.4" 
              position={[-0.8,0,0.11]}>
                LOADING
              </Text>
    
                    </group>
            </group>
        )
    }
    function signInBanner (){
        return(
            <group
            >
                    <mesh   position={[0,0,0.1]} rotation={[0,0,0]} >
                        <planeGeometry args={[4,3,1]}/>
                        <meshStandardMaterial color={"brown"}/>
                    </mesh>
                    <group position={[0,0,0.3]} rotation={[0,0,0]}>
                        <mesh
                            ref={signInButtonRef}
                            onPointerEnter={ (event) => {
                                event.stopPropagation()
                                document.body.style.cursor = 'pointer'
                            } }
                            onPointerLeave={
                                () => { 
                                    document.body.style.cursor = 'default'
                                    
                                } }
                            onClick={()=>{login()}}
                        >
                            <boxGeometry args={[3,0.5,0.1]}/>
                            <meshStandardMaterial color={"red"}/>
                        </mesh>
                        <Text 
              color="black" 
              anchorX="centre" 
              anchorY="middle" 
              fontSize="0.4" 
              position={[-1.3,0,0.11]}>
                Please Sign In
              </Text>
    
                    </group>
            </group>
        )
    }
    
    function signOutButton (){
        return(
            <group 
            position={[1,-1.8,1.5]} 
            rotation={[0,0,0]}
            ref={signOutButtonRef}
                            onPointerEnter={ (event) => {
                                event.stopPropagation()
                                document.body.style.cursor = 'pointer'
                            } }
                            onPointerLeave={
                                () => { 
                                    document.body.style.cursor = 'default'
                                    
                                } }
                            onClick={()=>{logout()}}
            >
                <mesh position={[0,-1,-0.2]} rotation={[0,0,(Math.PI * 0.5)]}>
                    <boxGeometry args={[3.2,0.1,0.1]}/>
                    <meshStandardMaterial color={"brown"}/>
                </mesh>
                        <mesh
                            
                        >
                            <boxGeometry args={[1,1,0.1]}/>
                            <meshStandardMaterial color={"red"}/>
                        </mesh>
                        <Text 
                            color="black" 
                            anchorX="centre" 
                            anchorY="middle" 
                            fontSize="0.4" 
                            position={[-0.48,0.25,0.11]}>
                                SIGN
                        </Text>
                        <Text 
                            color="black" 
                            anchorX="centre" 
                            anchorY="middle" 
                            fontSize="0.4" 
                            position={[-0.42,-0.15,0.11]}>
                                OUT
                        </Text>
    
                    </group>
        )

    }

    return(
        <>
        {isLoading?loadingBanner(): null}
        {!isLoading&&!isSignedIn?signInBanner(): null}
        {!isLoading&&isSignedIn?signOutButton(): null}

        
            <group>
                {/* BackBoard */}
                <mesh >
                    <planeGeometry args={[4,3,1]}/>
                    <meshStandardMaterial color={"beige"}/>
                </mesh>
                <mesh position={[0,0,-0.05]} rotation={[0,(Math.PI), 0]} >
                    <planeGeometry args={[4,3,1]}/>
                    <meshStandardMaterial color={"brown"}/>
                </mesh>
                
                {/* Wooden Boarder */}
                <Text 
          color="black" 
          anchorX="centre" 
          anchorY="middle" 
          fontSize="0.15" 
          position={[-1.6,1.8,0.11]}>
            LITTLE TIDFORD VILLAGE HALL NOITCEBOARD
          </Text>
                <mesh position={[0,1.8,-0.1]}>
                    <boxGeometry args={[3.6,0.2,0.4]}/>
                    <meshStandardMaterial color={"brown"}/>
                </mesh>
                <mesh position={[0,1.6,-0.1]}>
                    <boxGeometry args={[4.4,0.2,0.4]}/>
                    <meshStandardMaterial color={"brown"}/>
                </mesh>
                <mesh position={[0,-1.6,0]}>
                    <boxGeometry args={[4.4,0.2,0.2]}/>
                    <meshStandardMaterial color={"brown"}/>
                </mesh>
                <mesh position={[2.1,0,0]} rotation={[0,0,(Math.PI * 0.5)]}>
                    <boxGeometry args={[3,0.2,0.2]}/>
                    <meshStandardMaterial color={"brown"}/>
                </mesh>
                <mesh position={[-2.1,0,0]} rotation={[0,0,(Math.PI * 0.5)]}>
                    <boxGeometry args={[3,0.2,0.2]}/>
                    <meshStandardMaterial color={"brown"}/>
                </mesh>
                {/* Legs */}
                <mesh position={[1,-1,-0.2]} rotation={[0,0,(Math.PI * 0.5)]}>
                    <boxGeometry args={[5,0.2,0.2]}/>
                    <meshStandardMaterial color={"brown"}/>
                </mesh>
                <mesh position={[-1,-1,-0.2]} rotation={[0,0,(Math.PI * 0.5)]}>
                    <boxGeometry args={[5,0.2,0.2]}/>
                    <meshStandardMaterial color={"brown"}/>
                </mesh>
            </group>
        </>
    )
}

export default NoticeBoard