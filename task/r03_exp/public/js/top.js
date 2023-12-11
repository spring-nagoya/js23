'use strict';

var $ = require('jquery');

$(function () {
  $("#btn").on(
    {
      'click': function () {
        alert('ぼたん押した');
      }
    },
    // {
    //   'mouseover': function () {
    //     $(this).css('background-color', '#0000ff');
    //   }
    // },
  );
});