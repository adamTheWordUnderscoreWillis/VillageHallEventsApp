function Floor (){

    const colorPalete ={
        grass: `hsl(103, 50.00%, 32.40%)`,
        wall: `hsl(47, 9.40%, 37.60%)`,
        building1: `hsl(17, 64.30%, 52.70%)`,
        building2: `hsl(22, 13.20%, 40.20%)`
    }

    
    return(
        <>
            <mesh receiveShadow position={[0,-3.5,0]} rotation={[(Math.PI * - 0.5),0,0]}>
                <planeGeometry args={[100,20, 20, 2]}/>
                <meshStandardMaterial color={colorPalete.grass} />
            </mesh>
            <mesh receiveShadow position={[0,-1,-5]} rotation={[0,0,0]}>
                <boxGeometry args={[800,5, 2]}/>
                <meshStandardMaterial color={colorPalete.wall} />
            </mesh>
            <mesh position={[-15,0,-15]} rotation={[0,0,0]}>
                <boxGeometry args={[20,10, 10]}/>
                <meshStandardMaterial color={colorPalete.building1}/>
            </mesh>
            <mesh position={[15,0,-15]} rotation={[0,0,0]}>
                <boxGeometry args={[20,10, 10]}/>
                <meshStandardMaterial color={colorPalete.building2}/>
            </mesh>
        </>
    )
}
export default Floor