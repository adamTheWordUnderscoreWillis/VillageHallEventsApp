import { Group } from "three"



function NoticeBoard (){
    return(
        <>
            <group>
                <mesh >
                    <planeGeometry args={[4,3,1]}/>
                    <meshStandardMaterial color={"cyan"}/>
                </mesh>
                <mesh position={[0,0,-0.05]} rotation={[0,(Math.PI), 0]} >
                    <planeGeometry args={[4,3,1]}/>
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