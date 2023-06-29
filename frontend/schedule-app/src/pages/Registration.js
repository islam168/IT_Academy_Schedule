import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css'; // Подключение CSS-файла для дополнительных стилей

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('');
  const [password, setPassword] = useState('');
  const [groups, setGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroup();
    fetchRole();
  }, []);

  const fetchGroup = () => {
    axios
      .get('http://127.0.0.1:8000/api/group_list/')
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchRole = () => {
    axios
      .get('http://127.0.0.1:8000/api/role_list/')
      .then((response) => {
        const rolesData = response.data.map((role) => ({
          ...role,
          selected: false,
        }));
        setRoles(rolesData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRoleChange = (event, roleId) => {
    const updatedRoles = roles.map((role) => {
      if (role.id === roleId) {
        return {
          ...role,
          selected: event.target.checked,
        };
      }
      return role;
    });
    setRoles(updatedRoles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedRoles = roles.filter((role) => role.selected).map((role) => role.id);

    const data = {
      name: name,
      email: email,
      group: group,
      role: selectedRoles,
      password: password,
    };


    axios
      .post('http://127.0.0.1:8000/api/registration/', data)
      .then((response) => {
        console.log(response.data);
        setName('');
        setEmail('');
        setGroup('');
        setPassword('');
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
      if (error.response.data === 'пользователь с такой почтой уже существует') {
      setErrorMessage('Пользователь с данной почтой уже существует');
    }
      else if(error.response.data === 'У этой группы уже есть ревьювер') {
      setErrorMessage('У этой группы уже есть ревьювер');
    }
      else if(error.response.data === 'У этой группы уже есть ментор') {
      setErrorMessage('У этой группы уже есть ментор');
    }
      else if(error.response.data === 'Студент') {
      setErrorMessage('Пользователь не может одновременно быть студентом и ментором или ревьювером');
    }
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
   return (
    <div className="background">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="transparent-bg">
              <div className="title-wrapper">
                <h2 className="text-white">Регистрация</h2>
                <div className="login-btn">
                  <Link to="/login" className="btn btn-primary">
                    Войти
                  </Link>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name" className="text-white">
                  Полное имя:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Введите полное имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="text-white">
                  Электронная почта:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Введите адрес электронной почты"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="group" className="text-white">
                  Группа:
                </label>
                <select
                  className="form-control"
                  id="group"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  required
                >
                  <option value="">Выберите группу</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group text-white">
                <label>Роль:</label>
                {roles.map((role) => (
                  <div key={role.id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={role.selected}
                      onChange={(e) => handleRoleChange(e, role.id)}
                    />
                    <label className="form-check-label">{role.name}</label>
                  </div>
                ))}
              </div>
              <div className="form-group password-field">
                <label htmlFor="password" className="text-white">
                  Пароль:
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="password-toggle" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Зарегистрироваться
              </button>
              {errorMessage && <p className="mt-3 text-danger text-white">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
