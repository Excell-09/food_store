import jwt_decode from "jwt-decode";

const user = jwt_decode(localStorage.getItem("token"));

export default user