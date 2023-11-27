import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import {confirmAlert} from 'react-confirm-alert';


interface ReportProps {
  // handleLogout: () => void;
  searchQuery: string; // Add this prop
}

interface MemberData {
    _id: string;
    prefix: string;
    name: string;
    phone: string;
    gender: string;
    email: string;
    dateOfBirth: string;
    department: string;
    role: string;
    bio: string;
    notes: string;
  }

const Report: React.FC<ReportProps> = ({searchQuery}) => {
  const navigate = useNavigate(); // Initialize useHistory
    const [checkAll, setCheckAll] = useState(false);
    const [checkboxes, setCheckboxes] = useState(new Array(11).fill(false)); // Adjust the array size as needed
    const [members, setMembers] = useState<MemberData[]>([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDatabaseActive, setIsDatabaseActive] = useState(false);
    const [searchText, setSearchText] = useState('');
    const selectedMembers = members.filter((_, index) => checkboxes[index]);
    const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);

    const redirecttoSreport = () => {
      navigate('/service')
    }
      const checkboxStyle = isDatabaseActive
      ? 'text-green-600'
      : 'text-black';
      
    const openPopUp = () => {
      setIsOpen(true);
    };
  
    const closePopUp = () => {
      setIsOpen(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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
    
          // Handle the response from the server as needed
          if (response.status === 200) {
            // Member added successfully, you can show a success message or perform other actions.
          setIsSuccess(true); // Show success message
          setIsError(false); // Hide any previous error messages
          window.alert('New member added successfully')
          window.location.reload();

          closePopUp()
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

    //fetching the data from the database
    const fetchMemberData = async () => {
        try{
            const response = await axios.get('http://localhost:3001/api/members');
            setMembers(response.data);
        }
        catch(error){
            console.error('Error fetching members: ', error)
        }
    }; 
    useEffect(() => {
        fetchMemberData();
    }, []);

    const handleCheckAll = () => {
    const newCheckboxes = checkboxes.map(() => !checkAll);
        setCheckboxes(newCheckboxes);
        setCheckAll(!checkAll);
    };

    const handleCheckboxChange = (index: number) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckboxes(newCheckboxes);
        setCheckAll(newCheckboxes.every((checkbox) => checkbox));
    };

    const filterMembers = () => {
      let filteredMembers = members;

      if (searchQuery) {
        // return members.filter((member) =>
        //   member.name.toLowerCase().includes(searchQuery.toLowerCase())
        // );
        filteredMembers = filteredMembers.filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      }

      // Sort the filteredMembers array alphabetically based on the 'name' property
      filteredMembers.sort((a, b) => a.name.localeCompare(b.name));
      return filteredMembers;
    };

    const handleDelete = async () => {      
      if (selectedMembers.length === 0) {
        window.alert('Select at least one member to delete.');
        return;
      }
        // Use react-confirm-alert for confirmation dialog
        confirmAlert({
          customUI: ({ onClose }) => (
            <div className="custom-confirm-modal">
              <h1>Confirm Deletion</h1>
              <p>Are you sure you want to delete the selected members?</p>
              <button onClick={() => { handleDeleteConfirmed(); onClose(); }}>
                Yes
              </button>
              <button onClick={onClose}>
                No
              </button>
            </div>
          ),
        });
      };
      
      const handleDeleteConfirmed = async () => {
        // Handle the delete operation after confirmation
        try {
          const response = await axios.delete('http://localhost:3001/api/members', {
            data: { members: selectedMembers.map(member => member._id) }
          });


          if (response.status === 200) {
        // Members deleted successfully, update the state
            setMembers(prevMembers =>
              prevMembers.filter((_, index) => !checkboxes[index])
            );

            // Reset checkboxes and checkAll state
            // setCheckboxes(new Array(prevMembers.length).fill(false));
            // setCheckAll(false);
            // Handle success
            console.log('Members deleted successfully.');
            window.alert('Selected members deleted successfully.');
          } else {
            // Handle failure
            console.error('Failed to delete members.');
            window.alert('Failed to delete members.');
          }
        } catch (error) {
          // Handle errors
          console.error('Error deleting members:', error);
        }
      };

    const handleEdit = () => {
      if (selectedMembers.length === 1) {
        // Assuming you only allow editing one member at a time
        setSelectedMember(selectedMembers[0]);
        // Open the popup or navigate to the editing form
        // You can use setIsOpen or navigate to the editing route

        setUpdatedMemberData({...selectedMembers[0]} as MemberData);
      } else {
        window.alert('Select only one member to edit.');
      }
    };
    const [updatedMemberData, setUpdatedMemberData] = useState<MemberData>({
      _id:'',
      prefix: '',
      name: '',
      phone: '',
      gender: '',
      email: '',
      dateOfBirth: '',
      role: '',
      department: '',
      bio: '',
      notes: '',
    });
  
    const handleEditMember = async () => {
      // Similar to handleAddMember but with a PUT request and the member ID
      try {
        const response = await axios.put(
          `http://localhost:3001/api/members/edit/${selectedMember?._id}`,
          updatedMemberData
        );
  
        if (response.status === 200) {
          // Handle success, update the state, close the edit form, etc.
          console.log('Member updated successfully.');
          window.alert('Member updated successfully.');
          // Clear the selected member and update the member list
          setSelectedMember(null);
          fetchMemberData();
        } else {
          // Handle failure
          console.error('Failed to update member.');
          window.alert('Failed to update member.');
        }
      } catch (error) {
        // Handle errors
        console.error('Error updating member:', error);
      }
    };
  
    return (
      <div>
        <div className="flex justify-between items-center p-4 ">
            <div className="flex items-center">
                <p className="mr-2 text-blue-800 font-bold">Export to:</p>
                <select className="px-6 py-1 border rounded-3xl">
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
                </select>
            </div>

            <div className='mr-52'>
                <button className="bg-gray-100 text-blue-800 px-3 py-2 ml-2 rounded-lg hover:text-white hover:bg-blue-800"
                  onClick={handleEdit}
                >
                <Icon icon="bx:edit" />
                </button>
                <button className="bg-gray-100 text-blue-800 px-3 py-2 ml-2 rounded-lg hover:text-white hover:bg-blue-800">
                <Icon icon="ant-design:download-outlined" />
                </button>
                <button className="bg-gray-100 text-blue-800 px-3 py-2 ml-2 rounded-lg hover:text-white hover:bg-blue-800"
                  onClick={handleDelete}
                >
                <Icon icon="ic:baseline-delete" />
                </button>
            </div>

            <div className="space-x-4">
                <button className="bg-blue-900 text-white px-4 py-2 rounded-3xl"
                onClick={redirecttoSreport}>
                  <Icon icon="mdi:file-report-outline" className='inline mr-1'/>
                  Service Report
                </button>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-3xl">
                <Icon icon="ic:round-message" className='inline mr-1' />
                New Message
                </button>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-3xl"
                onClick={openPopUp}>
                <Icon icon="icons8:plus" className='inline mr-1' />
                New Member
                </button>
            </div>
        </div>

        <div className='mt-6 overflow-auto' style={{maxHeight: '700px'}}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className='sticky top-0'>
                    <tr className='bg-blue-900 text-white'>
                        <th className="px-6 py-3 text-left">
                            <input 
                                type="checkbox"
                                checked= {checkAll}
                                onChange={handleCheckAll}
                            />
                        </th>

                        <th className="px-6 py-3 text-left">
                            <Icon icon="ph:arrow-down" className='inline mr-1' />
                            Name
                        </th>
                        <th className="px-6 py-3 text-left">
                            <Icon icon="ph:arrow-down" className='inline mr-1' />
                            Email
                        </th>
                        <th className="px-6 py-3 text-left">
                            <Icon icon="ph:arrow-down" className='inline mr-1' />
                            Contact
                        </th>
                        <th className="px-6 py-3 text-left">
                            <Icon icon="ph:arrow-down" className='inline mr-1' />
                            Date of Birth
                        </th>
                        <th className="px-6 py-3 text-left">
                            <Icon icon="ph:arrow-down" className='inline mr-1' />
                            Position
                        </th>
                        <th className="px-6 py-3  text-left">
                            <Icon icon="ph:arrow-down" className='inline mr-1' />
                            Department
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filterMembers().map((member, index) =>
                        <tr key={index}>
                            <td className="px-6 py-4">
                                <input
                                    type="checkbox"
                                    checked= {checkboxes[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </td>
                            <td className="px-6 py-5">{member.name}</td>
                            <td className="px-6 py-5">{member.email}</td>
                            <td className="px-6 py-5">{member.phone}</td>
                            <td className="px-6 py-5">{member.dateOfBirth}</td>
                            <td className="px-6 py-5">{member.role}</td>
                            <td className="px-6 py-5">{member.department}</td>
                        </tr>
                    )}
                </tbody>
                </table>
                
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
                    onChange={handleInputChange}
                    value={formData.namePrefix}
                    required
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
                    <select
                      id="gender"
                      name="gender"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  value={formData.dateOfBirth}
                  required
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
                    value={formData.department}
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
                    required
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
                    onChange={handleInputChange}
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
                    // onChange={handleCheckboxChange}
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
            <div className="error-message">Failed to add member. Please check the console for details.</div>
          )}

          </div>
        </div>
      )}



{selectedMember && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 w-82 shadow-md rounded-md">
            <button
              className="bg-blue-50 ml-auto px-4 py-2 rounded-md flex justify-right"
              onClick={() => setSelectedMember(null)}
            >
              <Icon icon="ri:close-line" />
            </button>

            <form className="items-center justify-center mt-6">
              {/* Your form fields go here */}
              {/* ... Your existing form fields ... */}

              {/* New form fields for editing */}
              <div className="mb-4 flex">
                <div className="w-1/4 pr-2">
                  <label htmlFor="namePrefix" className="block text-gray-700">
                    Name
                  </label>
                  <select
                    id="namePrefix"
                    name="namePrefix"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    onChange={(e) =>
                      setUpdatedMemberData({
                        ...updatedMemberData,
                        prefix: e.target.value,
                      })
                    }
                    value={updatedMemberData.prefix}
                    required
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>
                <div className="w-3/4 pl-2">
                  <label htmlFor="name" className="block text-gray-700">
                    .
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    onChange={(e) =>
                      setUpdatedMemberData({
                        ...updatedMemberData,
                        name: e.target.value,
                      })
                    }
                    value={updatedMemberData.name}
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
                      onChange={(e) =>
                        setUpdatedMemberData({
                          ...updatedMemberData,
                          phone: e.target.value,
                        })
                      }
                      value={updatedMemberData.phone}
                      required
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <select
                      id="gender"
                      name="gender"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                      onChange={(e) =>
                        setUpdatedMemberData({
                          ...updatedMemberData,
                          gender: e.target.value,
                        })
                      }
                      value={updatedMemberData.gender}
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
                  onChange={(e) =>
                    setUpdatedMemberData({
                      ...updatedMemberData,
                      email: e.target.value,
                    })
                  }
                  value={updatedMemberData.email}
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
                  onChange={(e) =>
                    setUpdatedMemberData({
                      ...updatedMemberData,
                      dateOfBirth: e.target.value,
                    })
                  }
                  value={updatedMemberData.dateOfBirth}
                  required
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
                    onChange={(e) =>
                      setUpdatedMemberData({
                        ...updatedMemberData,
                        department: e.target.value,
                      })
                    }
                    value={updatedMemberData.department}
                    required
                  />
                </div>
                <div className="w-1/3 pl-2">
                  <select
                    id="role"
                    name="role"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    onChange={(e) =>
                      setUpdatedMemberData({
                        ...updatedMemberData,
                        role: e.target.value,
                      })
                    }
                    value={updatedMemberData.role}
                    required
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
                    onChange={(e) =>
                      setUpdatedMemberData({
                        ...updatedMemberData,
                        bio: e.target.value,
                      })
                    }
                    value={updatedMemberData.bio}
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
                    // onChange={handleCheckboxChange}
                    // checked={formData.terms}
                  />
                  Visitor
                </label>
              </div>

              {/* ... Continue with the other form fields ... */}

              <button
                type="button"
                className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 mt-8"
                onClick={handleEditMember}
              >
                UPDATE MEMBER
              </button>
            </form>
          </div>
        </div>
      )}

      </div>
    );
  };
  
  export default Report;
  