window.addEventListener("DOMContentLoaded", () => {
    BASE_URL = `http://localhost:3000`

    const renderPage = () => {
        let postFeed = document.getElementsByClassName("posts")[0]
        let userFeed = document.getElementsByClassName("user-profile")[0]
        if (!!postFeed) {
            renderPostFeed()
        } else if (!!userFeed) {
            renderUserFeed()
        }
    }

    let renderPostFeed = async () => {
        let response = await fetch(`${BASE_URL}/users/1/feed`);
        let results = await response.json()
        for (let i=0; i<results.length; i++){
            let postResponse = await fetch(`${BASE_URL}/posts/${results[i].id}`);
            let postResults = await postResponse.json();
            renderPost(postResults)
        }
    }
    //https://medium.com/@imorobebh/javascript-fetch-synchronous-or-asynchronous-fd24f8ba6129

    const renderPost = (postData) => {
        let posts = document.getElementsByClassName("posts")[0]
        let postContainer = createObject("div", "post", posts)
        let postBanner = createObject("div", "post-banner", postContainer)
        let userAvatarContainer = createObject("div", "user-avatar", postBanner)
        let avatar = createImage(postData.user.avatar, "", userAvatarContainer)
        let usernameContainer = createObject("div", "post-username", postBanner)
        let username = createObject("p", "", usernameContainer, `${postData.user.username}`)
        let imageContainer = createObject("div", "post-image", postContainer)
        let image = createImage(`${postData.post.image_url}`, "main-image", imageContainer)
        let postGlyphs = createObject("div", "post-glyphs", postContainer)
        let glyphsContainer = createObject("div", "glyphs-container", postGlyphs)
        let heart = createHeartObject(postData, glyphsContainer)
        heart.addEventListener("click", () => handleToggleHeart(postData))
        let comment = createObject("i", "fa fa-comment-o", glyphsContainer)
        let likesContainer = createObject("div", "post-likes", postContainer)
        let likes_count = createObject("div", "", likesContainer, `${postData.likes.likes_count} likes`)
        let descriptionContainer = createObject("div", "post-description", postContainer)
        let description = createObject("p", "", descriptionContainer)
        description.innerHTML = `<strong>${postData.user.username}</strong> ${postData.post.description}`
    }

    const createHeartObject = (postData, parentObject) => {
        let userAlreadyLikes = postData.post.current_user_likes;
        if (userAlreadyLikes) {
            return createObject("i", "fa fa-heart", parentObject, "", "red")
        } else {
            return createObject("i", "fa fa-heart-o", parentObject)
        }
    }

    const createObject = (objectTag, classname, parentObject, text, color) => {
        let object = document.createElement(objectTag)
        object.setAttribute("class", classname)
        object.textContent = text
        object.style.color = color
        parentObject.appendChild(object)
        return object
    }

    const createImage = (src, classname, parentObject) => {
        let image = document.createElement("img");
        image.setAttribute("src", src);
        image.setAttribute("class", classname);
        parentObject.appendChild(image);
        return image
    }

    const handleToggleHeart = (postData) => {
        //this could be based on whether user already likes the post?
        if (event.target.style.color == "red") {
            event.target.className = "fa fa-heart-o"
            event.target.style.color = ""
            unlikePost(postData)
        } else {
            event.target.className = "fa fa-heart"
            event.target.style.color = "red"
            likePost(postData)
        }
    }

    const likePost = (postData) => {
        return fetch(`${BASE_URL}/posts/${postData.post.id}`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                post_id: postData["post"]["id"]
            })
        })
        .then(resp => resp.json())
        .then(console.log("Hello"))
    }

    const unlikePost = (postData) => {

    }

    renderPage();
})