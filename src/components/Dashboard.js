import React, { useState } from 'react'
import { Card, Image, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';



export default function Dashboard() {
    const history = useHistory()
    const [postDetails, setPostDetails] = useState([]);
    const [upcolor, setUpColor] = useState("white");
    const [downcolor, setdownColor] = useState("white");
    const upStyle = {
        color:upcolor,
        "cursor":"pointer",
    }
    const downStyle = {
      color:downcolor,
      "cursor":"pointer",
    }
    
    const getPostState = () => {
      if(!localStorage.getItem("uid")){
        history.push("/glogin");
      }
      else {
        fetch("http://localhost:3000/poststate",{  
            method: 'GET', 
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'uid':localStorage.getItem('uid')
            },
          }).then((result) => {
            // console.warn("you are here")
            console.log({result})
            // postDetails.map((post) => {

            // })
            // result.json().then((rel) => {
            //   // update icon to green/red
            //   //upadte the number (basically set state again)
            // });
          });
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
            getPostDetails();
            // result.json().then((rel) => {
            //   // update icon to green/red
            //   //upadte the number (basically set state again)
            // });
          });
        }
      };

      const addComment = (postId) => {
        // console.log(localStorage.getItem("uid"))
        // if(actions==="increment"){
        //   setUpColor("green")
        // }
          if (!localStorage.getItem("uid")) {
            //redirect to login page
            history.push({ 
            pathname:  "/glogin",
            state: {
              nextapiref: '/singlepost',
              postID:'postID' 
            } });
        
          } else {
            //redirect to singlepost page
            history.push({
              pathname:  "/singlepost",
              state: {
                postID: "postid"  
              } 
            })

          }
        };
    const getPostDetails = () => {
     fetch("https://obscure-journey-24994.herokuapp.com/feed", {
        mode: "cors",
        method:"GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      }).then((response) => {
        console.warn(response);
        response.json().then((result) => {
            setPostDetails(result)
            console.log(postDetails)
        });
      });
    }
    React.useEffect(() => {
        getPostDetails();
        },[]);

return (
      <div className="container">
        {postDetails.map((post) => (

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
        ))}
      </div>
    )
}
