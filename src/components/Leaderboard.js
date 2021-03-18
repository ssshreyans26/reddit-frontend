import React, { useState } from 'react';
import { Table,Image } from "react-bootstrap";



export default function Leaderboard() {
const [leaderboard,setLeaderboardDetails] = useState([])
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
    // getLeaderboardData();
    React.useEffect(() => {
        getLeaderboardData();
        },[]);

return (
        <div>
        <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Ranks</th>
      <th>Image</th>
      <th>Display Name</th>
      <th>Karma</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  {leaderboard.map((item,key) => (
    <tr>
      <td>{key}</td>
      <td>              
        <Image
                width={50}
                height={50}
                src={item.image}
                roundedCircle
              /></td>
      <td>{item.displayName}</td>
      <td>{item.karma}</td>
    </tr>
  ))}
  </tbody>
</Table>    

        </div>
    )
}
