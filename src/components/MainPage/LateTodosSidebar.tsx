import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import useFetch from '../../custom-hooks/useFetch';

// interfaces
// import IOptions from '../../interfaces/IOptions';
import ToDoData from '../../interfaces/TodoData';

import Utils from '../../utils/Utils';
import { TODO_API_LATE_UNFISHED } from '../../config/config';

import UserStore from '../../stores/userStore';

const utils = new Utils()

/**
 * Sidebar with messages and uncompleted todos
 */
 



const LateTodosSidebar: React.FC = () => {
    let userStore = useContext(UserStore);


    const options =  {
        method: 'GET',
        headers: {

        "Authorization": `Bearer  ${userStore.jwt}`
    }};

    const { data, error, isLoading } = useFetch({ url: TODO_API_LATE_UNFISHED, options });

    return (
        <div className="sidebar-messages-container">
            <div className="sidebar">
                <h2 className="sidebar-header">Försenade todo</h2>
                <div>
                    {
                        !isLoading && data.map((item: ToDoData) => {
                            return (
                                <div className="late-item-cont" key={item.todoId}>
                                    <div className="late-colum1">
                                        <h3>{item.name}</h3>
                                        <p className="late-varning">{item.toBeCompleted.slice(0, 10)}</p>
                                        <NavLink to={`todo-item/${item.todoId}`}>Detaljer</NavLink>
                                    </div>
                                    <div className="late-colum2">
                                        <h4>Ansvarig</h4>
                                        <p>{item.personName}</p>
                                    </div>
                                   
                                </div>
                            )
                        })
                    }
                    {
                        isLoading ? <p className="blurred">Laddar lista</p> : null
                    }
                    {
                        !isLoading && data.length === 0 ? <p>Listan är tom</p> : null
                    }

                </div>
            </div>
        </div>
    )
}

export default LateTodosSidebar;
