import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
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
      });
  };

  return (
    <div className="background">
        <div className="row justify-content-center">
    <div className="col-md-6">
      <form onSubmit={handleSubmit} className="transparent-bg">
        <h2 className="row justify-content-center text-white">Registration</h2>
        <div className="form-group">
          <label htmlFor="name" className="text-white">Full Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="text-white">Email:</label>
          <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="group" className="text-white">Group:</label>
          <select className="form-control" id="group" value={group} onChange={(e) => setGroup(e.target.value)} required>
            <option value="">Select a group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group text-white">
          <label>Roles:</label>
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
        <div className="form-group">
          <label htmlFor="password" className="text-white">Password:</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="login-btn">
        <Link to="/login">Login</Link>
          </div>
        <button type="submit" className="btn btn-primary">Register</button>
        {errorMessage && <p className="mt-3 text-danger text-white">{errorMessage}</p>}
      </form>
    </div>
  </div>
</div>
  );
};

export default Registration;
