import React from 'react';
import TodoList from "./App";
import Utils from "./Utils";
import classNames from 'classnames'

export default class Footer extends React.Component {
    render() {
        let setFilter = this.props.filter;

        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.count}</strong> {Utils.pluralize(this.props.count, 'item')} left
                </span>
                <ul className="filters">
                    <li>
                        <a
                            href="#/" onClick={() => setFilter(TodoList.ALL_TODOS)}
                            className={classNames({selected: this.props.nowShowing === TodoList.ALL_TODOS})}>
                            All
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a href="#/active" onClick={() => setFilter(TodoList.ACTIVE_TODOS)}
                            className={classNames({selected: this.props.nowShowing === TodoList.ACTIVE_TODOS})}
                        >
                            Active
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a href="#/completed" onClick={() => setFilter(TodoList.COMPLETED_TODOS)}
                            className={classNames({selected: this.props.nowShowing === TodoList.COMPLETED_TODOS})}
                        >
                            Completed
                        </a>
                    </li>
                </ul>
                <button
                    className="clear-completed"
                    onClick={this.props.onClearCompleted}>
                    Clear completed
                </button>
            </footer>
        );
    }
}