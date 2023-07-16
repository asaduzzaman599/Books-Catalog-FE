
import { useGetBooksQuery } from '@/redux/apiSlice.ts/apiSlice'
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