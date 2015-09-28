TweetPlayer
===========

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

player.play((tweets) => {
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
