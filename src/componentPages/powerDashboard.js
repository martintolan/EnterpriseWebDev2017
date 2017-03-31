//----------------------------------------------------------------------------
// powerDashboard.js
// View containing all of the information and data structures for the power
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
    console.log('powerDashboard.js->HomeAutoPageHeader->render()');

    return (
			<div>
				<PageHeader>Power Control <small>Use this page to monitor and control the power elements in your home. </small></PageHeader>
			</div>
    ); // return
  } // render()
}; // class - HomeAutoPageHeader


class PowerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useStubAPI: globalsVars.useStubAPI
    };   
  }  

  componentWillMount() {
    console.log('powerDashBoard.js->PowerDashboard->componentWillMount() - Clearing Local Storage');
    //localStorage.clear();    
  }

  render(){
    console.log('powerDashBoard.js->PowerDashboard->render()');

    return (
			<div>
				<HomeAutoPageHeader />
			</div>
    ); // return
  } // render()
}; // class - PowerDashboard


export default PowerDashboard;
