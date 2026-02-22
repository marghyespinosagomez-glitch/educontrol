const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    __u.render(res, 'main', false)
});

router.get('/login', async (req, res) => {
    __u.render(res, 'login')
});


module.exports = router;