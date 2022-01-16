var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = 1E13 - Date.now() + '-' + Math.round(Math.random() * 1E5);
    cb(null, uniqueSuffix + '-' + file.fieldname + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });
var fs = require('fs-extra');
var sharp = require('sharp');
var { haveAccess, newAccess, changeUsername, changePassword } = require('../services/access');
var { getInfo, changeTitleAM, changeTitleEN, changeLogoAM, changeLogoEN, changeNavigationAM, changeNavigationEN, findPortfolioCategories, changePortfolioCategories, getHomeAM, changeHomeAM, getHomeEN, changeHomeEN, changeFooterAM, changeFooterEN, changeStyle } = require('../services/constructor');
var { findDecorations, findDecorationByID, addDecoration, updateDecoration, deleteDecoration } = require('../services/decorations');
var { findPortfolios, findPortfolioByID, addPortfolio, updatePortfolio, deletePortfolio } = require('../services/portfolios');
var { findPhotoshoots, findPhotoshootByID, addPhotoshoot, updatePhotoshoot, deletePhotoshoot } = require('../services/photoshoots');
var { findPages, findPageByID, addPage, updatePage, deletePage } = require('../services/pages');
var styles = ['Choose for editing', 'simple.css', 'classic.css', 'puzzle.css', 'kids.css'];
var HOME_URL = process.env.HOME_URL;

// Admin home page
router.get('/', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('admin', { title: 'Կառավարակետ', HOME_URL });
  } else {
    res.redirect(HOME_URL + 'admin/login')
  }
});

//Login page
router.get('/login', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.redirect(HOME_URL + 'admin');
  } else {
    res.render('login', { title: 'Մուտք', HOME_URL, warning: (req.cookies.access == 'wuop') ? true : false });
  }
});
//Login
router.post('/login', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.redirect(HOME_URL + 'admin');
  } else {
    res.cookie('access', newAccess(req.body.username, req.body.password), { httpOnly: true });
    res.redirect(HOME_URL + 'admin');
  }
});
//Logout
router.get('/logout', function (req, res, next) {
  res.cookie('access', '', { httpOnly: true });
  res.redirect(HOME_URL + 'admin');
});

