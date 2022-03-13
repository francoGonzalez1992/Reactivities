"use strict";
exports.__esModule = true;
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var store_1 = require("../../app/stores/store");
exports["default"] = mobx_react_lite_1.observer(function ProfileAbout(_a) {
    var profile = _a.profile;
    var _b = store_1.useStore().profileStore, isCurrentUser = _b.isCurrentUser, updateProfile = _b.updateProfile, loading = _b.loading;
    var _c = react_1.useState(false), editAboutMode = _c[0], setEditAboutMode = _c[1];
    var _d = react_1.useState(profile.bio || ""), bio = _d[0], setBio = _d[1];
    var _e = react_1.useState(profile.displayName || ""), displayName = _e[0], setDisplayName = _e[1];
    function handleUpdateDisplayName(e) {
        setDisplayName(e.currentTarget.value);
    }
    function handleUpdateBio(e) {
        setBio(e.currentTarget.value);
    }
    return (react_1["default"].createElement(semantic_ui_react_1.Tab.Pane, null,
        react_1["default"].createElement(semantic_ui_react_1.Grid, null,
            react_1["default"].createElement(semantic_ui_react_1.Grid.Column, { width: 16 },
                react_1["default"].createElement(semantic_ui_react_1.Header, { floated: "left", icon: "user", content: "About " + profile.displayName }),
                isCurrentUser && (react_1["default"].createElement(semantic_ui_react_1.Button, { floated: "right", basic: true, content: editAboutMode ? "Cancel" : "Edit Profile", color: editAboutMode ? "red" : "teal", onClick: function () { return setEditAboutMode(!editAboutMode); } }))),
            editAboutMode && (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(semantic_ui_react_1.Grid.Column, { width: 16 },
                    react_1["default"].createElement(semantic_ui_react_1.Input, { placeholder: "Name", value: displayName, onChange: function (e) { return handleUpdateDisplayName(e); }, fluid: true })),
                react_1["default"].createElement(semantic_ui_react_1.Grid.Column, { width: 16 },
                    react_1["default"].createElement(semantic_ui_react_1.TextArea, { placeholder: "Your Bio", value: bio, onChange: function (e) { return handleUpdateBio(e); }, rows: 4, style: { width: "100%", resize: "none" } })),
                react_1["default"].createElement(semantic_ui_react_1.Grid.Column, { width: 16 },
                    react_1["default"].createElement(semantic_ui_react_1.Button, { floated: "right", color: "green", content: "Update Profile", loading: loading, onClick: function () {
                            updateProfile(displayName, bio);
                            setEditAboutMode(false);
                        } })))))));
});
