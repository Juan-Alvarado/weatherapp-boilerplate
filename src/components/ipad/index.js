// import preact 
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_ipad from '../button/style_ipad';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Ipad extends Component {
//var Ipad = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
    }

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=cf17e23b1d108b29a4d738d2084baf5";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.currentCity }</div>
					<div class={ style.country }>{ this.state.currentCountry }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ style.temperature }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class={ style_ipad.container }>
					{ this.state.display ? <Button class={ style_ipad.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var city = parsed_json['name'];
		var country = parsed_json['sys']['country'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];

		// set the states for fields so they could be rendered later on
		this.setState({
			currentCity: city,
			currentCountry: country,
			temp: temp_c,
			cond : conditions
		});      
	}
}
