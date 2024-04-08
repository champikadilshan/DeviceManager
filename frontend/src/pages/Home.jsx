import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import NavBar from '../components/NavBar';

const Home = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5555/locations")
            .then((response) => {
                console.log("Response data:", response.data); // Log response data
                setLocations(response.data.locations);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        
        <div className='p-4 bg-slate-900 h-screen'>
            <div className='pb-5'>
                <NavBar />
            </div>
            <div className='flex justify-between items-center pr-2'>
                <h1 className='text-2xl font-bold text-slate-100 pl-2'>Locations</h1>
                <Link to='/locations/add' className='bg-blue-500 text-white px-4 py-2 rounded flex items-center'>
                    <MdOutlineAddBox className='mr-2'/>
                    Add Location
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2 mt-4'>
                    <thead>
                        <tr>
                            <th className='border border-slate-400 rounded-md text-slate-100'>Name</th>
                            <th className='border border-slate-400  rounded-md text-slate-100'>Address</th>
                            <th className='border border-slate-400  rounded-md text-slate-100'>Phone</th>
                            <th className='border border-slate-400  rounded-md text-slate-100'>Devices</th>
                            <th className='border border-slate-400  rounded-md text-slate-100'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations?.map((locationData, index) => (
                            <tr key={locationData.location._id} className='h-8'>
                                <td className='border border-slate-400 rounded-md text-slate-100 pl-3'>
                                    {locationData.location.name}
                                </td>
                                <td className='border border-slate-400 rounded-md text-slate-100 pl-3'>
                                    {locationData.location.address}
                                </td>
                                <td className='border border-slate-400 rounded-md text-slate-100 pl-3'>
                                    {locationData.location.phone}
                                </td>
                                <td className='border border-slate-400 rounded-md text-slate-100 pl-3'>
                                    {locationData.location.devices?.map((device, index) => (
                                        <div key={index}>
                                            <p>{device.serialNumber} 
                                            &nbsp;:&nbsp;  
                                             {device.type}</p>
                                           
                                        </div>
                                    ))}
                                </td>
                                <td className='border border-slate-400 rounded-md'>
                                <div className='flex justify-between items-center px-3'>
                                        <Link to={`/locations/${locationData.location._id}`} className='bg-blue-500 text-white px-2 py-1 rounded '>
                                            <BsInfoCircle />
                                        </Link>
                                        <Link to={`/locations/edit/${locationData.location._id}`} className='bg-green-500 text-white px-2 py-1 rounded'>
                                            <AiOutlineEdit />
                                        </Link>
                                        <Link to={`/locations/delete/${locationData.location._id}`} className='bg-red-500 text-white px-2 py-1 rounded'>
                                            <AiOutlineDelete />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>    
                </table>
            )}
        </div>
    );
}

export default Home;
