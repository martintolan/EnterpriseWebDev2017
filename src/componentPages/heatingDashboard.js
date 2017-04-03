//----------------------------------------------------------------------------
// heatingDashboard.js
// View containing all of the information and data structures for the heating
// aspects of the Home Automation Application. 
//----------------------------------------------------------------------------
import React from 'react';
import globalsVars from './../config/globals';
import HomeAutoPageHeader from './HAS_pageheader';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Label from 'react-bootstrap/lib/Label';
import { Chart } from 'react-google-charts';
import Thermometer from "react-thermometer";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import APIHeatingStub from './../test/stubAPIHeating';
import APIHeating from './../api/HeatingAPI';
import defaultTemperatureData from './../config/defaultData';


//------------------------------------------------------
//
// Thermometer widget that will show the current 
// temperature. 
//
//------------------------------------------------------
class HomeAutoThometer extends React.Component {
  render() {
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
  } // render()
}; // class - HomeAutoThometer


//------------------------------------------------------
//
// Graphing widget that can be used to plot temperature 
// against time. All vaues required for this graph are 
// passed in through the props. 
//
//------------------------------------------------------
class HomeAutoGraph extends React.Component {	
  render() {
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
  } // render()
}; // class - HomeAutoGraph


//------------------------------------------------------
//
// Slider control used to select the desired temperature.
// Takes the current setpoint from the parent and wets its 
// own state to it so that it can persist across slider 
// movement events.
//
//------------------------------------------------------
class HomeAutoTempSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heatingIdentifier: '',
      setPoint: -1
    };
    this.handleTemperatureRequestChange = this.handleTemperatureRequestChange.bind(this);
    this.handleTemperatureRequestComplete = this.handleTemperatureRequestComplete.bind(this);
  }// constructor()

  componentWillMount() {
    console.log('heatingDashBoard.js->HomeAutoTempSlider->componentWillMount()');
  	this.setState({ heatingIdentifier: this.props.heatingIdentifier });
  	this.setState({ setPoint: this.props.setPoint });
  }

  handleTemperatureRequestChange(value) {
  	console.log('handleTemperatureRequestChange event...');
    this.setState({ setPoint: value });
  }

  handleTemperatureRequestComplete(value) {
  	var requestedTemperature = this.state.setPoint;
  	console.log('handleTemperatureRequestComplete event...' + requestedTemperature);
    this.props.changeTempHandler(this.state.heatingIdentifier, requestedTemperature);
  }

  render(){
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
  } // render()
}; // class - HomeAutoTempSlider


//------------------------------------------------------
//
// Button control used to turn on and off the heating 
// for a floor. Props contains the state of the heating 
// for each floor and also the callback used to trigger 
// the on-off request back to the parent. 
//
//------------------------------------------------------
class HomeAutoHeatingOnOffButtons extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      heatingIdentifier: '',
      heatingOn: false
    };
    this.handleTurnHeatingOn = this.handleTurnHeatingOn.bind(this);
    this.handleTurnHeatingOff = this.handleTurnHeatingOff.bind(this);
  }// constructor()

  componentWillMount() {
  	this.setState({ heatingOn: this.props.heatingState });
  	this.setState({ heatingIdentifier: this.props.heatingIdentifier });
  }

  handleTurnHeatingOn(e) {
    console.log("TurnHeatingOn button pressed for: " + this.state.heatingIdentifier);
    e.preventDefault();

    if(false === this.state.heatingOn) {
    	console.log("Turning the Heating ON for the " + this.state.heatingIdentifier);
    	this.props.turnHeatingOnHandler(this.state.heatingIdentifier);
    	this.setState({ heatingOn: true });
    }
  } // handleTurnHeatingOn

  handleTurnHeatingOff(e) {
    console.log("TurnHeatingOff button pressed for: " + this.state.heatingIdentifier);
    e.preventDefault();

    if(true === this.state.heatingOn) {
    	console.log("Turning the Heating OFF for the " + this.state.heatingIdentifier);
    	this.props.turnHeatingOffHandler(this.state.heatingIdentifier);
    	this.setState({ heatingOn: false });
    }
  } // handleTurnHeatingOff


  render(){
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

		if (false === this.state.heatingOn ) {
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
  } // render()
}; // class - HomeAutoHeatingOnOffButtons


