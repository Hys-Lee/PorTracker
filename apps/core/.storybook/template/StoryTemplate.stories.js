"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Primary = void 0;
var _StoryTemplate = _interopRequireDefault(require("./StoryTemplate"));
require("../stylex_bundle.css");
var meta = {
  component: _StoryTemplate["default"],
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/StoryTemplate',
  tags: ['autodocs'],
  argTypes: {}
};
var _default = exports["default"] = meta;
var Primary = exports.Primary = {
  args: {}
};