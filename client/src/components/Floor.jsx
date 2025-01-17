
function Floor (){
    return(
        <>
            <mesh position={[0,-3.5,0]} rotation={[(Math.PI * - 0.5),0,0]}>
                <planeGeometry args={[100,20,20]}/>
                <meshStandardMaterial color={"green"}/>
            </mesh>
        </>
    )
}

export default Floor