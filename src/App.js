import React from 'react';
import TodoItem from './TodoItem';
import TodoFooter from './Footer';
import 'todomvc-app-css/index.css';

const ENTER_KEY = 'Enter';

class TodoList extends React.Component {

    static ALL_TODOS = 'all';
    static ACTIVE_TODOS = 'active';
    static COMPLETED_TODOS = 'completed';

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newTodo: '',
            nowShowing: 'all'
        };
    }

    componentDidMount() {
        this.setState({
            todos: this.props.model.fetchAll()
        })
    };

    updateTodos = (todos) => {
        this.setState({todos: todos})
    };

    updateTitle = (todo) => {
        this.setState({editing: todo.id});
    };

    updateNewTodo = (event) => {
        this.setState({newTodo: event.target.value});
    };

    addTodo = (event) => {
        if (event.key !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        let title = this.state.newTodo.trim();
        if (title) {
            this.props.model.addTodo(title, this.updateTodos);
            this.setState({newTodo: ''});
        }
    };

    save = (todoToSave, text) => {
        this.props.model.updateTitle(todoToSave, text);
        this.setState({editing: null});
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

    editCancel = (event) => {
        this.setState({editing: false});
    };

    /**
     * Handle toggle complete toto from list.
     *
     * @param {Todo} todoToToggle
     * @public
     */
    toggleTodo = (todoToToggle) => {
        this.props.model.toggle(todoToToggle, this.updateTodos);
    };

    toggleAll = (event) => {
        let checked = event.target.checked;
        this.props.model.toggleAll(checked, this.updateTodos);
    };

    setFilter = (nowShowing) => {
        this.setState({
            nowShowing
        })
    };

    render () {
        let todos = this.props.model.todos;
        let shownTodos = todos.filter(function (todo) {
            switch (this.state.nowShowing) {
                case TodoList.ACTIVE_TODOS:
                    return !todo.completed;
                case TodoList.COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        }, this);

        let activeTodoCount = todos.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);
        let completedCount = todos.length - activeTodoCount;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        value={this.state.newTodo}
                        onKeyPress={this.addTodo}
                        onChange={this.updateNewTodo}
                        placeholder="What needs to be done?"
                    />
                </header>
                <section className="main">
                    {todos.length > 0 &&
                    <input id="toggle-all" className="toggle-all" type="checkbox"
                           onChange={this.toggleAll} checked={activeTodoCount === 0}/>}
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">
                        {shownTodos.map(todo => {
                            return <TodoItem
                                todo={todo}
                                key={todo.id}
                                editing={this.state.editing === todo.id}
                                onToggle={this.toggleTodo.bind(this, todo)}
                                onSave={this.save.bind(this, todo)}
                                onDestroy={this.destroyTodo.bind(this, todo)}
                                onUpdate={this.updateTitle.bind(this, todo)}
                                onCancel={this.editCancel}
                            />
                        })}
                    </ul>
                </section>
                <TodoFooter
                    count={activeTodoCount}
                    completedCount={completedCount}
                    nowShowing={this.state.nowShowing}
                    filter={this.setFilter}
                    onClearCompleted={this.clearCompleted}
                />
            </section>
        );
    }
}

export default TodoList;
