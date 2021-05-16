function divUp(event) {
    for (let i = 0; i < event.parentElement.parentElement.parentElement.getElementsByTagName('div').length; i++) {
        if (event.parentElement.parentElement.parentElement.getElementsByTagName('div')[i] == event.parentElement.parentElement && i != 0) {
            let div = event.parentElement.parentElement.innerHTML;
            let divId = event.parentElement.parentElement.id;
            let divClass = event.parentElement.parentElement.className;
            let oldDiv = event.parentElement.parentElement.previousSibling.innerHTML;
            let oldDivId = event.parentElement.parentElement.previousSibling.id;
            let oldDivClass = event.parentElement.parentElement.previousSibling.className;
            event.parentElement.parentElement.previousSibling.id = divId;
            event.parentElement.parentElement.previousSibling.className = divClass;
            event.parentElement.parentElement.previousSibling.innerHTML = div;
            event.parentElement.parentElement.id = oldDivId;
            event.parentElement.parentElement.className = oldDivClass;
            event.parentElement.parentElement.innerHTML = oldDiv;
            break;
        }
    }
}

function divDown(event) {
    for (let i = 0; i < event.parentElement.parentElement.parentElement.getElementsByTagName('div').length - 1; i++) {
        if (event.parentElement.parentElement.parentElement.getElementsByTagName('div')[i] == event.parentElement.parentElement) {
            let div = event.parentElement.parentElement.innerHTML;
            let divId = event.parentElement.parentElement.id;
            let divClass = event.parentElement.parentElement.className;
            let oldDiv = event.parentElement.parentElement.nextSibling.innerHTML;
            let oldDivId = event.parentElement.parentElement.nextSibling.id;
            let oldDivClass = event.parentElement.parentElement.nextSibling.className;
            event.parentElement.parentElement.nextSibling.id = divId;
            event.parentElement.parentElement.nextSibling.className = divClass;
            event.parentElement.parentElement.nextSibling.innerHTML = div;
            event.parentElement.parentElement.id = oldDivId;
            event.parentElement.parentElement.className = oldDivClass;
            event.parentElement.parentElement.innerHTML = oldDiv;
            break;
        }
    }
}

function divDelete(event) {
    event.parentElement.parentElement.remove();
}

