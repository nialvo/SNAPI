const router = require('express').Router();
const api = require('./api');

router.use('/api', api);

router.use('/',(req, res) => {
  return res.send('List of valid urls:');//add list of valid urls with parameters and bodies
});

module.exports = router;