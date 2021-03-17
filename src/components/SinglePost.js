import React, { useState } from 'react'
import { Card, Image, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';

export default function SinglePost(props) {
  console.log(props);  
  console.log(props.history.location.state.post_id)
    const history = useHistory();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([])
    const [commentReplies,setCommentReplies] = useState([])
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

    const getPostDetails = (postid) => {
        console.log("you are here")
        if(localStorage.getItem('uid')){

            fetch("http://localhost:3000/post/"+postid, {
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
          console.log("inside use effect")
           getPostDetails(props.history.location.state.post_id);
          //  getComments();
           },[]);
    return (
      <div className="container">
      
      </div>
    )
}
