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
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
var __1 = require("../..");
var store_1 = require("../stores/store");
var sleep = function (delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
};
axios_1["default"].defaults.baseURL = "http://localhost:5000/api";
axios_1["default"].interceptors.request.use(function (config) {
    var token = store_1.store.commonStore.token;
    if (token)
        config.headers.Authorization = "Bearer " + token;
    return config;
});
axios_1["default"].interceptors.response.use(function (response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sleep(1000)];
            case 1:
                _a.sent();
                return [2 /*return*/, response];
        }
    });
}); }, function (error) {
    var _a = error.response, data = _a.data, status = _a.status, config = _a.config;
    switch (status) {
        case 400:
            if (typeof data === "string") {
                react_toastify_1.toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                __1.history.push('/not-found');
            }
            if (data.errors) {
                var modalStateErrors = [];
                for (var key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            react_toastify_1.toast.error("unauthorized");
            break;
        case 404:
            __1.history.push("/not-found");
            break;
        case 500:
            store_1.store.commonStore.setServerError(data);
            __1.history.push("/server-error");
            break;
    }
    return Promise.reject(error);
});
var responseBody = function (response) { return response.data; };
var request = {
    get: function (url) { return axios_1["default"].get(url).then(responseBody); },
    post: function (url, body) { return axios_1["default"].post(url, body).then(responseBody); },
    put: function (url, body) { return axios_1["default"].put(url, body).then(responseBody); },
    "delete": function (url) { return axios_1["default"]["delete"](url).then(responseBody); }
};
var Activities = {
    list: function () { return request.get('/activities'); },
    details: function (id) { return request.get("/activities/" + id); },
    create: function (activity) { return request.post('/activities', activity); },
    update: function (activity) { return request.put("/activities/" + activity.id, activity); },
    "delete": function (id) { return request["delete"]("/activities/" + id); },
    attend: function (id) { return request.post("/activities/" + id + "/attend", {}); }
};
var Account = {
    current: function () { return request.get('/account'); },
    login: function (user) { return request.post('/account/login', user); },
    register: function (user) { return request.post('/account/register', user); },
    updateAccount: function (displayName, bio) { return request.put("/account", { displayName: displayName, bio: bio }); }
};
var Profiles = {
    get: function (username) { return request.get("/profiles/" + username); },
    uploadPhoto: function (file) {
        var formData = new FormData();
        formData.append('File', file);
        return axios_1["default"].post('photos', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    setMainPhoto: function (id) { return request.post("/photos/" + id + "/setMain", {}); },
    deletePhoto: function (id) { return request["delete"]("/photos/" + id); }
};
var agent = {
    Activities: Activities,
    Account: Account,
    Profiles: Profiles
};
exports["default"] = agent;
