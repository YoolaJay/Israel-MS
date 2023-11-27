// import React, { useState, useEffect } from 'react';
// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';

// const Scheduler: React.FC = () => {
//   // Define the Event type
//   type Event = {
//     id: number;
//     day: string;
//     time: string;
//     title: string;
//   };

//   // Function to add a new event
//   const addEvent = (day: string, time: string, title: string) => {
//     const newEvent: Event = {
//       id: Date.now(),
//       day,
//       time,
//       title,
//     };
//     setEvents([...events, newEvent]);
//   };

//   const timeslots = ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];
//   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//   const [events, setEvents] = useState<Event[]>([]);

//   useEffect(() => {
//     const calendar = new Calendar(document.getElementById('calendar')!, {
//       plugins: [dayGridPlugin],
//       events: [ ], // Add your events here
//     });

//     calendar.render();
//   }, []); // Make sure the dependency array is empty or contains only constants

//   return (
//     <div className='flex'>
//       <div className="p-3">
//         <h1 className="text-2xl font-semibold mb-4">Scheduler</h1>
//         <table className="table-fixed w-full h-full">
//           <thead>
//             <tr>
//               <th className="w-1/7">Time</th>
//               {days.map((day) => (
//                 <th key={day} className="w-1/7">
//                   {day}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {timeslots.map((time) => (
//               <tr className="h-16" key={time}>
//                 <td>{time}</td>
//                 {days.map((day) => (
//                   <td
//                     key={day}
//                     className="border text-center relative"
//                     onClick={() => {
//                       const title = prompt('Enter event title:');
//                       if (title) {
//                         addEvent(day, time, title);
//                       }
//                     }}
//                   >
//                     {events
//                       .filter((event) => event.day === day && event.time === time)
//                       .map((event) => (
//                         <div key={event.id} className="p-1 bg-blue-200 rounded text-sm">
//                           {event.title}
//                         </div>
//                       ))}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className='p-7'>
//         <div id="calendar" className="bg-white p-2 rounded-xl shadow w-80 h-96"></div>
//       </div>
//     </div>
//   );
// };

// export default Scheduler;

import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';




const Scheduler: React.FC = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Page Unavailable</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, the page is not available at the moment. You'll find lots to explore on the dashboard and reports page. </p>
            <a href="#" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
          </div>
        </div>
      </section>
    );
  };
  
  export default Scheduler;
  