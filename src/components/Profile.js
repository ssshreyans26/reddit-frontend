import React from 'react'
import { Card, Image,Button} from 'react-bootstrap';
import "../css/profile.css";
export default function profile() {
    return (
		<div>
<div className="container mt-3">
<div className="row gutters">
	<div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
		<div className="card h-100">
			<div className="card-body">
				<div className="account-settings">
					<div className="user-profile">
						<div className="user-avatar">
							<Image src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Maxwell Admin"/>
						</div>
						<h5 className="user-name">Yuki Hayashi</h5>
						<h6 className="user-email">yuki@Maxwell.com</h6>
					</div>
					<div className="about">
						<h5 className="mb-2 text-primary">About</h5>
						<p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
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
	</div>


    )
}