//------------------------------------------------------
//
// Grid control that houses all of the individual items 
// for the heating information for a particular floor
// based on the props passed into it.
//
//------------------------------------------------------
class HomeAutoHeatingGrids extends React.Component{

  render(){
    console.log('heatingDashBoard.js->HomeAutoHeatingGrids->render()');

    var titleForThisArea = this.props.titleForThisArea;
    var currentFloorTemp = this.props.currentTemp;
    var graphOptions = this.props.HeatingOptions;
    var graphColumns = this.props.heatingColumns;
    var graphRows = this.props.heatingRows;
    var thermostatSetting = this.props.thermostatCurrentValue;
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
	            <HomeAutoGraph title={titleForThisArea} options={graphOptions} columns={graphColumns} rows={graphRows}/>
	          }</Col>
	        </Row>

	        <Row className="show-grid">
	          <Col md={6} mdPush={6}>
	          {            
	            <HomeAutoHeatingOnOffButtons 
	            	heatingState={heatingOn} 
	            	heatingIdentifier={titleForThisArea} 
	            	turnHeatingOnHandler={this.props.turnHeatingOnHandler} 
	            	turnHeatingOffHandler={this.props.turnHeatingOffHandler}
	            />
	          }</Col>

	          <Col md={6} mdPull={6}>{
	            <HomeAutoTempSlider 
	            	heatingIdentifier={titleForThisArea} 
	            	setPoint={thermostatSetting} 
	            	changeTempHandler={this.props.changeTempHandler}
	            />
	          }</Col>
	        </Row>
	      </Grid>
			</div>
    ); // return
  } // render()
}; // class - HomeAutoHeatingGrids


//------------------------------------------------------
//
// Table control that builds the structure of the house 
// to be monitored. Reads the information from the API 
// and builds each of the children components with the 
// appropriate data. As the children are generic and
// stateless components they can be reused multiple times.
//
//------------------------------------------------------
class HomeAutoTableContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      upstairsHeatingOptions: { 
        legend: true, 
        title: 'Temperature - Upstairs',
        hAxis: { title: 'Time' }, 
        vAxis: { title: 'Temperature' } 
      },
      downstairsHeatingOptions: { 
        legend: true, 
        title: 'Temperature - Downstairs',
        hAxis: { title: 'Time' }, 
        vAxis: { title: 'Temperature' } 
      },
      heatingColumns: [
        {
          label: 'Time',
          type: 'string',
        },
        {
          label: 'Temperature',
          type: 'number',
        },
      ]
    };
  }// constructor()

  render(){
    console.log('heatingDashBoard.js->HomeAutoTableContainer->render()');    
		var currentTempDownStairs = this.props.dataDownStairs.currentTemp;
		var graphOptionsDownStairs = this.state.downstairsHeatingOptions;
		var graphColumns = this.state.heatingColumns;
		var graphRowsDownStairs = this.props.dataDownStairs.temperature_rows;
		var thermostatSettingDownStairs = this.props.dataDownStairs.thermostatTempValue;
		var HeatingOnForDownStairs = this.props.dataDownStairs.HeatingOn;
    var titleForDownStairs = this.props.dataDownStairs.title;

		var currentTempUpStairs = this.props.dataUpStairs.currentTemp;
		var graphOptionsUpStairs = this.state.upstairsHeatingOptions;
		var graphRowsUpStairs = this.props.dataUpStairs.temperature_rows;
		var thermostatSettingUpStairs = this.props.dataUpStairs.thermostatTempValue;
		var HeatingOnForUpStairs = this.props.dataUpStairs.HeatingOn;
    var titleForUpStairs = this.props.dataUpStairs.title;

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
                  titleForThisArea={titleForDownStairs} 
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
                  titleForThisArea={titleForUpStairs} 
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
  } // render()
}; // class - HomeAutoTableContainer


