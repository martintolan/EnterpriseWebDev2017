import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import HomeAutomationApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import HomeAutoNavBar from './componentPages/HAS_navbar';
import HeatingDashboard from './componentPages/heatingDashboard';
import PowerDashboard from './componentPages/powerDashboard';
import WaterDashboard from './componentPages/waterDashboard';
import LightingDashboard from './componentPages/lightingDashboard';


var App = React.createClass({
	render : function() {
		return (
			<div>
				<HomeAutoNavBar />
				{this.props.children}
			</div>
		)
	}
});// var - App

var HeatingApp = React.createClass({
	render : function() {
		return (
			<div>
				<HeatingDashboard />
			</div>
		)
	}
});// var - HeatingApp

var PowerApp = React.createClass({
	render : function() {
		return (
			<div>
				<PowerDashboard />
			</div>
		)
	}
});// var - PowerApp

var WaterApp = React.createClass({
	render : function() {
		return (
			<div>
				<WaterDashboard />
			</div>
		)
	}
});// var - WaterApp

var LightsApp = React.createClass({
	render : function() {
		return (
			<div>
				<LightingDashboard />
			</div>
		)
	}
});// var - LightsApp

var AboutApp = React.createClass({
	render : function() {
		return (
			<div>
				<h2>About Page for the Home Automation App </h2>
				{this.props.children}
			</div>
		)
	}
});// var - AboutApp


var ContactApp = React.createClass({
	render : function() {
		return (
			<div>
				<h2>Contact Page for the Home Automation App </h2>
				{this.props.children}
			</div>
		)
	}
});// var - ContactApp


ReactDOM.render((
	<Router history={browserHistory} >
		<Route path="/" component={App}>
			<IndexRoute component={HomeAutomationApp} />
			<Route path="about" component={AboutApp} />
			<Route path="contact" component={ContactApp} />
			<Route path="heating" component={HeatingApp} />
			<Route path="power" component={PowerApp} />
			<Route path="water" component={WaterApp} />
			<Route path="lights" component={LightsApp} />
		</Route>
	</Router>
	),
  document.getElementById('root')
);
