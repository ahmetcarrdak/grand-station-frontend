import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../components/assets/css/widget.css";
import logo from "../components/assets/img/background_img.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("string");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Kullanıcı oturumunun kontrolü
  useEffect(() => {
    const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
    if (token) {
      navigate("/"); // Oturum açıksa ana sayfaya yönlendir
    }
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5096/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      console.log("Login successful", data);

      // Başarı mesajını duruma ekle
      setSuccessMessage(data.Message || "Login successful!");
      localStorage.setItem("token", data.token); // Token'ı localStorage'a kaydet
      setIsLoading(false);

      // Home sayfasına yönlendir
      navigate("/"); // Yönlendirme yap
    } catch (error) {
      setError((error as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login_page_background"></div>
      <div className="login_page">
        <div className="login_logo">
          <img src={logo} alt="Your Website Logo" />
        </div>
        <div className="login_form">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="E-mail"
              required
              disabled={isLoading}
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Sending.." : "Login"}
            </button>
            {error && <p className="error_message">{error}</p>}
            {successMessage && (
              <p className="success_message">{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
