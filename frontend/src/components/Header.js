import "../css/Header.css";
import axios from "axios";
import { Link } from "react-router-dom";
import user_image_header from "../images/user_image_header.jpg";
import { useEffect, useState } from "react";

function Header() {
  const [username, setUsername] = useState('');

  const one = 1;
  const token = localStorage.getItem('accessToken');

  useEffect(() =>{
    (async () =>{
      try{
        const response = await axios.get(`http://localhost:8000//${token}`);
        setUsername(response.data.username);
      }catch (error) {
        console.error('Error:', error);
      }
    })();

    (async () =>{
      try{
        const response = await axios.get(`http://localhost:8000/get_user_details/${token}`);
        setUsername(response.data.username);
      }catch (error) {
        console.error('Error:', error);
      }
    })();
},[one])

  return (
    <div className="header">
      <div className="logo">SAAIS</div>
      <div className="menu">
        {token == null ? (
          <Link to="/signin" className="btn">
            Get Started
          </Link>
        ) : (
          <div className="header-user">
            <h3 className="menu-item">{username}</h3>
            <img className="header-user-img" src={user_image_header} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
