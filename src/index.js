import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './App';
import TodoModel from "./TodoModel";
import * as serviceWorker from './serviceWorker';

let model = new TodoModel('react-todo');
// model.addTodo('un');
// model.addTodo('deux');
// model.addTodo('trois');
// model.addTodo('quatre');

ReactDOM.render(<TodoList model={model} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
