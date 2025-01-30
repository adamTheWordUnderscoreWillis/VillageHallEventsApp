import { useEffect, useMemo, useState } from "react"
import Scene from "./components/Scene"
import { Login } from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isSignedIn, setIsSignedIn]=useState(false)
  return (
        <>
          <Login isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}/>
        <Scene isSignedIn={isSignedIn} className={"scene"}/>
        </>
  )
}

export default App
