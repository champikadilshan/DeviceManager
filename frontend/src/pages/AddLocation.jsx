import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddLocation = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const validateInputs = () => {
    const errors = {};
    let isValid = true;

    if (!name) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!address) {
      errors.address = 'Address is required';
      isValid = false;
    }
    if (!phone) {
      errors.phone = 'Phone is required';
      isValid = false;
    }
    devices.forEach((device, index) => {
      if (!device.serialNumber) {
        errors[`device${index}-serialNumber`] = 'Serial number is required';
        isValid = false;
      }
      if (!device.type) {
        errors[`device${index}-type`] = 'Type is required';
        isValid = false;
      } else if (!['pos', 'kiosk', 'signage'].includes(device.type.toLowerCase())) {
        errors[`device${index}-type`] = 'Invalid device type';
        isValid = false;
      }
      if (!device.image) {
        errors[`device${index}-image`] = 'Image URL is required';
        isValid = false;
      }
      if (!device.status) {
        errors[`device${index}-status`] = 'Status is required';
        isValid = false;
      } else if (!['active', 'inactive'].includes(device.status.toLowerCase())) {
        errors[`device${index}-status`] = 'Invalid device status';
        isValid = false;
      }
    });

    setErrors(errors);
    return isValid;
  };

  const handleAddDevice = () => {
    setDevices([...devices, { serialNumber: '', type: '', image: '', status: '' }]);
  };

  const handleDeviceChange = (index, field, value) => {
    const updatedDevices = [...devices];
    updatedDevices[index][field] = value;
    setDevices(updatedDevices);
  };

  const handleSaveLocation = () => {
    if (!validateInputs()) {
      return;
    }

    const data = {
      name,
      address,
      phone,
      devices: devices.map(device => ({
        serialNumber: device.serialNumber,
        type: device.type,
        image: device.image,
        status: device.status
      }))
    };

    setLoading(true);
    axios.post('http://localhost:5555/locations', data)
      .then(response => {
        console.log("Response data:", response.data);
        setLoading(false);
        enqueueSnackbar('Location added successfully', { variant: 'success' });
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar('Failed to add location', { variant: 'error' });
      });
  };

  return (
    <div className='p-4 bg-slate-900 h-screen'>
      <BackButton />
      <div className='max-w-xl w-full'>
      
      <h1 className='text-2xl font-bold pt-4 text-slate-100'>Add Location</h1>
      <div className='mt-4'>
        <label className='block mb-2 text-slate-100'>Name </label>
        <input
          type='text'
          className='border p-1 w-full rounded-md'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className='text-red-500'>{errors.name}</p>}
      </div>
      <div className='mt-4'>
        <label className='block mb-2 text-slate-100'>Address </label>
        <input
          type='text'
          className='border p-1 w-full rounded-md'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <p className='text-red-500'>{errors.address}</p>}
      </div>
      <div className='mt-4'>
        <label className='block mb-2 text-slate-100'>Phone </label>
        <input
          type='text'
          className='border p-1 w-full rounded-md'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
      </div>
      <div className='mt-4'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded'
          onClick={handleAddDevice}
        > 
          Add Device
        </button>
      </div>
      {devices.map((device, index) => (
        <div key={index} className='mt-4'>
          <label className='block mb-2 text-slate-400'>Device  {index + 1}</label>
          <input
            type='text'
            className='border pl-2 p-1 w-full mb-2 rounded-md'
            placeholder='Serial Number'
            value={device.serialNumber}
            onChange={(e) => handleDeviceChange(index, 'serialNumber', e.target.value)}
          />
          {errors[`device${index}-serialNumber`] && <p className='text-red-500'>{errors[`device${index}-serialNumber`]}</p>}
          <input
            type='text'
            className='border p-1  pl-2 w-full mb-2 rounded-md'
            placeholder='Type (pos/kiosk/signage)'
            value={device.type}
            onChange={(e) => handleDeviceChange(index, 'type', e.target.value)}
          />
          {errors[`device${index}-type`] && <p className='text-red-500'>{errors[`device${index}-type`]}</p>}
          <input
            type='text'
            className='border pl-2 p-1 w-full mb-2 rounded-md'
            placeholder='Image URL'
            value={device.image}
            onChange={(e) => handleDeviceChange(index, 'image', e.target.value)}
          />
          {errors[`device${index}-image`] && <p className='text-red-500'>{errors[`device${index}-image`]}</p>}
          <input
            type='text'
            className='border p-1 pl-2 w-full mb-2 rounded-md'
            placeholder='Status (active/inactive)'
            value={device.status}
            onChange={(e) => handleDeviceChange(index, 'status', e.target.value)}
          />
          {errors[`device${index}-status`] && <p className='text-red-500'>{errors[`device${index}-status`]}</p>}
        </div>
      ))}
      <div className='mt-4'>
        <button
          className='bg-green-500 text-white px-4 py-2 rounded'
          onClick={handleSaveLocation}
        >
          {loading ? 'Saving...' : 'Save Location'}
        </button>
      </div>
      </div>
    </div>
  );
};

export default AddLocation;
