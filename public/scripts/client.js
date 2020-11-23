/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetData) { //composes each tweet
  // eslint-disable-next-line no-undef

  const dateCreated = new Date(tweetData.created_at);
  const today = new Date(Date.now());
  let dateDifference = dateCreated.getTime() - today.getTime();
  dateDifference = Math.round(dateDifference / (1000 * 3600 * 24));
  if (dateDifference < 0) {
    dateDifference /= -1;
  }
  const $tweet = $(`<article class="tweet-container">
    <article class="tweet-header">
    <img src=${tweetData.user.avatars} style="width:50px;height:50px;">
    <h5>${tweetData.user.name}</h5>
    <h5 class="tweet-username" style="color: grey;opacity: 70%;">${tweetData.user.handle}</h5>
  </article>
  <article class="tweet-body">
    <article class="tweet-text">
      <a>${escape(tweetData.content.text)}</a>
      <br>
    </article>
    <footer>
      <small fontsize=10px>Posted ${dateDifference} days ago</small>
    </footer>
   </article>
  </article>`);
  return $tweet;
};

const renderTweets = function(tweets) { //adds each tweet to the page
  let tweetContainer = $('.tweet-container-main').html('');
  for (let x = 0; x < tweets.length; x++) {
    let tweetElement = createTweetElement(tweets[x]);
    tweetContainer.prepend(tweetElement);
  }
};

const renderError = function(error) { //shows error if any
  $("#error-message").html('').prepend(error);
};

// eslint-disable-next-line no-undef
$(document).ready(function() {
  const loadTweets = function() { //loads tweets from database
    $.getJSON("/tweets/", function(data) {
      renderTweets(data);
    });
  };
  loadTweets();
  $("form").on("submit", function(event) {
    event.preventDefault();
    if ($(this).serialize().length > 5 && $(this).serialize().length <= 145) { //checks for length error
      renderError("");
      $.ajax({url: "/tweets/", method: "POST", data: $(this).serialize()}); //posts new tweet to database
      this.reset();
      $(".buttons output").text(140).css("color", "#545149"); //resets counter
      loadTweets();
    } else if ($(this).serialize().length <= 5) {
      renderError("No tweet entered");
    } else if ($(this).serialize().length > 145) {
      renderError("Tweet is too long!");
    }
  });
});