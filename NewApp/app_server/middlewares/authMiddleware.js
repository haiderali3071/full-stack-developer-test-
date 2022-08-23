const jwt = require( "jsonwebtoken");
const User = require('../models/user')


exports.verifyToken = async (req, res, next) => {
    const token = req.headers["token"];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                sendResponse(res, 400, { "result": "Invalid_Token" })
            } else {
                const user = await User.find({ _id: decodedToken?.userId });
                if (user != null) {
                    next();
                }
                else {
                    sendResponse(res, 400, { "result": "Invalid_Token" })
                }
            }
        });
    } else {
        sendResponse(res, 400, { "result": "Access_Denied" })
    }
};
