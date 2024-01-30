const express = require('express');
const router = express.Router();
const chat = require('../controllars/chat');
const { login, loginPost } = require('../controllars/login');
const { resister } = require('../controllars/resister');
const auth = require('../controllars/auth');

router.get('/chat', chat);
router.get('/login', login);
router.post('/login', loginPost);
router.post('/resister', resister);
router.get('/auth', auth);

module.exports = router;
