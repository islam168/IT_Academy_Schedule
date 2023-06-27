import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'; // Подключение CSS-файла для дополнительных стилей
import {Link} from "react-router-dom";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(e.target.email.value, e.target.password.value);
    if (response.error) {
      setErrorMessage('Неверный логин или пароль');
    }
  };

  return (
  <div className="background">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <form onSubmit={handleSubmit} className="transparent-bg">
        <h2 className="row justify-content-center text-white">Login</h2>
        <div className="form-group">
          <label htmlFor="email" className="text-white">Email</label>
          <input type="text" className="form-control" id="email" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password"  className="text-white">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter password" />
        </div>
        <div className="registration-btn">
        <Link to="/registration">Registration</Link>
          </div>
        <button type="submit" className="btn btn-primary">Login</button>
        {errorMessage && <p className="mt-3 text-danger text-white">{errorMessage}</p>}
      </form>
    </div>
  </div>
</div>

  );
};

export default LoginPage;
