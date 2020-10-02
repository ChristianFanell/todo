import React, { useState, useContext, useEffect } from 'react';
import UserStore from '../../stores/userStore';


const StartPage: React.FC = () => {
    const userStore = useContext(UserStore);
   
    userStore.checkIfTokenIsValid();
    userStore.createUserObject();

    return (
        <>
            <h2>Startsida</h2>
            <p>Hej {userStore.user.unique_name}! Du är inloggad som {userStore.isAdmin ? "admin" : "användare"}.</p>
        </>
    )
}

export default StartPage;
