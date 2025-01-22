import { useFrame, useLoader } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { BoxGeometry, MeshStandardMaterial, TextureLoader } from "three"
import { useEffect, useRef, useState } from "react"
import { addAttendee, removeAttendee } from "./api"

function Poster({yRotation, xPosition,yPosition,zPosition, image, color}){
    const [isClicked, setIsClicked]= useState(false)
    const [isfocused, setIsFocused]= useState(false)
    const [isGoing, setIsGoing]= useState(false)
    const posterRef = useRef()
    const signUpButtonRef = useRef()
    const user = "user@email.com"

    useEffect(()=>{
        const handleIsGoing = async ()=>{
            console.log(image.attendees)
            if(image.attendees[user]){
                await setIsGoing(true)
            }
            else{
                console.log("Didn't work")
            }
        }
        handleIsGoing()
    },[])

    useFrame((state)=>{
        isfocused? posterRef.current.position.z = zPosition+0.1: posterRef.current.position.z= zPosition;
        isClicked? posterRef.current.position.z = state.camera.position.z -1: posterRef.current.position.z= zPosition;
        isClicked? posterRef.current.position.x = state.camera.position.x/1.5: posterRef.current.position.x= xPosition;
        isClicked? posterRef.current.position.y = state.camera.position.y/1.5: posterRef.current.position.y= yPosition;
        isClicked? posterRef.current.rotation.z = 0: posterRef.current.rotation.z= yRotation;
        isClicked? posterRef.current.rotation.y = state.camera.rotation.y: posterRef.current.rotation.y= 0;    
        isClicked? posterRef.current.rotation.x = state.camera.rotation.x: posterRef.current.rotation.x= 0;    
    })

    const posterMap = useLoader(TextureLoader, image.logo.url)
    const aspectRatio = image.logo.original.height/image.logo.original.width
    let imageHeight = 0
    let imageWidth = 0
    if(aspectRatio > 0){
        imageHeight = 0.3
        imageWidth = 0.3*aspectRatio
    }
    else{
        imageHeight = 0.3*aspectRatio
        imageWidth = 0.3
    }
    const date = new Date(image.start.local)
    function GoingToEventSticker (){
        return(
            <group 
                position={[0.25,0.3,0.04]}
                rotation={[0,0,-yRotation]}
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

    function handleSignUp(){
        if(isGoing === true){
            console.log("No longer attending")
            removeAttendee(image.id)
        }
        else{
            console.log("signed Up!")
            addAttendee(image.id)
        }
        setIsGoing(!isGoing)
    }
    return(
        <>
        <group 
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
                
                setIsClicked(true)
            }}
            onPointerMissed={()=>{
                setIsClicked(false)
            }}
            >
            {isGoing ? GoingToEventSticker(): null}
            <group class="posterHeader">
                <Text 
                color={`hsl(${color}, 100%, 95%)`} 
                anchorX="left" 
                anchorY="top" 
                fontSize="0.04"
                fontWeight="bold"
                overflowWrap="normal"
                maxWidth={0.5}
                position={[-0.28,0.44,0]}
                >
                    {image.name.text}
                </Text>
                <mesh  
                    position={[0,0.35,-0.001]}>
                            <planeGeometry args={[0.6,0.2,1]}/>
                            <meshStandardMaterial color={`hsl(${color}, 100%, 10%)` }/>
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
                    {`£${image.price}`}
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
                    position={[-0.2,-0.33,-0.001]}
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

            </group>
            <group class="body">
                <Text 
                color={`hsl(${color}, 100%, 10%)`} 
                anchorX="left" 
                anchorY="top" 
                fontSize="0.02" 
                fontWeight="bold"
                overflowWrap="normal"
                maxWidth={0.5}
                position={[-0.28,0.24,0]}
                >
                    {image.description.text}
                </Text>
                <mesh  
                position={[0,0,-0.0015]}>
                                <planeGeometry args={[0.6,0.9,1]}/>
                                <meshStandardMaterial color={`hsl(${color}, 50%, 70%)` }/>
                </mesh>
                <mesh  
                position={[0,-0.05,0]}>
                                <planeGeometry args={[imageHeight, imageWidth]}/>
                                <meshStandardMaterial map={posterMap}/>
                </mesh>
                <mesh  
                position={[0,-0.05,-0.001]}>
                                <planeGeometry args={[imageHeight+0.03, imageWidth+0.03]}/>
                                <meshStandardMaterial color={`hsl(${color}, 100%, 15%)`}/>
                </mesh>
            </group>

        </group>
        </>
    )
}
export default Poster