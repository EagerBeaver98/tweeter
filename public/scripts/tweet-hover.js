/* eslint-disable no-undef */
$(document).ready(() => { //function creates and removes drop shadow of tweets on mouse hover
  $('.tweet-container').hover(function() {
    console.log("hovering");
    $('.tweet-container').css("boxShadow", "10px 5px 0px grey");
  }, function() {
    $('.tweet-container').css("boxShadow", "0px 0px 0px grey");
  });
});
