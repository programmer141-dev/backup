const express = require('express');
const router = express.Router();
const { getMessages, postMessage, deleteMessage, getMessage, deleteMessages } = require('../controllers/message')

router.get('/', getMessages)
router.get('/:id', getMessage)
router.post('/', postMessage)
router.delete('/', deleteMessages)
router.delete('/:id', deleteMessage)

module.exports = router;