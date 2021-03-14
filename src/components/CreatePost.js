import React from 'react'
import { Form,Button,Col } from 'react-bootstrap';
export default function CreatePost() {
    return (
        <div className="container">
        <Form bg="dark" text="light">
            <Form>
                <Form.Group as={Col}>
                <Form.Label>Caption</Form.Label>
                <Form.Control type="String" placeholder="Enter Caption" required/>
                </Form.Group>

                <Form.Group as={Col}>
                <Form.Label >Description</Form.Label>
                <Form.Control  as="textarea" rows={3} type="String" placeholder="Enter Description" />
            <Form.Control className="mb-2" type="file" className="mr-3"/>
                </Form.Group>
            </Form>
            
            
            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    )
}
