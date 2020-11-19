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
    </article>`);
  return $tweet;
};

const renderTweets = function(tweets) {
  let tweetContainer = $('.tweet-container-main').html('');
  for (const tweet of tweets) {
    let tweetElement = createTweetElement(tweet);
    tweetContainer.prepend(tweetElement);
    console.log(tweetElement);
    
  }
};

// eslint-disable-next-line no-undef
// const $tweet = createTweetElement(tweetPlaceholder);
// console.log($tweet);
$(document).ready(() => {
  $("button").submit((event) => {
    event.preventDefault();
    const $JSON = JSON.parse($.getJSON("/tweets/"));
    renderTweets($JSON);
    $.ajax({ url: '/tweets/',  method: "POST", data: $.serialize(event) })//data
      .then(() => {
        tweetPlaceholder.push(event);
        console.log(event);
      });
  });
});
