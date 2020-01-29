import React from 'react';
import TodoItem from './TodoItem'
import './App.css';
import 'todomvc-app-css/index.css'

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: props.model.fetchAll()
        };
    }

    updateTodos = (todos) => {
        this.setState({todos: todos})
    }

    /**
     * Handle toggle complete toto from list.
     *
     * @param {Todo} todoToToggle
     * @public
     */
    toggleTodo(todoToToggle) {
        this.props.model.toggle(todoToToggle, this.updateTodos);
    };

    render () {
        let {todos, newTodo} = this.state;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                    />
                </header>
                <section className="main">
                    {todos.length > 0 &&
                    <input className="toggle-all" type="checkbox" onChange={this.toggle}/>}
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">
                        {todos.map(todo => {
                            return <TodoItem
                                todo={todo}
                                key={todo.id}
                                onToggle={this.toggleTodo.bind(this, todo)}
                                onDestroy={this.destroyTodo}
                                onUpdate={this.updateTitle}
                            />
                        })}
                    </ul>
                </section>
            </section>
        );
    }
}

export default TodoList;
