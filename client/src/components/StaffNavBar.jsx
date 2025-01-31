import { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import NavItem from 'react-bootstrap/NavItem';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavLink from 'react-bootstrap/NavLink';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export function StaffNavBar({targetedEvent}){
    
    useEffect(()=>{
        
    },[targetedEvent])

    function createEventForm(){
        return (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
        
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          );
        
    }
    function listAttendees (){
        if(Object.keys(targetedEvent.attendees).length >0 ){
            for(const key in targetedEvent.attendees){
                return(
                    <NavDropdown.Item>
                        <p>{targetedEvent.attendees[key]}</p>
                        <Button variant="danger">Remove</Button>
                        </NavDropdown.Item>
                )
            }
        }
    }

    function attendeeCount(){
        return Object.keys(targetedEvent.attendees).length
    }
    function eventDetails(){
        return (
            <Nav>
                    <NavDropdown title="Event Details">
                        <NavItem>Event Id: 5857363</NavItem>
                        <NavDropdown disabled={attendeeCount() <= 0 ?true:false} title={`Attendees: ${attendeeCount()}`}>
                            {listAttendees()}
                        </NavDropdown>
                        <NavItem>
                            <Button variant="danger">
                                Cancel Event
                            </Button>
                        </NavItem>
                    </NavDropdown>
                </Nav>
          );
    }
    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Staff Menu</Navbar.Brand>
                    {targetedEvent.id?eventDetails():null}
                <Nav>
                    <NavDropdown title="Create New Event">
                        <NavItem>
                            {createEventForm()}
                        </NavItem>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
       
    )
}