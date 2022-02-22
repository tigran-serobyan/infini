var slideInputAM = document.getElementById('slidesAM');
var slideTableAM = document.getElementById('tableSlidesAM');
var slideshowLibraryMainAM = document.getElementById('slideshowLibraryMainAM');
var activeSlide = '';

function addSlideAM() {
    let tr = document.createElement('tr');
    tr.innerHTML = '<td contenteditable></td><td contenteditable></td><td contenteditable></td><td><img src="" onclick="choseImageForSlideAM(this)"></td><td><span class="button" onclick="up(this)">&uarr;</span><span class="button" onclick="down(this)">&darr;</span><span class="button" onclick="delete_(this)">&#9003;</span></td>';
    slideTableAM.appendChild(tr);
}

function choseImageForSlideAM(event) {
    activeSlide = event;
    slideshowLibraryMainAM.style.display = 'block';
    showSlideshowImagesAM();
}

function showSlideshowImagesAM() {
    axios.get(HOME_URL + 'images/').then(function (response) {
        let nodes = slideshowLibraryMainAM.childNodes;
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
                image.setAttribute('onclick', 'selectSlideshowImageAM("' + url + '", this)');
                image.setAttribute('ondblclick', 'deleteImage("' + url + '", this)');
                library.appendChild(image);
            }
        } else {
            notification('Something went wrong', 400);
        }
    });
}

function selectSlideshowImageAM(url) {
    activeSlide.setAttribute('src', HOME_URL + 'lowres_images/' + url);
    activeSlide.setAttribute('id', url);
}

function closeSlideshowLibraryAM() {
    slideshowLibraryMainAM.style.display = 'none';
    activeSlide = '';
}