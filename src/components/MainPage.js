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
    const { person, infoFilled } = this.state;
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
              {/* <Route parse='/add-info'>
                // add info
              </Route> */}
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
