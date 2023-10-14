// import React, {useEffect} from "react";
// import Calendar from 'react-calendar';

// function Events() {
//     const [date, setDate] = useState(new Date());

//     const handleDateChange = (date: Date) => {
//       setDate(date);
//     };
    
//   return (
//     <div className="flex justify-center mt-8">
//         <div className="w-2/3">
//             <div className="grid grid-cols-3 gap-4">
//             <div className="col-span-2">
//                 <Calendar value={date} />
//             </div>
//             <div className="bg-gray-200 p-4">
//                 {/* Event setting component */}
//                 <h2 className="text-lg font-semibold mb-4">Set Event</h2>
//                 {/* Add your event form or component here */}
//             </div>
//             </div>
//         </div>
//     </div>
//     )
// }

// export default Events


import React, { useState, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

const Scheduler: React.FC = () => {
  // Define the Event type
  type Event = {
    id: number;
    day: string;
    time: string;
    title: string;
  };

  // Function to add a new event
  const addEvent = (day: string, time: string, title: string) => {
    const newEvent: Event = {
      id: Date.now(),
      day,
      time,
      title,
    };
    setEvents([...events, newEvent]);
  };

  const timeslots = ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const calendar = new Calendar(document.getElementById('calendar')!, {
      plugins: [dayGridPlugin],
      events: [ ], // Add your events here
    });

    calendar.render();
  }, []); // Make sure the dependency array is empty or contains only constants

  return (
    <div className='flex'>
      <div className="p-3">
        <h1 className="text-2xl font-semibold mb-4">Scheduler</h1>
        <table className="table-fixed w-full h-full">
          <thead>
            <tr>
              <th className="w-1/7">Time</th>
              {days.map((day) => (
                <th key={day} className="w-1/7">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeslots.map((time) => (
              <tr className="h-16" key={time}>
                <td>{time}</td>
                {days.map((day) => (
                  <td
                    key={day}
                    className="border text-center relative"
                    onClick={() => {
                      const title = prompt('Enter event title:');
                      if (title) {
                        addEvent(day, time, title);
                      }
                    }}
                  >
                    {events
                      .filter((event) => event.day === day && event.time === time)
                      .map((event) => (
                        <div key={event.id} className="p-1 bg-blue-200 rounded text-sm">
                          {event.title}
                        </div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='p-7'>
        <div id="calendar" className="bg-white p-2 rounded-xl shadow w-80 h-96"></div>
      </div>
    </div>
  );
};

export default Scheduler;

