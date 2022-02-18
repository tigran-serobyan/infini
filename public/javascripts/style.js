function saveStyle() {
    let inputs = document.getElementsByClassName("texts");
    let texts = {
        // portfolioTitleam: 'Պորտֆոլիո',
        // portfolioTitleen: 'Portfolio',
        // decorationsTitleam: 'Դեկորացիաներ',
        // decorationsTitleen: 'Decorations',
        // pagesTitleam: 'Էջեր',
        // pagesTitleen: 'Pages',
        // searchedam: 'Փնտրվել է ',
        // searcheden: 'Searched: ',
        // nothingfoundam: 'Ոչինչ չի գտնվել',
        // nothingfounden: 'Nothing found',
        // photoshootNotFoundam: "Ֆոտոշարքը չի գտնվել",
        // photoshootNotFounden: "Photoshoot is not found",
        // availableForDownloadUntilam: "Հասանելի է ներբեռնելու համար մինչև։ ",
        // availableForDownloadUntilen: "Available for download until: ",
        // downloadAllam: "Ներբեռնել բոլոր նկարները",
        // downloadAllen: "Download all images",
        // saveam: "Պահպանել", 
        // saveen: "Save",
        // allChangesAreSavedam: "Փոփոխությունները պահպանվել են",
        // allChangesAreSaveden: "All changes are saved",
        // portfolioIndividualam:"Պորտֆոլիո անհատներ",
        // portfolioIndividualen:"Portfolio individuals",
        // portfolioCommercialam:"Պորտֆոլիո կոմերցիոն",
        // portfolioCommercialen:"Portfolio commercial",
        // pageNotFoundam:"Էջը չի գտնվել",
        // pageNotFounden:"Page not found",
    }
    for (let i of inputs) {
        texts[i.id] = i.value;
    }
    axios.post(HOME_URL + 'admin/design', { texts: JSON.stringify(texts) }).then((response) => {
        notification(response.data, response.request.status);
    }).catch(function (err) {
        notification(err.response.data, err.response.status);
    });
}