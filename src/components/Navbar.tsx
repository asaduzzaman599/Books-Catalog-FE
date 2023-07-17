import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { Link, NavLink } from 'react-router-dom'
import { Button } from './ui/button'
import { removeUser } from '@/redux/features/user/userSlice'

const Navbar = () => {

    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    

    const signOut = () =>{
        localStorage.removeItem('tokenId')
        dispatch(removeUser())
    }

    return (
        <div className='bg-gray-600 py-6  '>
        <div className='container mx-auto flex justify-between items-center'>
            <div className='text-xl font-bold text-white'>
              <Link to='/'> Books Catalog House</Link>
            </div>
            <div>
                <ul className='flex gap-4  items-center'>
                    <li className='text-white font-medium'>
                        <NavLink to='/books'
                         className={({ isActive }) =>
                         isActive ? "text-blue-400 underline" : ""
                       }>All</NavLink>
                    </li>
                    <li className='text-white font-medium'>
                        <NavLink to='read-list'
                         className={({ isActive }) =>
                         isActive ? "text-blue-400 underline" : ""
                       }>Read List</NavLink>
                        
                    </li>
                    <li className='text-white font-medium'>
                    <NavLink to='wish-list'
                     className={({ isActive }) =>
                     isActive ? "text-blue-400 underline" : ""
                   }> Wish List</NavLink>
                    </li>
                </ul>
            </div>
            <div>
                {
                    !user ? <ul className='flex gap-4 items-center'>
                    <li className='text-white font-medium'>
                    <NavLink to='login'>Login</NavLink>
                    </li>
                    <li className='text-white font-medium'>
                    <NavLink to='signup'>Sign Up</NavLink>
                    </li>
                    </ul> :
                    <ul className='flex gap-4  items-center'>
                    <li className='text-white font-medium'>
                    <NavLink to='/add-new-book'>Add Books</NavLink>
                    </li>
                    <li className='text-white font-medium'>
                    <Button onClick={signOut}>Logout</Button>
                    </li>
                    </ul>
                }
            
          
            </div>
        </div>
        </div>
    );
};

export default Navbar;