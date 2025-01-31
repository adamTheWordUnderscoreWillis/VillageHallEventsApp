import { useEffect, useMemo, useState } from "react"
import Scene from "./components/Scene"
import { Login } from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUsernfo } from "./components/api";


function App() {
  const [isStaff, setIsStaff]=useState(false)
  return (
        <>
        {isStaff?<Login/>:null}
        <Scene setIsStaff={setIsStaff} className={"scene"}/>
        <div id="AccesiblityDiv">
          <p>Accesibility prompt bar</p>
        </div>
        </>
  )
}

export default App
