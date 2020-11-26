import axios from "axios";

export default axios.create({
  baseURL: "https://api.github.com",
  params: {
    per_page: 100,
    type: 'public'
  },
  headers: { 
    Accept: "application/vnd.github.v3+json"
  }
});
