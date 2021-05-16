var dispositionInputEN = document.getElementById('dispositionInputEN');
var dispositionDivEN = document.getElementById('dispositionEN');
var dispositionLibraryMainEN = document.getElementById('dispositionLibraryMainEN');
var activeImage = '';
var bodiesEN = [];

function choseImageForBlockEN(event) {
    activeImage = event;
    dispositionLibraryMainEN.style.display = 'block';
    showBlockImagesEN();
}

function showBlockImagesEN() {
    axios.get(HOME_URL + 'images/').then(function (response) {
        let nodes = dispositionLibraryMainEN.childNodes;
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
                image.setAttribute('onclick', 'selectBlockImageEN("' + url + '", this)');
                image.setAttribute('ondblclick', 'deleteImage("' + url + '", this)');
                library.appendChild(image);
            }
        } else {
            notification('Something went wrong', 400);
        }
    });
}

function selectBlockImageEN(url) {
    activeImage.setAttribute('src', HOME_URL + 'images/' + url);
    activeImage.setAttribute('id', url);
}

function closeDispositionLibraryEN() {
    dispositionLibraryMainEN.style.display = 'none';
    activeImage = '';
}


function addAboutEN(title = '', image = '', body = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'aboutBlock');
    let id = 'body' + Math.round(Math.random() * 100000);
    div.setAttribute('id', id);
    div.innerHTML = '<input type="text" class="title" value="' + title + '" placeholder="Title"><img src="' + HOME_URL + 'images/' + image + '" id="' + image + '" onclick="choseImageForBlockEN(this)"><div id="' + id + '_">' + body + '</div><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivEN.appendChild(div);
    let body_ = new Quill('#' + id + '_', { theme: 'snow', modules: { toolbar: [[{ 'size': ['small', false, 'large', 'huge'] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'font': [] }], ['bold', 'italic', 'underline', 'strike'], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote', 'code-block'], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], ['link'], ['clean']] } })
    bodiesEN.push(body_);
}

function addContactEN(title = '', map = '', body = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'contactBlock');
    let id = 'body' + Math.round(Math.random() * 100000);
    div.setAttribute('id', id);
    div.innerHTML = '<input type="text" class="title" value="' + title + '" placeholder="Title"><input type="text" class="map" value="' + map + '" placeholder="Google map url"><div id="' + id + '_">' + body + '</div><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivEN.appendChild(div);
    let body_ = new Quill('#' + id + '_', { theme: 'snow', modules: { toolbar: [[{ 'size': ['small', false, 'large', 'huge'] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'font': [] }], ['bold', 'italic', 'underline', 'strike'], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote', 'code-block'], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], ['link'], ['clean']] } })
    bodiesEN.push(body_);
}

function addVerticalSplitEN(title = '', image = '', body = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'verticalSplitBlock');
    let id = 'body' + Math.round(Math.random() * 100000);
    div.setAttribute('id', id);
    div.innerHTML = '<input type="text" class="title" value="' + title + '" placeholder="Title"><img src="' + HOME_URL + 'images/' + image + '" id="' + image + '" onclick="choseImageForBlockEN(this)"><div id="' + id + '_">' + body + '</div><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivEN.appendChild(div);
    let body_ = new Quill('#' + id + '_', { theme: 'snow', modules: { toolbar: [[{ 'size': ['small', false, 'large', 'huge'] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'font': [] }], ['bold', 'italic', 'underline', 'strike'], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote', 'code-block'], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], ['link'], ['clean']] } })
    bodiesEN.push(body_);
}

function addVerticalSplitFlippedEN(title = '', image = '', body = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'verticalSplitBlockFlipped');
    let id = 'body' + Math.round(Math.random() * 100000);
    div.setAttribute('id', id);
    div.innerHTML = '<input type="text" class="title" value="' + title + '" placeholder="Title"><div id="' + id + '_">' + body + '</div><img src="' + HOME_URL + 'images/' + image + '" id="' + image + '" onclick="choseImageForBlockEN(this)"><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivEN.appendChild(div);
    let body_ = new Quill('#' + id + '_', { theme: 'snow', modules: { toolbar: [[{ 'size': ['small', false, 'large', 'huge'] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'font': [] }], ['bold', 'italic', 'underline', 'strike'], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote', 'code-block'], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], ['link'], ['clean']] } })
    bodiesEN.push(body_);
}

function addColumnSplitEN(title = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'columnSplitBlock');
    div.innerHTML += '<input type="text" class="title" value="' + title + '" placeholder="Title"><p>Decorations (Orderd by status & recency)</p>';
    div.innerHTML += '<span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivEN.appendChild(div);
}
function addGridViewEN(title = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'gridViewBlock');
    div.innerHTML += '<input type="text" class="title" value="' + title + '" placeholder="Title"><p>Works (Orderd by recency)</p>';
    div.innerHTML += '<span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivEN.appendChild(div);
}

function addTextEN(body = '') {
    let div = document.createElement('div');
    div.setAttribute('class', 'textBlock');
    let id = 'body' + Math.round(Math.random() * 100000);
    div.setAttribute('id', id);
    div.innerHTML = '<div id="' + id + '_">' + body + '</div><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
    dispositionDivEN.appendChild(div);
    let body_ = new Quill('#' + id + '_', { theme: 'snow', modules: { toolbar: [[{ 'size': ['small', false, 'large', 'huge'] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'font': [] }], ['bold', 'italic', 'underline', 'strike'], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['blockquote', 'code-block'], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], ['link'], ['clean']] } })
    bodiesEN.push(body_);
}