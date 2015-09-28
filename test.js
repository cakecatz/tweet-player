import test from 'ava';
import assert from 'power-assert';
import moment from 'moment';
import Player from './';

const tweets = require('./test.json');
const interval = 1000;
const sortedTweets = tweets.sort((a, b) => {
  if (a.created_at > b.created_at) {
    return 1;
  } else if (a.created_at < b.created_at) {
    return -1;
  }
  return 0;
});
const formatString = 'ddd MMM DD HH:mm:ss ZZ YYYY';

const time = {
  start: sortedTweets[0].created_at,
  end: sortedTweets[sortedTweets.length - 1].created_at,
};

time.m_start = moment(time.start, formatString);
time.m_end = moment(time.end, formatString);

const getTweetsByMs = (ms) => {
  let findingTime = moment(time.start, formatString).add(ms).utc().format(formatString);
  return sortedTweets.filter((tweet) => {
    if (tweet.created_at === findingTime) {
      return true;
    }
  });
};

const showIds = (tweets) => {
  tweets.forEach((tweet) => {
  });
};

const player1 = new Player(tweets);
test('play', function (t) {
  t.plan(3);
  player1.play((tweets, isEnd, seeker) => {
    if (!isEnd) {
      t.same(tweets, getTweetsByMs(seeker));
    }
  }, interval);
});

const player2 = new Player(tweets);
test('seekTo', function (t) {
  t.plan(2);
  player2.seekTo(1000, (tweets, isEnd, seeker) => {
    if (!isEnd) {
      t.same(tweets, getTweetsByMs(seeker));
    }
  }, interval);
});
