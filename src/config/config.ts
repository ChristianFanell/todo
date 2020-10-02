export const BASE_API_ADDRESS : string = 'https://localhost:44335/api/';
export const SEARCH_API_ADRESS : string = 'https://localhost:44335/api/todo/search?searchstring=';
export const PERSON_API_ADDRESS : string = 'https://localhost:44335/api/person';
export const TODO_API_ADDRESS : string = 'https://localhost:44335/api/todo';
export const TODO_API_CURRENT : string = 'https://localhost:44335/api/todo/GetCurrentTodos'
export const TODO_API_LATE_UNFISHED : string = 'https://localhost:44335/api/todo/GetLateTodos';
export const LOGIN_API_ADRESS : string = 'https://localhost:44335/api/person/login';
export const CREATE_TODO_API_ADRESS : string = 'https://localhost:44335/api/todo/CreateTodoItem';
export const COMPLETE_TODO = 'https://localhost:44335/api/todo';

// admin/mina sidor
const ADMIN_ROUTE = 'https://localhost:44335/api/admin' // goes for get, put, post and delete

export const GET_MY_TODOS : string = 'https://localhost:44335/api/todo/GetMyTodos';
export const GET_ALL_USERS : string = 'https://localhost:44335/api/adminuser/GetAllUsers';
export const DELETE_TODO : string = ADMIN_ROUTE;
export const GET_ADMIN_TODO = ADMIN_ROUTE;
export const UPDATE_TODO = ADMIN_ROUTE;
export const ADMIN_USER = 'https://localhost:44335/api/adminuser';
export const ADMIN_USER_DELETE = 'https://localhost:44335/api/adminuser/DeleteUser'; // /id

export const GET_ALL_TODOS = 'https://localhost:44335/api/admin/GetAllTodos';
export const GET_STATS_BY_PERSON = 'https://localhost:44335/api/admin/GetStatsByPerson';
export const GET_ALL_STATS = 'https://localhost:44335/api/admin/GetAllStats'; 

// comments
export const GET_TODO_COMMENTS = 'https://localhost:44335/api/todo/GetTodoComments'; // /GetTodoComments/todoid
export const ADD_TODO_COMMENT = 'https://localhost:44335/api/todo/AddTodoComment';
