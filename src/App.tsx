import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Bio from "./bio";
import Navbar from "./components/navbar";
import TopNav from "./components/topnav";
// import Events from "./events";
import Report from "./report";
import Sreport from "./sReport";
import Scheduler from "./events";
import LoginForm from "./login";


function App() {
  const initialLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);

    localStorage.removeItem('isLoggedIn');
  };

  // useEffect(() => {

  // }, []);

  return (
    <>
      <Router>
        <div className="app flex h-screen overflow-hidden">
              {/* Navbar */}
              <div className=" ">
                <Navbar handleLogout={handleLogout} />
              </div>


              {/* Main Content */}
              <div className="w-full overflow-x-auto">
                {/* TopNav */}
                <div className="bg-blue-900">
                  <TopNav handleLogout={handleLogout} setSearchQuery={setSearchQuery} />
                </div>

                {/* Bio */}
                <div className="flex justify-center items-center " style={{overflowX: 'auto'}}>
                  <div className="md:w-11/12 sm:w-11/12">
                    <Routes>
                    <Route path="/dashboard" element={ loggedIn ? <Bio /> : <Navigate to="/login" />}/>
                    <Route path="/general" element={loggedIn ? <Report searchQuery={searchQuery}/> : <Navigate to="/login" />}/>
                    <Route path="/service" element={loggedIn ? <Sreport/> : <Navigate to="/login"/>}/>
                    <Route path="/events" element={loggedIn ? <Scheduler/> : <Navigate to="/login"/>}/>
                    </Routes>
                  </div>
                </div>
              </div>
            </div>

            {/* Display login page if not authenticated */}
            {!loggedIn && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-100">
                <LoginForm onLogin={handleLogin} />
              </div>

            )}

      </Router>
   
      </>
    );
}

export default App
