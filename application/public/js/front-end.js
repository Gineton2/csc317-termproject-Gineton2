// const { execute } = require("../../config/database");

function onLoad() {
    setFlashMessageFadeOut();
    formatDates();
}

function formatDates() {
    document.querySelectorAll(".comment-date, .post-date").forEach((postedDate) => {
        postedDate.textContent =
            new Date(postedDate.textContent).toLocaleString();
    });
}

function executeSearch() {
    let searchTerm = document.getElementById("search-input").value;
    if (!searchTerm) {
        location.replace('/');
        return;
    }
    const imagePosts = document.getElementById("image-posts");
    let searchURL = `/posts/search?search=${searchTerm}`;
    fetch(searchURL)
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            let newImagePostsHTML = "";
            data_json.results.forEach((row) => {
                newImagePostsHTML += createCard(row);
            });
            imagePosts.innerHTML = newImagePostsHTML;
            formatDates();
            if (data_json.message) {
                addFlashFromFrontEnd(data_json.message);
            }
        })
}

function addMessage(data) {
    let template = document.createElement('template');
    template.innerHTML =
        `<div class="comment" id="comment-id-${data.commentId}">
            <p class="comment-author">${data.username}</p>
            <p class="comment-text">${data.comment}</p>
            <p class="comment-date">${new Date().toLocaleString()}</p>
        </div>`;
    document.getElementById("comments-container").appendChild(template.content.firstChild);
}

function addFlashFromFrontEnd(message) {
    let flashMessageDiv = document.createElement("div");
    let alertDiv = document.createElement("div");
    let innerTextNode = document.createTextNode(message);
    alertDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(alertDiv);
    flashMessageDiv.id = "flash-message";
    alertDiv.id = "alert-good";
    alertDiv.className = "alert";
    const headerElement = document.getElementsByTagName('header')[0];
    if (headerElement) {
        headerElement.insertAdjacentElement('afterend', flashMessageDiv);
    } else {
        document.body.insertBefore(flashMessageDiv, document.body.firstChild);
    }
    setFlashMessageFadeOut();
}

function createCard(postData) {
    return `<div id="post-${postData.id}" class="image-post-container">
            <h1 class="title">${postData.title}</h1>
            <div class="image-container">
            <img class="posted-image" alt="Missing" src="${postData.thumbnail}" />
            </div>
            <div class="below-image">
                <div class="post-authorship-info">
                    <p class="post-date">${postData.created_formatted}</p>
                    <p class="post-author">${postData.username}</p>
                </div>
                <p class="post-description">${postData.description}</p>
                <a href="/post-details/${postData.id}" class="post-details-button">View Post</a>
            </div>
        </div>`
}

function setFlashMessageFadeOut() {
    let flashMessageElement = document.getElementById("flash-message");
    if (flashMessageElement) {
        setTimeout(() => {
            let curentOpacity = 1.0;
            let timer = setInterval(() => {
                if (curentOpacity < 0.05) {
                    clearInterval(timer);
                    flashMessageElement.remove();
                }
                curentOpacity -= 0.05;
                flashMessageElement.style.opacity = curentOpacity;
            }, 50);
        }, 2500);
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    onLoad();
} else {
    document.addEventListener('DOMContentLoaded', onLoad);
}

let searchButton = document.getElementById("search-button");
let searchInput = document.getElementById("search-input");
if (searchInput) {
    searchButton.onclick = executeSearch;
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            executeSearch();
        }
    });
}

document.getElementById("comment-add-button").onclick = (event) => {
    let commentText = document.getElementById("comment-add-textarea").value;
    let postId = document.location.pathname.match(/\d+/g).map(Number)[0];

    if (!commentText) {
        return;
    }

    let fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({
            comment: commentText,
            postId, postId
        })
    }
    fetch('/comments/create', fetchOptions)
        .then((response) => response.json())
        .then((data) => {
            if (data.code == 1) {
                addMessage(data);
                document.getElementById("comment-add-textarea").value = '';
            } else {
                addFlashFromFrontEnd(data.message, data.status);
            } 
        })
        .catch(err => console.log(err));
}