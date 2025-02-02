import { Text } from "@react-three/drei"

export const handleError= (err)=>{
    console.log(err)
    if(err.code === "ERR_NETWORK"){
        return(
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
        )
    }
    else if(err.message === "AxiosError: Request failed with status code 401"){
        return(
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
        )
    }
}