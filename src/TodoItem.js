import React from "react";

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <li className={this.props.todo.completed? 'completed' : ''}>
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
                    // value={this.state.editText}
                    // onBlur={this.handleSubmit}
                    // onChange={this.handleChange}
                    // onKeyDown={this.handleKeyDown}
                />
        </li>
    }
}