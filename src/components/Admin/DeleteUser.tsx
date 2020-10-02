import React, { useContext, useState, useEffect } from 'react';

import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { ADMIN_USER_DELETE } from '../../config/config';
import UserStore from '../../stores/userStore';

type propzz = {
    showDelete: boolean,
    setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
    userRepoChanged: boolean;
    setUserRepoChanged: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
}

const DeleteUser = ({ showDelete, setShowDelete, userRepoChanged, setUserRepoChanged, id }: propzz) => {
    const handleClose = () => setShowDelete(false);
    const userStore = useContext(UserStore);
    const [fetchError, setFetchError] = useState<string | null>(null);
  
    const postUserData = () => {
            axios({
                method: 'delete',
                url: `${ADMIN_USER_DELETE}/${id}`,
                data: id,
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
                            setShowDelete(false);
                        }, 800);    
                    }
                });
        }

    const handleDelete = () => {
        postUserData();
    }

    return (
        <Modal show={showDelete} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Radera användare</Modal.Title>
            </Modal.Header>
            <Modal.Body>Är du säker på att du vill radera användare?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Radera användare
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteUser;
