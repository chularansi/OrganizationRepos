import React from 'react';

import { Header, Image, Table, Pagination } from 'semantic-ui-react'

class Repos extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      currentPage: 1,
      itemsPerPage: 10,
      indexOfFirstItem: 0,
      indexOfLastItem: 10
    };
  }

  btnClick = async (event, paginatedData) => {
    await this.setState({currentPage: paginatedData.activePage});
    await this.setState({indexOfFirstItem: this.state.currentPage * this.state.itemsPerPage - this.state.itemsPerPage});
    await this.setState({indexOfLastItem: this.state.currentPage * this.state.itemsPerPage});
  }

  renderRepos() {
    return this.props.repos.slice(this.state.indexOfFirstItem, this.state.indexOfLastItem).map(repo => {
      return(
        <Table.Row key={repo.id}>
          <Table.Cell>{repo.name}</Table.Cell>
          <Table.Cell>{repo.description}</Table.Cell>
          <Table.Cell style={{cursor: 'pointer'}} onClick={()=> window.open(`${repo.html_url}`, "_blank")}>{repo.html_url}</Table.Cell>
          <Table.Cell style={{textAlign: 'center'}}>{repo.stargazers_count}</Table.Cell>
          <Table.Cell style={{textAlign: 'center'}}>{repo.watchers_count}</Table.Cell>
        </Table.Row>
      );
    });
  }

  renderHeader() {
    const {repos, org, orgData} = this.props;
    if(org) {
      return(
        <Header as='h4' image>
          <Image src={orgData.imageUrl} rounded size='mini' />
          <Header.Content>
            <span style={{textTransform: 'uppercase'}}>{orgData.orgName}</span>{org && orgData.orgName ? ' - Repos' : ''}
          </Header.Content>
        </Header>
      );
    }

    return [...repos.slice(0, 1)].map(repo => {
      return(
        <Header as='h4' image key={repo.id}>
          <Image src={orgData.imageUrl} rounded size='mini' />
          <Header.Content>
            <span style={{textTransform: 'uppercase'}}>{orgData.orgName}</span>
          </Header.Content>
          <span>  -  </span>
          <Image src={repo.owner.avatar_url} rounded size='mini' />
          <Header.Content>
            <span style={{textTransform: 'uppercase'}}>{repo.owner.login} - </span>Repos
          </Header.Content>
        </Header>
      );
    });
  }

  render() {
    return(
      <div className="repo-container">
        {this.renderHeader()}
        <Table celled inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Repo Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Url</Table.HeaderCell>
              <Table.HeaderCell>Stars</Table.HeaderCell>
              <Table.HeaderCell>Watched</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
  
          <Table.Body>
            {this.renderRepos()}
          </Table.Body>
  
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='5' style={{textAlign: 'center'}}>
                <Pagination inverted defaultActivePage={1} totalPages={Math.ceil(this.props.repos.length / this.state.itemsPerPage)}
                onPageChange={this.btnClick} boundaryRange={0} ellipsisItem={null}
                firstItem={null} lastItem={null} siblingRange={1}
              />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

export default Repos;
