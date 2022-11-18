import React from "react";
import {BrowserRouter} from "react-router-dom";
import {AnimatedRoutes} from "./routes/AnimatedRoutes";
import {Provider} from "react-redux";
import {store} from "./redux/store";

const App: React.FC = () => {
    return (
        <div className='App'>
            <Provider store={store}>
                <BrowserRouter>
                    <AnimatedRoutes/>
                </BrowserRouter>
            </Provider>
        </div>
    )
};

export default App;
