import moment from 'moment';

export default class TweetPlayer {
  constructor(tweets = []) {
    this.setTweets(tweets);
    this.seeker = 0;
    this.isPaused = false;
  }

  setTweets(tweets) {
    this.tweets = tweets;

    // set start time and end time
    this.tweets.sort((a, b) => {
      if (a.created_at > b.created_at) {
        return 1;
      } else if (a.created_at < b.created_at) {
        return -1;
      }
      return 0;
    });
    this.startTime = this.tweets[0].created_at;
    this.endTime = this.tweets[this.tweets.length - 1].created_at;
  }

  play(callback, interval = 1000) {
    this.callback = callback;
    this.interval = interval;
    this.isEnd = false;
    this.isPaused = false;
    const f = () => {
      if (this.isPaused) {
        return;
      }
      const findStart = this._time(this._time(this.startTime).add(this.seeker));
      const findEnd = this._time(this._time(this.startTime).add(this.seeker + this.interval));
      this.callback(this.getTweets(findStart, findEnd), this.isEnd, this.seeker);

      if (findStart <= this.endTime) {
        this.seeker += this.interval;
        setTimeout(f.bind(this), this.interval);
      } else {
        this.isEnd = true;
      }
    };
    f();
  }

  pause() {
    this.isPaused = true;
  }

  getTweets(findStart, findEnd) {
    return this.tweets.filter((tweet) => {
      if (findStart <= tweet.created_at && findEnd > tweet.created_at) {
        return true;
      }
    });
  }

  seekTo(seekTime, callback, interval = 1000) {
    this.seeker += seekTime;
    this.play(callback, interval);
  }

  _time(time) {
    const formatString = 'ddd MMM DD HH:mm:ss ZZ YYYY';
    if (typeof time === 'string') {
      return moment(time, formatString)
    }

    return time.utc().format(formatString);
  }
}