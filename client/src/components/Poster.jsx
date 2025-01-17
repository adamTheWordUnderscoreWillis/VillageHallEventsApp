import { useLoader } from "@react-three/fiber"
import { BoxGeometry, MeshStandardMaterial, TextureLoader } from "three"


function Poster({image}){
    console.log("This is the Poster Image, in the Poster.js", image)
    const posterMap = useLoader(TextureLoader, image)
    return(
        <mesh position={[1,1,1]}>
                        <planeGeometry args={[2.1, 2.97,1]}/>
                        <meshStandardMaterial map={posterMap}/>
                    </mesh>
    )
}
export default Poster