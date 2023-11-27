import { Icon } from '@iconify/react';
import React, { useState } from 'react';

const TopNav: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  // const closePopUp = () => {
  //   setIsOpen(false);
  // };

  return (
    <div>
      <div className="rounded-tl-3xl bg-white text-white p-14 flex items-center justify-between">
        {/* Left side of the navigation */}
        <div className="flex items-center space-x-1">
          <input
            type="text"
            placeholder="Search"
            className=" ml-6 px-40 py-3 border border-gray-400 bg-white text-gray-600 rounded-full resize-x"
          />
          <button className="border border-blue-800 bg-blue-700 text-white px-4 py-3 rounded-full flex items-center justify-center"><Icon icon="ion:search-outline" /></button>
        </div>
        
        {/* Right side of the navigation */}
        <div className="flex items-center space-x-4 mr-14">
          <button className="border border-blue-800 bg-green-600 text-white px-4 py-2 rounded-full h-16 w-16 flex items-center justify-center">
            <Icon icon="game-icons:power-button" style={{fontSize:'24px'}} />
          </button>

          <div className='relative inline-block'>
          <button className="border border-blue-800 bg-white text-blue-700 px-4 py-2 rounded-full h-16 w-16 flex items-center justify-center"
          onClick={toggleProfile}>
            <Icon icon="bx:user" style={{fontSize:'24px'}}/>
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              {/* <div className="bg-white p-4 w-64 shadow-md rounded-md"> */}
                {/* <h2 className="text-2xl font-bold mb-4">Pop-up Form</h2> */}
                <form className='p-4'>
                  <div className='w-full text-blue-800 bg-white px-7 py-5 flex flex-col items-center justify-center text-xs border-b-2 font-bold'>
                    <Icon icon="mingcute:user-4-fill" style={{fontSize:'32px'}} />
                    <label>
                      Hello, Admin
                    </label>
                  </div>
                  <button className='w-full text-blue-800 bg-white px-7 py-2 flex items-center justify-center text-xs border-b-2 font-bold'>
                  <Icon icon="bx:key" />
                    Change Password
                  </button>
                  <button className='w-full text-blue-800 bg-white px-7 py-2 flex items-center justify-center text-xs border-b-2 font-bold'>
                  <Icon icon="solar:logout-2-line-duotone" className='mr-2' />
                     Log Out
                  </button>
                </form>
              </div>
            // </div>
          )}
          </div>
          
          
          <div className='relative inline-block'>
          <button className="border border-blue-800 bg-white text-blue-700 px-4 py-2 rounded-full h-16 w-16 flex items-center justify-center"
          onClick={toggleNotification}>
            <Icon icon="majesticons:bell-line" style={{fontSize:'24px'}}/>
          </button>
        
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              {/* <div className="bg-white p-4 w-64 shadow-md rounded-md"> */}
                {/* <h2 className="text-2xl font-bold mb-4">Pop-up Form</h2> */}
                <form className='p-4'>
                  {/* Your form fields go here */}
                  {/* <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Close
                  </button> */}
                  <button className='w-full text-blue-800 bg-white px-7 py-2 flex items-center justify-center text-xs border-b-2 font-bold'>
                  <Icon icon="mdi:file-report-outline"/>
                    Report Ready
                  </button>
                  <button className='w-full text-blue-800 bg-white px-7 py-2 flex items-center justify-center text-xs border-b-2 font-bold'>
                    <Icon icon="bx:mail-send" />
                    New Message
                  </button>
                  <button className='w-full text-blue-800 bg-white px-7 py-2 flex items-center justify-center text-xs border-b-2 font-bold'>
                  <Icon icon="ic:round-library-add" className='pr-1 text-lg' />
                    New Entries
                  </button>
                  <button className='w-full text-blue-800 bg-white px-7 py-2 flex items-center justify-center text-xs border-b-2 font-bold'>
                  <Icon icon="mdi:calendar-outline" className='pr-1 text-lg' />
                    New Events
                  </button>
                </form>
              </div>
            // </div>
          )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TopNav;
