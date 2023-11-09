import { Icon } from '@iconify/react';
import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import CollectionDetailsPopup from './components/collectionDetails';


interface Member {
    name: string;
    phone: string;
    gender: string;
    email: string;
    dateOfBirth: string;
    department: string;
    role: string;
}


// Define an interface for the data structure
interface DateCollection {
    // date: string;
    maleCount: number;
    femaleCount: number;
    // childrenCount: number;
    count: number;
    collectionName: string;
    data: Member[];
}

const Sreport: React.FC = () => {
    const [checkAll, setCheckAll] = useState(false);
    const [checkboxes, setCheckboxes] = useState(new Array(11).fill(false)); // Adjust the array size as needed
    // const [dateCollections, setDateCollections] = useState<string[]>([]);
    const [dateCollections, setDateCollections] = useState<DateCollection[]>([]);

    const [isCollectionDetailsOpen, setIsCollectionDetailsOpen] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState<DateCollection | null>(null);
    const [selectedCollectionData, setSelectedCollectionData] = useState<Member[] | null>(null);



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

    // const handleCollectionClick = async (collection: DateCollection) => {
    //     setSelectedCollection(collection);
    //     setIsCollectionDetailsOpen(true);

    //     try {
    //         const response = await axios.get(`http://localhost:3001/api/collections/${collection.collectionName}/details`);
    //         setSelectedCollection(response.data);
    //         setIsCollectionDetailsOpen(true);
    //       } catch (error) {
    //         console.error('Error fetching detailed data:', error);
    //       }
    // };

    const handleCollectionClick = async (collection: DateCollection) => {
        axios.get(`http://localhost:3001/api/collections/${collection.collectionName}/details`)
          .then((response) => {
            setSelectedCollection(collection);
            setSelectedCollectionData(response.data);
            setIsCollectionDetailsOpen(true);
        })
        .catch((error) => {
            console.error('Error fetching detailed data:', error);
        });
    };
      
    const closeCollectionDetails = () => {
      setSelectedCollection(null);
    };

    useEffect(() => {
        axios.get('http://localhost:3001/api/collections')
            .then((response) => {
            setDateCollections(response.data);
            setCheckboxes(new Array(response.data.length).fill(false)); // Set checkboxes based on the data length
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    }, []);

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

            <div className='mr-80'>
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
                <Icon icon="ic:round-message" className='inline mr-1' />
                New Message
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
                            Date
                        </th>
                        <th className="px-6 py-3 text-left">
                            <Icon icon="ph:arrow-down" className='inline mr-1' />
                            Male Present
                        </th>
                        <th className="px-6 py-3 text-left">
                            <Icon icon="ph:arrow-down" className='inline mr-1' />
                            Female Present
                        </th>
                        <th className="px-6 py-3 text-left">
                            <Icon icon="ph:arrow-down" className='inline mr-1' />
                            Children
                        </th>
                        <th className="px-6 py-3 text-left">
                            <Icon icon="ph:arrow-down" className='inline mr-1' />
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dateCollections.map((collection, index) =>
                        <tr key={index}>
                            <td className="px-6 py-4">
                                <input
                                    type="checkbox"
                                    checked= {checkboxes[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </td>
                            <td className="px-6 py-5">
                                <button className="bg-blue-900 text-white px-3 py-2 rounded-3xl"
                                        onClick={() => handleCollectionClick(collection)}
                                >
                                    {collection.collectionName}
                                </button>
                            </td>
                            <td className="px-6 py-5">{collection.maleCount}</td>
                            <td className="px-6 py-5">{collection.femaleCount}</td>
                            <td className="px-6 py-5">null</td>
                            <td className="px-6 py-5">{collection.count}</td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>

            {/* Pop-up table for selected collection */}
            {selectedCollection && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-70 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6">
                    <h2 className="text-2xl font-bold">Details for {selectedCollection.collectionName}</h2>
                    <button
                        onClick={closeCollectionDetails}
                        className="text-blue-600 hover:underline mt-2 cursor-pointer"
                    >
                        Close
                    </button>
                    {/* Display details of the selected collection here */}
                    <CollectionDetailsPopup collection={selectedCollection} data={selectedCollectionData} onClose={closeCollectionDetails}/>
                    </div>
                </div>
            )}

      </div>
    );
  };
  
  export default Sreport;
  