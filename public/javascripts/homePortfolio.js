window.onload = init;
var ul, div;
function init() {
    ul = document.getElementsByClassName('portfolioUl')[0];
    div = document.getElementsByClassName('portfolio')[0];
}
function category(cat = '', event) {
    for (let li of ul.getElementsByTagName('li')) {
        li.setAttribute('class', '');
    }
    event.setAttribute('class', 'active');
    if (cat != '') {
        for (let work of div.getElementsByTagName('div')) {
            if (work.className == cat) {
                work.style.display = 'inline-block';
            } else {
                work.style.display = 'none';
            }
        }
    } else {
        for (let work of div.getElementsByTagName('div')) {
            work.style.display = 'inline-block';
        }
    }
}