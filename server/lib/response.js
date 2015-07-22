
var _401 = function _401(res) {
  res.status(401);
  res.json({
    "status": 401,
    "message": "Invalid Data"
  });
}

var _200 = function _200(res, data) {
  res.status(200);
  res.json({
    "status": 200,
    "message": "Success",
    "data": data
  });
}


//exports
var exports = module.exports = {};
    exports._401   = _401;
    exports._200  = _200;
