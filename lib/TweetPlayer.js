'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var TweetPlayer = (function () {
  function TweetPlayer() {
    var tweets = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    _classCallCheck(this, TweetPlayer);

    this.setTweets(tweets);
    this.seeker = 0;
  }

  _createClass(TweetPlayer, [{
    key: 'setTweets',
    value: function setTweets(tweets) {
      this.tweets = tweets;

      // set start time and end time
      this.tweets.sort(function (a, b) {
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
  }, {
    key: 'play',
    value: function play(callback) {
      var _this = this;

      var interval = arguments.length <= 1 || arguments[1] === undefined ? 1000 : arguments[1];

      this.callback = callback;
      this.interval = interval;
      this.process = setInterval(function () {
        var findStart = _this._time(_this._time(_this.startTime).add(_this.seeker));
        var findEnd = _this._time(_this._time(_this.startTime).add(_this.seeker + _this.interval));
        _this.callback(_this.getTweets(findStart, findEnd));

        if (findStart > _this.endTime) {
          clearInterval(_this.process);
        }

        _this.seeker += _this.interval;
      }, this.interval);
    }
  }, {
    key: 'getTweets',
    value: function getTweets(findStart, findEnd) {
      return this.tweets.filter(function (tweet) {
        if (findStart <= tweet.created_at && findEnd > tweet.created_at) {
          return true;
        }
      });
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seekTime, callback) {
      this.seeker += seekTime;
      this.play(callback);
    }
  }, {
    key: '_time',
    value: function _time(time) {
      var formatString = 'ddd MMM DD HH:mm:ss ZZ YYYY';
      if (typeof time === 'string') {
        return (0, _moment2['default'])(time, formatString);
      }

      return time.utc().format(formatString);
    }
  }]);

  return TweetPlayer;
})();

exports['default'] = TweetPlayer;
module.exports = exports['default'];
