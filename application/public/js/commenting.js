// Commenting functionality
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