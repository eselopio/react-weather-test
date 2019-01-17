import React, { Component } from "react";
import Location from "./Location";
import WeatherData from "./WeatherData";
import transformWeather from "./../../services/transformWeather";
import getUrlWeatherByCity from "./../../services/getUrlWeatherByCity";
import CircularProgress from "@material-ui/core/CircularProgress"; 
import { PropTypes } from "prop-types";
import './styles.css';

class WeatherLocation extends Component {
    
    constructor(props) {
        super(props);
        const {city} = props;

        this.state = {
            city,
            data: null
        };
    }

    componentDidMount() {
        this.handleUpdate();
    }
    
    handleUpdate = () => {
        const api_weather = getUrlWeatherByCity(this.state.city);
        fetch(api_weather)
        .then( resolve => {
            return resolve.json();
        }).then(data => {
            const newWeather = transformWeather(data);
            console.log(newWeather);
            this.setState({
                data: newWeather
            });
        });
    }

    render(){
        const { city, data } = this.state;
       return(
            <div className="weatherLocationCont">
                <Location city={city}/>
                {data ? <WeatherData data={data}/>: <CircularProgress size={50}/>}
            </div>
       );
   }
}

WeatherLocation.protoType = {
    city: PropTypes.string.isRequired,
}

export default WeatherLocation;