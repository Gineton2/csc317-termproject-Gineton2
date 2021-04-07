// from Sample Solution video:
function fadeOut(event){}

function createPhotoCard(data, containerDiv){
    let div = document.createElement('image-post');
    let img = document.createElement('img');
    img.src = document.url;
    div.appendChild(img);
    return div;
}

let mainDiv = document.getElementById("container");
if(mainDiv){
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos"
    fetch(fetchURL)
    .then((data) => data.json())
    .then((photos) => {
        let innerHTML = "";
        photos.forEach((photo) => {
            createPhotoCard(photo, mainDiv);
        });
        document.getElementById('items-count').innerHTML="There are $(photos.length) photo(s).";
    })
    .catch((error =>{
        console.log(error);
    }));
}