import React, {useEffect, useState} from "react"
import Nav from 'react-bootstrap/Nav';
import { addEvent, AuthorizeToken, gapiLoaded, gisLoaded } from "./googleApi";

export const Login = ({isSignedIn, setIsSignedIn}) => {
   

     useEffect(()=>{
       gapiLoaded()
        gisLoaded()
     }, [])

     const handleAuthClick = async () =>{
        await AuthorizeToken()
        setIsSignedIn(true)
     }
      return (
        <Nav fill variant="pills" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={handleAuthClick}>{"Sign In"}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={addEvent}>Create Event</Nav.Link>
        </Nav.Item>
      </Nav>
      );
}