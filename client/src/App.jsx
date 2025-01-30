import { useEffect, useMemo, useState } from "react"
import Scene from "./components/Scene"
import { Login } from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { getUsernfo } from "./components/api";


function App() {
  const [profile, setProfile]=useState([])
  const [isSignedIn, setIsSignedIn]=useState(false)
  
  
  // useGoogleOneTapLogin({
  //     onSuccess: credentialResponse => {
  //       console.log(credentialResponse);
  //       // setIsSignedIn(true)
  //     },
  //     onError: () => {
  //       console.log('Login Failed');
  //     },
  //   });
  useEffect(()=>{
        if(profile.id){
          console.log("profile: ", profile)
          setIsSignedIn(true)
        }
      }, [profile])
  return (
        <>
          {/* <GoogleLogin
            onSuccess={credentialResponse => {
              setUser(credentialResponse)
            }}
            onError={(error) => {
              console.log('Login Failed', error);
            }}
          />; */}
          <Login isSignedIn={isSignedIn} setProfile={setProfile} profile={profile} setIsSignedIn={setIsSignedIn}/>
        <Scene isSignedIn={isSignedIn} profile={profile} className={"scene"}/>
        </>
  )
}

export default App
