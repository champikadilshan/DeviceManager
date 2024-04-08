# DeviceManager - MERN Stack

## Description
This sample project manages locations that control multiple devices. The task is to create a REST service and User interfaces for storing information about these locations and their associated devices. The information must be stored in the database. When storing a location or device, necessary validations should be added. The solution must also offer operations for displaying location details about all stored locations and details for a single location with their devices. Finally, it must be possible to add and remove a device from a location.

Each Location has:
- Human readable name (string) *
- Address (string)
- Phone (string)
- Multiple associated devices

Each device has:
- An unique serial number (string) *
- Type - (pos/kisok/signage) *
- Image *
- Status - active/inactive

## Table of Contents
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)

## Installation
Follow these steps to set up and run the project on your computer:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/champikadilshan/DeviceManager.git
   cd project-directory


2. **Install Dependencies**:
   ```bash
   cd backend
   npm run dev

## Setup
1. To start the backend server, navigate to the backend folder and run the following command:
   ```bash
   cd backend
    npm run dev
2. rontend Setup
    ```bash
    cd frontend
    npm run dev
    
The front-end server will start running.

##Usage
Once the backend and frontend servers are running, you can access the application by navigating to http://localhost:3000/ in your web browser.

Follow the user interface to perform operations such as adding locations, managing devices, and viewing location details.

Make sure to refer to the provided project description for detailed information about the application's functionality and requirements.

Note: Before running the project, make sure you have Node.js installed on your system. You can install it from https://nodejs.org/.

