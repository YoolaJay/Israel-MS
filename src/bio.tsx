import { Icon } from '@iconify/react';
import React from 'react';
import {useState, useRef, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';



const dataMaleFemale = {
  labels: ['Male', 'Female'],
  datasets: [
    {
      label: 'Number of People',
      data: [50, 70], // Replace with your data
      backgroundColor: ['blue', 'pink'], // Bar colors
    },
  ],
};

const dataChildrenAdults = {
  labels: ['Children', 'Adults'],
  datasets: [
    {
      label: 'Number of People',
      data: [30, 90], // Replace with your data
      backgroundColor: ['green', 'purple'], // Bar colors
    },
  ],
};

// const options = {
//   indexAxis: 'y', // Set to 'y' for horizontal bar chart
//   scales: {
//     x: {
//       beginAtZero: true,
//     },
//   },
// };
interface ChartOptions {
      scales: {
        x: {
          beginAtZero: boolean;
        };
      };
    }
    
    const options: ChartOptions = {
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    };

const Bio: React.FC = () => {
  const iconSize = "200px";
  const [isDatabaseActive, setIsDatabaseActive] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDatabaseActive(event.target.checked);
  };
  const checkboxStyle = isDatabaseActive
    ? 'text-green-600'
    : 'text-black';
    

  const [isOpen, setIsOpen] = useState(false);

  const openPopUp = () => {
    setIsOpen(true);
  };

  const closePopUp = () => {
    setIsOpen(false);
  };

  const [formData, setFormData] = useState({
    namePrefix: 'Mr',
    name: '',
    phone: '',
    gender: '',
    email: '',
    dateOfBirth: '',
    role: 'Member'
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
    

    return (
      <div>
        <div className="rounded-3xl bg-gradient-to-b from-blue-800 to-blue-950 text-white p-10 py-20 flex items-center justify-between ">
          {/* Left side of the navigation */}

          <div className='flex flex-col items-center justify-center mt-4'>
            <div className="flex items-center bg-blue-200 bg-opacity-25 px-14 py-20 rounded-2xl border mt-4">
              <Icon icon="ic:round-fingerprint" style={{fontSize: '80px'}}/>
            </div>
            <div className='mt-4 text-center text-white text-lg font-bold' style={{fontStyle:"italic"}}>Scan now</div>
          </div>
          

          {/* Right side of the navigation */}
          <div>
            
          </div>
          <div className="flex items-center justify-between w-9/12 pr-20 py-12 bg-blue-950">
            
            <div className='text-green-500'>
              <Icon icon="mdi:human-male" style={{fontSize: iconSize}}/>

            </div>
            
            <div style={{fontStyle:"italic"}} className="flex items-center justify-center bg-blue-700 rounded-3xl w-72 p-4 ml-4">
              <form className=' grid gap-4'>
                <div className='mb-4 font-bold'>
                  <label className='text-green-400'>Name: </label>
                  <p id="name" className='text-s'>Mr George</p>
                </div>
                <div className='mb-6 font-bold'>
                  <label className='text-green-400'> Tel/ Number: </label>
                  <p id="phoneNumber" className='text-s'> 0501124987 </p>
                </div>
              </form>
            </div>
            
            <div className='items-center space-y-3 my-8 font-bold'>
              <button className='w-full text-blue-800 bg-white px-7 py-2 flex items-center justify-center' onClick={openPopUp}>
                Add member
              </button>

              <button className='w-full text-blue-800 bg-white px-9 py-2 flex items-center justify-center'>
                Edit Info
              </button>

              <button className='w-full text-white bg-gradient-to-b from-green-600 to-green-800 px-11 py-2 flex items-center justify-center'>
                Enroll
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <div className="flex flex-col items-center justify-between">
            {/* Information Block 1 */}
            <div className="rounded-3xl bg-gray-200 shadow-lg p-4 flex flex-col items-center w-80">
              <div className='flex items-center'>
                <button className="border bg-green-500 text-white px-4 py-2 rounded-full h-16 w-16 flex items-center justify-center">
                  <Icon icon="game-icons:power-button" style={{fontSize:'24px'}} />
                </button>
                
                <div className='ml-4'>
                  <div className="text-black text-sm font-bold ml-2">
                    Service Ongoing 9:01 am
                  </div>
                  <div className='text-xs border mt-1 bg-blue-200 text-blue-900 p-2'>
                    Expected to end at 1:00 pm
                  </div>
                </div>
              </div>
                {/* Progress Bar */} 
              <div className="w-full bg-gray-300 h-2 mt-4 rounded-lg">
                <div className="bg-green-500 h-full rounded-md" style={{ width: '50%' }}></div> {/* Adjust width for progress */}
              </div>
            </div>

            {/* Additional Blocks Below Block 1 */}
            <div className="rounded-3xl bg-gray-200 shadow-lg p-4 flex items-center justify-between w-80 mt-4">
              <input 
                type="checkbox" 
                id="databaseConnection" 
                className="ml-1 mr-2"
                onChange={handleCheckboxChange}
                />
              <label htmlFor="databaseConnection" className={`${checkboxStyle} text-sm`}>
                Connection to the database ... 
                {isDatabaseActive ? 'active' : 'Inactive'}
              </label>
  
            </div>

            <div className="rounded-3xl bg-blue-900 shadow-lg p-4 flex items-center justify-between w-80 mt-4">
              {/* Content for Additional Block 2 */}
              <button className='text-white ml-7'>
                View last Service Report
              </button>
              <Icon icon="cil:arrow-right" className='text-white mr-9' />
            </div>
          </div>

          {/* Information Block 2 */}
          <div className="rounded-3xl bg-gray-200 shadow-lg p-4 flex items-center justify-between w-1/3 ml-4">
            {/* Add your content for Block 2 here */}
            {/* <div className="mb-4">
              <Bar data={dataGender} options={options} />
            </div>
            <div className="mb-4">
              <Bar data={dataAge} options={options} />
            </div> */}

            {/* <div className="w-1/2">
              <Bar data={dataMaleFemale} options={options} />
            </div>
            <div className="w-1/2">
              <Bar data={dataChildrenAdults} options={options} />
            </div> */}
          </div>

          {/* Information Block 3 */}
          <div className="rounded-3xl bg-gray-200 shadow-lg p-4 flex flex-col items-center justify-between w-1/3 ml-4">
            <div className='border-b border-gray-300 mb-2 flex items-center px-3 pb-1'>
              <span className='flex-1 mr-12'>
                My Calendar Today
              </span>
              <button className='border border-black rounded-full'>
                <Icon icon="mi:options-vertical" />
              </button>
            </div>

             {/* Event Block */}
            <div className="p-2 w-11/12 h-52 border border-gray-300 rounded-md">
              <h3 className="text-lg font-bold">Event Title</h3>
              <p className="text-sm text-gray-500">Event Description</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500">Event Date: 2023-10-10</p>
                <button className="border border-blue-500 px-2 py-1 rounded-full text-blue-500 hover:border-none hover:text-white hover:bg-blue-500">Details</button>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 w-82 shadow-md rounded-md">
          <button
                className="bg-blue-50 px-4 py-2 rounded-md"
                onClick={closePopUp}
              >
                <Icon icon="ep:back" />
              </button>
            
            <form className=' items-center justify-center mt-6'>
              {/* Your form fields go here */}
              <div className='mb-4 flex'>
                <div className="w-1/4 pr-2">
                  <label htmlFor="namePrefix" className="block text-gray-700">Name</label>
                  <select
                    id="namePrefix"
                    name="namePrefix"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    onChange={handleInputChange}
                    value={formData.namePrefix}
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>
                <div className="w-3/4 pl-2">
                  <label htmlFor="name" className="block text-gray-700">.</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    onChange={handleInputChange}
                    value={formData.name}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex mb-2">
                  <div className="w-1/2 pr-2">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      placeholder='phone'
                      onChange={handleInputChange}
                      value={formData.phone}
                      required
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      placeholder='Gender'
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      onChange={handleInputChange}
                      value={formData.gender}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-7">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder='Email'
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                />
              </div>
              <div className="mb-7">
                <label htmlFor="dateOfBirth" className="block text-gray-700">Date of Birth</label>
                <input
                  type="text"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  onChange={handleInputChange}
                  value={formData.dateOfBirth}
                />
              </div>

              <label>
                  Department
                </label>
              <div className='mb-7 flex'>
                <div className="w-2/3 pr-2">
                  <input
                    type="text"
                    id="department"
                    name="department"
                    placeholder='Department'
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    onChange={handleInputChange}
                    value={formData.name}
                    required
                  />
                </div>
                <div className="w-1/3 pl-2">
                  <select
                    id="role"
                    name="role"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    onChange={handleInputChange}
                    value={formData.role}
                  >
                    <option value="Member">Member</option>
                    <option value="Pastor">Pastor</option>
                    <option value="Deacon/Deaconess">Deacon</option>
                    <option value="AP">Assistant Pastor</option>
                  </select>
                </div>
              </div>

              <div className="mb-4 flex">
                <div className="w-1/3 pr-2">
                  <label htmlFor="biometrics" className="block text-gray-700">
                    Scan Biometrics
                  </label>
                  <div className='input-icon'>
                    <input
                    type="text"
                    id="biometrics"
                    name="biometrics"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Biometrics"
                    onChange={handleInputChange}
                    // value={formData.biometrics}
                    required
                    />
                    {/* <Icon icon="ic:round-fingerprint" style={{ position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)', fontSize: '24px' }} /> */}
                  </div>
                  
                    
                </div>
                <div className="w-2/3 pl-2">
                  <label htmlFor="notes" className="block text-gray-700">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Notes"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    // onChange={handleInputChange}
                    // value={formData.notes}
                  ></textarea>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="terms" className="block text-gray-700">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="mr-2"
                    onChange={handleCheckboxChange}
                    // checked={formData.terms}
                  />
                  Visitor
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 mt-8"
              >
                SAVE NEW MEMBER
              </button>
            </form>
          </div>
        </div>
      )}

      </div>
    );
  };
  
  export default Bio;
  