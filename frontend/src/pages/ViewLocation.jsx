import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import NavBar from '../components/NavBar';

const ViewLocation = () => {
    const [location, setLocation] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/locations/${id}`)
            .then((response) => {
                console.log("Response data:", response.data);
                setLocation(response.data.location);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className='p-4 bg-slate-900 h-screen'>
                      <div className='pb-5'>
                <NavBar />
            </div>
            <BackButton />
            <h1 className='text-2xl font-bold text-slate-100 pt-4'>Devices Details</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='mt-4'>
                    <div className='flex justify-between items-center pr-24'>
                        <div>
                            <p className='font-bold text-slate-100'>Name </p>
                            <p className='text-slate-400'>{location && location.name}</p>
                        </div>
                        <div>
                            <p className='font-bold text-slate-100'>Address </p>
                            <p className='text-slate-400'>{location && location.address}</p>
                        </div>
                        <div>
                            <p className='font-bold text-slate-100'>Phone </p>
                            <p className='text-slate-400'>{location && location.phone}</p>
                        </div>
                    </div>
                    <div className='mt-4'>
                      <p className='font-bold text-slate-100 pt-8 pb-1'>Devices</p>
                      <ul>
                          {location &&
                              location.devices &&
                              location.devices.map((device) => (
                                  <li key={device._id} className="flex items-center text-slate-400">
                                      <img src={device.image} alt={device.serialNumber} className="w-40 h-40 mr-3 p-2 pl-0" />
                                      <div >
                                          <p>Serial Number : {device.serialNumber}</p>
                                          <p>Type : {device.type}</p>
                                          <p>Status : {device.status}</p> <br />
                                          
                                      </div>
                                  </li>
                              ))}
                      </ul>
                  </div>
                </div>
            )}
        </div>
    );
};

export default ViewLocation;
