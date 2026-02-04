let express = require('express');
const {homePage, userInsert, userView, userDelete, updatedUser} = require('../controller/userController');

let router = express.Router();

router.get('/', homePage);
router.post('/user-insert', userInsert);
router.get('/user-view', userView);
router.delete('/user-delete/:id', userDelete);
router.put('/user-update/:id', updatedUser);

module.exports = router;