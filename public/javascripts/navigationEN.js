var inputEN = document.getElementById('navigationEN');
var tableEN = document.getElementById('tableNavEN');

function initEN() {
    let arrayEN = JSON.parse(inputEN.value);
    for (let i of arrayEN) {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td contenteditable>' + i.url + '</td><td contenteditable>' + i.tag + '</td><td><span class="button" onclick="up(this)">&uarr;</span><span class="button" onclick="down(this)">&darr;</span><span class="button" onclick="delete_(this)">&#9003;</span></td>';
        tableEN.appendChild(tr);
    }
}

function updateEN() {
    let array = [];
    for (let i of tableEN.getElementsByTagName('tr')) {
        array.push({
            url: i.getElementsByTagName('td')[0].innerText,
            tag: i.getElementsByTagName('td')[1].innerText
        });
    }
    inputEN.value = JSON.stringify(array);
    axios.post(HOME_URL + 'admin/updateNavigationEN', {value: inputEN.value}).then(function (response) {
        notification(response.data, response.request.status);
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}

function addLiEN() {
    let tr = document.createElement('tr');
    tr.innerHTML = '<td contenteditable></td><td contenteditable></td><td><span class="button" onclick="up(this)">&uarr;</span><span class="button" onclick="down(this)">&darr;</span><span class="button" onclick="delete_(this)">&#9003;</span></td>';
    tableEN.appendChild(tr);
}