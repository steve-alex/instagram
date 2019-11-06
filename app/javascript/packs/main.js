BASE_URL = `http://localhost:3000`;
RELATIONSHIP_URL = `${BASE_URL}/relationships`

window.addEventListener("DOMContentLoaded", () => {
    const followButton = document.getElementsByClassName("follow_button")[0]
    
    followButton.addEventListener("click", () => followUser())

    const followUser = () => {
        return fetch(`${RELATIONSHIP_URL}`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            "body": JSON.stringify({
                id: event.target.id
            })
            }).then(resp => resp.json())
              .then(() => console.log)
    }
       
})