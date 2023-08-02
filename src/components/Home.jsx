import { useState } from "react";
import AddTodo from "./AddTodo";
import UpdateTodo from "./UpdateTodo";
import styles from "../styles/Home.module.css";
import { toast } from "react-toastify";

function Home({ data, setData }) {
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      const addTodo = await response.json();
      setData((prevData) => [...prevData, addTodo]);
      toast.success("Todo Added Successfully");
    } catch (error) {
      console.log("Error in adding Todo", error);
      toast.error("Error in adding Todo");
    }
  };
  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const response = await fetch(`${API_URL}/${updatedTodo.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      setData((prevData) => {
        return prevData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      });
      setSelectedTodoId(null);
      toast.info("Todo updated");
    } catch (error) {
      console.log("Error in updating todo", error);
      toast.error("Error in updating todo");
    }
  };

  const handleToggleTodo = async (id) => {
    const todoToToggle = data.find((todo) => todo.id === id);
    if (!todoToToggle) return;

    const updatedTodo = { ...todoToToggle, completed: !todoToToggle.completed };
    handleUpdateTodo(updatedTodo);
    if (!todoToToggle.completed) {
      toast.success("Todo completed successfully");
    } else {
      toast.warning("Todo made incomplete");
    }
  };
  const handleEditTodo = (id) => {
    setSelectedTodoId(id);
  };
  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setData((prevData) => prevData.filter((todo) => todo.id !== id));
      toast.info("Todo deleted");
    } catch (error) {
      console.log("Error deleting todo:", error);
      toast.error("Error in deleting Todo");
    }
  };
  return (
    <>
      <AddTodo onAdd={handleAddTodo} />
      <div className={styles.Home}>
        {data.map((item) => (
          <div className={styles.Todo} key={item.id}>
            {selectedTodoId === item.id ? (
              <UpdateTodo
                todo={item}
                onUpdate={handleUpdateTodo}
                onCancel={() => setSelectedTodoId(null)}
              />
            ) : (
              <>
                <div className={styles.Status}>
                  <div
                    className={
                      item.completed ? styles.Completed : styles.NotCompleted
                    }
                  >
                    {item.title}
                  </div>

                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleTodo(item.id)}
                  />
                </div>

                <div className={styles.Controls}>
                  <img
                    className={styles.edit}
                    src="https://cdn-icons-png.flaticon.com/128/1342/1342558.png"
                    alt="Edit"
                    onClick={() => handleEditTodo(item.id)}
                  />
                  Edit
                  <img
                    className={styles.delete}
                    src="https://cdn-icons-png.flaticon.com/128/5028/5028066.png"
                    alt="delete"
                    onClick={() => handleDeleteTodo(item.id)}
                  />
                  Delete
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
