/* eslint-disable @typescript-eslint/no-misused-promises */
import Book from '@/components/Book'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { useGetWishListQuery, useAddWishListMutation } from '@/redux/features/wishlist.ts/wishlist'
import { useNavigate } from 'react-router-dom'
import { FaClipboardList } from "react-icons/fa"

const WishList = () => {
    const {data, isLoading} = useGetWishListQuery('')
    const [addWishList] = useAddWishListMutation()

    const navigate = useNavigate()

    if(isLoading)
    return <Loading />

    const details = (id: string) =>{
        navigate(`/books/${id}`)
    }
    
    const addToWishList = async (id:string) =>{
        await addWishList({id:id})
    }
    const usersWishList = data?.result?.map(i=>i?.book?._id) ?? []
    return (
        <div className='container mx-auto'>
            <div className='mt-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-4'>
                {
                    data?.result?.length ?
                    data?.result?.map(({book}) => <Book book={book} key={book._id}>
                       <div>
                        <div className='flex justify-center mt-4'>
                            <Button onClick={()=>details(book._id)}>Details</Button>
                        </div>
                        {
                            <div className='w-full flex mt-2'>
                                <div className='w-full flex justify-start mx-auto'>
                                    <button className="p-2 flex items-center gap-4 text-gray-400 text-sm" onClick={()=> addToWishList(book._id)}  data-tooltip-id="my-tooltip"  data-tooltip-content={usersWishList.includes(book._id)?"Remove from wish list": "Add to wish list"}>
                                        <FaClipboardList className={`${usersWishList.includes(book._id) ? 'text-blue-300':'text-gray-400'} h-6 w-6`}/>
                                    </button>
                                </div>
                            </div>
                        }
                        </div>
                    </Book>)
                    :
                    <div>No Book Found</div>
                }
            </div>
        </div>
    );
};


export default WishList;