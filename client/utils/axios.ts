import axios from 'axios';

// For common config
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const axiosNextApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_NEXT_API_BASE_URL
      : 'http://localhost:3000',
});

const axiosMongoApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_MONGO_API_BASE_URL
      : 'http://localhost:4000',
});

export { axiosNextApi, axiosMongoApi };
