import { useLoader } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { BoxGeometry, MeshStandardMaterial, TextureLoader } from "three"


function Poster({yRotation, xPosition,yPosition,zPosition, image}){
    const color = Math.random()*255
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
        position={[xPosition,yPosition,zPosition]}
        rotation={[0,0,yRotation]} 
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