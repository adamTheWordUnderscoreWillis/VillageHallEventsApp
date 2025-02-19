import { Text } from "@react-three/drei"
export const handleError= (err)=>{
    console.log(err)

    const dimensions = {
        boardHeight: 5,
        boardWidth: 4,
        boardDepth: 1,
        plankWidth: 0.2
    }
    const colorPalette = {
        NoticeBoardWood: `hsl(29, 88.70%, 27.60%)`,
        backBoard: `hsl(29, 63.40%, 56.10%)`,
        Loading: `hsl(0, 67.80%, 52.50%)`,
        text: `hsl(0, 2.60%, 7.60%)`,
        titleText: `hsl(64, 100.00%, 68.80%)`,
    }
    if(err){
        console.log(err)
    }
    if(err.code === "ERR_NETWORK"){

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
                        <group>
                <Text 
                    color="black"
                    anchorX="centre" 
                    anchorY="middle" 
                    fontSize="0.3" 
                    position={[-1.2,0.1,0.11]}>
                        {err.message.toUpperCase()}
                    </Text>
                <Text 
                    color="black"
                    anchorX="centre" 
                    anchorY="middle" 
                    fontSize="0.1" 
                    position={[-0.9,-0.12,0.11]}>
                        Please reload the page or try again later
                    </Text>
            </group>
                    </group>
            </group>
           
        )
    }
    else if(err.message === "AxiosError: Request failed with status code 401"){
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
                        <group>
                <Text 
                    color="black"
                    anchorX="centre" 
                    anchorY="middle" 
                    fontSize="0.3" 
                    position={[-1,0.1,0.11]}>
                        BAD REQUEST
                    </Text>
                <Text 
                    color="black"
                    anchorX="centre" 
                    anchorY="middle" 
                    fontSize="0.1" 
                    position={[-0.8,-0.12,0.11]}>
                        Please head back to the main page
                    </Text>
            </group>
                    </group>
            </group>
            
        )
    }
    // else if(err.response.data.msg === "Internal Server Error"){
    //     return(
    //         <group >
    //                 <mesh position={[0,0,0.05]} rotation={[0,0,0]} >
    //                     <planeGeometry args={[dimensions.boardWidth,dimensions.boardHeight,dimensions.boardDepth]}/>
    //                     <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
    //                 </mesh>
    //                 <group position={[0,0,0.1]} rotation={[0,0,(Math.PI*0.1)]}>
    //                     <mesh>
    //                         <boxGeometry args={[3,0.5,0.1]}/>
    //                         <meshStandardMaterial color={colorPalette.Loading}/>
    //                     </mesh>
    //                     <group>
    //             <Text 
    //                 color="black"
    //                 anchorX="centre" 
    //                 anchorY="middle" 
    //                 fontSize="0.3" 
    //                 position={[-1.2,0.1,0.11]}>
    //                     {"Server Error"}
    //                 </Text>
    //             <Text 
    //                 color="black"
    //                 anchorX="centre" 
    //                 anchorY="middle" 
    //                 fontSize="0.1" 
    //                 position={[-0.9,-0.12,0.11]}>
    //                     Please reload the page or try again later
    //                 </Text>
    //         </group>
    //                 </group>
    //         </group>
           
    //     )
    // }
    else if(err.response.status === 500 || err.response.data.status){
        return (
            <group >
                    <group position={[0,0,0]} rotation={[0,0, 0]}>
                <Text 
                    color="black"
                    anchorX="centre" 
                    anchorY="middle" 
                    fontSize="0.3" 
                    position={[-0.2,0.05,0.11]}>
                        SERVER ERROR
                    </Text>
                    <Text 
                    color="black"
                    anchorX="centre" 
                    anchorY="middle" 
                    fontSize="0.1" 
                    position={[0.3,-0.12,0.11]}>
                        Give it a sec... and reload.
                    </Text>
                    </group>
            </group>
        )
    }
    else if(err.response.data && err.response.data.msg === 'There are no events in the database'){

        return (
            <group >
                    <group position={[0,0,0.1]} rotation={[0,0, 0]}>
                        <mesh>
                            <boxGeometry args={[dimensions.boardWidth,dimensions.boardHeight,dimensions.boardDepth]}/>
                            <meshStandardMaterial color={colorPalette.NoticeBoardWood}/>
                        </mesh>
                        <group>
                <Text 
                    color="black"
                    anchorX="centre" 
                    anchorY="middle" 
                    fontSize="0.3" 
                    position={[-1.3,0.05,0.11]}>
                        NO EVENTS, SORRY
                    </Text>
            </group>
                    </group>
            </group>
        )
    }
    else if (err.response.data.msg === "This endpoint ony accepts email addresses" ){
        
    }
    
}
