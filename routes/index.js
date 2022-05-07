const router = require('express').Router();
const api = require('./api');

router.use('/api', api);

const home = "";
const list = 
`get all thoughts: GET ${home}/api/thoughts \n 
get single thought: GET ${home}/api/thoughts/:thoughtID \n
create new thought: POST ${home}/api/thoughts (body: { "id": "user ID", "content": "content" }) \n
update thought: PUT ${home}/api/thoughts/:thoughtID (body: { { "content": "content" }) \n
delete thought: DELETE ${home}/api/thoughts/:thoughtID \n
`


router.use('/',(req, res) => {
  return res.send(list);//add list of valid urls with parameters and bodies
});

module.exports = router;