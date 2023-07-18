/* eslint-disable @typescript-eslint/no-misused-promises */
import Book from '@/components/Book'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { useAddReadListMutation, useGetReadListQuery } from '@/redux/features/readlist/readlistApi'
import { useAppSelector } from '@/redux/hooks/hooks'
import { FaReadme } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'


const ReadList = () => {
    const user = useAppSelector(state=>state.user)
    const {data, isLoading} = useGetReadListQuery('')
    const [addReadList] = useAddReadListMutation()

    const navigate = useNavigate()

    if(isLoading)
    return <Loading />

    const details = (id: string) =>{
        navigate(`/books/${id}`)
    }
    const addToReadList = async (id:string) =>{
        await addReadList({id:id,})
    }
    const usersReadList = data?.result?.map(i=>i?.book?._id) ?? []

    return (
        <div className='container mx-auto'>
            <div className='mt-10 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2  gap-4'>
                {
                     data?.result?.length ?
                    data?.result?.map(({book}) => <Book book={book} key={book._id}>
                        <div>
                        <div className='flex justify-center mt-4'>
                            <Button onClick={()=>details(book._id)}>Details</Button>
                        </div>
                        {user && 
                            <div className='w-full flex mt-2'>
                                <div className='w-full flex justify-end mx-auto'>
                                    <button className="p-2 flex items-center gap-4 text-gray-400 text-sm" onClick={()=>addToReadList(book._id)} data-tooltip-id="my-tooltip" data-tooltip-content={usersReadList.includes(book._id)?"Remove from read list": "Add to read list"}>
                                        <FaReadme className={`${usersReadList.includes(book._id) ? 'text-blue-300':'text-gray-400'} h-5 w-5`}/>
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

export default ReadList;