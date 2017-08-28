var request = require('request');

var requester = {
    timeout: 30000,
    send: function(url, method, params, callback) {
        var options = {
            url: url,
            method: method,
            headers: {
                timeout: requester.timeout
            }
        };

        switch (options.method.toUpperCase()) {
            case 'GET':
                options.qs = params;
                break;
            default:
                options.json = true;
                options.body = params;
                break;
        }

        request(options, function (error, response, body) {
            if (error) {
                return callback(error);
            } else if (typeof response == 'undefined' || !response || response == null) {
                return callback('response is empty');
            }
            if (body) {
                try {
                    if (typeof body == 'string') {
                        body = JSON.parse(body);
                    }
                } catch (e) {
                    console.error(e);
                    return callback("Error: Cannot parse body --> " + body);
                }
            }
            return callback(null, body);
        });
    }
};

module.exports = requester;