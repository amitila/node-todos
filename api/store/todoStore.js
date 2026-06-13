var todos = [];
var nextId = 1;

function cloneTodo(todo) {
    return {
        _id: todo._id,
        text: todo.text,
        isDone: todo.isDone
    };
}

function normalizeTodo(todo) {
    return {
        _id: String(nextId++),
        text: todo.text,
        isDone: Boolean(todo.isDone)
    };
}

module.exports = {
    seed: function(seedTodos) {
        todos = seedTodos.map(function(todo) {
            return normalizeTodo(todo);
        });
        nextId = todos.length + 1;
        return this.findAll();
    },

    findAll: function() {
        return todos.map(cloneTodo);
    },

    findById: function(id) {
        var todo = todos.find(function(item) {
            return item._id === String(id);
        });

        return todo ? cloneTodo(todo) : null;
    },

    create: function(todo) {
        var created = normalizeTodo(todo);
        todos.push(created);
        return cloneTodo(created);
    },

    update: function(id, data) {
        var index = todos.findIndex(function(item) {
            return item._id === String(id);
        });

        if (index === -1) {
            return null;
        }

        todos[index] = {
            _id: todos[index]._id,
            text: data.text,
            isDone: Boolean(data.isDone)
        };

        return cloneTodo(todos[index]);
    },

    remove: function(id) {
        var index = todos.findIndex(function(item) {
            return item._id === String(id);
        });

        if (index === -1) {
            return null;
        }

        var removed = todos[index];
        todos.splice(index, 1);
        return cloneTodo(removed);
    }
};