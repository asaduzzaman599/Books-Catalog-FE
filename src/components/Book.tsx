import { IBook } from '@/types/globalTypes'
import React, { PropsWithChildren, ReactNode } from 'react';
interface Props {
        book: IBook
        children: ReactNode
      }
const Book = (props: Props) => {
    const { book } = props
    return (
        <div className=' rounded shadow-lg grid gap-6'>
            <div>
                <div className='w-full text-center py-8 bg-indigo-400 p-2'>
                    <h3 className='text-lg font-bold text-white'> {book.title}</h3>
                    <h3 className='text-sm font-medium text-end  text-white'>- {book.author}</h3>
                </div>
                <div className='px-4 my-2 font-medium text-center'>
                     <h3 className='text-sm font-bold mb-2'>GENRE</h3>
                     <h3 className='text-sm font-bold mb-2'>{book.genre}</h3>
                     <h3 className='text-sm font-bold'>PUBLISHED At</h3>
                     <h3 className='text-sm font-bold'>{new Date(book.publicationDate).toLocaleDateString()}</h3>
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