# SwasthMaithri Medicines Donation Platform

Welcome to SwasthMaithri, a platform for donating medicines to those in need. This project aims to facilitate the donation process by providing a simple form for users to submit details about the medicines they wish to donate.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

SwasthMaithri is a web-based platform developed to streamline the process of donating medicines. It allows users to fill out a form with details about the medicines they want to donate and submit it to the platform. The submitted information is then stored in a Firebase Realtime Database, where it can be accessed by administrators or relevant organizations to coordinate the donation process.

## Features

- **User-friendly Interface**: The platform provides a simple and intuitive form for users to fill out with details about the medicines they wish to donate.
- **Realtime Database**: Utilizes Firebase Realtime Database to store and manage donation submissions, ensuring that information is updated and accessible in real time.
- **Cross-Origin Requests**: CORS (Cross-Origin Resource Sharing) is implemented to allow communication between the frontend and backend, enabling seamless form submission.
- **Error Handling**: Proper error handling is implemented on both frontend and backend to provide users with feedback in case of submission errors.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Thanvi0106/SWASTHMAITHRI
   ```
2. Navigate to the project directory:
   ```
   cd swasthmaithri
   ```
3. Install dependencies for both frontend and backend:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

## Usage

1. Start the backend server:
   ```
   cd backend
   node server.js
   ```
2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```
3. Open your web browser and navigate to `http://localhost:3000` to access the SwasthMaithri platform.

## Technologies Used

- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: Firebase Realtime Database
- **Other Tools**: CORS middleware, Firebase Admin SDK

