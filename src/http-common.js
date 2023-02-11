import axios from "axios";

export default axios.create({
  baseURL: "https://weadmin.wecodelb.com/api/v1/",
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json",
    "weadmin-key": "zt7Ol6mZNLlh3kqXKFY6hRXg4MUj7rl80KmxSAUYysclZpKqx70KNtA3fwgKRK05"
  }
});
