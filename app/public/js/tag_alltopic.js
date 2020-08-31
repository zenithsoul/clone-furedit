webpackJsonp([0],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],[\"babel-preset-env\"],[\"stage-2\"]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/content/Fromsubreply.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

var _axios = __webpack_require__("./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    props: ['replyid'],
    data: function data() {
        return {
            statusSubReply: 0,
            csreply: "",
            submitCheck: 1
        };
    },

    computed: _extends({}, (0, _vuex.mapGetters)({ GETTER_IS_LOGIN: 'session/GET_SESSION' }), (0, _vuex.mapGetters)({ GETTER_BASE_URL: 'config/GET_BASE_URL' })),
    methods: _extends({}, (0, _vuex.mapActions)({ CALL_ERROR_INIT: 'session/SET_ERROR_INIT' }), {
        newsubreply: function newsubreply() {
            var _this = this;

            this.submitCheck = 0;
            _axios2.default.post(this.GETTER_BASE_URL + '/newsubreply', { reply_id: this.replyid, csreply: this.csreply }).then(function (res) {
                if (res.data.status == 1) {
                    //console.log(res.data)
                    window.location.reload();
                } else {
                    _this.CALL_ERROR_INIT(res.data.error);
                }
            }).catch(function (err) {});

            /*
            axios.post(this.GETTER_BASE_URL + '/newsubreply',
            { reply_id : e.target.reply_id._value , reply_idtest : e.target.reply_idtest._value } )
                .then(res => 
                {
                    
                    
                    if(res.data.status == 1)
                    {
                        console.log(res.data)
                    }
                    else
                    {
                        this.CALL_ERROR_INIT(res.data.error);
                    }
                    
                })
                .catch(err => {
                  });
            */
        }
    }),
    created: function created() {}
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],[\"babel-preset-env\"],[\"stage-2\"]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/content/Onlineuser.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//


exports.default = {
    props: ['rootcontentid'],
    data: function data() {
        return {
            isConnected: false,
            onlineuser: 0,
            timeruser: ''
        };
    },

    methods: {
        loaduserall: function loaduserall() {
            this.$socket.emit('setuserroom', 'topic-' + this.rootcontentid);
        }
    },
    created: function created() {
        console.log(this.$socket);
        this.$socket.emit('subscribe', 'topic-' + this.rootcontentid);
        this.loaduserall();
        this.timeruser = setInterval(this.loaduserall, 1000);
    },
    sockets: {
        connect: function connect() {},
        reconnect: function reconnect() {},
        disconnect: function disconnect() {},
        getuserroom: function getuserroom(val) {
            this.onlineuser = val;
        }
    },
    beforeDestroy: function beforeDestroy() {
        clearInterval(this.timeruser);
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],[\"babel-preset-env\"],[\"stage-2\"]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/content/Topic.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

var _axios = __webpack_require__("./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            datatopics: null,
            loading: 1
        };
    },

    computed: _extends({}, (0, _vuex.mapGetters)({ GETTER_IS_LOGIN: 'session/GET_SESSION' }), (0, _vuex.mapGetters)({ GETTER_BASE_URL: 'config/GET_BASE_URL' })),
    methods: {},
    created: function created() {
        var _this = this;

        this.loading = 1;
        _axios2.default.get(this.GETTER_BASE_URL + '/alltopic').then(function (res) {
            _this.datatopics = res.data;
            _this.loading = 0;
        }).catch(function (err) {
            console.log("Cannot Get Data");
        });
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],[\"babel-preset-env\"],[\"stage-2\"]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/content/Topicdetail.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

var _axios = __webpack_require__("./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

var _Fromsubreply = __webpack_require__("./resources/js/components/content/Fromsubreply.vue");

var _Fromsubreply2 = _interopRequireDefault(_Fromsubreply);

var _Voteupdown = __webpack_require__("./resources/js/components/content/Voteupdown.vue");

var _Voteupdown2 = _interopRequireDefault(_Voteupdown);

var _Voteendorsement = __webpack_require__("./resources/js/components/content/Voteendorsement.vue");

var _Voteendorsement2 = _interopRequireDefault(_Voteendorsement);

var _Onlineuser = __webpack_require__("./resources/js/components/content/Onlineuser.vue");

var _Onlineuser2 = _interopRequireDefault(_Onlineuser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: ['topicid'],
    data: function data() {
        return {
            loading: 1,
            dataTopic: "",
            creply: "",
            submitCheck: 1
        };
    },

    computed: _extends({}, (0, _vuex.mapGetters)({ GETTER_IS_LOGIN: 'session/GET_SESSION' }), (0, _vuex.mapGetters)({ GETTER_BASE_URL: 'config/GET_BASE_URL' })),
    methods: _extends({}, (0, _vuex.mapActions)({ CALL_ERROR_INIT: 'session/SET_ERROR_INIT' }), {
        newreply: function newreply() {
            var _this = this;

            this.submitCheck = 0;
            _axios2.default.post(this.GETTER_BASE_URL + '/newreply', { creply: this.creply, cid: this.topicid }).then(function (res) {
                if (res.data.status == 1) {
                    console.log(res.data);
                    window.location.reload();
                } else {
                    _this.CALL_ERROR_INIT(res.data.error);
                }
            }).catch(function (err) {});
        }
    }),
    created: function created() {
        var _this2 = this;

        this.loading = 1;
        _axios2.default.post(this.GETTER_BASE_URL + '/gettopic', { topicid: this.topicid }).then(function (res) {
            _this2.loading = 0;
            _this2.dataTopic = res.data[0];
        }).catch(function (err) {
            console.log("Cannot Get Data");
        });
    },
    components: {
        'fromsubreply': _Fromsubreply2.default,
        'voteupdown': _Voteupdown2.default,
        'votees': _Voteendorsement2.default,
        'onlineuser': _Onlineuser2.default
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],[\"babel-preset-env\"],[\"stage-2\"]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/content/Voteendorsement.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

var _axios = __webpack_require__("./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: ['endorsement', 'endorsement_total', 'contentid', 'userid', 'useresvote'],
    data: function data() {
        return {
            setupdata: 1,
            es_total: 0,
            set_useresvote: "",
            get_useresvote: "",
            status_es: ""
        };
    },

    computed: _extends({}, (0, _vuex.mapGetters)({ GETTER_IS_LOGIN: 'session/GET_SESSION' }), (0, _vuex.mapGetters)({ GETTER_BASE_URL: 'config/GET_BASE_URL' }), (0, _vuex.mapGetters)({ GETTER_USER_ID: 'user/GET_USER_ID' })),
    methods: _extends({}, (0, _vuex.mapActions)({ CALL_ERROR_INIT: 'session/SET_ERROR_INIT' }), {
        set_es_content: function set_es_content(value) {
            var _this = this;

            if (this.GETTER_IS_LOGIN != 0) {
                if (confirm('Are you sure ?')) {

                    this.setupdata = 0;
                    _axios2.default.post(this.GETTER_BASE_URL + '/setendorsement', { contentid: this.contentid, setes: value }).then(function (res) {
                        if (res.data.status == 1) {
                            _this.reload_es();
                        } else if (res.data.status == 2) {} else {
                            _this.CALL_ERROR_INIT(res.data.error);
                        }
                    }).catch(function (err) {});
                    this.setupdata = 1;
                }
            } else {
                this.CALL_ERROR_INIT(1);
            }
        },
        reload_es: function reload_es() {
            var _this2 = this;

            _axios2.default.post(this.GETTER_BASE_URL + '/getendorsement', { contentid: this.contentid }).then(function (res) {
                if (res.data.status == 1) {
                    _this2.set_useresvote = res.data.useresvote;
                    _this2.valueofes(res.data.useresvote);
                    _this2.es_total = res.data.es_total;
                } else if (res.data.status == 0) {} else {
                    _this2.CALL_ERROR_INIT(res.data.error);
                }
            }).catch(function (err) {});
        },
        valueofes: function valueofes(value) {
            if (value == "es_happy") this.status_es = "<span style=\"color:#964000;font-weight:bold;\">You are Endorsement [ HAPPY , FUNNY ]</span>";else if (value == "es_helpful") this.status_es = "<span style=\"color:#3E424B;font-weight:bold;\">You are Endorsement [ HEAPFUL , USEFUL ]</span>";else if (value == "es_positive") this.status_es = "<span style=\"color:#0b6623;font-weight:bold;\">You are Endorsement [ POSITIVE , POWER ]</span>";else if (value == "es_truth") this.status_es = "<span style=\"color:#4682b4;font-weight:bold;\">You are Endorsement [ TRUTH , FACT ]</span>";else this.status_es = "";
        }
    }),
    created: function created() {
        this.set_useresvote = this.useresvote;
        this.valueofes(this.useresvote);
        this.es_total = this.endorsement_total;
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],[\"babel-preset-env\"],[\"stage-2\"]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/content/Voteupdown.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__("./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

var _axios = __webpack_require__("./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    props: {
        voteup: Object,
        votedown: Object,
        contentid: String,
        voteuptotal: Number,
        votedowntotal: Number,
        chkuser: String
    },
    data: function data() {
        return {
            get_voteup: this.voteup,
            get_votedown: this.votedown,
            get_voteuptotal: this.voteuptotal,
            get_votedowntotal: this.votedowntotal,
            get_total: this.voteuptotal - this.votedowntotal,
            setupdata: 1,
            get_youvote: "",
            get_chkuser: ""

        };
    },

    computed: _extends({}, (0, _vuex.mapGetters)({ GETTER_IS_LOGIN: 'session/GET_SESSION' }), (0, _vuex.mapGetters)({ GETTER_BASE_URL: 'config/GET_BASE_URL' })),
    methods: _extends({}, (0, _vuex.mapActions)({ CALL_ERROR_INIT: 'session/SET_ERROR_INIT' }), {

        setvotecontent: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(value) {
                var _this = this;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:

                                this.setupdata = 0;

                                if (!(this.GETTER_IS_LOGIN == true)) {
                                    _context.next = 6;
                                    break;
                                }

                                _context.next = 4;
                                return _axios2.default.post(this.GETTER_BASE_URL + '/setvote', { contentid: this.contentid, setvote: value }).then(function (res) {
                                    if (res.data.status == 1) {
                                        _this.get_voteup = res.data.voteup;
                                        _this.get_votedown = res.data.votedown;
                                        _this.get_voteuptotal = res.data.voteuptotal;
                                        _this.get_votedowntotal = res.data.votedowntotal;
                                        _this.get_total = _this.get_voteuptotal - _this.get_votedowntotal;
                                        _this.get_chkuser = res.data.voteuserkey;

                                        _this.get_youvote = _this.votecontent(res.data.voteuserkey);
                                    } else if (res.data.status == 2) {
                                        console.log('not update');
                                    } else {
                                        _this.CALL_ERROR_INIT(res.data.error);
                                    }
                                }).catch(function (err) {});

                            case 4:
                                _context.next = 7;
                                break;

                            case 6:
                                this.CALL_ERROR_INIT(1);

                            case 7:
                                this.setupdata = 1;

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function setvotecontent(_x) {
                return _ref.apply(this, arguments);
            }

            return setvotecontent;
        }(),
        votecontent: function votecontent(value) {
            if (value == "up_like") return "You <LIKE> this.";else if (value == "up_love") return "You <LOVE> this.";else if (value == "up_good") return "You <GOOD> this.";else if (value == "up_lol") return "You <LOL> this.";else if (value == "down_dislike") return "You <DISLIKE> this.";else if (value == "down_hate") return "You <HATE> this.";else if (value == "down_bad") return "You <BAD> this.";else if (value == "down_sad") return "You <SAD> this.";else return "";
        }
    }),
    created: function created() {
        this.get_youvote = this.votecontent(this.chkuser);
        this.get_chkuser = this.chkuser;
    }
};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-41b798b0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Voteupdown.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.setred[data-v-41b798b0]\r\n{\r\n    color: red;\r\n    font-weight: bold;\n}\n.setgreen[data-v-41b798b0]\r\n{\r\n    color: green;\r\n    font-weight: bold;\n}\n.setblue[data-v-41b798b0]\r\n{\r\n    color: blue;\r\n    font-weight: bold;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-42590f3e\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Topic.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d8b7fd6\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Fromsubreply.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54fbfae2\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Topicdetail.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.boxtopic[data-v-54fbfae2]\r\n{\r\n    border: 1px solid black;\r\n    padding: 10px;\n}\n.boxtopic-reply[data-v-54fbfae2]\r\n{\r\n    border: 1px solid rgb(107, 107, 107);\r\n    padding: 10px;\r\n    margin-bottom: 10px;\n}\n.boxtopic-reply[data-v-54fbfae2]:last-child\r\n{\r\n    margin-bottom: 0px;\n}\n.boxtopic-subreply[data-v-54fbfae2]\r\n{\r\n    border: 1px solid rgb(189, 189, 189);\r\n    padding: 10px;\r\n    margin-bottom: 10px;\n}\n.boxtopic-subreply[data-v-54fbfae2]:last-child\r\n{\r\n    margin-bottom: 0px;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-67b1779f\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Onlineuser.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d81c445a\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Voteendorsement.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.setorg[data-v-d81c445a]\r\n{\r\n    color: orange;\r\n    font-weight: bold;\n}\n.setblack[data-v-d81c445a]\r\n{\r\n    color: black;\r\n    font-weight: bold;\n}\n.sethelpful[data-v-d81c445a]\r\n{\r\n    color: #3E424B;font-weight: bold;\n}\n.sethappy[data-v-d81c445a]\r\n{\r\n    color: #964000;font-weight: bold;\n}\n.settrust[data-v-d81c445a]\r\n{\r\n    color: #4682b4;font-weight: bold;\n}\n.setposi[data-v-d81c445a]\r\n{\r\n    color : #0b6623;font-weight: bold;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/vue-loader/lib/component-normalizer.js":
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-41b798b0\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/content/Voteupdown.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm._v("\n    VOTE TOTAL = " + _vm._s(_vm.get_total) + " || "),
    _c("span", { staticClass: "setblue" }, [
      _vm._v(_vm._s(_vm.get_youvote) + " ")
    ]),
    _vm._v(" ||\n    "),
    _vm.get_total > 0
      ? _c("span", { staticClass: "setgreen" }, [_vm._v("UP")])
      : _vm.get_total == 0
        ? _c("span")
        : _c("span", { staticClass: "setred" }, [_vm._v("DOWN")]),
    _vm._v(" "),
    _c("br"),
    _vm._v("------------------------------------------"),
    _c("br"),
    _vm._v(" ( " + _vm._s(_vm.get_voteuptotal) + " )\n    "),
    _c(
      "button",
      {
        attrs: {
          type: "button",
          disabled: _vm.setupdata == 0 || _vm.get_chkuser == "up_like"
        },
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.setvotecontent("up_like")
          }
        }
      },
      [_vm._v(" Like [" + _vm._s(_vm.get_voteup.up_like) + "] ")]
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        attrs: {
          type: "button",
          disabled: _vm.setupdata == 0 || _vm.get_chkuser == "up_love"
        },
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.setvotecontent("up_love")
          }
        }
      },
      [_vm._v(" Love [" + _vm._s(_vm.get_voteup.up_love) + "]  ")]
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        attrs: {
          type: "button",
          disabled: _vm.setupdata == 0 || _vm.get_chkuser == "up_good"
        },
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.setvotecontent("up_good")
          }
        }
      },
      [_vm._v(" Good [" + _vm._s(_vm.get_voteup.up_good) + "] ")]
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        attrs: {
          type: "button",
          disabled: _vm.setupdata == 0 || _vm.get_chkuser == "up_lol"
        },
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.setvotecontent("up_lol")
          }
        }
      },
      [_vm._v(" Lol [" + _vm._s(_vm.get_voteup.up_lol) + "]  ")]
    ),
    _vm._v(" "),
    _c("br"),
    _vm._v(" ( " + _vm._s(_vm.get_votedowntotal) + " )\n    "),
    _c(
      "button",
      {
        attrs: {
          type: "button",
          disabled: _vm.setupdata == 0 || _vm.get_chkuser == "down_dislike"
        },
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.setvotecontent("down_dislike")
          }
        }
      },
      [_vm._v(" Dislike [" + _vm._s(_vm.get_votedown.down_dislike) + "]  ")]
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        attrs: {
          type: "button",
          disabled: _vm.setupdata == 0 || _vm.get_chkuser == "down_hate"
        },
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.setvotecontent("down_hate")
          }
        }
      },
      [_vm._v(" Hate [" + _vm._s(_vm.get_votedown.down_hate) + "] ")]
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        attrs: {
          type: "button",
          disabled: _vm.setupdata == 0 || _vm.get_chkuser == "down_bad"
        },
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.setvotecontent("down_bad")
          }
        }
      },
      [_vm._v(" Bad [" + _vm._s(_vm.get_votedown.down_bad) + "]")]
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        attrs: {
          type: "button",
          disabled: _vm.setupdata == 0 || _vm.get_chkuser == "down_sad"
        },
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.setvotecontent("down_sad")
          }
        }
      },
      [_vm._v(" Sad [" + _vm._s(_vm.get_votedown.down_sad) + "]")]
    ),
    _vm._v(" "),
    _c("br"),
    _vm._v("------------------------------------------"),
    _c("br")
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-41b798b0", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-42590f3e\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/content/Topic.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.loading == 1
      ? _c("div", [_vm._v(" \n        Loading ..... \n    ")])
      : _c(
          "div",
          _vm._l(_vm.datatopics, function(datatopic) {
            return _c("div", { key: datatopic.c_key }, [
              _c("hr"),
              _vm._v(" "),
              _c("a", { attrs: { href: "/topic/" + datatopic.c_key } }, [
                _vm._v(" " + _vm._s(datatopic.c_topicname) + " ")
              ])
            ])
          })
        )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-42590f3e", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4d8b7fd6\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/content/Fromsubreply.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "form",
    {
      attrs: { method: "post" },
      on: {
        submit: function($event) {
          $event.preventDefault()
          return _vm.newsubreply($event)
        }
      }
    },
    [
      _c("h4", { staticClass: "title is-4" }, [_vm._v("SUB RE-REPLY")]),
      _vm._v(" "),
      _c("textarea", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.csreply,
            expression: "csreply"
          }
        ],
        staticStyle: { width: "500px", height: "100px" },
        attrs: {
          disabled: _vm.GETTER_IS_LOGIN == 0 || _vm.submitCheck == 0,
          cols: "30",
          rows: "10"
        },
        domProps: { value: _vm.csreply },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.csreply = $event.target.value
          }
        }
      }),
      _c("br"),
      _vm._v(" "),
      _c(
        "button",
        {
          attrs: {
            type: "submit",
            disabled: _vm.GETTER_IS_LOGIN == 0 || _vm.submitCheck == 0
          }
        },
        [_vm._v("SUBMIT SUB-REPLY")]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4d8b7fd6", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-54fbfae2\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/content/Topicdetail.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.loading == 1
    ? _c("div", [_vm._v("\n    Loading " + _vm._s(_vm.topicid) + "\n")])
    : _c(
        "div",
        [
          _c(
            "h1",
            { staticClass: "title" },
            [
              _vm._v(_vm._s(_vm.dataTopic.topic_name) + " || "),
              _c("onlineuser", {
                attrs: { rootcontentid: _vm.dataTopic.topic_id }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "boxtopic" },
            [
              _c("p", [_vm._v(_vm._s(_vm.dataTopic.topic_article))]),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("votees", {
                attrs: {
                  endorsement: _vm.dataTopic.topic_endorsement,
                  endorsement_total: _vm.dataTopic.topic_endorsement_total,
                  contentid: _vm.dataTopic.topic_id,
                  userid: _vm.dataTopic.topic_by_userid,
                  useresvote: _vm.dataTopic.topic_es_userkey
                }
              }),
              _vm._v(" "),
              _c("voteupdown", {
                attrs: {
                  voteuptotal: _vm.dataTopic.topic_vote_up_total,
                  voteup: _vm.dataTopic.topic_vote_up,
                  votedowntotal: _vm.dataTopic.topic_vote_down_total,
                  votedown: _vm.dataTopic.topic_vote_down,
                  contentid: _vm.dataTopic.topic_id,
                  chkuser: _vm.dataTopic.topic_vote_userkey
                }
              }),
              _vm._v(" "),
              _c("p", [
                _vm._v(
                  "TOPIC = By " + _vm._s(_vm.dataTopic.topic_by_usertitle) + " "
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _vm._l(_vm.dataTopic.reply, function(reply) {
            return _c(
              "div",
              { key: reply.reply_id, staticClass: "boxtopic-reply" },
              [
                _c("p", [_vm._v(" " + _vm._s(reply.reply_article) + " ")]),
                _vm._v(" "),
                _c("br"),
                _vm._v(" "),
                _c("votees", {
                  attrs: {
                    endorsement: reply.reply_endorsement,
                    endorsement_total: reply.reply_endorsement_total,
                    contentid: reply.reply_id,
                    userid: reply.reply_by_userid,
                    useresvote: reply.reply_es_userkey
                  }
                }),
                _vm._v(" "),
                _c("voteupdown", {
                  attrs: {
                    voteuptotal: reply.reply_vote_up_total,
                    voteup: reply.reply_vote_up,
                    votedowntotal: reply.reply_vote_down_total,
                    votedown: reply.reply_vote_down,
                    contentid: reply.reply_id,
                    chkuser: reply.reply_vote_userkey
                  }
                }),
                _vm._v(" "),
                _c("p", [
                  _vm._v("REPLY = By " + _vm._s(reply.reply_by_usertitle) + " ")
                ]),
                _vm._v(" "),
                _c("hr"),
                _vm._v(" "),
                _vm._l(reply.subreply, function(subreply) {
                  return _c(
                    "div",
                    {
                      key: subreply.subreply_id,
                      staticClass: "boxtopic-subreply"
                    },
                    [
                      _c("p", [
                        _vm._v(" " + _vm._s(subreply.subreply_article) + " ")
                      ]),
                      _vm._v(" "),
                      _c("br"),
                      _vm._v(" "),
                      _c("votees", {
                        attrs: {
                          endorsement: subreply.subreply_endorsement,
                          endorsement_total:
                            subreply.subreply_endorsement_total,
                          contentid: subreply.subreply_id,
                          userid: subreply.subreply_by_userid,
                          useresvote: subreply.subreply_es_userkey
                        }
                      }),
                      _vm._v(" "),
                      _c("voteupdown", {
                        attrs: {
                          voteuptotal: subreply.subreply_vote_up_total,
                          voteup: subreply.subreply_vote_up,
                          votedowntotal: subreply.subreply_vote_down_total,
                          votedown: subreply.subreply_vote_down,
                          contentid: subreply.subreply_id,
                          chkuser: subreply.subreply_vote_userkey
                        }
                      }),
                      _vm._v(" "),
                      _c("p", [
                        _vm._v(
                          "SUBREPLY = By " +
                            _vm._s(subreply.subreply_by_usertitle) +
                            " "
                        )
                      ])
                    ],
                    1
                  )
                }),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "has-text-centered" },
                  [_c("fromsubreply", { attrs: { replyid: reply.reply_id } })],
                  1
                )
              ],
              2
            )
          }),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", { staticClass: "has-text-centered" }, [
            _c(
              "form",
              {
                attrs: { method: "post" },
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.newreply($event)
                  }
                }
              },
              [
                _c("h4", { staticClass: "title is-4" }, [_vm._v("REPLY")]),
                _vm._v(" "),
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.creply,
                      expression: "creply"
                    }
                  ],
                  staticStyle: { width: "500px", height: "150px" },
                  attrs: {
                    disabled: _vm.GETTER_IS_LOGIN == 0 || _vm.submitCheck == 0,
                    cols: "30",
                    rows: "10"
                  },
                  domProps: { value: _vm.creply },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.creply = $event.target.value
                    }
                  }
                }),
                _c("br"),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    attrs: {
                      type: "submit",
                      disabled: _vm.GETTER_IS_LOGIN == 0 || _vm.submitCheck == 0
                    }
                  },
                  [_vm._v("SUBMIT REPLY")]
                )
              ]
            )
          ])
        ],
        2
      )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-54fbfae2", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-67b1779f\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/content/Onlineuser.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("span", [
    _vm._v("\n    User Online : " + _vm._s(_vm.onlineuser) + "\n")
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-67b1779f", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-d81c445a\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/content/Voteendorsement.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm._v("\n    ========================= "),
    _c("br"),
    _vm._v("\n    Endorsement [ " + _vm._s(_vm.es_total) + " ] "),
    _c("br"),
    _vm._v(" "),
    _vm.set_useresvote != "none"
      ? _c("div", [
          _c("span", { domProps: { innerHTML: _vm._s(_vm.status_es) } })
        ])
      : _vm.GETTER_USER_ID == _vm.userid
        ? _c("div", [
            _c("span", { staticClass: "setblack" }, [
              _vm._v("You can't endorsement your content")
            ])
          ])
        : _c("div", [
            _vm._v("\n        Endorsement \n        "),
            _c(
              "button",
              {
                attrs: {
                  type: "button",
                  disabled: this.GETTER_USER_ID == this.userid
                },
                on: {
                  click: function($event) {
                    _vm.set_es_content("es_helpful")
                  }
                }
              },
              [_vm._v(" Helpful ")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                attrs: {
                  type: "button",
                  disabled: this.GETTER_USER_ID == this.userid
                },
                on: {
                  click: function($event) {
                    _vm.set_es_content("es_truth")
                  }
                }
              },
              [_vm._v(" Truth ")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                attrs: {
                  type: "button",
                  disabled: this.GETTER_USER_ID == this.userid
                },
                on: {
                  click: function($event) {
                    _vm.set_es_content("es_happy")
                  }
                }
              },
              [_vm._v(" Happy  ")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                attrs: {
                  type: "button",
                  disabled: this.GETTER_USER_ID == this.userid
                },
                on: {
                  click: function($event) {
                    _vm.set_es_content("es_positive")
                  }
                }
              },
              [_vm._v(" Positive ")]
            )
          ]),
    _vm._v("\n    \n    ========================= "),
    _c("br")
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d81c445a", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-41b798b0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Voteupdown.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-41b798b0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Voteupdown.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("1ef5b7f6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-41b798b0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Voteupdown.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-41b798b0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Voteupdown.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-42590f3e\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Topic.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-42590f3e\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Topic.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("63a55a60", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-42590f3e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Topic.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-42590f3e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Topic.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d8b7fd6\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Fromsubreply.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d8b7fd6\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Fromsubreply.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("50341821", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d8b7fd6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Fromsubreply.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d8b7fd6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Fromsubreply.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54fbfae2\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Topicdetail.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54fbfae2\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Topicdetail.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("04c4b25b", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54fbfae2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Topicdetail.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54fbfae2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Topicdetail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-67b1779f\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Onlineuser.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-67b1779f\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Onlineuser.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("8e16b230", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-67b1779f\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Onlineuser.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-67b1779f\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Onlineuser.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d81c445a\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Voteendorsement.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d81c445a\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Voteendorsement.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("cf8eb75c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d81c445a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Voteendorsement.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d81c445a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Voteendorsement.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/lib/addStylesClient.js":
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__("./node_modules/vue-style-loader/lib/listToStyles.js")

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "./node_modules/vue-style-loader/lib/listToStyles.js":
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ "./resources/js/components/content/Fromsubreply.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d8b7fd6\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Fromsubreply.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],[\"babel-preset-env\"],[\"stage-2\"]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/content/Fromsubreply.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4d8b7fd6\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/content/Fromsubreply.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4d8b7fd6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/content/Fromsubreply.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d8b7fd6", Component.options)
  } else {
    hotAPI.reload("data-v-4d8b7fd6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/js/components/content/Onlineuser.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-67b1779f\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Onlineuser.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],[\"babel-preset-env\"],[\"stage-2\"]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/content/Onlineuser.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-67b1779f\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/content/Onlineuser.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/content/Onlineuser.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-67b1779f", Component.options)
  } else {
    hotAPI.reload("data-v-67b1779f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/js/components/content/Topic.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-42590f3e\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Topic.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],[\"babel-preset-env\"],[\"stage-2\"]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/content/Topic.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-42590f3e\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/content/Topic.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-42590f3e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/content/Topic.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-42590f3e", Component.options)
  } else {
    hotAPI.reload("data-v-42590f3e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/js/components/content/Topicdetail.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54fbfae2\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Topicdetail.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],[\"babel-preset-env\"],[\"stage-2\"]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/content/Topicdetail.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-54fbfae2\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/content/Topicdetail.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-54fbfae2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/content/Topicdetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54fbfae2", Component.options)
  } else {
    hotAPI.reload("data-v-54fbfae2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/js/components/content/Voteendorsement.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d81c445a\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Voteendorsement.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],[\"babel-preset-env\"],[\"stage-2\"]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/content/Voteendorsement.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-d81c445a\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/content/Voteendorsement.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d81c445a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/content/Voteendorsement.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d81c445a", Component.options)
  } else {
    hotAPI.reload("data-v-d81c445a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/js/components/content/Voteupdown.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-41b798b0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/js/components/content/Voteupdown.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}],[\"babel-preset-env\"],[\"stage-2\"]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}],\"babel-plugin-syntax-dynamic-import\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/content/Voteupdown.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-41b798b0\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/content/Voteupdown.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-41b798b0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/content/Voteupdown.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-41b798b0", Component.options)
  } else {
    hotAPI.reload("data-v-41b798b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});