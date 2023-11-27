import { Icon } from '@iconify/react';
import React from 'react';

interface Member {
    name: string;
    phone: string;
    gender: string;
    email: string;
    dateOfBirth: string;
    department: string;
    role: string;
}

interface DateCollection {
    collectionName: string;
    maleCount: number;
    femaleCount: number;
    count: number;
    data: Member[];
}

interface CollectionDetailsPopupProps {
  collection: DateCollection;
  data: Member[] | null;
  onClose: () => void;
}

const CollectionDetailsPopup: React.FC<CollectionDetailsPopupProps> = ({ collection, data, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-70 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 " style={{width:'100%', maxWidth: '1300px'}}>
        <div className='flex items-center justify-between mb-4'>
            <h2 className="text-2xl font-bold">Details for {collection.collectionName}</h2>
            <button onClick={onClose} className="text-blue-600 hover:underline cursor-pointer">
                <Icon icon="carbon:close-filled" style={{fontSize:'29px'}} />
            {/* Close */}
            </button>
        </div>

        <div className='mt-6 overflow-auto' style={{maxHeight: '700px'}}>
            <table className="w-full mt-4 divide-y divide-gray-200">
            <thead className='sticky top-0'>
                <tr className='bg-blue-900 text-white'>
                <th  className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Gender</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Date of Birth</th>
                <th className="px-6 py-3 text-left">Department</th>
                <th className="px-6 py-3 text-left">Role</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((member, index) => (
                <tr key={index}>
                    <td className="px-6 py-5">{member.name}</td>
                    <td className="px-6 py-5">{member.phone}</td>
                    <td className="px-6 py-5">{member.gender}</td>
                    <td className="px-6 py-5">{member.email}</td>
                    <td className="px-6 py-5">{member.dateOfBirth}</td>
                    <td className="px-6 py-5">{member.department}</td>
                    <td className="px-6 py-5">{member.role}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetailsPopup;
