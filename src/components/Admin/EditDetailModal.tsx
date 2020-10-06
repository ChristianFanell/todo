import React, { useState, useEffect, useContext } from 'react';

// import { AllTodopropData } from './EditTodo';
import DatePicker from '../DatePicker/DatePicker';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

//custom hook
import useFetch from '../../custom-hooks/useFetch';

// interface
import Person from '../../interfaces/Person';

import { GET_ADMIN_TODO, PERSON_API_ADDRESS, UPDATE_TODO } from '../../config/config';
import UserStore from '../../stores/userStore';

interface IPerson {
    birthDay: string;
    email: string;
    name: string;
    personId: number;
}

type propzz = {
    id: number,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

enum Complete {
    Ready = "Klar",
    NotReady = "Ej klar"
    
}

const EditDetailModal = ({ id, setShow, show, setEdited }: propzz) => {
    const userStore = useContext(UserStore);
    const [description, setDescription] = useState<string>('');
    const [toBeCompleted, setToBeCompleted] = useState<string>('');
    const [person, setPerson] = useState<IPerson | null>(null);
    const [isComplete, setIsComplete] = useState<boolean | null>(null);
    const [personId, setPersonId] = useState<number>(0);
    const [todoId, setTodoId] = useState<number | null>(null);
    const [todoData, setTodoData] = useState();
    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [disabled, setDisabled] = useState<boolean>(true);

    const [changed, setChanged] = useState(false);
    const { data, error, isLoading } = useFetch({ url: PERSON_API_ADDRESS });
    console.log(data);
    userStore.checkIfTokenIsValid();
    userStore.createUserObject();

    useEffect(() => {
        if (name.length === 0 || description.length === 0) {
            setDisabled(true);
        }
        else if (changed) setDisabled(false);
    }, [name, description, changed])

    useEffect(() => {
        const fetchAdminTodo = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${GET_ADMIN_TODO}/${id}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer  ${userStore.jwt}`
                    }
                });
                const fData = await response.json();

                setTodoData(fData);
                setPerson(fData.person);
                setDescription(fData.description);
                setToBeCompleted(fData.toBeCompleted);
                setIsComplete(fData.isComplete);
                setPersonId(fData.personId);
                setName(fData.name);
                setLoading(false);
                setTodoId(fData.todoId);
            } catch (error) {
                console.log(error);
            }
        }

        if (show) {
            fetchAdminTodo();
        }
    }, [])

    const handleClose = () => setShow(false);

    const handleSubmit = async () => {
        const payload = {
            description: description,
            isComplete: isComplete,
            name: name,
            personId: personId,
            toBeCompleted: toBeCompleted,
            todoId: todoId
        };
        const putData = await fetch(UPDATE_TODO + '/' + id, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                "Authorization": "Bearer " + userStore.jwt,
                "Content-Type": "application/json"
            }
        });
        const response = await putData.json();

        if (response) {            
            setDisabled(true);
            setTimeout(() => {
                setEdited(true);
                handleClose();
            }, 300);
        }

    }

    const handleOnChange = (e: any) => {
        setChanged(true);
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            case 'select':
                setPersonId(parseInt(e.target.value));
                break;
            case 'select-iscomplete':
                let ready = (e.target.value === Complete.Ready);
                
                setIsComplete(ready);                
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Modal backdrop="static" keyboard={false} show={show} onHide={handleClose}>
                {
                    !loading ? (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>Redigera todo {id}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form className="todo-form">

                                    <input placeholder="Namn" type="text" name="name" onChange={handleOnChange} value={name} />
                                    {
                                        name.length === 0 ? <span className="form-error">Namn får inte vara tomt</span> : null
                                    }
                                    <textarea name="description" placeholder="Beskrivning" onChange={handleOnChange} value={description} />
                                    {
                                        description.length === 0 ? <span className="form-error">Beskrivning får inte vara tom</span> : null
                                    }
                                    <select name="select" onChange={handleOnChange}>
                                        <option value={person?.personId}>{person?.name}</option> 
                                        {
                                            !isLoading ? data.map((pers: Person) => {
                                                if (person?.personId !== pers.personId) {
                                                    return <option value={pers.personId} key={pers.personId}>{pers.name}</option>
                                                }

                                            }) : <option>{error.message}</option>
                                        }

                                    </select>

                                    <select 
                                        name="select-iscomplete" 
                                        onChange={handleOnChange} 
                                        value={isComplete ? Complete.Ready : Complete.NotReady}
                                        >
                                        <option value={Complete.Ready}>
                                           {Complete.Ready}
                                        </option>
                                        <option value={Complete.NotReady}>
                                           {Complete.NotReady}
                                        </option>
                                        
                                    </select>

                                    <DatePicker cssClass={''} passedDate={toBeCompleted} setToBeCompleted={setToBeCompleted} />
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Stäng
                                </Button>
                                <Button disabled={disabled} variant="primary" onClick={handleSubmit}>
                                    Spara ändringar
                                </Button>
                            </Modal.Footer>
                        </>
                    ) : <p>laddar</p>
                }
            </Modal>
        </>
    )
}

export default EditDetailModal;
