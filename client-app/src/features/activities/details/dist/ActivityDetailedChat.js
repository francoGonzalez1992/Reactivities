"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var esm_1 = require("date-fns/esm");
var formik_1 = require("formik");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var semantic_ui_react_1 = require("semantic-ui-react");
var store_1 = require("../../../app/stores/store");
var Yup = require();
exports["default"] = mobx_react_lite_1.observer(function ActivityDetailedChat(_a) {
    var activityId = _a.activityId;
    var commentStore = store_1.useStore().commentStore;
    react_1.useEffect(function () {
        if (activityId) {
            commentStore.createHubConnection(activityId);
        }
        return function () {
            commentStore.clearComments();
        };
    }, [commentStore, activityId]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(semantic_ui_react_1.Segment, { textAlign: "center", attached: "top", inverted: true, color: "teal", style: { border: "none" } },
            react_1["default"].createElement(semantic_ui_react_1.Header, null, "Chat about this event")),
        react_1["default"].createElement(semantic_ui_react_1.Segment, { attached: true, clearing: true },
            react_1["default"].createElement(formik_1.Formik, { onSubmit: function (values, _a) {
                    var resetForm = _a.resetForm;
                    return commentStore.addComment(values).then(function () { return resetForm(); });
                }, initialValues: { body: "" }, validationSchema: Yup.object({
                    body: Yup.string().required()
                }) }, function (_a) {
                var isSubmitting = _a.isSubmitting, isValid = _a.isValid, handleSubmit = _a.handleSubmit;
                react_1["default"].createElement(formik_1.Form, { className: "ui form" },
                    react_1["default"].createElement(formik_1.Field, { name: "body" }, function (props) { return (react_1["default"].createElement("div", { style: { position: 'relative' } },
                        react_1["default"].createElement(semantic_ui_react_1.Loader, { active: isSubmitting }),
                        react_1["default"].createElement("textarea", __assign({ placeholder: "Enter your comment (Enter to submit, SHIFT + enter for new line)", rows: 2 }, props.field, { onKeyPress: function (e) {
                                if (e.key === 'Enter' && e.shiftKey) {
                                    return;
                                }
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    isValid && handleSubmit();
                                }
                            } })))); }));
            }),
            react_1["default"].createElement(semantic_ui_react_1.Comment.Group, null, commentStore.comments.map(function (comment) {
                return react_1["default"].createElement(semantic_ui_react_1.Comment, { key: comment.id },
                    react_1["default"].createElement(semantic_ui_react_1.Comment.Avatar, { src: comment.image || "/assets/user.png" }),
                    react_1["default"].createElement(semantic_ui_react_1.Comment.Content, null,
                        react_1["default"].createElement(semantic_ui_react_1.Comment.Author, { as: react_router_dom_1.Link, to: "/profiles/" + comment.username }, comment.displayName),
                        react_1["default"].createElement(semantic_ui_react_1.Comment.Metadata, null,
                            react_1["default"].createElement("div", null,
                                esm_1.formatDistanceToNow(comment.createdAt),
                                " ago")),
                        react_1["default"].createElement(semantic_ui_react_1.Comment.Text, { style: { whiteSpace: 'pre-wrap' } }, comment.body)));
            })))));
});
