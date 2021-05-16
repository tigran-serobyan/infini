window.onload = closeLibrary;

function saveFile(event) {
    let files = event.files;
    for (let i = 0; i < files.length; i++) {
        let formData = new FormData();
        let file = files[i];
        formData.append("image", file);
        axios.post(HOME_URL + 'admin/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
            showImages(event.parentElement.parentElement.parentElement);
        });
    }
}

function showImages(event) {
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
            for (let url of response.data) {
                let image = document.createElement('img');
                image.setAttribute('src', HOME_URL + 'images/' + url);
                image.setAttribute('onclick', 'selectImage("' + url + '",this)');
                image.setAttribute('ondblclick', 'deleteImage("' + url + '",this)');
                library.appendChild(image);
            }
        } else {
            notification('Something went wrong', 400);
        }
    });
}

function openLibrary(event) {
    event.parentElement.getElementsByClassName('libraryMain')[0].style.display = 'block';
    showImages(event.parentElement);
}

function closeLibrary() {
    let libraries = document.getElementsByClassName('libraryMain');
    for (let i of libraries) {
        i.style.display = 'none';
    }
}

function selectImage(url, event) {
    let nodes = event.parentElement.parentElement.parentElement.childNodes;
    for (let i of nodes) {
        if (i.className == 'chosenImage') {
            i.setAttribute('src', HOME_URL + 'images/' + url);
            i.setAttribute('id', url);
        }
    }
}

function deleteImage(url, event) {
    let confirm = prompt('ՈՒզում եք ջնջե՞լ, ներմուծեք (y)')
    if (confirm == 'y') {
        axios.delete(HOME_URL + 'admin/deleteImage/' + url).then(function (response) {
            event.remove()
        });
    }
}
