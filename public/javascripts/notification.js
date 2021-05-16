function notification (notification, code = '200'){
    let div = document.createElement('div');
    div.innerHTML='<h3>'+code+'</h3><p>'+notification+'</p>';
    div.setAttribute('class','code'+code);
    document.getElementById('notifications').appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 5000);
}