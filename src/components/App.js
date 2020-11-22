import React from 'react';
import Organizations from './Organizations';
import github from '../apis/github';
import './App.css';
import Members from './Members';
import Repos from './Repos';

class App extends React.Component {

  state = { org: '', orgRepos: [] }

  getOrganization = async (orgName) => {
    // console.log(orgName);
    this.setState({ org: orgName });

    const response = await github.get(`/orgs/${orgName}/repos`);
      // console.log(response.data);
      this.setState({ orgRepos: response.data});
  }
  // getOrganization = (value) => {
  //   console.log(value);
  //   this.setState({ org: value });
  // }

  render() {
    return(
      <React.Fragment>
        <div className="main-container">
          <div>
            <Organizations onSubmit={this.getOrganization} />
          </div>
          <div>Members</div>
          <div>Subscribed Members</div>
          {/*<div><Members orgName={this.state.org} /></div>*/}
        </div>
        <div>
          <Repos orgRepos={this.state.orgRepos} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;