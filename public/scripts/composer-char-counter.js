/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
$(document).ready(() => {
  $("textarea").on('keydown', function() {
    let $numOfCharacters = $(this).val().length;
    let $subbedCharacters = 140 - $numOfCharacters;
    $(".buttons output").text($subbedCharacters);
  });
});

