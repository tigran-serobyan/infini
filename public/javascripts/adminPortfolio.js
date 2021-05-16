function addPortfolio() {
    axios.post(HOME_URL + 'admin/new/portfolio', {
        url: document.getElementById('url').value,
        nameAM: document.getElementById('nameAM').value,
        nameEN: document.getElementById('nameEN').value,
        descriptionAM: descriptionAM.root.innerHTML,
        descriptionEN: descriptionEN.root.innerHTML,
        mainImage: document.getElementById('mainImage').getElementsByClassName('chosenImage')[0].id,
        images: JSON.stringify(chosenImages),
        category: document.getElementById('category').value
    }).then(function (response) {
        window.location.href = HOME_URL + 'admin/portfolio';
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}

function savePortfolio(id) {
    axios.post(HOME_URL + 'admin/edit/portfolio/' + id, {
        url: document.getElementById('url').value,
        nameAM: document.getElementById('nameAM').value,
        nameEN: document.getElementById('nameEN').value,
        descriptionAM: descriptionAM.root.innerHTML,
        descriptionEN: descriptionEN.root.innerHTML,
        mainImage: document.getElementById('mainImage').getElementsByClassName('chosenImage')[0].id,
        images: JSON.stringify(chosenImages),
        category: document.getElementById('category').value
    }).then(function (response) {
        window.location.href = HOME_URL + 'admin/portfolio';
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}

function deletePortfolio(id) {
    let random = Math.round(Math.random() * (id.length - 6)) + 6;
    let code = id.slice(random - 6, random);
    let confirm = prompt('Հաստատեք գործողությունը, արտագրե՛ք։ ' + code);
    if (confirm == code) {
        axios.delete(HOME_URL + 'admin/delete/portfolio/' + id).then(function (response) {
            document.getElementById(id).style.display = "none";
            notification(response.data, response.request.status);
        }).catch(function (err) {
            notification(err.response.data, err.response.status);
        });
    }
}