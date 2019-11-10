BASE_URL = `http://localhost:3000`;

window.addEventListener("DOMContentLoaded", () => {
    
    const renderPage = () => {
        let posts = document.getElementsByClassName("posts")[0]
        if (!!posts) {
            getPosts()
        } else {
            console.log("Nope")
        }
    }

    const getPosts = () => {
        return fetch(`${BASE_URL}/posts/3`)
        .then(resp => resp.json())
        // .then(console.log)
        .then(postData => renderPost(postData))
    }
    const renderPost = (postData) => {
        debugger;
        let posts = document.getElementsByClassName("posts")[0]
        let postContainer = document.createElement("div")
        postContainer.className = "post"
        posts.appendChild(postContainer)

        let postBanner = document.createElement("div")
        postBanner.className = "post-banner"
        postContainer.appendChild(postBanner)

        let userAvatarContainer = document.createElement("div")
        userAvatarContainer.className = "user-avatar"
        postBanner.appendChild(userAvatarContainer)
    
        let avatar = document.createElement("img")
        avatar.setAttribute("src", postData.post.image_url)
        userAvatarContainer.appendChild(avatar)
    }

    renderPage();

})