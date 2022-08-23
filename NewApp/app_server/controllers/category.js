const https = require('https');

exports.load = (req, res) => {

    const options = {
        hostname: 'demo2.meals4u.net',
        path: '/fe/api.test.php',
        method: 'GET'
    };
    request = https.request(options, result => {
        const body = []
        result.on('data', data => {
            body.push(data)
        });
        result.on('end', data => { 
            sendResponse(res, result.statusCode, {"API_response:":body.toString()})
        });
    });
    request.on('error', err => {
        sendResponse(res, 400, err)
    });
    request.end();

}