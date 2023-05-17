// from Sample Solution video:
function fadeOut(event) {
    let targetElement = event.target;
    target.style.opacity = 0;
    setTimeout(() => {
        targetElement.remove();
        }, 500);
}

function createPhotoCard(data, containerDiv) {
  let div = document.createElement("div");
//   div.classList.add("container");
  div.classList.add("image-post-container")
  containerDiv.appendChild(div);

  let title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = data.title;
  div.appendChild(title);


  let img = document.createElement("img");
  img.classList.add("posted-image");
  img.src = data.url;
  img.onclick = fadeOut;
  div.appendChild(img);

  let belowImage = document.createElement("div");
    belowImage.classList.add("below-image");
    div.appendChild(belowImage);

    let albumId = document.createElement("p");
    // add albumId and id in place of post-author and post-date
    albumId.classList.add("post-author");
    albumId.textContent = "Album ID: " + data.albumId;
    belowImage.appendChild(albumId);

    let photoId = document.createElement("p");
    photoId.classList.add("post-date");
    photoId.textContent = "Photo ID: " + data.id;
    belowImage.appendChild(photoId);


  return div;
}

let mainDiv = document.getElementById("image-posts");
if (mainDiv) {
  let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos";
  fetch(fetchURL)
    .then((data) => data.json())
    .then((photos) => {
      //   let innerHTML = "";
      photos.forEach((photo) => {
        createPhotoCard(photo, mainDiv);
      });
      document.getElementById("items-count").innerHTML =
        ("There are " + photos.length + " photo(s).");
    })
    .catch((error) => {
      console.log(error);
    });
}