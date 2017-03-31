//----------------------------------------------------------------------------
// contactView.js
// View containing all of the information for the contact view
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
    console.log('contactView.js->HomeAutoPageHeader->render()');

    return (
			<div>
				<PageHeader>Contact... <small>Contact Page for the Home Automation App. </small></PageHeader>
			</div>
    ); // return
  } // render()
}; // class - HomeAutoPageHeader


class ContactView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useStubAPI: globalsVars.useStubAPI
    };   
  }  

  componentWillMount() {
    console.log('contactView.js->ContactView->componentWillMount() - Clearing Local Storage');
    //localStorage.clear();    
  }

  render(){
    console.log('contactView.js->ContactView->render()');

    return (
			<div>
				<HomeAutoPageHeader />
			</div>
    ); // return
  } // render()
}; // class - contactView


export default ContactView;