import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useGetBooksFilterOptionsQuery } from '@/redux/features/books/booksApi'
import { filterByGenre, filterByPublicationYear, filterBySearch } from '@/redux/features/books/booksFilter'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { Input } from './ui/input'

const Filters = () => {
    const dispatch = useAppDispatch()
    const {search} = useAppSelector(state =>state.filters)
    const { data} = useGetBooksFilterOptionsQuery()

    const filterOptionsGenres = data?.result?.genres?.length ? ['All', ...data.result.genres]: []
    const filterOptionsYears = data?.result?.years?.length ? ['All', ...data.result.years]: []
    console.log(data?.result?.years)
    return (
        <div className='w-full p-4 flex justify-between'>
            <div className='w-2/6'>
                <Input placeholder='Search by Title, Author, Genre' onChange={(e)=>dispatch(filterBySearch(e.target.value))} value={search} />
            </div>
            <div className='w-2/6 flex'>
                <div className='flex-1'>
                <Select
          onValueChange={(value) => dispatch(filterByGenre(value))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent position="popper">
            {
                filterOptionsGenres?.map(i=><SelectItem value={i} key={i}>{i}</SelectItem>)
            }
            
          </SelectContent>
        </Select>
                </div>
                <div  className='flex-1'>
                <Select
          onValueChange={(value) => dispatch(filterByPublicationYear(value))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent position="popper">
          {
                filterOptionsYears?.map(i=><SelectItem value={i} key={i}>{i}</SelectItem>)
            }
          </SelectContent>
        </Select>
                </div>
            </div>
        </div>
    );
};

export default Filters;