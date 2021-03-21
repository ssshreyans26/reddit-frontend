import React, { useState } from "react";
import { Card, Image, Col, Form, Button, Row,Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import "../css/dashboard.css";

export default function SinglePost(props) {
  // console.log(props);
  // console.log(props);
  const history = useHistory();
  // console.log("some console",props.history.location)
  var dataPost = {};
  if (props.history.location.state) {
    dataPost = props.history.location.state.post;
  }
  const [show, setShow] = useState(false);
  const [post, setPost] = useState(dataPost);
  const [comment, setComment] = useState([]);
  const [reply, setReply] = useState();
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState({});
  const [replyVotes, setReplyVotes] = useState({});
  const [replies, setReplies] = useState([]);

  const getComments = () => {
    console.log("inside get Commnets");
    if (localStorage.getItem("uid")) {
      var uid = localStorage.getItem("uid")
      fetch(
        "https://obscure-journey-24994.herokuapp.com/comment/" + post._id,
        {
          mode: "cors",
          method:"GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "uid": uid,
          },
        }
      ).then((response) => {
        console.warn(response);
        response.json().then((result) => {
          if (result.length > 0) {
            setVotes(result.pop());
            for(let i=0;i<result.length;i++){
              
              var d = new Date(result[i].createdAt)
              result[i].createdAt = d.toUTCString()
            }
            setComments(result);
          }

          console.log(result);
        });
      });
    } else {
      history.push("/glogin");
    }
  };
  const getCommentReplies = (comment_id) => {
    console.log("you are inside comment replies");
    if (localStorage.getItem("uid")) {
      var uid = localStorage.getItem("uid");
      fetch("https://obscure-journey-24994.herokuapp.com/comment/" + post._id+"/"+ comment_id, {
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "uid": uid,
        },
      }).then((response) => {
        console.warn(response);
        response.json().then((result) => {
          console.warn("result", result);
          if (!result.error) {
            setReplyVotes(result.pop())
            for(let i=0;i<result.length;i++){
              
              var d = new Date(result[i].createdAt)
              result[i].createdAt = d.toUTCString()
            }
            setReplies(result);
          }

          else if(result.error){
            setReplies([])
          }
          console.warn(result);
          console.log("------------------------------", replies.length);
        });
      });
    } else {
      history.push("/glogin");
    }
  };

  const postCommentReplies = (comment_id) => {
    if (localStorage.getItem("uid")) {
      var uid = localStorage.getItem("uid");
      var data = {
        "content": reply,
        "postId":post._id,
        "parentId":comment_id
      };
      fetch(
        "https://obscure-journey-24994.herokuapp.com/comment/" ,
        {
          mode: "cors",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            uid: uid,
          },
          body: JSON.stringify(data),
        }
      ).then((response) => {
        console.warn(response);
        response.json().then((result) => {
          getCommentReplies(comment_id);
          setShow(true)
          console.log(result);

          //bodu will be content
        });
      });
    } else {
      history.push("/glogin");
    }
  };
  const postComments = (com, pos) => {
    var data = {
      "content": com,
      "postId":post._id,
      "parentId":"null"
    };
    console.log(data);
    var uid = localStorage.getItem("uid"); 
    if (localStorage.getItem("uid")) {
      fetch(
        "https://obscure-journey-24994.herokuapp.com/comment/",
        {
          mode: "cors",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "uid": uid,
          },
          body: JSON.stringify(data),
        }
      ).then((response) => {
        // console.warn(response.data);
        response.json().then((result) => {
          //  setComments(result)
          var test = comments;
          // console.log(comments)
          test.push(result);
          setPost(pos);
          // setComments(test)
          getComments();
          console.log(comments);
        });
      });
    } else {
      history.push("/glogin");
    }
  };
  const updateVote = (postId, actions) => {
    // console.log(localStorage.getItem("uid"))
    // if(actions==="increment"){
    //   setUpColor("green")
    // }
    if (!localStorage.getItem("uid")) {
      //redirect to login page
      history.push("/glogin");
    } else {
      fetch("https://obscure-journey-24994.herokuapp.com/post/vote" + postId, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          uid: localStorage.getItem("uid"),
        },
        body: JSON.stringify({ actions: actions }),
      }).then((result) => {
        console.warn("you are here");
        console.log({ result });
        // getPostDetails();
        // result.json().then((rel) => {
        //   // update icon to green/red
        // setPost(rel)
        //   //upadte the number (basically set state again)
        // });
        getPostDetails();
      });
    }
  };

  const updateCommentVote = (commentId, actions) => {
    // console.log(localStorage.getItem("uid"))
    // if(actions==="increment"){
    //   setUpColor("green")
    // }
    console.log("Inside Update Comment Vote")
    if (!localStorage.getItem("uid")) {
      //redirect to login page
      history.push("/glogin");
    } else {
      var uid = localStorage.getItem("uid")
      fetch(
        "https://obscure-journey-24994.herokuapp.com/comment/vote/" + commentId,
        {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "uid": uid,
          },
          body: JSON.stringify({ "actions": actions }),
        }
      ).then((result) => {
        console.warn("you are here");
        console.log({ result });
        getComments();
        // getPostDetails();
        // result.json().then((rel) => {
        //   // update icon to green/red
        // setPost(rel)
        //   //upadte the number (basically set state again)
        // });
      });
    }
  };

  const updateCommentReplyVote = (replyId,commentId, actions) => {
    console.warn("replyID",replyId)
    console.warn("commentID",commentId)
    console.log("inside updateCommentReplyVote")
    // console.log(localStorage.getItem("uid"))
    // if(actions==="increment"){
    //   setUpColor("green")
    var uid = localStorage.getItem("uid")
    if (!localStorage.getItem("uid")) {
      //redirect to login page
      history.push("/glogin");
    } else {
      fetch(
        "https://obscure-journey-24994.herokuapp.com/comment/vote/" + replyId,
        {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "uid": uid,
          },
          body: JSON.stringify({ actions: actions }),
        }
      ).then((result) => {
        console.warn("you are here");
        console.log({ result });
        // getComments();
        getCommentReplies(commentId);
        // getPostDetails();
        // result.json().then((rel) => {
        //   // update icon to green/red
        // setPost(rel)
        //   //upadte the number (basically set state again)
        // });
      });
    }
  };

  const getPostDetails = () => {
    console.log("you are here");
    if (localStorage.getItem("uid")) {
      fetch("https://obscure-journey-24994.herokuapp.com/post/" + post._id, {
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          uid: localStorage.getItem("uid"),
        },
      }).then((response) => {
        console.warn(response);
        response.json().then((result) => {
          setPost(result);
          console.log(post);
        });
      });
    } else {
      history.push("/glogin");
    }
  };
  //  console.log(post)
  React.useEffect(() => {
    console.log(replies);
    //  getPostDetails(props.history.location.state.post_id);
    getComments();
    getCommentReplies(replies.parentId);
  }, []);

  return (
    <div className="">
      <Card border="light" bg="dark" text="light" className="card-o">
        <Card.Header as="h4" className="">
          {post.test.length !== 0 ? (
            <Col xs={6} md={6} className="col-o">
              {" "}
              <Image
                width={50}
                height={50}
                src={post.test[0].image}
                roundedCircle
                className="header-img"
              />{" "}
              {post.test[0].displayName}{" "}
            </Col>
          ) : (
            <Col xs={6} md={4}>
              {" "}
              <Image src="{post.test[0].image}" roundedCircle />{" "}
            </Col>
          )}
        </Card.Header>

        <Card.Body className="card-body-o">
          <Card.Title>{post.caption}</Card.Title>
          {/* <Card.Img variant="top" src="{post.Location}" /> */}
          <Card.Text>{post.desc}</Card.Text>
          {/* <Button variant="light">Go somewhere</Button> */}

          <FontAwesomeIcon
            className="mr-1 fa-lg upvote"
            
            icon={faArrowCircleUp}
            onClick={() => {
              updateVote(post._id, "increment");
            }}
            style={{
              cursor: "pointer",
              color: post.state === 1 ? "green" : "white",
            }}
          />
          <span className="text-center mx-2 mb-2">{post.votes}</span>
          <FontAwesomeIcon
            className="mr-1 fa-lg downvote"
            
            icon={faArrowCircleDown}
            onClick={() => {
              updateVote(post._id, "decrement");
            }}
            style={{
              cursor: "pointer",
              color: post.state === -1 ? "red" : "white",
            }}
          />
          {/* <FontAwesomeIcon
                
                className="ml-0"
                size="2x"
                icon={faCommentDots}
              /> */}
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          {post.createdAt}
        </Card.Footer>
      </Card>
      <Form bg="dark" text="light">
        <Form.Row>
          <Form.Group className="card-o">
            <Form.Label>
              <strong>Add Comments</strong>
            </Form.Label>
            <Form.Control
              onChange={(e) => setComment(e.target.value)}
              type="string"
              placeholder="Enter Comments"
              required
            />
          <Button
            variant="dark"
            className=""
            onClick={() => {
              postComments(comment, post);
            }}
          >
            Add Comments
          </Button>
          </Form.Group>
        </Form.Row>
      </Form>
      <Row>
        <Col>
          {/* COMMENTS  */}
          {comments.length !== 0 ? (
            comments.map((item, key) => (
              <Card border="light" bg="secondary" text="light" className="card-o">
                <Card.Header as="h4" className="">
                  {item.uid.length !== 0 ? (
                    <Col xs={6} md={6}>
                      {" "}
                      <Image
                        width={50}
                        height={50}
                        src={item.uid.image}
                        roundedCircle
                      />{" "}
                      {item.uid.displayName}{" "}
                    </Col>
                  ) : (
                    <Col xs={6} md={4}>
                      {" "}
                      <Image src="{post.test[0].image}" roundedCircle />{" "}
                    </Col>
                  )}
                </Card.Header>

                <Card.Body className="card-body-o">
                  {/* <Card.Title>{post.caption}</Card.Title> */}
                  {/* <Card.Img variant="top" src="{post.Location}" /> */}
                  <Card.Text>{item.content}</Card.Text>
                  {/* <Button variant="light">Go somewhere</Button> */}

                  <FontAwesomeIcon
                    className="mr-1 fa-lg upvote"
                    
                    icon={faArrowCircleUp}
                    onClick={() => {
                      updateCommentVote(item._id, "increment");
                    }}
                    style={{
                      cursor: "pointer",
                      color: votes[item._id] === 1 ? "green" : "white",
                    }}
                  />
                  <span className="text-center mx-2 mb-2">{item.votes}</span>
                  <FontAwesomeIcon
                    className="mr-1 fa-lg downvote"
                    
                    icon={faArrowCircleDown}
                    onClick={() => {
                      updateCommentVote(item._id, "decrement");
                    }}
                    style={{
                      cursor: "pointer",
                      color: votes[item._id] === -1 ? "red" : "white",
                    }}
                  />
                  <FontAwesomeIcon
                    className="ml-0 fa-lg"
                    
                    icon={faCommentDots}
                    onClick={() => {
                      getCommentReplies(item._id);
                    }}
                  />
                </Card.Body>
                <Card.Footer className="text-center">
                  {item.createdAt}
                  <Form bg="dark" text="light">
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>
                          {/* <strong>Add Comments</strong> */}
                        </Form.Label>
                        <Form.Control
                          onChange={(e) => setReply(e.target.value)}
                          type="string"
                          placeholder="Enter Reply"
                          required
                        />
                      </Form.Group>
                      <Button
                        variant="dark"
                        className="col-3"
                        onClick={() => {
                          postCommentReplies(item._id);
                        }}
                      >
                        Add Reply
                      </Button>
                    </Form.Row>
                  </Form>
                </Card.Footer>
              </Card>
            ))
          ) : (
            <p>No Comments Yet</p>
          )}
        </Col>
        <Col>
          {/* Replies  */}
          {replies.length !== 0 ? (
            replies.map((item, key) => (
              <Card border="light" bg="secondary" text="light" className="card-o" key={key}>
                <Card.Header as="h4" className="">
                  {item.length !== 0 ? (
                    <Col xs={6} md={6}>
                      {" "}
                      <Image
                        width={50}
                        height={50}
                        src={item.uid.image}
                        roundedCircle
                      />{" "}
                      {item.uid.displayName}{" "}
                    </Col>
                  ) : (
                    <Col xs={6} md={4}>
                      {" "}
                      <Image src={item.uid.image} roundedCircle />{" "}
                    </Col>
                  )}
                </Card.Header>

                <Card.Body className="card-body-o">
                  {/* <Card.Title>{post.caption}</Card.Title> */}
                  {/* <Card.Img variant="top" src="{post.Location}" /> */}
                  <Card.Text>{item.content}</Card.Text>
                  {/* <Button variant="light">Go somewhere</Button> */}

                  <FontAwesomeIcon
                    className="mr-1 fa-lg upvote"
                    
                    icon={faArrowCircleUp}
                    onClick={() => {
                      updateCommentReplyVote(item._id, item.parentId,"increment");
                    }}
                    style={{
                      cursor: "pointer",
                      color: replyVotes[item._id] === 1 ? "green" : "white",
                    }}
                    
                  />
                  <span className="text-center mx-2 mb-2">{item.votes}</span>
                  <FontAwesomeIcon
                    className="mr-1 fa-lg downvote"
                    
                    icon={faArrowCircleDown}
                    onClick={() => {
                      updateCommentReplyVote(item._id, item.parentId,"decrement");
                    }}
                    style={{
                      cursor: "pointer",
                      color: replyVotes[item._id] === -1 ? "red" : "white",
                    }}
                  />

                </Card.Body>
                <Card.Footer className="text-center">
                  {item.createdAt}
                </Card.Footer>
              </Card>
            ))
          ) : (
            <p>No Replies Yet</p>
          )}
        </Col>
      </Row>
      <>
      <Alert show={show} variant="success">
        <Alert.Heading>Reply Added</Alert.Heading>
        <p>
        Your Reply to the Comment was successfully added !
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
          Close
          </Button>
        </div>
      </Alert>


    </>
    </div>
  );
}
