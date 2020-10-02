import React, { useContext, useState, useEffect } from 'react';

import UserStore from '../../stores/userStore';
import { GET_MY_TODOS } from '../../config/config';
import { NavLink } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

interface TodoTableData {
    name: string;
    description: string;
    toBeCompleted: string;
    isComplete: boolean;
    todoId: number;
}

const MyTodos = () => {
    const userStore = useContext(UserStore);
    const [data, setData] = useState<TodoTableData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    userStore.checkIfTokenIsValid();
    userStore.createUserObject();

    useEffect(() => {
        const getMyData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(GET_MY_TODOS, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer  ${userStore.jwt}`
                    }
                })
                const fData = await response.json();

                setData(fData);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        getMyData();
    }, [])


    return (
        <div>
            <h2 className="tabs-header">Mina todos</h2>
            <Table striped >
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Beskrivning</th>
                        <th>Deadline</th>
                        <th>Klar</th>
                        <th>Åtgärd</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !isLoading ? data.map((item : TodoTableData) => {
                            return (
                            <tr key={item.todoId}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.toBeCompleted.slice(0, 10)}</td>
                                <td>{item.isComplete ? 'Klar' : 'Ej klar'}</td>
                                <td>
                                    <NavLink to={`/todo-item/${item.todoId}`}>
                                        Läs mer
                                    </NavLink>
                                </td>
                            </tr>
                            )
                        }) : null
                    }
                </tbody>
            </Table>
        </div>
    )
}


export default MyTodos
