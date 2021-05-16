const Portfolio = require('../models/portfolio');

function findPortfolios() {
    return Portfolio.find();
}

function findPortfolio(url) {
    return Portfolio.findOne({ url });
}
function findPortfolioByID(id) {
    return Portfolio.findOne({ _id: id });
}

function addPortfolio(obj) {
    let newPortfolio = new Portfolio(obj);
    return newPortfolio.save();
}

function updatePortfolio(id, obj) {
    return Portfolio.updateOne({ _id: id }, { $set: obj });
}

function deletePortfolio(id) {
    return Portfolio.deleteOne({_id: id});
}

module.exports = { findPortfolios, findPortfolio, findPortfolioByID, addPortfolio, updatePortfolio, deletePortfolio }