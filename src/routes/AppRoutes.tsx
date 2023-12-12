import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import SideBar from '../components/SideBar';
import Funcionarios from '../pages/Funcionarios';


function AppRoutes() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}/>
                    <Route path='/Home' element={<SideBar children={<Home />}/>}/>
                    <Route path='/Funcionarios' element={<SideBar children={<Funcionarios />}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes;