import React, { useState } from "react";
import { Card, Image,Button} from 'react-bootstrap';
import "../css/profile.css";


	// const [profileinfo,setProfileInfo] = useState();
	// const getProfile = () => {
	// 	var uid = localStorage.getItem("uid")
	// 	fetch("https://obscure-journey-24994.herokuapp.com/profile",{  
	// 		mode: 'cors',
	// 		headers: {
	// 		  'Accept': 'application/json',
	// 		  'Content-Type': 'application/json',
	// 		  "uid":uid
	// 		},
	// 	  }).then((result) => {
			
	// 		result.json().then((rel) => {
	// 			console.log(rel)
	// 			setProfileInfo(rel)
	// 		});
	// 	  });
		  
	// 	}
	
	// 	React.useEffect(() => {
	// 		getProfile();
	// 		// localStorage.setItem('uid', JSON.stringify(uid));
	// 	  });	
	export default function Profile() {
	const [ createdAt,setCreatedAt] = useState()
	const [profileInfo,setProfileInfo] = useState(null)
    const getProfileInfo = () => {
		console.log("here")
        var uid = localStorage.getItem('uid')
        fetch("https://obscure-journey-24994.herokuapp.com/profile",{  
          method: 'GET', 
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'uid': uid
        },
        }).then((result) => {        
          result.json().then((rel) => {
              console.log(rel)
			  setProfileInfo(rel)
				if(profileInfo!==null){
					var d = new Date(profileInfo[0].createdAt)
					setCreatedAt(d.toUTCString())

					
					// setCreatedAt(d)
				}

          });
        });
        
      }
      React.useEffect(() => {
		getProfileInfo();
      },[profileInfo===null]);
	return (
		<div>
			{(profileInfo!==null)
?<div className="container mt-3">
<div className="row gutters">
	<div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
		<div className="card h-100">
			<div className="card-body">
				<div className="account-settings">
					<div className="user-profile">
						<div className="user-avatar">
							<Image src={profileInfo[0].image} alt="Maxwell Admin"/>
						</div>
						<h5 className="user-name">{profileInfo[0].displayName}</h5>
						<h6 className="user-email">{profileInfo[0].email}</h6>
					</div>
					<div className="about">
						<h5 className="mb-2 text-primary">Profile Created On</h5>
						<p>{createdAt}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
		<div className="card h-100">
			<div className="card-body">
				<div className="row gutters">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<h6 className="mb-3 text-primary">Personal Details</h6>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						<div className="form-group">
							<p></p>
							{/* <Input.label for="fullName">Full Name</Input.label>
							<Input type="text" className="form-control" id="fullName" placeholder="Enter full name"/> */}
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						<div className="form-group">
							{/* <Input.label for="eMail">Email</Input.label>
							<Input type="email" className="form-control" id="eMail" placeholder="Enter email ID"/> */}
						</div>
					</div>

					</div>
				</div>

				</div>
				<div className="row gutters">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<div className="text-right">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	:<p>Loding profile Info</p>
			}
	</div>


    )
}
