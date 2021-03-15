import React,{useState} from 'react'
import { Form,Button,Col } from 'react-bootstrap';
export default function CreatePost() {
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState("");
    const submitFormData = (caption,description) => {
        console.log(caption,description);
        var data = {
            "caption":caption,
            "description":description

        }
        console.log(data)
        fetch("http://localhost:3000/upload",{  
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
          });
        });
        
      }
    return (
        <div className="container">
        <Form bg="dark" text="light">
            
                <Form.Group as={Col}>
                <Form.Label>Caption</Form.Label>
                <Form.Control onChange={(e) => setCaption(e.target.value)} type="String" placeholder="Enter Caption" required/>
                </Form.Group>

                <Form.Group as={Col}>
                <Form.Label >Description</Form.Label>
                <Form.Control  onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} type="String" placeholder="Enter Description" />
           
                </Form.Group>
             {/* <Form.Control className="mb-2" type="file" className="mr-3"/> */}
            <Button onClick={() =>{submitFormData(caption,description)}} variant="dark" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    )
}
