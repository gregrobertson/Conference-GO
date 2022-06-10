// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get('jwt_access_payload')
if (payloadCookie) {
    // The cookie value is a JSON-formatted string, so parse it
    const encodedPayload = JSON.parse(payloadCookie.value);

    // Convert the encoded payload from base64 to normal string
    const decodedPayload = atob(encodedPayload);

    // The payload is a JSON-formatted string, so parse it
    const payload = JSON.parse(decodedPayload);


    // Print the payload
    const perms = payload.user.perms
    // console.log(perms);

    const confNav = document.getElementById('new-conference')
    const presNav = document.getElementById('new-presentation')
    const locNav = document.getElementById('new-location')
    console.log(perms);
    // Check if "events.add_conference" is in the permissions.
    // If it is, remove 'd-none' from the link
    if (perms.includes("events.add_conference")) {
        confNav.classList.remove("d-none")
    }

    if (perms.includes("events.add_location")) {
        locNav.classList.remove("d-none")

    }

    if (perms.includes("presentations.add_presentation")) {
        presNav.classList.remove("d-none")

    }


    // Check if "events.add_location" is in the permissions.
    // If it is, remove 'd-none' from the link

}