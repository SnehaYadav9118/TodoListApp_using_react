
import { useState } from "react";
import "./TodoList.css";

function TodoList() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState("");

    const addTodo = (e) => {
        e.preventDefault();

        if (todo.trim() === "") {
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: todo,
            completed: false
        };

        setTodos([...todos, newTodo]);
        setTodo("");
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((item) => item.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((item) =>
                item.id === id
                    ? { ...item, completed: !item.completed }
                    : item
            )
        );
    };

    const filteredTodos = todos.filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="todo-page">
            <div className="todo-card">

                <div className="todo-icon">📝</div>

                <h1>Todo List</h1>

                <p className="todo-subtitle">
                    Manage your daily tasks
                </p>

                <form onSubmit={addTodo} className="todo-form">
                    <input
                        type="text"
                        placeholder="Enter your task..."
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />

                    <button type="submit">
                        + Add
                    </button>
                </form>

                <input
                    type="text"
                    className="todo-search"
                    placeholder="🔍 Search task..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <p className="todo-count">
                    Total Tasks: <strong>{todos.length}</strong>
                </p>

                <div className="todo-list">

                    {filteredTodos.length > 0 ? (
                        filteredTodos.map((item) => (
                            <div
                                className={`todo-item ${
                                    item.completed ? "completed" : ""
                                }`}
                                key={item.id}
                            >
                                <div
                                    className="todo-text"
                                    onClick={() => toggleTodo(item.id)}
                                >
                                    <span className="check">
                                        {item.completed ? "✅" : "⭕"}
                                    </span>

                                    <span>{item.text}</span>
                                </div>

                                <button
                                    className="delete-todo"
                                    onClick={() =>
                                        deleteTodo(item.id)
                                    }
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="empty-todo">
                            📭 No tasks found
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default TodoList;
