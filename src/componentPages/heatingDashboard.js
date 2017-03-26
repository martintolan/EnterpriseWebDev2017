import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Label from 'react-bootstrap/lib/Label';
import { Chart } from 'react-google-charts';
import Thermometer from "react-thermometer";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import apiHeating from './../test/stubAPIHeating'
import defaultTemperatureData from './../config/defaultData'


//------------------------------------------------------
//
// Page header control used to summarise the functionality.
//
//------------------------------------------------------
var HomeAutoPageHeader = React.createClass({
  render: function(){
    console.log('heatingDashBoard.js->HomeAutoPageHeader->render()');

    return (
			<div>
				<PageHeader>Heating Control <small>Use this page to monitor and control the heating elements in your home. </small></PageHeader>
			</div>
    ); // return
  } // render
}); // HomeAutoPageHeader


//------------------------------------------------------
//
// Thermometer widget that will show the current 
// temperature. 
//
//------------------------------------------------------
var HomeAutoThometer = React.createClass({
  render: function(){
    console.log('heatingDashBoard.js->HomeAutoThometer->render()');

    return (
			<div>
        <h3>Current Temperature</h3>
        <Thermometer
            min={0}
            max={30}
            width={20}
            height={300}
            backgroundColor={'silver'}
            fillColor={'red'}
            current={this.props.currentTemp}
        />
      </div> 
    ); // return
  } // render
}); // HomeAutoThometer


//------------------------------------------------------
//
// Graphing widget that can be used to plot temperature 
// against time. All vaues required for this graph are 
// passed in through the props. 
//
//------------------------------------------------------
var HomeAutoGraph = React.createClass({	
  render: function(){
    console.log('heatingDashBoard.js->HomeAutoGraph->render()');

    return (
			<div className={'my-pretty-chart-container'}>
        <Chart
          chartType="LineChart"
          columns={this.props.columns}
          rows={this.props.rows}
          options={this.props.options}
          graph_id={this.props.options.title}
          width="100%"
          height="350px"
          legend_toggle
        />
      </div>
    ); // return
  } // render
}); // HomeAutoGraph


//------------------------------------------------------
//
// Slider control used to select the desired temperature.
// Takes the current setpoint from the parent and wets its 
// own state to it so that it can persist across slider 
// movement events.
//
//------------------------------------------------------
var HomeAutoTempSlider = React.createClass({
	getInitialState: function() {
    return { 
    	heatingIdentifier: '',    	
      setPoint: -1
    };
  }, // getInitialState

  componentWillMount : function() {
  	this.setState({ heatingIdentifier: this.props.heatingIdentifier });
  	this.setState({ setPoint: this.props.setPoint });
  },

  handleTemperatureRequestChange: function(value) {
  	console.log('handleTemperatureRequestChange event...');
    this.setState({ setPoint: value })
  },
  handleTemperatureRequestComplete: function(value) {
  	var requestedTemperature = this.state.setPoint;
  	console.log('handleTemperatureRequestComplete event...' + requestedTemperature);
    this.props.changeTempHandler(this.state.heatingIdentifier, requestedTemperature);
  },

  render: function(){
    console.log('heatingDashBoard.js->HomeAutoTempSlider->render()');
    var valueNumber = parseInt(this.state.setPoint, 10);

    return (
			<div className='slider' >
        <h1>Set Temperature</h1>
        <Slider
          min={0}
          max={40}
          step={0.5}
          value={valueNumber}
          onChange={this.handleTemperatureRequestChange}
          onChangeComplete={this.handleTemperatureRequestComplete}
        />
        <div className='sliderHeatingValue'>
        	<h2><Label bsStyle="warning">Temp Selected: {this.state.setPoint}</Label>&nbsp;</h2>
        </div>
      </div>
    ); // return
  } // render
}); // HomeAutoTempSlider


