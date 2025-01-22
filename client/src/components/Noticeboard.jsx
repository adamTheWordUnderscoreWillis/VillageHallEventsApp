import { Text } from "@react-three/drei"
import { Group } from "three"
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
function NoticeBoard ({isLoading}){
    return(
        <>
        {isLoading?loadingBanner(): null}
        
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