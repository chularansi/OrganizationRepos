import React, { useState, useEffect } from 'react';
import { List, Segment, Image, Pagination, ListContent } from 'semantic-ui-react';

import './Members.css';
import Watch from './Watch';

const Members = ({ members, onMemSubmit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);
  const [indexOfLastItem, setIndexOfLastItem] = useState(10);

  // useEffect(() => {
  //   // return () => {
  //   //   cleanup
  //   // }
  // }, [state])

  const btnClick = async (event, paginatedData) => {
    await setCurrentPage(paginatedData.activePage);
    await setIndexOfFirstItem(currentPage * itemsPerPage - itemsPerPage);
    await setIndexOfLastItem(currentPage * itemsPerPage);
  };

  const renderMembers = () => {
    if (members.length > 0) {
      return members.slice(indexOfFirstItem, indexOfLastItem).map(member => {
        return(
          <List.Item key={member.id} style={{cursor: 'pointer'}} >
            <ListContent floated='right'>
              <Watch member={member.login} />
            </ListContent>
            <Image avatar src={member.avatar_url} />
            <List.Content style={{textTransform: 'capitalize'}} onClick={() => onMemSubmit(member.login)}>
              {member.login}
            </List.Content>
          </List.Item>
        );
      });
    }

    return(
      <List.Item>
        <List.Content>
          No members
        </List.Content>
      </List.Item>
    );
  }

    return(
      <div>
        Members
        <div>
          <Segment inverted>
            <List divided inverted relaxed>
              {renderMembers()}
            </List>
              <Pagination inverted defaultActivePage={1} totalPages={Math.ceil(members.length / itemsPerPage)}
                onPageChange={btnClick} boundaryRange={0} ellipsisItem={null}
                firstItem={null} lastItem={null} siblingRange={1}
              />
          </Segment>
        </div>     
      </div>
    );
}

export default Members;