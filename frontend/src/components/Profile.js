import {React, useEffect, useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "../css/Profile.css";
import SaaisHeader from "./SaaisHeader";
import user_image_header from "../images/user_image_header.jpg";

const Profile = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    username: "",
    phone_no: "",
    password: "",
    is_active: "",
  });

  const one = 1;

  const token = localStorage.getItem('accessToken');

  useEffect(() =>{
    (async () =>{
      try{
        const response = await axios.get(`http://localhost:8000/get_user_details/${token}`);
        setFormData(
          {
            full_name: response.data.full_name ?? "",
            email: response.data.email ?? "",
            username: response.data.username ?? "",
            phone_no: response.data.phone_no ?? "",
            password: response.data.password ?? "",
            is_active: response.data.is_active ?? "",
          }
        );
      }catch (error) {
        console.error('Error:', error);
      }
    })();
},[one])

  const changePassword = async() => {
    try{
      const response = await axios.get(`http://localhost:8000/forgot_password/send_verification_mail/${formData.email}`);
      console.log(response);
      if(response.status === 200){
        alert("Change your password by clicking the link send to your mail");
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
      try{
        const updatedData = {
          "full_name": formData.full_name,
          "email": formData.email,
          "username": formData.username,
          "password": formData.password,
          "phone_no": formData.phone_no,
          "is_active": formData.is_active,
        }
        const response = axios.put(`http://localhost:8000/edit_user_profile/${token}`, updatedData, {
            headers:{
              'Content-Type': 'application/json',
            }
        });
        console.log(response);
      }
      catch (error) {
        console.error('Error:', error);
      }
  }

  return (
    <div className="profile">
      <SaaisHeader />
      <div className="profile-container">
        <div className="profile-heading">User Profile</div>
        <div className="profile-upper-div">
          <div className="profile-img-div">
            <div>
                <img className="profile-img" src={user_image_header} alt="img" />
                <FontAwesomeIcon className="camera-icon" icon={faCamera}/>
            </div>
            <button type="button" className="profile-change-password" onClick={changePassword}>Change Password</button>
          </div>
          <div className="profile-intro">
            <input className="profile-input" placeholder="Name" name="full_name" value={formData.full_name} onChange={handleInputChange}/>
            <input className="profile-input" placeholder="Username" name="username" value={formData.username} onChange={handleInputChange}/>
            <input className="profile-input" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange}/>
            <input className="profile-input" placeholder="phone_no" name="phone_no" value={formData.phone_no} onChange={handleInputChange}/>
          </div>
        </div>
        <div className="profile-buttons-div">
            <button type="submit" className="profile-btn" onClick={handleSubmit}>Save Profile</button>
            {/* <button type="button" className="profile-btn">Change Password</button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
