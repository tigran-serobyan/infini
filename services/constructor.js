const fs = require('fs-extra');
var json = JSON.parse(fs.readFileSync('./infini.json').toString('utf-8'));
if (typeof json.navigationAM == "string") {
    json.navigationAM = JSON.parse(json.navigationAM);
}
if (typeof json.navigationEN == "string") {
    json.navigationEN = JSON.parse(json.navigationEN);
}
if (typeof json.homeAM == "string") {
    json.homeAM = JSON.parse(json.homeAM);
}
if (typeof json.homeEN == "string") {
    json.homeEN = JSON.parse(json.homeEN);
}
if (typeof json.texts == "string") {
    json.texts = JSON.parse(json.texts);
}
if (typeof json.categories == "string") {
    json.categories = JSON.parse(json.categories);
}
function getInfo() {
    return {
        titleAM: json.titleAM,
        titleEN: json.titleEN,
        logoAM: json.logoAM,
        logoEN: json.logoEN,
        navigationAM: json.navigationAM,
        navigationEN: json.navigationEN,
        footerAM: json.footerAM,
        footerEN: json.footerEN,
        style: json.style,
    };
}
function changeTitleAM(title) {
    json.titleAM = title;
    return updateInifniJson();
}
function changeTitleEN(title) {
    json.titleEN = title;
    return updateInifniJson();
}
function changeLogoAM(logo) {
    json.logoAM = logo;
    return updateInifniJson();
}
function changeLogoEN(logo) {
    json.logoEN = logo;
    return updateInifniJson();
}
function changeNavigationAM(navigation) {
    json.navigationAM = (typeof navigation == "string") ? navigation : navigation;
    return updateInifniJson();
}
function changeNavigationEN(navigation) {
    json.navigationEN = (typeof navigation == "string") ? navigation : navigation;
    return updateInifniJson();
}
function findPortfolioCategories() {
    return json.categories;
}
function changePortfolioCategories(categories) {
    json.categories = (typeof categories == "string") ? categories : categories;
    return updateInifniJson();
}
function getTexts() {
    return json.texts;
}
function changeTexts(texts) {
    json.texts = (typeof texts == "string") ? JSON.parse(texts) : texts;
    return updateInifniJson();
}
function getHomeAM() {
    return json.homeAM;
}
function changeHomeAM(home) {
    json.homeAM = (typeof home == "string") ? JSON.parse(home) : home;
    return updateInifniJson();
}
function getHomeEN() {
    return json.homeEN;
}
function changeHomeEN(home) {
    json.homeEN = (typeof home == "string") ? JSON.parse(home) : home;
    return updateInifniJson();
}
function changeFooterAM(footer) {
    json.footerAM = footer;
    return updateInifniJson();
}
function changeFooterEN(footer) {
    json.footerEN = footer;
    return updateInifniJson();
}
function changeStyle(style) {
    json.style = style;
    return updateInifniJson();
}

module.exports = {
    getInfo, changeStyle,
    changeTitleAM, changeTitleEN,
    changeLogoAM, changeLogoEN,
    changeNavigationAM, changeNavigationEN,
    findPortfolioCategories, changePortfolioCategories,
    getHomeAM, changeHomeAM, getHomeEN, changeHomeEN,
    changeFooterAM, changeFooterEN, getTexts, changeTexts
}

function updateInifniJson() {
    return fs.writeFileSync('infini.json', JSON.stringify(json));
}