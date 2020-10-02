import React, { useState, useEffect, useContext } from 'react';

// import { useHistory } from 'react-router-dom';
import UserStore from '../../stores/userStore';
import useFetch from '../../custom-hooks/useFetch';
import { TODO_API_CURRENT } from '../../config/config';
import Message from '../MainPage/Message';
import TodoItem from './TodoItem';
import TodoData from '../../interfaces/TodoData';


const TodoWall: React.FC = () => {
    const [todoData, setTodoData] = useState();
    const userStore = useContext(UserStore);
    const options = {
        method: 'GET',
        headers: {

            "Authorization": `Bearer  ${userStore.jwt}`
        }
    };

    const { data, error, isLoading } = useFetch({ url: TODO_API_CURRENT, options });

    useEffect(() => {
        userStore.checkIfTokenIsValid();
    }, [userStore.validToken])

    if (!isLoading && data.length === 0) {
        return (
            <div className="main-content-container">
                <div className="todo-list-container">

                    <div className="empty-list">
                        <h3>Listan är tom</h3>
                    </div>
                </div>
                <Message />


            </div>
        )
    }

    return (
        <div className="main-content-container">
            <div className="todo-list-container">
                {
                    !isLoading ? data.map((item: TodoData) => {
                        return (
                            <TodoItem
                                key={item.todoId}
                                name={item.name}
                                personName={item.personName}
                                toBeCompleted={item.toBeCompleted}
                                todoId={item.todoId}
                            />
                        )
                    }) : <p className="loading">laddar ...</p>
                }
            </div>
            <Message />


        </div>
    )


}

export default TodoWall;
