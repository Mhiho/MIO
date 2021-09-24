const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { myMail, secret, server } = require('../config');


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: myMail.user,
        pass: myMail.password, 
    },
});

const sendVerificationMail = async (email, name) => {
    const user = await db.User.scope('withHash').findOne({ where:{email}})
    const token = jwt.sign({ id: user.userID }, secret, { expiresIn: '1d' });
    console.log(token)
    console.log(jwt.verify(token, secret))
    await transporter.sendMail({
        from: '"Administrator" m.pelka7@gmail.com',
        to: email,
        subject: 'Zweryfikuj swoje konto',
        //UWAGA
        html: `<div><h1>Cześć ${name},</h1> <h3>zweryfikuj swoje konto:</h3> </br> <button style="background: lightgreen; height: 50px; width: 90px; border-radius: 5px"><a style="color: white; text-decoration: none" href="${server}users/verify?token=${token}">Zweryfikuj</a></button>\n <h3>Jeśli nie wysłałeś prośby o zmianę hasła, skontaktuj się z nami jak najszybciej.\n Pozdrawiamy! \n Obsługa</h3></div>`
        // 
    })
}

const sendResetPwd = async (email) => {
    const user = await db.User.findOne({"email": email})
    const name = user.name
    const token = jwt.sign({ id: user.userID + Date.now() }, secret, { expiresIn: '1d' });

    await transporter.sendMail({
        from: '"Administrator" m.pelka7@gmail.com',
        to: email,
        subject: 'Zresetuj hasło',
        //UWAGA
        html: `<div><h1>Cześć ${name},</h1> <h3>zresetuj swoje hasło:</h3> </br> <button style="background: lightgreen; height: 50px; width: 90px; border-radius: 5px"><a href="${server}?token=${token}">Reset</a></button> \n <h3>Jeśli nie wysłałeś prośby o zmianę hasła, skontaktuj się z nami jak najszybciej.\n Pozdrawiamy! \n Obsługa</div>`
        // 
    })
}

module.exports = {
    sendVerificationMail,
    sendResetPwd
}