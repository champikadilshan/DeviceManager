import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import NavBar from '../components/NavBar';

const DeleteLocation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteLocation = () => {
    setLoading(true);
    axios.delete(`http://localhost:5555/locations/${id}`)
      .then(response => {
        console.log("Response data:", response.data);
        setLoading(false);
        enqueueSnackbar('Location deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar('Failed to delete location', { variant: 'error' });
      });
  };

  return (
    <div className='min-h-screen p-4 bg-slate-900'>
                  <div className='pb-5'>
                <NavBar />
            </div>
      <BackButton />
      <div className='my-4'>
        <h1 className='text-2xl font-bold pt-4 text-slate-100'>Delete Location</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col items-center border-2 border-blue-400 rounded-x1 w-[400px] p-8 mx-auto rounded-lg'>
          <h3 className='block mb-2 text-slate-100'>Are you sure you want to delete this location?</h3>
          <button className='p-3 bg-red-600 text-white m-8 w-full rounded-md' onClick={handleDeleteLocation}>Yes, Delete it</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLocation;
