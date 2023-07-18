import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import React from 'react';
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <>
        <div className='flex flex-col min-h-screen justify-between'>
        <Navbar />
        <Outlet />
        <Footer />
        </div>
        </>
    );
};

export default MainLayout;