//Change username password page
router.get('/profileChanges', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('changeProfile', { title: 'Մուտքանունի, գաղտնաբառի փոխում', HOME_URL })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
//Change username
router.post('/changeUsername', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changeUsername(req.cookies.access, req.body.username, req.body.password, req.body.newUsername).then((respond) => {
      console.log('asd');
      res.redirect(HOME_URL + 'admin');
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
//Change password
router.post('/changePassword', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changePassword(req.cookies.access, req.body.username, req.body.password, req.body.newPassword).then((respond) => {
      res.redirect(HOME_URL + 'admin');
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});

//Change design page
router.get('/design', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    let info = getInfo();
    info.navigationAM = JSON.stringify(info.navigationAM);
    info.navigationEN = JSON.stringify(info.navigationEN);
    info.style = JSON.stringify(info.style);
    res.render('changeDesign', { title: 'Արտաքին տեսք', HOME_URL, info })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
//Update design
router.post('/design', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changeStyle(req.body.value).then((respond) => {
      res.status = 200;
      res.send('Menu changes saved(am)');
    }).catch((err) => {
      res.status = 500;
      res.send(err);
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});

//Change homepage page
router.get('/home', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    let info = getInfo();
    info.navigationAM = JSON.stringify(info.navigationAM);
    info.navigationEN = JSON.stringify(info.navigationEN);
    res.render('changeHome', { title: 'Գլխավոր էջի կառուցվածք', HOME_URL, info, homeAM: { slides: JSON.stringify(getHomeAM().slides), disposition: JSON.stringify(getHomeAM().disposition) }, homeEN: { slides: JSON.stringify(getHomeEN().slides), disposition: JSON.stringify(getHomeEN().disposition) } })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});

//Update Navigation AM
router.post('/updateNavigationAM', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changeNavigationAM(req.body.value).then((respond) => {
      res.status = 200;
      res.send('Menu changes saved(am)');
    }).catch((err) => {
      res.status = 500;
      res.send(err);
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});
//Update Navigation EN
router.post('/updateNavigationEN', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changeNavigationEN(req.body.value).then((respond) => {
      res.status = 200;
      res.send('Menu changes saved(en)');
    }).catch((err) => {
      res.status = 500;
      res.send(err);
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});

// Change title and logo AM
router.post('/updateTitleLogoAM', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changeTitleAM(req.body.title).then((respond) => {
      changeLogoAM(req.body.logo).then((respond) => {
        res.status = 200;
        res.send('Title and Logo changes saved(am)');
      }).catch((err) => {
        res.status = 500;
        res.send(err);
      })
    }).catch((err) => {
      res.status = 500;
      res.send(err);
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});
// Change title and logo EN
router.post('/updateTitleLogoEN', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changeTitleEN(req.body.title).then((respond) => {
      changeLogoEN(req.body.logo).then((respond) => {
        res.status = 200;
        res.send('Title and Logo changes saved(En)');
      }).catch((err) => {
        res.status = 500;
        res.send(err);
      })
    }).catch((err) => {
      res.status = 500;
      res.send(err);
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});

// Change footer AM
router.post('/updateFooterAM', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changeFooterAM(req.body.footer).then((respond) => {
      res.status = 200;
      res.send('Footer changes saved(am)');
    }).catch((err) => {
      res.status(500).send(err);
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});
// Change footer EN
router.post('/updateFooterEN', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changeFooterEN(req.body.footer).then((respond) => {
      res.status = 200;
      res.send('Footer changes saved(en)');
    }).catch((err) => {
      res.status(500).send(err);
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});

//Change home structure AM
router.post('/updateHomeAM', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changeHomeAM(req.body.home).then((respond) => {
      res.status = 200;
      res.send('Home page structure is saved! (am)');
    }).catch((err) => {
      res.status(500).send(err);
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});
//Change home structure EN
router.post('/updateHomeEN', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changeHomeEN(req.body.home).then((respond) => {
      res.status = 200;
      res.send('Home page structure is saved! (en)');
    }).catch((err) => {
      res.status(500).send(err);
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});

// Decorations
router.get('/decorations', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    findDecorations().sort({ '_id': -1 }).then((decorations) => {
      let decorations_ = [];
      for (let i = 0; i < decorations.length; i++) {
        decorations_.push({
          id: decorations[i].id,
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
      res.render('adminTable', { title: 'Դեկորացիաներ', HOME_URL, table: decorations_, forWhat: 'Decorations' })
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
// New decoration
router.get('/new/decoration', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('newDecoration', { title: 'Նոր դեկորացիա', HOME_URL })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/new/decoration', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    addDecoration(req.body).then((respond) => {
      res.send('Done');
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
//Change decoration
router.get('/edit/decoration/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    findDecorationByID(req.params.id).then((decoration) => {
      res.render('newDecoration', { title: 'Խմբագրել դեկորացիա', decoration, HOME_URL })
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/edit/decoration/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    updateDecoration(req.params.id, req.body).then((respond) => {
      res.send('Done');
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.delete('/delete/decoration/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    deleteDecoration(req.params.id).then((respond) => {
      res.send('Done');
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
})

// Portfolio
router.get('/portfolio', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    findPortfolios().sort({ '_id': -1 }).then((portfolios) => {
      let portfolios_ = [];
      for (let i = 0; i < portfolios.length; i++) {
        portfolios_.push({
          id: portfolios[i].id,
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
      res.render('adminTable', { title: 'Պորտֆոլիո', HOME_URL, table: portfolios_, forWhat: 'Portfolios' })
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
// Portfolio categories
router.get('/portfolio/category', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('categories', { title: 'Բաժիններ', HOME_URL, categories: JSON.stringify(findPortfolioCategories()) })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/updateCategories', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changePortfolioCategories(req.body.value).then((respond) => {
      res.status = 200;
      res.send('Categories saved!`');
    }).catch((err) => {
      res.status = 500;
      res.send(err);
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});
// New portfolio
router.get('/new/portfolio', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('newPortfolio', { title: 'Նոր աշխատանք', HOME_URL, categories: findPortfolioCategories() })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/new/portfolio', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    addPortfolio(req.body).then((respond) => {
      res.send('Done');
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
//Change portfolio
router.get('/edit/portfolio/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    findPortfolioByID(req.params.id).then((portfolio) => {
      res.render('newPortfolio', { title: 'Խմբագրել ֆոտոշարք', portfolio, HOME_URL, categories: findPortfolioCategories() })
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/edit/portfolio/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    updatePortfolio(req.params.id, req.body).then((respond) => {
      res.send('Done');
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.delete('/delete/portfolio/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    deletePortfolio(req.params.id).then((respond) => {
      res.send('Done');
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
})

// Photoshoots
router.get('/photoshoots', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    findPhotoshoots().sort({ timer: 1 }).exec((err, photoshoots) => {
      let date = new Date();
      let year = date.getFullYear();
      let month = (date.getMonth() + 1);
      let day = date.getDate();
      let photoshoots_ = [];
      for (let i = 0; i < photoshoots.length; i++) {
        if (!photoshoots[i].timer || (parseInt(photoshoots[i].timer.split('/')[0]) >= year && parseInt(photoshoots[i].timer.split('/')[1]) >= month) && parseInt(photoshoots[i].timer.split('/')[2]) >= day) {
          photoshoots_.push({
            id: photoshoots[i].id,
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
          for (let img of JSON.parse(photoshoots[i].images)) {
            fs.unlink('./public/images/' + img, function (err) {
              if (err) return console.log(err);
              fs.unlink('./public/lowres_images/' + img, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
              });
            });
          }
          deletePhotoshoot(photoshoots[i].id).then((photoshoot) => { });
        }
      }
      res.render('adminTable', { title: 'Ֆոտոշարքեր', HOME_URL, table: photoshoots_, forWhat: 'Photoshoots' })
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
// New photoshoot
router.get('/new/photoshoot', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('newPhotshoot', { title: 'Նոր ֆոտոշարք', HOME_URL, styles })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/new/photoshoot', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    addPhotoshoot(req.body).then((respond) => {
      res.send('Done');
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
//Change photoshoot 
router.get('/edit/photoshoot/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    findPhotoshootByID(req.params.id).then((photoshoot) => {
      photoshoot.images = JSON.parse(photoshoot.images);
      res.render('newPhotshoot', { title: 'Խմբագրել ֆոտոշարք', photoshoot, HOME_URL, styles })
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/edit/photoshoot/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    updatePhotoshoot(req.params.id, req.body).then((respond) => {
      res.send('Done');
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.delete('/delete/photoshoot/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    findPhotoshootByID(req.params.id).then((photoshoot) => {
      for (let img of JSON.parse(photoshoot.images)) {
        fs.unlink('./public/images/' + img, function (err) {
          if (err) return console.log(err);
          fs.unlink('./public/lowres_images/' + img, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
          });
        });
      }
      deletePhotoshoot(photoshoot.id).then((respond) => {
        res.send('Done');
      });
    });
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
})

// Pages
router.get('/pages', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    findPages().sort({ url: 1 }).exec((err, pages) => {
      res.render('adminTable', { title: 'Էջեր', HOME_URL, table: pages, forWhat: 'Pages' })
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
// New page
router.get('/new/page', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('newPage', { title: 'Նոր էջ', HOME_URL })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/new/page', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    addPage(req.body).then((respond) => {
      res.send('Done');
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
//Change page 
router.get('/edit/page/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    findPageByID(req.params.id).then((page) => {
      res.render('newPage', { title: 'Խմբագրել ֆոտոշարք', page, HOME_URL })
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.post('/edit/page/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    updatePage(req.params.id, req.body).then((respond) => {
      res.send('Done');
    })
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});
router.delete('/delete/page/:id', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    deletePage(req.params.id).then((respond) => {
      res.send('Done');
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});

router.get('/getDecorations', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    findDecorations().then((decorations) => {
      let decorations_ = [];
      for (let i = 0; i < decorations.length; i++) {
        decorations_.push({
          id: decorations[i].id,
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
      res.send(decorations_);
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});
router.get('/getPortfolio', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    findPortfolios().then((portfolios) => {
      let portfolios_ = [];
      for (let i = 0; i < portfolios.length; i++) {
        portfolios_.push({
          id: portfolios[i].id,
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
      res.send(portfolios_);
    })
  } else {
    res.status(403).send('Access to the requested resource is forbidden');
  }
});


// Upload
router.post('/upload', upload.single('image'), function (req, res, next) {
  fs.readFile('./public/images/' + req.file.filename, function(err, data){
    sharp(data).resize(200).toFile('./public/lowres_images/' + req.file.filename, (err, info) => {
      console.log(err, info);
      if (haveAccess(req.cookies.access)) {
        res.send('/images/' + req.file.filename);
      } else {
        res.redirect(HOME_URL + 'admin/login')
      }
    });
  });
});
router.delete('/deleteImage/:image', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    fs.unlink('./public/images/' + req.params.image, function (err) {
      if (err) return console.log(err);
      fs.unlink('./public/lowres_images/' + req.params.image, function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
        res.send('Done!');
      });
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});


module.exports = router;
