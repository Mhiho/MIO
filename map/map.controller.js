const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/auth');
const mapService = require('./map.service');


router.get('/', authorize(), centerMapTile);

module.exports = router;
function centerMapTile(req, res, next) {
    mapService.ownMap(req.query.name).then(data => res.json(data)).catch(next);
}