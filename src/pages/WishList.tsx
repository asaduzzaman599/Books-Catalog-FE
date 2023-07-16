import Book from '@/components/Book'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { useGetWishListQuery } from '@/redux/features/wishlist.ts/wishlist'
import { useAppSelector } from '@/redux/hooks/hooks'
import React from 'react';
import { useNavigate } from 'react-router-dom'

const WishList = () => {
    const user = useAppSelector(state=>state.user)
    const {data, isLoading} = useGetWishListQuery(user.token)

    const navigate = useNavigate()

    if(isLoading)
    return <Loading />

    const details = (id: string) =>{
        navigate(`/books/${id}`)
    }
    return (
        <div className='container mx-auto'>
            <div className='mt-10 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2'>
                {
                    data?.result?.map(({book}) => <Book book={book}>
                        <div className='flex justify-start'>
                            <Button onClick={()=>details(book._id)}>Details</Button>
                        </div>
                    </Book>)
                }
            </div>
        </div>
    );
};


export default WishList;