import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = { total_rides : 0, total_distance : 0, rides: [] };
    }
    componentDidMount(){
        const url = 'https://api-cycling.mohit.dev/record.php';
        fetch( url )
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ total_rides: responseJson.overview.all_ride_totals_count, total_distance: responseJson.overview.all_ride_totals_distance, rides : responseJson.rides });
        })
    }
    render_rides(){
        if(this.state.rides.length > 0){
            var data = [];
            let options = { year: 'numeric', month: 'long', day: 'numeric' };
            var distance = 0;
            let time = 0;
            this.state.rides.map(function(value,index){
                var hours = Math.floor(value.moving_time / (60 * 60));
                var minutes = parseFloat((value.moving_time - (hours * (60 * 60))) / 60).toFixed(0);
                distance = parseFloat(distance) + parseFloat(value.distance);
                distance = parseFloat(distance).toFixed(1);
                time += value.moving_time;
                data.push(
                    <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{parseFloat(value.distance / 1000).toFixed(2)}km</td>
                        <td>{hours}hr {minutes}m</td>
                        <td>{(new Date(value.start_date_local)).toLocaleString('en-GB',options)}</td>
                    </tr>
                )
                return true;
            })
            distance = parseFloat(distance / 1000).toFixed(2);
            let hours = Math.floor(time / (60 * 60));
            let minutes = parseFloat((time - (hours * (60 * 60))) / 60).toFixed(0);
            return(
                <div className="margin_top_10">
                    <div className="statistics">{distance} kilometers</div>
                    <div className="statistics">{parseFloat((distance)/30).toFixed(2)} kilometers/ride</div>
                    <div className="statistics">{hours}h {minutes}m</div>
                    <table className="margin_top_20">
                        <thead>
                            <tr>
                                <td>Serial</td>
                                <td>Distance</td>
                                <td>Time</td>
                                <td>Date</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <img src="https://mohit.sgp1.cdn.digitaloceanspaces.com/cycling/cycling.png" className="cycling_icon" alt="cycling icon"/>
                    <div className="heading margin_top_20">Overall</div>
                    <div className="statistics margin_top_10">{this.state.total_rides} rides</div>
                    <div className="statistics">{parseFloat(this.state.total_distance / 1000).toFixed(2)} kilometers</div>
                    <div className="statistics">{parseFloat((this.state.total_distance / 1000)/this.state.total_rides).toFixed(2)} kilometers/ride</div>
                    <div className="heading margin_top_20">Past 30 rides</div>
                    {this.render_rides()}
                    <div className="stack_bottom">
                        <div className="font_14 color_222226 weight_700">upgrade to Triban RC 500</div>
                        <div className="font_14 color_222226 margin_top_20">Bitcoin Segwit: 366jcHNFy12St9aQx4sguWNTidFQTRdQxC</div>
                        <div className="font_14 color_222226">Bitcoin Native Segwit: bc1qmkys0z5svf3nl3egq06v9uqr0rvcx2lh9p5c8a</div>
                        <a href="https://www.buymeacoffee.com/codeoholic" target="_blank" rel="noopener noreferrer">
                            <img src="https://mohit.sgp1.digitaloceanspaces.com/cdn/bmc-button.png" className="margin_top_10" alt="buy me a pizza!"/>
                        </a>
                        <div className="margin_top_10">
                            <a href="https://twitter.com/codeoholic" target="_blank" rel="noopener noreferrer" className="margin_right_20">
                                twitter
                            </a>
                            <a href="https://github.com/codeoholic/cycling.mohit.dev" target="_blank" rel="noopener noreferrer" className="margin_right_20">
                                github
                            </a>
                            <a href="https://www.strava.com/athletes/codeoholic" target="_blank" rel="noopener noreferrer">
                                strava
                            </a>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default ( App );
