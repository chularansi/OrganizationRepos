import React from 'react';
import github from '../apis/github';

import './Members.css';

class Members extends React.Component {
  state = { members: []};

  async componentDidMount() {
    const {orgName} = this.props;
    if (this.props.orgName) {
      const response = await github.get(`/orgs/${orgName}/members`);
      this.setState({ members: response.data});
    }
  }

  // componentDidUpdate() {
  //   this.componentDidMount();
  // }

  handleChange = (e) => {
    console.log(e.target.value);
  }

  renderMembers() {
    if (this.state.members.length > 0) {
      return this.state.members.map(member => {
        return <option key={member.id} value={member.login}>{member.login}</option>
      });
    }

    return <option>No members</option>
  }

  render() {
    return(
      <div>
        Members
        <div>
          <select onChange={this.handleChange}>
            {this.renderMembers()}
          </select>
        </div>     
      </div>
    );
  }
}

export default Members;