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

// list.sort((a, b) => (a.color - b.color))
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

// addWatchedToMembers(members) {
//   const tempMembers = [...members];
//   const promises = [];
//   members.map(async member => {
//     const resSubcriptions = await github.get(`/users/${member.login}/subscriptions`);
//     promises.push(resSubcriptions);
//   });

//   Promise.all(promises).then((responses) => {
//     const watchedMembers = responses.map((response) => {
//       return tempMembers.find(m => {
//         if (m.login === response.login) {
//           m.watched = response.data.length;
//         }
//         return m;
//       });
//     });

//     this.setState({members: watchedMembers });
//   });

  // const noOfWatched = resSubcriptions.data.length;
  //   addedWatchedMembers.find(m => {
  //     if (m.login === member.login) {
  //       m.watched = noOfWatched;
  //     }
  //     return m;
  //   });
// }

// const watchedMembers = sortedMembers.map(member => {
    //   return this.addWatchedToMembers(member);
    // });
    // console.log(watchedMembers);
    // get watched by member
    // const addedWatchedMembers = [...sortedMembers];

    // const watchedToMembers = () => {
    //   sortedMembers.map(async member => {
    //     const resSubcriptions = await github.get(`/users/${member.login}/subscriptions`);
    //     const noOfWatched = resSubcriptions.data.length;

    //     addedWatchedMembers.find(m => {
    //       if (m.login === member.login) {
    //         m.watched = noOfWatched;
    //       }
    //       return m;
    //     });
    //   });
    // };
    
    // watchedToMembers();