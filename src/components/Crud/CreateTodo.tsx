import React, { useEffect, useState, useContext, useRef } from 'react';

import Message from '../MainPage/Message';
import DatePicker from '../DatePicker/DatePicker';

// interface
import Person from '../../interfaces/Person';
//custom hook
import useFetch from '../../custom-hooks/useFetch';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserStore from '../../stores/userStore'
import {CREATE_TODO_API_ADRESS} from '../../config/config';
import axios from 'axios';


type todoId = number;

const CreateTodo = (props: todoId) => {
    const [description, setDescription] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [personId, setPersonId] = useState<number>(1);
    const [toBeCompleted, setToBeCompleted] = useState<string>('');
    const [selectArrow, setSelectArrow] = useState(false);
    const firstRender = useRef(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const history = useHistory();
    // validering
    const [nameError, setNameError] = useState<string | null>('');
    const [descriptionError, setDescriptionError] = useState<string | null>('');
    const [personIdError, setPersonIdError] = useState<string | null>('');
    const [disabledButton, setDisabledButton] = useState<boolean>(true);

    const userStore = useContext(UserStore);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        setDisabledButton(formValidation() ? false : true);

    }, [name, description, personId, toBeCompleted])


    // hook
    const { data, error, isLoading } = useFetch({ url: 'https://localhost:44335/api/person' });

    const checkName = () => {
        if (name.length > 1) {
            setNameError(null);
        }
        else {
            setNameError('Namn måste innehåll minst två tecken');
        }
    }



    const checkDescription = () => {
        if (description.length > 1) {
            setDescriptionError(null);
          }
        else {
            setDescriptionError('Beskrivning får inte vara tom');;
        }
    }

    const formValidation = () => {
        let valid = false;
        if (name.length > 1 && description.length > 0 &&
            !nameError && !descriptionError && !personIdError
            ) {
            valid = true;
        }
        return valid;
    }

    const handleOnChange = (e : any) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                checkName();
                break;
            case 'description':
                setDescription(e.target.value);
                checkDescription();
                break;
            case 'select':
                setPersonId(parseInt(e.target.value));
                break;
            default:
                break;
        }
    }


    const submitTodo = async () => {     
        axios({
            method: 'post',
            url: CREATE_TODO_API_ADRESS,
            data: {
                name,
                description,
                toBeCompleted,
                IsComplete: false,
                personId
            },
            headers: {
                Authorization: "Bearer " + userStore.jwt
             }
        })
            .then(response => {
                if (response.data.message) {
                    setFetchError(response.data.message)
                }
                else {
                    setTimeout(() => {
                        return history.push('/todo');
                    }, 800);

                }
            });
    }


    return (
        <div className="main-content-container">
            <div className="todo-list-container">

                <div className="form-padded-container">
                    <form className="todo-form">
                        <h2>Skapa ny todo</h2>
                        <input type="text" name="name" onChange={handleOnChange} placeholder="Namn på todo" />
                        <textarea onChange={(e) => setDescription(e.target.value)} placeholder="beskrivning"></textarea>

                        <select name="select" onChange={handleOnChange}>
                            {
                                !isLoading ? data.map((person: Person, i: number) => {
                                    return <option value={person.id} key={i}>{person.name}</option>
                                }) : <option>{error.message}</option>
                            }

                        </select>
                        <DatePicker cssClass={'custom-picker'} passedDate={null} setToBeCompleted={setToBeCompleted} />
                        <Button disabled={disabledButton} onClick={submitTodo}>Lägg till todo</Button>
                    </form>
                </div>
            </div>
            <Message />
        </div>
    )
}

export default CreateTodo;