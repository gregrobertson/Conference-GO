import React from "react";

class PresentationForm extends React.Component {
    constructor(props) {
        super(props);
        // Setting Deafualt Value for each inout field in form -------------->
        this.state = {
            presenterName: '',
            presenterEmail: '',
            companyName: '',
            title: '',
            synopsis: '',
            conference: '',
            conferences: [],
        }

        this.handlePresenterNameChange = this.handlePresenterNameChange.bind(this)
        this.handlePresenterEmailChange = this.handlePresenterEmailChange.bind(this)
        this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleSynopsisChange = this.handleSynopsisChange.bind(this)
        this.handleConferenceChange = this.handleConferenceChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //Updating the component state with what you type/input into the form--->

    handlePresenterNameChange(event) {
        const value = event.target.value;
        this.setState({ presenterName: value })
    }
    handlePresenterEmailChange(event) {
        const value = event.target.value;
        this.setState({ presenterEmail: value })
    }
    handleCompanyNameChange(event) {
        const value = event.target.value;
        this.setState({ companyName: value })
    }
    handleTitleChange(event) {
        const value = event.target.value;
        this.setState({ title: value })
    }
    handleSynopsisChange(event) {
        const value = event.target.value;
        this.setState({ synopsis: value })
    }
    handleConferenceChange(event) {
        const value = event.target.value;
        this.setState({ conference: value })
    }
    //--Handling how the form is submitted----------------------------------->
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        /* Changing the format so that the request to the server matches what the server recieves */
        data.presenter_name = data.presenterName;
        data.presenter_email = data.presenterEmail;
        data.company_name = data.companyName;
        delete data.presenterName
        delete data.presenterEmail
        delete data.companyName
        delete data.conferences
        console.log(data);

        const href = data.conference
        delete data.conference

        const locationUrl = `http://localhost:8000${href}presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {

            const data = await response.json();
            console.log(data);
            //---------When the formns are cleared-------->
            const cleared = {
                presenterName: '',
                presenterEmail: '',
                companyName: '',
                title: '',
                synopsis: '',
                conferences: [],
            }
            this.setState(cleared)
        }
    }


    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            this.setState({ conferences: data.conferences })
        }
    }
    //-----------------class to "className" && for to "htmlFor"------------------------------------>
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Create a new presentation</h1>
                            <form onSubmit={this.handleSubmit} id="create-presentation-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handlePresenterNameChange} value={this.state.presenterName} placeholder="Presenter name" required type="text" name="presenter_name"
                                        id="presenter_name" className="form-control" />
                                    <label htmlFor="presenter_name">Presenter name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handlePresenterEmailChange} value={this.state.presenterEmail} placeholder="Presenter email" required type="email" name="presenter_email"
                                        id="presenter_email" className="form-control" />
                                    <label htmlFor="presenter_email">Presenter email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleCompanyNameChange} value={this.state.companyName} placeholder="Company name" type="text" name="company_name" id="company_name"
                                        className="form-control" />
                                    <label htmlFor="company_name">Company name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleTitleChange} value={this.state.title} placeholder="Title" required type="text" name="title" id="title"
                                        className="form-control" />
                                    <label htmlFor="title">Title</label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="synopsis" className="form-label">Synopsis</label>
                                    <textarea onChange={this.handleSynopsisChange} value={this.state.synopsis} className="form-control" name="synopsis"
                                        id="synopsis" rows="3"></textarea>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleConferenceChange} required name="conference" id="conference" className="form-select">
                                        <option>Choose a conference</option>
                                        {this.state.conferences.map(conference => {
                                            return (
                                                <option key={conference.href} value={conference.href}>
                                                    {conference.name}
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
        )
    }
}


export default PresentationForm;