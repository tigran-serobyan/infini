var slideInputEN = document.getElementById('slidesEN');
var slideTableEN = document.getElementById('tableSlidesEN');
var slideshowLibraryMainEN = document.getElementById('slideshowLibraryMainEN');

function addSlideEN() {
    let tr = document.createElement('tr');
    tr.innerHTML = '<td contenteditable></td><td contenteditable></td><td contenteditable></td><td><img src="" onclick="choseImageForSlideEN(this)"></td><td><span class="button" onclick="up(this)">&uarr;</span><span class="button" onclick="down(this)">&darr;</span><span class="button" onclick="delete_(this)">&#9003;</span></td>';
    slideTableEN.appendChild(tr);
}

function choseImageForSlideEN(event) {
    activeSlide = event;
    slideshowLibraryMainEN.style.display = 'block';
    showSlideshowImagesEN();
}

function showSlideshowImagesEN() {
    axios.get(HOME_URL + 'images/').then(function (response) {
        let nodes = slideshowLibraryMainEN.childNodes;
        var library;
        for (let i of nodes) {
            if (i.className == 'library') {
                library = i;
                break;
            }
        }
        if (library) {
            library.innerHTML = '';
            for (let url of response.data) {
                let image = document.createElement('img');
                image.setAttribute('src', HOME_URL + 'lowres_images/' + url);
                image.setAttribute('onclick', 'selectSlideshowImageEN("' + url + '", this)');
                image.setAttribute('ondblclick', 'deleteImage("' + url + '", this)');
                library.appendChild(image);
            }
        } else {
            notification('Something went wrong', 400);
        }
    });
}

function selectSlideshowImageEN(url, event) {
    for(let s of event.parentElement.childNodes){
        s.className = "";
    }
    event.className = "chosen";
    activeSlide.setAttribute('src', HOME_URL + 'lowres_images/' + url);
    activeSlide.setAttribute('id', url);
}

function closeSlideshowLibraryEN() {
    slideshowLibraryMainEN.style.display = 'none';
    activeSlide = '';
}