function saveAM() {
    let title = document.getElementById('titleAM').value;
    let logo = document.getElementById('logoAM').getElementsByClassName('chosenImage')[0].id;
    axios.post(HOME_URL + 'admin/updateTitleLogoAM', { title, logo }).then(function (response) {
        notification(response.data, response.request.status);
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}
function saveEN() {
    let title = document.getElementById('titleEN').value;
    let logo = document.getElementById('logoEN').getElementsByClassName('chosenImage')[0].id;
    axios.post(HOME_URL + 'admin/updateTitleLogoEN', { title, logo }).then(function (response) {
        notification(response.data, response.request.status);
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}

function saveFooterAM() {
    axios.post(HOME_URL + 'admin/updateFooterAM', { footer: footerAM.root.innerHTML }).then(function (response) {
        notification(response.data, response.request.status);
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}
function saveFooterEN() {
    axios.post(HOME_URL + 'admin/updateFooterEN', { footer: footerEN.root.innerHTML }).then(function (response) {
        notification(response.data, response.request.status);
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}