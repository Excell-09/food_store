import axios from "axios";

const appAxiosExternal = axios.create({
  baseURL: "https://dev.farizdotid.com/api/daerahindonesia",
});

export default appAxiosExternal;
