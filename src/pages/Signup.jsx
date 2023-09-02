import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// api client
import apiClient from "../api/client";
const endpoint = "/user/signup";

const Signup = ({ setToken }) => {
  // navigation
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    success: false,
  });

  const [avatar, setAvatar] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await apiClient.post(endpoint, formData, config);
      setResponseMessage({
        ...responseMessage,
        message: "Account successfully created !",
        success: true,
      });

      setToken(response.data.token);
      Cookies.set("token", response.data.token, { expires: 15 });

      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      if (
        (error.response && error.response.status === 409) ||
        (error.response.data && error.response.data.message.includes("already"))
      ) {
        console.log("Email already exists !");
        setResponseMessage({
          ...responseMessage,
          message: "Email already used. Use a different email. ",
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
        <h1>Signup</h1>
        {!avatar ? (
          <div className="user-avatar">
            <label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(event) => {
                  setAvatar(event.target.files[0]);
                  setAvatarUrl(URL.createObjectURL(event.target.files[0]));
                }}
              />
              <p>Profile image</p>
              <FontAwesomeIcon icon="camera" />
            </label>
          </div>
        ) : (
          <div className="user-avatar">
            <img src={avatarUrl} alt="profile" />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            name="username"
            id="username"
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
              setResponseMessage({
                ...responseMessage,
                message: "",
                success: false,
              });
            }}
            required
          />
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
          <button type="submit">Signup</button>

          <p
            className="p-signup"
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account ? login !
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

export default Signup;
