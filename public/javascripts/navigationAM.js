var inputAM = document.getElementById('navigationAM');
var tableAM = document.getElementById('tableNavAM');

function initAM() {
    let arrayAM = JSON.parse(inputAM.value);
    for (let i of arrayAM) {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td contenteditable>' + i.url + '</td><td contenteditable>' + i.tag + '</td><td><span class="button" onclick="up(this)">&uarr;</span><span class="button" onclick="down(this)">&darr;</span><span class="button" onclick="delete_(this)">&#9003;</span></td>';
        tableAM.appendChild(tr);
    }
}

function updateAM() {
    let array = [];
    for (let i of tableAM.getElementsByTagName('tr')) {
        array.push({
            url: i.getElementsByTagName('td')[0].innerText,
            tag: i.getElementsByTagName('td')[1].innerText
        });
    }
    inputAM.value = JSON.stringify(array);
    axios.post(HOME_URL + 'admin/updateNavigationAM', {value: inputAM.value}).then(function (response) {
        notification(response.data, response.request.status);
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}

function addLiAM() {
    let tr = document.createElement('tr');
    tr.innerHTML = '<td contenteditable></td><td contenteditable></td><td><span class="button" onclick="up(this)">&uarr;</span><span class="button" onclick="down(this)">&darr;</span><span class="button" onclick="delete_(this)">&#9003;</span></td>';
    tableAM.appendChild(tr);
}