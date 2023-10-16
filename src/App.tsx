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
  const [loggedIn, setLoggedIn] = useState(false);
  
  const handleLogin = () => {
    // This is a simplified example; you should implement actual authentication logic here.
    // For now, we're just setting loggedIn to true.
    setLoggedIn(true);
  };

  return (
    <>
      <Router>
        <div className="app flex h-screen overflow-hidden">
              {/* Navbar */}
              <div className=" ">
                <Navbar />
              </div>


              {/* Main Content */}
              <div className="w-full">
                {/* TopNav */}
                <div className="bg-blue-900">
                  <TopNav />
                </div>

                {/* Bio */}
                <div className="flex justify-center items-center">
                  <div className="w-11/12">
                    <Routes>
                    <Route path="/dashboard" element={ loggedIn ? <Bio /> : <Navigate to="/login" />}/>
                    <Route path="/general" element={loggedIn ? <Report/> : <Navigate to="/login" />}/>
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

        {/* <LoginForm/>     */}
          {/* <switch>
            <Route path='/login' Component={LoginForm}/>
            <Route path='/signup' Component={SignUp}/>
          </switch> */}
           
      </Router>
   
      </>
    )
}

export default App
