import React from "react";

class ConferenceForm extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Create a new conference</h1>
                            <form id="create-conference-form">
                                <div className="form-floating mb-3">
                                    <input placeholder="Name" required type="text" name="name" id="name"
                                        className="form-control" />
                                    <label for="name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input placeholder="Starts" required type="date" name="starts" id="starts"
                                        className="form-control" />
                                    <label for="name">Starts</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input placeholder="Ends" required type="date" name="ends" id="ends"
                                        className="form-control" />
                                    <label for="ends">Ends</label>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" id="max_presentations" name="max_presentations" min="1" max="100"
                                        className="form-control" />
                                    <label for="max_presentations">Maximum Presentations</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" id="max_attendees" name="max_attendees" min="1" max="1000"
                                        className="form-control" />
                                    <label for="max_attendees">Maximum attendees</label>
                                </div>
                                <div className="mb-3">
                                    <select required id="location" name="location" className="form-select">
                                        <option selected value="">Choose a location</option>
                                    </select>
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}