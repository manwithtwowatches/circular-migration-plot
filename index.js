/*
 * Circular Migration Plot
 *
 * Copyright (c) 2014 null2 GmbH Berlin
 * Licensed under the MIT license.
 */

var d3 = require('d3');
var chart = require('./lib/chart');
var timeline = require('./lib/timeline');

module.exports = function(options) {
  if (!options.data) {
    throw('I need a data url!');
  }
  if (!options.svg_element && !options.chart) {
    throw('I need a chart node or an SVG element!');
  }

  if (typeof options.chart === 'string') {
    options.chart = {
      element: options.chart
    };
  }

  if (options.svg_element) {
    options.chart = {
      svg_element: options.svg_element
    };
  }

  if (typeof options.timeline === 'string') {
    options.timeline = {
      element: options.timeline
    };
  }

  d3.json(options.data, function(json) {
    var c = chart(json, options.chart);
    timeline(c, options.timeline);
    c.draw();
  });
};
