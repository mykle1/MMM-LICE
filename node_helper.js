/* Magic Mirror
 * Module: MMM-LICE
 *
 * By Mykle1
 *
 */
const NodeHelper = require('node_helper');
const request = require('request');


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getLICE: function(url) {
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
				var result = JSON.parse(body);
				//	console.log(response.statusCode + result); // for checking
                    this.sendSocketNotification('LICE_RESULT', result);
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_LICE') {
            this.getLICE(payload);
        }
    }
});
