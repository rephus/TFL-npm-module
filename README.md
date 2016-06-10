Transport for London
=========

Simple Transport for London module

Features:
* Journey: between 2 latlon points
* Duration: Time in minutes between 2 latlon points

TFL official documentation: https://api.tfl.gov.uk/

## Installation

```shell
  npm install
```

## Usage

```js
  var config = require('../config.json'); // or use your favorite config system
  var tfl = require('tfl')(config.tfl.app_id, config.tfl.app_key);

  var origin = {lat:51.5365225,lon:-0.1124238};
  var destiny = {lat:51.5111398,lon:-0.1331997};

  tfl.journey(origin, destiny, function(err, j) {
    console.log('Journey', j.journeys);
  });

```

## Tests

```shell
   npm test
```
