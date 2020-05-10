import axios from 'axios';

const api = axios.create({
  baseURL: 'http://mrb-env.eba-dsm4qk8i.sa-east-1.elasticbeanstalk.com/',
});

export default api;
