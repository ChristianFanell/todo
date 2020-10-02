import React, { useState, useContext, useEffect } from 'react';
import UserStore from '../../stores/userStore';
import useFetch from '../../custom-hooks/useFetch';

// tab components
import StartPage from './StartPage';
import MyTodos from './MyTodos';
import Users from '../Admin/Users';
import EditTodo from '../Admin/EditTodo';
import Statistics from '../Admin/Statistics';

const MyPage: React.FC = () => {
    const [child, setChild] = useState<JSX.Element>(<StartPage />);
    const [menuItems, setMenuItems] = useState(
        [
            { id: 'home', name: "Översikt", active: true },
            { id: 'my-page', name: "Mina todos", active: false },
            { id: 'users', name: "Användare", active: false },
            { id: 'edit', name: 'Redigera todo', active: false },
            { id: 'stats', name: 'Statistik', active: false }
        ]
    );

    const userStore = useContext(UserStore);


    const handleTabClick = (e: any) => {
        console.log(e.target.getAttribute('data-id'));
        const comp = e.target.getAttribute('data-id');

        setMenuItems(
            menuItems.map(item => ({
                ...item,
                active: comp === item.id
            }))
        );

        switch (comp) {
            case 'home':
                setChild(<StartPage/>)
                break;
            case 'my-page':
                setChild(<MyTodos />)
                break;
            case 'users':
                setChild(<Users />)
                break;
            case 'edit':
                setChild(<EditTodo />)
                break;
            case 'stats':
                setChild(<Statistics />)
                break;

            default:
                break;
        }
    }

    userStore.checkIfUserIsAdmin();

    return (
        <div className="main-content-container">
            <div className="admin-container">

                <div className="card admin-card">
                    <nav className="tabs">

                        {
                            menuItems.map((item, index) => {
                                if (item.id === 'home' || item.id === 'my-page') {
                                    return (
                                        <li
                                            className={item.active ? 'active' : ''}
                                            data-id={item.id} 
                                            onClick={handleTabClick}
                                            key={item.id} >
                                            {item.name}
                                        </li>
                                    )
                                }
                                if (userStore.isAdmin) {
                                    return index > 1 ? (
                                        <li
                                            className={item.active ? 'active' : undefined}
                                            data-id={item.id} 
                                            onClick={handleTabClick}
                                            key={item.id} >
                                            {item.name}
                                        </li>
                                    ) : null
                                }
                            })

                        }
                    </nav>
                    <div>

                        {
                            child
                        }

                    </div>
                </div>
            </div>
        </div>
    )

}

export default MyPage;
