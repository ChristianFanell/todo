import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import UserStore from '../../stores/userStore';

const RouteAuthenticated = ({ component: Component, path }: RouteProps) => {
    const userStore = useContext(UserStore);

    if (!userStore.validToken) {
        return <Redirect to="/login" />;
    }
    return <Route component={Component} exact path={path} />;
};

export default RouteAuthenticated;
