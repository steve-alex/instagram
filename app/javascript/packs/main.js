window.addEventListener("DOMContentLoaded", () => {

    const renderPage = () => {
        let postFeed = document.getElementsByClassName("posts")[0]
        let userFeed = document.getElementsByClassName("user-profile")[0]
        if (!!postFeed) {
            renderPostFeed()
        } else if (!!userFeed) {
            renderUserFeed()
        }
    }

    const renderPostFeed = () => {
        getUsersPostFeed()
        .then(postData => postData.forEach(post => renderPost(post)))
    }

    let getUsersPostFeed = async () => {
        let response = await fetch(`http://localhost:3000/users/1/feed`);
        let results = await response.json()
        let posts = []
        for (let i=0; i<results.length; i++){
            let res = await fetch(`http://localhost:3000/posts/${results[i].id}`);
            let secondRes = await res.json();
            posts.push(secondRes)
        }
        return posts
    }
    //https://medium.com/@imorobebh/javascript-fetch-synchronous-or-asynchronous-fd24f8ba6129

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
        heart.setAttribute("class", "fa fa-heart-o")
        heart.addEventListener("click", () => toggleHeart())
        glyphsContainer.appendChild(heart)

        let comment = document.createElement("i")
        comment.setAttribute("class", "fa fa-comment-o")
        glyphsContainer.appendChild(comment)

        let likesContainer = document.createElement("div")
        likesContainer.setAttribute("class", "post-likes")
        postContainer.appendChild(likesContainer)

        let likesCount = document.createElement("p")
        likesCount.textContent = `${postData.post.likes_count} likes`
        likesContainer.appendChild(likesCount)

        let descriptionContainer = document.createElement("div")
        descriptionContainer.setAttribute("class", "post-description")
        postContainer.appendChild(descriptionContainer)

        let description = document.createElement("p")
        description.innerHTML = `<strong>${postData.user.username}</strong> ${postData.post.description}`
        descriptionContainer.appendChild(description)
    }

    const toggleHeart = () => {
        if (event.target.style.color == "red") {
            event.target.className = "fa fa-heart-o"
            event.target.style.color = ""
        } else {
            event.target.className = "fa fa-heart"
            event.target.style.color = "red"
        }
    }

    const createObject = (objectTag, classname, parentObject) => {
        let object = document.createElement(objectTag)
        object.setAttribute("class", classname)
        parentObject.appendChild(object)
        return object
    }

    renderPage();
})