import { useEffect, useMemo, useState } from "react"
import Scene from "./components/Scene"
import Events from "./Events"

function App() {

  const [user, setUser] = useState("user@email.com")
  useEffect(()=>{
  },[])

  return (
    <>
      <Scene user={user}/>
    </>
  )
}

export default App