//------------------------------------------------------
//
// Button control used to turn on and off the heating 
// for a floor. Props contains the state of the heating 
// for each floor and also the callback used to trigger 
// the on-off request back to the parent. 
//
//------------------------------------------------------
var HomeAutoHeatingOnOffButtons = React.createClass({
	getInitialState: function() {
    return { 
    	heatingIdentifier: '',
      heatingOn: false
    };
  }, // getInitialState

  componentWillMount : function() {
  	this.setState({ heatingOn: this.props.heatingState });
  	this.setState({ heatingIdentifier: this.props.heatingIdentifier });
  },

  handleTurnHeatingOn : function(e) {
    console.log("TurnHeatingOn button pressed for: " + this.state.heatingIdentifier);
    e.preventDefault();

    if(false == this.state.heatingOn) {
    	console.log("Turning the Heating ON for the " + this.state.heatingIdentifier);
    	this.props.turnHeatingOnHandler(this.state.heatingIdentifier);
    	this.setState({ heatingOn: true });
    }
  }, // handleTurnHeatingOn

  handleTurnHeatingOff : function(e) {
    console.log("TurnHeatingOff button pressed for: " + this.state.heatingIdentifier);
    e.preventDefault();

    if(true == this.state.heatingOn) {
    	console.log("Turning the Heating OFF for the " + this.state.heatingIdentifier);
    	this.props.turnHeatingOffHandler(this.state.heatingIdentifier);
    	this.setState({ heatingOn: false });
    }
  }, // handleTurnHeatingOff


  render: function(){
    console.log('heatingDashBoard.js->HomeAutoHeatingOnOffButtons->render()');
    var fields = [
      <div className='heatstatusbuttons' >
				<h1><Label bsStyle="success">Heating is On</Label>&nbsp;</h1>
      	<ButtonToolbar>
      		<input type="button" className='btn btn-success' value='Turn Heating On' onClick={this.handleTurnHeatingOn} />      		
      		<input type="button" className='btn btn-info' value='Turn Heating Off' onClick={this.handleTurnHeatingOff} />
      	</ButtonToolbar>
      </div>
    ];

		if (this.state.heatingOn == false ) {
	    fields = [
	      <div className='heatstatusbuttons' >
				<h1><Label bsStyle="danger">Heating is Off</Label>&nbsp;</h1>
      	<ButtonToolbar>
      		<input type="button" className='btn btn-success' value='Turn Heating On' onClick={this.handleTurnHeatingOn} />      		
      		<input type="button" className='btn btn-info' value='Turn Heating Off' onClick={this.handleTurnHeatingOff} />
      	</ButtonToolbar>
      </div>
      ] ;
	 	}

    return (
			<div>
				{fields}
			</div>
    ); // return
  } // render
}); // HomeAutoHeatingOnOffButtons


//------------------------------------------------------
//
// Grid control that houses all of the individual items 
// for the heating information for a particular floor
// based on the props passed into it.
//
//------------------------------------------------------
var HomeAutoHeatingGrids = React.createClass({

  render: function(){
    console.log('heatingDashBoard.js->HomeAutoHeatingGrids->render()');

    var currentFloorTemp = this.props.currentTemp;
    var graphOptions = this.props.HeatingOptions;
    var graphColumns = this.props.heatingColumns;
    var graphRows = this.props.heatingRows;
    var thermostatSetting = this.props.thermostatCurrentValue;
    var heatingArea = this.props.HeatingOptions.title;
    var heatingOn = this.props.HeatingOnForThisArea;

    return (
			<div>
				<Grid>
	        <Row className="show-grid">
	          <Col xs={6} md={3}>
	          {
	            <HomeAutoThometer currentTemp={currentFloorTemp}/>
	          }</Col>

	          <Col xs={6} md={3}>
	          {
	            <div>
	            	<h1><Label bsStyle="default">{currentFloorTemp} decC</Label>&nbsp;</h1>
	            </div>
	          } </Col>

	          <Col xsHidden md={6}>
	          {
	            <HomeAutoGraph options={graphOptions} columns={graphColumns} rows={graphRows}/>
	          }</Col>
	        </Row>

	        <Row className="show-grid">
	          <Col md={6} mdPush={6}>
	          {            
	            <HomeAutoHeatingOnOffButtons 
	            	heatingState={heatingOn} 
	            	heatingIdentifier={heatingArea} 
	            	turnHeatingOnHandler={this.props.turnHeatingOnHandler} 
	            	turnHeatingOffHandler={this.props.turnHeatingOffHandler}
	            />
	          }</Col>

	          <Col md={6} mdPull={6}>{
	            <HomeAutoTempSlider 
	            	heatingIdentifier={heatingArea} 
	            	setPoint={thermostatSetting} 
	            	changeTempHandler={this.props.changeTempHandler}
	            />
	          }</Col>
	        </Row>
	      </Grid>
			</div>
    ); // return
  } // render
}); // HomeAutoHeatingGrids


