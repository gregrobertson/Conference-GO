import React from 'react';
import Nav from './Nav';
import LocationForm from './LocationForm';
// import AttendeesList from './AttendeesList';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <React.Fragment>
      <Nav />
      <div className="container-fluid">
        <LocationForm />
        {/* <AttendeesList attendees={props.attendees} /> */}
      </div>
    </React.Fragment>
  );
}

export default App;
