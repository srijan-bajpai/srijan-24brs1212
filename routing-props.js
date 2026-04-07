import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? styles.active : {};

  return (
    <nav style={styles.nav}>
      <Link to="/" style={{ ...styles.link, ...isActive("/") }}>
        Home
      </Link>
      <Link to="/about" style={{ ...styles.link, ...isActive("/about") }}>
        About
      </Link>
      <Link to="/contact" style={{ ...styles.link, ...isActive("/contact") }}>
        Contact
      </Link>
    </nav>
  );
}

function Home() {
  return (
    <div style={styles.page}>
      <h2>Home Page</h2>
      <p>This is a simple routing demo.</p>
    </div>
  );
}

function About({ name }) {
  return (
    <div style={styles.page}>
      <h2>About Page</h2>
      <p>Created by: {name}</p>
    </div>
  );
}

function Contact() {
  return (
    <div style={styles.page}>
      <h2>Contact Page</h2>
      <p>Email: example@gmail.com</p>
    </div>
  );
}

export default function App() {
  const studentName = "Pete";

  return (
    <BrowserRouter>
      <div style={styles.container}>
        <h1 style={styles.heading}>React Routing App</h1>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About name={studentName} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Segoe UI",
    padding: 20,
  },
  heading: {
    marginBottom: 10,
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  link: {
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: 8,
    background: "#e2e8f0",
    color: "black",
  },
  active: {
    background: "#3b82f6",
    color: "white",
  },
  page: {
    padding: 20,
    borderRadius: 10,
    background: "#f1f5f9",
    width: 300,
    margin: "auto",
  },
};
