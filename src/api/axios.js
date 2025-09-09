import axios from 'axios';

// APi Base URL
const instance = axios.create({
  baseURL: 'https://employee-backend1-fc74.onrender.com/api/employees',
});

export default instance;