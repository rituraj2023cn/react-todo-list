import { useState } from "react";
import styles from "../styles/AddTodo.module.css";

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState("");
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    if (title.trim === "") {
      return;
    }
    onAdd({ title });
    setTitle("");
  };
  return (
    <>
      <div className={styles.AddTodo}>
        <input type="text" value={title} onChange={handleChange} />
        <button onClick={handleSubmit}>Add Todo</button>
      </div>
    </>
  );
}

export default AddTodo;
