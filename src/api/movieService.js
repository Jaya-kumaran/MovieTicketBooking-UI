import axios from 'axios';

const MovieService = {
  loadMovies: () => {
    return axios.get('https://movie-ticket-booking-backend.azurewebsites.net/api/Movie/Reterive/All').then((response) => {
      return response.data;
    });
  },
  getMovie: (id) => {
    return axios.get(`https://movie-ticket-booking-backend.azurewebsites.net/api/Movie/Reterive/${id}`).then((response) => {
      return response.data;
    });
  },
  deleteMovie: (id) => {
    return axios.delete(`https://movie-ticket-booking-backend.azurewebsites.net/api/Movie/Delete/${id}`).then((response) => {
      return response.data;
    });
  },
};

export default MovieService;