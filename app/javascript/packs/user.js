BASE_URL = `http://localhost:3000`;
RELATIONSHIP_URL = `${BASE_URL}/relationships`

window.addEventListener("DOMContentLoaded", () => {

    let followButton = document.getElementsByClassName("follow_button")[0]

    const addRelationshipButtonListener = () => {
        if (followButton.textContent == "Follow User") {
            followButton.addEventListener("click", () => followUser())
        } else if (followButton.textContent == "Unfollow User") {
            followButton.addEventListener("click", () => unfollowUser())
        }
    }
    
    const followUser = () => {
        return fetch(`${RELATIONSHIP_URL}`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true 
            },
            "body": JSON.stringify({
                id: event.target.id
            })
        }).then(resp => resp.json())
          .then(() => handleFollowUser())
    }

    const unfollowUser = () => {
        return fetch(`${RELATIONSHIP_URL}`, {
            "method": "PATCH",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true 
            },
            "body": JSON.stringify({
                id: event.target.id
            })
        }).then(resp => resp.json())
          .then(() => handleUnfollowUser())
    }

    const handleFollowUser = () => {
        renderIncreasedFollowerCount();
        renderUnfollowButton();
    }

    const handleUnfollowUser = () => {
        renderDescreasedFollowerCount();
        renderFollowButton();
    }

    const renderIncreasedFollowerCount = () => {
        const followerCount = document.getElementsByClassName("metric")[1];
        followerCount.textContent = (parseInt(followerCount.textContent) + 1);
    }

    const renderDescreasedFollowerCount = () => {
        const followerCount = document.getElementsByClassName("metric")[1];
        followerCount.textContent = (parseInt(followerCount.textContent) - 1);
    }

    const renderUnfollowButton = () => {
        let unfollowButton = createNewButton("unfollow")
        appendNewButton(unfollowButton)
    }

    const renderFollowButton = () => {
        let followButton = createNewButton("follow")
        appendNewButton(followButton)
    }

    const createNewButton = (type) => {
        let newFollowButton = document.createElement("button")
        newFollowButton.setAttribute("class", "follow_button")
        newFollowButton.setAttribute("id", followButton.id)
        if (type == "unfollow") {
            newFollowButton.textContent = "Unfollow User"
        } else if (type == "follow") {
            newFollowButton.textContent = "Follow User"
        }
        return newFollowButton
    }

    const appendNewButton = (button) => {
        if (button.textContent == "Unfollow User") {
            button.addEventListener("click", () => unfollowUser())
        } else if (button.textContent == "Follow User") {
            button.addEventListener("click", () => followUser())
        }

        followButton.remove()
        followButton = button
        let followRow = document.getElementsByClassName("profile-row-5")[0]
        followRow.appendChild(button)
    }

    addRelationshipButtonListener();
       
})