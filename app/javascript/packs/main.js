BASE_URL = `http://localhost:3000`;
RELATIONSHIP_URL = `${BASE_URL}/relationships`

window.addEventListener("DOMContentLoaded", () => {
    const followButton = document.getElementsByClassName("follow_button")[0]
    
    followButton.addEventListener("click", () => followUser())

    // const handleFollowUser = () => {
    //     return fetch(`${BASE_URL}/`)
    // }
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
              .then((data) => renderFollowers(data))
    }

    const renderFollowers = (data) => {
        const followerCount = document.getElementsByClassName("metric")[1];
        followerCount.textContent = parseInt(followerCount.textContent) + 1;
    }
       
})