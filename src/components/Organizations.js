import React from 'react';
import github from '../apis/github';

import { List, Segment } from 'semantic-ui-react';

class Organizations extends React.Component {
  state = { orgs: []};

  async componentDidMount() {
    const response = await github.get(`/organizations`, {
      params: {
        page: 3,
        per_page: 10
      }
    });
    this.setState({ orgs: response.data});
  }

  renderOrganizations() {
    return this.state.orgs.sort((a, b) => (a.login > b.login) ? 1 : -1).map(org => {
      return(
        <List.Item key={org.id} style={{cursor: 'pointer'}} onClick={() => this.props.onSubmit(org.login)}>
          <List.Content>
            {org.login}
          </List.Content>
      </List.Item>
      );
    });
  }

  render() {
    return(
      <div>
        Organizations
        <div>
        <Segment inverted>
          <List divided inverted relaxed>
            {this.renderOrganizations()}
          </List>
        </Segment>
        </div>        
      </div>
    );
  }
}

export default Organizations;
