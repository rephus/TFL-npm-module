var should = require('chai').should();
var expect = require('chai').expect;

var config = require('../config.json');
var tfl = require('../index')(config.tfl.app_id, config.tfl.app_key);
var journey = tfl.journey;
var duration = tfl.duration;

var origin = {lat:51.5365225,lon:-0.1124238};
var destiny = {lat:51.5111398,lon:-0.1331997};

describe('#TFL journey', function() {
  it('returns succesful journey', function(done) {
    journey(origin, destiny, function(err, j) {
      expect(err).to.be.undefined;
      expect(j["$type"]).to.equal("Tfl.Api.Presentation.Entities.JourneyPlanner.ItineraryResult, Tfl.Api.Presentation.Entities");
      expect(j.journeys).to.not.empty;
      done();
    })
  });

  it('return invalid journey', function(done) {
    journey({}, {}, function(err, j) {
      expect(err).to.equal("No journeys available");
      expect(j).to.be.undefined;
      done();
    })
  });
});

describe('#TFL duration', function() {
  it('returns succesful duration', function(done) {
    duration(origin, destiny, function(err, d) {
      expect(err).to.be.undefined;
      expect(d).to.be.above(30); //39
      done();
    })
  });

  it('return invalid duration', function(done) {
    duration({}, {}, function(err, j) {
      expect(err).to.equal("No journeys available");
      expect(j).to.be.undefined;
      done();
    })
  });
});
