//----------------------------------------------------------------------------
// aboutView.js
// View containing all of the information for the about view
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
    console.log('aboutView.js->HomeAutoPageHeader->render()');

    return (
			<div>
				<PageHeader>About... <small>About Page for the Home Automation App. </small></PageHeader>
			</div>
    ); // return
  } // render()
}; // class - HomeAutoPageHeader


class AboutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useStubAPI: globalsVars.useStubAPI
    };   
  }  

  componentWillMount() {
    console.log('aboutView.js->AboutView->componentWillMount() - Clearing Local Storage');
    //localStorage.clear();    
  }

  render(){
    console.log('aboutView.js->AboutView->render()');

    return (
			<div>
				<HomeAutoPageHeader />
			</div>
    ); // return
  } // render()
}; // class - AboutView


export default AboutView;