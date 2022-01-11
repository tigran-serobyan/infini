const Infini = require('../models/infini');
var _titleAM, _titleEN, _logoAM, _logoEN, _navigationAM, _navigationEN, _categories, _homeAM, _homeEN, _footerAM, _footerEN, _style;
Infini.findOne({ 'tag': 'titleAM' }).then((title) => {
    if (title) {
        _titleAM = (title) ? title.content : '';
    } else {
        const newTitle = new Infini({ 'tag': 'titleAM', 'content': ' ' });
        return newTitle.save();
    }
}).catch((error) => {
    console.log(error);
});
Infini.findOne({ 'tag': 'titleEN' }).then((title) => {
    if (title) {
        _titleEN = (title) ? title.content : '';
    } else {
        const newTitle = new Infini({ 'tag': 'titleEN', 'content': ' ' });
        return newTitle.save();
    }
}).catch((error) => {
    console.log(error);
});
Infini.findOne({ 'tag': 'logoAM' }).then((logo) => {
    if (logo) {
        _logoAM = (logo) ? logo.content : '';
    } else {
        const newLogo = new Infini({ 'tag': 'logoAM', 'content': ' ' });
        return newLogo.save();
    }
}).catch((error) => {
    console.log(error);
});
Infini.findOne({ 'tag': 'logoEN' }).then((logo) => {
    if (logo) {
        _logoEN = (logo) ? logo.content : '';
    } else {
        const newLogo = new Infini({ 'tag': 'logoEN', 'content': ' ' });
        return newLogo.save();
    }
}).catch((error) => {
    console.log(error);
});
Infini.findOne({ 'tag': 'navigationAM' }).then((navigation) => {
    if (navigation) {
        _navigationAM = (navigation.content) ? JSON.parse(navigation.content) : '';
    } else {
        const newNavigation = new Infini({ 'tag': 'navigationAM', 'content': ' ' });
        return newNavigation.save();
    }
}).catch((error) => {
    console.log(error);
});
Infini.findOne({ 'tag': 'navigationEN' }).then((navigation) => {
    if (navigation) {
        _navigationEN = (navigation.content) ? JSON.parse(navigation.content) : '';
    } else {
        const newNavigation = new Infini({ 'tag': 'navigationEN', 'content': ' ' });
        return newNavigation.save();
    }
}).catch((error) => {
    console.log(error);
});
Infini.findOne({ 'tag': 'portfolioCategories' }).then((categories) => {
    if (categories) {
        _categories = (categories.content) ? JSON.parse(categories.content) : '';
    } else {
        const newCategories = new Infini({ 'tag': 'portfolioCategories', 'content': '[]' });
        return newCategories.save();
    }
}).catch((error) => {
    console.log(error);
});
Infini.findOne({ 'tag': 'homeAM' }).then((homeAM) => {
    if (homeAM) {
        _homeAM = (homeAM.content) ? JSON.parse(homeAM.content) : '';
    } else {
        const newHome = new Infini({ 'tag': 'homeAM', 'content': '[]' });
        return newHome.save();
    }
}).catch((error) => {
    console.log(error);
});
Infini.findOne({ 'tag': 'homeEN' }).then((homeEN) => {
    if (homeEN) {
        _homeEN = (homeEN.content) ? JSON.parse(homeEN.content) : '';
    } else {
        const newHome = new Infini({ 'tag': 'homeEN', 'content': '[]' });
        return newHome.save();
    }
}).catch((error) => {
    console.log(error);
});
Infini.findOne({ 'tag': 'footerAM' }).then((footerAM) => {
    if (footerAM) {
        _footerAM = footerAM.content;
    } else {
        const newFooter = new Infini({ 'tag': 'footerAM', 'content': ' ' });
        return newFooter.save();
    }
}).catch((error) => {
    console.log(error);
});
Infini.findOne({ 'tag': 'footerEN' }).then((footerEN) => {
    if (footerEN) {
        _footerEN = footerEN.content;
    } else {
        const newFooter = new Infini({ 'tag': 'footerEN', 'content': ' ' });
        return newFooter.save();
    }
}).catch((error) => {
    console.log(error);
});
Infini.findOne({ 'tag': 'style' }).then((style) => {
    if (style) {
        _style = style.content;
    } else {
        const newStyle = new Infini({ 'tag': 'style', 'content': ' ' });
        return newStyle.save();
    }
}).catch((error) => {
    console.log(error);
});

function getInfo() {
    return {
        titleAM: _titleAM,
        titleEN: _titleEN,
        logoAM: _logoAM,
        logoEN: _logoEN,
        navigationAM: _navigationAM,
        navigationEN: _navigationEN,
        footerAM: _footerAM,
        footerEN: _footerEN,
        style: _style
    };
}
function changeTitleAM(title) {
    _titleAM = title;
    return Infini.updateOne({ 'tag': 'titleAM' }, { $set: { 'content': title } });
}
function changeTitleEN(title) {
    _titleEN = title;
    return Infini.updateOne({ 'tag': 'titleEN' }, { $set: { 'content': title } });
}
function changeLogoAM(logo) {
    _logoAM = logo;
    return Infini.updateOne({ 'tag': 'logoAM' }, { $set: { 'content': logo } });
}
function changeLogoEN(logo) {
    _logoEN = logo;
    return Infini.updateOne({ 'tag': 'logoEN' }, { $set: { 'content': logo } });
}
function changeNavigationAM(navigation) {
    _navigationAM = JSON.parse(navigation);
    return Infini.updateOne({ 'tag': 'navigationAM' }, { $set: { 'content': navigation } });
}
function changeNavigationEN(navigation) {
    _navigationEN = JSON.parse(navigation);
    return Infini.updateOne({ 'tag': 'navigationEN' }, { $set: { 'content': navigation } });
}
function findPortfolioCategories() {
    return _categories;
}
function changePortfolioCategories(categories) {
    _categories = JSON.parse(categories);
    return Infini.updateOne({ 'tag': 'portfolioCategories' }, { $set: { 'content': categories } });
}
function getHomeAM() {
    return _homeAM;
}
function changeHomeAM(home) {
    _homeAM = JSON.parse(home);
    return Infini.updateOne({ 'tag': 'homeAM' }, { $set: { 'content': home } });
}
function getHomeEN() {
    return _homeEN;
}
function changeHomeEN(home) {
    _homeEN = JSON.parse(home);
    return Infini.updateOne({ 'tag': 'homeEN' }, { $set: { 'content': home } });
}
function changeFooterAM(footer) {
    _footerAM = footer;
    return Infini.updateOne({ 'tag': 'footerAM' }, { $set: { 'content': footer } });
}
function changeFooterEN(footer) {
    _footerEN = footer;
    return Infini.updateOne({ 'tag': 'footerEN' }, { $set: { 'content': footer } });
}
function changeStyle(style) {
    _style = style;
    return Infini.updateOne({ 'tag': 'style' }, { $set: { 'content': style } });
}

module.exports = {
    getInfo, changeStyle,
    changeTitleAM, changeTitleEN,
    changeLogoAM, changeLogoEN,
    changeNavigationAM, changeNavigationEN,
    findPortfolioCategories, changePortfolioCategories,
    getHomeAM, changeHomeAM, getHomeEN, changeHomeEN,
    changeFooterAM, changeFooterEN
}