function updateHomeAM() {
    let slides = slideTableAM.getElementsByTagName('tr');
    let slides_ = [];
    for (let slide of slides) {
        let slide_ = {
            url: slide.getElementsByTagName('td')[0].innerHTML,
            title: slide.getElementsByTagName('td')[1].innerHTML,
            subtitle: slide.getElementsByTagName('td')[2].innerHTML,
            image: slide.getElementsByTagName('td')[3].getElementsByTagName('img')[0].id
        }
        slides_.push(slide_);
    }
    let blocks = dispositionDivAM.childNodes;
    let disposition = [];
    for (let block of blocks) {
        let block_ = {
            type: block.className
        };
        if (block_.type == 'aboutBlock') {
            block_.title = block.getElementsByClassName('title')[0].value;
            block_.image = block.getElementsByTagName('img')[0].id;
            for (let body of bodiesAM) {
                if (block.getElementsByTagName('div')[body.container.id]) {
                    block_.body = body.root.innerHTML;
                    break;
                }
            }
        } else if (block_.type == 'contactBlock') {
            block_.title = block.getElementsByClassName('title')[0].value;
            block_.map = block.getElementsByClassName('map')[0].value;
            for (let body of bodiesAM) {
                if (block.getElementsByTagName('div')[body.container.id]) {
                    block_.body = body.root.innerHTML;
                    break;
                }
            }
        } else if (block_.type == 'verticalSplitBlock') {
            block_.title = block.getElementsByClassName('title')[0].value;
            block_.image = block.getElementsByTagName('img')[0].id;
            for (let body of bodiesAM) {
                if (block.getElementsByTagName('div')[body.container.id]) {
                    block_.body = body.root.innerHTML;
                    break;
                }
            }
        } else if (block_.type == 'verticalSplitBlockFlipped') {
            block_.title = block.getElementsByClassName('title')[0].value;
            block_.image = block.getElementsByTagName('img')[0].id;
            for (let body of bodiesAM) {
                if (block.getElementsByTagName('div')[body.container.id]) {
                    block_.body = body.root.innerHTML;
                    break;
                }
            }
        } else if (block_.type == 'columnSplitBlock') {
            block_.title = block.getElementsByClassName('title')[0].value;
        } else if (block_.type == 'gridViewBlock') {
            block_.title = block.getElementsByClassName('title')[0].value;
        } else {
            for (let body of bodiesAM) {
                if (block.getElementsByTagName('div')[body.container.id]) {
                    block_.body = body.root.innerHTML;
                    break;
                }
            }
        }
        disposition.push(block_);
    }
    axios.post(HOME_URL + 'admin/updateHomeAM', { home: JSON.stringify({ slides: slides_, disposition }) }).then((response) => {
        notification(response.data, response.request.status);
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}

function updateHomeEN() {
    let slides = slideTableEN.getElementsByTagName('tr');
    let slides_ = [];
    for (let slide of slides) {
        let slide_ = {
            url: slide.getElementsByTagName('td')[0].innerHTML,
            title: slide.getElementsByTagName('td')[1].innerHTML,
            subtitle: slide.getElementsByTagName('td')[2].innerHTML,
            image: slide.getElementsByTagName('td')[3].getElementsByTagName('img')[0].id
        }
        slides_.push(slide_);
    }
    let blocks = dispositionDivEN.childNodes;
    let disposition = [];
    for (let block of blocks) {
        let block_ = {
            type: block.className
        };
        if (block_.type == 'aboutBlock') {
            block_.title = block.getElementsByClassName('title')[0].value;
            block_.image = block.getElementsByTagName('img')[0].id;
            for (let body of bodiesAM) {
                if (block.getElementsByTagName('div')[body.container.id]) {
                    block_.body = body.root.innerHTML;
                    break;
                }
            }
        } else if (block_.type == 'contactBlock') {
            block_.title = block.getElementsByClassName('title')[0].value;
            block_.map = block.getElementsByClassName('map')[0].value;
            for (let body of bodiesAM) {
                if (block.getElementsByTagName('div')[body.container.id]) {
                    block_.body = body.root.innerHTML;
                    break;
                }
            }
        } else if (block_.type == 'verticalSplitBlock') {
            block_.title = block.getElementsByClassName('title')[0].value;
            block_.image = block.getElementsByTagName('img')[0].id;
            for (let body of bodiesAM) {
                if (block.getElementsByTagName('div')[body.container.id]) {
                    block_.body = body.root.innerHTML;
                    break;
                }
            }
        } else if (block_.type == 'verticalSplitBlockFlipped') {
            block_.title = block.getElementsByClassName('title')[0].value;
            block_.image = block.getElementsByTagName('img')[0].id;
            for (let body of bodiesAM) {
                if (block.getElementsByTagName('div')[body.container.id]) {
                    block_.body = body.root.innerHTML;
                    break;
                }
            }
        } else if (block_.type == 'columnSplitBlock') {
            block_.title = block.getElementsByClassName('title')[0].value;
        } else if (block_.type == 'gridViewBlock') {
            block_.title = block.getElementsByClassName('title')[0].value;
        } else {
            for (let body of bodiesAM) {
                if (block.getElementsByTagName('div')[body.container.id]) {
                    block_.body = body.root.innerHTML;
                    break;
                }
            }
        }
        disposition.push(block_);
    }
    axios.post(HOME_URL + 'admin/updateHomeEN', { home: JSON.stringify({ slides: slides_, disposition }) }).then((response) => {
        notification(response.data, response.request.status);
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}