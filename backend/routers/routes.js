const express = require("express")
const router = express.Router()
const chat = require('../controllars/chat')
const {login, loginPost} = require('../controllars/login')
const {resister} = require('../controllars/resister')

router.get('/chat',chat)
router.get('/login',login)
router.post('/login',loginPost)
router.post('/resister', resister)

module.exports = router;