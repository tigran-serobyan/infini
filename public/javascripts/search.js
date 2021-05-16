function search() {
    var input = document.getElementById("search");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("table").getElementsByTagName("tr");
    for (let tr of table) {
        if (!(tr.getElementsByTagName('th')[0])) {
            let visible = false;
            let i = 0;
            for (let td of tr.getElementsByTagName('td')) {
                i++;
                if (i == tr.getElementsByTagName('td').length) { continue }
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    visible = true
                }
            }
            if (visible) {
                tr.style.display = '';
            } else {
                tr.style.display = 'none';
            }
        }
    }
}