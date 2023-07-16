
import { useGetBooksQuery } from '@/redux/features/books/booksApi'
import React from 'react';

const Books = () => {
    const { data, error, isLoading } = useGetBooksQuery({})

    console.log(data)
    return (
        <h1>
            Books
        </h1>
    );
};

export default Books;