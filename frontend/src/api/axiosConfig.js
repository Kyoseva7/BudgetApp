// src/api/axiosConfig.js
import axios from 'axios';

const axiosConfig = axios.create({
  // point this at wherever your Spring Boot server is running
  baseURL: 'http://localhost:8080/api',

  // tell the server we're sending JSON
  headers: {
    'Content-Type': 'application/json',
  },

  // include cookies (e.g. for sessions or CSRF) if you need them
  withCredentials: true,
});

export default axiosConfig;



