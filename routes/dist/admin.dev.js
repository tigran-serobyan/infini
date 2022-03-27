"use strict";

var express = require('express');

var router = express.Router();

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = 1E13 - Date.now() + '-' + Math.round(Math.random() * 1E5);
    cb(null, uniqueSuffix + '-' + file.fieldname + '-' + file.originalname.replace(/ /g, "").replace("(", "").replace(")", ""));
  }
});
var upload = multer({
  storage: storage
});

var fs = require('fs-extra');

var sharp = require('sharp');

var _require = require('../services/access'),
    haveAccess = _require.haveAccess,
    newAccess = _require.newAccess,
    changeUsername = _require.changeUsername,
    changePassword = _require.changePassword;

var _require2 = require('../services/constructor'),
    getInfo = _require2.getInfo,
    changeTitleAM = _require2.changeTitleAM,
    changeTitleEN = _require2.changeTitleEN,
    changeLogoAM = _require2.changeLogoAM,
    changeLogoEN = _require2.changeLogoEN,
    changeNavigationAM = _require2.changeNavigationAM,
    changeNavigationEN = _require2.changeNavigationEN,
    findPortfolioCategories = _require2.findPortfolioCategories,
    changePortfolioCategories = _require2.changePortfolioCategories,
    getHomeAM = _require2.getHomeAM,
    changeHomeAM = _require2.changeHomeAM,
    getHomeEN = _require2.getHomeEN,
    changeHomeEN = _require2.changeHomeEN,
    changeFooterAM = _require2.changeFooterAM,
    changeFooterEN = _require2.changeFooterEN,
    changeStyle = _require2.changeStyle,
    getTexts = _require2.getTexts,
    changeTexts = _require2.changeTexts;

var _require3 = require('../services/decorations'),
    findDecorations = _require3.findDecorations,
    findDecorationByID = _require3.findDecorationByID,
    addDecoration = _require3.addDecoration,
    updateDecoration = _require3.updateDecoration,
    deleteDecoration = _require3.deleteDecoration;

var _require4 = require('../services/portfolios'),
    findPortfolios = _require4.findPortfolios,
    findPortfolioByID = _require4.findPortfolioByID,
    addPortfolio = _require4.addPortfolio,
    updatePortfolio = _require4.updatePortfolio,
    deletePortfolio = _require4.deletePortfolio;

var _require5 = require('../services/photoshoots'),
    findPhotoshoots = _require5.findPhotoshoots,
    findPhotoshootByID = _require5.findPhotoshootByID,
    addPhotoshoot = _require5.addPhotoshoot,
    updatePhotoshoot = _require5.updatePhotoshoot,
    deletePhotoshoot = _require5.deletePhotoshoot;

var _require6 = require('../services/pages'),
    findPages = _require6.findPages,
    findPageByID = _require6.findPageByID,
    addPage = _require6.addPage,
    updatePage = _require6.updatePage,
    deletePage = _require6.deletePage;

var styles = ['Choose for editing', 'simple.css', 'classic.css', 'puzzle.css'];
var HOME_URL = process.env.HOME_URL; // Admin home page

router.get('/', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('admin', {
      title: 'Կառավարակետ',
      HOME_URL: HOME_URL
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); //Login page

router.get('/login', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.redirect(HOME_URL + 'admin');
  } else {
    res.render('login', {
      title: 'Մուտք',
      HOME_URL: HOME_URL,
      warning: req.cookies.access == 'wuop' ? true : false
    });
  }
}); //Login

router.post('/login', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.redirect(HOME_URL + 'admin');
  } else {
    res.cookie('access', newAccess(req.body.username, req.body.password), {
      httpOnly: true
    });
    res.redirect(HOME_URL + 'admin');
  }
}); //Logout

router.get('/logout', function (req, res, next) {
  res.cookie('access', '', {
    httpOnly: true
  });
  res.redirect(HOME_URL + 'admin');
}); //Change username password page

