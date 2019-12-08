import React, { Component } from 'react';

export class AppAdoption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div style={{backgroundImage: '/AdoptionAppIcon.jpg'}}>
                <section style={{display: 'initial'}}>
                    <button className='btn-primary'>Find Parents</button>
                    <button className='btn-primary'>Find Children</button>
                </section>
            </div>
        )
    }
}