/* eslint-disable @typescript-eslint/no-misused-promises */
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useCreateMutation } from '@/redux/features/books/booksApi'
import { IBook } from '@/types/globalTypes'
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from './../../components/ui/button'
import { Input } from './../../components/ui/input'
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import Loading from "@/components/Loading"

const AddBook = () => {
    
    const [date, setDate] = useState<Date>()
    const navigate = useNavigate()
    const [addBook, result] =
    useCreateMutation();


    
    const {
        register,
        handleSubmit,
      } = useForm<IBook>();

    

    if(result.isLoading){
        return <Loading />
    }

    if(result.isSuccess){
        navigate('/')
    }

    if(result.isError){
        console.log(result.error)
    }
      
    const onSubmit =  (data: IBook) => {
        const inputData = {
            author: data.author,
            title: data.title,
            genre: data.genre,
            publicationDate: date
        }
        
         addBook({data: inputData,}).catch(err => console.log(err))
      };
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='p-6 rounded shadow-2xl w-96 mx-auto grid gap-4'>
                <div>
                    <h3 className='text-md font-medium'>Add Book</h3>
                </div>
            <Input
              id="title"
              placeholder="Title Name"
              {...register('title', { required: 'Title Name is required' })}
            />
            <Input
              id="author"
              placeholder="Author Name"
              {...register('author', { required: 'Author Name is required' })}
            />
            <Input
              id="author"
              placeholder="Genre"
              {...register('genre', { required: 'Genre is required' })}
            />
            <div>
            <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
            </div>

            <Button>Add</Button>
            </div>
            </form>
        </div>
    );
};

export default AddBook;