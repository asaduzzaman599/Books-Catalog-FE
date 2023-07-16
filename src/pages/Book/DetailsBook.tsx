
  import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { useDeleteMutation, useGetBookQuery } from '@/redux/features/books/booksApi'
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { FaReadme,FaClipboardList } from "react-icons/fa";
import { useAppSelector } from '@/redux/hooks/hooks'
import { useAddReadListMutation, useGetReadListQuery } from '@/redux/features/readlist/readlistApi'
import { useAddWishListMutation, useGetWishListQuery } from '@/redux/features/wishlist.ts/wishlist'
import { IBook } from '@/types/globalTypes'

  const DetailsBook = () => {
    const {id} = useParams()

    const navigate = useNavigate()
    const user = useAppSelector(state=>state.user)
    const {data, isLoading,} = useGetBookQuery(id as string)
    const [deleteBook, deleteResult] = useDeleteMutation()
    const [addReadList] = useAddReadListMutation()
    const readList = useGetReadListQuery(user.token)
    const [addWishList] = useAddWishListMutation()
    const wishList = useGetWishListQuery(user.token)


    if(isLoading || deleteResult.isLoading || wishList.isLoading || readList.isLoading )
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

    const wishListed = !!wishList?.data?.result?.find((wish) => wish?.book?._id === id)
    const readListed = !!readList?.data?.result?.find((read) => read?.book?._id === id)
    console.log(readListed)

    const addToReadList = async () =>{
        await addReadList({id:id!, token: user.token})
    }
    const addToWishList = async () =>{
        await addWishList({id:id!, token: user.token})
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
              <button className="p-2 flex items-center gap-4 text-gray-400 text-sm" onClick={addToWishList}>
                <FaClipboardList className={`${wishListed ? 'text-blue-300':'text-gray-400'} h-4 w-4`}/> Add To Wish List
              </button>
              <button className="p-2 flex items-center gap-4 text-gray-400 text-sm" onClick={addToReadList}>
               <FaReadme className={`${readListed ? 'text-blue-300':'text-gray-400'} h-4 w-4`}/>  Add To Read List
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