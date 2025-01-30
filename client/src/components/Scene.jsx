import { Canvas } from "@react-three/fiber";
import Poster from "./poster";
import Events from "../Events";
import Floor from "./floor";
import { Suspense, useState } from "react";
import { NotEqualStencilFunc } from "three";
import {OrbitControls, Environment}from '@react-three/drei';
import NoticeBoard from "./noticeboard";
function Scene ({isSignedIn}){
    const  [isLoading, setIsLoading] = useState(true)
    return(
        <>
        <Canvas>
            <Suspense fallback={null}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <NoticeBoard isSignedIn={isSignedIn} isLoading={isLoading}/>
            <Floor/>
            <Events isSignedIn={isSignedIn} isLoading={isLoading} setIsLoading={setIsLoading}/>
            <OrbitControls
            minAzimuthAngle={-Math.PI / 5}
            maxAzimuthAngle={Math.PI / 5}
            minPolarAngle={Math.PI/ 4}
            maxPolarAngle={Math.PI - Math.PI / 3}
            />
            </Suspense>
        </Canvas>
        </>
    )
}

export default Scene