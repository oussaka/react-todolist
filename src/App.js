import React from 'react';
import './App.css';
import 'todomvc-app-css/index.css'

class TodoList extends React.Component {
    render () {
        return (
            <div className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                    />
                </header>
            </div>
        );
    }
}

export default TodoList;
