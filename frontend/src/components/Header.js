import '../css/Header.css';
import { Link } from 'react-router-dom';
import user_image_header from '../images/user_image_header.jpg'

function Header() {
  const accessToken = window.localStorage.getItem('accessToken');
  const username = window.localStorage.getItem('username');
  return (
    <div className='header'>
      <div className='logo'>SAAIS</div>
      <div className='menu'>
        {
        accessToken == null ? (
          <Link to="/signin" className="btn">
            Get Started
          </Link>
        ) : (
          <div className='header-user'>
            <h3 className='menu-item'>{username}</h3>
            <img className='header-user-img' src={user_image_header} alt=''/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;