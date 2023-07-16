
  import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { useDeleteMutation, useGetBookQuery } from '@/redux/features/books/booksApi'
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { FaReadme,FaClipboardList } from "react-icons/fa";
import { useAppSelector } from '@/redux/hooks/hooks'
import { useAddReadListMutation, useGetReadListQuery } from '@/redux/features/readlist/readlistApi'
import { useAddWishListMutation, useGetWishListQuery } from '@/redux/features/wishlist.ts/wishlist'

  const DetailsBook = () => {
    const {id} = useParams()

    const navigate = useNavigate()
    const user = useAppSelector(state=>state.user)
    const {data, isLoading,} = useGetBookQuery(id as string)
    const [deleteBook, deleteResult] = useDeleteMutation()
    const [addReadList, readListResult] = useAddReadListMutation()
    const readList = useGetReadListQuery(user.token)
    const [addWishList, wishlistResult] = useAddWishListMutation()
    const wishList = useGetWishListQuery(user.token)


    if(isLoading || deleteResult.isLoading || wishList.isLoading || readList.isLoading)
    {
        return <Loading />
    }
    if(deleteResult.isSuccess){
        navigate('/')
    }
      
    const onDeleteBook = async () => {
        await deleteBook({id: id!, token: user.token})
    }
    const onUpdate = () => {
        navigate(`/update-book/${id!}`)
    }
      return (
        <div className="max-w-lg mx-auto bg-white p-8 shadow-md mt-10">
        <div className='flex justify-between'>
        <div>
            <h1 className="text-2xl font-bold mb-4">Book Details</h1>
            <div className="mb-4">
              <label className="text-gray-700 font-bold">Title:</label>
              <p className="text-gray-900">{data?.result?.title}</p>
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold">Author Name:</label>
              <p className="text-gray-900">{data?.result?.author}</p>
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold">Published Date:</label>
              <p className="text-gray-900">{new Date(data!.result!.publicationDate)?.toLocaleDateString()}</p>
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold">Genre:</label>
              <p className="text-gray-900">{data?.result?.genre}</p>
            </div>
            </div>
            <div>
              <button className="p-2 flex items-center gap-4 text-gray-400 text-sm">
                <FaReadme className={`text-gray-400 h-4 w-4`}/> Add To Read List
              </button>
              <button className="p-2 flex items-center gap-4 text-gray-400 text-sm">
               <FaClipboardList className={`text-gray-400 h-4 w-4`}/>  Add To Read List
              </button>  
            </div>
        </div>
        
        
        {
            data?.result?.createdBy._id === user.user?._id && 
           <>
            <div className="grid grid-cols-3 items-center justify-between gap-4">
          <Button onClick={onUpdate}>
            Edit
          </Button>
          <Button variant={'destructive'}  onClick={onDeleteBook}>
            Delete
          </Button>
          <div className="flex">
            
          </div>
        </div>
        </> 
        }
      </div>
      
      );
  };
  
  export default DetailsBook;