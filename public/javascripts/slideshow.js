window.onload = _closeLibrary;
var loadBar = document.getElementById('loadBar');
var chosenImages = [];
var multipleOnProgress = false;
var multiple_ = "";

function _saveFile(event) {
    let load = 0;
    loadBar.style.width = '0%';
    loadBar.style.display = 'block';
    let files = event.files;
    for (let i = 0; i < files.length; i++) {
        load += 40 / files.length;
        loadBar.style.width = load + '%';
        let formData = new FormData();
        let file = files[i];
        formData.append("image", file);
        axios.post(HOME_URL + 'admin/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
            load += 60 / files.length;
            loadBar.style.width = load + '%';
            if (load >= 99.8) {
                setTimeout(() => { loadBar.style.display = 'none'; loadBar.style.width = '0%'; }, 1000);
            }
            _showImages(event.parentElement.parentElement.parentElement);
        });
    }
}

function _showImages(event) {
    axios.get(HOME_URL + 'images/').then(function (response) {
        let nodes = event.childNodes;
        var library;
        for (let i of nodes) {
            if (i.className == 'libraryMain') {
                let main = i.childNodes;
                for (let j of main) {
                    if (j.className == 'library') {
                        library = j;
                        break;
                    }
                }
            }
        }
        if (library) {
            library.innerHTML = '';
            let _chosenImages = [];
            for (let url of response.data) {
                let image = document.createElement('span');
                image.setAttribute('draggable', 'false');
                image.setAttribute('style', "background-image: url(" + HOME_URL + 'lowres_images/' + url + ");");
                image.setAttribute('onclick', '_selectImage("' + url + '",this)');
                image.setAttribute('onmouseover', '_selectMultiple("' + url + '", this)');
                image.setAttribute('ondblclick', '_deleteImage("' + url + '",this)');
                for (let i in chosenImages) {
                    if (chosenImages[i].url == url) {
                        _chosenImages.push({url, note:chosenImages[i].note});
                        image.setAttribute('class', 'chosen');
                    }
                }
                library.appendChild(image);
            }
            chosenImages = _chosenImages;
        } else {
            notification('Something went wrong', 400);
        }
    });
}

function _openLibrary(event) {
    event.parentElement.getElementsByClassName('libraryMain')[0].style.display = 'block';
    _showImages(event.parentElement);
}

function _closeLibrary() {
    let libraries = document.getElementsByClassName('libraryMain');
    for (let i of libraries) {
        i.style.display = 'none';
    }
    _updateImages();
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    if (e.code == "ControlLeft" || e.code == "ControlRight") {
        multipleOnProgress = true;
        multiple_ = 'chosen'
    }
    if (e.code == "ShiftLeft" || e.code == "ShiftRight") {
        multipleOnProgress = true;
        multiple_ = ''
    }
}
function keyUp(e) {
    if (e.code == "ControlLeft" || e.code == "ControlRight" || e.code == "ShiftLeft" || e.code == "ShiftRight") {
        multipleOnProgress = false;
    }
}

function _selectMultiple(url, event) {
    if (multipleOnProgress) {
        if (!chosenImages) {
            chosenImages = [];
        }
        if (multiple_ == '') {
            for (let i in chosenImages) {
                if (chosenImages[i].url == url) {
                    chosenImages.splice(i, 1);
                }
            }
        } else if (event.className != multiple_) {
            chosenImages.push({url});
        }
        event.setAttribute('class', multiple_);
        _updateImages();
    }
}

function _selectImage(url, event) {
    multipleOnProgress = false;
    if (!chosenImages) {
        chosenImages = [];
    }
    if (event.className == 'chosen') {
        event.setAttribute('class', '');
        for (let i in chosenImages) {
            if (chosenImages[i].url == url) {
                chosenImages.splice(i, 1);
            }
        }
    } else {
        event.setAttribute('class', 'chosen');
        chosenImages.push({url, note:""});
    }
    _updateImages();
}

function _updateImages() {
    let images = document.getElementsByClassName('chosenImages')[0];
    images.innerHTML = '';
    for (let img of chosenImages) {
        let image = document.createElement('img');
        image.setAttribute('src', HOME_URL + 'images/' + img.url);
        if(img.note){
            let note = document.createElement('span');
            note.setAttribute('class', 'note');
            note.innerText = img.note.slice(0, -1);
            if(img.note.length > 1){
                images.insertBefore(note, images.firstChild);
            }
            let heart = document.createElement('span');
            heart.setAttribute('class', 'heart');
            images.insertBefore(heart, images.firstChild);
            images.insertBefore(image, images.firstChild);
        } else{
            images.appendChild(image);
        }
    }
}

function _deleteImage(url, event) {
    let confirm = prompt('ՈՒզում եք ջնջե՞լ, ներմուծեք (y)').toLocaleLowerCase().replace(/ /g, "");
    if (confirm == 'y') {
        axios.delete(HOME_URL + 'admin/deleteImage/' + url).then(function (response) {
            event.remove()
        });
    }
}