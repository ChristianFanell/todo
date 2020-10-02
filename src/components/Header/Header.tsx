import React, {useState, useEffect, useContext} from 'react';

// components
import Logo from './Logo';
import Navigate from '../Nav/Navigate';
import Admin from './Admin';
import UserStore from '../../stores/userStore';
import { observer } from 'mobx-react-lite';

function Header() {
    // const [isLoggedIn, setIsloggedIn] = useState(false);
    const userStore = useContext(UserStore);

    
    return (
        <header className="header">
            <div className="vertical-centre">
                <div className="header-grid">
                    <div className="header-logo">
                        <Logo />
                    </div>
                    <div className="header-nav">
                       <Navigate />                    
                       
                    </div>
                    <div className="header-admin">
                        <Admin />
                    </div>
                </div>
            </div>
        </header>
    )
}


export default observer(Header);