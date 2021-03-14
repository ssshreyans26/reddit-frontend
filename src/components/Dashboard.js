import React, { Component } from "react";
import { Card } from "react-bootstrap";
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
    };
  }
  componentDidMount() {
    fetch("http://localhost:3005/feed",{  
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin':'*'
    }}).then((response) => {
      console.warn(response);
      response.json().then((result) => {
        this.setState({
          postDetails: result,
        })
        console.warn(this.state.postDetails);
      });
    });
  }
  render() {
    return (
      <div className="container">
        {(this.state.postDetails).map((post) => (
            
          <Card border="light" bg="dark" text="light">
            <Card.Header as="h3" className="">
              {post.uid}
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
              />
              <FontAwesomeIcon
                className="mr-1"
                size="2x"
                icon={faArrowCircleDown}
              />
              <FontAwesomeIcon size="2x" icon={faCommentDots} />
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
