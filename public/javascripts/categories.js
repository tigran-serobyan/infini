var input = document.getElementById('categories');
var table = document.getElementById('table');

window.onload = init;

function init() {
    let array = JSON.parse(input.value);
    for (let i of array) {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td contenteditable>' + i.am + '</td><td contenteditable>' + i.en + '</td><td><span class="button" onclick="delete_(this)">&#9003;</span></td>';
        table.appendChild(tr);
    }
}

function update() {
    let array = [];
    for (let i of table.getElementsByTagName('tr')) {
        array.push({
            am: i.getElementsByTagName('td')[0].innerHTML,
            en: i.getElementsByTagName('td')[1].innerHTML
        });
    }
    input.value = JSON.stringify(array);
    axios.post(HOME_URL + 'admin/updateCategories', {value: input.value}).then(function (response) {
        notification(response.data, response.request.status);
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}

function addLi() {
    let tr = document.createElement('tr');
    tr.innerHTML = '<td contenteditable></td><td contenteditable></td><td><span class="button" onclick="delete_(this)">&#9003;</span></td>';
    table.appendChild(tr);
}

function delete_(event) {
    event.parentElement.parentElement.remove();
}