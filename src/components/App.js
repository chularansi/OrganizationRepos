import React from 'react';
import { Loader } from 'semantic-ui-react';

import Organizations from './Organizations';
import github from '../apis/github';
import './App.css';
import Members from './Members';
import Repos from './Repos';

class App extends React.Component {

  state = { 
    loading: false, 
    orgs: [],
    orgRepos: [], 
    member: '', 
    members: [], 
    memberRepos: [], 
    memberFlag: false,
    orgData: {
      imageUrl: '',
      orgName: ''
    }
  }

  componentDidMount() {
    this.setState({ loading: true});
    this.fetchOrganizations();
    this.setState({ loading: false});
  }

  async fetchOrganizations() {
    const resOrgs = await github.get(`/organizations`);
    this.setState({ orgs: resOrgs.data.sort((a, b) => (a.login.toUpperCase() > b.login.toUpperCase()) ? 1 : -1) });
  }

  async fetchOrganizationRepos(orgName) {
    const resOrgRepos = await github.get(`/orgs/${orgName}/repos`);
    const sortedOrgRepos = resOrgRepos.data
      .sort((a, b) => (a.stargazers_count < b.stargazers_count) ? 1 : (a.stargazers_count === b.stargazers_count) ? ((a.watchers_count < b.watchers_count) ? 1 : -1) : -1);
    this.setState({ orgRepos: sortedOrgRepos });
  }

  async fetchOrganizationMembers(orgName) {
    const resMembers = await github.get(`/orgs/${orgName}/members`);
    const sortedMembers = resMembers.data.sort((a, b) => (a.login.toLowerCase() > b.login.toLowerCase()) ? 1 : -1);
    this.setState({ members: sortedMembers });
  }

  getOrganization = (orgName, orgImage) => {
    this.setState({ loading: true });
    this.setState({ memberFlag: false});

    this.fetchOrganizationRepos(orgName);
    this.fetchOrganizationMembers(orgName);

    this.setState({ 
      orgData: {
        ...this.state.orgData, imageUrl: orgImage, orgName
      }
    });

    this.setState({ loading: false });
  }

  getMember = async (memberName) => {
    this.setState({ loading: true });

    this.setState({ member: memberName });
    this.setState({ memberFlag: true});
    const resMemberRepos = await github.get(`/users/${memberName}/repos`);
    const sortedMembersRepos = resMemberRepos.data
      .sort((a, b) => (a.stargazers_count < b.stargazers_count) ? 1 : (a.stargazers_count === b.stargazers_count) ? ((a.watchers_count < b.watchers_count) ? 1 : -1) : -1);
    this.setState({ memberRepos: sortedMembersRepos });

    this.setState({ loading: false });
  }

  renderLoader() {
    if(this.state.loading) {
      return(
        <Loader active inline='centered' size='large'>Loading...</Loader>
      ); 
    }
  }

  renderRepos() {
    if (!this.state.memberFlag) {
      return <Repos repos={this.state.orgRepos} orgData={this.state.orgData} org={true} />
    } else if (this.state.memberFlag) {
      return <Repos repos={this.state.memberRepos} orgData={this.state.orgData} org={false} />
    }
  }

  render() {
    return(
      <React.Fragment>
        <div className="main-container">
          <div>
            <Organizations orgs={this.state.orgs} onOrgSubmit={this.getOrganization} />
          </div>
          <div>
            <Members members={this.state.members} onMemSubmit={this.getMember} />
          </div>
        </div>
        <br />
        <div>
          {this.renderLoader()}
          {this.renderRepos()}
        </div>
      </React.Fragment>
    );
  }
}

export default App;