//------------------------------------------------------
//
// Table control that builds the structure of the house 
// to be monitored. Reads the information from the API 
// and builds each of the children components with the 
// appropriate data. As the children are generic and
// stateless components they can be reused multiple times.
//
//------------------------------------------------------
var HomeAutoTableContainer = React.createClass({

  render: function(){
    console.log('heatingDashBoard.js->HomeAutoTableContainer->render()');    
		var currentTempDownStairs = this.props.heatingDataDownStairs.currentTemp;
		var graphOptionsDownStairs = this.props.heatingDataDownStairs.heatingOptions;
		var graphColumns = this.props.heatingDataDownStairs.heatingColumns;
		var graphRowsDownStairs = this.props.heatingDataDownStairs.temperature_rows;
		var thermostatSettingDownStairs = this.props.heatingDataDownStairs.thermostatTempValue;
		var HeatingOnForDownStairs = this.props.heatingDataDownStairs.HeatingOn;

		var currentTempUpStairs = this.props.heatingDataUpStairs.currentTemp;
		var graphOptionsUpStairs = this.props.heatingDataUpStairs.heatingOptions;
		var graphRowsUpStairs = this.props.heatingDataUpStairs.temperature_rows;
		var thermostatSettingUpStairs = this.props.heatingDataUpStairs.thermostatTempValue;
		var HeatingOnForUpStairs = this.props.heatingDataUpStairs.HeatingOn;

    return (
			<div>
				<table className="table table-bordered">
	        <thead>
	          <tr>
	            <th><h1><Label bsStyle="primary">DownStairs Heating Information</Label>&nbsp;</h1></th>
	          </tr>
	        </thead>
	        <tbody>
	        	<tr>
		        	<td><HomeAutoHeatingGrids 
			        		currentTemp={currentTempDownStairs} 
			        		HeatingOptions={graphOptionsDownStairs} 
			        		heatingColumns={graphColumns} 
			        		heatingRows={graphRowsDownStairs} 
			        		thermostatCurrentValue={thermostatSettingDownStairs} 
			        		HeatingOnForThisArea={HeatingOnForDownStairs} 
			        		changeTempHandler={this.props.changeTempHandler}
			        		turnHeatingOnHandler={this.props.turnHeatingOnHandler} 
			        		turnHeatingOffHandler={this.props.turnHeatingOffHandler}
			        	/>
		        	</td>
	        	</tr>
	        </tbody>
	      </table>
	      <table className="table2 table-bordered">
	        <thead>
	          <tr>
	            <th><h1><Label bsStyle="primary">UpStairs Heating Information</Label>&nbsp;</h1></th>
	          </tr>
	        </thead>
	        <tbody>
	        	<tr>
		        	<td><HomeAutoHeatingGrids 
			        		currentTemp={currentTempUpStairs} 
			        		HeatingOptions={graphOptionsUpStairs} 
			        		heatingColumns={graphColumns} 
			        		heatingRows={graphRowsUpStairs} 
			        		thermostatCurrentValue={thermostatSettingUpStairs} 
			        		HeatingOnForThisArea={HeatingOnForUpStairs}
			        		changeTempHandler={this.props.changeTempHandler}
			        		turnHeatingOnHandler={this.props.turnHeatingOnHandler} 
			        		turnHeatingOffHandler={this.props.turnHeatingOffHandler}
		        		/>
		        	</td>
	        	</tr>
	        </tbody>
	      </table>
			</div>
    ); // return
  } // render
}); // HomeAutoTableContainer


var HeatingDashboard = React.createClass({
	componentDidMount : function() {
    var pDS = apiHeating.getHeatingDataDownStairs();
    localStorage.clear();
    pDS.then( response => { 
      localStorage.setItem('temperatureDataDownStairs', JSON.stringify(response)) ;
      this.setState({}) ;    
    });
    var pUS = apiHeating.getHeatingDataUpStairs();
    pUS.then( response => { 
      localStorage.setItem('temperatureDataUpStairs', JSON.stringify(response)) ;
      this.setState({}) ;    
    });
  },

  turnHeatingOnRequest : function(area) {
    console.log("Calling the turnHeatingOnRequest callback function..." + area);
  }, // turnHeatingOnRequest

  turnHeatingOffRequest : function(area) {
    console.log("Calling the turnHeatingOffRequest callback function..." + area);
  }, // turnHeatingOffRequest

  modifyTemperatureRequest : function(area) {
    console.log("Calling the modifyTemperatureSetPointRequest callback function..." + area);
  }, // modifyTemperatureSetPointRequest
	
  render: function(){
    console.log('heatingDashBoard.js->HeatingDashboard->render()');
    var convertedDefaultData = JSON.stringify(defaultTemperatureData);
    var defaultTempData = JSON.parse(convertedDefaultData);
    var heatingDataDownStairs = localStorage.getItem('temperatureDataDownStairs') ? JSON.parse(localStorage.getItem('temperatureDataDownStairs')) : defaultTempData;
    var heatingDataUpStairs = localStorage.getItem('temperatureDataUpStairs') ? JSON.parse(localStorage.getItem('temperatureDataUpStairs')) : defaultTempData ;

    return (
			<div>
				<HomeAutoPageHeader />
				<HomeAutoTableContainer 
					heatingDataDownStairs={heatingDataDownStairs} 
					heatingDataUpStairs={heatingDataUpStairs} 
					changeTempHandler={this.modifyTemperatureRequest}
      		turnHeatingOnHandler={this.turnHeatingOnRequest} 
      		turnHeatingOffHandler={this.turnHeatingOffRequest}
				/>
			</div>
    ); // return
  } // render
}); // HeatingDashboard


export default HeatingDashboard;
