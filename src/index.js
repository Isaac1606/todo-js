import './styles.css';

// Importamos la clases e indicamos en donde se encuentra
// sino se le indica el nombre del archivo automaticamente 
// busca aquel llamado index 
import {Todo, TodoList} from './classes/'
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

// const tarea = new Todo('Aprender Javascript');

// todoList.nuevoTodo(tarea);

// console.log(todoList);

// crearTodoHtml( tarea );

todoList.todos.forEach( todo => crearTodoHtml( todo ) );

// const newTodo = new Todo('Aprender Javascript');

// todoList.nuevoTodo(newTodo);

console.log('todos', todoList.todos);