import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

// api client
import apiClient from "../api/client";
const endpoint = "/user/login";

const Login = ({ setToken }) => {
  // navigation
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    success: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiClient.post(endpoint, {
        email,
        password,
      });
      setToken(response.data.token);
      Cookies.set("token", response.data.token, { expires: 15 });

      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.data.message.includes("Unauthorized")
      ) {
        console.log(error.response);
        setResponseMessage({
          ...responseMessage,
          message: "Incorrect login information",
          success: false,
        });
      }
      console.log(error.message, "\n", error.response);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="main-container signup-container">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            name="email"
            id="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
              setResponseMessage({
                ...responseMessage,
                message: "",
                success: false,
              });
            }}
            required
          />
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
              setResponseMessage({
                ...responseMessage,
                message: "",
                success: false,
              });
            }}
            required
          />
          <button type="submit">Login</button>
          <p
            className="p-signup"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Don't have an account ? signup !
          </p>
        </form>
        {responseMessage.message && (
          <textarea
            name="message"
            id="message"
            defaultValue={responseMessage.message}
            style={{ color: responseMessage.success ? "green" : "red" }}
            className="textarea-signup"
          ></textarea>
        )}
      </div>
    </div>
  );
};

export default Login;
