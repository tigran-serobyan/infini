function openCloseMenu() {
    let menu = document.getElementById('menu');
    if (menu.style.opacity == '0') {
        openMenu();
    } else {
        closeMenu();
    }
}
function openMenu() {
    let menu = document.getElementById('menu');
    let menuButton = document.getElementById('menuButton');
    menu.style.zIndex = '3';
    menu.style.opacity = '1';
    menuButton.setAttribute('class', 'menuClose');
}

function closeMenu() {
    let menu = document.getElementById('menu');
    let menuButton = document.getElementById('menuButton');
    menu.style.zIndex = '-1';
    menu.style.opacity = '0';
    menuButton.setAttribute('class', 'menuOpen');
}