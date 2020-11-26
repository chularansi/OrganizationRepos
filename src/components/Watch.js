import React from 'react';
import github from '../apis/github';
import { Button, Label, Icon, Loader } from 'semantic-ui-react';

class Watch extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      member: '',
      watchData: [],
      watched: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.member !== prevState.member) {
      return {
        member: nextProps.member,
        watched: null
      }
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.watched === null) {
      this.updateWatched(prevState.member);
    }
  }
  
  updateWatched(member) {
    github.get(`/users/${member}/subscriptions`).then(res =>{
      this.setState({ watched: res.data.length })
      const sortedWatched = res.data.sort((a, b) => (a.stargazers_count < b.stargazers_count) ? 1 : (a.stargazers_count === b.stargazers_count) ? ((a.watchers_count < b.watchers_count) ? 1 : -1) : -1);
      this.setState({ watchData: sortedWatched })
    });
  }

  render() {
    if (this.state.watched === null) {
      return <Loader active inline='centered' size='mini'></Loader>;
    } else {
      return(
        <Button size='mini' as='div' labelPosition='right'>
          <Button size='mini' basic color='blue' onClick={() => this.props.memberClick(this.state.watchData)}>
            <Icon name='eye' />
            Watched
          </Button>
          <Label as='a' size='mini' basic color='blue' pointing='left' style={{ width: '50px', textAlign: 'center' }}>
            {this.state.watched}
          </Label>
        </Button>
      );
    }
  }
}

export default Watch;