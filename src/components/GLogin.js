import React from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

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


export default function GLogin() {
  const history = useHistory();
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

        if(rel.firstLogin===1){
          history.push('/auth');
        }
        else{
          console.log("don't know where to go")
        }
        console.warn(rel);
        // return rel;
      });
    });
    
  }
  // React.useEffect(() => {
  //   localStorage.setItem('uid', JSON.stringify(rel.user._id));
  // });
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
