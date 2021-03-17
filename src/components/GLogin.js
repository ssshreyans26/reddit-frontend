import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Header from './Header';

// const gLogin = () => {
  //     // fetch("http://localhost:3000/auth/google",{  
    //     // mode: 'cors',
    //     // headers: {
//     //   'Access-Control-Allow-Origin':'*'
//     // }}).then((response) => {
//     //   console.warn(response);
//     //   response.json().then((result) => {  
//     //     console.warn(this.state.postDetails);
//     //   });
//     // });
//   };


export default function GLogin(props) {
  const history = useHistory();
  const [uid, setUid] = useState("");
  const responseSuccessGoogle = (response) => {
    console.log(response);
    fetch("http://localhost:3000/login",{  
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    }).then((result) => {
      
      result.json().then((rel) => {
        // return  this.props.history.push('/auth/');
        // redirectToAuth();
        setUid(rel.user._id);
        console.log(uid)
        if(rel.firstLogin===1){
          history.push('/auth');
        }
        else{
          if(props.history.location.state){

            history.push(props.history.location.state.api)
          }
          else{
            history.push('/')
          }
        }
        console.warn(rel);
        // return rel;
      });
    });
    
  }
  React.useEffect(() => {
    localStorage.setItem('uid', JSON.stringify(uid));
  });
  
  const responseErrorGoogle = (response) => {
    console.warn(response);
  }
  return (
    
    <div class="col-md-3">
  <GoogleLogin
    clientId="143507902217-1tlo2o3f38t402n736r1hbnk8j2da655.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseSuccessGoogle}
    onFailure={responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
  />
  </div>
    )
}