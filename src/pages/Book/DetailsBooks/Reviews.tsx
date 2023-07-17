/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useGetReviewsQuery, usePostCommentMutation } from '@/redux/features/reviews/reviewsApi'
import React,{ ChangeEvent, useState,FormEvent } from 'react';
import { FaCommentDots, FaPaperPlane } from "react-icons/fa";

interface Props {
    id?: string
}
const Reviews = ({id}: Props) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [postComment]=usePostCommentMutation()
    const {data}=useGetReviewsQuery(id!)

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const option = { 
            comment: inputValue,
            book:id,
        }
    
        postComment({id: id!, data: option  });
        setInputValue('');
      };
    return (
        <div className='w-full  p-5 '>
            <div className='p-5 shadow-lg rounded w-full bg-blue-50'>

           <form onSubmit={handleSubmit} className='flex  w-full bg-white'>
            <Textarea
            className="flex-1"
            onChange={handleChange}
            value={inputValue}
            />
            <button className='bg-blue-50'>
            <div className='flex items-center justify-center h-full mr-2'>
                        <FaPaperPlane className="h-6 w-6 ml-2 text-slate-700" />
                    </div>
                </button> 
           </form>
           {
            data?.result?.map(comment=><div className='w-full lg:flex gap-2 py-2 px-4  m-2 shadow rounded justify-between bg-white'>
                <div className='flex justify-between'>
                    <div>
                        <div className='flex items-center justify-center h-full mr-2'>
                            <FaCommentDots className="h-6 w-6 text-slate-700" />
                        </div>
                    </div>
                    <div className='flex-1'>
                        <p className='text-xs text-gray-600 font-semibold'>{comment.user.name.firstName} {comment.user.name.lastName}</p>
                        <p className='text-sm text-gray-600 font-light'>{comment.comment}</p>
                    </div>
                </div>
                <div className='text-sm text-gray-600 font-bold text-right'>{new Date(comment.createdAt).toLocaleDateString()}</div>
            </div>)
           }
           
           </div>
        </div>
    );
};

export default Reviews;