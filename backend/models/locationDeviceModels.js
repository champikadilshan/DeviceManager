import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    serialNumber: { type: String, required: true },
    type: { type: String, enum: ['pos', 'kiosk', 'signage'], required: true },
    image: { type: String }, // You may want to adjust this field based on your specific requirements
    status: { type: String, enum: ['active', 'inactive'], required: true }
});

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    devices: [deviceSchema] // Embedding the device schema within the location schema
});

export const Location = mongoose.model('Location', locationSchema);