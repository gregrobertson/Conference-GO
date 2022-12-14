import React from 'react';
import Nav from './Nav';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeesList from './AttendeesList';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container-fluid">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="attendees">
            <Route path="new" element={<AttendConferenceForm />} />
          </Route>
          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="presentations">
            <Route path="new" element={<PresentationForm />} />
          </Route>
          <Route path="attendees">
            <Route path="" element={<AttendeesList attendees={props.attendees} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
