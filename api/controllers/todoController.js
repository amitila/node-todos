var todoStore = require("../store/todoStore");

function getTodos(res) {
    res.json(todoStore.findAll());
}

module.exports = function (app) {

    // get all todos
    app.get("/api/todos", function (req, res) {
        getTodos(res);
    });

    // api/todo/123456
    app.get("/api/todo/:id", function (req, res) {
        var todo = todoStore.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(todo);
    });

    // create a todo
    app.post("/api/todo", function (req, res) {
        var todo = {
            text: req.body.text,
            isDone: req.body.isDone
        };

        todoStore.create(todo);
        getTodos(res);
    });

    // Update a todo
    app.put("/api/todo", function(req, res) {
        if(!req.body._id) {
            return res.status(500).send("ID is required");
        } else {
            var updated = todoStore.update(req.body._id, {
                text: req.body.text,
                isDone: req.body.isDone
            });

            if (!updated) {
                return res.status(404).json({ message: "Todo not found" });
            }

            getTodos(res);
        }
    });

    // delete a todo
    app.delete("/api/todo/:id", function(req, res) {
        var removed = todoStore.remove(req.params.id);

        if (!removed) {
            return res.status(404).json({ message: "Todo not found" });
        }

        getTodos(res);
    });
}