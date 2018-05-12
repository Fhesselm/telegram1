var express = require('express');
var router = express.Router();

/* GET Telegram page. */
router.get('/telegram', function(req, res) {
    res.render('telegram', { title: 'Test test' });
});

/* POST to sendTelegram. */
router.post('/sendTelegram', function(req, res) {
    console.log("I will post the following message in telegram " +req.body.text);
});

module.exports = router;