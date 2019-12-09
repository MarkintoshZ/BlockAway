import React, { Component } from 'react';

const childrenData = ['User0', 'User1', 'User2', 'User3']
const adultsData = ['User0', 'User1', 'User2', 'User3']

export class AppAdoption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChild: false,
            showAdult: false
        }
    }

    showChildCallback = (e) => {
        this.setState({
            showChild: true,
            showAdult: false
        })
    }

    showAdultCallback = (e) => {
        this.setState({
            showChild: false,
            showAdult: true
        })
    }

    renderChildren() {
        return (
            <div>
                <h2>Found Children</h2>
                <ol>
                    {childrenData.map((v) => {
                        return <Users id={v} name={v} />
                    })}
                </ol>
            </div>
        )
    }

    renderAdults() {
        return (
            <div>
                <h2>Found Adults</h2>
                <ol>
                    {adultsData.map((v) => {
                        return <Users id={v} name={v} />
                    })}
                </ol>
            </div>
        )
    }

    render() {
        var { showAdult, showChild } = this.state; 
        return (
            <div style={{backgroundImage: '/AdoptionAppIcon.jpg'}}>
                <section style={{display: 'initial'}}>
                    <button className='btn-primary' onClick={this.showAdultCallback} >Find Parents</button>
                    <button className='btn-primary' onClick={this.showChildCallback} >Find Children</button>
                </section>

                {(showAdult)? this.renderAdults() : null}
                {(showChild)? this.renderChildren() : null}
            </div>
        )
    }
}

class Users extends Component {
    render() {
        const { id, name } = this.props
        return (
            <li id={id}>
                <button className='btn-primary' style={{width: '100px', borderRadius: '10px', margin: '10px'}}>{name}</button>
            </li>
        )
    }
}