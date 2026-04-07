//local-storage, dark mode

import { useState, useEffect } from "react";

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  // Load data
  useEffect(() => {
    const data = localStorage.getItem("students");
    const theme = localStorage.getItem("theme");

    if (data) setStudents(JSON.parse(data));
    if (theme) setDarkMode(theme === "dark");
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.course) return;

    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = form;
      setStudents(updated);
      setEditIndex(null);
    } else {
      setStudents([...students, form]);
    }

    setForm({ name: "", email: "", course: "" });
  };

  const handleEdit = (index) => {
    setForm(students[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

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
        <h1 style={styles.heading}>🎓 Student Management</h1>

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

        {/* SEARCH */}
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={styles.input}
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={styles.input}
          />
          <input
            placeholder="Course"
            value={form.course}
            onChange={(e) =>
              setForm({ ...form, course: e.target.value })
            }
            style={styles.input}
          />

          <button style={styles.addBtn}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>

        {/* LIST */}
        <div style={styles.list}>
          {filteredStudents.length === 0 ? (
            <p>No students found</p>
          ) : (
            filteredStudents.map((s, i) => (
              <div key={i} style={styles.card}>
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.email}</p>
                  <p>{s.course}</p>
                </div>

                <div style={styles.actions}>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(i)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
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
    width: 400,
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

  input: {
    width: "100%",
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
    border: "1px solid #ccc",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginBottom: 10,
  },

  addBtn: {
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  list: {
    maxHeight: 250,
    overflowY: "auto",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },

  actions: {
    display: "flex",
    gap: 5,
  },

  editBtn: {
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
};
