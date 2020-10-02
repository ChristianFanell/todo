import React, { useState, useContext, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { AiOutlineUser, AiOutlineBell } from 'react-icons/ai'
import { IoIosLogOut } from 'react-icons/io';

// store
import UserStore from '../../stores/userStore';
import { observer } from 'mobx-react-lite';

function Admin() {
    const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
    const [showMessageInfo, setShowMessageInfo] = useState<boolean>(false);

    const userStore = useContext(UserStore);
    const iconSize = 30;
    const history = useHistory();

    const showMessage = (): void => {
        setShowMessageBox(!showMessageBox);
        setShowMessageInfo(false);
    }

    const logout = () : NodeJS.Timeout => {
        userStore.logOut();
        return setTimeout(() => {
            history.push('/login');
        }, 500);
    }

    const delayMessageInfo  = () : NodeJS.Timeout => {
        return setTimeout(() => {
            setShowMessageInfo(true);
        }, 400);
    }

    userStore.checkIfTokenIsValid();

    if (!userStore.validToken) {
        return <div className="admin"></div>
    }

    return (
        <div className="admin">
            <NavLink className="admin-active admin-icon" to="/mypage">
                <AiOutlineUser className="user-icon" size={iconSize} />
            </NavLink>
            <IoIosLogOut className="logout-icon admin-icon" onClick={logout} size={iconSize} />

        </div>
    )
}

export default Admin;
