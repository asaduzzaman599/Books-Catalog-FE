
  import { useGetBookQuery } from '@/redux/features/books/booksApi'
import React from 'react';
import { useParams } from 'react-router-dom'

  const DetailsBook = () => {
    const {id} = useParams()
    
    const {data, isLoading, isSuccess} = useGetBookQuery(id as string)
  
      
      return (
          <div className='w-full'>
              <div className='w-full'></div>
          </div>
      );
  };
  
  export default DetailsBook;