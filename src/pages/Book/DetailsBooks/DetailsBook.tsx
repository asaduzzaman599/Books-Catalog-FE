/* eslint-disable @typescript-eslint/no-misused-promises */

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
import Reviews from './Reviews'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

  const DetailsBook = () => {
    const {id} = useParams()

    const navigate = useNavigate()
    const user = useAppSelector(state=>state.user)
    const {data, isLoading,} = useGetBookQuery(id as string)
    const [deleteBook, deleteResult] = useDeleteMutation()
    const [addReadList] = useAddReadListMutation()
    const readList = useGetReadListQuery(user.token)
    const [addWishList] = useAddWishListMutation()
    const wishList = useGetWishListQuery('')


    if(isLoading || deleteResult.isLoading || wishList.isLoading || readList.isLoading )
    {
        return <Loading />
    }
    if(deleteResult.isSuccess){
        navigate('/')
    }
      
    const onDeleteBook = async () => {
        await deleteBook({id: id!})
    }
    const onUpdate = () => {
        navigate(`/update-book/${id!}`)
    }

    const wishListed = !!wishList?.data?.result?.find((wish) => wish?.book?._id === id)
    const readListed = !!readList?.data?.result?.find((read) => read?.book?._id === id)
  

    const addToReadList = async () =>{
        await addReadList({id:id!,})
    }
    const addToWishList = async () =>{
        await addWishList({id:id!})
    }

      return (
        <div className='container lg:flex mt-4 gap-4 justify-center mt-4'>
          <div className='flex justify-center w-full'>
          <div className="max-w-xl mx-auto bg-white p-8 shadow-md flex-1 bg-green-300">
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
              <p className="text-gray-900">{data?.result?.publicationDate? new Date(data?.result?.publicationDate)?.toLocaleDateString(): ''}</p>
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold">Genre:</label>
              <p className="text-gray-900">{data?.result?.genre}</p>
            </div>
            </div>
            <div>
              <button className="p-2 flex items-center gap-4 text-gray-400 text-sm" onClick={addToWishList}  data-tooltip-id="my-tooltip"  data-tooltip-content={wishListed?"Remove from wish list": "Add to wish list"}>
                <FaClipboardList className={`${wishListed ? 'text-blue-300':'text-gray-400'} h-5 w-5`}/>
              </button>
              <button className="p-2 flex items-center gap-4 text-gray-400 text-sm" onClick={addToReadList} data-tooltip-id="my-tooltip" data-tooltip-content={readListed?"Remove from read list": "Add to read list"}>
               <FaReadme className={`${readListed ? 'text-blue-300':'text-gray-400'} h-5 w-5`}/>
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button  variant={'destructive'}>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  book and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleteBook}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="flex">
            
          </div>
        </div>
        </> 
        }
          </div>
          </div>
          <div className=' lg:w-4/12 mx-auto'>
            <Reviews id={id} />
          </div>
        </div>
      
      );
  };
  
  export default DetailsBook;