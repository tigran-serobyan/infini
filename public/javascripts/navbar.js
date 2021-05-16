var menu = document.getElementById('menu');
var menuButton = document.getElementById('menuButton');
function openCloseMenu(){
    if(menu.style.opacity == '0'){
        openMenu();
    } else{
        closeMenu();
    }
}
function openMenu() {
    menu.style.zIndex = '3';
    menu.style.opacity = '1';
    menuButton.setAttribute('class','menuClose');
}

function closeMenu() {
    menu.style.zIndex = '-1';
    menu.style.opacity = '0';
        menuButton.setAttribute('class','menuOpen');
}