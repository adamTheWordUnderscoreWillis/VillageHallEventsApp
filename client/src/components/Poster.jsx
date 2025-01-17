import { useLoader } from "@react-three/fiber"
import { BoxGeometry, MeshStandardMaterial, TextureLoader } from "three"


function Poster({yRotation, xPosition,yPosition,zPosition, image}){
    const posterMap = useLoader(TextureLoader, image.url)
    const aspectRatio = image.original.height/image.original.width
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
    return(
        <group>
            <mesh rotation={[0,0,yRotation]} position={[xPosition,yPosition,zPosition-0.0001]}>
                            <planeGeometry args={[0.6,0.9,1]}/>
                            <meshStandardMaterial color={"yellow"}/>
            </mesh>
            
            <mesh rotation={[0,0,yRotation]} position={[xPosition,yPosition,zPosition]}>
                            <planeGeometry args={[imageHeight, imageWidth]}/>
                            <meshStandardMaterial map={posterMap}/>
            </mesh>

        </group>
    )
}
export default Poster