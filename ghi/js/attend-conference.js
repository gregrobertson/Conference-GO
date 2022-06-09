window.addEventListener('DOMContentLoaded', async () => {

    // Get the attendee form element by its id
    const selectTag = document.getElementById('conference');
    const loadingTag = document.getElementById('loading-conference-spinner');
    const formTag = document.getElementById('create-attendee-form')
    const successTag = document.getElementById('success-message')


    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();

        for (let conference of data.conferences) {
            const option = document.createElement('option');
            option.value = conference.href;
            console.log(option.value)
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }

        loadingTag.classList.add("d-none")
        selectTag.classList.remove("d-none")

        formTag.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            console.log(json);
            const attendeesUrl = 'http://localhost:8001/api/attendees/';
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(attendeesUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newAttendees = await response.json();
                console.log(newAttendees);

                formTag.classList.add("d-none")
                successTag.classList.remove("d-none")
            }

        });

    }



});