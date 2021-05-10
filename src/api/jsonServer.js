import axios from 'axios';

// gotta change that base url everytime
export default axios.create({
  baseURL: 'http://ccbfc8f0760a.ngrok.io'
});