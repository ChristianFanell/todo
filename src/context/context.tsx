import React, {createContext} from 'react';
import TodoData from '../interfaces/TodoData';



export const headerContext = createContext(false);

export const showMenu = createContext(headerContext);

