import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios.get('/api/schedule/')
      .then(response => {
        setSchedule(response.data);
      })
      .catch(error => {
        console.error('Error fetching schedule:', error);
      });
  }, []);

  return (
    <div>
      <h2>Расписание</h2>
      {schedule.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.time}</p>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
