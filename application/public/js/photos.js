// see Sample Solution video:
function fadeOut(event) {
    const timeToFade = 500;
    let targetElement = event.currentTarget;
    targetElement.style.opacity = 0;
    setTimeout(() => {
        targetElement.remove();
        updatePhotoCount();
    }, timeToFade);
}

function updatePhotoCount() {
    const numImagePosts = document.querySelectorAll(".image-post-container").length;
    if (numImagePosts == 1) {
        document.getElementById("items-count").innerHTML =
            "There is one photo.";
    } else {
        document.getElementById("items-count").innerHTML =
            "There are " + numImagePosts + " photos.";
    }
}

function createImagePost(data, containerDiv) {
    let div = document.createElement("div");
    div.classList.add("image-post-container");
    containerDiv.appendChild(div);

    let title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = data.title;
    div.appendChild(title);

    let img = document.createElement("img");
    img.classList.add("posted-image");
    img.src = data.url;
    div.appendChild(img);

    let belowImage = document.createElement("div");
    belowImage.classList.add("below-image");
    div.appendChild(belowImage);

    let albumId = document.createElement("p");
    // add albumId and id in place of post-author and post-date
    albumId.classList.add("post-info");
    albumId.textContent = "Album: " + data.albumId;
    belowImage.appendChild(albumId);

    let photoId = document.createElement("p");
    photoId.classList.add("post-info");
    photoId.textContent = "Photo: " + data.id;
    belowImage.appendChild(photoId);

    div.addEventListener("click", fadeOut);

    return div;
}

let mainDiv = document.getElementById("image-posts");
if (mainDiv) {
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos";
    fetch(fetchURL)
        .then((data) => data.json())
        .then((photos) => {
            photos.forEach((photo) => {
                createImagePost(photo, mainDiv);
            });
            updatePhotoCount();
        })
        .catch((error) => {
            console.log(error);
        });
}
