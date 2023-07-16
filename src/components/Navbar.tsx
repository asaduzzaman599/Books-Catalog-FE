import { NavLink } from 'react-router-dom'

const Navbar = () => {

    return (
        <div className='container mx-auto flex justify-between bg-gray-600 py-6'>
            <div className='text-xl font-bold text-white'>
                Books Catalog House
            </div>
            <div>
                <ul className='flex gap-4'>
                    <li className='text-white font-medium'>
                        <NavLink to=''
                         className={({ isActive }) =>
                         isActive ? "text-blue-400 underline" : ""
                       }>All</NavLink>
                    </li>
                    <li className='text-white font-medium'>
                        <NavLink to='read-list'
                         className={({ isActive, isPending }) =>
                         isPending ? "pending" : isActive ? "active" : ""
                       }>Read List</NavLink>
                        
                    </li>
                    <li className='text-white font-medium'>
                    <NavLink to='wish-list'
                     className={({ isActive }) =>
                     isActive ? "text-gray-50" : ""
                   }> Wish List</NavLink>
                    </li>
                </ul>
            </div>
            <div>
            <ul className='flex gap-4'>
            <li className='text-white font-medium'>
            <NavLink to='login'>Login</NavLink>
            </li>
            <li className='text-white font-medium'>
            <NavLink to='signup'>Sign Up</NavLink>
            </li>
            </ul>
          
            </div>
        </div>
    );
};

export default Navbar;