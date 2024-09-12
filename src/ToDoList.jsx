import React, { useState } from "react";
import { toast, Toaster } from "sonner";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function editTask(index) {
        setNewTask(tasks[index].text);
        setEditingIndex(index);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            if (editingIndex !== null) {
                const updatedTasks = [...tasks];
                updatedTasks[editingIndex] = { ...updatedTasks[editingIndex], text: newTask };
                setTasks(updatedTasks);
                setEditingIndex(null);
            } else {
                let flag = true;
                tasks.map((x) => {
                    if (x.text.toUpperCase() != newTask.toUpperCase()) {
                        flag = true;
                    } else {
                        flag = false;
                    }
                });
                if (flag) {
                    setTasks((prevTasks) => [...prevTasks, { text: newTask, completed: false }]);
                } else {
                    return toast.error("Task Already Added Once");
                }
            }
            setNewTask("");
        }
    }

    function removeTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function toggleCompletedTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    }

    return (
        <div className="toDoList">
            <h1>To-Do List</h1>
            <div className="taskAddHolder">
                <input
                    className="addTask"
                    type="text"
                    placeholder="Enter a Task here..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>
                    {editingIndex !== null ? "Update" : "Add"}
                </button>
            </div>
            <Toaster richColors position="top-center" />
            <ul className="taskContainer">
                {tasks.map((task, index) => (
                    <li className="taskItems" key={index}>
                        <span
                            className={`text ${task.completed ? "completed" : ""}`}
                            onClick={() => toggleCompletedTask(index)}
                        >
                            {task.text}
                        </span>
                        <button className="edit-btn" onClick={() => editTask(index)}>
                            Edit
                        </button>
                        <button className="delete-btn" onClick={() => removeTask(index)}>
                            Delete
                        </button>
                        <button className="compleat-btn" onClick={() => toggleCompletedTask(index)}>
                            {" "}
                            Tick{" "}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
