// input form, validatino



import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    movie: "",
    review: "",
  });
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.movie || !form.review || rating === 0) {
      setError("All fields including rating are required");
      return;
    }

    const newReview = {
      ...form,
      rating,
      id: Date.now(),
    };

    setReviews([newReview, ...reviews]);
    setForm({ name: "", movie: "", review: "" });
    setRating(0);
    setError("");
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Movie Reviews</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={styles.input}
          />

          <input
            value={form.movie}
            onChange={(e) =>
              setForm({ ...form, movie: e.target.value })
            }
            style={styles.input}
          />

          <textarea
            value={form.review}
            onChange={(e) =>
              setForm({ ...form, review: e.target.value })
            }
            style={styles.textarea}
          />

          <div style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  ...styles.star,
                  color: star <= rating ? "gold" : "#ccc",
                }}
              >
                ★
              </span>
            ))}
          </div>

          <button style={styles.submitBtn}>Submit Review</button>

          {error && <p style={styles.error}>{error}</p>}
        </form>

        <div style={styles.list}>
          {reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} style={styles.card}>
                <h3>
                  {r.movie} {r.rating}/5
                </h3>
                <p><strong>{r.name}</strong></p>
                <p>{r.review}</p>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteReview(r.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 15,
  },
  input: {
    padding: 8,
    borderRadius: 8,
    border: "none",
  },
  textarea: {
    padding: 8,
    borderRadius: 8,
    border: "none",
  },
  stars: {
    display: "flex",
    justifyContent: "center",
    gap: 5,
  },
  star: {
    fontSize: 24,
    cursor: "pointer",
  },
  submitBtn: {
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "#f87171",
    textAlign: "center",
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
  deleteBtn: {
    marginTop: 5,
    padding: "5px 10px",
    borderRadius: 6,
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  },
};
