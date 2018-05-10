var express = require('express');
var router = express.Router();

/* GET pairslist. */
router.get('/pairlist', function(req, res) {
  var db = req.db;
  var collection = db.get('paircollection');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* POST to addpair. */
router.post('/addpair', function(req, res) {
  var db = req.db;
  var collection = db.get('paircollection');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

/* DELETE to deletepair. */
router.delete('/deletepair/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('paircollection');
  var pairToDelete = req.params.id;
  collection.remove({ '_id' : pairToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;
