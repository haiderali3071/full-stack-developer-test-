const User = require('../models/user')
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

exports.registerController = (req, res) => {
    const { userId, password } = req.body
    if (userId && password) {
        req.body.password = crypto.createHash('sha256').update(password).digest('base64')
        const user = new User(req.body)
        user.save((err, data) => {
            if (err) {
                sendResponse(res, 400, err)
            }
            else {
                const token = jwt.sign(
                    {
                        userId: String(data._id),
                        time: new Date().getTime(),
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '2h' }
                );
                sendResponse(res, 201, { "result": "successfully_registered", "token": token })
            }
        })
    }
    else {
        sendResponse(res, 400, { "result": "Invalid request" })
    }

}

exports.loginController = (req, res) => {
    let { userId, password } = req.body
    if (userId && password) {
        password = crypto.createHash('sha256').update(password).digest('base64')
        User.findOne({ userId, password }, (err, data) => {
            if (err) {
                sendResponse(res, 400, err)
            }
            else if (data != null) {
                const token = jwt.sign(
                    {
                        userId: String(data._id),
                        time: new Date().getTime(),
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '2h' }
                );
                sendResponse(res, 201, { "result": "successfully_login", "token": token })
            }
            else {

                sendResponse(res, 400, { "result": "user_not_found" })
            }
        })
    }
    else {
        sendResponse(res, 400, { "result": "Invalid request" })
    }
}