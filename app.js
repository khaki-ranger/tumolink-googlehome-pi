'use strict';

const settings = require('./settings');
const request = require('request');
const googlehome = require('google-home-notifier')
googlehome.ip(settings.target.googlehomeIp);
googlehome.device(settings.target.googlehomeDeviceName, settings.target.googlehomeDeviceCountry);

const requestToTumolink = function() {
  request.post({
    url: settings.target.url,
    form: {spaceId: settings.target.spaceId}
  }, function (error, response, body) {
    if (!error && response && response.statusCode === 200) {
      const responseBodyObj = JSON.parse(body);
      console.log('newArrival:', responseBodyObj.newArrival);
      if (responseBodyObj.newArrival) {
        console.log('text:', responseBodyObj.text);
        googlehome.notify(responseBodyObj.text,  function(res) {
          console.log('response googlehome: ' + res);
          setTimeout(requestToTumolink, settings.target.intervalMillisecond);
        });
      } else {
        setTimeout(requestToTumolink, settings.target.intervalMillisecond);
      }
    } else {
      console.log('error:', error); // Print the error if one occurred
      setTimeout(requestToTumolink, settings.target.intervalMillisecond);
    }
  });
};

requestToTumolink();

