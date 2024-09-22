import axios from "axios";

const _axios = axios.create({
  baseURL: "https://score.snapshot.org/api",
});

export default _axios;
