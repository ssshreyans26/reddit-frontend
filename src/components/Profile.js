import React, { useState } from "react";
import { Card, Image,Button,Form} from 'react-bootstrap';
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
	const [badgeName,setBadgeName] = useState("")
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
					var name;
					if(profileInfo[0]<100){
						name = "Noob"
						profileInfo[0].badge = 0
					}
					else if(profileInfo[0]<200){
						profileInfo[0].badge = 1
						name = "Contributor"
					}
					else if(profileInfo[0]<300){
						profileInfo[0].badge = 2
						name = "Regular Contributor"
					}
					else if(profileInfo[0]<400){
						profileInfo[0].badge = 3
						name = "Great Contributor"
					}
					else if(profileInfo[0]>=400){
						profileInfo[0].badge = 4
						name = "Ace Contributor"
					}
					// setCreatedAt(d)
					console.log("name",name)
					setBadgeName(name)
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
							<Form.Label for="fullName">First Name</Form.Label>
							<Form.Control type="text" className="form-control" id="fullName" placeholder={profileInfo[0].firstName}/> 
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						<div className="form-group">
						<Form.Label for="fullName">Last Name</Form.Label>
							<Form.Control type="text" className="form-control" id="fullName" placeholder={profileInfo[0].lastName}/> 
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-4">
						<div className="form-group">
							<Form.Label for="fullName">Karma Points</Form.Label>
							<h6 className="mb-3 text-primary">{profileInfo[0].karma}</h6>
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-4">
						<div className="form-group">
						<Form.Label for="fullName">Badge</Form.Label>
						<h6 className="mb-3 text-primary">{profileInfo[0].badge} - {badgeName}</h6>
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
	:<h3>Loading profile Info</h3>
			}
	</div>


    )
}
