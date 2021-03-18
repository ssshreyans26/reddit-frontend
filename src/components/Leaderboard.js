import React, { useState } from 'react';
import { Table } from "react-bootstrap";



export default function Leaderboard() {
const [leaderboard,setLeaderboardDetails] = useState()
const getLeaderboardData = () => {

    fetch("http://localhost:3000/leaderboard", {
        mode: "cors",
        method:"GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }).then((response) => {
        console.warn(response);
        response.json().then((result) => {
            console.warn(result)
            setLeaderboardDetails(result)
            } 
        );
      })
    }

    React.useEffect(() => {
        getLeaderboardData();
        },[]);

return (
        <div>
        <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
  {leaderboard.map((item,key) => (
    <tr>
      <td>{key}</td>
      <td>{/*item.key*/}</td>
      <td>{/*item.key*/}</td>
      <td>{/*item.key*/}</td>
    </tr>
  ))}
  </tbody>
</Table>    

        </div>
    )
}
