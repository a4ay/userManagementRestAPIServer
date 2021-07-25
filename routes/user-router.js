const express = require('express') 


const multer = require('multer');

const router = express.Router();
var upload = multer({ dest : './public/uploads' })

const userController = require('../controller/user-controller')

router.get('/users/:id',userController.getUser);
router.get('/users',userController.getUsers);
router.put('/users/:id',upload.single('profile'),userController.putEditUser);
router.delete('/users/:id',userController.deleteUser);
router.post('/users',upload.single('profile'),userController.postAddUser);

module.exports = router