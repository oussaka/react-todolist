export default class TodoModel {
    static i = 0;

    /**
     * @param {string} storageId
     */
    constructor(storageId) {
        this.storageId = storageId;
        this.storage = window.localStorage;
        this.todos = this.fetchAll(storageId)
    }

    /**
     * Crée un système d'auto increment
     **/
    static increment () {
        return this.i++
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

    addTodo (title): void {
        this.todos = [{
            id: TodoModel.increment(),
            title: title,
            completed: false
        }, ...this.todos]

        this.save(this.storageId, this.todos)
    }

    save (storageId, data): void {
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
        console.log(todoToToggle)
        this.todos = this.todos.map(todo => todo.id === todoToToggle.id ? { ...todo, completed: !todo.completed } : todo)
        this.save(this.storageId, this.todos);
        console.table(this.todos)
        if (callback) {
            callback(this.todos);
        }
    }
}