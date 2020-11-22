import React from 'react';
import github from '../apis/github';

import { List, Segment, Image, Table, Menu, Icon, Pagination } from 'semantic-ui-react';

class Organizations extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      orgs: [],
      loading: false,
      currentPage: 1,
      indexOfFirstItem: 0,
      indexOfLastItem: 10,
      currentItems: []
    };
  }

  async componentDidMount() {
    this.setState({ loading: true});
    const response = await github.get(`/organizations`);
    this.setState({ orgs: response.data.sort((a, b) => (a.login.toUpperCase() > b.login.toUpperCase()) ? 1 : -1) });
    this.state.currentItems = this.state.orgs.slice(this.state.indexOfFirstItem, this.state.indexOfLastItem);
    this.setState({ loading: false});
  }

  btnClick = async (event, paginatedData) => {
    await this.setState({activePage: paginatedData.activePage});
    await this.setState({indexOfFirstItem: this.state.activePage * 10 - 10});
    await this.setState({indexOfLastItem: this.state.activePage * 10});
    await this.setState({currentItems: this.state.orgs.slice(this.state.indexOfFirstItem, this.state.indexOfLastItem)});
  }

  renderOrganizations() {
    return this.state.currentItems.map(org => {
      return(
        <List.Item key={org.id} style={{cursor: 'pointer'}} onClick={() => this.props.onSubmit(org.login)}>
        <Image avatar src={org.avatar_url} />
        <List.Content style={{textTransform: 'capitalize'}}>
          {org.login}
        </List.Content>
      </List.Item>
      );
    });
  }

  render() {
    if (this.state.loading) {
      return(
        <h2>Loading...</h2>
      );
    }

    return(
      <div>
        Organizations
        <div>
          <Segment inverted>
            <List divided inverted relaxed>
              {this.renderOrganizations()}
            </List>
            <Pagination inverted defaultActivePage={1} totalPages={Math.ceil(this.state.orgs.length / 10)}
              onPageChange={this.btnClick} boundaryRange={0} ellipsisItem={null}
              firstItem={null} lastItem={null} siblingRange={1}
            />
          </Segment>
        </div>
      </div>
    );
  }
}

export default Organizations;
