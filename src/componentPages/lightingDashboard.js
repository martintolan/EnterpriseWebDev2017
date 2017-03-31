//----------------------------------------------------------------------------
// lightingDashboard.js
// View containing all of the information and data structures for the lighting
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
    console.log('lightingDashboard.js->HomeAutoPageHeader->render()');

    return (
			<div>
				<PageHeader>Lighting Control <small>Use this page to monitor and control the lighting elements in your home. </small></PageHeader>
			</div>
    ); // return
  } // render()
}; // class - HomeAutoPageHeader


//----------------------------------------------------------------------------
//
// Main class responsible for the Lighting Controls View
// Parent to all of the items displayed in this page view.
//
//----------------------------------------------------------------------------
class LightingDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useStubAPI: globalsVars.useStubAPI
    };   
  }  

  componentWillMount() {
    console.log('lightingDashboard.js->LightingDashboard->componentWillMount() - Clearing Local Storage');
    //localStorage.clear();    
  }

  render() {
    console.log('lightingDashboard.js->LightingDashboard->render()');

    return (
			<div>
				<HomeAutoPageHeader />
			</div>
    ); // return
  } // render()
}; // class - LightingDashboard


export default LightingDashboard;