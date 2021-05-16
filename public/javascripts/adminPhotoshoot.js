function addPhotoshoot() {
    axios.post(HOME_URL + 'admin/new/photoshoot', {
        code: document.getElementById('code').value,
        nameAM: document.getElementById('nameAM').value,
        nameEN: document.getElementById('nameEN').value,
        descriptionAM: descriptionAM.root.innerHTML,
        descriptionEN: descriptionEN.root.innerHTML,
        images: JSON.stringify(chosenImages),
        style: document.getElementById('style').value,
        timer: document.getElementById('timer').value
    }).then(function (response) {
        window.location.href = HOME_URL + 'admin/photoshoots';
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}

function savePhotoshoot(id) {
    axios.post(HOME_URL + 'admin/edit/photoshoot/' + id, {
        code: document.getElementById('code').value,
        nameAM: document.getElementById('nameAM').value,
        nameEN: document.getElementById('nameEN').value,
        descriptionAM: descriptionAM.root.innerHTML,
        descriptionEN: descriptionEN.root.innerHTML,
        images: JSON.stringify(chosenImages),
        style: document.getElementById('style').value,
        timer: document.getElementById('timer').value
    }).then(function (response) {
        window.location.href = HOME_URL + 'admin/photoshoots';
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}

function deletePhotoshoot(id) {
    let random = Math.round(Math.random() * (id.length - 6)) + 6;
    let code = id.slice(random - 6, random);
    let confirm = prompt('Հաստատեք գործողությունը, արտագրե՛ք։ ' + code);
    if (confirm == code) {
        axios.delete(HOME_URL + 'admin/delete/photoshoot/' + id).then(function (response) {
            document.getElementById(id).style.display = "none";
            notification(response.data, response.request.status);
        }).catch(function (err) {
            notification(err.response.data, err.response.status);
        });
    }
}