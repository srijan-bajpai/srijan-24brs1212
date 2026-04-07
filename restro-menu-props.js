import { useState } from "react";
import PropTypes from "prop-types";

/* CHILD COMPONENT */
function MenuItem({ item }) {
  return (
    <div style={styles.card}>
      <h3>{item.name}</h3>
      <p>Category: {item.category}</p>
      <p>Price: ₹{item.price}</p>
    </div>
  );
}

/* PROP VALIDATION */
MenuItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const menu = [
    { id: 1, name: "Pizza", price: 250, category: "Fast Food" },
    { id: 2, name: "Burger", price: 120, category: "Fast Food" },
    { id: 3, name: "Biryani", price: 300, category: "Main Course" },
    { id: 4, name: "Pasta", price: 200, category: "Italian" },
    { id: 5, name: "Fried Rice", price: 180, category: "Main Course" },
  ];

  // FILTER + SEARCH
  const filteredMenu = menu.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      filter === "all" || item.category === filter;

    return matchSearch && matchCategory;
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🍽 Restaurant Menu</h1>

        {/* SEARCH */}
        <input
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        {/* FILTER */}
        <div style={styles.filters}>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("Fast Food")}>
            Fast Food
          </button>
          <button onClick={() => setFilter("Main Course")}>
            Main
          </button>
          <button onClick={() => setFilter("Italian")}>
            Italian
          </button>
        </div>

        {/* MENU LIST */}
        <div style={styles.list}>
          {filteredMenu.length === 0 ? (
            <p>No items found</p>
          ) : (
            filteredMenu.map((item) => (
              <MenuItem key={item.id} item={item} />
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
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI",
  },

  container: {
    width: 420,
    background: "rgba(255,255,255,0.08)",
    padding: 20,
    borderRadius: 15,
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  heading: {
    textAlign: "center",
    marginBottom: 10,
  },

  input: {
    width: "100%",
    padding: 8,
    borderRadius: 8,
    border: "none",
    marginBottom: 10,
  },

  filters: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  list: {
    maxHeight: 250,
    overflowY: "auto",
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
};
