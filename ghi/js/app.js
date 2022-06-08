function createCard(name, description, pictureUrl, start, end, location) {
    return `
      <div>
      <div class="shadow p-3 mb-5 bg-body rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
          <div class="card-footer">${start}-${end}</div>
          
        </div>
        </div>
      </div>
    `;
}

function showError() {
    return `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Holy guacamole!</strong> CHECK YOUR URLs.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/dfghhdfgh';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const alertHtml = showError();
            const alert = document.querySelector('.row');
            alert.innerHTML += alertHtml;
        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    console.log(details)
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const start = new Date(details.conference.starts).toDateString()
                    const end = new Date(details.conference.ends).toDateString()
                    const location = details.conference.location.name
                    console.log(location)
                    const html = createCard(name, description, pictureUrl, start, end, location);

                    const column = document.querySelector('.row');
                    column.innerHTML += html;
                }
            }

        }
    } catch (e) {
        console.error(e);
    }

});