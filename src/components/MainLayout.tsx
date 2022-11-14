import React from "react";
import {BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import {Route, Router} from "react-router";
import {Starter} from "../routes/Starter";
import {ErrorPage} from "../routes/ErrorPage";

import App from "../App";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import {Auth} from "../routes/Auth";
import {Login} from "../routes/Auth/Login";
import {SignUp} from "../routes/Auth/SignUp";
import {AnimatePresence} from "framer-motion";
import {Routes} from "react-router-dom";


// export const MainLayout: React.FC = () => {
//     return (
//         <BrowserRouter>
//             <Routes location={} >
//
//             </Routes>
//         </ BrowserRouter>
//     )
// }

