import React from 'react';
import Nav from './Nav';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeesList from './AttendeesList';
import AttendConferenceForm from './AttendConferenceForm';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <React.Fragment>
      <Nav />
      <div className="container-fluid">
        <AttendConferenceForm />
        {/* <ConferenceForm /> */}
        {/* <LocationForm /> */}
        {/* <AttendeesList attendees={props.attendees} /> */}
      </div>
    </React.Fragment>
  );
}

export default App;
