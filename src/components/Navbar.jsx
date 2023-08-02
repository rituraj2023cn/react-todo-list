import styles from "../styles/Navbar.module.css";

function Navbar({ totalTodos, completedTodos, remainingTodos }) {
  return (
    <>
      <div className={styles.Navbar}>
        <h1>TODO-LIST react Project</h1>
        <div className={styles.TodoCount}>
          <p>Total Todo: {totalTodos}</p>
          <p>Completed Todo: {completedTodos}</p>
          <p>Remaining Todo: {remainingTodos}</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
