/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
$(document).ready(() => {
  $("textarea").on('keydown', function() { //displays number of remaining available characters in tweet
    let $numOfCharacters = $(this).val().length;
    let $subbedCharacters = 140 - $numOfCharacters;
    if ($subbedCharacters <= 30) {
      $(".buttons output").text($subbedCharacters).css("color", "red");
    } else {
      $(".buttons output").text($subbedCharacters).css("color", "#545149");
    }
  });
});

