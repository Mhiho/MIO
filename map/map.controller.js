const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/auth');
const mapService = require('./map.service');


router.get('/ownCenterMap', authorize(), centerMapTile);
router.get('/wholemap', authorize(), wholeMap);

module.exports = router;
function centerMapTile(req, res, next) {
    mapService.ownCenterMap(req.query.name).then(data => res.json(data)).catch(next);
}

function wholeMap(req, res, next) {
    mapService.wholeMap(req.query.name).then(data => res.json(data)).catch(next);
}