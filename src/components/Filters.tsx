import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import React, {ChangeEvent} from 'react';
import { Input } from './ui/input'
import { filterBySearch } from '@/redux/features/books/booksFilter'

const Filters = () => {
    const dispatch = useAppDispatch()
    const {search} = useAppSelector(state =>state.filters)

    
    return (
        <div className='w-full p-4'>
            <div>
                <Input onChange={(e)=>dispatch(filterBySearch(e.target.value))} value={search} />
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Filters;