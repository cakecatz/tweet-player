var TweetPlayer = require('./index.js');
var tweets = require('./Sample.json');

var opts = {
  interval: 500,
};

player = new TweetPlayer(tweets);

// player.seekTo(1000, (tweets) => {
//   tweets.forEach((tweet) => {
//     console.log(tweet.created_at);
//   });
// });

player.play((tweets) => {
  tweets.forEach((tweet) => {
    console.log(tweet.created_at);
  });
});