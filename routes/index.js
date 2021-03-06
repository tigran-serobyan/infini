var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
let stat = require('fs-extra').statSync;
var AdmZip = require('adm-zip');
var { getInfo, findPortfolioCategories, getHomeAM, getHomeEN, getTexts } = require('../services/constructor');
var { findPhotoshoot, updatePhotoshoot, deletePhotoshoot } = require('../services/photoshoots');
var { findPage, findPages } = require('../services/pages');
var { findPortfolios, findPortfolio } = require('../services/portfolios');
var { findDecorations, findDecoration } = require('../services/decorations');
var HOME_URL = process.env.HOME_URL;

/* GET home page. */
router.get('/', function (req, res, next) {
  let portfolio = findPortfolios().sort(function (a, b) { return a._id - b._id })
  let decorations = findDecorations().sort(function (a, b) { return a._id - b._id })
  if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
    let portfolio_ = [];
    let decorations_ = [];
    if (portfolio) {
      let i = 0;
      for (work of portfolio) {
        i++;
        portfolio_.push({
          url: work.url,
          name: work.nameAM,
          mainImage: work.mainImage,
          category: JSON.parse(work.category).am
        })
        if (i == 4) {
          break;
        }
      }
    }
    if (decorations) {
      let decorations_trending = [];
      let decorations_new = [];
      let decorations_null = [];
      let decorations_order = [];
      for (decoration of decorations) {
        let d = {
          url: decoration.url,
          name: decoration.nameAM,
          mainImage: decoration.mainImage,
          type: decoration.type,
          status: decoration.status
        };
        if (d.status == 'trending') {
          decorations_trending.push(d);
        } else if (d.status == 'new') {
          decorations_new.push(d);
        } else if (d.status == 'order') {
          decorations_order.push(d);
        } else {
          decorations_null.push(d);
        }
      }
      let i = 0;
      for (d of decorations_trending) {
        if (i == 4) {
          break;
        }
        decorations_.push(d);
        i++;
      }
      for (d of decorations_new) {
        if (i == 4) {
          break;
        }
        decorations_.push(d);
        i++;
      }
      for (d of decorations_null) {
        if (i == 4) {
          break;
        }
        decorations_.push(d);
        i++;
      }
      for (d of decorations_order) {
        if (i == 4) {
          break;
        }
        decorations_.push(d);
        i++;
      }
    }
    res.render('index', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, home: getHomeAM(), navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/', portfolio: portfolio_, decorations: decorations_ });
  } else {
    let portfolio_ = [];
    let decorations_ = [];
    if (portfolio) {
      let i = 0;
      for (work of portfolio) {
        i++;
        portfolio_.push({
          url: work.url,
          name: work.nameEN,
          mainImage: work.mainImage,
          category: JSON.parse(work.category).en
        });
        if (i == 4) {
          break;
        }
      }
    }
    if (decorations) {
      let decorations_trending = [];
      let decorations_new = [];
      let decorations_null = [];
      let decorations_order = [];
      for (decoration of decorations) {
        let d = {
          url: decoration.url,
          name: decoration.nameEN,
          mainImage: decoration.mainImage,
          type: decoration.type,
          status: decoration.status
        };
        if (d.status == 'trending') {
          decorations_trending.push(d);
        } else if (d.status == 'new') {
          decorations_new.push(d);
        } else if (d.status == 'order') {
          decorations_order.push(d);
        } else {
          decorations_null.push(d);
        }
      }
      let i = 0;
      for (d of decorations_trending) {
        if (i == 4) {
          break;
        }
        decorations_.push(d);
        i++;
      }
      for (d of decorations_new) {
        if (i == 4) {
          break;
        }
        decorations_.push(d);
        i++;
      }
      for (d of decorations_null) {
        if (i == 4) {
          break;
        }
        decorations_.push(d);
        i++;
      }
      for (d of decorations_order) {
        if (i == 4) {
          break;
        }
        decorations_.push(d);
        i++;
      }
    }
    res.render('index', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, home: getHomeEN(), navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/', portfolio: portfolio_, decorations: decorations_ });
  }
});

router.get('/search', function (req, res, next) {
  let code = req.query.s.toLocaleLowerCase().replace(/ /g, "");
  let respond = findPhotoshoot(code)
  if (respond) {
    res.redirect(HOME_URL + 'photoshoot/' + code)
  }
  else {
    let portfolio = findPortfolios().sort(function (a, b) { return a._id - b._id })
    let decorations = findDecorations().sort(function (a, b) { return a._id - b._id })
    let pages = findPages();
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      let pages_ = [];
      let portfolio_ = [];
      let decorations_ = [];
      if (pages) {
        for (let page of pages) {
          let _page = {
            url: page.url,
            name: page.nameAM,
            body: page.bodyAM
          }
          if (search(req.query.s, _page) || search(code, _page)) {
            pages_.push({
              url: page.url,
              name: page.nameAM
            });
          }
        }
      }
      if (portfolio) {
        for (let work of portfolio) {
          let _work = {
            url: work.url,
            name: work.nameAM,
            description: work.descriptionAM,
            category: JSON.parse(work.category).am
          }
          if (search(req.query.s, _work)) {
            portfolio_.push({
              url: work.url,
              name: work.nameAM,
              mainImage: work.mainImage,
              category: JSON.parse(work.category).am
            });
          }
        }
      }
      if (decorations) {
        let decorations_trending = [];
        let decorations_new = [];
        let decorations_null = [];
        let decorations_order = [];
        for (let decoration of decorations) {
          let _decoration = {
            url: decoration.url,
            name: decoration.nameAM,
            description: decoration.descriptionAM
          }
          if (!search(req.query.s, _decoration)) {
            continue;
          }
          let d = {
            url: decoration.url,
            name: decoration.nameAM,
            mainImage: decoration.mainImage,
            type: decoration.type,
            status: decoration.status
          };
          if (d.status == 'trending') {
            decorations_trending.push(d);
          } else if (d.status == 'new') {
            decorations_new.push(d);
          } else if (d.status == 'order') {
            decorations_order.push(d);
          } else {
            decorations_null.push(d);
          }
        }
        for (d of decorations_trending) {
          decorations_.push(d);
        }
        for (d of decorations_new) {
          decorations_.push(d);
        }
        for (d of decorations_null) {
          decorations_.push(d);
        }
        for (d of decorations_order) {
          decorations_.push(d);
        }
      }
      res.render('search', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/search', portfolio: portfolio_, decorations: decorations_, pages: pages_, portfolioTitle: getTexts().portfolioTitleam, decorationsTitle: getTexts().decorationsTitleam, pagesTitle: getTexts().pagesTitleam, searched: getTexts().searchedam, nothingFound: !(pages_.length || portfolio_.length || decorations_.length) ? getTexts().nothingfoundam : '', query: req.query.s });
    } else {
      let pages_ = [];
      let portfolio_ = [];
      let decorations_ = [];
      if (pages) {
        for (let page of pages) {
          let _page = {
            url: page.url,
            name: page.nameEN,
            body: page.bodyEN
          }
          if (search(req.query.s, _page) || search(code, _page)) {
            pages_.push({
              url: page.url,
              name: page.nameEN
            });
          }
        }
      }
      if (portfolio) {
        for (let work of portfolio) {
          let _work = {
            url: work.url,
            name: work.nameEN,
            description: work.descriptionEN,
            category: JSON.parse(work.category).en
          }
          if (search(req.query.s, _work)) {
            portfolio_.push({
              url: work.url,
              name: work.nameEN,
              mainImage: work.mainImage,
              category: JSON.parse(work.category).en
            });
          }
        }
      }
      if (decorations) {
        let decorations_trending = [];
        let decorations_new = [];
        let decorations_null = [];
        let decorations_order = [];
        for (let decoration of decorations) {
          let _decoration = {
            url: decoration.url,
            name: decoration.nameEN,
            description: decoration.descriptionEN
          }
          if (!search(req.query.s, _decoration)) {
            continue;
          }
          let d = {
            url: decoration.url,
            name: decoration.nameEN,
            mainImage: decoration.mainImage,
            type: decoration.type,
            status: decoration.status
          };
          if (d.status == 'trending') {
            decorations_trending.push(d);
          } else if (d.status == 'new') {
            decorations_new.push(d);
          } else if (d.status == 'order') {
            decorations_order.push(d);
          } else {
            decorations_null.push(d);
          }
        }
        for (d of decorations_trending) {
          decorations_.push(d);
        }
        for (d of decorations_new) {
          decorations_.push(d);
        }
        for (d of decorations_null) {
          decorations_.push(d);
        }
        for (d of decorations_order) {
          decorations_.push(d);
        }
      }
      res.render('search', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/search', portfolio: portfolio_, decorations: decorations_, pages: pages_, portfolioTitle: getTexts().portfolioTitleen, decorationsTitle: getTexts().decorationsTitleen, pagesTitle: getTexts().pagesTitleen, searched: getTexts().searcheden, nothingFound: !(pages_.length || portfolio_.length || decorations_.length) ? getTexts().nothingfounden : '', query: req.query.s });
    }
  }
});

router.get('/photoshoot/not_found', function (req, res, next) {
  if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
    res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/photoshoot', message: getTexts().photoshootNotFoundam, status: '404' });
  } else {
    res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/photoshoot', message: getTexts().photoshootNotFounden, status: '404' });
  }
});

router.get('/photoshoot/:code', function (req, res, next) {
  let respond = findPhotoshoot(req.params.code)
  if (respond) {
    let date = new Date();
    let d = new Date();
    if (respond.timer) {
      d = new Date(respond.timer)
    }
    if (!respond.timer || d - date > 0) {
      if (respond.style == 'Choose for editing') {
        if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
          res.render('photoshootChoose', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/photoshoot', photoshoot: { code: respond.code, name: respond.nameAM, chooseForEditing: true, description: respond.descriptionAM, images: JSON.parse(respond.images), style: 'simple.css', date: respond.timer ? getTexts().availableForDownloadUntilam + respond.timer : '' }, downloadText: getTexts().downloadAllam, saveText: getTexts().saveam });
        } else {
          res.render('photoshootChoose', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/photoshoot', photoshoot: { code: respond.code, name: respond.nameEN, chooseForEditing: true, description: respond.descriptionEN, images: JSON.parse(respond.images), style: 'simple.css', date: respond.timer ? getTexts().availableForDownloadUntilen + respond.timer : '' }, downloadText: getTexts().downloadAllen, saveText: getTexts().saveen });
        }
      } else {
        if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
          res.render('photoshoot', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/photoshoot', photoshoot: { code: respond.code, name: respond.nameAM, description: respond.descriptionAM, images: JSON.parse(respond.images), style: respond.style, date: respond.timer ? getTexts().availableForDownloadUntilam + respond.timer : '' }, downloadText: getTexts().downloadAllam });
        } else {
          res.render('photoshoot', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/photoshoot', photoshoot: { code: respond.code, name: respond.nameEN, description: respond.descriptionEN, images: JSON.parse(respond.images), style: respond.style, date: respond.timer ? getTexts().availableForDownloadUntilen + respond.timer : '' }, downloadText: getTexts().downloadAllen });
        }
      }
    } else {
      for (let img of JSON.parse(respond.images)) {
        fs.unlink('./public/images/' + img, function (err) {
          if (err) return console.log(err);
          fs.unlink('./public/lowres_images/' + img, function (err) {
            if (err) return console.log(err);
            fs.unlink('./public/midres_images/' + img, function (err) {
              if (err) return console.log(err);
            });
          });
        });
      }
      deletePhotoshoot(respond.id);
      res.redirect(HOME_URL + 'photoshoot/not_found')
    }
  } else {
    res.redirect(HOME_URL + 'photoshoot/not_found')
  }
});

router.post('/edit/photoshoot/', function (req, res, next) {
  let data = findPhotoshoot(req.body.code)
  if (data) {
    data.images = req.body.images;
    let respond = updatePhotoshoot(data._id, data)
    if (!respond) {
      if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
        res.send(getTexts().allChangesAreSavedam);
      } else {
        res.send(getTexts().allChangesAreSaveden);
      }
    } else {
      res.send('Error');
    }
  } else {
    res.send('Error');
  }
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

router.get('/files/download/all', function (req, res, next) {
  fs.readdir('./public/images/', (err, files) => {
    let zip = new AdmZip();
    for (let path of files) {
      let p = stat('./public/images/' + path);
      if (p.isFile()) {
        zip.addLocalFile('./public/images/' + path);
      }
    }
    zip.addLocalFile('./infini.json');
    zip.addLocalFile('./loginInfo.json');
    zip.addLocalFile('./pages.json');
    zip.addLocalFile('./photoshoots.json');
    zip.addLocalFile('./portfolios.json');
    let filename = './public/all-infini_photos.zip';
    zip.writeZip(filename);
    res.download(filename);
    setTimeout(() => {
      fs.unlink(filename, function (err) {
        if (err) return console.log(err);
      });
    }, 600000);
  });
});
router.get('/images/photoshoot/:code/:filename', function (req, res, next) {
  let images = JSON.parse(findPhotoshoot(req.params.code).images);
  let list = [];
  for (let i of images) {
    list.push(i.url)
  }
  let zip = new AdmZip();
  for (let path of list) {
    let p = stat('./public/images/' + path);
    if (p.isFile()) {
      zip.addLocalFile('./public/images/' + path);
    }
  }
  let filename = './public/' + req.params.filename + '-infini_photos.zip';
  zip.writeZip(filename);
  res.download(filename);
  setTimeout(() => {
    fs.unlink(filename, function (err) {
      if (err) return console.log(err);
    });
  }, 600000);
});

router.get('/portfolio', function (req, res, next) {
  let portfolio = findPortfolios().sort(function (a, b) { return a._id - b._id })
  if (portfolio) {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      let portfolio_ = [];
      for (work of portfolio) {
        portfolio_.push({
          url: work.url,
          name: work.nameAM,
          mainImage: work.mainImage,
          category: JSON.parse(work.category).en
        })
      }
      res.render('allPortfolio', { subtitle: getTexts().portfolioTitleam, language: 'am', HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/portfolio', portfolio: portfolio_, categories: findPortfolioCategories().i.concat(findPortfolioCategories().c) });
    } else {
      let portfolio_ = [];
      for (work of portfolio) {
        portfolio_.push({
          url: work.url,
          name: work.nameEN,
          mainImage: work.mainImage,
          category: JSON.parse(work.category).en
        })
      }
      res.render('allPortfolio', { subtitle: getTexts().portfolioTitleen, language: 'en', HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/portfolio', portfolio: portfolio_, categories: findPortfolioCategories().i.concat(findPortfolioCategories().c) });
    }
  } else {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFoundam, status: '404' });
    } else {
      res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFounden, status: '404' });
    }
  }
});

// router.get('/portfolio/individual', function (req, res, next) {
//   let portfolio = findPortfolios().sort(function (a, b) { return a._id - b._id })
//   if (portfolio) {
//     if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
//       let portfolio_ = [];
//       for (work of portfolio) {
//         for (let c of findPortfolioCategories().i) {
//           if (c.am == JSON.parse(work.category).am || c.en == JSON.parse(work.category).en) {
//             portfolio_.push({
//               url: work.url,
//               name: work.nameAM,
//               mainImage: work.mainImage,
//               category: JSON.parse(work.category).en
//             })
//           }
//         }
//       }
//       res.render('allPortfolio', { subtitle: getTexts().portfolioIndividualam, language: 'am', HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/portfolio/individual', portfolio: portfolio_, categories: findPortfolioCategories().i });
//     } else {
//       let portfolio_ = [];
//       for (work of portfolio) {
//         for (let c of findPortfolioCategories().i) {
//           if (c.am == JSON.parse(work.category).am || c.en == JSON.parse(work.category).en) {
//             portfolio_.push({
//               url: work.url,
//               name: work.nameEN,
//               mainImage: work.mainImage,
//               category: JSON.parse(work.category).en
//             })
//           }
//         }
//       }
//       res.render('allPortfolio', { subtitle: getTexts().portfolioIndividualen, language: 'en', HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/portfolio/individual', portfolio: portfolio_, categories: findPortfolioCategories().i });
//     }
//   } else {
//     if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
//       res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFoundam, status: '404' });
//     } else {
//       res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFounden, status: '404' });
//     }
//   }
// });

router.get('/portfolio/commercial', function (req, res, next) {
  let portfolio = findPortfolios().sort(function (a, b) { return a._id - b._id })
  if (portfolio) {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      let portfolio_ = [];
      for (work of portfolio) {
        for (let c of findPortfolioCategories().c) {
          if (c.am == JSON.parse(work.category).am || c.en == JSON.parse(work.category).en) {
            portfolio_.push({
              url: work.url,
              name: work.nameAM,
              mainImage: work.mainImage,
              category: JSON.parse(work.category).en
            })
          }
        }
      }
      res.render('allPortfolio', { subtitle: getTexts().portfolioCommercialam, language: 'am', HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/portfolio/commercial', portfolio: portfolio_, categories: findPortfolioCategories().c });
    } else {
      let portfolio_ = [];
      for (work of portfolio) {
        for (let c of findPortfolioCategories().c) {
          if (c.am == JSON.parse(work.category).am || c.en == JSON.parse(work.category).en) {
            portfolio_.push({
              url: work.url,
              name: work.nameEN,
              mainImage: work.mainImage,
              category: JSON.parse(work.category).en
            })
          }
        }
      }
      res.render('allPortfolio', { subtitle: getTexts().portfolioCommercialen, language: 'en', HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/portfolio/commercial', portfolio: portfolio_, categories: findPortfolioCategories().c });
    }
  } else {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFoundam, status: '404' });
    } else {
      res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFounden, status: '404' });
    }
  }
});

