import React, { useState, useEffect } from 'react';

import FetchParameters from '../interfaces/Fetch';
import ToDoData from '../interfaces/TodoData';
/**
 * Custom hook for fetching data
 * @param param0 {FetchParameters} 
 */
export default function useFetch({ url, options }: FetchParameters) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(Error);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let result = await fetch(url, options);
                let json = await result.json();

                setData(json);
                setIsLoading(false);
                
            } catch (err) {
                setError(error)
            }
        }
        fetchData();

    }, []);

    return { data, error, isLoading }
}
