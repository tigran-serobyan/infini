function addPage() {
    axios.post(HOME_URL + 'admin/new/page', {
        url: document.getElementById('url').value,
        nameAM: document.getElementById('nameAM').value,
        nameEN: document.getElementById('nameEN').value,
        bodyAM: bodyAM.root.innerHTML,
        bodyEN: bodyEN.root.innerHTML,
        image: document.getElementById('pageImage').getElementsByClassName('chosenImage')[0].id
    }).then(function (response) {
        window.location.href = HOME_URL + 'admin/pages';
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}

function savePage(id) {
    axios.post(HOME_URL + 'admin/edit/page/' + id, {
        url: document.getElementById('url').value,
        nameAM: document.getElementById('nameAM').value,
        nameEN: document.getElementById('nameEN').value,
        bodyAM: bodyAM.root.innerHTML,
        bodyEN: bodyEN.root.innerHTML,
        image: document.getElementById('pageImage').getElementsByClassName('chosenImage')[0].id
    }).then(function (response) {
        window.location.href = HOME_URL + 'admin/pages';
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}

function deletePage(id) {
    let random = Math.round(Math.random() * (id.length - 6)) + 6;
    let code = id.slice(random - 6, random);
    let confirm = prompt('Հաստատեք գործողությունը, արտագրե՛ք։ ' + code);
    if (confirm == code) {
        axios.delete(HOME_URL + 'admin/delete/page/' + id).then(function (response) {
            document.getElementById(id).style.display = "none";
            notification(response.data, response.request.status);
        }).catch(function (err) {
            notification(err.response.data, err.response.status);
        });
    }
}