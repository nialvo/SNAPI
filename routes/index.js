const router = require('express').Router();
const api = require('./api');

router.use('/api', api);

const home = "http://localhost:3001";
const list = 
`API REQUESTS <br><br>

THOUGHTS<br>
get all thoughts: GET ${home}/api/thoughts <br> 
get single thought: GET ${home}/api/thoughts/:thoughtID <br> 
post new thought: POST ${home}/api/thoughts <br> 
body: { "id": "user ID", "content": "content" } <br> 
update thought: PUT ${home}/api/thoughts/:thoughtID <br>  
body: { "content": "content" } <br> 
delete thought: DELETE ${home}/api/thoughts/:thoughtID <br> <br>

REACTIONS <br>
post new reaction: ${home}/api/reactions/new/:thoughtId/:userId <br>
body: {"content": "content"}<br>
delete reaction: ${home}/api/reactions/delete/:thoughtId/:reactionId <br> <br>

USERS <br>
get all users: GET ${home}/api/users/ <br>
get user by id: GET ${home}/api/users/id/:id <br>
get user by name: GET ${home}/api/users/name/:name <br>
create new user: POST ${home}/api/users/ <br>
body: {"name": "name", "email": "email" } <br>
update user name or email: PUT ${home}/api/users/id/:id <br>
body: {"name": "name", "email": "email" } (both not required) <br>
delete user by id: DELETE ${home}/api/users/id/:id <br>
delete user by name: DELETE ${home}/api/users/name/:name <br>
add friend: POST ${home}/api/users/friends/:userId/:friendId <br>
remove friend: DELETE ${home}/api/users/friends/:userId/:friendId <br>
`


router.use('/',(req, res) => {
  return res.send(list);//add list of valid urls with parameters and bodies
});

module.exports = router;