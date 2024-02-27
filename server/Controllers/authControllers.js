// controllers/authController.js
const { createEmail, getEmails } = require('../Model/Queries');

exports.registerEmail = async (req, res) => {
    console.log(req.body);
    try {
        const email = await createEmail(req.body);
        res.status(201).send({ email });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.getEmails = async (req, res) => {
    try {
        const emails = await getEmails();
        res.send(emails);
    } catch (error) {
        res.status(500).send(error);
    }
};