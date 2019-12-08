import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import {
  Person,
} from 'blockstack';

import { UserInfo } from '../models/UserInfo';
import { AppIndex } from './apps/AppIndex';
import { WelcomePage } from './WelcomePage';
import { UserInfoPage } from './UserInfoPage';
import { AppAdoption } from './apps/adoption/AppAdoption';
import { AppDating } from './apps/dating/AppDating';

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

  fillInfo = (data) => {
    const { userSession } = this.props
    this.setState({ isLoading: true })
    const options = { decrypt: false }
    userSession.putFile('info.json', data.toString(), options)
      .then((_) => {
        this.setState({
          userInfo: new UserInfo(data),
          infoFilled: true,
        });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  fetchData() {
    const { userSession } = this.props
    this.setState({ isLoading: true })
    const options = { decrypt: false }
    userSession.getFile('info.json', options)
      .then((file) => {
        var info = JSON.parse(file || '[]')
        this.setState({
          person: new Person(userSession.loadUserData().profile),
          userInfo: file ? info : new UserInfo(),
          infoFilled: file ? true : false,
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
    const { person, infoFilled } = this.state;
    console.log(this.props.userSession)
    return (
      !userSession.isSignInPending() ?
      <div className="panel-welcome" id="section-2">
        <Router>
          <div>
            <Switch>
              <Route exact path='/'>
                <WelcomePage person={person} handleSignOut={handleSignOut} infoFilled={infoFilled} />
              </Route>
              <Route exact path='/apps'>
                <AppIndex />
              </Route>
              <Route exact path='/apps/adoption'>
                <AppAdoption />
              </Route>
              <Route exact path='/apps/dating'>
                <AppDating />
              </Route>
              <Route exact parse='/add-info'>
                <UserInfoPage person={person} fillInfo={this.fillInfo} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div> : null
    );
  }

  componentWillMount() {
    this.fetchData();
  }
}
