"use strict";

var express = require('express');

var router = express.Router();

var fs = require('fs-extra');

var stat = require('fs-extra').statSync;

var AdmZip = require('adm-zip');

var _require = require('../services/constructor'),
    getInfo = _require.getInfo,
    findPortfolioCategories = _require.findPortfolioCategories,
    getHomeAM = _require.getHomeAM,
    getHomeEN = _require.getHomeEN,
    getTexts = _require.getTexts;

var _require2 = require('../services/photoshoots'),
    findPhotoshoot = _require2.findPhotoshoot,
    updatePhotoshoot = _require2.updatePhotoshoot,
    deletePhotoshoot = _require2.deletePhotoshoot;

var _require3 = require('../services/pages'),
    findPage = _require3.findPage,
    findPages = _require3.findPages;

var _require4 = require('../services/portfolios'),
    findPortfolios = _require4.findPortfolios,
    findPortfolio = _require4.findPortfolio;

var _require5 = require('../services/decorations'),
    findDecorations = _require5.findDecorations,
    findDecoration = _require5.findDecoration;

var HOME_URL = process.env.HOME_URL;
/* GET home page. */

router.get('/', function (req, res, next) {
  var portfolio = findPortfolios().sort(function (a, b) {
    return a._id - b._id;
  });
  var decorations = findDecorations().sort(function (a, b) {
    return a._id - b._id;
  });

  if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
    var portfolio_ = [];
    var decorations_ = [];

    if (portfolio) {
      var i = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = portfolio[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          work = _step.value;
          i++;
          portfolio_.push({
            url: work.url,
            name: work.nameAM,
            mainImage: work.mainImage,
            category: JSON.parse(work.category).am
          });

          if (i == 4) {
            break;
          }
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
    }

    if (decorations) {
      var decorations_trending = [];
      var decorations_new = [];
      var decorations_null = [];
      var decorations_order = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = decorations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          decoration = _step2.value;
          var _d = {
            url: decoration.url,
            name: decoration.nameAM,
            mainImage: decoration.mainImage,
            type: decoration.type,
            status: decoration.status
          };

          if (_d.status == 'trending') {
            decorations_trending.push(_d);
          } else if (_d.status == 'new') {
            decorations_new.push(_d);
          } else if (_d.status == 'order') {
            decorations_order.push(_d);
          } else {
            decorations_null.push(_d);
          }
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

      var _i = 0;

      for (var _i2 = 0, _decorations_trending = decorations_trending; _i2 < _decorations_trending.length; _i2++) {
        d = _decorations_trending[_i2];

        if (_i == 4) {
          break;
        }

        decorations_.push(d);
        _i++;
      }

      for (var _i3 = 0, _decorations_new = decorations_new; _i3 < _decorations_new.length; _i3++) {
        d = _decorations_new[_i3];

        if (_i == 4) {
          break;
        }

        decorations_.push(d);
        _i++;
      }

      for (var _i4 = 0, _decorations_null = decorations_null; _i4 < _decorations_null.length; _i4++) {
        d = _decorations_null[_i4];

        if (_i == 4) {
          break;
        }

        decorations_.push(d);
        _i++;
      }

      for (var _i5 = 0, _decorations_order = decorations_order; _i5 < _decorations_order.length; _i5++) {
        d = _decorations_order[_i5];

        if (_i == 4) {
          break;
        }

        decorations_.push(d);
        _i++;
      }
    }

    res.render('index', {
      HOME_URL: HOME_URL,
      title: getInfo().titleAM,
      footer: getInfo().footerAM,
      home: getHomeAM(),
      navigation: {
        title: getInfo().titleAM,
        logo: getInfo().logoAM,
        navigation: getInfo().navigationAM
      },
      current: '/',
      portfolio: portfolio_,
      decorations: decorations_
    });
  } else {
    var _portfolio_ = [];
    var _decorations_ = [];

    if (portfolio) {
      var _i6 = 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = portfolio[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          work = _step3.value;
          _i6++;

          _portfolio_.push({
            url: work.url,
            name: work.nameEN,
            mainImage: work.mainImage,
            category: JSON.parse(work.category).en
          });

          if (_i6 == 4) {
            break;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    if (decorations) {
      var _decorations_trending2 = [];
      var _decorations_new2 = [];
      var _decorations_null2 = [];
      var _decorations_order2 = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = decorations[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          decoration = _step4.value;
          var _d2 = {
            url: decoration.url,
            name: decoration.nameEN,
            mainImage: decoration.mainImage,
            type: decoration.type,
            status: decoration.status
          };

          if (_d2.status == 'trending') {
            _decorations_trending2.push(_d2);
          } else if (_d2.status == 'new') {
            _decorations_new2.push(_d2);
          } else if (_d2.status == 'order') {
            _decorations_order2.push(_d2);
          } else {
            _decorations_null2.push(_d2);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var _i7 = 0;

      for (var _i8 = 0, _decorations_trending3 = _decorations_trending2; _i8 < _decorations_trending3.length; _i8++) {
        d = _decorations_trending3[_i8];

        if (_i7 == 4) {
          break;
        }

        _decorations_.push(d);

        _i7++;
      }

      for (var _i9 = 0, _decorations_new3 = _decorations_new2; _i9 < _decorations_new3.length; _i9++) {
        d = _decorations_new3[_i9];

        if (_i7 == 4) {
          break;
        }

        _decorations_.push(d);

        _i7++;
      }

      for (var _i10 = 0, _decorations_null3 = _decorations_null2; _i10 < _decorations_null3.length; _i10++) {
        d = _decorations_null3[_i10];

        if (_i7 == 4) {
          break;
        }

        _decorations_.push(d);

        _i7++;
      }

      for (var _i11 = 0, _decorations_order3 = _decorations_order2; _i11 < _decorations_order3.length; _i11++) {
        d = _decorations_order3[_i11];

        if (_i7 == 4) {
          break;
        }

        _decorations_.push(d);

        _i7++;
      }
    }

    res.render('index', {
      HOME_URL: HOME_URL,
      title: getInfo().titleEN,
      footer: getInfo().footerEN,
      home: getHomeEN(),
      navigation: {
        title: getInfo().titleEN,
        logo: getInfo().logoEN,
        navigation: getInfo().navigationEN
      },
      current: '/',
      portfolio: _portfolio_,
      decorations: _decorations_
    });
  }
});
router.get('/search', function (req, res, next) {
  var code = req.query.s.toLocaleLowerCase().replace(/ /g, "");
  var respond = findPhotoshoot(code);

  if (respond) {
    res.redirect(HOME_URL + 'photoshoot/' + code);
  } else {
    var portfolio = findPortfolios().sort(function (a, b) {
      return a._id - b._id;
    });
    var decorations = findDecorations().sort(function (a, b) {
      return a._id - b._id;
    });
    var pages = findPages();

    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      var pages_ = [];
      var portfolio_ = [];
      var decorations_ = [];

      if (pages) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = pages[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var page = _step5.value;
            var _page = {
              url: page.url,
              name: page.nameAM,
              body: page.bodyAM
            };

            if (search(req.query.s, _page) || search(code, _page)) {
              pages_.push({
                url: page.url,
                name: page.nameAM
              });
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }

      if (portfolio) {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = portfolio[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _work2 = _step6.value;
            var _work = {
              url: _work2.url,
              name: _work2.nameAM,
              description: _work2.descriptionAM,
              category: JSON.parse(_work2.category).am
            };

            if (search(req.query.s, _work)) {
              portfolio_.push({
                url: _work2.url,
                name: _work2.nameAM,
                mainImage: _work2.mainImage,
                category: JSON.parse(_work2.category).am
              });
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }

      if (decorations) {
        var decorations_trending = [];
        var decorations_new = [];
        var decorations_null = [];
        var decorations_order = [];
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = decorations[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var _decoration2 = _step7.value;
            var _decoration = {
              url: _decoration2.url,
              name: _decoration2.nameAM,
              description: _decoration2.descriptionAM
            };

            if (!search(req.query.s, _decoration)) {
              continue;
            }

            var _d3 = {
              url: _decoration2.url,
              name: _decoration2.nameAM,
              mainImage: _decoration2.mainImage,
              type: _decoration2.type,
              status: _decoration2.status
            };

            if (_d3.status == 'trending') {
              decorations_trending.push(_d3);
            } else if (_d3.status == 'new') {
              decorations_new.push(_d3);
            } else if (_d3.status == 'order') {
              decorations_order.push(_d3);
            } else {
              decorations_null.push(_d3);
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        for (var _i12 = 0, _decorations_trending4 = decorations_trending; _i12 < _decorations_trending4.length; _i12++) {
          d = _decorations_trending4[_i12];
          decorations_.push(d);
        }

        for (var _i13 = 0, _decorations_new4 = decorations_new; _i13 < _decorations_new4.length; _i13++) {
          d = _decorations_new4[_i13];
          decorations_.push(d);
        }

        for (var _i14 = 0, _decorations_null4 = decorations_null; _i14 < _decorations_null4.length; _i14++) {
          d = _decorations_null4[_i14];
          decorations_.push(d);
        }

        for (var _i15 = 0, _decorations_order4 = decorations_order; _i15 < _decorations_order4.length; _i15++) {
          d = _decorations_order4[_i15];
          decorations_.push(d);
        }
      }

      res.render('search', {
        HOME_URL: HOME_URL,
        title: getInfo().titleAM,
        footer: getInfo().footerAM,
        navigation: {
          title: getInfo().titleAM,
          logo: getInfo().logoAM,
          navigation: getInfo().navigationAM
        },
        current: '/search',
        portfolio: portfolio_,
        decorations: decorations_,
        pages: pages_,
        portfolioTitle: getTexts().portfolioTitleam,
        decorationsTitle: getTexts().decorationsTitleam,
        pagesTitle: getTexts().pagesTitleam,
        searched: getTexts().searchedam,
        nothingFound: !(pages_.length || portfolio_.length || decorations_.length) ? getTexts().nothingfoundam : '',
        query: req.query.s
      });
    } else {
      var _pages_ = [];
      var _portfolio_2 = [];
      var _decorations_2 = [];

      if (pages) {
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = pages[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _page2 = _step8.value;
            var _page3 = {
              url: _page2.url,
              name: _page2.nameEN,
              body: _page2.bodyEN
            };

            if (search(req.query.s, _page3) || search(code, _page3)) {
              _pages_.push({
                url: _page2.url,
                name: _page2.nameEN
              });
            }
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
              _iterator8["return"]();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }
      }

      if (portfolio) {
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = portfolio[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var _work3 = _step9.value;
            var _work4 = {
              url: _work3.url,
              name: _work3.nameEN,
              description: _work3.descriptionEN,
              category: JSON.parse(_work3.category).en
            };

            if (search(req.query.s, _work4)) {
              _portfolio_2.push({
                url: _work3.url,
                name: _work3.nameEN,
                mainImage: _work3.mainImage,
                category: JSON.parse(_work3.category).en
              });
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
              _iterator9["return"]();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }
      }

      if (decorations) {
        var _decorations_trending5 = [];
        var _decorations_new5 = [];
        var _decorations_null5 = [];
        var _decorations_order5 = [];
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = decorations[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var _decoration3 = _step10.value;
            var _decoration4 = {
              url: _decoration3.url,
              name: _decoration3.nameEN,
              description: _decoration3.descriptionEN
            };

            if (!search(req.query.s, _decoration4)) {
              continue;
            }

            var _d4 = {
              url: _decoration3.url,
              name: _decoration3.nameEN,
              mainImage: _decoration3.mainImage,
              type: _decoration3.type,
              status: _decoration3.status
            };

            if (_d4.status == 'trending') {
              _decorations_trending5.push(_d4);
            } else if (_d4.status == 'new') {
              _decorations_new5.push(_d4);
            } else if (_d4.status == 'order') {
              _decorations_order5.push(_d4);
            } else {
              _decorations_null5.push(_d4);
            }
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
              _iterator10["return"]();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }

        for (var _i16 = 0, _decorations_trending6 = _decorations_trending5; _i16 < _decorations_trending6.length; _i16++) {
          d = _decorations_trending6[_i16];

          _decorations_2.push(d);
        }

        for (var _i17 = 0, _decorations_new6 = _decorations_new5; _i17 < _decorations_new6.length; _i17++) {
          d = _decorations_new6[_i17];

          _decorations_2.push(d);
        }

        for (var _i18 = 0, _decorations_null6 = _decorations_null5; _i18 < _decorations_null6.length; _i18++) {
          d = _decorations_null6[_i18];

          _decorations_2.push(d);
        }

        for (var _i19 = 0, _decorations_order6 = _decorations_order5; _i19 < _decorations_order6.length; _i19++) {
          d = _decorations_order6[_i19];

          _decorations_2.push(d);
        }
      }

      res.render('search', {
        HOME_URL: HOME_URL,
        title: getInfo().titleEN,
        footer: getInfo().footerEN,
        navigation: {
          title: getInfo().titleEN,
          logo: getInfo().logoEN,
          navigation: getInfo().navigationEN
        },
        current: '/search',
        portfolio: _portfolio_2,
        decorations: _decorations_2,
        pages: _pages_,
        portfolioTitle: getTexts().portfolioTitleen,
        decorationsTitle: getTexts().decorationsTitleen,
        pagesTitle: getTexts().pagesTitleen,
        searched: getTexts().searcheden,
        nothingFound: !(_pages_.length || _portfolio_2.length || _decorations_2.length) ? getTexts().nothingfounden : '',
        query: req.query.s
      });
    }
  }
});
router.get('/photoshoot/not_found', function (req, res, next) {
  if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
    res.render('error', {
      HOME_URL: HOME_URL,
      title: getInfo().titleAM,
      footer: getInfo().footerAM,
      navigation: {
        title: getInfo().titleAM,
        logo: getInfo().logoAM,
        navigation: getInfo().navigationAM
      },
      current: '/photoshoot',
      message: getTexts().photoshootNotFoundam,
      status: '404'
    });
  } else {
    res.render('error', {
      HOME_URL: HOME_URL,
      title: getInfo().titleEN,
      footer: getInfo().footerEN,
      navigation: {
        title: getInfo().titleEN,
        logo: getInfo().logoEN,
        navigation: getInfo().navigationEN
      },
      current: '/photoshoot',
      message: getTexts().photoshootNotFounden,
      status: '404'
    });
  }
});
router.get('/photoshoot/:code', function (req, res, next) {
  var respond = findPhotoshoot(req.params.code);

  if (respond) {
    var date = new Date();

    var _d5 = new Date();

    if (respond.timer) {
      _d5 = new Date(respond.timer);
    }

    if (!respond.timer || _d5 - date > 0) {
      if (respond.style == 'Choose for editing') {
        if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
          res.render('photoshootChoose', {
            HOME_URL: HOME_URL,
            title: getInfo().titleAM,
            footer: getInfo().footerAM,
            navigation: {
              title: getInfo().titleAM,
              logo: getInfo().logoAM,
              navigation: getInfo().navigationAM
            },
            current: '/photoshoot',
            photoshoot: {
              code: respond.code,
              name: respond.nameAM,
              chooseForEditing: true,
              description: respond.descriptionAM,
              images: JSON.parse(respond.images),
              style: 'simple.css',
              date: respond.timer ? getTexts().availableForDownloadUntilam + respond.timer : ''
            },
            downloadText: getTexts().downloadAllam,
            saveText: getTexts().saveam
          });
        } else {
          res.render('photoshootChoose', {
            HOME_URL: HOME_URL,
            title: getInfo().titleEN,
            footer: getInfo().footerEN,
            navigation: {
              title: getInfo().titleEN,
              logo: getInfo().logoEN,
              navigation: getInfo().navigationEN
            },
            current: '/photoshoot',
            photoshoot: {
              code: respond.code,
              name: respond.nameEN,
              chooseForEditing: true,
              description: respond.descriptionEN,
              images: JSON.parse(respond.images),
              style: 'simple.css',
              date: respond.timer ? getTexts().availableForDownloadUntilen + respond.timer : ''
            },
            downloadText: getTexts().downloadAllen,
            saveText: getTexts().saveen
          });
        }
      } else {
        if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
          res.render('photoshoot', {
            HOME_URL: HOME_URL,
            title: getInfo().titleAM,
            footer: getInfo().footerAM,
            navigation: {
              title: getInfo().titleAM,
              logo: getInfo().logoAM,
              navigation: getInfo().navigationAM
            },
            current: '/photoshoot',
            photoshoot: {
              code: respond.code,
              name: respond.nameAM,
              description: respond.descriptionAM,
              images: JSON.parse(respond.images),
              style: respond.style,
              date: respond.timer ? getTexts().availableForDownloadUntilam + respond.timer : ''
            },
            downloadText: getTexts().downloadAllam
          });
        } else {
          res.render('photoshoot', {
            HOME_URL: HOME_URL,
            title: getInfo().titleEN,
            footer: getInfo().footerEN,
            navigation: {
              title: getInfo().titleEN,
              logo: getInfo().logoEN,
              navigation: getInfo().navigationEN
            },
            current: '/photoshoot',
            photoshoot: {
              code: respond.code,
              name: respond.nameEN,
              description: respond.descriptionEN,
              images: JSON.parse(respond.images),
              style: respond.style,
              date: respond.timer ? getTexts().availableForDownloadUntilen + respond.timer : ''
            },
            downloadText: getTexts().downloadAllen
          });
        }
      }
    } else {
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        var _loop = function _loop() {
          var img = _step11.value;
          fs.unlink('./public/images/' + img, function (err) {
            if (err) return console.log(err);
            fs.unlink('./public/lowres_images/' + img, function (err) {
              if (err) return console.log(err);
              fs.unlink('./public/midres_images/' + img, function (err) {
                if (err) return console.log(err);
              });
            });
          });
        };

        for (var _iterator11 = JSON.parse(respond.images)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      deletePhotoshoot(respond.id);
      res.redirect(HOME_URL + 'photoshoot/not_found');
    }
  } else {
    res.redirect(HOME_URL + 'photoshoot/not_found');
  }
});
router.post('/edit/photoshoot/', function (req, res, next) {
  var data = findPhotoshoot(req.body.code);

  if (data) {
    data.images = req.body.images;
    var respond = updatePhotoshoot(data._id, data);

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
  res.cookie('language', req.params.lang, {
    httpOnly: true
  });
  res.redirect(req.headers.referer);
});
router.get('/images', function (req, res, next) {
  fs.readdir('./public/images/', function (err, files) {
    res.send(files);
  });
});
router.get('/files/download/all', function (req, res, next) {
  fs.readdir('./public/images/', function (err, files) {
    var zip = new AdmZip();
    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
      for (var _iterator12 = files[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
        var path = _step12.value;
        var p = stat('./public/images/' + path);

        if (p.isFile()) {
          zip.addLocalFile('./public/images/' + path);
        }
      }
    } catch (err) {
      _didIteratorError12 = true;
      _iteratorError12 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
          _iterator12["return"]();
        }
      } finally {
        if (_didIteratorError12) {
          throw _iteratorError12;
        }
      }
    }

    zip.addLocalFile('./infini.json');
    zip.addLocalFile('./loginInfo.json');
    zip.addLocalFile('./pages.json');
    zip.addLocalFile('./photoshoots.json');
    zip.addLocalFile('./portfolios.json');
    var filename = './public/all-infini_photos.zip';
    zip.writeZip(filename);
    res.download(filename);
    setTimeout(function () {
      fs.unlink(filename, function (err) {
        if (err) return console.log(err);
      });
    }, 10000);
  });
});
router.get('/images/photoshoot/:code/:filename', function (req, res, next) {
  var images = JSON.parse(findPhotoshoot(req.params.code).images);
  var list = [];
  var _iteratorNormalCompletion13 = true;
  var _didIteratorError13 = false;
  var _iteratorError13 = undefined;

  try {
    for (var _iterator13 = images[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
      var i = _step13.value;
      list.push(i.url);
    }
  } catch (err) {
    _didIteratorError13 = true;
    _iteratorError13 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
        _iterator13["return"]();
      }
    } finally {
      if (_didIteratorError13) {
        throw _iteratorError13;
      }
    }
  }

  var zip = new AdmZip();

  for (var _i20 = 0, _list = list; _i20 < _list.length; _i20++) {
    var path = _list[_i20];
    var p = stat('./public/images/' + path);

    if (p.isFile()) {
      zip.addLocalFile('./public/images/' + path);
    }
  }

  var filename = './public/' + req.params.filename + '-infini_photos.zip';
  zip.writeZip(filename);
  res.download(filename);
  setTimeout(function () {
    fs.unlink(filename, function (err) {
      if (err) return console.log(err);
    });
  }, 1000);
});
router.get('/portfolio', function (req, res, next) {
  var portfolio = findPortfolios().sort(function (a, b) {
    return a._id - b._id;
  });

  if (portfolio) {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      var portfolio_ = [];
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = portfolio[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          work = _step14.value;
          portfolio_.push({
            url: work.url,
            name: work.nameAM,
            mainImage: work.mainImage,
            category: JSON.parse(work.category).en
          });
        }
      } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
            _iterator14["return"]();
          }
        } finally {
          if (_didIteratorError14) {
            throw _iteratorError14;
          }
        }
      }

      res.render('allPortfolio', {
        subtitle: getTexts().portfolioTitleam,
        language: 'am',
        HOME_URL: HOME_URL,
        title: getInfo().titleAM,
        footer: getInfo().footerAM,
        navigation: {
          title: getInfo().titleAM,
          logo: getInfo().logoAM,
          navigation: getInfo().navigationAM
        },
        current: '/portfolio',
        portfolio: portfolio_,
        categories: findPortfolioCategories().i.concat(findPortfolioCategories().c)
      });
    } else {
      var _portfolio_3 = [];
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = portfolio[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          work = _step15.value;

          _portfolio_3.push({
            url: work.url,
            name: work.nameEN,
            mainImage: work.mainImage,
            category: JSON.parse(work.category).en
          });
        }
      } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
            _iterator15["return"]();
          }
        } finally {
          if (_didIteratorError15) {
            throw _iteratorError15;
          }
        }
      }

      res.render('allPortfolio', {
        subtitle: getTexts().portfolioTitleen,
        language: 'en',
        HOME_URL: HOME_URL,
        title: getInfo().titleEN,
        footer: getInfo().footerEN,
        navigation: {
          title: getInfo().titleEN,
          logo: getInfo().logoEN,
          navigation: getInfo().navigationEN
        },
        current: '/portfolio',
        portfolio: _portfolio_3,
        categories: findPortfolioCategories().i.concat(findPortfolioCategories().c)
      });
    }
  } else {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('error', {
        HOME_URL: HOME_URL,
        title: getInfo().titleAM,
        footer: getInfo().footerAM,
        navigation: {
          title: getInfo().titleAM,
          logo: getInfo().logoAM,
          navigation: getInfo().navigationAM
        },
        current: req._parsedOriginalUrl.pathname,
        message: getTexts().pageNotFoundam,
        status: '404'
      });
    } else {
      res.render('error', {
        HOME_URL: HOME_URL,
        title: getInfo().titleEN,
        footer: getInfo().footerEN,
        navigation: {
          title: getInfo().titleEN,
          logo: getInfo().logoEN,
          navigation: getInfo().navigationEN
        },
        current: req._parsedOriginalUrl.pathname,
        message: getTexts().pageNotFounden,
        status: '404'
      });
    }
  }
}); // router.get('/portfolio/individual', function (req, res, next) {
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
  var portfolio = findPortfolios().sort(function (a, b) {
    return a._id - b._id;
  });

  if (portfolio) {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      var portfolio_ = [];
      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = portfolio[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          work = _step16.value;
          var _iteratorNormalCompletion17 = true;
          var _didIteratorError17 = false;
          var _iteratorError17 = undefined;

          try {
            for (var _iterator17 = findPortfolioCategories().c[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
              var c = _step17.value;

              if (c.am == JSON.parse(work.category).am || c.en == JSON.parse(work.category).en) {
                portfolio_.push({
                  url: work.url,
                  name: work.nameAM,
                  mainImage: work.mainImage,
                  category: JSON.parse(work.category).en
                });
              }
            }
          } catch (err) {
            _didIteratorError17 = true;
            _iteratorError17 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
                _iterator17["return"]();
              }
            } finally {
              if (_didIteratorError17) {
                throw _iteratorError17;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
            _iterator16["return"]();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
      }

      res.render('allPortfolio', {
        subtitle: getTexts().portfolioCommercialam,
        language: 'am',
        HOME_URL: HOME_URL,
        title: getInfo().titleAM,
        footer: getInfo().footerAM,
        navigation: {
          title: getInfo().titleAM,
          logo: getInfo().logoAM,
          navigation: getInfo().navigationAM
        },
        current: '/portfolio/commercial',
        portfolio: portfolio_,
        categories: findPortfolioCategories().c
      });
    } else {
      var _portfolio_4 = [];
      var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = portfolio[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          work = _step18.value;
          var _iteratorNormalCompletion19 = true;
          var _didIteratorError19 = false;
          var _iteratorError19 = undefined;

          try {
            for (var _iterator19 = findPortfolioCategories().c[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
              var _c = _step19.value;

              if (_c.am == JSON.parse(work.category).am || _c.en == JSON.parse(work.category).en) {
                _portfolio_4.push({
                  url: work.url,
                  name: work.nameEN,
                  mainImage: work.mainImage,
                  category: JSON.parse(work.category).en
                });
              }
            }
          } catch (err) {
            _didIteratorError19 = true;
            _iteratorError19 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion19 && _iterator19["return"] != null) {
                _iterator19["return"]();
              }
            } finally {
              if (_didIteratorError19) {
                throw _iteratorError19;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError18 = true;
        _iteratorError18 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion18 && _iterator18["return"] != null) {
            _iterator18["return"]();
          }
        } finally {
          if (_didIteratorError18) {
            throw _iteratorError18;
          }
        }
      }

      res.render('allPortfolio', {
        subtitle: getTexts().portfolioCommercialen,
        language: 'en',
        HOME_URL: HOME_URL,
        title: getInfo().titleEN,
        footer: getInfo().footerEN,
        navigation: {
          title: getInfo().titleEN,
          logo: getInfo().logoEN,
          navigation: getInfo().navigationEN
        },
        current: '/portfolio/commercial',
        portfolio: _portfolio_4,
        categories: findPortfolioCategories().c
      });
    }
  } else {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('error', {
        HOME_URL: HOME_URL,
        title: getInfo().titleAM,
        footer: getInfo().footerAM,
        navigation: {
          title: getInfo().titleAM,
          logo: getInfo().logoAM,
          navigation: getInfo().navigationAM
        },
        current: req._parsedOriginalUrl.pathname,
        message: getTexts().pageNotFoundam,
        status: '404'
      });
    } else {
      res.render('error', {
        HOME_URL: HOME_URL,
        title: getInfo().titleEN,
        footer: getInfo().footerEN,
        navigation: {
          title: getInfo().titleEN,
          logo: getInfo().logoEN,
          navigation: getInfo().navigationEN
        },
        current: req._parsedOriginalUrl.pathname,
        message: getTexts().pageNotFounden,
        status: '404'
      });
    }
  }
});
router.get('/portfolio/*', function (req, res, next) {
  var portfolio = findPortfolio(req._parsedOriginalUrl.pathname.slice(10, req._parsedOriginalUrl.pathname.length));

  if (portfolio) {
    if (portfolio) {
      if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
        res.render('portfolio', {
          HOME_URL: HOME_URL,
          title: getInfo().titleAM,
          footer: getInfo().footerAM,
          navigation: {
            title: getInfo().titleAM,
            logo: getInfo().logoAM,
            navigation: getInfo().navigationAM
          },
          current: '/portfolio',
          portfolio: {
            name: portfolio.nameAM,
            description: portfolio.descriptionAM,
            mainImage: portfolio.mainImage,
            images: JSON.parse(portfolio.images),
            category: JSON.parse(portfolio.category).am
          }
        });
      } else {
        res.render('portfolio', {
          HOME_URL: HOME_URL,
          title: getInfo().titleEN,
          footer: getInfo().footerEN,
          navigation: {
            title: getInfo().titleEN,
            logo: getInfo().logoEN,
            navigation: getInfo().navigationEN
          },
          current: '/portfolio',
          portfolio: {
            name: portfolio.nameEN,
            description: portfolio.descriptionEN,
            mainImage: portfolio.mainImage,
            images: JSON.parse(portfolio.images),
            category: JSON.parse(portfolio.category).en
          }
        });
      }
    } else {
      if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
        res.render('error', {
          HOME_URL: HOME_URL,
          title: getInfo().titleAM,
          footer: getInfo().footerAM,
          navigation: {
            title: getInfo().titleAM,
            logo: getInfo().logoAM,
            navigation: getInfo().navigationAM
          },
          current: req._parsedOriginalUrl.pathname,
          message: getTexts().pageNotFoundam,
          status: '404'
        });
      } else {
        res.render('error', {
          HOME_URL: HOME_URL,
          title: getInfo().titleEN,
          footer: getInfo().footerEN,
          navigation: {
            title: getInfo().titleEN,
            logo: getInfo().logoEN,
            navigation: getInfo().navigationEN
          },
          current: req._parsedOriginalUrl.pathname,
          message: getTexts().pageNotFounden,
          status: '404'
        });
      }
    }
  } else {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('error', {
        HOME_URL: HOME_URL,
        title: getInfo().titleAM,
        footer: getInfo().footerAM,
        navigation: {
          title: getInfo().titleAM,
          logo: getInfo().logoAM,
          navigation: getInfo().navigationAM
        },
        current: req._parsedOriginalUrl.pathname,
        message: getTexts().pageNotFoundam,
        status: '404'
      });
    } else {
      res.render('error', {
        HOME_URL: HOME_URL,
        title: getInfo().titleEN,
        footer: getInfo().footerEN,
        navigation: {
          title: getInfo().titleEN,
          logo: getInfo().logoEN,
          navigation: getInfo().navigationEN
        },
        current: req._parsedOriginalUrl.pathname,
        message: getTexts().pageNotFounden,
        status: '404'
      });
    }
  }
});
router.get('/decorations', function (req, res, next) {
  var decorations = findDecorations().sort(function (a, b) {
    return a._id - b._id;
  });

  if (decorations) {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      var decorations_ = [];
      var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = decorations[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          decoration = _step20.value;
          decorations_.push({
            url: decoration.url,
            name: decoration.nameAM,
            mainImage: decoration.mainImage,
            type: decoration.type,
            status: decoration.status
          });
        }
      } catch (err) {
        _didIteratorError20 = true;
        _iteratorError20 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion20 && _iterator20["return"] != null) {
            _iterator20["return"]();
          }
        } finally {
          if (_didIteratorError20) {
            throw _iteratorError20;
          }
        }
      }

      res.render('allDecorations', {
        subtitle: getTexts().decorationsTitleam,
        language: 'am',
        HOME_URL: HOME_URL,
        title: getInfo().titleAM,
        footer: getInfo().footerAM,
        navigation: {
          title: getInfo().titleAM,
          logo: getInfo().logoAM,
          navigation: getInfo().navigationAM
        },
        current: '/decorations',
        decorations: decorations_
      });
    } else {
      var _decorations_3 = [];
      var _iteratorNormalCompletion21 = true;
      var _didIteratorError21 = false;
      var _iteratorError21 = undefined;

      try {
        for (var _iterator21 = decorations[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
          decoration = _step21.value;

          _decorations_3.push({
            url: decoration.url,
            name: decoration.nameEN,
            mainImage: decoration.mainImage,
            type: decoration.type,
            status: decoration.status
          });
        }
      } catch (err) {
        _didIteratorError21 = true;
        _iteratorError21 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion21 && _iterator21["return"] != null) {
            _iterator21["return"]();
          }
        } finally {
          if (_didIteratorError21) {
            throw _iteratorError21;
          }
        }
      }

      res.render('allDecorations', {
        subtitle: getTexts().decorationsTitleen,
        language: 'en',
        HOME_URL: HOME_URL,
        title: getInfo().titleEN,
        footer: getInfo().footerEN,
        navigation: {
          title: getInfo().titleEN,
          logo: getInfo().logoEN,
          navigation: getInfo().navigationEN
        },
        current: '/decorations',
        decorations: _decorations_3
      });
    }
  } else {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('error', {
        HOME_URL: HOME_URL,
        title: getInfo().titleAM,
        footer: getInfo().footerAM,
        navigation: {
          title: getInfo().titleAM,
          logo: getInfo().logoAM,
          navigation: getInfo().navigationAM
        },
        current: req._parsedOriginalUrl.pathname,
        message: getTexts().pageNotFoundam,
        status: '404'
      });
    } else {
      res.render('error', {
        HOME_URL: HOME_URL,
        title: getInfo().titleEN,
        footer: getInfo().footerEN,
        navigation: {
          title: getInfo().titleEN,
          logo: getInfo().logoEN,
          navigation: getInfo().navigationEN
        },
        current: req._parsedOriginalUrl.pathname,
        message: getTexts().pageNotFounden,
        status: '404'
      });
    }
  }
});
router.get('/decoration/*', function (req, res, next) {
  var decoration = findDecoration(req._parsedOriginalUrl.pathname.slice(11, req._parsedOriginalUrl.pathname.length));

  if (decoration) {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('decoration', {
        HOME_URL: HOME_URL,
        lang: 'am',
        title: getInfo().titleAM,
        footer: getInfo().footerAM,
        navigation: {
          title: getInfo().titleAM,
          logo: getInfo().logoAM,
          navigation: getInfo().navigationAM
        },
        current: '/decorations',
        decoration: {
          name: decoration.nameAM,
          description: decoration.descriptionAM,
          mainImage: decoration.mainImage,
          images: JSON.parse(decoration.images),
          type: decoration.type,
          status: decoration.status,
          related: decoration.related.split(';')
        }
      });
    } else {
      res.render('decoration', {
        HOME_URL: HOME_URL,
        lang: 'en',
        title: getInfo().titleEN,
        footer: getInfo().footerEN,
        navigation: {
          title: getInfo().titleEN,
          logo: getInfo().logoEN,
          navigation: getInfo().navigationEN
        },
        current: '/decorations',
        decoration: {
          name: decoration.nameEN,
          description: decoration.descriptionEN,
          mainImage: decoration.mainImage,
          images: JSON.parse(decoration.images),
          type: decoration.type,
          status: decoration.status,
          related: decoration.related.split(';')
        }
      });
    }
  } else {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('error', {
        HOME_URL: HOME_URL,
        title: getInfo().titleAM,
        footer: getInfo().footerAM,
        navigation: {
          title: getInfo().titleAM,
          logo: getInfo().logoAM,
          navigation: getInfo().navigationAM
        },
        current: req._parsedOriginalUrl.pathname,
        message: getTexts().pageNotFoundam,
        status: '404'
      });
    } else {
      res.render('error', {
        HOME_URL: HOME_URL,
        title: getInfo().titleEN,
        footer: getInfo().footerEN,
        navigation: {
          title: getInfo().titleEN,
          logo: getInfo().logoEN,
          navigation: getInfo().navigationEN
        },
        current: req._parsedOriginalUrl.pathname,
        message: getTexts().pageNotFounden,
        status: '404'
      });
    }
  }
});
router.get('/*', function (req, res, next) {
  console.log(req._parsedOriginalUrl.pathname);
  var page = findPage(req._parsedOriginalUrl.pathname);

  if (page) {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('page', {
        HOME_URL: HOME_URL,
        title: getInfo().titleAM,
        footer: getInfo().footerAM,
        navigation: {
          title: getInfo().titleAM,
          logo: getInfo().logoAM,
          navigation: getInfo().navigationAM
        },
        current: req._parsedOriginalUrl.pathname,
        page: {
          name: page.nameAM,
          body: page.bodyAM,
          image: page.image
        }
      });
    } else {
      res.render('page', {
        HOME_URL: HOME_URL,
        title: getInfo().titleEN,
        footer: getInfo().footerEN,
        navigation: {
          title: getInfo().titleEN,
          logo: getInfo().logoEN,
          navigation: getInfo().navigationEN
        },
        current: req._parsedOriginalUrl.pathname,
        page: {
          name: page.nameEN,
          body: page.bodyEN,
          image: page.image
        }
      });
    }
  } else {
    if (req.cookies.language && req.cookies.language.toLowerCase() == 'am') {
      res.render('error', {
        HOME_URL: HOME_URL,
        title: getInfo().titleAM,
        footer: getInfo().footerAM,
        navigation: {
          title: getInfo().titleAM,
          logo: getInfo().logoAM,
          navigation: getInfo().navigationAM
        },
        current: req._parsedOriginalUrl.pathname,
        message: getTexts().pageNotFoundam,
        status: '404'
      });
    } else {
      res.render('error', {
        HOME_URL: HOME_URL,
        title: getInfo().titleEN,
        footer: getInfo().footerEN,
        navigation: {
          title: getInfo().titleEN,
          logo: getInfo().logoEN,
          navigation: getInfo().navigationEN
        },
        current: req._parsedOriginalUrl.pathname,
        message: getTexts().pageNotFounden,
        status: '404'
      });
    }
  }
});

function search(query, content) {
  query = query.toUpperCase().slice(0, -1);
  var filtered = query.replace(/  /g, " ").replace(/  /g, " ").replace(/  /g, " ").replace(/  /g, " ");

  for (var j in content) {
    var param = content[j];

    if (param.toUpperCase().indexOf(query) > -1 || param.toUpperCase().indexOf(filtered) > -1) {
      return true;
    }
  }

  return false;
}

module.exports = router;