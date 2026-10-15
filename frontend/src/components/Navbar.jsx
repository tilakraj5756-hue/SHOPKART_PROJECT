import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api.post("/customers/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <nav className="navbar">
      <h2 onClick={() => navigate("/home")}>ShopKart</h2>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
