import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { AppAdoption } from './adoption/AppAdoption';
import { AppDating } from './dating/AppDating';

export class AppIndex extends Component {
    render() {
        return (
            <div>
            <h1>Apps</h1>
            <AppBlock color='blue' name='Adoption' route='/apps/adoption' 
                bg={process.env.PUBLIC_URL + '/AdoptionAppIcon.jpg'} />
            <AppBlock color='red' name='dating' route='/apps/dating' 
                bg={process.env.PUBLIC_URL + '/AdoptionAppIcon.jpg'} />
            </div>
        )
    }
}

class AppBlock extends Component {
    render() {
        const { color, name, route, bg } = this.props;
        console.log(bg);
        return (
            <div id={name}>
              <Link to={route}>
                <button className='app-btn'
                    style={{display: 'inline', color: color, width: '200px', height: '200px', margin: '0.5%', backgroundImage: bg, 
                    backgroundSize: '100%', backgroundPosition: 'center'}} id={name}>
                    {name}
                </button>
              </Link>
            </div>
        )
    }
}