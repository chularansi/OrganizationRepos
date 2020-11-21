import axios from "axios";

export default axios.create({
  baseURL: "https://api.github.com",
  headers: { Accept: "application/vnd.github.v3+json" }
});

// list.sort((a, b) => (a.color > b.color) ? 1 : -1)
// list.sort(a, b) => (a.color > b.color) ? 1 : (a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 

// githubRepo.sort((a, b) => {
//   if (a.stargazers_count > b.stargazers_count) return 1
//   else if (a.stargazers_count < b.stargazers_count) return -1
//   return 0
// }).map(name => (
//   <UserRepositories
//     key={name.id}
//     repoName={name.name}
//     repoDescription={name.description}
//     starNumber={name.stargazers_count}
//   />
// ))