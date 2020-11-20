/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetPlaceholder = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


const createTweetElement = function(tweetData) {
  // eslint-disable-next-line no-undef
  const $tweet = $(`<article class="tweet-container">
    <article class="tweet-header">
    <img src=${tweetData.user.avatars} style="width:50px;height:50px;">
    <h5>${tweetData.user.name}</h5>
    <h5 class="tweet-username" style="color: grey;opacity: 70%;">${tweetData.user.handle}</h5>
  </article>
  <article class="tweet-body">
    <article class="tweet-text">
      <a>${tweetData.content.text}</a>
      <br>
    </article>
    <footer>
      <small>posted ${tweetData.created_at}</small>
    </footer>
   </article>
  </article>`);
  return $tweet;
};

const renderTweets = function(tweets) {
  let tweetContainer = $('.tweet-container-main').html('');
  for (let x = 0; x < tweets.length; x++) {
    let tweetElement = createTweetElement(tweets[x]);
    tweetContainer.prepend(tweetElement);
    console.log(tweetElement);
    
  }
};


// eslint-disable-next-line no-undef
$(document).ready(function() {
  const loadTweets = function() {
    $.getJSON("/tweets/", function(data) {
      // console.log(data);
      renderTweets(data);
    });
  };
  loadTweets();
  $("form").on("submit", function(event) {
    event.preventDefault();
    $.ajax({url: "/tweets/", method: "POST", data: $(this).serialize()})
      .then(loadTweets());
  });
});