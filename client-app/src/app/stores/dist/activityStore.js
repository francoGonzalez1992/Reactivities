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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var date_fns_1 = require("date-fns");
var mobx_1 = require("mobx");
var agent_1 = require("../api/agent");
var activity_1 = require("../models/activity");
var profile_1 = require("../models/profile");
var store_1 = require("./store");
var ActivityStore = /** @class */ (function () {
    function ActivityStore() {
        var _this = this;
        this.activityRegistry = new Map();
        this.selectedActivity = undefined;
        this.editMode = false;
        this.loading = false;
        this.loadingInitial = false;
        this.loadActivities = function () { return __awaiter(_this, void 0, void 0, function () {
            var activities, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loadingInitial = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Activities.list()];
                    case 2:
                        activities = _a.sent();
                        activities.forEach(function (activity) {
                            _this.setActivity(activity);
                        });
                        this.setLoadingInitial(false);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        this.setLoadingInitial(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.loadActivity = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var activity, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        activity = this.getActivity(id);
                        if (!activity) return [3 /*break*/, 1];
                        this.selectedActivity = activity;
                        return [2 /*return*/, activity];
                    case 1:
                        this.setLoadingInitial(true);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, agent_1["default"].Activities.details(id)];
                    case 3:
                        activity = _a.sent();
                        this.setActivity(activity);
                        mobx_1.runInAction(function () { _this.selectedActivity = activity; });
                        this.setLoadingInitial(false);
                        return [2 /*return*/, activity];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        this.setLoadingInitial(false);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getActivity = function (id) {
            return _this.activityRegistry.get(id);
        };
        this.setLoadingInitial = function (state) {
            _this.loadingInitial = state;
        };
        this.createActivity = function (activity) { return __awaiter(_this, void 0, void 0, function () {
            var user, attendee, newActivity_1, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = store_1.store.userStore.user;
                        attendee = new profile_1.Profile(user);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Activities.create(activity)];
                    case 2:
                        _a.sent();
                        newActivity_1 = new activity_1.Activity(activity);
                        newActivity_1.hostUsername = user.username;
                        newActivity_1.attendees = [attendee];
                        this.setActivity(newActivity_1);
                        mobx_1.runInAction(function () {
                            _this.selectedActivity = newActivity_1;
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateActivity = function (activity) { return __awaiter(_this, void 0, void 0, function () {
            var error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Activities.update(activity)];
                    case 2:
                        _a.sent();
                        mobx_1.runInAction(function () {
                            if (activity.id) {
                                var updatedActivity = __assign(__assign({}, _this.getActivity(activity.id)), activity);
                                _this.activityRegistry.set(activity.id, updatedActivity);
                                _this.selectedActivity = updatedActivity;
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deleteActivity = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var error_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Activities["delete"](id)];
                    case 2:
                        _a.sent();
                        mobx_1.runInAction(function () {
                            _this.activityRegistry["delete"](id);
                            _this.loading = false;
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        mobx_1.runInAction(function () {
                            _this.loading = false;
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateAttendance = function () { return __awaiter(_this, void 0, void 0, function () {
            var user, error_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = store_1.store.userStore.user;
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, agent_1["default"].Activities.attend(this.selectedActivity.id)];
                    case 2:
                        _a.sent();
                        mobx_1.runInAction(function () {
                            var _a, _b, _c, _d;
                            if ((_a = _this.selectedActivity) === null || _a === void 0 ? void 0 : _a.isGoing) {
                                _this.selectedActivity.attendees = (_b = _this.selectedActivity.attendees) === null || _b === void 0 ? void 0 : _b.filter(function (a) { return a.username !== (user === null || user === void 0 ? void 0 : user.username); });
                                _this.selectedActivity.isGoing = false;
                            }
                            else {
                                var attendee = new profile_1.Profile(user);
                                (_d = (_c = _this.selectedActivity) === null || _c === void 0 ? void 0 : _c.attendees) === null || _d === void 0 ? void 0 : _d.push(attendee);
                                _this.selectedActivity.isGoing = true;
                            }
                            _this.activityRegistry.set(_this.selectedActivity.id, _this.selectedActivity);
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [3 /*break*/, 5];
                    case 4:
                        mobx_1.runInAction(function () {
                            _this.loading = false;
                        });
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.cancelActivityToggle = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_7;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, agent_1["default"].Activities.attend(this.selectedActivity.id)];
                    case 2:
                        _a.sent();
                        mobx_1.runInAction(function () {
                            var _a;
                            _this.selectedActivity.isCancelled = !((_a = _this.selectedActivity) === null || _a === void 0 ? void 0 : _a.isCancelled);
                            _this.activityRegistry.set(_this.selectedActivity.id, _this.selectedActivity);
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        error_7 = _a.sent();
                        console.log(error_7);
                        return [3 /*break*/, 5];
                    case 4:
                        mobx_1.runInAction(function () {
                            _this.loading = false;
                        });
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.clearSelectedActivity = function () {
            _this.selectedActivity = undefined;
        };
        mobx_1.makeAutoObservable(this);
    }
    Object.defineProperty(ActivityStore.prototype, "groupedActivities", {
        get: function () {
            return Object.entries(this.activitiesByDate.reduce(function (activities, activity) {
                var date = date_fns_1.format(activity.date, 'dd MMM yyyy');
                activities[date] = activities[date] ? __spreadArrays(activities[date], [activity]) : [activity];
                return activities;
            }, {}));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActivityStore.prototype, "activitiesByDate", {
        get: function () {
            return Array.from(this.activityRegistry.values()).sort(function (a, b) {
                return a.date.getTime() - b.date.getTime();
            });
        },
        enumerable: false,
        configurable: true
    });
    ActivityStore.prototype.setActivity = function (activity) {
        var _a;
        var user = store_1.store.userStore.user;
        if (user) {
            activity.isGoing = activity.attendees.some(function (a) { return a.username === user.username; });
            activity.isHost = activity.hostUsername === user.username;
            activity.host = (_a = activity.attendees) === null || _a === void 0 ? void 0 : _a.find(function (x) { return x.username === activity.hostUsername; });
        }
        activity.date = new Date(activity.date);
        this.activityRegistry.set(activity.id, activity);
    };
    return ActivityStore;
}());
exports["default"] = ActivityStore;
