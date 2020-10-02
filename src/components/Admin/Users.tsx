import React, { useContext, useState, useEffect } from 'react';

import AddUser from './AddUser';
import UserStore from '../../stores/userStore';
import DeleteUser from './DeleteUser';

import { GET_ALL_USERS } from '../../config/config';
import { Button, Table } from 'react-bootstrap';

export interface IState extends Array<User> {}

export interface User {
    birthDay: string;
    email: string;
    name: string;
    personId: number;
}

const Users = () => {
    const userStore = useContext(UserStore);
    const [data, setData] = useState<IState>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [show, setShow] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [userRepoChanged, setUserRepoChanged] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<number>(0);

    userStore.checkIfTokenIsValid();
    userStore.createUserObject();

    const handleShow = (): void => {
        setShow(true);
    }

    const handleDelete = (id: number): void => {
        setUserToDelete(id);
        setShowDelete(true);
    }

    useEffect(() => {
        const getMyData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(GET_ALL_USERS, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer  ${userStore.jwt}`
                    }
                })
                const data = await response.json();

                setData(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }

        }

        getMyData();
    }, [userRepoChanged])


    return (
        <div>
            <h2 className="tabs-header">Användare</h2>
            <div className={'users-top-div'}>
                <p>{!isLoading ? `Antal användare: ${data.length}` : null}</p>
                <Button variant="primary" onClick={handleShow}>
                    Lägg till användare
                </Button>
            </div>
            
                <Table responsive striped bordered>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Användarnamn</th>
                        <th>Epost</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                       data.map((user: User) => {
                            return (
                            <tr key={user.personId}>
                                <td>{user.personId}</td>
                                <td>{user.name} </td>
                                <td>{user.email}</td>
                                <td className='action update'>Uppdatera</td>
                                <td className='action delete' onClick={(e) => handleDelete(user.personId)}>Radera</td>
                               
                            </tr>
                            )
                            // return <li key={user.personId}>{user.personId} {user.name}<span onClick={(e) => handleDelete(user.personId)} className="delete-user">Radera</span></li>
                        }) 
                    }
                </tbody>
            </Table> 


            {
                show ? <AddUser userRepoChanged={userRepoChanged} setUserRepoChanged={setUserRepoChanged} show={show} setShow={setShow} /> : null
            }
            {
                showDelete ? <DeleteUser
                    id={userToDelete}
                    showDelete={showDelete}
                    setShowDelete={setShowDelete}
                    userRepoChanged={userRepoChanged}
                    setUserRepoChanged={setUserRepoChanged}
                /> : null
            }

        </div>
    )
}


export default Users;
