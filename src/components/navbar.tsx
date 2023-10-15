// import { useState } from "react";
import { Icon } from '@iconify/react';
import Logo from "@/assets/logo.png";
import TopNav from './topnav';
import {Link, useLocation} from 'react-router-dom';


// const Navbar = (props: Props) => {
const Navbar: React.FC = () => {
  const location = useLocation();
  // return <nav>
  return(
    <div className="w-80 bg-blue-900 h-screen text-white overflow-hidden">
      
      {/* Sidebar content */}
        <div>
            <img className="mx-auto align-middle pt-20" alt="logo" src={Logo} width="100" height="100" />
        </div>

        <div className="mt-20 pt-10 flex justify-center space-x-2">
          <ul className="list-none pl-20 w-80">
            <li className={`${location.pathname === '/dashboard' ? 'active' : ''} hover:bg-white hover:text-blue-800 mb-5 hover:rounded flex items-center space-x-1`}>
            <Icon icon="ic:baseline-dashboard" style={{fontSize:'24px'}}/>
              <span className="pr-5">
                <Link to="/dashboard" 
                  className="flex-grow block px-4 py-2 "
                >
                  Dashboard
                </Link>
              </span>
            </li>

            <li className={`mb-5 flex items-center space-x-1 hover:bg-white hover:text-blue-800 hover:rounded ${location.pathname === '/general' ? 'active' : ''}`}>
            <Icon icon="bxs:file" style={{fontSize:'24px'}} />
              <span>
                <Link to ="/general" 
                  className="flex-grow block px-4 py-2"
                >
                  General Report
                </Link>
              </span>
            </li>
            
            <li className={`${location.pathname === '/service' ? 'active' : ''} mb-5 flex items-center space-x-1 hover:bg-white hover:text-blue-800 hover:rounded`}>
            <Icon icon="mdi:file-report-outline" style={{fontSize:'24px'}}/>
              <span>
                <Link to="/service" 
                  className="flex-grow block px-4 py-2"
                >
                  Service Report
                </Link>
              </span>
            </li>

            <li className= {` ${location.pathname === '/events' ? 'active' : ''} mb-5 flex items-center space-x-1 hover:bg-white hover:text-blue-800 hover:rounded`}>
            <Icon icon="mdi:calendar-outline" style={{fontSize:'24px'}} />
              <span>
                <Link to ="/events" 
                  className="block px-4 py-2"
                >
                  Events
                </Link>
              </span>
            </li>

            <li className= {` ${location.pathname === '/finances' ? 'active' : ''} mb-5 flex items-center space-x-1 hover:bg-white hover:text-blue-800 hover:rounded `}>
              <div className="flex items-center ">
                <Icon icon="bx:money-withdraw" style={{fontSize:'24px'}}/>
                <span>
                  <Link to ="/finances" 
                    className="block px-4 py-2"
                  >
                    Finances
                  </Link>
                </span>
            
              </div>
            </li>


            <li className={`${location.pathname === '/account' ? 'active' : ''} mb-5 flex items-center space-x-1 hover:bg-white hover:text-blue-800 hover:rounded`}>
            <Icon icon="bxs:user-account" style={{fontSize:'24px'}} />
              <span>
                <Link to ="/account" 
                  className="block px-4 py-2"
                >
                  My account
                </Link>
              </span>
            </li>


            <div className="px-3 py-48 ">
            <ul>
              <li className="mb-5 flex items-center space-x-1 hover:underline hover:shadow-md
              rounded-md text-white">
                <Icon icon="material-symbols:help-outline" style={{fontSize: '20px'}} />
                <a href="/" className="block px-4 py-2">
                  Help
                </a>
              </li>

              <li className="mb-5 flex items-center space-x-1 hover:underline hover:shadow-md
              rounded-md text-white">

                <Icon icon="humbleicons:logout" style={{fontSize: '20px'}} />
                <a href="/" className="block px-4 py-2">
                  Logout
                </a>
              </li>
            </ul>
          </div>
          </ul>
      </div>
      <TopNav/>
    </div>
  // </nav>;
  );
}

export default Navbar;