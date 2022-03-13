"use strict";
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
exports.__esModule = true;
var mobx_1 = require("mobx");
var agent_1 = require("../api/agent");
var store_1 = require("./store");
var ProfileStore = /** @class */ (function () {
    function ProfileStore() {
        var _this = this;
        this.profile = null;
        this.loadingProfile = false;
        this.uploadingPhoto = false;
        this.loading = false;
        this.loadProfile = function (username) { return __awaiter(_this, void 0, void 0, function () {
            var profile_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loadingProfile = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Profiles.get(username)];
                    case 2:
                        profile_1 = _a.sent();
                        mobx_1.runInAction(function () {
                            _this.profile = profile_1;
                            _this.loadingProfile = false;
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error(err_1);
                        mobx_1.runInAction(function () { return _this.loadingProfile = false; });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.uploadPhoto = function (file) { return __awaiter(_this, void 0, void 0, function () {
            var response, photo_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.uploadingPhoto = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Profiles.uploadPhoto(file)];
                    case 2:
                        response = _a.sent();
                        photo_1 = response.data;
                        mobx_1.runInAction(function () {
                            var _a;
                            if (_this.profile) {
                                (_a = _this.profile.photos) === null || _a === void 0 ? void 0 : _a.push(photo_1);
                                if (photo_1.isMain && store_1.store.userStore.user) {
                                    store_1.store.userStore.setImage(photo_1.url);
                                    _this.profile.image = photo_1.url;
                                }
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        mobx_1.runInAction(function () { return _this.uploadingPhoto = false; });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.setMainPhoto = function (photo) { return __awaiter(_this, void 0, void 0, function () {
            var error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Profiles.setMainPhoto(photo.id)];
                    case 2:
                        _a.sent();
                        store_1.store.userStore.setImage(photo.url);
                        mobx_1.runInAction(function () {
                            if (_this.profile && _this.profile.photos) {
                                _this.profile.photos.find(function (p) { return p.isMain; }).isMain = false;
                                _this.profile.photos.find(function (p) { return p.id === photo.id; }).isMain = true;
                                _this.profile.image = photo.url;
                                _this.loading = false;
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        mobx_1.runInAction(function () { return _this.loading = false; });
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deletePhoto = function (photo) { return __awaiter(_this, void 0, void 0, function () {
            var error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Profiles.deletePhoto(photo.id)];
                    case 2:
                        _a.sent();
                        mobx_1.runInAction(function () {
                            if (_this.profile && _this.profile.photos) {
                                _this.profile.photos = _this.profile.photos.filter(function (p) { return p.id !== photo.id; });
                                var firstPhoto = _this.profile.photos[0];
                                if (firstPhoto) {
                                    store_1.store.userStore.setImage(firstPhoto.url);
                                    _this.profile.image = firstPhoto.url;
                                    _this.loading = false;
                                }
                            }
                            else {
                                store_1.store.userStore.setImage('');
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        mobx_1.runInAction(function () { return _this.loading = false; });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateProfile = function (name, bio) { return __awaiter(_this, void 0, void 0, function () {
            var error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Account.updateAccount(name, bio)];
                    case 2:
                        _a.sent();
                        mobx_1.runInAction(function () {
                            _this.profile.displayName = name;
                            store_1.store.userStore.user.displayName = name;
                            _this.loading = false;
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        mobx_1.runInAction(function () { return _this.loading = false; });
                        console.log(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        mobx_1.makeAutoObservable(this);
    }
    Object.defineProperty(ProfileStore.prototype, "isCurrentUser", {
        get: function () {
            if (store_1.store.userStore.user && this.profile) {
                return store_1.store.userStore.user.username === this.profile.username;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    return ProfileStore;
}());
exports["default"] = ProfileStore;
