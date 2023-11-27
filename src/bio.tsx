import { Icon } from '@iconify/react';
import React from 'react';
import {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';



type MemberType = {
  _id: string; // This should match the actual data structure
  prefix: string;
  name: string;
  phone: string;
  // Add other fields as needed to match your database structure
};

interface BioProps {
  setSearchQuery: (query: string) => void;
}

const Bio: React.FC = () => {
  const iconSize = "200px";
  // const [isDatabaseActive, setIsDatabaseActive] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  // const [searchQuery, setSearchQueryState] = useState(''); // New state for search query
  // const [searchResults, setSearchResults] = useState<MemberType[]>([]);
  const [selectedUser, setSelectedUser] = useState<MemberType | null>(null);
  const [nameSuggestions, setNameSuggestions] = useState<MemberType[]>([]);
  const [inputValue, setInputValue] = useState(''); // State variable to store current input value

  const [genderData, setGenderData] = useState({ males: 0, females: 0 });
  const [ageGroupData, setAgeGroupData] = useState({ adults: 0, children: 0 });


  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  const [enrolledUsers, setEnrolledUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  // // Function to handle the selection of a user from the suggestions
  // const handleSelectUser = (user: MemberType) => {
  //   setSelectedUser(user);
  // };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setIsDatabaseActive(event.target.checked);
  };
  // const checkboxStyle = isDatabaseActive
  //   ? 'text-green-600'
  //   : 'text-black';
    

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
    gender: 'Male',
    email: '',
    dateOfBirth: '',
    role: 'Member',
    department: '',
    biometrics: '',
    notes: ''
  });

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    // setFormData({ ...formData, [name]: value });

    setInputValue(value);

    if (name === "name") {
      setInputValue(value); // Update the input field value
      if (value.trim() !== "") {
        // Fetch name suggestions based on the input value
        fetchNameSuggestions(value);
      } else {
        setNameSuggestions([]); // Clear suggestions when the name field is empty
      }
    } else {
      setNameSuggestions([]); // Clear suggestions for other fields
    }
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const AddInputChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleAddMember = async () => {
    event?.preventDefault();
    try {
      if (
         !formData.namePrefix ||
         !formData.name ||
         !formData.phone || 
         !formData.gender ||
         !formData.email ||
         !formData.dateOfBirth ||
         !formData.department ||
         !formData.role ||
         !formData.biometrics ||
         !formData.notes
        ) {
        window.alert('Please fill out all required fields.');
        return; // Prevent further execution of the function
      }

      // Define the member data you want to send to the server
      const memberData = {
        prefix: formData.namePrefix,
        name: formData.name,
        phone: formData.phone,
        gender: formData.gender,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        department: formData.department,
        role: formData.role,
        bio: formData.biometrics,
        notes: formData.notes
      };

      // Send a POST request to your server's "add members" API
      const response = await axios.post('http://localhost:3001/api/members', memberData);
      console.log(response.data)

      // Handle the response from the server as needed
      if (response.status === 200) {
        // Member added successfully, you can show a success message or perform other actions.
        setIsSuccess(true); // Show success message
        setIsError(false); // Hide any previous error messages
        closePopUp();
        window.alert("Member added successfully")
        window.location.reload();
      }
      
      else {
        // Handle any errors or display an error message.
      setIsSuccess(false); // Hide any previous success messages
      setIsError(true); // Show an error message
      }
    } catch (error: any) {
      // Handle network errors or other exceptions.
      console.error('Error creating member:', error);
      setIsSuccess(false); // Hide any previous success messages
      setIsError(true); // Show an error message

      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server response status:', error.response.status);
        console.error('Server response data:', error.response.data);

        if (error.response.status === 400 && error.response.data.message) {
          // Display a user-friendly error message if it's a known error condition
          window.alert(error.response.data.message);
          closePopUp();
        } else {
          // Display a generic error message for other error conditions
          window.alert('Failed to add member. Please try again.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
        window.alert('Failed to add member. No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
        window.alert('Failed to add member. Please check your network connection and try again.');
      }
    }
  };


// Use useEffect to fetch suggestions when the name field changes
  useEffect(() => {
    if (inputValue.trim() !== '') {
      fetchNameSuggestions(inputValue);
    } else {
      setNameSuggestions([]); // Clear suggestions when the name field is empty
    }
  }, [inputValue]);

    
  // Function to fetch name suggestions from the database
  const fetchNameSuggestions = async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/members/suggestions?query=${query}`);
      setNameSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching name suggestions:', error);
    }
  };


  // Function to handle the selection of a suggestion and fill the phone input field
  const handleSelectSuggestion = (user: MemberType) => {
      // Check if the selected user is already enrolled
    if (enrolledUsers.includes(user._id)) {
      window.alert('This user is already enrolled.');
      return;
    }

    setFormData({
      ...formData,
      name: `${user.name}`, // Set the selected name
      phone: user.phone, // Fill the phone input with the corresponding phone number
    });
    setInputValue(`${user.name}`)
    setSelectedUser(user)
    setNameSuggestions([]); // Clear suggestions
    setIsSuggestionSelected(true); // Set to true when a suggestion is selected
    setIsOpen(false);
    
  };

  const handleEnrollment = async () => {
    event?.preventDefault();
    try {
      // // Check if the selected user is already enrolled
      // if (enrolledUsers.includes(selectedUser?._id || '')) {
      //   window.alert('This user is already enrolled.');
      //   return;
      // }

      // Check if the selected user is already enrolled based on name and phone
      // const isAlreadyEnrolled = enrolledUsers.some(
      //   (userId) =>
      //     enrolledUsers.includes(selectedUser?._id || '') &&
      //     selectedUser?.name === formData.name &&
      //     selectedUser?.phone === formData.phone
      // );

      // if (isAlreadyEnrolled) {
      //   window.alert('This user is already enrolled.');
      //   return;
      // }

      setIsLoading(true);
      // Define the selected user's name (prefix + name) based on the input field value
      const selectedUserName = inputValue;

      // Fetch the detailed user information from the 'members' collection
      const responses = await axios.get(`http://localhost:3001/api/members/details?name=${selectedUserName}`);
      const userDataFromMembers = responses.data[0];


      // Define the selected user data to send to the enrollment endpoint
      const selectedUserData = {
        prefix: userDataFromMembers.prefix,
        name: formData.name,
        phone: formData.phone,
        gender: userDataFromMembers.gender,
        email: userDataFromMembers.email,
        dateOfBirth: userDataFromMembers.dateOfBirth,
        department: userDataFromMembers.department,
        role: userDataFromMembers.role,
      };
      
  
      // Send a POST request to the enrollment endpoint
      const response = await axios.post('http://localhost:3001/api/enroll', selectedUserData);
      setIsLoading(false);
      setInputValue('');
      setNameSuggestions([]);

      // Handle the response from the server
      if (response.status === 200) {
        // Enrollment successful, show a success message
        setIsSuccess(true);
        setIsError(false);
        closePopUp();

        setInputValue('');
        setNameSuggestions([])
        setSelectedUser(null);

        // Update the enrolledUsers state with the enrolled user's _id
        setEnrolledUsers((prevEnrolledUsers) => [...prevEnrolledUsers, selectedUser?._id || '']);


        window.alert('Enrollment successful');
        window.location.reload();
      } 
      else {
        // Handle any errors or display an error message.
        setIsSuccess(false);
        setIsError(true);
      }
    } catch (error:any) {
      if (error.response && error.response.status === 400){
        window.alert('Member already enrolled')
        window.location.reload();
      }
      // Handle network errors or other exceptions.
      console.error('Error enrolling user:', error);

      setIsSuccess(false);
      setIsError(true);
    }
  };
  

  // In your React component (Bio.tsx)
  useEffect(() => {
    axios.get('http://localhost:3001/api/enroll/genderDataForDay')
      .then((response) => {
        const { males, females } = response.data;
        setGenderData({ males, females });
      })
      .catch((error) => {
        console.error('Error fetching gender data:', error);
      });
  }, []);

  const data = {
    labels: ['Males', 'Females'],
    datasets: [
      {
        label: 'Gender Distribution',
        data: [genderData.males, genderData.females],
        // data: [20, 40],
        backgroundColor: ['#1d4ed8', '#169144'], // Blue for males, green for females
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  //Pie chart data
  // Update your Pie chart data and options
  const ageGroupChartData = {
    labels: ['Adults', 'Children'],
    datasets: [
      {
        label: 'Age Group Distribution',
        data: [50, 10],
        backgroundColor: ['#f00', '#ffaa33'], // Red for adults, orange for children
        radius: '40%',
      },
    ],
  };

  const ageGroupChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
  };
  
    return (
      <div className='w-full overflow-x-auto'>
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
                     <input
                        type="text"
                        id="name"
                        name="name"
                        style={{color:'white', background:'#1d4ed8'}}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        onChange={handleInputChange}
                        value={inputValue}
                        required
                      />
                      {nameSuggestions.length > 0 && (
                        <div className="suggestions" style={{width: '15%'}}>
                          {nameSuggestions.map((user) => (
                            <div
                              key={user._id}
                              className="suggestion"
                              onClick={() => handleSelectSuggestion(user)}
                            >
                              {user.prefix} {user.name}
                            </div>
                          ))}
                        </div>
                      )}
                </div>
                
                <div className='mb-6 font-bold'>
                  <label className='text-green-400'> Tel/ Number: </label>
                  {selectedUser && (
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      value={selectedUser.phone}
                      style={{color:'white', background:'#1d4ed8'}}
                      readOnly
                    />
                  )}

                    {/* <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      onChange={handleInputChange}
                      value={formData.phone}
                      required
                    /> */}

                </div>
              </form>
            </div>
            
            <div className='items-center space-y-3 my-8 font-bold'>
              <button className='w-full text-blue-800 bg-white px-7 py-2 flex items-center justify-center' onClick={openPopUp}>
                Add member
              </button>
{/* 
              <button className='w-full text-blue-800 bg-white px-9 py-2 flex items-center justify-center'>
                Edit Info
              </button> */}

              <button className='w-full text-white bg-gradient-to-b from-green-600 to-green-800 px-11 py-2 flex items-center justify-center'
                onClick={handleEnrollment}
                disabled={!isSuggestionSelected} // Disable the button if no suggestion is selected
              >
                {isLoading ? 'Enrolling...' : 'Enroll'}
                {/* Enroll */}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-7 flex justify-between">
          {/* <div className="flex flex-col items-center justify-between"> */}
            {/* Information Block 1 */}
            <div className="rounded-3xl bg-gray-200 shadow-lg p-3 flex flex-col items-center w-1/3">
              <h2 style={{fontWeight: 'bold'}}>Gender Distribution for Today</h2>
              <br></br>
              <Bar data={data} options={options}/>
              {/* <div className='flex items-center'>
                <button className="border bg-green-500 text-white px-4 py-2 rounded-full h-16 w-16 flex items-center justify-center">
                  <Icon icon="game-icons:power-button" style={{fontSize:'24px'}} />
                </button> */}
                
                {/* <div className='ml-4'>
                  <div className="text-black text-sm font-bold ml-2">
                    Service Ongoing 9:01 am
                  </div>
                  <div className='text-xs border mt-1 bg-blue-200 text-blue-900 p-2'>
                    Expected to end at 1:00 pm
                  </div>
                </div>
              </div> */}
                {/* Progress Bar */} 
              {/* <div className="w-full bg-gray-300 h-2 mt-4 rounded-lg">
                <div className="bg-green-500 h-full rounded-md" style={{ width: '50%' }}></div> {/* Adjust width for progress */}
              {/* </div>  */}
            {/* </div> */}

            {/* Additional Blocks Below Block 1 */}
            {/* <div className="rounded-3xl bg-gray-200 shadow-lg p-4 flex items-center justify-between w-80 mt-4"> */}
              {/* <input 
                type="checkbox" 
                id="databaseConnection" 
                className="ml-1 mr-2"
                onChange={handleCheckboxChange}
                />
              <label htmlFor="databaseConnection" className={`${checkboxStyle} text-sm`}>
                Connection to the database ... 
                {isDatabaseActive ? 'active' : 'Inactive'}
              </label>
  
            </div> */}

            {/* <div className="rounded-3xl bg-blue-900 shadow-lg p-4 flex items-center justify-between w-80 mt-4"> */}
              {/* Content for Additional Block 2 */}
              {/* <button className='text-white ml-7'>
                View last Service Report
              </button>
              <Icon icon="cil:arrow-right" className='text-white mr-9' />
            </div> */}
          </div>

          {/* Information Block 2 */}
          <div className="rounded-3xl bg-gray-200 shadow-lg p-4 flex flex-col items-center w-1/3 ml-4">
            {/* Add your content for Block 2 here */}
            <h2 style={{fontWeight: 'bold'}}>Adult and Children Distribution Today</h2>
            <br></br>
            {/* <Pie data={ageGroupChartData} options={ageGroupChartOptions}/> */}
           
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
                className="bg-blue-50 ml-auto px-4 py-2 rounded-md flex justify-right"
                onClick={closePopUp}
              >
                <Icon icon="ri:close-line" />
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
                    onChange={AddInputChange}
                    value={formData.namePrefix}
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Dr">Dr</option>
                    <option value="Ms">Ms</option>
                  </select>
                </div>
                <div className="w-3/4 pl-2">
                  <label htmlFor="name" className="block text-gray-700">.</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    onChange={AddInputChange}
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
                      onChange={AddInputChange}
                      value={formData.phone}
                      required
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <select
                      id="gender"
                      name="gender"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      onChange={AddInputChange}
                      value={formData.gender}
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
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
                  onChange={AddInputChange}
                  value={formData.email}
                  required
                />
              </div>
              <div className="mb-7">
                <label htmlFor="dateOfBirth" className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder='dd/mm/yyyy'
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  onChange={AddInputChange}
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
                    onChange={AddInputChange}
                    value={formData.department}
                    required
                  />
                </div>
                <div className="w-1/3 pl-2">
                  <select
                    id="role"
                    name="role"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    onChange={AddInputChange}
                    value={formData.role}
                  >
                    <option value="Member">Member</option>
                    <option value="Pastor">Pastor</option>
                    <option value="Deacon/Deaconess">Deacon</option>
                    <option value="AP">Assistant Pastor</option>
                    <option value="Worker">Worker</option>
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
                    onChange={AddInputChange}
                    value={formData.biometrics}
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
                    onChange={handleTextareaChange}
                    value={formData.notes}
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
                onClick={handleAddMember}
              >
                SAVE NEW MEMBER
              </button>
            </form>
            {isSuccess && (
            <div className="success-message">Member added successfully.</div>
          )}

          {isError && (
            <div className="error-message">Failed to add member.</div>
          )}

          </div>
        </div>
      )}

      </div>
    );
  };
  
  export default Bio;
  