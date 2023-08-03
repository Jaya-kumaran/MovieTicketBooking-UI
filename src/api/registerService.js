import axios from 'axios';

class RegisterService {
  registerUser(data) {
    return axios.post(`https://movie-ticket-booking-backend.azurewebsites.net/api/User/Create`, data)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.response.data);
      });
  }
}

export default RegisterService;