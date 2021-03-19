import React, { useState }  from 'react'
import { Form,Button,Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
export default function Auth() {
  const history = useHistory()
    const [username, setUsername] = useState("");
    const [dob, setDob] = useState("");
    const submitFormData = (username,dob) => {
        console.log(username,dob);
        var data = {
            "username":username,
            "dob":dob

        }
        fetch("https://obscure-journey-24994.herokuapp.com/auth/register",{  
          method: 'POST', 
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'uid':localStorage.getItem('uid')
        },
          body: JSON.stringify(data)
        }).then((result) => {        
          result.json().then((rel) => {
              console.log(rel)
              history.push('/')

          });
        });
        
      }
    return (
        <div className="container">
        <Form bg="dark" text="light">
            <Form.Row>
                <Form.Group as={Col}>
                <Form.Label>User Name</Form.Label>
                <Form.Control onChange={(e) => setUsername(e.target.value)} type="string" placeholder="Enter Your User Name" required/>
                </Form.Group>

                <Form.Group as={Col}>
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control onChange={(e) => setDob(e.target.value)} type="date" placeholder="Enter DOB" />
                </Form.Group>
            </Form.Row>
            <Button variant="dark" type="submit" onClick={() => {
                submitFormData(username,dob);
          }}>
                Submit
            </Button>
        </Form>
        </div>
    )
}
