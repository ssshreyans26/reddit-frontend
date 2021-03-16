import React, { Component } from "react";
import { Card, Image, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      postDetails: [],
      uid: localStorage.getItem("uid"),
    };
}
 updateVote = (postId,actions) => {
      
  if (!localStorage.getItem("uid")) {
    //redirect to login page
    this.context.router.history.push("/glogin");

  } else {
    fetch("http://localhost:3000/votePosts/:"+ postId,{  
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"actions":actions})
    }).then((result) => {
      result.json().then((rel) => {
      });
    });
    // update icon to green/red
    //upadte the number (basically set state again)
  }
};

  componentDidMount() {
    fetch("https://obscure-journey-24994.herokuapp.com/feed", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      console.warn(response);
      response.json().then((result) => {
        this.setState({
          postDetails: result,
        });
        console.warn(this.state.postDetails);
      });
    });
  }
  render() {
    return (
      <div className="container">
        {this.state.postDetails.map((post) => (
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
                onClick={this.updateVote(post._id,"increment")}
              />
              <span className="text-center mx-2 mb-2">{post.votes}</span>
              <FontAwesomeIcon
                className="mr-1"
                size="2x"
                icon={faArrowCircleDown}
                onClick={this.updateVote(post._id,"decrement")}
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
    );
  }
}
