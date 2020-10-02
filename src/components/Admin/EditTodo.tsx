import React, { useContext, useState, useEffect } from 'react';

import EditDetailModal from './EditDetailModal';

import UserStore from '../../stores/userStore';
import { GET_ALL_TODOS, DELETE_TODO } from '../../config/config';
import { NavLink } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


export interface AllTodoData {
    todoId: number;
    name: string;
    description: string;
    isComplete: boolean;
    personName: string;
    toBeCompleted: string;
    personId: number;
}

const EditTodo = () => {
    const userStore = useContext(UserStore);
    const [data, setData] = useState<AllTodoData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [todoLen, setTodoLen] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const [edited, setEdited] = useState<boolean>(false);

    userStore.checkIfTokenIsValid();
    userStore.createUserObject();

    useEffect(() => {
        const getMyData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(GET_ALL_TODOS, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${userStore.jwt}`
                    }
                })
                const fetchedData = await response.json();

                setData(fetchedData);
                setIsLoading(false);
                setTodoLen(fetchedData.length)
            } catch (error) {
                console.log(error);
            }
        }
        getMyData();
        setEdited(false);
    }, [todoLen, edited])


    const deleteTodo = async (e: any) => {
        let deletedItem = window.confirm("Är du säker på att du vill radera?");
        let itemToBeDeleted = e.target.getAttribute('data-id');

        if (deletedItem) {
            await fetchDeletedItem(itemToBeDeleted);
            setTodoLen((prevState) => prevState - 1);
        }
    }

    const fetchDeletedItem = async (id: string) => {
        try {
            const response = await fetch(`${DELETE_TODO}/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer  ${userStore.jwt}`
                }
            });
            const fData = await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    const handleModal = (e : any) => {
        let eventId = e.target.value;

        setId(eventId);
        setShowModal(true);
    }    

    if (isLoading) return <p>laddar ...</p>

    return (
        <div>

            <h2 className="tabs-header">Redigera todo</h2>
            <Table striped>
            {/* <table className="admin-table"> */}
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Namn</th>
                        <th>Deadline</th>
                        <th>Klar</th>
                        <th>Ansvarig</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        !isLoading ? data.map((item: AllTodoData) => {
                            return (
                                <>
                                <tr key={item.todoId}>
                                    <td>{item.todoId}</td>
                                    <td>{item.name}</td>
                                    <td>{item.toBeCompleted.slice(0, 10)}</td>
                                    <td>{item.isComplete ? "klar" : "Ej klar"}</td>
                                    <td>{item.personName}</td>
                                    <td><button value={item.todoId} onClick={handleModal} className="edit-button">Redigera</button></td>
                                    <td><button className="delete-button" data-id={item.todoId} onClick={deleteTodo}>Radera</button></td>
                                </tr>
                               
                                </>
                            )
                        }
                        )

                            : null
                    }
                </tbody>
                </Table>
            {/* </table> */}

            {
                showModal ? <EditDetailModal id={id} setEdited={setEdited} show={showModal} setShow={setShowModal} /> : null
            }

        </div>
    )
}

export default EditTodo;
