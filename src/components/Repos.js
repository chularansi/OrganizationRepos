import React from 'react';

import { Icon, Header, Image, Menu, Table } from 'semantic-ui-react'

const Repos = ({ orgRepos }) => {

  const renderRepos = orgRepos.sort(
    ( a, b) => (a.stargazers_count < b.stargazers_count) ? 1 : (a.stargazers_count === b.stargazers_count) ? ((a.watchers_count < b.watchers_count) ? 1 : -1) : -1
  ).map(repo => {
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

  const renderHeader = [...orgRepos].slice(0, 1).map(org => {
    return(
      <Header as='h4' image key={org.id}>
        <Image src={org.owner.avatar_url} rounded size='mini' />
        <Header.Content>
          <span style={{textTransform: 'uppercase'}}>{org.owner.login}</span>  -  Repos
        </Header.Content>
      </Header>
    );
  });

    return(
      <div className="repo-container">
        {renderHeader}
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
            {renderRepos}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='5'>
                <Menu floated='right' pagination inverted>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron left' />
                  </Menu.Item>
                  <Menu.Item as='a'>1</Menu.Item>
                  <Menu.Item as='a'>2</Menu.Item>
                  <Menu.Item as='a'>3</Menu.Item>
                  <Menu.Item as='a'>4</Menu.Item>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron right' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
}

export default Repos;