router.get('/portfolio/*', function (req, res, next) {
  let portfolio = findPortfolio(req._parsedOriginalUrl.pathname.slice(10, req._parsedOriginalUrl.pathname.length))
  if (portfolio) {
    if (portfolio) {
      if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
        res.render('portfolio', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/portfolio', portfolio: { name: portfolio.nameAM, description: portfolio.descriptionAM, mainImage: portfolio.mainImage, images: JSON.parse(portfolio.images), category: JSON.parse(portfolio.category).am } });
      } else {
        res.render('portfolio', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/portfolio', portfolio: { name: portfolio.nameEN, description: portfolio.descriptionEN, mainImage: portfolio.mainImage, images: JSON.parse(portfolio.images), category: JSON.parse(portfolio.category).en } });
      }
    } else {
      if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
        res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFoundam, status: '404' });
      } else {
        res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFounden, status: '404' });
      }
    }
  } else {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFoundam, status: '404' });
    } else {
      res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFounden, status: '404' });
    }
  }
});

router.get('/decorations', function (req, res, next) {
  let decorations = findDecorations().sort(function (a, b) { return a._id - b._id })
  if (decorations) {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      let decorations_ = [];
      for (decoration of decorations) {
        decorations_.push({
          url: decoration.url,
          name: decoration.nameAM,
          mainImage: decoration.mainImage,
          type: decoration.type,
          status: decoration.status
        })
      }
      res.render('allDecorations', { subtitle: getTexts().decorationsTitleam, language: 'am', HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/decorations', decorations: decorations_ });
    } else {
      let decorations_ = [];
      for (decoration of decorations) {
        decorations_.push({
          url: decoration.url,
          name: decoration.nameEN,
          mainImage: decoration.mainImage,
          type: decoration.type,
          status: decoration.status
        })
      }
      res.render('allDecorations', { subtitle: getTexts().decorationsTitleen, language: 'en', HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/decorations', decorations: decorations_ });
    }
  } else {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFoundam, status: '404' });
    } else {
      res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFounden, status: '404' });
    }
  }
});

