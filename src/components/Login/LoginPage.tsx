import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';


function LoginPage() {
    const history = useHistory();

    useEffect(() => {
        
        const loading = () => {
            return setTimeout(() => {
                return history.push('/todo')
            }, 400);
        }
        loading();
    }, [])

    return (        
        <div>laddar ...</div>
    )
}
export default LoginPage;
