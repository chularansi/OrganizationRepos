import React from 'react';
import github from '../apis/github';
import { Button, Label, Icon, Loader } from 'semantic-ui-react';

class Watch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      member: '',
      watched: null
    };
    // console.log(props.member);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.member !== prevState.member) {
      return {
        member: nextProps.member,
        watched: null
      }
    }

    // No state update necessary
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.watched === null) {
      // At this point, we're in the "commit" phase, so it's safe to load the new data.
      this.updateWatched(prevState.member);
    }
  }

  updateWatched(member) {
    github.get(`/users/${member}/subscriptions`).then(res => this.setState({ watched: res.data.length }));
  }

  render() {
    if (this.state.watched === null) {
      return <Loader active inline='centered' size='mini'></Loader>;
    } else {
      return(
        <Button size='mini' as='div' labelPosition='right'>
          <Button size='mini' basic color='blue'>
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