import { Text } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { Group, RepeatWrapping, TextureLoader } from "three"
import { googleLogout, hasGrantedAllScopesGoogle, useGoogleLogin } from "@react-oauth/google";
import { addEventToUserCalendar, getUsernfo } from "./api";
import { useLoader } from "@react-three/fiber";
import { A11y, useA11y } from "@react-three/a11y";

function NoticeBoard ({isError, errorText, isLoading, isSignedIn, setProfile, user, setUser, setIsStaff, targetedEvent, isViewingPoster}){
    const [signInFocussed, setSignInFocussed] = useState(false)
    const signInButtonRef = useRef()
    const signOutButtonRef = useRef()
    
    const dimensions = {
        boardHeight: 5,
        boardWidth: 3 + screen.width*0.0005,
        boardDepth: 1,
        plankWidth: 0.2
    }
    const colorPalette = {
        NoticeBoardWood: `hsl(29, 88.70%, 27.60%)`,
        backBoard: `hsl(17, 100.00%, 91.00%)`,
        Loading: `hsl(0, 67.80%, 52.50%)`,
        signIN: `hsl(192, 94.80%, 38.00%)`,
        text: `hsl(0, 2.60%, 7.60%)`,
        titleText: `hsl(64, 100.00%, 68.80%)`,
        allySelection: `hsl(0, 0.00%, 100.00%)`

    }

    const backboardFabricColour = useLoader(TextureLoader, "./fabric_pattern_07_col_1_1k.webp")

    backboardFabricColour.repeat.set(4,5)
    backboardFabricColour.wrapS = RepeatWrapping
    backboardFabricColour.wrapT = RepeatWrapping
    
    useEffect(()=>{
     const intialiseUser = async ()=>{
         if(user.access_token){
           const profileData = await getUsernfo(user)
           await setProfile(profileData)
           
         }
     }
     intialiseUser()
   },[user]);

    const login = useGoogleLogin({
        scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
        onSuccess: async tokenResponse => {
            await hasGrantedAllScopesGoogle(
                tokenResponse,
               "https://www.googleapis.com/auth/calendar",
               "https://www.googleapis.com/auth/calendar.events",
               "https://www.googleapis.com/auth/userinfo.profile"
            )
            setUser(tokenResponse)
        },
      });
    
        

    const logout = ()=>{
        console.log("log out")
        googleLogout();
        setProfile({});
        setIsStaff(false)
    }

    function LoadingText(){
        if(isLoading){
            return(
                <group >
                        <mesh position={[0,0,0.05]} rotation={[0,0,0]} >
                            <planeGeometry args={[dimensions.boardWidth,dimensions.boardHeight,dimensions.boardDepth]}/>
                            <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
                        </mesh>
                        <group position={[0,0,0.1]} rotation={[0,0,(Math.PI*0.1)]}>
                            <mesh>
                                <boxGeometry args={[3,0.5,0.1]}/>
                                <meshStandardMaterial color={colorPalette.Loading}/>
                            </mesh>
                            
                            <Text 
                            color={colorPalette.text}
                            anchorX="centre" 
                            anchorY="middle" 
                            fontSize="0.4" 
                            position={[-0.8,0,0.11]}>
                                {isError? errorText : "LOADING"}
                            </Text>
                        </group>
                </group>
            )           
        }
        else if(!isLoading&&!isSignedIn){
            return(
                <group
                >
                        <mesh   position={[0,0,0.05]} rotation={[0,0,0]} >
                            <planeGeometry args={[dimensions.boardWidth,dimensions.boardHeight,dimensions.boardDepth]}/>
                            <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
                        </mesh>
                        <group position={[0,0,0.1]} rotation={[0,0,0]}>
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
                                <meshStandardMaterial color={colorPalette.Loading}/>
                            </mesh>
                            <Text 
                color={colorPalette.text} 
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
        else{
            return(
                <>
                </>
            )
        }
    }
    function LogInLogOutButton(){
        const a11y = useA11y()
        if(!isLoading){
            return(
                <group
                    position={[0,0,0]} 
                    scale={a11y.focus|| a11y.hover?[1.2,1.2,1.2]:[1,1,1]}
                    rotation={[0,0,0]}
                    ref={signOutButtonRef}
                    >
                        
                        <mesh
                            position={[0,0,0]}
                        >
                            <boxGeometry args={[1,1,0.1]}/>
                            <meshStandardMaterial 
                            color={a11y.focus|| a11y.hover?colorPalette.backBoard:isSignedIn?colorPalette.Loading:colorPalette.signIN}
                            />
                        </mesh>
                        <Text 
                            color={colorPalette.text}  
                            anchorX="center" 
                            anchorY="middle" 
                            fontSize="0.4" 
                            position={[0,0.25,0.11]}>
                                SIGN
                        </Text>
                        <Text 
                            color={colorPalette.text} 
                            anchorX="center" 
                            anchorY="middle" 
                            fontSize="0.4" 
                            position={[0,-0.15,0.11]}>
                                {isSignedIn?"OUT":"IN"}
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
    function LoginSignPost (){
        return (
            <group
                position={[(1+screen.width*0.0004),-1.5,0.6]} 
                scale={[1,1,1]}
                rotation={[0,-1,0]}
                ref={signOutButtonRef}
                >   
                <A11y
                    disabled={isViewingPoster?true:false}
                    role="button"
                    desription="The sign button that logs you in and out"
                    activationMsg={isSignedIn?"You have just signed out": "You have just signed in"}
                    actionCall={isSignedIn?logout:login}
                >
                    <LogInLogOutButton/>
                </A11y>
                    <mesh position={[0,-1,-0.2]} rotation={[0,0,(Math.PI * 0.5)]}>
                        <boxGeometry args={[3.2,0.1,0.1]}/>
                        <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
                    </mesh>
                </group>

        )

    }

    return(
        <>
        {/* {isError? errorText: null} */}
        
        <LoadingText/>

            <LoginSignPost/>
            <group>
                {/* BackBoard */}
                <mesh castShadow  >
                    < planeGeometry args={[dimensions.boardWidth,dimensions.boardHeight,dimensions.boardDepth]}/>
                    <meshStandardMaterial 
                    map={backboardFabricColour}
                    />
                </mesh>
                <mesh castShadow position={[0,0,-0.05]} rotation={[0,(Math.PI), 0]} >
                    <planeGeometry args={[dimensions.boardWidth,dimensions.boardHeight,dimensions.boardDepth]}/>
                    <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
                </mesh>
                
                {/* Wooden Boarder */}
                <Text 
          color={colorPalette.titleText}  
          anchorX="centre" 
          anchorY="middle" 
          fontSize="0.15" 
          position={[-0.6,(dimensions.boardHeight/2)+dimensions.plankWidth,0.11]}>
            LITTLE TIDFORD
          </Text>
                <Text 
          color={colorPalette.titleText}  
          anchorX="centre" 
          anchorY="middle" 
          fontSize="0.15" 
          position={[-1.1,((dimensions.boardHeight/2)+dimensions.plankWidth -0.18),0.11]}>
            VILLAGE HALL NOITCEBOARD
          </Text>
                <mesh castShadow position={[0,(dimensions.boardHeight/2)+dimensions.plankWidth,-0.1]}>
                    <boxGeometry args={[dimensions.boardWidth-(dimensions.plankWidth*2),0.2,0.4]}/>
                    <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
                </mesh>
                <mesh castShadow position={[0,(dimensions.boardHeight/2),-0.1]}>
                    <boxGeometry args={[
                        dimensions.boardWidth+(dimensions.plankWidth*2),
                        dimensions.plankWidth,
                        dimensions.plankWidth*2]}/>
                    <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
                </mesh>
                <mesh castShadow position={[0,-(dimensions.boardHeight/2),0]}>
                    <boxGeometry args={[
                        dimensions.boardWidth+(dimensions.plankWidth*2),
                        dimensions.plankWidth,
                        dimensions.plankWidth]}/>
                    <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
                </mesh>
                <mesh castShadow position={[dimensions.boardWidth/2,0,0]} rotation={[0,0,(Math.PI * 0.5)]}>
                    <boxGeometry args={[dimensions.boardHeight+(dimensions.plankWidth),dimensions.plankWidth,dimensions.plankWidth]}/>
                    <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
                </mesh>
                <mesh castShadow position={[-dimensions.boardWidth/2,0,0]} rotation={[0,0,(Math.PI * 0.5)]}>
                    <boxGeometry args={[dimensions.boardHeight+(dimensions.plankWidth),dimensions.plankWidth,dimensions.plankWidth]}/>
                    <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
                </mesh>
                {/* Legs */}
                <mesh castShadow position={[1,-1,-0.2]} rotation={[0,0,(Math.PI * 0.5)]}>
                    <boxGeometry args={[5,dimensions.plankWidth,dimensions.plankWidth]}/>
                    <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
                </mesh>
                <mesh castShadow position={[-1,-1,-0.2]} rotation={[0,0,(Math.PI * 0.5)]}>
                    <boxGeometry args={[5,dimensions.plankWidth,dimensions.plankWidth]}/>
                    <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
                </mesh>
            </group>
        </>
    )
}

export default NoticeBoard