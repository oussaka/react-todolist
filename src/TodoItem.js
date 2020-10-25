import React from 'react';
import classNames from 'classnames'

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editText: ''
        };
    }

    handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            this.setState({
                editing: false,
                editText: this.props.todo.title
            });
            this.props.onCancel(event);
        } else if (event.key === 'Enter') {
            this.handleSubmit(event);
        }
    };

    handleSubmit = (event) => {
        let val = this.state.editText.trim();
        if (val) {
            this.props.onSave(val);
            this.setState({
                editing: false,
                editText: val
            });
            this.props.todo.title = val
        } else {
            this.props.onDestroy();
        }
    };

    handleEdit = (event) => {
        this.props.onUpdate();
        this.setState({
            editing: true,
            editText: this.props.todo.title
        });
    };

    handleChange = (event) => {
        if (this.props.editing) {
            this.setState({editText: event.target.value});
        }
    };

   shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.todo !== this.props.todo ||
            nextProps.editing !== this.props.editing ||
            nextState.editText !== this.state.editText
        );
   };

   render() {
        return <li className={classNames({
                    completed: this.props.todo.completed,
                    editing: this.props.editing
               })}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={this.props.todo.completed}
                        onChange={this.props.onToggle}
                    />
                    <label onDoubleClick={this.handleEdit}>
                        {this.props.todo.title}
                    </label>
                    <button className="destroy" onClick={this.props.onDestroy} />
                </div>
                <input
                    ref="editField"
                    className="edit"
                    value={this.state.editText}
                    onBlur={this.handleSubmit}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
        </li>
   }
}