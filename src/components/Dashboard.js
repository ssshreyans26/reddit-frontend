import React, { useState } from 'react'
import { Card, Image, Col,Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowUp,
  faArrowCircleDown,
  faCommentDots,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';
import "../css/dashboard.css";




export default function Dashboard() {
    const history = useHistory()
    const [postDetails, setPostDetails] = useState([]);
    // const [createdAt,setCreatedAt] = useState()
    const [sort,setSort] = useState("")
    const [votes,setVotes] = useState({})
    // const []
    // const upStyle = {
    //     color:upcolor,
    //     "cursor":"pointer",
    // }
    // const downStyle = {
    //   color:downcolor,
    //   "cursor":"pointer",
    // }
    
    const getPostState = () => {
      if(!localStorage.getItem("uid")){
        history.push("/glogin");
      }
      else {
        fetch("https://obscure-journey-24994.herokuapp.com/poststate",{  
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
          fetch("https://obscure-journey-24994.herokuapp.com/post/vote/"+ postId,{  
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

      const addComments = (post) => {
          if (!localStorage.getItem("uid")) {
            //redirect to login page
            history.push({ 
            pathname:  "/glogin",
            state: {
              api: '/singlepost',
              postID:'postID' 
            } });
        
          } else {
            //redirect to singlepost page
            var data = post
            data["state"] = votes[post._id]
            history.push({
              pathname:  "/singlepost",
              state: {
                "post": data
              } 
            })

          }
        };

    const deletePost = (post_id) => {
      if(localStorage.getItem("uid")){
        var uid = localStorage.getItem("uid");
        fetch("https://obscure-journey-24994.herokuapp.com/post/"+post_id,{
          mode: "cors",
          method:"DELETE",
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'uid':uid
          },
        }).then((response) => {
          console.warn(response);
          // response.json().then((result) => {
              // console.warn(result)
              getPostDetails();
          // });
        })
      }
    }
    const getPostDetails = () => {
      var action;
      console.log("Uor are Inside get Post")
    var uid = localStorage.getItem('uid');
     console.log("uid",uid) 
    fetch("https://obscure-journey-24994.herokuapp.com/post?action="+sort, {
        mode: "cors",
        method:"GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'uid':uid
        },
      }).then((response) => {
        console.warn(response);
        response.json().then((result) => {
            console.warn(result)
            if(uid!=="\"\"" || uid==="null" || uid===null){
              setVotes(result.pop())  
              console.log("votes",votes)
              
            }
            for(let i=0;i<result.length;i++){
              
              var d = new Date(result[i].createdAt)
              result[i].createdAt = d.toUTCString()
            }
            setPostDetails(result)
            console.log(postDetails)
        });
      });
    }
    React.useEffect(() => {
        getPostDetails();
        },[]);

return (
      <div className="">
        <div className="text-center mt-4" style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center"
        }}>
      <Button variant="primary" 

      onClick={() => {
        setSort("top")
        getPostDetails()}}>Trending</Button>{' '}
  <Button variant="secondary" 

  onClick={() => {
        setSort("recent")
        getPostDetails()}}>Recent</Button>{' '}
  <Button variant="success" 

  onClick={() => {
        setSort("old")
        getPostDetails()}}>Old</Button>{' '}</div>
        {postDetails.map((post,key) => (

  

          <Card border="light" bg="dark" text="light" className="card-o" key={key} >
            <Card.Header as="h6" >
              {post.test.length !== 0 ? (
                <Col xs={6} md={6} className="col-o">
                  {" "}
                  <Image className="header-img"  src={post.test[0].image} roundedCircle />{" "}
                  {post.test[0].displayName}{" "}
                </Col>
              ) : (
                <Col xs={6} md={4} className="col-o" >
                  {" "}
                  <Image src="{post.test[0].image}" roundedCircle />{" "}
                </Col>
              )}
            </Card.Header>

            <Card.Body  className="card-body-o">
              <Card.Title>{post.caption}</Card.Title>
              <Card.Img variant="top"                  
                   src={post.Location} />
              <Card.Text>{post.desc}</Card.Text>
              {/* <Button variant="light">Go somewhere</Button> */}
              
                <div  className="button-flex"  >
                <FontAwesomeIcon
                className="mr-1 fa-lg upvote"
                
                icon={faArrowCircleUp}
                onClick={() => {updateVote(post._id,"increment")}}
                style={{cursor:"pointer",color:(votes[post._id]===1)
    ?"#FF4500"
    :"white"   
  }}
              />
              <span className="text-center mx-2 mb-2 ">{post.votes}</span>
              <FontAwesomeIcon
                className="mr-1 fa-lg downvote"
                
                icon={faArrowCircleDown}
                onClick={() => {updateVote(post._id,"decrement")}}
                style={{cursor:"pointer",color:(votes[post._id]===-1)
    ?"#7193FF"
    :"white"}}
              />
              <FontAwesomeIcon
                
                className="ml-0 fa-lg"
                
                icon={faCommentDots}
                style={{cursor:"pointer"}}
                onClick={() => {addComments(post)}}
              />
              {(localStorage.getItem("uid")===`"`+post.uid+`"`)
              ?<FontAwesomeIcon
                
                className="ml-0 fa-lg"
                
                icon={faTrashAlt}
                style={{cursor:"pointer"}}
                onClick={() => {deletePost(post._id)}}
              />
              : <p></p>
              }

                </div>
            </Card.Body>
            <Card.Footer className="text-muted text-center">
              {post.createdAt}
            </Card.Footer>
          </Card>
        ))}
      </div>
    )
}