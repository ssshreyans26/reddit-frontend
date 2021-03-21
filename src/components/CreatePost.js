import React,{useState} from 'react'
import { Form,Button,Col,Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
export default function CreatePost() {
    const history = useHistory()
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();
    const [show, setShow] = useState(false);
    const submitFormData = (caption,description,image) => {
        console.log(caption,description,image);

        var formData = new FormData();
        formData.append("caption",caption)
        formData.append("description",description)
        formData.append("image",image)
        var uid = localStorage.getItem('uid')
        fetch("https://obscure-journey-24994.herokuapp.com/post",{  
          method: 'POST', 
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'uid': uid
        },
          body: formData
        }).then((result) => {        
          result.json().then((rel) => {
              console.log(rel)
              setShow(true)
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
        <div className="container" bg="antiquewhite">
        <Form bg="dark" text="light" enctype="multipart/form-data">
            
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
                Create Post
            </Button>
        </Form>
        <>
      <Alert show={show} variant="danger" className="mt-4">
        <Alert.Heading>New Post Created</Alert.Heading>
        <p>
        Please Click on the Button Below to create a new post.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
        <Button onClick={() => history.push('/')} variant="outline-success" className="mr-2">
          Go to Dashboard
          </Button>
          <Button onClick={() => setShow(false)} variant="outline-danger">
          Create Another Post
          </Button>
        </div>
      </Alert>


    </>
        </div>
    )
}
