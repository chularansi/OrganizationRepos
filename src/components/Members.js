import React from 'react';
import { List, Segment, Image, Pagination, ListContent } from 'semantic-ui-react';
import './Members.css';
import Watch from './Watch';

class Members extends React.Component {
  // _isMounted = false;

  constructor(props) {
    super(props);

    this.state = { 
      currentPage: 1,
      itemsPerPage: 10,
      indexOfFirstItem: 0,
      indexOfLastItem: 10,
    };
  }

  componentDidMount() {
    // this._isMounted = true;
  }

  componentWillUnmount() {
    // this._isMounted = false;
    // this.setState = (state,callback)=>{
    //   return;
    // };
  }

  btnClick = async (event, paginatedData) => {
    await this.setState({currentPage: paginatedData.activePage});
    await this.setState({indexOfFirstItem: this.state.currentPage * this.state.itemsPerPage - this.state.itemsPerPage});
    await this.setState({indexOfLastItem: this.state.currentPage * this.state.itemsPerPage});
  }

  memberClick = (memWatchData) => {
    this.props.onReceiveMember(memWatchData);
  }

  renderMembers() {
    const {members, onMemSubmit} = this.props;
    if (members.length > 0) {
      return members.slice(this.state.indexOfFirstItem, this.state.indexOfLastItem).map(member => {
        return(
          <List.Item key={member.id} style={{cursor: 'pointer'}} >
            <ListContent floated='right'>
              <Watch member={member.login} memberClick={this.memberClick} />
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

  render() {
    return(
      <div>
        Members
        <div>
          <Segment inverted>
            <List divided inverted relaxed>
              {this.renderMembers()}
            </List>
              <Pagination inverted defaultActivePage={1} totalPages={Math.ceil(this.props.members.length / this.state.itemsPerPage)}
                onPageChange={this.btnClick} boundaryRange={0} ellipsisItem={null}
                firstItem={null} lastItem={null} siblingRange={1}
              />
          </Segment>
        </div>     
      </div>
    );
  }
}

export default Members;