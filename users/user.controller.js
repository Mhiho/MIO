const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/auth')
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.post('/logoutCurrent', authorize(), logoutCurrent)
router.post('/logoutAll', authorize, logoutAll);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(data => res.send(data))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string(),
        name: Joi.string().required(),
        password: Joi.string().min(8).required(),
        race: Joi.string().valid('0', '1', '2').required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.send({}))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    console.log('nizej')
    console.log(req)
    console.log(req.user.details)
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().empty(''),
        name: Joi.string().empty(''),
        password: Joi.string().min(8).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

async function logoutCurrent(req, res, next) {
    try {
        console.log(req.user)
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save();
        console.log('till end')
        res.send('logoutCurrent done')
    } catch (e) {
        res.status(500).send(e)
    }
}

async function logoutAll(req, res, next) {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send('Wylogowałeś się ze wszystkiego')
    } catch(e) {
        res.status(500).send(e)
    }
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}