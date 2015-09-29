TweetPlayer
===========

[![Build Status](https://drone.io/github.com/cakecatz/tweet-player/status.png)](https://drone.io/github.com/cakecatz/tweet-player/latest)

## Install

```sh
npm install tweet-player
```

## Usage

### play

```javascript
import TweetPlayer from 'tweet-player';

const tweets = [
  {
    /// raw tweets json data
    /// See sample.json
  },
];

const interval = 500; /// default is 1000ms

player = new TweetPlayer(tweets);

player.play((tweets, isEnd, seeker) => {
  tweets.forEach((tweet) => {
    console.log(tweet.text);
  });
}, interval);
```

### seekTo

play from the time specified

```javascript
player.seekTo(1000, (tweets) => {
    // your code here
});
```

### pause

pause player

```javascript
player.play(() => {
  // callback
});

// will pause after 3000ms
setTimeout(() => {
  player.pause()

  // and restart after 3000ms from paused
  setTimeout(() => {
    player.play(() => {
      /// callback
    });
  }, 3000);
}, 3000);
```
