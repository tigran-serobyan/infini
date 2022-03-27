var dispositionInputAM = document.getElementById('dispositionInputAM');
var dispositionDivAM = document.getElementById('dispositionAM');
var dispositionLibraryMainAM = document.getElementById('dispositionLibraryMainAM');
var activeImage = '';
var bodiesAM = [];

function choseImageForBlockAM(event) {
    activeImage = event;
    dispositionLibraryMainAM.style.display = 'block';
    showBlockImagesAM();
}

function showBlockImagesAM() {
    axios.get(HOME_URL + 'images/').then(function (response) {
        let nodes = dispositionLibraryMainAM.childNodes;
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
                image.setAttribute('src', HOME_URL + 'images/' + url);
                image.setAttribute('onclick', 'selectBlockImageAM("' + url + '", this)');
                image.setAttribute('ondblclick', 'deleteImage("' + url + '", this)');
                library.appendChild(image);
            }
        } else {
            notification('Something went wrong', 400);
        }
    });
}

function selectBlockImageAM(url, event) {
    for (let s of event.parentElement.childNodes) {
        s.className = "";
    }
    event.className = "chosen";
    activeImage.setAttribute('src', HOME_URL + 'images/' + url);
    activeImage.setAttribute('id', url);
}

function closeDispositionLibraryAM() {
    dispositionLibraryMainAM.style.display = 'none';
    activeImage = '';
}


function addAboutAM(title = '', image = '', body = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'aboutBlock');
    let id = 'body' + Math.round(Math.random() * 100000);
    div.setAttribute('id', id);
    div.innerHTML = '<input type="text" class="title" value="' + title + '" placeholder="Վերնագիր"><img src="' + HOME_URL + 'images/' + image + '" id="' + image + '" onclick="choseImageForBlockAM(this)"><div id="' + id + '_">' + body + '</div><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivAM.appendChild(div);
    let body_ = new Quill('#' + id + '_', { theme: 'snow', modules: { toolbar: [[{ 'size': ['small', false, 'large', 'huge'] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'font': [] }], ['bold', 'italic', 'underline', 'strike'], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote', 'code-block'], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], ['link'], ['clean']] } })
    bodiesAM.push(body_);
}

function addContactAM(title = '', map = '', body = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'contactBlock');
    let id = 'body' + Math.round(Math.random() * 100000);
    div.setAttribute('id', id);
    div.innerHTML = '<input type="text" class="title" value="' + title + '" placeholder="Վերնագիր"><input type="text" class="map" value="' + map + '" placeholder="Google map-ի հղում"><div id="' + id + '_">' + body + '</div><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivAM.appendChild(div);
    let body_ = new Quill('#' + id + '_', { theme: 'snow', modules: { toolbar: [[{ 'size': ['small', false, 'large', 'huge'] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'font': [] }], ['bold', 'italic', 'underline', 'strike'], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote', 'code-block'], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], ['link'], ['clean']] } })
    bodiesAM.push(body_);
}

function addVerticalSplitAM(title = '', image = '', body = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'verticalSplitBlock');
    let id = 'body' + Math.round(Math.random() * 100000);
    div.setAttribute('id', id);
    div.innerHTML = '<input type="text" class="title" value="' + title + '" placeholder="Վերնագիր"><img src="' + HOME_URL + 'images/' + image + '" id="' + image + '" onclick="choseImageForBlockAM(this)"><div id="' + id + '_">' + body + '</div><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivAM.appendChild(div);
    let body_ = new Quill('#' + id + '_', { theme: 'snow', modules: { toolbar: [[{ 'size': ['small', false, 'large', 'huge'] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'font': [] }], ['bold', 'italic', 'underline', 'strike'], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote', 'code-block'], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], ['link'], ['clean']] } })
    bodiesAM.push(body_);
}

function addVerticalSplitFlippedAM(title = '', image = '', body = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'verticalSplitBlockFlipped');
    let id = 'body' + Math.round(Math.random() * 100000);
    div.setAttribute('id', id);
    div.innerHTML = '<input type="text" class="title" value="' + title + '" placeholder="Վերնագիր"><div id="' + id + '_">' + body + '</div><img src="' + HOME_URL + 'images/' + image + '" id="' + image + '" onclick="choseImageForBlockAM(this)"><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivAM.appendChild(div);
    let body_ = new Quill('#' + id + '_', { theme: 'snow', modules: { toolbar: [[{ 'size': ['small', false, 'large', 'huge'] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'font': [] }], ['bold', 'italic', 'underline', 'strike'], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote', 'code-block'], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], ['link'], ['clean']] } })
    bodiesAM.push(body_);
}

function addColumnSplitAM(title = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'columnSplitBlock');
    div.innerHTML += '<input type="text" class="title" value="' + title + '" placeholder="Վերնագիր"><p>Դեկորացիաներ(Դասավորած ըստ կարգավիճակի և թարմության)</p>';
    div.innerHTML += '<span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivAM.appendChild(div);
}
function addGridViewAM(title = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'gridViewBlock');
    div.innerHTML += '<input type="text" class="title" value="' + title + '" placeholder="Վերնագիր"><p>Աշխատանքներ(Դասավորած ըստ թարմության)</p>';
    div.innerHTML += '<span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivAM.appendChild(div);
}

function addTextAM(body = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'textBlock');
    let id = 'body' + Math.round(Math.random() * 100000);
    div.setAttribute('id', id);
    div.innerHTML = '<div id="' + id + '_">' + body + '</div><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivAM.appendChild(div);
    let body_ = new Quill('#' + id + '_', { theme: 'snow', modules: { toolbar: [[{ 'size': ['small', false, 'large', 'huge'] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'font': [] }], ['bold', 'italic', 'underline', 'strike'], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote', 'code-block'], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], ['link'], ['clean']] } })
    bodiesAM.push(body_);
}