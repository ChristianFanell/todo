import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap';
import DatePicker from '../DatePicker/DatePicker';
import UserStore from '../../stores/userStore';
import { ADMIN_USER } from '../../config/config';

const emailPattern : RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

type propzz = {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    userRepoChanged: boolean;
    setUserRepoChanged: React.Dispatch<React.SetStateAction<boolean>>
}

enum Roles {
    Admin = 'Admin',
    User = 'User'
}

const AddUser = ({ setShow, show, userRepoChanged, setUserRepoChanged }: propzz) => {
    // state
    const [birthday, setBirthday] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>(Roles.User);

    // errors
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const firstRender = useRef(true);
    const userStore = useContext(UserStore);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        const errors = [nameError, emailError, passwordError]
        const newUser = [name, password, role, email, birthday]
        const hasNoErrors = errors.every((item: null | string) => item === null);
        const userIsOk = newUser.every((item: string | null) => item !== '');

        console.log(newUser);
        if (hasNoErrors && userIsOk) setIsDisabled(false)
    }, [name, email, password, birthday, role]);


    const isEmailValid = (mail: string | null): boolean => {
        return emailPattern.test(String(mail).toLowerCase());
    }

    const handleClose = (): void => {
        setShow(false);
    }

    const nameValidation = (name: string): boolean => {
        let isValid = false

        if (name.length > 1) {
            setNameError(null)
            isValid = true
        }
        else {
            setNameError('Namn måste ha minst 2 tecken');
        }
        return isValid;
    }

    const emailValidation = (mail: string) => {
        let isValid = false;

        if (isEmailValid(mail)) {
            setEmailError(null);
            isValid = true;
        }
        else {
            setEmailError('Ange giltig epostadress.');
        }
        return isValid;
    }

    const passwordValidation = (psw: string) => {
        let isValid = false;
        let msg = 'Lösenord måste ha minst 6 tecken';

        if (psw.length >= 6) {
            setPasswordError(null)
            isValid = true;
        }
        else {
            setPasswordError(msg)
        }
        return isValid;
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        switch (name) {
            case 'name':
                setName(value);
                nameValidation(value);
                break;
            case 'email':
                setEmail(value);
                emailValidation(value);
                break;
            case 'password':
                setPassword(value);
                passwordValidation(value);
                break;
            default:
                break;
        }
    }

    const postUserData = () => {
        axios({
            method: 'post',
            url: ADMIN_USER,
            data: {
                name,
                password,
                birthday,
                role,
                email
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
                        setUserRepoChanged(!userRepoChanged);
                        setShow(false);
                    }, 800);
                }
            });
    }


    const handleSubmit = (): void => {
        postUserData();
    }
    console.log('roll = ', role);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Lägg till användare</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicUserName">
                            <Form.Control onChange={handleChange} name="name" autoComplete="none" type="text" placeholder="Ange användarnamn" />
                            {
                                nameError ? <p className="error">{nameError}</p> : null
                            }
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control onChange={handleChange} name="email" autoComplete="none" type="email" placeholder="Ange epost" />
                            {
                                emailError ? <p className="error">{emailError}</p> : null
                            }
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control onChange={handleChange} name="password" autoComplete="new-password" type="password" placeholder="Lösenord" />
                            {
                                passwordError ? <p className="error">{passwordError}</p> : null
                            }
                        </Form.Group>

                        <Form.Group controlId="formBasicDate">
                            <DatePicker cssClass="form-control" setToBeCompleted={setBirthday} passedDate={'1980-01-01'} />
                        </Form.Group>
                        <FormGroup>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                                name='role'
                                onChange={(e: any) => setRole(e.target.value)}
                            >
                                <option value={Roles.User}>{Roles.User}</option>
                                <option value={Roles.Admin}>{Roles.Admin}</option>

                            </Form.Control>


                        </FormGroup>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Stäng
                    </Button>
                    <Button disabled={isDisabled} onClick={handleSubmit} variant="primary">Spara användare</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddUser;