//----------------------------------------------------------------------------
//
// Main class responsible for the Heating Controls View
// Parent to all of the items displayed in this page view.
//
//----------------------------------------------------------------------------
class HeatingDashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      useStubAPI: globalsVars.useStubAPI,
      apiToUse: null
    };
    this.turnHeatingOnRequest = this.turnHeatingOnRequest.bind(this);
    this.turnHeatingOffRequest = this.turnHeatingOffRequest.bind(this);
    this.modifyTemperatureRequest = this.modifyTemperatureRequest.bind(this);
  }// constructor()

  componentWillMount() {
    console.log('heatingDashBoard.js->HeatingDashboard->componentWillMount() - Clearing Local Storage');
    if(false === this.state.useStubAPI) {
      this.setState({ apiToUse: new APIHeating() });
    }
    else {
      this.setState({ apiToUse: new APIHeatingStub() });
    }
    //localStorage.clear();
  }

  componentDidMount() {
    if((!localStorage.getItem('DownStairsTemperatureData')) || (!localStorage.getItem('UpStairsTemperatureData')))
    {
      var p = this.state.apiToUse.getHeatingDataDownStairs();
      p.then( response => { 
        localStorage.deleteItem('DownStairsTemperatureData');
        localStorage.setItem('DownStairsTemperatureData', response);
        var p2 = this.state.apiToUse.getHeatingDataUpStairs();
        p2.then( response => { 
          localStorage.deleteItem('UpStairsTemperatureData');
          localStorage.setItem('UpStairsTemperatureData', response) ;
          this.setState({});
        });
      });
    }
  }
  
  
  turnHeatingOnRequest(area) {
    console.log("Calling the turnHeatingOnRequest callback function..." + area);
    this.state.apiToUse.switchHeating(area, 1).then ( response => {
    }).catch( error => {console.log( 'Update failed for ${error}' )}) ;

  } // turnHeatingOnRequest

  turnHeatingOffRequest(area) {
    console.log("Calling the turnHeatingOffRequest callback function..." + area);
    this.state.apiToUse.switchHeating(area, 0).then ( response => {
    }).catch( error => {console.log( 'Update failed for ${error}' )}) ;
  } // turnHeatingOffRequest

  modifyTemperatureRequest(area, value) {
    console.log("Calling the modifyTemperatureSetPointRequest callback function..." + area);
    this.state.apiToUse.updateHeatingSetPoint(area, value).then ( response => {
    }).catch( error => {console.log( 'Update failed for ${error}' )}) ;
  } // modifyTemperatureSetPointRequest
	
  render(){
    console.log('heatingDashBoard.js->HeatingDashboard->render()');
    var convertedDefaultData = JSON.stringify(defaultTemperatureData);
    var defaultTempData = JSON.parse(convertedDefaultData);

    var heatingDataDownStairs = localStorage.getItem('DownStairsTemperatureData') ? JSON.parse(localStorage.getItem('DownStairsTemperatureData')) : defaultTempData;
    var heatingDataUpStairs = localStorage.getItem('UpStairsTemperatureData') ? JSON.parse(localStorage.getItem('UpStairsTemperatureData')) : defaultTempData ;
    console.log('---> heatingDataDownStairs: ' + JSON.stringify(heatingDataDownStairs));
    console.log('---> heatingDataUpStairs: ' + JSON.stringify(heatingDataUpStairs));

    return (
			<div>
				<HomeAutoPageHeader HeaderText='Heating Control ' SmallText='Use this page to monitor and control the heating elements in your home. '/>/>
				<HomeAutoTableContainer 
					dataDownStairs={heatingDataDownStairs} 
					dataUpStairs={heatingDataUpStairs} 
					changeTempHandler={this.modifyTemperatureRequest}
      		turnHeatingOnHandler={this.turnHeatingOnRequest} 
      		turnHeatingOffHandler={this.turnHeatingOffRequest}
				/>
			</div>
    ); // return
  } // render()
}; // class - HeatingDashboard


export default HeatingDashboard;
