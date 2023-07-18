import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='flex h-screen w-full justify-center items-center'>
            <div className='text-center'>
            <h1 className='text-lg font-bold'> 404! Page not Found</h1>
            <Link to={'/'} className='underline'>HOME</Link>
            </div>
        </div>
    );
};

export default NotFound;