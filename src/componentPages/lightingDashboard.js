//----------------------------------------------------------------------------
// lightingDashboard.js
// View containing all of the information and data structures for the lighting
// aspects of the Home Automation Application. 
//----------------------------------------------------------------------------
import React from 'react';
import globalsVars from './../config/globals';
import HomeAutoPageHeader from './HAS_pageheader';

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
  }// constructor()

  componentWillMount() {
    console.log('lightingDashboard.js->LightingDashboard->componentWillMount()');

  }// componentWillMount()

  render() {
    console.log('lightingDashboard.js->LightingDashboard->render()');

    return (
			<div>
				<HomeAutoPageHeader HeaderText='Lighting Control ' SmallText='Use this page to monitor and control the lighting elements in your home. '/>
			</div>

    ); // return
  } // render()
}; // class - LightingDashboard


export default LightingDashboard;
