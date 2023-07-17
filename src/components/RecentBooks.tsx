import { useGetBooksQuery } from '@/redux/features/books/booksApi'
import React from 'react';
import Loading from './Loading'
import Book from './Book'
import { IBook } from '@/types/globalTypes'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const RecentBooks = () => {
  
  const navigate = useNavigate()

  const {data, isLoading}= useGetBooksQuery({limit:10})
  if(isLoading)
  return <Loading />

  
  const details = (id: string) =>{
    navigate(`/books/${id}`)
}
  return (
    <div className='container mx-auto'>
            <div className='lg:w-4/5 mx-auto mt-10 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1'>
                {
                    data?.result?.map((book: IBook) => <Book book={book}>
                        <div className='flex justify-start'>
                            <Button onClick={()=>details(book._id)}>Details</Button>
                        </div>
                    </Book>)
                }
            </div>
        </div>
  );
};

export default RecentBooks;