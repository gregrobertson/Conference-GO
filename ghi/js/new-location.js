console.log(`Testing Shit Out Motha Fucka!`)

window.addEventListener('DOMContentLoaded', async () => {

    const url = "http://localhost:8000/api/states/"

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        console.log(data);

        const selectTag = document.getElementById('state')

        for (let state of data.states) {
            const option = document.createElement('option')
        }
    }
})