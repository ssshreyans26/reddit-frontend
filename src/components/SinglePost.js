import React, { useState } from 'react'
import { Card, Image, Col,Media } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';

export default function SinglePost(props) {
  // console.log(props);  
    console.log(props)
    const history = useHistory();
    
    const [post, setPost] = useState(props.history.location.state.post);
    const [comments, setComments] = useState([])
    const [commentReplies,setCommentReplies] = useState([])
    const [upcolor, setUpColor] = useState("white");
    const [downcolor, setdownColor] = useState("white");
    console.log(props.history.location.state.post)
    
    

    const getComments = () => {
        if(localStorage.getItem('uid')){
            fetch("http://localhost:3000/comments/"+ post._id, {
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
                       console.log("result",result)
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
            const updateVote = (postId,actions) => {
              // console.log(localStorage.getItem("uid"))
              // if(actions==="increment"){
              //   setUpColor("green")
              // }
                if (!localStorage.getItem("uid")) {
                  //redirect to login page
                  history.push("/glogin");
              
                } else {
                  fetch("http://localhost:3000/votePosts/"+ postId,{  
                    method: 'POST', 
                    mode: 'cors',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'uid':localStorage.getItem('uid')
                    },
                    body: JSON.stringify({"actions":actions})
                  }).then((result) => {
                    console.warn("you are here")
                    console.log({result})
                    // getPostDetails();
                    // result.json().then((rel) => {
                    //   // update icon to green/red
                    //   //upadte the number (basically set state again)
                    // });
                  });
                }
              };

    // const getPostDetails = (postid) => {
    //     console.log("you are here")
    //     if(localStorage.getItem('uid')){

    //         fetch("http://localhost:3000/post/"+postid, {
    //            mode: "cors",
    //            headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'uid':localStorage.getItem('uid')
    //            },
    //          }).then((response) => {
    //            console.warn(response);
    //            response.json().then((result) => {
    //                setPost(result)
    //                console.log(post)
    //            });
    //          });
    //     }
    //     else {
    //         history.push('/glogin');
    //     }
    //    }
      //  console.log(post)
       React.useEffect(() => {
          console.log("inside use effect")
          //  getPostDetails(props.history.location.state.post_id);
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
                style={{cursor:"pointer"}}
              />
              <span className="text-center mx-2 mb-2">{post.votes}</span>
              <FontAwesomeIcon
                className="mr-1"
                size="2x"
                icon={faArrowCircleDown}
                onClick={() => {updateVote(post._id,"decrement")}}
                style={{cursor:"pointer"}}
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
          <Media variant="dark" bg="dark" className="mt-3">
  <img
    width={64}
    height={64}
    className="mr-3"
    src="holder.js/64x64"
    alt="Generic placeholder"
  />
  <Media.Body >
    <h5>Media Heading</h5>
    <p>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
      ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
      tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
      Donec lacinia congue felis in faucibus.
    </p>

    <Media>
      <img
        width={64}
        height={64}
        className="mr-3"
        src="holder.js/64x64"
        alt="Generic placeholder"
      />
      <Media.Body>
        <h5>Media Heading</h5>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
          scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in
          vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
          vulputate fringilla. Donec lacinia congue felis in faucibus.
        </p>
      </Media.Body>
    </Media>
  </Media.Body>
</Media>
      </div>
    )
}
