var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var { getInfo, getHomeAM, getHomeEN } = require('../services/constructor');
var { findPhotoshoot } = require('../services/photoshoots');
var { findPage } = require('../services/pages');
var { findPortfolios, findPortfolio } = require('../services/portfolios');
var { findDecorations, findDecoration } = require('../services/decorations');
var HOME_URL = process.env.HOME_URL;

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
    res.render('index', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, home: getHomeAM(), navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/' });
  } else {
    res.render('index', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, home: getHomeEN(), navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/' });
  }
});

router.get('/photoshoot', function (req, res, next) {
  findPhotoshoot(req.query.code).then((respond) => {
    if (respond) {
      let date = new Date();
      let year = date.getFullYear();
      let month = (date.getMonth() + 1);
      let day = date.getDate();
      if (!respond.timer || (parseInt(respond.timer.split('/')[0]) >= year && parseInt(respond.timer.split('/')[1]) >= month) && parseInt(respond.timer.split('/')[2]) >= day) {
        if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
          res.render('photoshoot', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/photoshoot', photoshoot: { name: respond.nameAM, description: respond.descriptionAM, images: JSON.parse(respond.images), style: respond.style } });
        } else {
          res.render('photoshoot', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/photoshoot', photoshoot: { name: respond.nameEN, description: respond.descriptionEN, images: JSON.parse(respond.images), style: respond.style } });
        }
      } else {
        for (let img of JSON.parse(respond.images)) {
          fs.unlink('./public/images/' + img, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
          });
        }
        deletePhotoshoot(respond.id).then((photoshoot) => {
          res.redirect(HOME_URL + 'photoshoot/not_found')
        });
      }
    } else {
      res.redirect(HOME_URL + 'photoshoot/not_found')
    }
  });
});

router.get('/photoshoot/not_found', function (req, res, next) {
  if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
    res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/photoshoot', message: 'Ֆոտոշարքը չի գտնվել ', status: '404' });
  } else {
    res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/photoshoot', message: 'Photoshoot is not found', status: '404' });
  }
});

router.get('/photoshoot/:code', function (req, res, next) {
  findPhotoshoot(req.params.code).then((respond) => {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('photoshoot', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/photoshoot', photoshoot: { name: respond.nameAM, description: respond.descriptionAM, images: JSON.parse(respond.images), style: respond.style } });
    } else {
      res.render('photoshoot', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/photoshoot', photoshoot: { name: respond.nameEN, description: respond.descriptionEN, images: JSON.parse(respond.images), style: respond.style } });
    }
  });
});

router.get('/language/:lang', function (req, res, next) {
  res.cookie('language', req.params.lang, { httpOnly: true });
  res.redirect(req.headers.referer);
});

router.get('/images', function (req, res, next) {
  fs.readdir('./public/images/', (err, files) => {
    res.send(files);
  });
});

router.get('/portfolio/*', function (req, res, next) {
  findPortfolio(req._parsedOriginalUrl.pathname.slice(10, req._parsedOriginalUrl.pathname.length)).then((portfolio) => {
    if (portfolio) {
      if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
        res.render('portfolio', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/portfolio', portfolio: { name: portfolio.nameAM, description: portfolio.descriptionAM, mainImage: portfolio.mainImage, images: JSON.parse(portfolio.images), category: JSON.parse(portfolio.category).am } });
      } else {
        res.render('portfolio', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/portfolio', portfolio: { name: portfolio.nameEN, description: portfolio.descriptionEN, mainImage: portfolio.mainImage, images: JSON.parse(portfolio.images), category: JSON.parse(portfolio.category).en } });
      }
    } else {
      if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
        res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, message: 'Էջը չի գտնվել', status: '404' });
      } else {
        res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, message: 'Page not found', status: '404' });
      }
    }
  })
});

router.get('/decoration/*', function (req, res, next) {
  findDecoration(req._parsedOriginalUrl.pathname.slice(11, req._parsedOriginalUrl.pathname.length)).then((decoration) => {
    if (decoration) {
      if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
        res.render('decoration', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/decorations', decoration: { name: decoration.nameAM, description: decoration.descriptionAM, mainImage: decoration.mainImage, images: JSON.parse(decoration.images), type: decoration.type, status: decoration.status, related: decoration.related.split(';') } });
      } else {
        res.render('decoration', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/decorations', decoration: { name: decoration.nameEN, description: decoration.descriptionEN, mainImage: decoration.mainImage, images: JSON.parse(decoration.images), type: decoration.type, status: decoration.status, related: decoration.related.split(';') } });
      }
    } else {
      if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
        res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, message: 'Էջը չի գտնվել', status: '404' });
      } else {
        res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, message: 'Page not found', status: '404' });
      }
    }
  })
});

router.get('/*', function (req, res, next) {
  findPage(req._parsedOriginalUrl.pathname).then((page) => {
    if (page) {
      if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
        res.render('page', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, page: { name: page.nameAM, body: page.bodyAM, image: page.image } });
      } else {
        res.render('page', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, page: { name: page.nameEN, body: page.bodyEN, image: page.image } });
      }
    } else {
      if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
        res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, message: 'Էջը չի գտնվել', status: '404' });
      } else {
        res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, message: 'Page not found', status: '404' });
      }
    }
  })
});

module.exports = router;
