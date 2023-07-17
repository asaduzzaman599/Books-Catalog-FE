
import { useGetBooksQuery } from '@/redux/features/books/booksApi'
import { IBook } from '@/types/globalTypes'
import Book from './Book'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import Filters from './Filters'
import { useAppSelector } from '@/redux/hooks/hooks'


const Books = () => {
    const {search,publicationYear,genre} = useAppSelector(state => state.filters)
    const { data, error, isLoading } = useGetBooksQuery({search:search, publicationYear: publicationYear, genre})
    const navigate = useNavigate()

    if(isLoading)
    return <Loading />

    const details = (id: string) =>{
        navigate(`/books/${id}`)
    }
    return (
        <div className='container mx-auto'>
            <Filters />
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