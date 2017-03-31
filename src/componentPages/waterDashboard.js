//----------------------------------------------------------------------------
// waterDashboard.js
// View containing all of the information and data structures for the water
// aspects of the Home Automation Application. 
//----------------------------------------------------------------------------
import React from 'react';
import globalsVars from './../config/globals';
import PageHeader from 'react-bootstrap/lib/PageHeader';


//------------------------------------------------------
//
// Page header control used to summarise the functionality.
//
//------------------------------------------------------
class HomeAutoPageHeader extends React.Component {
  render() {
    console.log('waterDashboard.js->HomeAutoPageHeader->render()');

    return (
			<div>
				<PageHeader>Water Control <small>Use this page to monitor and control the water elements in your home. </small></PageHeader>
			</div>
    ); // return
  } // render()
}; // class - HomeAutoPageHeader


class WaterDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useStubAPI: globalsVars.useStubAPI
    };   
  }  

  componentWillMount() {
    console.log('waterDashboard.js->WaterDashboard->componentWillMount() - Clearing Local Storage');
    //localStorage.clear();    
  }

  render(){
    console.log('waterDashboard.js->WaterDashboard->render()');

    return (
			<div>
				<HomeAutoPageHeader />
			</div>
    ); // return
  } // render()
}; // class - WaterDashboard


export default WaterDashboard;