"use strict";
exports.__esModule = true;
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var react_router_1 = require("react-router");
var semantic_ui_react_1 = require("semantic-ui-react");
var LoadingComponent_1 = require("../../../app/layout/LoadingComponent");
var store_1 = require("../../../app/stores/store");
var ActivityDetailedChat_1 = require("./ActivityDetailedChat");
var ActivityDetailedHeader_1 = require("./ActivityDetailedHeader");
var ActivityDetailedInfo_1 = require("./ActivityDetailedInfo");
var ActivityDetailedSideBar_1 = require("./ActivityDetailedSideBar");
exports["default"] = mobx_react_lite_1.observer(function ActivityDetails() {
    var activityStore = store_1.useStore().activityStore;
    var activity = activityStore.selectedActivity, loadActivity = activityStore.loadActivity, loadingInitial = activityStore.loadingInitial, clearSelectedActivity = activityStore.clearSelectedActivity;
    var id = react_router_1.useParams().id;
    react_1.useEffect(function () {
        if (id)
            loadActivity(id);
        return function () {
            clearSelectedActivity();
        };
    }, [id, loadActivity, clearSelectedActivity]);
    if (loadingInitial || !activity)
        return React.createElement(LoadingComponent_1["default"], null);
    return (React.createElement(semantic_ui_react_1.Grid, null,
        React.createElement(semantic_ui_react_1.Grid.Column, { width: 10 },
            React.createElement(ActivityDetailedHeader_1["default"], { activity: activity }),
            React.createElement(ActivityDetailedInfo_1["default"], { activity: activity }),
            React.createElement(ActivityDetailedChat_1["default"], { activityId: activity.id })),
        React.createElement(semantic_ui_react_1.Grid.Column, { width: 6 },
            React.createElement(ActivityDetailedSideBar_1["default"], { activity: activity }))));
});
