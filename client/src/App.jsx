import { useEffect, useMemo, useState } from "react"
import Scene from "./components/Scene"
import {Routes, Route} from 'react-router-dom'

import { getUsernfo } from "./components/api";
import { PrivacyPolicy } from "./components/Privacy";

function App() {
  
  return (
        <>
        <Routes>
            <Route path="/privacy" element={<PrivacyPolicy/>}/>
            <Route path="*" element={<Scene className={"scene"}/>}/>
        </Routes>
        </>
  )
}

export default App
