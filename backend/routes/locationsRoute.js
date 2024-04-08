
import express from 'express';
import { Location } from '../models/locationDeviceModels.js';

const router = express.Router();

// Route for creating a new location
router.post('/', async (request, response) => {
    try {
        const { name, address, phone, devices } = request.body;
        if (!name || !address || !phone || !devices) {
            return response.status(400).json({ message: "Name, address, phone, and devices are required" });
        }

        const newLocation = new Location({ name, address, phone, devices });
        await newLocation.save();
        
        return response.status(201).json(newLocation);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal Server Error" });
    }
});

// Route for get all locations
router.get('/', async (request, response) => {
    try {
        const locations = await Location.find();
        if (locations.length === 0) {
            return response.status(404).json({ message: "No locations found" });
        }
        return response.status(200).json({
            locationcount: locations.length,
            locations: locations.map(location => ({
                deviceCount: location.devices.length,
                location: location
            }))
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

// Route for get a location by id
router.get('/:id', async (request, response) => {
    try {
        const location = await Location.findById(request.params.id);
        if (!location) {
            return response.status(404).json({ message: "Location not found" });
        }
        return response.status(200).json({deviceCount: location.devices.length,location});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

// Route for updating a location
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.address ||
            !request.body.phone ||
            !request.body.devices
        ) {
            return response.status(400).send({ message: "Name, address, phone, and devices are required" });
        }

        const { id } = request.params;

        const result = await Location.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "Location not found" });
        }

        return response.status(200).json({ message: "Location updated successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

// Route for deleting a location
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Location.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: "Location not found" });
        }

        return response.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

export default router;