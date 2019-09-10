import React from 'react';
import moment from 'moment';


const User = (props) => {
  const date = moment(props.date).format("YYYY/MM/DD")
  return (
    <li>
      <h2>{props.firstName}  {props.lastName}</h2>
      <p>{props.email}</p>
      <p>{props.phone}</p>
      <img src={props.image} alt="user"/>
      <p>Registerd Date: {date}</p>
    </li>
  )
}

export default User;
