import React from 'react'
import { Form,Button,Col } from 'react-bootstrap';
export default function CreatePost() {
    return (
        <div className="container">
        <Form bg="dark" text="light">
            <Form.Row>
                <Form.Group as={Col}>
                <Form.Label>Caption</Form.Label>
                <Form.Control type="caption" placeholder="Enter Caption" required/>
                </Form.Group>

                <Form.Group as={Col}>
                <Form.Label>Description</Form.Label>
                <Form.Control type="description" placeholder="Enter Description" />
                </Form.Group>
            </Form.Row>
            <Button variant="dark" type="" className="mr-3">
                Upload Image
            </Button>
            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    )
}
