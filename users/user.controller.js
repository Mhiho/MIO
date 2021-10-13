const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/auth')
const userService = require('./user.service');
const { page } = require('../config');
const jwt = require('jsonwebtoken')
// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.post('/logoutCurrent', authorize(), logoutCurrent)
router.post('/logoutAll', authorize, logoutAll);
router.get('/verify', verify);
router.post('/sendEmailToResetPassword', startResetPassword)
router.post('/resetPassword/:token', changePasswordSchema, resetPwd)
router.get('/checkResetMail', checkResetMail)
// router.get('/:id', authorize(), getById);

module.exports = router;

async function verify(req, res, next) {
    const response = await userService.verify(req.query.token).catch(e=> {
        if(Object.values(e).includes('jwt expired')) {
            res.redirect(`${page}tokenExpired`)
        }
        console.log(e)
    })
    if(response === '0') {
        res.redirect(`${page}tokenUsed`)
    }
    if(response === '1') {
        res.redirect(`${page}userExist`)
    }
    res.redirect(`${page}login`)
}

async function startResetPassword(req, res, next) {
    const response = await userService.startResetPassword(req.body.email).catch(next);
    if(response === null) {
        res.send('not done');
    }
    if(response === 'done')
        res.send(JSON.stringify(response));
}
async function checkResetMail(req, res, next) {
    const response = await userService.checkResetMail(req.query.token).catch(e=> {
        if(Object.values(e).includes('jwt expired')) {
            res.redirect(`${page}tokenExpired`)
        }
        console.log(e)
    })
    console.log(response)
    if(response === 'mail not ok'){ 
    res.redirect(`${page}`)
    }
    if(response.token === req.query.token) { 
        res.redirect(`${page}resetMyPassword/${response.token}`) 
    }
}
async function changePasswordSchema(req, res, next) {
    const schema = Joi.object({
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}
async function resetPwd(req, res, next) {
    const { token } = req.params;
    const { password } = await req.body;
    userService.resetPwd(password, token)
        .then(data => res.send(data))
        .catch(next);
}

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(response => {
            res.send(response)
        })
        .catch(e=> console.log(e));
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
        .then(() => res.json({message: 'jest nowy'}))
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
//to nie działa
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