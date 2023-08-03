import axios from "axios";
import jwt_decode from "jsonwebtoken";

class AuthService {
  token = localStorage.getItem("accessToken");
  loggedIn = localStorage.getItem("accessToken") !== null;
  roleUrl = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  nameUrl = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
  userName = "";

  async login(data) {
    try {
      const response = await axios
        .post("https://movie-ticket-booking-backend.azurewebsites.net/api/Authentication/Login", data);
      const { accessToken } = response.data;
      this.token = accessToken;
      this.loggedIn = true;
      localStorage.setItem("accessToken", accessToken);
      return response.data;
    } 
    catch (error) {
      throw new Error(error.response.data);
    }
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    this.token = null;
    this.loggedIn = false;
    window.location.href = "/";
  }

  isAdmin() {
    if (!this.loggedIn || this.token == null) return false;

    const decodedToken = jwt_decode(this.token);
    const role = decodedToken[this.roleUrl];

    this.userName = decodedToken[this.nameUrl];
    localStorage.setItem("userName", this.userName);

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTimestamp) {
      this.logout();
    }

    return role === "Admin";
  }
}

export default AuthService;
