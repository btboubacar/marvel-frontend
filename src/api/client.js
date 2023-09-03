import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://site--marvel-backend--25428jw7g85y.code.run",
});

export default apiClient;
