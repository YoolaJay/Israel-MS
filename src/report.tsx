import { Icon } from '@iconify/react';
import React from 'react';
import {useState} from 'react';

const Report: React.FC = () => {
    const [checkAll, setCheckAll] = useState(false);
    const [checkboxes, setCheckboxes] = useState(new Array(11).fill(false)); // Adjust the array size as needed

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
                <button className="bg-gray-100 text-blue-800 px-3 py-2 ml-2 rounded-lg hover:text-white hover:bg-blue-800">
                <Icon icon="bx:edit" />
                </button>
                <button className="bg-gray-100 text-blue-800 px-3 py-2 ml-2 rounded-lg hover:text-white hover:bg-blue-800">
                <Icon icon="ant-design:download-outlined" />
                </button>
                <button className="bg-gray-100 text-blue-800 px-3 py-2 ml-2 rounded-lg hover:text-white hover:bg-blue-800">
                <Icon icon="ic:baseline-delete" />
                </button>
            </div>

            <div className="space-x-4">
                <button className="bg-blue-900 text-white px-4 py-2 rounded-3xl">
                <Icon icon="mdi:file-report-outline" className='inline mr-1'/>
                Service Report
                </button>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-3xl">
                <Icon icon="ic:round-message" className='inline mr-1' />
                New Message
                </button>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-3xl">
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
                            Members
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
                            Status
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
                    {checkboxes.map((isChecked, index) =>
                        <tr key={index}>
                            <td className="px-6 py-4">
                                <input
                                    type="checkbox"
                                    checked= {isChecked}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </td>
                            <td className="px-6 py-5">John Doe</td>
                            <td className="px-6 py-5">john@example.com</td>
                            <td className="px-6 py-5">123-456-7890</td>
                            <td className="px-6 py-5">Member</td>
                            <td className="px-6 py-5">Worker</td>
                            <td className="px-6 py-5">Media</td>
                        </tr>
                    )}
                </tbody>
                </table>
                
            </div>

      </div>
    );
  };
  
  export default Report;
  