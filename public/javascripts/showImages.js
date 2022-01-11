var activeImage = 0;
var maxCount = 0;
var xDown = null;
var yDown = null;
function openImage(event, save = false) {
    let slider = document.createElement('div');
    slider.setAttribute('class', 'imageSlider');
    slider.style.left = 0;
    let images = document.getElementsByClassName('sliderImages');
    maxCount = images.length;
    let left = 0;
    for (let i of images) {
        let image = document.createElement('div');
        if (i == event) {
            activeImage = left;
            slider.style.left = (-100 * left) + 'vw';
            image.innerHTML = '<img src="' + i.src + '" class="activeImage">';
        } else {
            image.innerHTML = '<img src="' + i.src + '">';
        }
        if (save) {
            image.innerHTML += '<a href="' + i.src + '" download class="downloadImage"></a>';
        }
        left++;
        image.setAttribute('ontouchstart', 'handleTouchStart(event)');
        image.setAttribute('ontouchmove', 'handleTouchMove(event)');
        slider.appendChild(image);
    }
    document.getElementsByTagName('body')[0].appendChild(slider);
    document.getElementsByTagName('body')[0].innerHTML += '<span class="leftArrow" onclick="slideLeft()"></span><span class="rightArrow" onclick="slideRight()"></span> <span class="closeSlider" onclick="closeSlider()"></span>';
    if (activeImage == 0) {
        document.getElementsByClassName('leftArrow')[0].setAttribute('class', 'leftArrow disabled');
    } else {
        document.getElementsByClassName('leftArrow')[0].setAttribute('class', 'leftArrow');
    }
    if (activeImage == maxCount - 1) {
        document.getElementsByClassName('rightArrow')[0].setAttribute('class', 'rightArrow disabled');
    } else {
        document.getElementsByClassName('rightArrow')[0].setAttribute('class', 'rightArrow');
    }
}

function slideLeft() {
    let slider = document.getElementsByClassName('imageSlider')[0];
    if (activeImage > 0) {
        activeImage--;
        slider.style.left = (-100 * activeImage) + 'vw';
    }
    if (activeImage == 0) {
        document.getElementsByClassName('leftArrow')[0].setAttribute('class', 'leftArrow disabled');
    } else {
        document.getElementsByClassName('leftArrow')[0].setAttribute('class', 'leftArrow');
    }
    if (activeImage == maxCount - 1) {
        document.getElementsByClassName('rightArrow')[0].setAttribute('class', 'rightArrow disabled');
    } else {
        document.getElementsByClassName('rightArrow')[0].setAttribute('class', 'rightArrow');
    }
}

function slideRight() {
    let slider = document.getElementsByClassName('imageSlider')[0];
    if (activeImage < maxCount - 1) {
        activeImage++;
        slider.style.left = (-100 * activeImage) + 'vw';
    }
    if (activeImage == 0) {
        document.getElementsByClassName('leftArrow')[0].setAttribute('class', 'leftArrow disabled');
    } else {
        document.getElementsByClassName('leftArrow')[0].setAttribute('class', 'leftArrow');
    }
    if (activeImage == maxCount - 1) {
        document.getElementsByClassName('rightArrow')[0].setAttribute('class', 'rightArrow disabled');
    } else {
        document.getElementsByClassName('rightArrow')[0].setAttribute('class', 'rightArrow');
    }
}

function getTouches(evt) {
    return evt.touches[0];
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt);
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = getTouches(evt).clientX;
    var yUp = getTouches(evt).clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            slideRight();
        } else {
            slideLeft();
        }
    }
    xDown = null;
    yDown = null;
};

function closeSlider() {
    document.getElementsByClassName('leftArrow')[0].remove();
    document.getElementsByClassName('rightArrow')[0].remove();
    document.getElementsByClassName('closeSlider')[0].remove();
    document.getElementsByClassName('imageSlider')[0].remove();
    activeImage = 0;
    maxCount = 0;
    xDown = null;
    yDown = null;
}