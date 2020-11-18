// eslint-disable-next-line no-undef
$(document).ready(() => {
  console.log("This is working");
  $("textarea").on('keydown', function() {
    let $numOfCharacters = $(this).val().length;
    let $subbedCharacters = 140 - $numOfCharacters;
    $(".buttons output").text($subbedCharacters);
  });
});

