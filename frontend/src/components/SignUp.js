import React from "react";
import { useState} from "react";
import "../css/SignUp.css";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password,setPassword] = useState("");

  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "firstName"){
        setFirstName(value);
    }
    if(id === "lastName"){
        setLastName(value);
    }
    if(id === "userName"){
      setUserName(value);
    }
    if(id === "email"){
        setEmail(value);
    }
    if(id === "password"){
        setPassword(value);
    }
}

const handleSubmit  = () => {
  console.log(firstName,lastName,email,userName,password);

  const user = {
    "first_name":firstName,
    "last_name":lastName,
    "email":email,
    "username":userName,
    "password":password 
  }

  axios.post('http://localhost:8000/register_user', user, {
  headers: {
    'Content-Type': 'application/json',
  }
})
  .then((response) => {
    console.log('Response:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

  return (
    <div className="signup">
      <div className="signup-container">
        <form onSubmit={(e)=> e.preventDefault()} action="">
          <label htmlFor="firstName">Enter FirstName</label>
          <input name="firstName" id="firstName" type="text" placeholder="FirstName" value={firstName} onChange = {(e) => handleInputChange(e)}/>
          <br />
          <label htmlFor="lastName">Enter LastName</label>
          <input name="lastName" id="lastName" type="text" placeholder="lastName" value={lastName} onChange = {(e) => handleInputChange(e)}/>
          <br />
          <label htmlFor="userName">Enter UserName</label>
          <input name="userName" id="userName" type="text" placeholder="userName" value={userName} onChange = {(e) => handleInputChange(e)}/>
          <br />
          <label htmlFor="email">Enter Email</label>
          <input name="email" id="email" type="email" placeholder="email" value={email} onChange = {(e) => handleInputChange(e)}/>
          <br />
          <label htmlFor="password">Enter Password</label>
          <input name="password" id="password" type="password" placeholder="password" value={password} onChange = {(e) => handleInputChange(e)}/>
          <br />
          <button onClick={()=>handleSubmit()} type="submit" className="button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
