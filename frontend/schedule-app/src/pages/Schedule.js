import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Schedule.css'; // Подключение CSS-файла для дополнительных стилей

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = authTokens.access;
        const response = await axios.get('http://127.0.0.1:8000/api/schedule/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSchedule(response.data);
        setSelectedGroup(response.data.user_group);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logoutUser();
          navigate('/login');
        }
      }
    };

    fetchSchedule();
  }, [authTokens, logoutUser, navigate]);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleUserGroupClick = () => {
    setSelectedGroup(schedule.user_group);
  };

  return (
    <div className="container">
    <div className="schedule-wrapper" >
        <h2 className="schedule-title">Расписание</h2>
        <div className="schedule-buttons">
          <button
            onClick={handleUserGroupClick}
            className="btn btn-primary mr-2"
          >
            {schedule.user_group && schedule.user_group.name}
          </button>
          {schedule.other_groups &&
            schedule.other_groups.map((group) => (
              <button
                key={group.id}
                onClick={() => handleGroupClick(group)}
                className="btn btn-primary btn-white mr-2"
              >
                {group.name}
              </button>
            ))}
        </div>
        {selectedGroup && (
          <div className="schedule-details">
            <h3 className="schedule-subtitle">Выбранная группа: {selectedGroup.name}</h3>
            <h4 className="schedule-subtitle">Ментор: {selectedGroup.mentor && selectedGroup.mentor.name}</h4>
            <h4 className="schedule-subtitle">Ревьювер: {selectedGroup.reviewer && selectedGroup.reviewer.name}</h4>
          </div>
        )}
      </div>
        <div className="calendar">

          <header>
            <button className="secondary" >Сегодня</button>
            <div className="calendar__title">
              <div className="icon secondary chevron_left">‹</div>
              <h1 className="calendar-h1" ><span></span><strong>18 Июня – 24 Июня</strong> 2023</h1>
              <div className="icon secondary chevron_left">›</div>
            </div>
            <div className="header-bottom"></div>
          </header>

          <div className="outer">


            <table>
              <thead>
              <tr>
                <th className="headcol"></th>
                <th>Пн, 18</th>
                <th>Вт, 19</th>
                <th className="today">Ср, 20</th>
                <th>Чт, 21</th>
                <th>Пт, 22</th>
                <th className="secondary">Сб, 23</th>
                <th className="secondary">Вс, 24</th>
              </tr>
              </thead>
            </table>

            <div className="wrap">
              <table className="offset">

                <tbody>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td className="past"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">6:00</td>
                  <td></td>
                  <td></td>
                  <td className="past"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td className="past"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">7:00</td>
                  <td></td>
                  <td></td>
                  <td className="past"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td className="now"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">8:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="event double"><input id="check" type="checkbox" className="checkbox"/><label
                        htmlFor="check"></label>8:30–9:30 Python
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">9:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">10:00</td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="event double"><input id="check" type="checkbox" className="checkbox"/><label
                        htmlFor="check"></label>10:00–11:00 Meeting
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">11:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">12:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">13:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">14:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">15:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">16:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">17:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol">18:00</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="headcol"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

  );
};

export default Schedule;
