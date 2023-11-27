import "../css/Header.css";
import axios from "axios";
import { Link } from "react-router-dom";
import user_image_header from "../images/user_image_header.jpg";
import { useEffect, useState } from "react";

function Header() {
  const [username, setUsername] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);

  const token = localStorage.getItem('accessToken');

  useEffect(() =>{
    (async () =>{
      try{
        const response = await axios.get(`http://localhost:8000/is_valid/${token}`);
        console.log("is valid token",response.data);
        if(response.data === true){
          setIsTokenValid(true);
        }
        else{
          setIsTokenValid(false);
        }
      }catch (error) {
        console.error('Error:', error);
      }
    })();
},[token])

  useEffect(()=>{
      (async () =>{
        try{
          const response = await axios.get(`http://localhost:8000/get_user_details/${token}`);
          console.log('username',response.data.username);
          setUsername(response.data.username);
        }catch (error) {
          console.error('Error:', error);
        }
      })();
  },[isTokenValid,token])

  return (
    <div className="header">
      <div className="logo">SAAIS</div>
      <div className="menu">
        {username ? (
          <div className="header-user">
            <h3 className="menu-item">{username}</h3>
            <img className="header-user-img" src={user_image_header} alt="" />
          </div>
        ) : (
          <Link to="/signin" className="btn">
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
