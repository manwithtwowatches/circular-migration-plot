/*
 * Circular Migration Plot
 *
 * Copyright (c) 2014 null2 GmbH Berlin
 * Licensed under the MIT license.
 */

var chart = require('./lib/chart');
var timeline = require('./lib/timeline');

module.exports = function(options) {
  if (!options.data && !options.data_set) {
    throw('I need a data url or a data set!');
  }
  if (!options.svg_element && !options.chart) {
    throw('I need a chart node or an SVG element!');
  }

  if (typeof options.chart === 'string') {
    options.chart = {
      element: options.chart
    };
  }

  if (options) {
    options.chart = options;
  }

  if (typeof options.timeline === 'string') {
    options.timeline = {
      element: options.timeline
    };
  }

  if (options.data_set) {
    var data = {
      matrix: options.data_set.matrix,
      names: options.data_set.names,
      regions: options.data_set.regions
    };
    var c = chart(data, options.chart);
      timeline(c, options.timeline);
      c.draw();
      return c;
  } else {
    d3.json(options.data, function(json) {
      var c = chart(json, options.chart);
      timeline(c, options.timeline);
      c.draw();
    });
  }
};
