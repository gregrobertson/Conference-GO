function createCard(name, description, pictureUrl) {
    return `
      <div>
      <div class="shadow p-3 mb-5 bg-body rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
        </div>
        <div id="footer">${date}</div>
        </div>
      </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Figure out what to do when the response is bad
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
                    const date = details.conference.starts
                    console.log(date)
                    const html = createCard(name, description, pictureUrl, date);

                    const column = document.querySelector('.row');
                    column.innerHTML += html;
                }
            }

        }
    } catch (e) {
        console.error(e);
    }

});