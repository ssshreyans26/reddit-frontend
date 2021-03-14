import React from 'react'

const gLogin = () => {
    fetch("http://localhost:3000/auth/google",{  
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin':'*'
    }}).then((response) => {
      console.warn(response);
      response.json().then((result) => {

        console.warn(this.state.postDetails);
      });
    });
  };
export default function GoogleLogin() {
    return (
  <div class="col-md-3">
    <a className="btn btn-outline-dark glogin-button"         
       onClick={() => {
       gLogin();
          }}
       role="button">
      <img alt="Google sign-in" className="glogin" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
      Login with Google
    </a>
  </div>
    )
}
