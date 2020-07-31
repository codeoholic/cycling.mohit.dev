import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = { total_rides : 0, total_distance : 0 };
    }
    componentDidMount(){
        const url = 'https://api-cycling.mohit.dev/record.php';
        fetch( url )
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ total_rides: responseJson.all_ride_totals_count, total_distance: responseJson.all_ride_totals_distance });
        })
    }
    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <img src="https://mohit.sgp1.cdn.digitaloceanspaces.com/cycling/cycling.png" className="cycling_icon" alt="cycling icon"/>
                    <div className="statistics">{this.state.total_rides} rides</div>
                    <div className="statistics">{this.state.total_distance / 1000} kilometers</div>
                </header>
            </div>
        );
    }
}

export default ( App );
