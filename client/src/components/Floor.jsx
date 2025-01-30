
function Floor (){
    return(
        <>
            <mesh position={[0,-3.5,0]} rotation={[(Math.PI * - 0.5),0,0]}>
                <planeGeometry args={[100,20]}/>
                <meshStandardMaterial color={"green"}/>
            </mesh>
            {/* <mesh position={[0,60,-20]} rotation={[0,0,0]}>
                <planeGeometry args={[200,200]}/>
                <meshStandardMaterial color={"cyan"}/>
            </mesh> */}
        </>
    )
}

export default Floor