router.get('/profileChanges', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('changeProfile', {
      title: 'Մուտքանունի, գաղտնաբառի փոխում',
      HOME_URL: HOME_URL
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); //Change username

router.post('/changeUsername', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var respond = changeUsername(req.cookies.access, req.body.username, req.body.password, req.body.newUsername);

    if (!respond) {
      res.redirect(HOME_URL + 'admin');
    } else {
      res.redirect(HOME_URL + 'admin/login');
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); //Change password

router.post('/changePassword', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var respond = changePassword(req.cookies.access, req.body.username, req.body.password, req.body.newPassword);

    if (!respond) {
      res.redirect(HOME_URL + 'admin');
    } else {
      res.redirect(HOME_URL + 'admin/login');
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); //Change design page

router.get('/design', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('changeDesign', {
      title: 'Արտաքին տեսք, տեքստեր',
      HOME_URL: HOME_URL,
      texts: getTexts()
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); //Update design

router.post('/design', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var change = changeTexts(req.body.texts);

    if (change) {
      res.status(500).send(change);
    } else {
      res.status = 200;
      res.send('Text changes saved!');
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); //Change homepage page

router.get('/home', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var info = getInfo();
    info.navigationAM = JSON.stringify(info.navigationAM);
    info.navigationEN = JSON.stringify(info.navigationEN);
    res.render('changeHome', {
      title: 'Գլխավոր էջի կառուցվածք',
      HOME_URL: HOME_URL,
      info: info,
      homeAM: {
        slides: JSON.stringify(getHomeAM().slides),
        disposition: JSON.stringify(getHomeAM().disposition)
      },
      homeEN: {
        slides: JSON.stringify(getHomeEN().slides),
        disposition: JSON.stringify(getHomeEN().disposition)
      }
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); //Update Navigation AM

router.post('/updateNavigationAM', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var change = changeNavigationAM(JSON.parse(req.body.value));

    if (change) {
      res.status(500).send(change);
    } else {
      res.status = 200;
      res.send('Menu changes saved(am)');
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); //Update Navigation EN

router.post('/updateNavigationEN', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var change = changeNavigationEN(JSON.parse(req.body.value));

    if (change) {
      res.status(500).send(change);
    } else {
      res.status = 200;
      res.send('Menu changes saved(en)');
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); // Change title and logo AM

router.post('/updateTitleLogoAM', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var change = changeTitleAM(req.body.title);

    if (change) {
      res.status(500).send(change);
    } else {
      var change_ = changeLogoAM(req.body.logo);

      if (change_) {
        res.status(500).send(change_);
      } else {
        res.status = 200;
        res.send('Title and Logo changes saved(am)');
      }
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); // Change title and logo EN

router.post('/updateTitleLogoEN', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var change = changeTitleEN(req.body.title);

    if (change) {
      res.status(500).send(change);
    } else {
      var change_ = changeLogoEN(req.body.logo);

      if (change_) {
        res.status(500).send(change_);
      } else {
        res.status = 200;
        res.send('Title and Logo changes saved(en)');
      }
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); // Change footer AM

router.post('/updateFooterAM', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var change = changeFooterAM(req.body.footer);

    if (change) {
      res.status(500).send(change);
    } else {
      res.status = 200;
      res.send('Footer changes saved(am)');
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); // Change footer EN

router.post('/updateFooterEN', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var change = changeFooterEN(req.body.footer);

    if (change) {
      res.status(500).send(change);
    } else {
      res.status = 200;
      res.send('Footer changes saved(en)');
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); //Change home structure AM

router.post('/updateHomeAM', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var change = changeHomeAM(req.body.home);

    if (change) {
      res.status(500).send(change);
    } else {
      res.status = 200;
      res.send('Home page structure is saved! (am)');
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); //Change home structure EN

router.post('/updateHomeEN', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var change = changeHomeEN(req.body.home);

    if (change) {
      res.status(500).send(change);
    } else {
      res.status = 200;
      res.send('Home page structure is saved! (en)');
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); // Decorations

router.get('/decorations', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var decorations = findDecorations().sort(function (a, b) {
      return a._id - b._id;
    });

    if (decorations) {
      var decorations_ = [];

      for (var i = 0; i < decorations.length; i++) {
        decorations_.push({
          id: decorations[i]._id,
          url: decorations[i].url,
          nameAM: decorations[i].nameAM,
          nameEN: decorations[i].nameEN,
          descriptionAM: decorations[i].descriptionAM,
          descriptionEN: decorations[i].descriptionEN,
          mainImage: decorations[i].mainImage,
          images: JSON.parse(decorations[i].images),
          type: decorations[i].type,
          status: decorations[i].status,
          related: decorations[i].related
        });
      }

      res.render('adminTable', {
        title: 'Դեկորացիաներ',
        HOME_URL: HOME_URL,
        table: decorations_,
        forWhat: 'Decorations'
      });
    } else {
      res.redirect(HOME_URL + 'admin/login');
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); // New decoration

router.get('/new/decoration', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('newDecoration', {
      title: 'Նոր դեկորացիա',
      HOME_URL: HOME_URL
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/new/decoration', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var respond = addDecoration(req.body);
    console.log(respond);

    if (respond) {
      res.status(500).send('Server side error');
    } else {
      res.send('Done');
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); //Change decoration

router.get('/edit/decoration/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var decoration = findDecorationByID(req.params.id);

    if (decoration) {
      res.render('newDecoration', {
        title: 'Խմբագրել դեկորացիա',
        decoration: decoration,
        HOME_URL: HOME_URL
      });
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/edit/decoration/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    req.body._id = req.params.id;
    var respond = updateDecoration(req.params.id, req.body);

    if (respond) {
      res.status(500).send('Server side error');
    } else {
      res.send('Done');
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router["delete"]('/delete/decoration/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var respond = deleteDecoration(req.params.id);

    if (respond) {
      res.status(500).send('Server side error');
    } else {
      res.send('Done');
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); // Portfolio

router.get('/portfolio', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var portfolios = findPortfolios().sort(function (a, b) {
      return a._id - b._id;
    });

    if (portfolios) {
      var portfolios_ = [];

      for (var i = 0; i < portfolios.length; i++) {
        portfolios_.push({
          id: portfolios[i]._id,
          url: portfolios[i].url,
          nameAM: portfolios[i].nameAM,
          nameEN: portfolios[i].nameEN,
          descriptionAM: portfolios[i].descriptionAM,
          descriptionEN: portfolios[i].descriptionEN,
          mainImage: portfolios[i].mainImage,
          images: JSON.parse(portfolios[i].images),
          category: portfolios[i].category
        });
      }

      res.render('adminTable', {
        title: 'Պորտֆոլիո',
        HOME_URL: HOME_URL,
        table: portfolios_,
        forWhat: 'Portfolios'
      });
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); // Portfolio categories

router.get('/portfolio/category', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('categories', {
      title: 'Բաժիններ',
      HOME_URL: HOME_URL,
      categories: {
        i: JSON.stringify(findPortfolioCategories().i),
        c: JSON.stringify(findPortfolioCategories().c)
      }
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/updateCategories', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var respond = changePortfolioCategories(JSON.parse(req.body.value));

    if (!respond) {
      res.status = 200;
      res.send('Categories saved!`');
    } else {
      res.status = 500;
      res.send(err);
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); // New portfolio

router.get('/new/portfolio', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('newPortfolio', {
      title: 'Նոր աշխատանք',
      HOME_URL: HOME_URL,
      categories: findPortfolioCategories()
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/new/portfolio', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var respond = addPortfolio(req.body);

    if (respond) {
      res.status(500).send('Server side error');
    } else {
      res.send('Done');
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); //Change portfolio

router.get('/edit/portfolio/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var portfolio = findPortfolioByID(req.params.id);

    if (portfolio) {
      res.render('newPortfolio', {
        title: 'Խմբագրել ֆոտոշարք',
        portfolio: portfolio,
        HOME_URL: HOME_URL,
        categories: findPortfolioCategories()
      });
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/edit/portfolio/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    req.body._id = req.params.id;
    var respond = updatePortfolio(req.params.id, req.body);

    if (respond) {
      res.status(500).send('Server side error');
    } else {
      res.send('Done');
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router["delete"]('/delete/portfolio/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var respond = deletePortfolio(req.params.id);

    if (respond) {
      res.status(500).send('Server side error');
    } else {
      res.send('Done');
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); // Photoshoots

router.get('/photoshoots', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var photoshoots = findPhotoshoots().sort(function (a, b) {
      return a._id - b._id;
    });

    if (photoshoots) {
      var date = new Date();
      var photoshoots_ = [];

      for (var i = 0; i < photoshoots.length; i++) {
        var d = new Date();

        if (photoshoots[i].timer) {
          d = new Date(photoshoots[i].timer);
        }

        if (!photoshoots[i].timer || d - date > 0) {
          photoshoots_.push({
            id: photoshoots[i]._id,
            code: photoshoots[i].code,
            nameAM: photoshoots[i].nameAM,
            nameEN: photoshoots[i].nameEN,
            descriptionAM: photoshoots[i].descriptionAM,
            descriptionEN: photoshoots[i].descriptionEN,
            images: JSON.parse(photoshoots[i].images),
            style: photoshoots[i].style,
            timer: photoshoots[i].timer
          });
        } else {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            var _loop = function _loop() {
              var img = _step.value;
              fs.unlink('./public/images/' + img.url, function (err) {
                if (err) return console.log(err);
                fs.unlink('./public/lowres_images/' + img.url, function (err) {
                  if (err) return console.log(err);
                  fs.unlink('./public/lowres_images/' + img.url, function (err) {
                    if (err) return console.log(err);
                  });
                });
              });
            };

            for (var _iterator = JSON.parse(photoshoots[i].images)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _loop();
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          deletePhotoshoot(photoshoots[i].id);
        }
      }

      res.render('adminTable', {
        title: 'Ֆոտոշարքեր',
        HOME_URL: HOME_URL,
        table: photoshoots_,
        forWhat: 'Photoshoots'
      });
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); // New photoshoot

router.get('/new/photoshoot', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('newPhotshoot', {
      title: 'Նոր ֆոտոշարք',
      HOME_URL: HOME_URL,
      styles: styles
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/new/photoshoot', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var respond = addPhotoshoot(req.body);

    if (respond) {
      res.status(500).send('Server side error');
    } else {
      res.send('Done');
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); //Change photoshoot 

router.get('/edit/photoshoot/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var photoshoot = findPhotoshootByID(req.params.id);

    if (photoshoot) {
      // photoshoot.images = JSON.parse(photoshoot.images);
      res.render('newPhotshoot', {
        title: 'Խմբագրել ֆոտոշարք',
        photoshoot: photoshoot,
        HOME_URL: HOME_URL,
        styles: styles
      });
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/edit/photoshoot/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    req.body._id = req.params.id;
    var respond = updatePhotoshoot(req.params.id, req.body);

    if (respond) {
      res.status(500).send('Server side error');
    } else {
      res.send('Done');
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router["delete"]('/delete/photoshoot/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var photoshoot = findPhotoshootByID(req.params.id);

    if (photoshoot) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop2 = function _loop2() {
          var img = _step2.value;
          fs.unlink('./public/images/' + img.url, function (err) {
            if (err) return console.log(err);
            fs.unlink('./public/lowres_images/' + img.url, function (err) {
              if (err) return console.log(err);
              fs.unlink('./public/lowres_images/' + img.url, function (err) {
                if (err) return console.log(err);
              });
            });
          });
        };

        for (var _iterator2 = JSON.parse(photoshoot.images)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop2();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var respond = deletePhotoshoot(photoshoot._id);

      if (respond) {
        res.status(500).send('Server side error');
      } else {
        res.send('Done');
      }
    } else {
      res.status(500).send('Server side error');
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); // Pages

router.get('/pages', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var pages = findPages().sort(function (a, b) {
      return a.url.localeCompare(b.url);
    });

    if (pages) {
      res.render('adminTable', {
        title: 'Էջեր',
        HOME_URL: HOME_URL,
        table: pages,
        forWhat: 'Pages'
      });
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); // New page

router.get('/new/page', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('newPage', {
      title: 'Նոր էջ',
      HOME_URL: HOME_URL
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/new/page', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var respond = addPage(req.body);

    if (respond) {
      res.status(500).send('Server side error');
    } else {
      res.send('Done');
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
}); //Change page 

router.get('/edit/page/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var page = findPageByID(req.params.id);

    if (page) {
      res.render('newPage', {
        title: 'Խմբագրել ֆոտոշարք',
        page: page,
        HOME_URL: HOME_URL
      });
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/edit/page/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    req.body._id = req.params.id;
    var respond = updatePage(req.params.id, req.body);

    if (respond) {
      res.status(500).send('Server side error');
    } else {
      res.send('Done');
    }
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router["delete"]('/delete/page/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    var respond = deletePage(req.params.id);

    if (respond) {
      res.status(500).send('Server side error');
    } else {
      res.send('Done');
    }
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
}); // Upload

router.post('/upload', upload.single('image'), function (req, res, next) {
  req.file.filename = req.file.filename.replace(/ /g, "").replace("(", "").replace(")", "");
  fs.readFile('./public/images/' + req.file.filename, function (err, data) {
    sharp(data).resize(200).toFile('./public/lowres_images/' + req.file.filename, function (err, info) {
      if (haveAccess(req.cookies.access)) {
        sharp(data).resize(800).toFile('./public/midres_images/' + req.file.filename, function (err, info) {
          if (haveAccess(req.cookies.access)) {
            res.send('/images/' + req.file.filename);
          } else {
            res.redirect(HOME_URL + 'admin/login');
          }
        });
      } else {
        res.redirect(HOME_URL + 'admin/login');
      }
    });
  });
});
router["delete"]('/deleteImage/:image', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    fs.unlink('./public/images/' + req.params.image, function (err) {
      if (err) return console.log(err);
      fs.unlink('./public/lowres_images/' + req.params.image, function (err) {
        if (err) return console.log(err);
        fs.unlink('./public/midres_images/' + req.params.image, function (err) {
          if (err) return console.log(err);
          res.send('Done!');
        });
      });
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.get('/jsons/get/:json', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.send(JSON.parse(fs.readFileSync('./' + req.params.json + '.json').toString('utf-8')));
  } else {
    res.send('Page not found');
  }
});
module.exports = router;