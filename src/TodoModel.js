import Utils from './Utils'

export default class TodoModel {

    /**
     * @param {string} storageId
     */
    constructor(storageId) {
        this.storageId = storageId;
        this.storage = window.localStorage;
        this.todos = this.fetchAll(storageId)
    }

    /**
     * Find all stored todos.
     *
     * @public
     */
    fetchAll() {
        let store = this.storage.getItem(this.storageId);
        return (store && JSON.parse(store)) || [];
    }

    addTodo (title) {
        this.todos = [{
            id: Utils.uuid(),
            title: title,
            completed: false
        }, ...this.todos];

        this.save(this.storageId, this.todos)
    }

    save (storageId, data) {
        if (data) {
            return this.storage.setItem(storageId, JSON.stringify(data));
        }
    }

    /**
     * @param {Todo} todoToToggle
     * @param {Function} callback
     * @public
     */
    toggle (todoToToggle, callback) {
        this.todos = this.todos.map(todo => todo.id === todoToToggle.id ? { ...todo, completed: !todo.completed } : todo)
        this.save(this.storageId, this.todos);
        if (callback) {
            callback(this.todos);
        }
    }

    /**
     * @param {Todo} todoToRemove
     * @param {Function} callback
     * @public
     */
    remove (todoToRemove, callback) {
        this.todos = this.todos.filter(todo => todo.id !== todoToRemove.id)
        this.save(this.storageId, this.todos);
        if (callback) {
            callback(this.todos);
        }
    }

    /**
     * @param {Todo} todo
     * @param {string} title
     */
    updateTitle (todo, title) {
        this.todos = this.todos.map(t => t === todo ? { ...t, title } : t)
        this.inform()
    }

    toggleAll (completed = true) {
        this.todos = this.todos.map(t => completed !== t.completed ? { ...t, completed } : t)
        this.inform()
    }

    clearCompleted () {
        this.todos = this.todos.filter(t => !t.completed)
        this.inform()
    }
}