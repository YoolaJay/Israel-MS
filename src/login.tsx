import React from 'react';
import { useNavigate } from 'react-router-dom';


// Define the prop interface for the LoginForm component
interface LoginFormProps {
    onLogin: () => void;
  };

const LoginForm: React.FC<LoginFormProps> = ({onLogin}) => {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-800 to-blue-950 w-full">
      <div className="bg-white p-7 shadow-md rounded-2xl w-3/12 h-92/3 ">
        <div className="mb-4 text-center">
          {/* <div className="w-20 h-20 bg-blue-500 mx-auto -mt-20 rounded-full flex items-center justify-center"> */}
          <div className="w-52 h-64 mx-auto mt-36 absolute top-0 left-0 right-0 rounded-b-full flex items-center justify-center overflow-hidden">
            {/* Add your logo or image here */}
            {/* <img className="mx-auto align-middle pt-20" alt="logo" src={Logo} width="100" height="100" /> */}
            <img src="./logo.png" alt="Logo" className="w-48 h-48" />
          </div>
        </div>
        <form>
            <div className='flex justify-center items-center mt-10 mb-6 text-xl font-bold'>
                <label>
                    LOGIN
                </label>
            </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-7">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="mb-7 flex items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-gray-600 text-sm">Remember me</label>
              </div>
              <div>
                <a href="#" className="text-blue-800 text-sm hover:underline">Forgot password?</a>
              </div>
            </div>
          <div className="flex items-center justify-between mt-10">
            <button
              className="ml-36 bg-gradient-to-r from-blue-950 to-blue-700 hover:bg-blue-700 text-white py-2 px-10 rounded-3xl focus:outline-none 
             hover:from-blue-950 hover:to-blue-500
              focus:shadow-outline"
              type="submit"
              onClick={onLogin}
            >
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
