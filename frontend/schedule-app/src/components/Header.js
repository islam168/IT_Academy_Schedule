import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Header.css'; // Подключение CSS-файла для дополнительных стилей

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
      <nav className="navbar navbar-dark bg-dark">
      <Link to="/schedule" className="navbar-brand">
        Schedule
      </Link>
      <span className="navbar-text">
        {user ? (
          <button onClick={logoutUser} className="logout-button">Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </span>
    </nav>
  );
};

export default Header;
