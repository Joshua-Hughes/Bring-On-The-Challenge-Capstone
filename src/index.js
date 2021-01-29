import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { MainPage } from "./components/Main"
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <MainPage />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);