import { Canvas } from "@react-three/fiber";
import Poster from "./poster";
import Events from "../Events";
import Floor from "./floor";
import { Suspense } from "react";
import { NotEqualStencilFunc } from "three";
import {OrbitControls, Environment}from '@react-three/drei';
import NoticeBoard from "./noticeboard";
function Scene (){
    return(
        <>
        <Canvas>
            <Suspense fallback={null}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <NoticeBoard/>
            <Floor/>
            {/* <Events/> */}
            <OrbitControls/>
            </Suspense>
        </Canvas>
        </>
    )
}

export default Scene