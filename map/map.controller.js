const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/auth');
const mapService = require('./map.service');


router.get('/ownCenterMap', authorize(), centerMapTile);
router.get('/wholemap', authorize(), wholeMap);
router.get('/tileMap/:tileID', authorize(), tileMap);
router.get('/tileMapXY/:findX/:findY', authorize(), tileMapXY);
router.get('/capitalView/:capitalPositionX/:capitalPositionY', authorize(), capitalView);

module.exports = router;
function centerMapTile(req, res, next) {
    mapService.ownCenterMap(req.query.name).then(data => res.json(data)).catch(next);
}

function wholeMap(req, res, next) {
    mapService.wholeMap(req.query.name).then(data => res.json(data)).catch(next);
}

function tileMap(req, res, next) {
    mapService.tileMap(req.params.tileID).then(data => res.json(data)).catch(next);
}

function tileMapXY(req, res, next) {
    mapService.tileMapXY(req.params.findX, req.params.findY).then(data => res.json(data)).catch(next);
}

function capitalView(req, res, next) {
    mapService.capitalView(req.params.capitalPositionX, req.params.capitalPositionY).then(data => res.json(data)).catch(next);
}