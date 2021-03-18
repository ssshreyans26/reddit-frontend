import React, { useState } from "react";
import { Card, Image, Col, Media, Form, Button,Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";


export default function SinglePost(props) {
  // console.log(props);
  // console.log(props);
  const history = useHistory();
  // console.log("some console",props.history.location)
  var dataPost = {};
  if (props.history.location.state) {
    dataPost = props.history.location.state.post;
  }

  const [post, setPost] = useState(dataPost);
  const [comment, setComment] = useState([]);
  const [reply, setReply] = useState();
  const [comments, setComments] = useState([]);
  const [votes,setVotes] = useState({})
  const [replies, setReplies] = useState([]);

  const getComments = () => {
    console.log("inside get Commnets");
    if (localStorage.getItem("uid")) {
      fetch("http://localhost:3000/comments/" + post._id, {
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          uid: localStorage.getItem("uid"),
        },
      }).then((response) => {
        console.warn(response);
        response.json().then((result) => {
          if (result.length > 0) {
            setVotes(result.pop())
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
    if (localStorage.getItem("uid")) {
      var uid = localStorage.getItem("uid")
      fetch("http://localhost:3000/reply/" + comment_id, {
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
          if(!result.error){

            setReplies(result);
          }
          console.warn(result)
          console.log("------------------------------",replies.length)
        });
      });
    } else {
      history.push("/glogin");
    }
  };

  const postCommentReplies = (comment_id) => {

    if (localStorage.getItem("uid")) {
      var uid = localStorage.getItem("uid")
      var data = {
        content: reply,
      };
      fetch("http://localhost:3000/postComments/" +post._id+"/"+comment_id, {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "uid": uid,
        },
        body: JSON.stringify(data),
      }).then((response) => {
        console.warn(response);
        response.json().then((result) => {
          // setCommentReplies(result);
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
      content: com,
    };
    console.log(data);
    var uid = localStorage.getItem("uid");
    if (localStorage.getItem("uid")) {
      fetch("http://localhost:3000/postComments/" + post._id + "/" + null, {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "uid": uid,
        },
        body: JSON.stringify(data),
      }).then((response) => {
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
      fetch("http://localhost:3000/votePosts/" + postId, {
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
    if (!localStorage.getItem("uid")) {
      //redirect to login page
      history.push("/glogin");
    } else {
      fetch("http://localhost:3000/votecomments/" + commentId, {
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

  const updateCommentReplyVote = (commentId, actions) => {
    // console.log(localStorage.getItem("uid"))
    // if(actions==="increment"){
    //   setUpColor("green")
    // }
    if (!localStorage.getItem("uid")) {
      //redirect to login page
      history.push("/glogin");
    } else {
      fetch("http://localhost:3000/votecomments/" + commentId, {
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



  const getPostDetails = () => {
    console.log("you are here");
    if (localStorage.getItem("uid")) {
      fetch("http://localhost:3000/post/" + post._id, {
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
  }, []);

  return (
    <div className="jumbotron">

      <Card border="light" bg="dark" text="light">
        <Card.Header as="h4" className="">
          {post.test.length !== 0 ? (
            <Col xs={6} md={6}>
              {" "}
              <Image
                width={50}
                height={50}
                src={post.test[0].image}
                roundedCircle
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

        <Card.Body>
          <Card.Title>{post.caption}</Card.Title>
          {/* <Card.Img variant="top" src="{post.Location}" /> */}
          <Card.Text>{post.desc}</Card.Text>
          {/* <Button variant="light">Go somewhere</Button> */}

          <FontAwesomeIcon
            className="mr-1"
            size="2x"
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
            className="mr-1"
            size="2x"
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
          <Form.Group as={Col}>
            <Form.Label>
              <strong>Add Comments</strong>
            </Form.Label>
            <Form.Control
              onChange={(e) => setComment(e.target.value)}
              type="string"
              placeholder="Enter Comments"
              required
            />
          </Form.Group>
          <Button
            variant="dark"
            className="col-3"
            onClick={() => {
              postComments(comment, post);
            }}
          >
            Add Comments
          </Button>
        </Form.Row>
      </Form>
<Row>
          <Col md={8}>
      {/* COMMENTS  */}
      {comments.length !== 0 ? (
        comments.map((item, key) => (
          <Card border="light" bg="secondary" text="light" className="">
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

            <Card.Body>
              {/* <Card.Title>{post.caption}</Card.Title> */}
              {/* <Card.Img variant="top" src="{post.Location}" /> */}
              <Card.Text>{item.content}</Card.Text>
              {/* <Button variant="light">Go somewhere</Button> */}

              <FontAwesomeIcon
                className="mr-1"
                size="2x"
                icon={faArrowCircleUp}
                onClick={() => {
                  updateCommentVote(item._id, "increment");
                }}
                style={{ cursor: "pointer",color:(votes[item._id]===1)
    ?"green"
    :"white" }}
              />
              <span className="text-center mx-2 mb-2">{item.votes}</span>
              <FontAwesomeIcon
                className="mr-1"
                size="2x"
                icon={faArrowCircleDown}
                onClick={() => {
                  updateCommentVote(item._id, "decrement");
                }}
                style={{ cursor: "pointer" ,color:(votes[item._id]===-1)
    ?"red"
    :"white"}}
              />
              <FontAwesomeIcon
                className="ml-0"
                size="2x"
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
          <Col md={4}>
      {/* Replies  */}
      {replies.length !== 0 ? (
        replies.map((item, key) => (
          
          <Card border="light" bg="secondary" text="light" className="">
            <Card.Header as="h4" className="">
              {item.length !== 0 ? (
                <Col xs={6} md={6}>
                  {" "}
                  <Image
                    width={50}
                    height={50}
                    src={item.image}
                    roundedCircle
                  />{" "}
                  {item.displayName}{" "}
                </Col>
              ) : (
                <Col xs={6} md={4}>
                  {" "}
                  <Image src="{post.test[0].image}" roundedCircle />{" "}
                </Col>
              )}
            </Card.Header>

            <Card.Body>
              {/* <Card.Title>{post.caption}</Card.Title> */}
              {/* <Card.Img variant="top" src="{post.Location}" /> */}
              <Card.Text>{item.content}</Card.Text>
              {/* <Button variant="light">Go somewhere</Button> */}

              <FontAwesomeIcon
                className="mr-1"
                size="2x"
                icon={faArrowCircleUp}
                onClick={() => {
                  updateCommentReplyVote(item._id, "increment");
                }}
                style={{ cursor: "pointer",color:(votes[item._id]===1)
    ?"green"
    :"white" }}
              />
              <span className="text-center mx-2 mb-2">{item.votes}</span>
              <FontAwesomeIcon
                className="mr-1"
                size="2x"
                icon={faArrowCircleDown}
                onClick={() => {
                  updateCommentReplyVote(item._id, "decrement");
                }}
                style={{ cursor: "pointer" ,color:(votes[item._id]===-1)
    ?"red"
    :"white"}}
              />
              <FontAwesomeIcon
                className="ml-0"
                size="2x"
                icon={faCommentDots}
                onClick={() => {
                  getCommentReplies(item._id);
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
    </div>
  );
}
