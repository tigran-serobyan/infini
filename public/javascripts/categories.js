var inputI = document.getElementById('categoriesI');
var inputC = document.getElementById('categoriesC');
var tableI = document.getElementById('tableI');
var tableC = document.getElementById('tableC');

window.onload = init;

function init() {
    let array = JSON.parse(inputI.value);
    for (let i of array) {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td contenteditable>' + i.am + '</td><td contenteditable>' + i.en + '</td><td><span class="button" onclick="delete_(this)">&#9003;</span></td>';
        tableI.appendChild(tr);
    }

    array = JSON.parse(inputC.value);
    for (let i of array) {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td contenteditable>' + i.am + '</td><td contenteditable>' + i.en + '</td><td><span class="button" onclick="delete_(this)">&#9003;</span></td>';
        tableC.appendChild(tr);
    }
}

function update() {
    let array = [];
    for (let i of tableI.getElementsByTagName('tr')) {
        array.push({
            am: i.getElementsByTagName('td')[0].innerHTML,
            en: i.getElementsByTagName('td')[1].innerHTML
        });
    }
    inputI.value = JSON.stringify(array);
    array = [];
    for (let i of tableC.getElementsByTagName('tr')) {
        array.push({
            am: i.getElementsByTagName('td')[0].innerHTML,
            en: i.getElementsByTagName('td')[1].innerHTML
        });
    }
    inputC.value = JSON.stringify(array);
    axios.post(HOME_URL + 'admin/updateCategories', { value: JSON.stringify({ i: JSON.parse(inputI.value), c: JSON.parse(inputC.value) }) }).then(function (response) {
        notification(response.data, response.request.status);
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}

function addLiI() {
    let tr = document.createElement('tr');
    tr.innerHTML = '<td contenteditable></td><td contenteditable></td><td><span class="button" onclick="delete_(this)">&#9003;</span></td>';
    tableI.appendChild(tr);
}

function addLiC() {
    let tr = document.createElement('tr');
    tr.innerHTML = '<td contenteditable></td><td contenteditable></td><td><span class="button" onclick="delete_(this)">&#9003;</span></td>';
    tableC.appendChild(tr);
}

function delete_(event) {
    event.parentElement.parentElement.remove();
}