router.get('/decoration/*', function (req, res, next) {
  let decoration = findDecoration(req._parsedOriginalUrl.pathname.slice(11, req._parsedOriginalUrl.pathname.length))
  if (decoration) {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('decoration', { HOME_URL, lang: 'am', title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: '/decorations', decoration: { name: decoration.nameAM, description: decoration.descriptionAM, mainImage: decoration.mainImage, images: JSON.parse(decoration.images), type: decoration.type, status: decoration.status, related: decoration.related.split(';') } });
    } else {
      res.render('decoration', { HOME_URL, lang: 'en', title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: '/decorations', decoration: { name: decoration.nameEN, description: decoration.descriptionEN, mainImage: decoration.mainImage, images: JSON.parse(decoration.images), type: decoration.type, status: decoration.status, related: decoration.related.split(';') } });
    }
  } else {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFoundam, status: '404' });
    } else {
      res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFounden, status: '404' });
    }
  }
});

router.get('/*', function (req, res, next) {
  console.log(req._parsedOriginalUrl.pathname);
  let page = findPage(req._parsedOriginalUrl.pathname)
  if (page) {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('page', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, page: { name: page.nameAM, body: page.bodyAM, image: page.image } });
    } else {
      res.render('page', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, page: { name: page.nameEN, body: page.bodyEN, image: page.image } });
    }
  } else {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('error', { HOME_URL, title: getInfo().titleAM, footer: getInfo().footerAM, navigation: { title: getInfo().titleAM, logo: getInfo().logoAM, navigation: getInfo().navigationAM }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFoundam, status: '404' });
    } else {
      res.render('error', { HOME_URL, title: getInfo().titleEN, footer: getInfo().footerEN, navigation: { title: getInfo().titleEN, logo: getInfo().logoEN, navigation: getInfo().navigationEN }, current: req._parsedOriginalUrl.pathname, message: getTexts().pageNotFounden, status: '404' });
    }
  }
});

function search(query, content) {
  query = query.toUpperCase().slice(0, -1);
  let filtered = query.replace(/  /g, " ").replace(/  /g, " ").replace(/  /g, " ").replace(/  /g, " ");
  for (let j in content) {
    let param = content[j];
    if (param.toUpperCase().indexOf(query) > -1 || param.toUpperCase().indexOf(filtered) > -1) {
      return true
    }
  }
  return false
}

module.exports = router;