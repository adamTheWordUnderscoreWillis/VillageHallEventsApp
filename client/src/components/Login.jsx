import React, {useEffect, useState} from "react"
import Nav from 'react-bootstrap/Nav';
import { addEvent, AuthorizeToken, gapiLoaded, gisLoaded } from "./googleApi";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { getUsernfo } from "./api";

export const Login = ({isSignedIn, setIsSignedIn}) => {
  const [user, setUser]=useState([])
  const [profile, setProfile]=useState([])

  const login = useGoogleLogin({
    onSuccess: tokenResponse => setUser(tokenResponse),
  });

     useEffect(()=>{
      //  gapiLoaded()
        // gisLoaded()
     }, [])

     useEffect(()=>{
      const intialiseUser = async ()=>{
        // console.log("initialising user token: ", user.access_token)
        const profileData = await getUsernfo(user)
        setProfile(profileData)
  
      }
      intialiseUser()
    },[user]);

     const handleAuthClick = async () =>{
        await AuthorizeToken()
        setIsSignedIn(true)
     }
      return (
        <Nav fill variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={()=>{login()}}>{"Sign In"}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={addEvent}>Create Event</Nav.Link>
        </Nav.Item>
      </Nav>
      );
}