import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import React from 'react';
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <>
        <Navbar />
            <Outlet />
        </>
    );
};

export default MainLayout;