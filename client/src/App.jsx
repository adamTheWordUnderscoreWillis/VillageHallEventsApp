import { useEffect, useMemo, useState } from "react"
import Scene from "./components/Scene"
import { Login } from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { getUsernfo } from "./components/api";


function App() {
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
          {/* <Login/> */}
        <Scene className={"scene"}/>
        </>
  )
}

export default App
