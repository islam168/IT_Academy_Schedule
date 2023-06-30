import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'react-calendar';
import AuthContext from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Schedule.css'; // CSS styles for the calendar

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { authTokens, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const calendarRef = useRef();
  const calendarContainerRef = useRef();


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

  const handleTodayClick = () => {
    setSelectedDate(new Date());
    if (calendarContainerRef.current) {
      calendarContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


const tileContent = ({ date }) => {
  const day = date.getDay();

  if (
    selectedGroup &&
    selectedGroup.schedule &&
    selectedGroup.schedule.course_start_date &&
    selectedGroup.schedule.course_end_date
  ) {
    const {
      mentor_days,
      reviewer_days,
      course_start_date,
      course_end_date
    } = selectedGroup.schedule;
    const startDate = new Date(course_start_date);
    startDate.setDate(startDate.getDate() - 1); // Subtract one day from startDate
    const endDate = new Date(course_end_date);

    if (startDate <= date && date < endDate) {
      const cancelingGroupClass = selectedGroup.canceling_group_class || [];
      const cancelingGroupsClass = schedule.canceling_groups_class || [];

      const formattedDate = new Date(date);
      formattedDate.setDate(formattedDate.getDate()+1); // Subtract one day from formattedDate

      if (cancelingGroupClass.includes(formattedDate.toISOString().split('T')[0])) {
        return (
          <div className="calendar-content">
            <span className="red">❌</span>
          </div>
        );
      }

      if (
        cancelingGroupsClass.find((item) => item.date === formattedDate.toISOString().split('T')[0])
      ) {
        return (
          <div className="calendar-content">
            <span className="red">❌</span>
          </div>
        );
      }

      if (mentor_days.includes(day)) {
        return (
          <div className="calendar-content">
            <span className="blue">🥷</span>
          </div>
        );
      }

      if (reviewer_days.includes(day)) {
        return (
          <div className="calendar-content">
            <span className="green">👨‍💻</span>
          </div>
        );
      }
    }
  }

  return null;
};



  return (
    <div className="container">
      <div className="schedule-wrapper">
        <h2 className="schedule-title">Расписание</h2>
        <div className="schedule-buttons">
          <button onClick={handleUserGroupClick} className="btn btn-primary mr-2">
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
            <h3 className="schedule-subtitle">
              Выбранная группа: {selectedGroup.name}
            </h3>
            <h4 className="schedule-subtitle schedule-subtitle-size">
              Ментор: {selectedGroup.mentor && selectedGroup.mentor.name} 🥷
            </h4>
            <h4 className="schedule-subtitle schedule-subtitle-size">
              Ревьювер: {selectedGroup.reviewer && selectedGroup.reviewer.name} 👨‍💻
            </h4>
            <h4 className="schedule-subtitle">
                Время: {selectedGroup.schedule?.time_start?.slice(0, 5)} - {selectedGroup.schedule?.time_end?.slice(0, 5)}
            </h4>
            <h4 className="schedule-subtitle">
              Аудитория: {selectedGroup.schedule.auditoria && selectedGroup.schedule.auditoria.name}
            </h4>
          </div>
        )}

        <div className="calendar-container">
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            tileContent={tileContent}
            ref={calendarRef}
          />

        </div>
      </div>
    </div>
  );
};

export default Schedule;
