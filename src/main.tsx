import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App' ;
import './scss/app.scss';
import {createRoutesFromElements, createBrowserRouter, RouterProvider} from "react-router-dom";
import {Route} from "react-router";
import {Starter} from "./routes/Starter";
import {StarterError} from "./routes/Starter/StarterError";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'
               element={<Starter />}
               errorElement={<StarterError />}>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App>
        <RouterProvider router={router} />
    </App>
)
