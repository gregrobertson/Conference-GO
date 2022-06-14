
import React from "react";

class LocationForm extends React.Component {
    constructor(props) {
        super(props)
        // Setting Deafualt Value for each inout field in form -------------->
        this.state = {
            name: '',
            roomCount: '',
            city: '',
            states: []
        }
        //-------------------------------------------------------------------->
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleCityChange = this.handleCityChange.bind(this)
        this.handleRoomCountChange = this.handleRoomCountChange.bind(this)
        this.handleStateChange = this.handleStateChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    //Updating the component state with what you type/input into the form--->
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }
    handleCityChange(event) {
        const value = event.target.value;
        this.setState({ city: value })
    }
    handleRoomCountChange(event) {
        const value = event.target.value;
        this.setState({ roomCount: value })
    }
    handleStateChange(event) {
        const value = event.target.value;
        this.setState({ state: value })
    }
    //----------------------------------------------------------------------->
    //--Handling how the form is submitted----------------------------------->
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        /* Changing the format so that the request to the server matches what the server recieves */
        data.room_count = data.roomCount;
        delete data.roomCount;
        delete data.states;
        console.log(data);

        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newLocation = await response.json();
            console.log(newLocation);

            // Clearing the form after submission----------------->
            const cleared = {
                name: '',
                roomCount: '',
                city: '',
                state: '',
            }
            this.setState(cleared)
            //----------------------------------------------------->
        }
    }

    async componentDidMount() {

        const url = "http://localhost:8000/api/states/"

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            this.setState({ states: data.states })

        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Create a new location</h1>
                            <form onSubmit={this.handleSubmit} id="create-location-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name"
                                        className="form-control" />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleRoomCountChange} value={this.state.roomCount} placeholder="Room count" required type="number" name="room_count" id="room_count"
                                        className="form-control" />
                                    <label htmlFor="room_count">Room count</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleCityChange} value={this.state.city} placeholder="City" required type="text" name="city" id="city"
                                        className="form-control" />
                                    <label htmlFor="city">City</label>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleStateChange} value={this.state.state} required id="state" name="state" className="form-select">
                                        <option>Choose a state</option>
                                        {this.state.states.map(state => {
                                            return (
                                                <option key={state.abbreviation} value={state.abbreviation}>
                                                    {state.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LocationForm;
