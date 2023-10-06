const  express = require('express');
const  router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let message = "404 not found"
  const error = new Error(message);
  error.status = 404;
  res.render('error', {message: message, error: error});
});




module.exports = router;
