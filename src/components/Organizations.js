import React from 'react';

import { List, Segment, Image, Pagination } from 'semantic-ui-react';

class Organizations extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      currentPage: 1,
      itemsPerPage: 10,
      indexOfFirstItem: 0,
      indexOfLastItem: 10,
    };
  }

  btnClick = async (event, paginatedData) => {
    await this.setState({currentPage: paginatedData.activePage});
    await this.setState({indexOfFirstItem: this.state.currentPage * this.state.itemsPerPage - this.state.itemsPerPage});
    await this.setState({indexOfLastItem: this.state.currentPage * this.state.itemsPerPage});
  }

  renderOrganizations() {
    return this.props.orgs.slice(this.state.indexOfFirstItem, this.state.indexOfLastItem).map(org => {
      return(
        <List.Item key={org.id} style={{cursor: 'pointer'}} onClick={() => this.props.onOrgSubmit(org.login, org.avatar_url)}>
        <Image avatar src={org.avatar_url} />
        <List.Content style={{textTransform: 'capitalize'}}>
          {org.login}
        </List.Content>
      </List.Item>
      );
    });
  }

  render() {
    return(
      <div>
        <h2>Organizations</h2>
        <div>
          <Segment inverted>
            <List divided inverted relaxed>
              {this.renderOrganizations()}
            </List>
            <Pagination inverted defaultActivePage={1} totalPages={Math.ceil(this.props.orgs.length / this.state.itemsPerPage)}
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
