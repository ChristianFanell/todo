import React, { useContext, useState, useEffect } from 'react';

import UserStore from '../../stores/userStore';
import useFetch from '../../custom-hooks/useFetch';
import TodoData from '../../interfaces/TodoData';
import { GET_ALL_STATS, GET_STATS_BY_PERSON } from '../../config/config';
import { NavLink } from 'react-router-dom';

import { Pie } from 'react-chartjs-2';

// https://localhost:44335/api/admin/GetStatsByPerson/3
// https://localhost:44335/api/admin/GetAllStats

type person = {
    name: string;
    personId: number;
}

interface Options {
    completedTodos: number;
    personName: string | null;
    totalTodos: number;
    uncompletedTodos: number;
}

const Statistics: React.FC = () => {
    const userStore = useContext(UserStore);
    const [statData, setStatData] = useState<number[]>([]);
    const [statsIsLoading, setStatsIsLoading] = useState(true);
    const { data, error, isLoading } = useFetch({ url: 'https://localhost:44335/api/person' });

    userStore.checkIfTokenIsValid();
    userStore.createUserObject();

    const setUpData = (obj: Options) => {
        return [obj.uncompletedTodos, obj.completedTodos];
    }

    const handleOnChange = (e: any) => {
        const { value } = e.target; 
        console.log(e.target.value);
        if (parseInt(e.target.value) === 0) getMyData();
        else getStatsByPerson(e.target.value);
    }

    const getStatsByPerson = async (id: number) => {
        try {
            const response = await fetch(`${GET_STATS_BY_PERSON}/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`
                }
            });
            const fetchedData = await response.json();
            const dataArray = setUpData(fetchedData);

            setStatData(dataArray);
            setStatsIsLoading(false);
        } catch (error) {
            console.log(error);

        }
    }
    const getMyData = async () => {
        try {
            const response = await fetch(GET_ALL_STATS, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`
                }
            });
            const fetchedData = await response.json();
            const dataArray = setUpData(fetchedData);

            setStatData(dataArray);
            setStatsIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setStatsIsLoading(true);
        getMyData();
    }, [])

    const dataSets = [
        {
            data: statData,
            backgroundColor: ['rgb(238, 57, 25)', 'rgb(14, 238, 14)']
        }
    ];
    const labels = ['Ej avklarade todo', 'Avklarade todo']

    return (
        <div>
            <h2 className="tabs-header">Statistik/diagram</h2>
            <p>Avklarade/ej avklarade todos</p>
            <select className="select-stats" onChange={handleOnChange}>
                <option value={0}>Visa samtliga todos</option>
                {
                    !isLoading ? (
                        data.map((td: person) => {
                            return <option key={td.personId} value={td.personId}>{td.name}</option>
                        })
                    ) : null
                }
            </select>
            {
                !statsIsLoading ? (
                    <Pie data={{
                        datasets: dataSets,
                        labels: labels
                    }} />
                ) : <p>laddar</p>
            }

        </div>
    )
}


export default Statistics;
