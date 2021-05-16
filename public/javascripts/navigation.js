window.onload = init;

function init() {
    initAM();
    initEN();
    closeSlideshowLibraryAM();
    let arrayAM = (slideInputAM.value) ? JSON.parse(slideInputAM.value) : [];
    for (let i of arrayAM) {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td contenteditable>' + i.url + '</td><td contenteditable>' + i.title + '</td><td contenteditable>' + i.subtitle + '</td><td><img src="' + HOME_URL + 'images/' + i.image + '" id="' + i.image + '" onclick="choseImageForSlideAM(this)"></td><td><span class="button" onclick="up(this)">&uarr;</span><span class="button" onclick="down(this)">&darr;</span><span class="button" onclick="delete_(this)">&#9003;</span></td>';
        slideTableAM.appendChild(tr);
    }
    closeSlideshowLibraryEN();
    let arrayEN = (slideInputEN.value) ? JSON.parse(slideInputEN.value) : [];
    for (let i of arrayEN) {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td contenteditable>' + i.url + '</td><td contenteditable>' + i.title + '</td><td contenteditable>' + i.subtitle + '</td><td><img src="' + HOME_URL + 'images/' + i.image + '" id="' + i.image + '" onclick="choseImageForSlideEN(this)"></td><td><span class="button" onclick="up(this)">&uarr;</span><span class="button" onclick="down(this)">&darr;</span><span class="button" onclick="delete_(this)">&#9003;</span></td>';
        slideTableEN.appendChild(tr);
    }
    closeDispositionLibraryAM();
    let dispositionArrayAM = (dispositionInputAM.value) ? JSON.parse(dispositionInputAM.value) : [];
    for (let i of dispositionArrayAM) {
        if (i) {
            if (i.type == 'aboutBlock') {
                addAboutAM(i.title, i.image, i.body);
            } else if (i.type == 'contactBlock') {
                addContactAM(i.title, i.map, i.body);
            } else if (i.type == 'verticalSplitBlock') {
                addVerticalSplitAM(i.title, i.image, i.body);
            } else if (i.type == 'verticalSplitBlockFlipped') {
                addVerticalSplitFlippedAM(i.title, i.image, i.body);
            } else if (i.type == 'columnSplitBlock') {
                addColumnSplitAM(i.title);
            } else if (i.type == 'gridViewBlock') {
                addGridViewAM(i.title);
            } else {
                addTextAM(i.body);
            }
        }
    }
    closeDispositionLibraryEN();
    let dispositionArrayEN = (dispositionInputEN.value) ? JSON.parse(dispositionInputEN.value) : [];
    for (let i of dispositionArrayEN) {
        if (i) {
            if (i.type == 'aboutBlock') {
                addAboutAM(i.title, i.image, i.body);
            } else if (i.type == 'contactBlock') {
                addContactAM(i.title, i.map, i.body);
            } else if (i.type == 'verticalSplitBlock') {
                addVerticalSplitAM(i.title, i.image, i.body);
            } else if (i.type == 'verticalSplitBlockFlipped') {
                addVerticalSplitFlippedAM(i.title, i.image, i.body);
            } else if (i.type == 'columnSplitBlock') {
                addColumnSplitAM(i.title);
            } else if (i.type == 'gridViewBlock') {
                addGridViewAM(i.title);
            } else {
                addTextAM(i.body);
            }
        }
    }
}

function up(event) {
    for (let i = 0; i < event.parentElement.parentElement.parentElement.getElementsByTagName('tr').length; i++) {
        if (event.parentElement.parentElement.parentElement.getElementsByTagName('tr')[i] == event.parentElement.parentElement && i != 0) {
            let tr = event.parentElement.parentElement.innerHTML;
            let oldTr = event.parentElement.parentElement.parentElement.getElementsByTagName('tr')[i - 1].innerHTML;
            event.parentElement.parentElement.parentElement.getElementsByTagName('tr')[i - 1].innerHTML = tr;
            event.parentElement.parentElement.innerHTML = oldTr;
            break;
        }
    }
}

function down(event) {
    for (let i = 0; i < event.parentElement.parentElement.parentElement.getElementsByTagName('tr').length - 1; i++) {
        if (event.parentElement.parentElement.parentElement.getElementsByTagName('tr')[i] == event.parentElement.parentElement) {
            let tr = event.parentElement.parentElement.innerHTML;
            let oldTr = event.parentElement.parentElement.parentElement.getElementsByTagName('tr')[i + 1].innerHTML;
            event.parentElement.parentElement.parentElement.getElementsByTagName('tr')[i + 1].innerHTML = tr;
            event.parentElement.parentElement.innerHTML = oldTr;
            break;
        }
    }
}

function delete_(event) {
    event.parentElement.parentElement.remove();
}