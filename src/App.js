import React from 'react';
import TodoItem from './TodoItem'
import './App.css';
import 'todomvc-app-css/index.css'

const ENTER_KEY = 'Enter';

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: props.model.fetchAll()
        };
    }

    updateTodos = (todos) => {
        this.setState({todos: todos})
    };

    updateNewTodo = (event) => {
        this.setState({newTodo: event.target.value})
    };

    addTodo = (event) => {
        if (event.key !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        let title = this.state.newTodo.trim();
        if (title) {
            this.props.model.addTodo(title);
            this.setState({newTodo: ''});
        }
    };

    /**
     * Handle toggle complete toto from list.
     *
     * @param {Todo} todoToToggle
     * @public
     */
    toggleTodo(todoToToggle) {
        this.props.model.toggle(todoToToggle, this.updateTodos);
    };

    /**
     * Handle toggle remove toto from list.
     *
     * @param {Todo} todoToRemove
     * @public
     */
    destroyTodo(todoToRemove) {
        this.props.model.remove(todoToRemove, this.updateTodos);
    };

    render () {
        let {todos, newTodo} = this.state;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        value={newTodo}
                        onKeyPress={this.addTodo}
                        onChange={this.updateNewTodo}
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
                                onDestroy={this.destroyTodo.bind(this, todo)}
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
