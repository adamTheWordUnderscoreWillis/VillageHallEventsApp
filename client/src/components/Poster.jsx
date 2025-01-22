import { useFrame, useLoader } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { BoxGeometry, MeshStandardMaterial, TextureLoader } from "three"
import { useRef, useState } from "react"

function Poster({yRotation, xPosition,yPosition,zPosition, image, color}){
    const [isClicked, setIsClicked]= useState(false)
    const [isfocused, setIsFocused]= useState(false)
    const posterRef = useRef()
    useFrame((state, delta)=>{
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
    return(
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
            position={[0,0,-0.0015]}>
                            <planeGeometry args={[0.6,0.9,1]}/>
                            <meshStandardMaterial color={`hsl(${color}, 50%, 70%)` }/>
            </mesh>
            <mesh  
            position={[0,0.35,-0.001]}>
                            <planeGeometry args={[0.6,0.2,1]}/>
                            <meshStandardMaterial color={`hsl(${color}, 100%, 10%)` }/>
            </mesh>
            <mesh  
            position={[0,-0.4,-0.001]}>
                            <planeGeometry args={[0.6,0.1,1]}/>
                            <meshStandardMaterial color={`hsl(${color}, 100%, 10%)` }/>
            </mesh>
            
            <mesh  
            position={[0,-0.1,0]}>
                            <planeGeometry args={[imageHeight, imageWidth]}/>
                            <meshStandardMaterial map={posterMap}/>
            </mesh>
            <mesh  
            position={[0,-0.1,-0.001]}>
                            <planeGeometry args={[imageHeight+0.03, imageWidth+0.03]}/>
                            <meshStandardMaterial color={`hsl(${color}, 100%, 15%)`}/>
            </mesh>

        </group>
    )
}
export default Poster