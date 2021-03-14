import React from 'react'
import { Form,Button,Col } from 'react-bootstrap';
export default function Auth() {
    return (
        <div className="container">
        <Form bg="dark" text="light">
            <Form.Row>
                <Form.Group as={Col}>
                <Form.Label>User Name</Form.Label>
                <Form.Control type="string" placeholder="Enter Your User Name" required/>
                </Form.Group>

                <Form.Group as={Col}>
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control type="date" placeholder="Enter DOB" />
                </Form.Group>
            </Form.Row>
            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    )
}
