import React, { useContext, Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// store
import UserStore from '../../stores/userStore';

import { AiOutlineOrderedList, AiOutlineEdit } from 'react-icons/ai';


function Navigate() {
    const userStore = useContext(UserStore);

    userStore.checkIfTokenIsValid();

    return (
        <div className="nav-menu">
            <nav className="nav">

                {
                    userStore.validToken ? (
                        <Fragment>
                            <NavLink to="/todo" exact>
                                <AiOutlineOrderedList className="nav-icons" size={40} />Todos
                            </NavLink>

                            <NavLink to="/new-todo">
                                <AiOutlineEdit className="nav-icons" size={40} />Ny todo
                            </NavLink>
                        </Fragment>

                   ) : null
                }

            </nav>
        </div>
    )
}

export default Navigate;
