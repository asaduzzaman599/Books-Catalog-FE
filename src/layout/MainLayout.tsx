import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <>
        <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='grow'> 
        <Outlet />
        </div>
        <Footer />
        </div>
        </>
    );
};

export default MainLayout;