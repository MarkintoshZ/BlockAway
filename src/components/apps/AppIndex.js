import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import { AppAdoption } from './adoption/AppAdoption';
import { AppDating } from './dating/AppDating';

export class AppIndex extends Component {
    render() {
        return (
            <Router>
              <div>
                <AppBlock color='blue' name='Adoption' route='/apps/adoption' 
                    bg={process.env.PUBLIC_URL + '/AdoptionAppIcon.jpg'} />
                <AppBlock color='red' name='dating' route='/apps/dating' 
                    bg={process.env.PUBLIC_URL + '/AdoptionAppIcon.jpg'} />

                <Switch>
                    <Route path='/apps/adoption'>
                        <AppAdoption />
                    </Route>
                    <Route path='/apps/dating'>
                        <AppDating />
                    </Route>
                </Switch>
              </div>
            </Router>
        )
    }
}

class AppBlock extends Component {
    render() {
        const { color, name, route, bg } = this.props;
        console.log(process.env.PUBLIC_URL);
        return (
            <div style={{color: color, width: '90%',}} id={name}>
              <Link to={route}>
                <button className='app-btn' style={{backgroundImage: bg, background_size: '100%'}} id={name}>
                    {name}
                </button>
              </Link>
            </div>
        )
    }
}