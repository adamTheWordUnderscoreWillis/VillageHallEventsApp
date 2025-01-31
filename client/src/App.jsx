import { useEffect, useMemo, useState } from "react"
import Scene from "./components/Scene"
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsernfo } from "./components/api";

function App() {
  
  return (
        <>
        <Scene className={"scene"}/>
        </>
  )
}

export default App
