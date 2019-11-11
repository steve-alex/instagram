BASE_URL = `http://localhost:3000`;

window.addEventListener("DOMContentLoaded", () => {
    
    const renderPage = () => {
        let posts = document.getElementsByClassName("posts")[0]
        if (!!posts) {
            getUsersPostFeed()
        } else {
            console.log("Nope")
        }
    }

    const getUsersPostFeed = () => {
        return fetch(`${BASE_URL}/users/1/feed`)
        .then(resp => resp.json())
        .then(postsData => postsData.forEach(post => getPost(post)))
    }

    const getPost = (post) => {
        return fetch(`${BASE_URL}/posts/${post.id}`)
        .then(resp => resp.json())
        .then(postData => renderPost(postData))
    }

    const renderPost = (postData) => {
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
        avatar.setAttribute("src", postData.user.avatar)
        userAvatarContainer.appendChild(avatar)

        let usernameContainer = document.createElement("div")
        usernameContainer.setAttribute("class", "post-username")
        postBanner.appendChild(usernameContainer)

        let username = document.createElement("p")
        username.textContent = `${postData.user.username}`
        usernameContainer.appendChild(username)

        let imageContainer = document.createElement("div")
        imageContainer.setAttribute("class", "post-image")
        postContainer.appendChild(imageContainer)
        
        let image = document.createElement("img")
        image.setAttribute("src", `${postData.post.image_url}`)
        image.setAttribute("class", "main-image")
        imageContainer.appendChild(image)

        let postGlyphs = document.createElement("div")
        postGlyphs.setAttribute("class", "post-glyphs")
        postContainer.appendChild(postGlyphs)

        let glyphsContainer = document.createElement("div")
        glyphsContainer.setAttribute("class", "glyph-container")
        postGlyphs.appendChild(glyphsContainer)

        let heart = document.createElement("i")
        heart.setAttribute("class", "fa fa-heart")
        glyphsContainer.appendChild(heart)

        let comment = document.createElement("i")
        comment.setAttribute("class", "fa fa-comment")
        glyphsContainer.appendChild(comment)
    }

    renderPage();

})