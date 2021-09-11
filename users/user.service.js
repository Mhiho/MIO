const secret = require('../config').secret;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))){
        throw 'Email or password is incorrect';
    }
    // authentication successful
    const token = jwt.sign({ sub: user.userID + Date.now() }, secret, { expiresIn: '30d' });
    const tokens = user.tokens;
    tokens.push({token});
    await db.User.update({tokens},{where: {userID: user.userID}}).then((updatedUser)=>{ updatedUser.tokens });
    const response = { ...omitHash(user.get()) };
    return {response, token};
}

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { name: params.name } })) {
        throw 'Username "' + params.name + '" is already taken';
    }
    if (await db.User.findOne({ where: { email: params.email }})) {
        throw 'Email "' + params.email + '" is already taken';
    }
    // hash password
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    
    }
    // save user
    await db.User.create(params);
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const nameChanged = params.name && user.name !== params.name;
    if (nameChanged && await db.User.findOne({ where: { name: params.name } })) {
        throw 'Username "' + params.name + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { passwordHash, userID, tokens, email, ...userWithoutHash } = user;
    return userWithoutHash;
}