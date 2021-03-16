import React, { useState } from 'react'
import { Card, Image, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';

export default function SinglePost() {
    const history = useHistory();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([])
    const [commentReplies,setCommentReplies] = useState([])

    const getComments = () => {
        if(localStorage.getItem('uid')){
            fetch("http://localhost:3000/comments"/*{postid}*/, {
               mode: "cors",
               headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'uid':localStorage.getItem('uid')
               },
             }).then((response) => {
               console.warn(response);
               response.json().then((result) => {
                   setComments(result)
                   console.log(result)
               });
             });
        }
        else {
            history.push('/glogin');
        }
        }
        const getCommentReplies = () => {
            if(localStorage.getItem('uid')){
                fetch("http://localhost:3000/reply" /*{commentid}*/, {
                   mode: "cors",
                   headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'uid':localStorage.getItem('uid')
                   },
                 }).then((response) => {
                   console.warn(response);
                   response.json().then((result) => {
                       setCommentReplies(result)
                       console.log(result)
                   });
                 });
            }
            else {
                history.push('/glogin');
            }
        }

        const postCommentReplies = () => {
            if(localStorage.getItem('uid')){
                fetch("http://localhost:3000/postComments" /*+{postid}/+{commentid}*/, {
                   mode: "cors",
                   methost:'POST',
                   headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'uid':localStorage.getItem('uid')
                   },
                 }).then((response) => {
                   console.warn(response);
                   response.json().then((result) => {
                       setCommentReplies(result)
                       console.log(result)
                       //bodu will be content
                   });
                 });
            }
            else {
                history.push('/glogin');
            }
        }
        const postComments = () => {
            if(localStorage.getItem('uid')){
                fetch("http://localhost:3000/postComments"/*{postid}+null*/, {
                   mode: "cors",
                   headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'uid':localStorage.getItem('uid')
                   },
                 }).then((response) => {
                   console.warn(response);
                   response.json().then((result) => {
                       setComments(result)
                       console.log(result)
                   });
                 });
            }
            else {
                history.push('/glogin');
            }
            }

    const getPostDetails = () => {
        if(localStorage.getItem('uid')){

            fetch("http://localhost:3000/post"/*{postid}*/, {
               mode: "cors",
               headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'uid':localStorage.getItem('uid')
               },
             }).then((response) => {
               console.warn(response);
               response.json().then((result) => {
                   setPost(result)
                   console.log(post)
               });
             });
        }
        else {
            history.push('/glogin');
        }
       }
       React.useEffect(() => {
           getPostDetails();
           getComments();
           },[]);
    return (
      <div className="container">
          <Card border="light" bg="dark" text="light">
            <Card.Header as="h3" className="">
              {post.test.length !== 0 ? (
                <Col xs={6} md={6}>
                  {" "}
                  <Image src={post.test[0].image} roundedCircle />{" "}
                  {post.test[0].displayName}{" "}
                </Col>
              ) : (
                <Col xs={6} md={4}>
                  {" "}
                  <Image src="{post.test[0].image}" roundedCircle />{" "}
                </Col>
              )}
            </Card.Header>

            <Card.Body>
              <Card.Title>{post.caption}</Card.Title>
              {/* <Card.Img variant="top" src="{post.Location}" /> */}
              <Card.Text>{post.desc}</Card.Text>
              {/* <Button variant="light">Go somewhere</Button> */}
                
              <FontAwesomeIcon
                className="mr-1"
                size="2x"
                icon={faArrowCircleUp}
                onClick={() => {updateVote(post._id,"increment")}}
                style={upStyle}
              />
              <span className="text-center mx-2 mb-2">{post.votes}</span>
              <FontAwesomeIcon
                className="mr-1"
                size="2x"
                icon={faArrowCircleDown}
                onClick={() => {updateVote(post._id,"decrement")}}
                style={downStyle}
              />
              <FontAwesomeIcon
                
                className="ml-0"
                size="2x"
                icon={faCommentDots}
              />
            </Card.Body>
            <Card.Footer className="text-muted text-center">
              {post.createdAt}
            </Card.Footer>
          </Card>
      </div>
    )
}
