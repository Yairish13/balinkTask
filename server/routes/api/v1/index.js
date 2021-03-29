const router = require("express").Router();

const {authenticateToken} = require("../../../index.js")
router.use('/auth', require('./auth'))
router.use(authenticateToken) 
router.use('/person', require('./person'))
router.use('/animals' ,require('./animals'))
router.use('/membership', require('./membership'))

module.exports = router