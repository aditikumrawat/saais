import {React, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "../css/Profile.css";
import SaaisHeader from "./SaaisHeader";
import user_image_header from "../images/user_image_header.jpg";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "Vanshika Rathore",
    email: "vanshikarathore20497@acropolis.in",
    username: "vanshika_61",
    mobile: "",
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
            <button type="button" className="profile-change-password">Change Password</button>
          </div>
          <div className="profile-intro">
            <input className="profile-input" placeholder="Name" value={formData.fullName} onChange={handleInputChange}/>
            <input className="profile-input" placeholder="Username" value={formData.username} onChange={handleInputChange}/>
            <input className="profile-input" placeholder="Email" value={formData.email} onChange={handleInputChange}/>
            <input className="profile-input" placeholder="Mobile No." value={formData.mobile} onChange={handleInputChange}/>
          </div>
        </div>
        <div className="profile-buttons-div">
            <button type="submit" className="profile-btn">Save Profile</button>
            {/* <button type="button" className="profile-btn">Change Password</button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
