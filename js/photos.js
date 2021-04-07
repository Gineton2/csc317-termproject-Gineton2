// from Sample Solution video:
function fadeOut(event){}

function createPhotoCard(data, containerDiv){}

let mainDiv = document.getElementById("container");
if(mainDiv){
    let fetchURL = ""
    fetch(fetchURL)
    .then((data) => data.json())
    .then((photos) => {
        let innerHTML = "";
        photos.forEach((photo) => {
            createPhotoCard(photo, mainDiv);
        });
        document.getElementById('items-count').innerHTML="There are $(photos.length) photo(s).";
    })
}