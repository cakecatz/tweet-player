var TweetPlayer = require('./');
var tweets = require('./sample.json');

var opts = {
  interval: 500,
};

player = new TweetPlayer(tweets);

// player.seekTo(1000, (tweets) => {
//   tweets.forEach((tweet) => {
//     console.log(tweet.created_at);
//   });
// });

var showTweet = (tweets) => {
  tweets.forEach((tweet) => {
    console.log(tweet.text);
  });
};

player.play(showTweet);

setTimeout(() => {
  player.pause();
  console.log("\n\n############ PAUSE ############\n\n");
  setTimeout(() => {
    player.play(showTweet);
  }, 3000);
}, 3000);
