import { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const theme = localStorage.getItem("theme");

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (theme) setDarkMode(theme === "dark");
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save theme
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const addTask = () => {
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };

    setTasks([newTask, ...tasks]);
    setInput("");
  };

  const toggleTask = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  // Filtering
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  // Stats
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  // Theme styles
  const bg = darkMode
    ? "linear-gradient(135deg, #1e293b, #0f172a)"
    : "linear-gradient(135deg, #e2e8f0, #ffffff)";

  const cardBg = darkMode
    ? "rgba(255,255,255,0.08)"
    : "rgba(255,255,255,0.9)";

  const textColor = darkMode ? "white" : "#1e293b";

  return (
    <div style={{ ...styles.page, background: bg }}>
      <div style={{ ...styles.container, background: cardBg, color: textColor }}>
        <h1 style={styles.heading}>📝 Task Manager</h1>

        {/* THEME TOGGLE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            ...styles.toggleBtn,
            background: darkMode ? "#facc15" : "#1e293b",
            color: darkMode ? "black" : "white",
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* INPUT */}
        <div style={styles.inputRow}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task..."
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addBtn}>
            Add
          </button>
        </div>

        {/* FILTER BUTTONS */}
        <div style={styles.filters}>
          <button style = {styles.clearBtn} onClick={() => setFilter("all")}>All</button>
          <button style = {styles.clearBtn} onClick={() => setFilter("pending")}>Pending</button>
          <button style = {styles.clearBtn} onClick={() => setFilter("completed")}>Completed</button>
        </div>

        {/* STATS */}
        <div style={styles.stats}>
          <span>Total: {total}</span>
          <span>Completed: {completed}</span>
          <span>Pending: {pending}</span>
        </div>

        {/* TASK LIST */}
        <div style={styles.list}>
          {filteredTasks.length === 0 ? (
            <p>No tasks found</p>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} style={styles.card}>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      textDecoration: task.completed
                        ? "line-through"
                        : "none",
                      opacity: task.completed ? 0.6 : 1,
                    }}
                  >
                    {task.text}
                  </div>
                  <small>{task.createdAt}</small>
                </div>

                <div style={styles.actions}>
                  <button
                    style={styles.completeBtn}
                    onClick={() => toggleTask(task.id)}
                  >
                    ✔
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteTask(task.id)}
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* CLEAR BUTTON */}
        <button style={styles.clearBtn} onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI",
  },

  container: {
    padding: 25,
    borderRadius: 15,
    width: 420,
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  heading: {
    textAlign: "center",
    marginBottom: 10,
  },

  toggleBtn: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },

  inputRow: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: "1px solid #ccc",
  },

  addBtn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
  },

  filters: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  stats: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    marginBottom: 10,
  },

  list: {
    maxHeight: 250,
    overflowY: "auto",
  },

  card: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    background: "rgba(255,255,255,0.1)",
  },

  actions: {
    display: "flex",
    gap: 5,
  },

  completeBtn: {
    background: "#22c55e",
    border: "none",
    borderRadius: 5,
    color: "white",
    padding: "5px 10px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    border: "none",
    borderRadius: 5,
    color: "white",
    padding: "5px 10px",
    cursor: "pointer",
  },

  clearBtn: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#f97316",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
