import React/*, { useState, useEffect}*/ from 'react';

import { NavLink } from 'react-router-dom';
import TodoData from '../../interfaces/TodoData';

import { AiOutlineSelect, AiFillClockCircle } from 'react-icons/ai'
import {FiSmile} from 'react-icons/fi';

export default function TodoItem  (
    {
        name,
        personName,
        toBeCompleted,
        todoId
    }: TodoData
    ) : JSX.Element {


    return (
        <div className="todo-item">
            <div className="todo-grid-1strow">
                <h2>{name}</h2>
                <hr />
                {/* <p>Deadline: {toBeCompleted.slice(0, 10)}</p> */}
                {/* <p className="faded">{`${description.slice(0, 20)}...`}</p> */}
            </div>
            <div className="todo-icons">
                <div><AiFillClockCircle size={20} /> {toBeCompleted.slice(0, 10)}</div>
                <div><FiSmile className={toBeCompleted ? "done" : "not-done"} size={20} />{personName}</div>
            </div>
          
            <div>
                
            </div>
            <div className="todo-grid-2ndrow">
                {/* <p><span className={isComplete ? "ready" : "not-ready"}>{isComplete ? "Klar" : "Ej klar"}</span></p> */}
                    <NavLink to={`/todo-item/${todoId}`}>
                    <AiOutlineSelect size={25} />
                </NavLink>
            </div>
        </div>
    )
}

