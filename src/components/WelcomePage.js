import React, { Component } from 'react';
import { Link } from "react-router-dom";

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export class WelcomePage extends Component {

    renderOptions() {
        const { infoFilled } = this.props;
        return (!infoFilled?
          // nav to add info page
          <Link to='/add-info'>
            <button
              className="btn btn-primary btn-lg"
              id="add-info-button"
              style={{width: '180px', margin: '5px'}}
              >
                finish completing id info
            </button>
          </Link>
         : 
          // nav to apps page
          <Link to='/apps'>
            <button
            className="btn btn-primary btn-lg"
            id="nav-to-apps-button"
            style={{width: '180px', margin: '5px'}}
            >
              apps
            </button>
          </Link>
          )
      }

    render() {
        var { person, handleSignOut } = this.props;
        console.log(`person: ${person}`);
        return (
          <div>
            <div className="avatar-section">
              <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-rounded avatar" id="avatar-image" alt=""/>
            </div>
            <h1>Hello, <span id="heading-name">{ person.name() ? person.name() : 'Nameless Person' }</span>!</h1>
            
            {this.renderOptions()}

            <p className="lead">
            <button
              className="btn btn-primary btn-lg"
              id="signout-button"
              onClick={ handleSignOut.bind(this) }
              style={{width: '180px', margin: '5px'}}
              >
                Logout
            </button>
            </p>
          </div>
        );
    }
}