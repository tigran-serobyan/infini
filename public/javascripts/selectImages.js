let staredImages = [];
let photoshoot = { images: [] };

function chooseImage(event) {
    if (event.className == "star") {
        event.className = "chosen star";
        staredImages.push({ url: event.previousElementSibling.id, note: "." });
    } else {
        event.className = "star";
        for (let i in staredImages) {
            if (staredImages[i].url == event.previousElementSibling.id) {
                staredImages.splice(i, 1);
            }
        }
    }
    showStared();
}

function chooseImage_(event, c) {
    if (event.className == "star") {
        event.className = "chosen star"
    } else {
        event.className = "star"
    }
    chooseImage(document.getElementById(c).nextElementSibling);
}

function showStared() {
    let image = document.getElementsByClassName('staredImages')[0];
    image.innerHTML = "";
    for (let i of staredImages) {
        image.innerHTML += "<div><span style='background-image: url(" + document.getElementById(i.url).style.backgroundImage.slice(5, -2) + ")' onclick='openImage(document.getElementById(\""+i.url+"\"), false, true)' class='img'></span><span onclick='chooseImage_(this, \"" + i.url + "\")' class='" + document.getElementById(i.url).nextElementSibling.className + "'></span><span class='note' oninput='onInput(this, \"" + i.url + "\")' contenteditable>" + i.note.slice(0, -1) + "</span></div>";
    }
}

function onInput(event, c) {
    for (let i in staredImages) {
        if (staredImages[i].url == c) {
            staredImages[i].note = event.innerText + '.'
        }
    }
}

function savePhotoshoot() {
    for (let i in photoshoot.images) {
        let notSelected = true;
        for (let j in staredImages) {
            if (photoshoot.images[i].url == staredImages[j].url) {
                notSelected = false;
                photoshoot.images[i] = staredImages[j];
            }
        }
        if (notSelected) {
            photoshoot.images[i].note = "";
        }
    }
    axios.post(window.location.origin + '/edit/photoshoot/', {
        code: window.location.href.split('/')[window.location.href.split('/').length - 1],
        images: JSON.stringify(photoshoot.images)
    }).then(function (res) {
        console.log(res)
        notification(res.data, res.status);
    }).catch(function (err) {
        console.log(err);
        notification(err, err.status);
    });
}