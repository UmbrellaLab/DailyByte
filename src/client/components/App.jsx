import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import Login from './Login';
import CreateAccount from './CreateAccount';
// import Home from './Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/createAccount',
        element: <CreateAccount />,
    },
    // {
    //     path: '/home',
    //     element: <Home />,
    // }
]);

const App = () => {
    return (
        <>
            <h1>Algo's Digest</h1>
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        </>
    )
};

export default App;