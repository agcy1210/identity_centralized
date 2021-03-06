const express = require('express');
//const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const axios = require('axios');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.redirect('/login');
});

router.get('/signup', (req, res, next) => {
	res.render('signupSelect');
});

router.get('/logout', (req, res, next) => {
	req.logout();
	req.session.userId = null;
	req.session.type = null;
	res.redirect("/login")
});

router.post('/signup', authController.signupSelect);

router.get('/signup/authority', (req, res, next) => {
    res.render('authoritySignupForm');
});
router.post('/signup/authority', authController.authSignup);

//Verifier
router.get('/signup/verifier', (req, res, next) => {
    res.render('verifierSignupForm');
});

router.get('/dashboard/authority', (req, res, next) => {
	res.render('Auth_dashboard');
});

router.get('/dashboard/verifier', (req,res, next) => {
	console.log(req.session.userId)
    res.render('verifier_dashboard')
});

router.post('/upload/image', authController.uploadFile);

router.post('/api/signup/user', authController.userRegister);

router.post('/signup/verifier', authController.verSignup);

//Login
router.get('/login', (req, res, next) => {
	// if(req.session.userId) {
	// 	let url;
	// 	if(req.session.type === "user") {
	// 			url = "/user/dashboard";
	// 	} else if (req.session.type === "authority") {
	// 		url = "/dashboard/authority";
	// 	} else {
	// 		url  = "/dashboard/verifier";
	// 	}
	// 	console.log(url)
	// 	return res.redirect(url);
	// } else {
	// 	 res.render('login');
	// }
	res.render("login");
});
router.post('/login', authController.login);

router.get('/user/dashboard', authController.dashboard);
router.get('/user/details', authController.postDashboard);
router.post('/api/update/publicKey', authController.updatePublicKey);

router.post('/api/otp/send', authController.sendOtp);

router.post('/api/otp/verify', authController.verifyOtp);

router.post('/api/block/details', authController.getBlockDetails);

router.get('/authority/updateForm', authController.updateForm);
router.post('/authority/updateAddBlock', authController.updateAddBlock);

router.post('/api/block/verify', authController.verifyBlockDetails);

// router.get('/user/details', authController.userDetails);

router.get('/blocks', async (req, res, next) => {
    var idData = await axios('http://localhost:3002/api/basic/blocks');

    res.render('showBlocks',{ idData: idData.data});
});

module.exports = router;
