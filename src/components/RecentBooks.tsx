/* eslint-disable @typescript-eslint/no-misused-promises */
import { useGetBooksQuery } from '@/redux/features/books/booksApi'
import { FaClipboardList, FaReadme } from "react-icons/fa"
import Loading from './Loading'
import Book from './Book'
import { IBook } from '@/types/globalTypes'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/redux/hooks/hooks'
import { useAddReadListMutation, useGetReadListQuery } from '@/redux/features/readlist/readlistApi'
import { useAddWishListMutation, useGetWishListQuery } from '@/redux/features/wishlist.ts/wishlist'
import Banner from './Banner'

const RecentBooks = () => {
  
  const navigate = useNavigate()

  const {user} = useAppSelector(state=>state.user)
  const {data, isLoading}= useGetBooksQuery({limit:10})

  const [addReadList] = useAddReadListMutation()
  const readList = useGetReadListQuery('',{skip: !user})
  const [addWishList] = useAddWishListMutation()
  const wishList = useGetWishListQuery('',{skip: !user})

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
    <div>
        
        <Banner />
        <h3 className='text-3xl my-4 font-bold text-center'>Recently Added Books</h3>
    <div className='container mx-auto'>
            <div className='lg:w-4/5 mx-auto mt-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1  gap-4'>
                {
                    data?.result?.map((book: IBook) => <Book book={book} key={book._id}>
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
    </div>
  );
};

export default RecentBooks;