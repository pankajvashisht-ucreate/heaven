const express = require('express');
const router = express.Router();
const { UserController, PaymentController } = require('../src/Controller/v1/index');
const { UserAuth, cross } = require('../src/middleware/index');
const Apiresponse = require('../libary/ApiResponse');
let user = new UserController();

router.use([ cross, UserAuth ]);
router.get('/', function(req, res) {
	res.send(' APi workings ');
});

router.post('/user', Apiresponse(user.addUser));
router.post('/user/login', Apiresponse(user.loginUser));
router.post('/user/edit', Apiresponse(user.updateProfile));
router.post('/user/logout', Apiresponse(user.logout));
router.post('/soical_login', Apiresponse(user.soicalLogin));
router.post('/user/verifiy', Apiresponse(user.verifyOtp));
router.post('/forgot_password', Apiresponse(user.forgotPassword));
router.post('/user/change_password', Apiresponse(user.changePassword));
router.post('/add-seed', Apiresponse(PaymentController.addSeed));
router.post('/add-tithe', Apiresponse(PaymentController.addTithe));
router.post('/withdrawal', Apiresponse(PaymentController.withdrawal));
router.get('/balance', Apiresponse(PaymentController.myamount));
router.get('/transactions/:offset([0-9]+)?', Apiresponse(PaymentController.transactions));
router.delete('/transactions', Apiresponse(PaymentController.deleteTransaction));
router.post('/send-mail', Apiresponse(PaymentController.sendTransaction));
router.get('/app_info', Apiresponse(user.appInfo));
router.post('/in_app', Apiresponse(PaymentController.addInApp));
router.get('/in_app', Apiresponse(PaymentController.getInApp));
router.post('/webhook', Apiresponse(PaymentController.webHook));
module.exports = router;
