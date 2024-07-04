# Fugitive Capture Game

## Overview

This is a full-stack web application where users can simulate a game to capture a fugitive hiding in one of the neighboring cities. Three cops independently choose cities to investigate and select vehicles based on the distance to those cities. The application determines if any cop successfully captures the fugitive based on their choices.

## Technologies Used

- **Frontend**: React,Vite,Tailwind CSS
- **Backend**: Node.js, Express
- **Deployment**: 
  - Frontend: Netlify
  - Backend: Render

## Features

- **City Selection**: Each cop selects a city to investigate.
- **Vehicle Selection**: Cops select a vehicle based on the distance to the selected city.
- **Result Page**: Displays whether the fugitive was captured and, if so, which cop made the capture.

## Setup Instructions For Running Development Mode

### Backend

1. **Clone the repository**:
   ```bash
   git clone <https://github.com/AdithyanKP/fugitive-hunt.git>
   cd Backend
  
2. **Install Dependancies**:
   ```bash
   npm i
  
3. **Run Application**:
   ```bash
   npm run start
   
   
 ### Frontend

1. **Clone the repository**:
   ```bash
   git clone <https://github.com/AdithyanKP/fugitive-hunt.git>
   cd Frontend
  
2. **Install Dependancies**:
   ```bash
   npm i
   
3. **Add env in .env file**:
   ```bash
   
    VITE_BACKEND_BASE_URL= 'https://fugitive-hunt-jslq.onrender.com/'
  
3. **Run Application**:
   ```bash
   npm run dev
   
## Assumptions

- The fugitive's location is randomly assigned at the start of the game.
- Each cop selects a unique city to investigate.
- Vehicle selections are based on availability and range.

## Deployment

- Frontend: Deployed on Netlify https://fugativehunt.netlify.app/ 
- Backend: Deployed on Render https://fugitive-hunt-jslq.onrender.com

## Conclusion
This project demonstrates the integration of a React frontend with a Node.js backend, deployed on Netlify and Render, respectively. It showcases the ability to build and deploy a full-stack web application with a focus on clean code, modularity, and maintainability.