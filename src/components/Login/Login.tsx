import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { LOGIN_API_ADRESS } from '../../config/config';
import Button from 'react-bootstrap/Button';

import UserStore from '../../stores/userStore';


interface Ilogin {
    Name: string;
    Password: string;
    Jwt: string;
}


const Login: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState<Ilogin>();
    const [isLoggedIn, setIsloggedIn] = useState<boolean>(false);
    const userStore = useContext(UserStore);
    let history = useHistory();

    const loginFetch = () => {
        const data = {
            name: name,
            password: password
        }   

        axios({
            method: 'post',
            url: LOGIN_API_ADRESS,
            data
        })
            .then(response => {
                if (response.data.message) {
                    setError(response.data.message)
                }
                else {
                    setUserInfo(response.data);
                    setIsloggedIn(true);
                    userStore.setJwtToLocalStorage(response.data.token);

                }
            });
    }

    const handleSubmit = () => {
        // e.preventDefault();
        loginFetch();
    }

    useEffect(() => {
        const redirectOnSuccess = () => {
            return setTimeout(() => {
                return history.push('/redirect');
            }, 500);
        }
        if (isLoggedIn === true) redirectOnSuccess();

    });

    return (
        <div className="main-content-container">
            <div className="login-form-container">
                <div className="form-padded-container">
                    <form className="todo-form">
                        <h2>Logga in</h2>
                        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Användarnamn" />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Lösenord" />
                        {
                            error ? (
                                <p>{error}</p>
                            ) : null
                        }
                        <Button onClick={handleSubmit}>Logga in</Button>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login;

