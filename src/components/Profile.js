import React, { Component } from 'react';
import {
  Person,
} from 'blockstack';
import { UserInfo } from '../models/UserInfo';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return 'Anonymous';
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
        },
      },
      userInfo: new UserInfo(),
      infoFilled: false,
  	};
  }

  fetchData() {
    const { userSession } = this.props
    this.setState({ isLoading: true })
    const options = { decrypt: false }
    userSession.getFile('info.json', options)
      .then((file) => {
        var info = JSON.parse(file || '[]')
        console.log(`info at fetching data: ${info}`);
        const _infoFilled = ((info !== []) && (info !== null))
        this.setState({
          person: new Person(userSession.loadUserData().profile),
          userInfo: _infoFilled ? info : new UserInfo(),
          infoFilled: _infoFilled ? false : true,
        });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person, userInfo, infoFilled } = this.state;
    console.log(`info filled at render: ${infoFilled}`);
    return (
      !userSession.isSignInPending() ?
      <div className="panel-welcome" id="section-2">
        <div className="avatar-section">
          <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-rounded avatar" id="avatar-image" alt=""/>
        </div>
        <h1>Hello, <span id="heading-name">{ person.name() ? person.name() : 'Nameless Person' }</span>!</h1>
        <h1>My Info: <span id="heading-userInfo">{ userInfo.message }</span>!</h1>
        <h1>info filled: <span id="heading-userInfoFilled">{ infoFilled? 'yes' : 'no' }</span>!</h1>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={ handleSignOut.bind(this) }
          >
            Logout
          </button>
        </p>
      </div> : null
    );
  }

  componentWillMount() {
    this.fetchData();
  }
}
