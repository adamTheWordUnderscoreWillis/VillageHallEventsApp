import { useEffect, useState } from 'react';
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
import InputGroup from 'react-bootstrap/InputGroup';
import { createNewEvent } from './api';
export function StaffNavBar({targetedEvent, profile}){

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const handleSubmit = (event)=>{
        event.preventDefault()
        const formErrors = validateForm()
        if(Object.keys(formErrors).length > 0){
            setErrors(formErrors)
            console.log(errors)
        }
        else{
            setErrors({})
            createNewEvent(form, profile)
            console.log("form submitted")
        }
    }
    const setField = (field, value) => {
        console.log(form)
        setForm({
            ...form,
            [field]:value
        })
        if(!errors[field])
            setErrors({
                ...errors,
                [field]:null
            })
    }

    const validateForm = ()=>{
        const {name, description, start, end, logo, price} = form
        const newErrors = {}

        if(!name || name === '') newErrors.name = 'Please enter the name of the event'
        else if(name.length > 40) newErrors.name = 'Please use less than 40 characters'
        
        if(!description || description === '') newErrors.description = 'Please enter a description for the event'
        else if(name.length > 100) newErrors.description = 'Please use less than 100 characters'
        
        if(!start) newErrors.start = 'You must enter a start date for the event'
        else if (new Date(start).getTime()< new Date().getTime()) newErrors.start = "the start date cannot be in the past"
        if(!end) newErrors.end = 'You must enter an end date for the event'
        else if (new Date(start).getTime()> new Date(end).getTime()) newErrors.end = "the event cannot end before the start date"
        else if (new Date(end).getTime()< new Date().getTime()) newErrors.end = "the end date cannot be in the past"
        if(!price) newErrors.price = 'If you do not want a price please type "0"'
        if(price < 0) newErrors.price = 'We cannot afford to give away money'
        return newErrors

    }
    
    useEffect(()=>{
        
    },[targetedEvent])

    function createEventForm(){
        return (
            <>
              <InputGroup className="mb-3">
                <InputGroup.Text id="newEventSummary">Event Name</InputGroup.Text>
                <Form.Control
                  placeholder="Max 40"
                  aria-label="EventName"
                  aria-describedby="basic-addon1"
                  value={form.name}
                  onChange={(e)=>setField('name', e.target.value)}
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.name}
                </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="newEventSummary">description</InputGroup.Text>
                <Form.Control
                  placeholder="Max 100"
                  aria-label="EventDescription"
                  aria-describedby="basic-addon1"
                  value={form.description}
                  onChange={(e)=>setField('description', e.target.value)}
                  isInvalid={errors.description}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.description}
                </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="newEventSummary">Start</InputGroup.Text>
                <Form.Control
                type='datetime-local'
                  aria-label="EventStart"
                  aria-describedby="basic-addon1"
                  value={form.start}
                  onChange={(e)=>setField('start', e.target.value)}
                  isInvalid={errors.start}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.start}
                </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="newEventSummary">End</InputGroup.Text>
                <Form.Control
                type='datetime-local'
                  aria-label="EventEnd"
                  aria-describedby="basic-addon1"
                  value={form.end}
                  onChange={(e)=>setField('end', e.target.value)}
                  isInvalid={errors.end}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.end}
                </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="newEventSummary">Image</InputGroup.Text>
                <Form.Control
                type='file'
                  aria-label="EventLogo"
                  aria-describedby="basic-addon1"
                  value={form.logo}
                  onChange={(e)=>setField('logo', e.target.value)}
                  isInvalid={errors.logo}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.logo}
                </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="newEventSummary">£</InputGroup.Text>
                <Form.Control
                type='number'
                  placeholder="5"
                  aria-label="price"
                  aria-describedby="basic-addon1"
                  value={form.price}
                  onChange={(e)=>setField('price', e.target.value)}
                  isInvalid={errors.price}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.price}
                </Form.Control.Feedback>
              </InputGroup>
              <InputGroup>
              <Button type='submit' onClick={handleSubmit}>Submit Button</Button>
              </InputGroup>
            </>
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