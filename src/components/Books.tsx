/* eslint-disable @typescript-eslint/no-misused-promises */

import { useGetBooksQuery } from '@/redux/features/books/booksApi'
import { useAppSelector } from '@/redux/hooks/hooks'
import { IBook } from '@/types/globalTypes'
import { useNavigate } from 'react-router-dom'
import Book from './Book'
import Filters from './Filters'
import Loading from './Loading'
import { Button } from './ui/button'

import { FaClipboardList, FaReadme } from "react-icons/fa"
import { useAddReadListMutation, useGetReadListQuery } from '@/redux/features/readlist/readlistApi'
import { useAddWishListMutation, useGetWishListQuery } from '@/redux/features/wishlist.ts/wishlist'

const Books = () => {
    const {search,publicationYear,genre} = useAppSelector(state => state.filters)
    const { data, error, isLoading } = useGetBooksQuery({search:search, publicationYear: publicationYear, genre})
    const navigate = useNavigate()
    const {user} = useAppSelector(state=>state.user)
    const [addReadList] = useAddReadListMutation()
    const readList = useGetReadListQuery('')
    const [addWishList] = useAddWishListMutation()
    const wishList = useGetWishListQuery('')

    if(isLoading)
    return <Loading />

    const details = (id: string) =>{
        navigate(`/books/${id}`)
    }
    
    const addToReadList = async (id:string) =>{
        await addReadList({id:id,})
    }
    const addToWishList = async (id:string) =>{
        await addWishList({id:id})
    }
    const usersReadList = readList?.data?.result?.map(i=>i?.book?._id) ?? []
    const usersWishList = wishList?.data?.result?.map(i=>i?.book?._id) ?? []
    return (
        <div className='container mx-auto'>
            <Filters />
            <div className='mt-10 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4'>
                {
                    data?.result?.map((book: IBook) => <Book book={book}>
                        <div>
                        <div className='flex justify-center mt-4'>
                            <Button onClick={()=>details(book._id)}>Details</Button>
                        </div>
                        {user && 
                            <div className='w-full flex mt-2'>
                                <div className='w-full flex justify-between mx-auto'>
                                    <button className="p-2 flex items-center gap-4 text-gray-400 text-sm" onClick={()=> addToWishList(book._id)}  data-tooltip-id="my-tooltip"  data-tooltip-content={usersWishList.includes(book._id)?"Remove from wish list": "Add to wish list"}>
                                        <FaClipboardList className={`${usersWishList.includes(book._id) ? 'text-blue-300':'text-gray-400'} h-6 w-6`}/>
                                    </button>
                                    <button className="p-2 flex items-center gap-4 text-gray-400 text-sm" onClick={()=>addToReadList(book._id)} data-tooltip-id="my-tooltip" data-tooltip-content={usersReadList.includes(book._id)?"Remove from read list": "Add to read list"}>
                                        <FaReadme className={`${usersReadList.includes(book._id) ? 'text-blue-300':'text-gray-400'} h-5 w-5`}/>
                                    </button>  
                                </div>
                            </div>
                        }
                        </div>
                    </Book>)
                }
            </div>
        </div>
    );
};

export default Books;