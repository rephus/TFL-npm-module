var request = require('superagent');

var appId, appKey;
var host = 'api.tfl.gov.uk';

var DEBUG = false;

var journey = function (from, to, callback) {

 var credentials = '&app_id='+appId+'&app_key='+appKey;
 var parameters ='?nationalSearch=False&timeIs=Departing&alternativeCycle=False&alternativeWalking=True&applyHtmlMarkup=False&useMultiModalCall=False';

 var path = '/Journey/JourneyResults/'+from.lat+','+from.lon
     + '/to/'+to.lat+','+to.lon
     + parameters
     + credentials;

 if (DEBUG) console.log("Making request to TFL: " + host + path);

 request
   .get(host + path)
   .end(function(err, res) {
       if (err) callback(err);
       else {
         if (res.body.journeys === undefined) callback("No journeys available");
         else callback(undefined, res.body);
       }
   });

 }

 var duration = function(from, to, callback) {
   journey(from,to, function(err, j){
     if (err) callback(err);
     else callback(undefined, j.journeys[0].duration);
   });
 }


module.exports = function(id, key){
  appId = id;
  appKey = key;
  return {
   journey: journey,
   duration: duration
 }
};
