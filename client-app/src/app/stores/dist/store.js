"use strict";
exports.__esModule = true;
exports.useStore = exports.StoreContext = exports.store = void 0;
var react_1 = require("react");
var activityStore_1 = require("./activityStore");
var commentStore_1 = require("./commentStore");
var commonStore_1 = require("./commonStore");
var modalStore_1 = require("./modalStore");
var profileStore_1 = require("./profileStore");
var userStore_1 = require("./userStore");
exports.store = {
    activityStore: new activityStore_1["default"](),
    commonStore: new commonStore_1["default"](),
    userStore: new userStore_1["default"](),
    modalStore: new modalStore_1["default"](),
    profileStore: new profileStore_1["default"](),
    commentStore: new commentStore_1["default"]()
};
exports.StoreContext = react_1.createContext(exports.store);
function useStore() {
    return react_1.useContext(exports.StoreContext);
}
exports.useStore = useStore;
