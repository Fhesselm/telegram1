var express = require('express');
var router = express.Router();

/* GET Telegram page. */
router.get('/telegram', function(req, res) {
  var db = req.db;
  var collection = db.get('paircollection');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* POST to sendTelegram. */
router.post('/sendTelegram', function(req, res) {
  var db = req.db;
  var collection = db.get('paircollection');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

module.exports = router;