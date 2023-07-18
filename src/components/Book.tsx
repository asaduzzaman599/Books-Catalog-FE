import { IBook } from '@/types/globalTypes'
import { ReactNode } from 'react';
interface Props {
        book: IBook
        children: ReactNode
      }
const Book = (props: Props) => {
    const { book } = props
    return (
        <div className='shadow-lg grid gap-6  rounded-xl overflow-hidden'>
            <div className='flex flex-col justify-between '>
                <div className='w-full text-center py-8 bg-blue-500 p-2 '>
                    <h3 className='text-lg font-bold text-white'> {book.title}</h3>
                    <h3 className='text-sm font-medium text-end  text-white mr-2'>- {book.author}</h3>
                </div>
                <div className='px-4 my-2 font-medium text-center pb-6 flex flex-col justify-between'>
                     <h3 className='text-sm font-bold mb-2'>GENRE</h3>
                     <h3 className='text-lg  font-light mb-2 text-gray-700'>{book.genre}</h3>
                     <h3 className='text-sm font-bold mb-2'>PUBLISHED At</h3>
                     <h3 className='text-lg  font-light mb-2 text-gray-700'>{new Date(book.publicationDate).toLocaleDateString()}</h3>
                    <div>
                        {       
                            props.children
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;