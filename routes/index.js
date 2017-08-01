var express = require('express');
var router = express.Router();


router.use('/api/province', require('./province'));
router.use('/api/church', require('./church'));
router.use('/api/registeruser', require('./userregister'));
router.use('/api/messages', require('./mailmessage'));
router.use('/api/authenticate', require('./authenticate'));
router.use('/api/transport', require('./transportRouter'));
router.use('/api/tshirt', require('./tshirtRouter'));
router.use('/api/notes', require('./notesRouter'));
router.use('/api/payment', require('./paymentRouter'));
router.use('/api/userYouthAdmin', require('./userYouthAdmin'));
router.use('/api/userAdmin', require('./userAdmin'));
router.use('/api/storeDocs', require('./storedocRouter'));
router.use('/api/dashboard', require('./dashboard'));
router.use('/api/dormlist', require('./dormlistRouter'));
router.use('/api/search', require('./searchRouter'));
/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.use(express.static('../SummerCamp2/'+__dirname ));


module.exports = router;