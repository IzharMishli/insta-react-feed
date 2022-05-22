"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireWildcard(require("react"));

var _InstaImg = _interopRequireDefault(require("./InstaImg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default(props) {
  const [posts, setPosts] = (0, _react.useState)({
    isError: false,
    isLoaded: false,
    feeds: []
  });
  var url = "https://graph.instagram.com/me/media?fields=caption,media_count,media_type,permalink,media_url&&access_token=" + props.token;
  (0, _react.useEffect)(function effectFunc() {
    fetch(url).then(res => res.json()).then(res => {
      if (!res.hasOwnProperty("error")) {
        setPosts({
          isError: false,
          isLoaded: true,
          feeds: res.data
        });
      } else {
        setPosts({
          isError: true,
          isLoaded: true
        });
        console.log("error...");
      }
    });
  }, []);
  console.log(posts);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "row insta-part"
  }, /*#__PURE__*/_react.default.createElement("h1", null, posts.feeds.length > 0 ? "" : "Loading"), posts.feeds.filter(post => String(post.caption).includes(props.tag ? props.tag : "") && (post.media_type == "IMAGE" || post.media_type == "CAROUSEL_ALBUM")).map(post => /*#__PURE__*/_react.default.createElement(_InstaImg.default, {
    imgsrc: post.media_url,
    link: post.permalink
  })));
}