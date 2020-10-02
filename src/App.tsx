import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { useHistory, BrowserRouter, Route, Switch } from 'react-router-dom';

//components
import Header from './components/Header/Header';
import TodoWall from './components/MainPage/TodoWall';
import CreateTodo from './components/Crud/CreateTodo';
import TodoDetails from './components/Crud/TodoDetails';
import Login from './components/Login/Login';
import LoginPage from './components/Login/LoginPage';
import AuthRoute from './components/AuthRoute/AuthRoute';
import MyPage from './components/Crud/MyPage';

// mobx
// import UserStore from '../src/stores/userStore'
import { observer } from 'mobx-react-lite';

const App: React.FC = () => {
  return (
    <div className="App">

      <BrowserRouter>

        <Switch>
          <Header />
        </Switch>
        <Switch>
          <AuthRoute path='/todo' component={TodoWall}/>
        </Switch>

        <Switch>
          <Route exact path='/login' component={Login} />
        </Switch>

        <Switch>
          <Route
            exact path='/redirect'
            component={LoginPage}
          />
        </Switch>

        <Switch>
          <AuthRoute path="/new-todo" component={CreateTodo} />
        </Switch>

        <Switch>
          <AuthRoute path="/todo-item/:id" component={TodoDetails} />
        </Switch>

        <Switch>
          <AuthRoute path="/mypage" component={MyPage} />
        </Switch>

      </BrowserRouter >
    </div>
  );
}

export default observer(App);
