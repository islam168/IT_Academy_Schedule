import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'; // Подключение CSS-файла для дополнительных стилей
import {Link} from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(e.target.email.value, e.target.password.value);
    if (response.error) {
      setErrorMessage('Неверный логин или пароль');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="background">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="transparent-bg">
            <div className="title-wrapper">
              <h2 className="text-white">Войти</h2>
              <div className="registration-btn">
                <Link to="/registration" className="btn btn-primary">Зарегистрироваться</Link>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-white">Электронная почта:</label>
              <input type="text" className="form-control" id="email" placeholder="Введите адрес электронной почты" />
            </div>
            <div className="form-group password-input">
              <label htmlFor="password" className="text-white">Пароль:</label>
              <div className="password-field">
                <input type={showPassword ? 'text' : 'password'} className="form-control" id="password" placeholder="Введите пароль"/>
                <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Войти</button>
            {errorMessage && <p className="mt-3 text-danger text-white">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
