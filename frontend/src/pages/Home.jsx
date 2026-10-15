import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/customers/me");
        setUser(response.data);
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Welcome to ShopKart! 🛍️</h1>

        <p>Welcome, {user.fullName}!</p>

        <div className="profile">
          <p>
            <strong>Name:</strong> {user.fullName}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
        </div>

        <button onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default Home;