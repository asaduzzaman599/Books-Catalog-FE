
import { useGetBooksQuery } from '@/redux/features/books/booksApi'
import { IBook } from '@/types/globalTypes'
import Book from './Book'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'


const Books = () => {
    const { data, error, isLoading } = useGetBooksQuery({})
    const navigate = useNavigate()

    if(isLoading)
    return <div>
        Loading...
    </div>

    const details = (id: string) =>{
        navigate(`/books/${id}`)
    }
    return (
        <div className='container mx-auto'>
            <div className='mt-10 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2'>
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

export default Books;