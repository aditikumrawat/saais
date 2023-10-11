import React from "react";
import { useState, useEffect } from "react";
import "../css/SignUp.css";

const SignUp = () => {
    const [users, setUsers] = useState([]);

  const fetchUserData = () => {
    fetch("http://localhost:8000/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className="signup">
      <div className="signup-container">
        {users.map((ind) => (
          <h1 key={ind.username}>{ind.first_name}</h1>
        ))}
      </div>
    </div>
  );
}

export default SignUp;
