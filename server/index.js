const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());

let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

app.post("/todos", (req, res) => {
  const todo = req.body;

  const newTodo = {
    id: todos.length + 1,
    title: todo.title,
    description: todo.description,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const todo = req.body;
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).json({ message: "Todo not found" });
  } else {
    todos[todoIndex].title = todo.title;
    todos[todoIndex].description = todo.description;
    res.json(todos[todoIndex]);
  }
});

app.delete("/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos.splice(todoIndex, 1);
    res.status(200).json({message:"todo deleted"});
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
