"use strict";
exports.__esModule = true;
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var ProfileAbout_1 = require("./ProfileAbout");
var ProfilePhotos_1 = require("./ProfilePhotos");
exports["default"] = mobx_react_lite_1.observer(function ProfileContent(_a) {
    var profile = _a.profile;
    var panes = [
        { menuItem: "About", render: function () { return react_1["default"].createElement(ProfileAbout_1["default"], { profile: profile }); } },
        { menuItem: "Photos", render: function () { return react_1["default"].createElement(ProfilePhotos_1["default"], { profile: profile }); } },
        { menuItem: "Events", render: function () { return react_1["default"].createElement(semantic_ui_react_1.Tab.Pane, null, "Events Content"); } },
        { menuItem: "Followers", render: function () { return react_1["default"].createElement(semantic_ui_react_1.Tab.Pane, null, "Followers Content"); } },
        { menuItem: "Following", render: function () { return react_1["default"].createElement(semantic_ui_react_1.Tab.Pane, null, "Following Content"); } },
    ];
    return (react_1["default"].createElement(semantic_ui_react_1.Tab, { menu: { fluid: true, vertical: true }, menuPosition: "right", panes: panes }));
});
