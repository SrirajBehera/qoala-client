# Qoala Client

## Demo

Client hosted on Vercel: [https://qoala-client.vercel.app/](https://qoala-client.vercel.app/)

## Technologies used

React, Vite, Redux, Material UI and Google Firebase Cloud Storage

## Run Locally

Clone the project

```bash
  git clone https://github.com/SrirajBehera/qoala-client.git
```

Go to the project directory

```bash
  cd qoala-client
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_PROD_URL`

`VITE_FIREBASE_API_KEY`

`VITE_FIREBASE_AUTH_DOMAIN`

`VITE_FIREBASE_PROJECT_ID`

`VITE_FIREBASE_MESSAGING_SENDER_ID`

`VITE_FIREBASE_APP_ID`

`VITE_FIREBASE_MEASUREMENT_ID`

## Google Firebase Cloud Storage

Firebase Cloud Storage is used to store the images.

You can read through the official Google [Documentation](https://firebase.google.com/docs/storage/web/start) for Firebase Cloud Storage. Apart form the first environment variable, rest are available from Firebase once you configure it.

## Dependencies

```json
"dependencies": {
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@microlink/react-json-view": "^1.23.0",
    "@mui/icons-material": "^5.15.1",
    "@mui/lab": "^5.0.0-alpha.157",
    "@mui/material": "^5.15.1",
    "@mui/x-data-grid": "^6.18.6",
    "@reduxjs/toolkit": "^2.0.1",
    "axios": "^1.6.2",
    "firebase": "^10.7.1",
    "localforage": "^1.10.0",
    "match-sorter": "^6.3.1",
    "moment": "^2.29.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^9.0.4",
    "react-router-dom": "^6.21.1",
    "sort-by": "^1.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "vite": "^5.0.8"
  }
```

## Architecture Overview

1. State Management

    - The application leverages Redux for effective state management. Key Redux setup is located in `src/app/store.jsx`.

2. Authentication

    - For handling authentication-related state, the application employs Redux slices. Refer to `src/features/authSlice.jsx` for authentication state management.

3. Firebase Integration

    - Firebase is integrated into the application, as `firebase.js` in the `src/features` directory. This could encompass Cloud Storage Service.

4. Screens

    The application consists of various screens, each represented by a directory in `src/screens`. Notable screens include:

    - `DashboardScreen`: The main user interface after logging in.
    - `EditDocumentScreen`: A screen for editing documents.
    - `HistoryScreen`: The interface for user activity log.
    - `LoginScreen`: The interface for user authentication.
    - `RegisterScreen`: The interface for new users to create an account.
    - `ScannerScreen`: The interface for OCR scanning.

5. Utilities

    - Utility functions, crucial for data formatting, are available in `src/utils/formatting.js`.

6. Routing

    - Conditional routing based on auth-tokens, available in `src/App.jsx`.

7. Styling

    - The application makes extensive use of Material UI, and React CSS Modules are employed for styling.

8. API Integration

    - The application communicates with the backend by integrating APIs into the screens based on their specific functionalities.

---
