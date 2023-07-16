import { IBook } from '@/types/globalTypes'
import React, { PropsWithChildren, ReactNode } from 'react';
interface Props {
        book: IBook
        children: ReactNode
      }
const Book = (props: Props) => {
    const { book } = props
    return (
        <div className='p-10 rounded shadow-lg grid gap-6'>
            <div>
            <h3 className='text-lg font-bold'> {book.title}</h3>
            <h3 className='text-sm font-medium'>Genre: {book.genre}</h3>
            <h3 className='text-sm font-medium'>Author: {book.author}</h3>
            </div>
            <div>
                {
                    props.children
                }
            </div>
        </div>
    );
};

export default Book;