const  express = require('express');
const  router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing-page', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact-us', {
    title: "Contact Us"
  });
})

router.get('/thankyou', function(req, res, next) {
  console.log("uo");
  res.render('thankyou', {
    title: "Thank you for connecting with us!"
  });
})

router.get('/aboutus', function(req, res, next) {
  res.render('about-us', {
    title: "About Us",
  });
})

module.exports = router;
