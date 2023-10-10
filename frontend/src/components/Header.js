import '../css/Header.css';
function Header() {
  return (
      <div className='header'>
        <div className='logo'>SAAIS</div>
        <div className='menu'>
          <div className='menu-item'>About us</div>
          <button class='btn'>Get Started</button>
        </div>
      </div>
  );
}

export default Header;