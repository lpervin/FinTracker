import React, { Component } from 'react';


export default class Trade extends Component {
    static displayName = Trade.name;

    constructor(props) {
        super(props);
        // this.state = { currentCount: 0 };
        // this.incrementCounter = this.incrementCounter.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Trade Main</h1>
            </div>
        );
    }
}