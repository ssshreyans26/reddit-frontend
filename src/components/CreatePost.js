import React,{useState} from 'react'
import { Form,Button,Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
export default function CreatePost() {
    const history = useHistory()
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();
    const submitFormData = (caption,description,image) => {
        console.log(caption,description,image);
        var data = {
            "caption":caption,
            "description":description,
            "image":image

        }
        console.log(data)
        var uid = localStorage.getItem('uid')
        fetch("https://obscure-journey-24994.herokuapp.com/upload",{  
          method: 'POST', 
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            "Access-Control-Allow-Origin": "*",
          // 'Content-Type': 'application/json',
            'Content-type': 'multipart/form-data',
            'uid': uid
        },
          body: data
        }).then((result) => {        
          result.json().then((rel) => {
              console.log(rel)
          });
        });
        
      }
      React.useEffect(() => {
        if(!localStorage.getItem('uid')){
          history.push({ 
            pathname:  "/glogin",
            state: {
              api: '/createpost', 
            } });
        }
      });
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
             <Form.Control className="mb-2 mr-3" type="file" onChange={(e) => setImage(e.target.files[0])} />
            <Button onClick={() =>{submitFormData(caption,description,image)}} variant="dark">
                Submit
            </Button>
        </Form>
        </div>
    )
}
