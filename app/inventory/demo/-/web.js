/// Fake namespace for optional overrides
///
/// 	namespace $ { export var x = 1 , y = 1 } // defaults
/// 	namespace $.$mol { export var x = 2 } // overrides
/// 	namespace $.$mol { console.log( x , y ) } // usage
///
this.$ = this.$ || this
var $ = this.$
$.$mol = $

;
var $;
(function ($) {
    function $mol_log(path, values) {
        var filter = $mol_log.filter();
        if (filter == null)
            return;
        if (path.indexOf(filter) === -1)
            return;
        var time = new Date().toLocaleTimeString();
        console.log(time, path, values);
    }
    $.$mol_log = $mol_log;
    (function ($mol_log) {
        var _filter;
        function filter(next) {
            if (next !== void 0) {
                if (next == null) {
                    sessionStorage.removeItem('$mol_log.filter()');
                }
                else {
                    sessionStorage.setItem('$mol_log.filter()', next);
                }
                _filter = next;
            }
            if (_filter !== void 0)
                return _filter;
            return _filter = sessionStorage.getItem('$mol_log.filter()');
        }
        $mol_log.filter = filter;
    })($mol_log = $.$mol_log || ($.$mol_log = {}));
})($ || ($ = {}));
//log.web.js.map
;
var $;
(function ($) {
    var $mol_object = (function () {
        function $mol_object() {
            this['destroyed()'] = false;
        }
        $mol_object.prototype.Class = function () {
            return this.constructor;
        };
        $mol_object.toString = function () {
            var self = this;
            return self['name']
                || self['displayName']
                || (self['displayName'] = Function.prototype.toString.call(self)
                    .match(/^function ([a-z0-9_$]*)/)[1]);
        };
        $mol_object.prototype.object_owner = function (next) {
            if (this['object_owner()'])
                return this['object_owner()'];
            return this['object_owner()'] = next;
        };
        $mol_object.prototype.object_field = function (next) {
            if (this['object_field()'])
                return this['object_field()'] || '';
            return this['object_field()'] = next;
        };
        $mol_object.prototype.toString = function () {
            var path = '';
            var owner = this.object_owner();
            if (owner)
                path = owner.toString();
            var field = this.object_field();
            if (field)
                path += '.' + field;
            return path;
        };
        $mol_object.prototype.setup = function (script) {
            script(this);
            return this;
        };
        $mol_object.prototype.destroyed = function (next) {
            if (next === void 0)
                return this['destroyed()'];
            this['destroyed()'] = next;
            this.log(['.destroyed()', next]);
            return next;
        };
        $mol_object.prototype.log = function (values) {
            if ($.$mol_log.filter() == null)
                return;
            $.$mol_log(this.toString(), values);
        };
        return $mol_object;
    }());
    $.$mol_object = $mol_object;
})($ || ($ = {}));
//object.js.map
;
var $;
(function ($) {
    var $mol_set_shim = (function () {
        function $mol_set_shim() {
            this._index = {};
            this.size = 0;
        }
        $mol_set_shim.prototype.add = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (list) {
                if (list.indexOf(value) !== -1)
                    return this;
                list.push(value);
            }
            else {
                list = this._index[key] = [value];
            }
            ++this.size;
            return this;
        };
        $mol_set_shim.prototype.has = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (!list)
                return false;
            return list.indexOf(value) !== -1;
        };
        $mol_set_shim.prototype.delete = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (!list)
                return;
            var index = list.indexOf(value);
            if (index === -1)
                return;
            list.splice(index, 1);
            --this.size;
        };
        $mol_set_shim.prototype.forEach = function (handle) {
            for (var key in this._index) {
                if (!this._index.hasOwnProperty(key))
                    continue;
                this._index[key].forEach(function (val, index) { return handle(val, val); });
            }
        };
        $mol_set_shim.prototype.keys = function () {
            var keys = [];
            this.forEach(function (val, key) {
                keys.push(key);
            });
            return keys;
        };
        $mol_set_shim.prototype.values = function () {
            var values = [];
            this.forEach(function (val, key) {
                values.push(val);
            });
            return values;
        };
        $mol_set_shim.prototype.entries = function () {
            var entries = [];
            this.forEach(function (val, key) {
                entries.push([val, key]);
            });
            return entries;
        };
        $mol_set_shim.prototype.clear = function () {
            this._index = {};
            this.size = 0;
        };
        return $mol_set_shim;
    }());
    $.$mol_set_shim = $mol_set_shim;
})($ || ($ = {}));
//set.js.map
;
$.$mol_set = ( typeof Set === 'function' ) ? Set : $.$mol_set_shim

;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_defer = (function (_super) {
        __extends($mol_defer, _super);
        function $mol_defer(run) {
            var _this = _super.call(this) || this;
            _this.run = run;
            $mol_defer.add(_this);
            return _this;
        }
        $mol_defer.prototype.destroyed = function (next) {
            if (next)
                $mol_defer.drop(this);
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_defer.schedule = function () {
            var _this = this;
            if (this.timer)
                return;
            this.timer = this.scheduleNative(function () {
                _this.timer = 0;
                _this.run();
            });
        };
        $mol_defer.unschedule = function () {
            if (!this.timer)
                return;
            cancelAnimationFrame(this.timer);
            this.timer = 0;
        };
        $mol_defer.add = function (defer) {
            this.all.push(defer);
            this.schedule();
        };
        $mol_defer.drop = function (defer) {
            var index = this.all.indexOf(defer);
            if (index >= 0)
                this.all.splice(index, 1);
        };
        $mol_defer.run = function () {
            if (this.all.length === 0)
                return;
            this.schedule();
            for (var defer; defer = this.all.pop();)
                defer.run();
        };
        return $mol_defer;
    }($.$mol_object));
    $mol_defer.all = [];
    $mol_defer.timer = 0;
    $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
        ? function (handler) { return requestAnimationFrame(handler); }
        : function (handler) { return setTimeout(handler, 16); };
    $.$mol_defer = $mol_defer;
})($ || ($ = {}));
//defer.js.map
;
var $;
(function ($) {
    var $mol_dict_shim = (function () {
        function $mol_dict_shim() {
            this._keys = {};
            this._values = {};
            this.size = 0;
        }
        $mol_dict_shim.prototype.set = function (key, value) {
            var keyStr = String(key);
            var keys = this._keys[keyStr];
            if (keys) {
                var index = keys.indexOf(key);
                if (index === -1) {
                    index = keys.length;
                    keys.push(key);
                    ++this.size;
                }
                this._values[keyStr][index] = value;
            }
            else {
                this._keys[keyStr] = [key];
                this._values[keyStr] = [value];
                ++this.size;
            }
            return this;
        };
        $mol_dict_shim.prototype.get = function (key) {
            var keyStr = String(key);
            var list = this._keys[keyStr];
            if (!list)
                return void 0;
            var index = list.indexOf(key);
            if (index === -1)
                return void 0;
            return this._values[keyStr][index];
        };
        $mol_dict_shim.prototype.has = function (key) {
            var keyStr = String(key);
            var list = this._keys[keyStr];
            if (!list)
                return false;
            return list.indexOf(key) !== -1;
        };
        $mol_dict_shim.prototype.delete = function (key) {
            var keyStr = String(key);
            var keys = this._keys[keyStr];
            if (!keys)
                return;
            var index = keys.indexOf(key);
            if (index === -1)
                return;
            keys.splice(index, 1);
            this._values[keyStr].splice(index, 1);
            --this.size;
        };
        $mol_dict_shim.prototype.forEach = function (handle) {
            for (var keyStr in this._keys) {
                if (!this._keys.hasOwnProperty(keyStr))
                    continue;
                var values = this._values[keyStr];
                this._keys[keyStr].forEach(function (key, index) {
                    handle(values[index], key);
                });
            }
        };
        $mol_dict_shim.prototype.keys = function () {
            var keys = [];
            this.forEach(function (val, key) {
                keys.push(key);
            });
            return keys;
        };
        $mol_dict_shim.prototype.values = function () {
            var values = [];
            this.forEach(function (val, key) {
                values.push(val);
            });
            return values;
        };
        $mol_dict_shim.prototype.entries = function () {
            var entries = [];
            this.forEach(function (val, key) {
                entries.push([key, val]);
            });
            return entries;
        };
        $mol_dict_shim.prototype.clear = function () {
            this._keys = {};
            this._values = {};
            this.size = 0;
        };
        return $mol_dict_shim;
    }());
    $.$mol_dict_shim = $mol_dict_shim;
})($ || ($ = {}));
//dict.js.map
;
$.$mol_dict = ( typeof Map === 'function' ) ? Map : $.$mol_dict_shim

;
var $;
(function ($) {
    $.$mol_state_stack = new $.$mol_dict();
})($ || ($ = {}));
//stack.js.map
;
void function() {

	if( typeof alert === 'function' ) {
		var nativeAlert = alert
		window.alert = function alert( message ) {
			console.warn( 'Alerts causes atom synchronization problems in IE. Use custom notificator instead.' )
			return nativeAlert( message )
		}
	}

	if( typeof confirm === 'function' ) {
		var nativeConfirm = confirm
		window.confirm = function confirm( question ) {
			console.warn( 'Confirms causes atom synchronization problems in IE. Use custom dialog instead.' )
			return nativeConfirm( question )
		}
	}

	if( typeof confirm === 'function' ) {
		var nativePrompt = prompt
		window.prompt = function prompt( question , def ) {
			console.warn( 'Prompts causes atom synchronization problems in IE. Use custom dialog instead.' )
			return nativePrompt( question , def )
		}
	}

}()

;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_atom_status;
    (function ($mol_atom_status) {
        $mol_atom_status[$mol_atom_status["obsolete"] = 'obsolete'] = "obsolete";
        $mol_atom_status[$mol_atom_status["checking"] = 'checking'] = "checking";
        $mol_atom_status[$mol_atom_status["pulling"] = 'pulling'] = "pulling";
        $mol_atom_status[$mol_atom_status["actual"] = 'actual'] = "actual";
    })($mol_atom_status = $.$mol_atom_status || ($.$mol_atom_status = {}));
    var $mol_atom = (function (_super) {
        __extends($mol_atom, _super);
        function $mol_atom(host, handler, field) {
            if (field === void 0) { field = 'value()'; }
            var _this = _super.call(this) || this;
            _this.masters = null;
            _this.slaves = null;
            _this.status = $mol_atom_status.obsolete;
            _this.autoFresh = true;
            _this.handler = handler;
            _this.host = Object(host);
            _this.field = field || 'value()';
            return _this;
        }
        $mol_atom.prototype.destroyed = function (next) {
            if (next) {
                this.unlink();
                var host = this.host;
                var value = host[this.field];
                if (value instanceof $.$mol_object) {
                    if ((value.object_owner() === host) && (value.object_field() === this.field)) {
                        value.destroyed(true);
                    }
                }
                host[this.field] = void null;
                host[this.field + '@'] = void null;
                this['destroyed()'] = true;
                this.log(['.destroyed()', true, 'atom']);
                this.status = $mol_atom_status.obsolete;
                return true;
            }
            else {
                return this['destroyed()'];
            }
        };
        $mol_atom.prototype.unlink = function () {
            this.disobey_all();
            this.check_slaves();
        };
        $mol_atom.prototype.toString = function () {
            return this.host + "." + this.field;
        };
        $mol_atom.prototype.get = function (force) {
            if (this.status === $mol_atom_status.pulling) {
                throw new Error("Cyclic atom dependency of " + this);
            }
            this.actualize(force);
            var slave = $mol_atom.stack[0];
            if (slave)
                this.lead(slave);
            if (slave)
                slave.obey(this);
            var value = this.host[this.field];
            if (value instanceof Error) {
                if (typeof Proxy !== 'function')
                    throw value;
            }
            return value;
        };
        $mol_atom.prototype.actualize = function (force) {
            var _this = this;
            if (!force && this.status === $mol_atom_status.actual)
                return;
            var slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (!force && this.status === $mol_atom_status.checking) {
                this.masters.forEach(function (master) {
                    if (_this.status !== $mol_atom_status.checking)
                        return;
                    master.actualize();
                });
                if (this.status === $mol_atom_status.checking) {
                    this.status = $mol_atom_status.actual;
                }
            }
            if (force || this.status !== $mol_atom_status.actual) {
                var oldMasters = this.masters;
                this.masters = null;
                if (oldMasters)
                    oldMasters.forEach(function (master) {
                        master.dislead(_this);
                    });
                this.status = $mol_atom_status.pulling;
                var next = this.pull(force);
                this.push(next);
            }
            $mol_atom.stack[0] = slave;
        };
        $mol_atom.prototype.pull = function (force) {
            try {
                return this.handler(this._next, force);
            }
            catch (error) {
                if (error['$mol_atom_catched'])
                    return error;
                if (error instanceof $mol_atom_wait)
                    return error;
                console.error(error.stack || error);
                if (!(error instanceof Error)) {
                    error = new Error(error.stack || error);
                }
                error['$mol_atom_catched'] = true;
                return error;
            }
        };
        $mol_atom.prototype.set = function (next) {
            var next_normal = this.normalize(next, this._next);
            if (next_normal === this._next)
                return this._next;
            this._next = next_normal;
            this.obsolete();
            return this.get();
        };
        $mol_atom.prototype.normalize = function (next, prev) {
            if (next === prev)
                return next;
            if ((next instanceof Array) && (prev instanceof Array) && (next.length === prev.length)) {
                for (var i = 0; i < next.length; ++i) {
                    if (next[i] !== prev[i])
                        return next;
                }
                return prev;
            }
            return next;
        };
        $mol_atom.prototype.push = function (next_raw) {
            this._next = void null;
            this.status = $mol_atom_status.actual;
            var host = this.host;
            var prev = host[this.field];
            if (next_raw === void null)
                return prev;
            var next = (next_raw instanceof Error) ? next_raw : this.normalize(next_raw, prev);
            if (next === prev)
                return prev;
            if (next instanceof $.$mol_object) {
                next.object_field(this.field);
                next.object_owner(host);
            }
            if ((typeof Proxy === 'function') && (next instanceof Error)) {
                next = new Proxy(next, {
                    get: function (target) {
                        throw target.valueOf();
                    },
                    ownKeys: function (target) {
                        throw target.valueOf();
                    },
                });
            }
            host[this.field] = next;
            this.log(['push', next, prev]);
            this.obsolete_slaves();
            return next;
        };
        $mol_atom.prototype.obsolete_slaves = function () {
            if (!this.slaves)
                return;
            this.slaves.forEach(function (slave) { return slave.obsolete(); });
        };
        $mol_atom.prototype.check_slaves = function () {
            if (this.slaves) {
                this.slaves.forEach(function (slave) { return slave.check(); });
            }
            else {
                if (this.autoFresh)
                    $mol_atom.actualize(this);
            }
        };
        $mol_atom.prototype.check = function () {
            if (this.status === $mol_atom_status.actual) {
                this.status = $mol_atom_status.checking;
                this.check_slaves();
            }
        };
        $mol_atom.prototype.obsolete = function () {
            if (this.status === $mol_atom_status.obsolete)
                return;
            this.log(['obsolete']);
            this.status = $mol_atom_status.obsolete;
            this.check_slaves();
            return void null;
        };
        $mol_atom.prototype.lead = function (slave) {
            if (!this.slaves) {
                this.slaves = new $.$mol_set();
                $mol_atom.unreap(this);
            }
            this.slaves.add(slave);
        };
        $mol_atom.prototype.dislead = function (slave) {
            if (!this.slaves)
                return;
            if (this.slaves.size === 1) {
                this.slaves = null;
                $mol_atom.reap(this);
            }
            else {
                this.slaves.delete(slave);
            }
        };
        $mol_atom.prototype.obey = function (master) {
            if (!this.masters)
                this.masters = new $.$mol_set();
            this.masters.add(master);
        };
        $mol_atom.prototype.disobey = function (master) {
            if (!this.masters)
                return;
            this.masters.delete(master);
        };
        $mol_atom.prototype.disobey_all = function () {
            var _this = this;
            if (!this.masters)
                return;
            this.masters.forEach(function (master) { return master.dislead(_this); });
            this.masters = null;
        };
        $mol_atom.prototype.value = function (next, force) {
            if (next === void null) {
                return this.get(force);
            }
            else {
                if (force) {
                    return this.push(next);
                }
                else {
                    return this.set(next);
                }
            }
        };
        $mol_atom.actualize = function (atom) {
            $mol_atom.updating.push(atom);
            $mol_atom.schedule();
        };
        $mol_atom.reap = function (atom) {
            $mol_atom.reaping.add(atom);
            $mol_atom.schedule();
        };
        $mol_atom.unreap = function (atom) {
            $mol_atom.reaping.delete(atom);
        };
        $mol_atom.schedule = function () {
            var _this = this;
            if (this.scheduled)
                return;
            new $.$mol_defer(function () {
                if (!_this.scheduled)
                    return;
                _this.scheduled = false;
                _this.sync();
            });
            this.scheduled = true;
        };
        $mol_atom.sync = function () {
            var _this = this;
            $.$mol_log('$mol_atom.sync', []);
            this.schedule();
            while (this.updating.length) {
                var atom = this.updating.shift();
                if (this.reaping.has(atom))
                    continue;
                if (!atom.destroyed())
                    atom.get();
            }
            while (this.reaping.size) {
                this.reaping.forEach(function (atom) {
                    _this.reaping.delete(atom);
                    if (!atom.slaves)
                        atom.destroyed(true);
                });
            }
            this.scheduled = false;
        };
        return $mol_atom;
    }($.$mol_object));
    $mol_atom.stack = [null];
    $mol_atom.updating = [];
    $mol_atom.reaping = new $.$mol_set();
    $mol_atom.scheduled = false;
    $.$mol_atom = $mol_atom;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    var $mol_atom_wait = (function (_super) {
        __extends($mol_atom_wait, _super);
        function $mol_atom_wait(message) {
            if (message === void 0) { message = 'Wait...'; }
            var _this = _super.call(this, message) || this;
            _this.message = message;
            _this.name = '$mol_atom_wait';
            var error = new Error(message);
            error.name = _this.name;
            error['__proto__'] = $mol_atom_wait.prototype;
            return error;
        }
        return $mol_atom_wait;
    }(Error));
    $.$mol_atom_wait = $mol_atom_wait;
    var $mol_atom_force = (function (_super) {
        __extends($mol_atom_force, _super);
        function $mol_atom_force() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_atom_force;
    }(Object));
    $.$mol_atom_force = $mol_atom_force;
    function $mol_atom_task(host, handler) {
        var atom = new $mol_atom(host, function () {
            try {
                handler();
            }
            catch (error) {
                if (!(error instanceof $mol_atom_wait))
                    atom.destroyed(true);
                throw error;
            }
            atom.destroyed(true);
        });
        $mol_atom.actualize(atom);
        return atom;
    }
    $.$mol_atom_task = $mol_atom_task;
})($ || ($ = {}));
//atom.js.map
;
var $;
(function ($) {
    function $mol_mem(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (next, force) {
                var host = this;
                var field = name + "()";
                var fieldA = field + '@';
                var atom = host[fieldA];
                if (!atom) {
                    if (force && (next === void null))
                        return next;
                    host[fieldA] = atom = new $.$mol_atom(host, value.bind(host), field);
                    if (config)
                        atom.autoFresh = !config.lazy;
                }
                return atom.value(next, force);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem = $mol_mem;
    function $mol_mem_key(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (key, next, force) {
                var host = this;
                var field = name + "(" + JSON.stringify(key) + ")";
                var fieldA = field + '@';
                var atom = host[fieldA];
                if (!atom) {
                    if (force && (next === void null))
                        return next;
                    host[fieldA] = atom = new $.$mol_atom(host, value.bind(host, key), field);
                    if (config)
                        atom.autoFresh = !config.lazy;
                }
                return atom.value(next, force);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem_key = $mol_mem_key;
})($ || ($ = {}));
//mem.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_window = (function (_super) {
        __extends($mol_window, _super);
        function $mol_window() {
            return _super.apply(this, arguments) || this;
        }
        $mol_window.size = function (next) {
            return next || {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        };
        return $mol_window;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_window, "size", null);
    $.$mol_window = $mol_window;
    window.addEventListener('resize', function () {
        $mol_window.size(null);
    });
})($ || ($ = {}));
//window.web.js.map
;
var $;
(function ($) {
})($ || ($ = {}));
//context.js.map
;
var $;
(function ($) {
    $.$mol_dom_context = window;
})($ || ($ = {}));
//context.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_view_context = {};
    $.$mol_view_context.$mol_view_visible_width = function () { return $.$mol_window.size().width; };
    $.$mol_view_context.$mol_view_visible_height = function () { return $.$mol_window.size().height; };
    $.$mol_view_context.$mol_view_state_key = function (suffix) { return suffix; };
    var $mol_view = (function (_super) {
        __extends($mol_view, _super);
        function $mol_view() {
            return _super.apply(this, arguments) || this;
        }
        $mol_view.Root = function (id) {
            return new this;
        };
        $mol_view.prototype.title = function () {
            return this.Class().toString();
        };
        $mol_view.prototype.focused = function (next) {
            var value = $.$mol_view_selection.focused(next === void 0 ? void 0 : [this.dom_node()]);
            return value.indexOf(this.dom_node()) !== -1;
        };
        $mol_view.prototype.context = function (next) {
            return next || $.$mol_view_context;
        };
        $mol_view.prototype.context_sub = function () {
            return this.context();
        };
        $mol_view.prototype.state_key = function (suffix) {
            if (suffix === void 0) { suffix = ''; }
            return this.context().$mol_view_state_key(suffix);
        };
        $mol_view.prototype.dom_name = function () {
            return this.constructor.toString().replace('$', '');
        };
        $mol_view.prototype.dom_name_space = function () { return 'http://www.w3.org/1999/xhtml'; };
        $mol_view.prototype.sub = function () {
            return null;
        };
        $mol_view.prototype.sub_visible = function () {
            var sub = this.sub();
            if (!sub)
                return sub;
            var context = this.context_sub();
            sub.forEach(function (child) {
                if (child instanceof $mol_view) {
                    child.context(context);
                }
            });
            return sub;
        };
        $mol_view.prototype.minimal_width = function () {
            var sub = this.sub();
            if (!sub)
                return 0;
            var min = 0;
            sub.forEach(function (view) {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_width());
                }
            });
            return min;
        };
        $mol_view.prototype.minimal_height = function () {
            var sub = this.sub();
            if (!sub)
                return 0;
            var min = 0;
            sub.forEach(function (view) {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_height());
                }
            });
            return min;
        };
        $mol_view.prototype.dom_node = function (next) {
            var path = this.toString();
            var next2 = next;
            if (!next2) {
                next2 = this['dom_node()'];
                if (next2)
                    return next2;
                next2 = $.$mol_dom_context.document.getElementById(path);
                if (next2) {
                    if (next2['$mol_view']) {
                        return this['dom_node()'] = next2;
                    }
                }
                else {
                    next2 = $.$mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
                }
            }
            next2.id = path;
            void (next2['$mol_view'] = this);
            this['dom_node()'] = next2;
            var ownerProto = this.object_owner() && Object.getPrototypeOf(this.object_owner());
            if (ownerProto) {
                var suffix = this.object_field().replace(/\(.*/, '');
                var suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
                while (ownerProto && (ownerProto instanceof $mol_view) && (suffix in ownerProto)) {
                    var attrName = ownerProto.constructor.toString().replace(/\$/g, '') + suffix2;
                    next2.setAttribute(attrName, '');
                    ownerProto = Object.getPrototypeOf(ownerProto);
                }
            }
            var proto = Object.getPrototypeOf(this);
            while (proto) {
                var attrName = proto.constructor.toString().replace(/\$/g, '').toLowerCase();
                next2.setAttribute(attrName, '');
                if (!(proto instanceof $mol_view))
                    break;
                proto = Object.getPrototypeOf(proto);
            }
            $mol_view.bind_event(next2, this.event());
            return next2;
        };
        $mol_view.bind_event = function (node, events) {
            var _this = this;
            var _loop_1 = function (name_1) {
                var handle = events[name_1];
                node.addEventListener(name_1, function (event) {
                    $.$mol_atom_task(_this + ".event()['" + name_1 + "']", function () {
                        handle(event);
                    }).get();
                });
            };
            for (var name_1 in events) {
                _loop_1(name_1);
            }
        };
        $mol_view.render_sub = function (node, sub) {
            if (sub == null)
                return;
            var nextNode = node.firstChild;
            for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                var view = sub_1[_i];
                if (view == null) {
                }
                else if (typeof view === 'object') {
                    var existsNode = ((view instanceof $mol_view) ? view.dom_node() : view.valueOf());
                    while (true) {
                        if (!nextNode) {
                            node.appendChild(existsNode);
                            break;
                        }
                        if (nextNode == existsNode) {
                            nextNode = nextNode.nextSibling;
                            break;
                        }
                        else {
                            node.insertBefore(existsNode, nextNode);
                            break;
                        }
                    }
                }
                else {
                    if (nextNode && nextNode.nodeName === '#text') {
                        nextNode.nodeValue = String(view);
                        nextNode = nextNode.nextSibling;
                    }
                    else {
                        var textNode = $.$mol_dom_context.document.createTextNode(String(view));
                        node.insertBefore(textNode, nextNode);
                    }
                }
            }
            while (nextNode) {
                var currNode = nextNode;
                nextNode = currNode.nextSibling;
                node.removeChild(currNode);
            }
            for (var _a = 0, sub_2 = sub; _a < sub_2.length; _a++) {
                var view = sub_2[_a];
                if (view instanceof $mol_view) {
                    try {
                        view.dom_tree();
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }
        };
        $mol_view.render_attr = function (node, attrs) {
            for (var name_2 in attrs) {
                var val = attrs[name_2];
                if ((val == null) || (val === false)) {
                    node.removeAttribute(name_2);
                }
                else if (val === true) {
                    node.setAttribute(name_2, 'true');
                }
                else {
                    node.setAttribute(name_2, String(val));
                }
            }
        };
        $mol_view.render_style = function (node, styles) {
            for (var name_3 in styles) {
                var val = styles[name_3];
                if (typeof val === 'number')
                    val = val + "px";
                var style = node.style;
                style[name_3] = val;
            }
        };
        $mol_view.render_field = function (node, field) {
            for (var key in field) {
                var val = field[key];
                if (node[key] !== val)
                    node[key] = val;
            }
        };
        $mol_view.prototype.dom_tree = function () {
            var node = this.dom_node();
            try {
                $mol_view.render_attr(node, this.attr());
                $mol_view.render_style(node, this.style());
                $mol_view.render_sub(node, this.sub_visible());
                $mol_view.render_field(node, this.field());
                return node;
            }
            catch (error) {
                if (!error['$mol_view_catched']) {
                    node.setAttribute('mol_view_error', error.name);
                    error['$mol_view_catched'] = true;
                }
                throw error;
            }
        };
        $mol_view.prototype.attr = function () {
            return {
                'mol_view_error': false
            };
        };
        $mol_view.prototype.style = function () {
            return {};
        };
        $mol_view.prototype.field = function () {
            return {};
        };
        $mol_view.prototype.event = function () { return {}; };
        $mol_view.prototype.locale_contexts = function () {
            var contexts = [];
            var proto = Object.getPrototypeOf(this);
            while (proto && (proto instanceof $mol_view)) {
                contexts.push(proto.constructor.toString());
                proto = Object.getPrototypeOf(proto);
            }
            return contexts;
        };
        return $mol_view;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "context", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_view, "Root", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//view.js.map
;
var $;
(function ($) {
    $.$mol_dom_context.document.addEventListener(window.cordova ? 'deviceready' : 'DOMContentLoaded', function (event) {
        var nodes = $.$mol_dom_context.document.querySelectorAll('[mol_view_root]');
        var _loop_1 = function (i) {
            var view = $[nodes.item(i).getAttribute('mol_view_root')].Root(i);
            view.dom_node(nodes.item(i));
            var win = new $.$mol_atom("$mol_view.Root(" + i + ")", function () {
                view.dom_tree();
                $.$mol_dom_context.document.title = view.title();
                return null;
            });
            new $.$mol_defer(function () { return win.get(); });
        };
        for (var i = nodes.length - 1; i >= 0; --i) {
            _loop_1(i);
        }
        $.$mol_defer.run();
    });
})($ || ($ = {}));
//view.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_view_selection = (function (_super) {
        __extends($mol_view_selection, _super);
        function $mol_view_selection() {
            return _super.apply(this, arguments) || this;
        }
        $mol_view_selection.focused = function (next, force) {
            if (next === void 0)
                return [];
            if (next.length !== 1)
                throw new Error('Length must be equals 1');
            var node = next[0];
            node.focus();
        };
        $mol_view_selection.position = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i] = arguments[_i];
            }
            if (diff.length) {
                if (!diff[0])
                    return diff[0];
                var start = diff[0].start;
                var end = diff[0].end;
                if (!(start <= end))
                    throw new Error("Wrong offsets (" + start + "," + end + ")");
                var root = $.$mol_dom_context.document.getElementById(diff[0].id);
                root.focus();
                var range = new Range;
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= start)
                            break;
                        start -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            start = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setStart(cur, start);
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= end)
                            break;
                        end -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            end = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setEnd(cur, end);
                var sel = $.$mol_dom_context.document.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                return diff[0];
            }
            else {
                var sel = $.$mol_dom_context.document.getSelection();
                if (sel.rangeCount === 0)
                    return null;
                var range = sel.getRangeAt(0);
                var el = range.commonAncestorContainer;
                while (el && !el.id)
                    el = el.parentElement;
                if (!el)
                    return { id: null, start: 0, end: 0 };
                var meter = new Range;
                meter.selectNodeContents(el);
                meter.setEnd(range.startContainer, range.startOffset);
                var startOffset = meter.toString().length;
                meter.setEnd(range.endContainer, range.endOffset);
                var endOffset = meter.toString().length;
                return { id: el.id, start: startOffset, end: endOffset };
            }
        };
        $mol_view_selection.onFocus = function (event) {
            var parents = [];
            var element = event.target;
            while (element) {
                parents.push(element);
                element = element.parentElement;
            }
            $mol_view_selection.focused(parents, $.$mol_atom_force);
        };
        $mol_view_selection.onBlur = function (event) {
            $mol_view_selection.focused([], $.$mol_atom_force);
        };
        return $mol_view_selection;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_view_selection, "focused", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view_selection, "position", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//selection.js.map
;
var $;
(function ($) {
    $.$mol_dom_context.document.addEventListener('selectionchange', function (event) {
        $.$mol_view_selection.position(void 0);
    });
    $.$mol_dom_context.document.addEventListener('focusin', $.$mol_view_selection.onFocus);
    $.$mol_dom_context.document.addEventListener('focus', $.$mol_view_selection.onFocus, true);
    $.$mol_dom_context.document.addEventListener('focusout', $.$mol_view_selection.onBlur);
    $.$mol_dom_context.document.addEventListener('blur', $.$mol_view_selection.onBlur, true);
})($ || ($ = {}));
//selection.web.js.map
;
var $;
(function ($) {
    function $mol_merge_dict(target, source) {
        var result = {};
        for (var key in target)
            result[key] = target[key];
        for (var key in source)
            result[key] = source[key];
        return result;
    }
    $.$mol_merge_dict = $mol_merge_dict;
})($ || ($ = {}));
//dict.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_arg = (function (_super) {
        __extends($mol_state_arg, _super);
        function $mol_state_arg(prefix) {
            if (prefix === void 0) { prefix = ''; }
            var _this = _super.call(this) || this;
            _this.prefix = prefix;
            return _this;
        }
        $mol_state_arg.href = function (next) {
            if (next)
                history.replaceState(history.state, $.$mol_dom_context.document.title, "" + next);
            return window.location.search + window.location.hash;
        };
        $mol_state_arg.dict = function (next) {
            var href = this.href(next && this.make(next));
            var chunks = href.split(/[\/\?#!&;]/g);
            var params = {};
            chunks.forEach(function (chunk) {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        };
        $mol_state_arg.value = function (key, next) {
            var nextDict = (next === void 0) ? void 0 : $.$mol_merge_dict(this.dict(), (_a = {}, _a[key] = next, _a));
            return this.dict(nextDict)[key] || null;
            var _a;
        };
        $mol_state_arg.link = function (next) {
            return this.make($.$mol_merge_dict(this.dict(), next));
        };
        $mol_state_arg.make = function (next) {
            var chunks = [];
            for (var key in next) {
                if (null == next[key])
                    continue;
                chunks.push([key].concat(next[key]).map(encodeURIComponent).join('='));
            }
            var hash = chunks.join('#');
            return hash ? '#' + hash + '#' : '#';
        };
        $mol_state_arg.prototype.value = function (key, next) {
            return $mol_state_arg.value(this.prefix + key, next);
        };
        $mol_state_arg.prototype.sub = function (postfix) {
            return new $mol_state_arg(this.prefix + postfix + '.');
        };
        $mol_state_arg.prototype.link = function (next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return $mol_state_arg.link(dict);
        };
        return $mol_state_arg;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_state_arg, "href", null);
    __decorate([
        $.$mol_mem()
    ], $mol_state_arg, "dict", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_arg, "value", null);
    $.$mol_state_arg = $mol_state_arg;
    window.addEventListener('hashchange', function (event) { return $mol_state_arg.href(null); });
})($ || ($ = {}));
//arg.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_link = (function (_super) {
        __extends($mol_link, _super);
        function $mol_link() {
            return _super.apply(this, arguments) || this;
        }
        $mol_link.prototype.minimal_height = function () {
            return 36;
        };
        $mol_link.prototype.dom_name = function () {
            return "a";
        };
        $mol_link.prototype.uri = function () {
            return "";
        };
        $mol_link.prototype.current = function () {
            return false;
        };
        $mol_link.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "href": this.uri(), "mol_link_current": this.current() }));
        };
        $mol_link.prototype.arg = function () {
            return ({});
        };
        return $mol_link;
    }($.$mol_view));
    $.$mol_link = $mol_link;
})($ || ($ = {}));
//link.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_link = (function (_super) {
            __extends($mol_link, _super);
            function $mol_link() {
                return _super.apply(this, arguments) || this;
            }
            $mol_link.prototype.uri = function () {
                return new $.$mol_state_arg(this.state_key()).link(this.arg());
            };
            $mol_link.prototype.current = function () {
                return this.uri() === $.$mol_state_arg.link({});
            };
            return $mol_link;
        }($.$mol_link));
        __decorate([
            $.$mol_mem()
        ], $mol_link.prototype, "uri", null);
        $mol.$mol_link = $mol_link;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//linker.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_http_request = (function (_super) {
        __extends($mol_http_request, _super);
        function $mol_http_request() {
            return _super.apply(this, arguments) || this;
        }
        $mol_http_request.prototype.uri = function () { return ''; };
        $mol_http_request.prototype.method = function () { return 'Get'; };
        $mol_http_request.prototype.credentials = function () {
            return null;
        };
        $mol_http_request.prototype.body = function () { return null; };
        $mol_http_request.prototype.native = function () {
            var _this = this;
            if (this['native()'])
                return this['native()'];
            var next = this['native()'] = new $.$mol_dom_context.XMLHttpRequest;
            next.withCredentials = Boolean(this.credentials());
            next.onload = function (event) {
                if (Math.floor(next.status / 100) === 2) {
                    _this.response(next.responseText, $.$mol_atom_force);
                }
                else {
                    _this.response(new Error(next.responseText), $.$mol_atom_force);
                }
            };
            next.onerror = function (event) {
                _this.response(event.error || new Error('Unknown HTTP error'), $.$mol_atom_force);
            };
            return next;
        };
        $mol_http_request.prototype.destroyed = function (next) {
            if (next) {
                var native = this['native()'];
                if (native)
                    native.abort();
            }
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_http_request.prototype.response = function (next, force) {
            var creds = this.credentials();
            var native = this.native();
            var method = (next === void 0) ? 'Get' : this.method();
            var uri = this.uri();
            native.open(method, uri, true, creds && creds.login, creds && creds.password);
            native.send(next);
            throw new $.$mol_atom_wait(method + " " + uri);
        };
        $mol_http_request.prototype.text = function (next, force) {
            return this.response(next, force);
        };
        return $mol_http_request;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_http_request.prototype, "response", null);
    $.$mol_http_request = $mol_http_request;
})($ || ($ = {}));
//request.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_http_resource = (function (_super) {
        __extends($mol_http_resource, _super);
        function $mol_http_resource() {
            return _super.apply(this, arguments) || this;
        }
        $mol_http_resource.item = function (uri) {
            return new $mol_http_resource().setup(function (obj) {
                obj.uri = function () { return uri; };
            });
        };
        $mol_http_resource.prototype.uri = function () { return ''; };
        $mol_http_resource.prototype.credentials = function () {
            return null;
        };
        $mol_http_resource.prototype.request = function () {
            var _this = this;
            var request = new $.$mol_http_request();
            request.method = function () { return 'Put'; };
            request.uri = function () { return _this.uri(); };
            request.credentials = function () { return _this.credentials(); };
            return request;
        };
        $mol_http_resource.prototype.text = function (next, force) {
            return this.request().text(next, force);
        };
        return $mol_http_resource;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_http_resource.prototype, "request", null);
    __decorate([
        $.$mol_mem()
    ], $mol_http_resource.prototype, "text", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_http_resource, "item", null);
    $.$mol_http_resource = $mol_http_resource;
    var $mol_http_resource_json = (function (_super) {
        __extends($mol_http_resource_json, _super);
        function $mol_http_resource_json() {
            return _super.apply(this, arguments) || this;
        }
        $mol_http_resource_json.item = function (uri) {
            return new $mol_http_resource_json().setup(function (obj) {
                obj.uri = function () { return uri; };
            });
        };
        $mol_http_resource_json.prototype.json = function (next, force) {
            return JSON.parse(this.text(next && JSON.stringify(next, null, '\t'), force));
        };
        return $mol_http_resource_json;
    }($mol_http_resource));
    __decorate([
        $.$mol_mem_key()
    ], $mol_http_resource_json, "item", null);
    $.$mol_http_resource_json = $mol_http_resource_json;
})($ || ($ = {}));
//resource.js.map
;
var $;
(function ($) {
    function $mol_const(value) {
        var getter = (function () { return value; });
        getter['()'] = value;
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//const.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_hyperhive = (function (_super) {
        __extends($mol_hyperhive, _super);
        function $mol_hyperhive() {
            return _super.apply(this, arguments) || this;
        }
        $mol_hyperhive.initialize = function (params) {
            if (typeof hhfw === 'undefined')
                return this;
            hhfw.Init(params.host, params.version, params.environment, params.project, params.application);
            hhfw.SetSslChecks(false);
            return this;
        };
        $mol_hyperhive.authentificated = function (credentials, next, force) {
            var _this = this;
            if (typeof hhfw === 'undefined')
                return true;
            hhfw.Auth(credentials.login, credentials.password, function (message) { return _this.authentificated(credentials, true, $.$mol_atom_force); }, function (message) { return _this.authentificated(credentials, new Error(JSON.stringify(credentials) + " " + message), $.$mol_atom_force); });
            throw new $.$mol_atom_wait('Authentification...');
        };
        $mol_hyperhive.data = function (resource, next, force) {
            if (typeof hhfw === 'undefined') {
                var uri = "" + resource.uri + resource.table + "/table/" + resource.table + "/";
                var res = $.$mol_http_resource_json.item(uri);
                res.credentials = $.$mol_const({});
                return res.json();
            }
            var handleError = function (message) {
                var error = new Error(JSON.stringify(resource) + " " + message);
                $mol_hyperhive.data(resource, error, $.$mol_atom_force);
            };
            $.$mol_dom_context.document.addEventListener('deviceready', function () {
                if (next === void 0) {
                    hhfw.GetDeltaStream("GET_" + resource.table, function (result) {
                        console.debug(result);
                        hhfw.QueryToResTable("GET_" + resource.table, "select * from GET_" + resource.table + "_$_GET_" + resource.table, function (resp) {
                            console.debug(resp.substring(0, 512));
                            $mol_hyperhive.data(resource, JSON.parse(resp).data || null, $.$mol_atom_force);
                        }, handleError);
                    }, handleError);
                }
                else {
                    hhfw.Post("UPSERT_" + resource.table, resource.table, JSON.stringify(next), function (resp) {
                        console.debug(resp);
                        $mol_hyperhive.data(resource, void 0, $.$mol_atom_force);
                    }, handleError);
                }
            });
            throw new $.$mol_atom_wait("Loading " + resource.table + " from " + resource.uri);
        };
        return $mol_hyperhive;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_hyperhive, "initialize", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_hyperhive, "authentificated", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_hyperhive, "data", null);
    $.$mol_hyperhive = $mol_hyperhive;
})($ || ($ = {}));
//hyperhive.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_session = (function (_super) {
        __extends($mol_state_session, _super);
        function $mol_state_session() {
            return _super.apply(this, arguments) || this;
        }
        $mol_state_session.value = function (key, next) {
            if (next === void 0)
                return JSON.parse(sessionStorage.getItem(key) || 'null');
            if (next === null)
                sessionStorage.removeItem(key);
            else
                sessionStorage.setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_session.prototype.prefix = function () { return ''; };
        $mol_state_session.prototype.value = function (key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        };
        return $mol_state_session;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));
//session.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_app_inventory_domain_position_status = {
        draft: 'Inserted',
        approved: 'Approved',
        completed: 'Completed',
        pending: 'Pending',
        rejected: 'Rejected',
    };
    var $mol_app_inventory_domain = (function (_super) {
        __extends($mol_app_inventory_domain, _super);
        function $mol_app_inventory_domain() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_domain.prototype.table = function (name, next) {
            var creds = this.credentials();
            var uri = "https://" + creds.login + ":" + creds.password + "@mobrun.sp.saprun.com/api/v0.5/data/demo/demo/inventory/";
            return $.$mol_hyperhive.data({
                uri: uri,
                table: name,
            }, next);
        };
        $mol_app_inventory_domain.prototype.products_table = function () {
            return this.table('MATERIALS');
        };
        $mol_app_inventory_domain.prototype.positions_table = function (next) {
            return this.table('MOVEMENTS', next);
        };
        $mol_app_inventory_domain.prototype.product_rows_by_id = function () {
            var table = this.products_table();
            var dict = {};
            table.forEach(function (row) {
                dict[row.R_MATERIAL_ID] = row;
            });
            return dict;
        };
        $mol_app_inventory_domain.prototype.product_by_code = function (code) {
            var row = this.product_rows_by_code()[code];
            return row ? this.product(row.R_MATERIAL_ID) : null;
        };
        $mol_app_inventory_domain.prototype.product_rows_by_code = function () {
            var table = this.products_table();
            var dict = {};
            table.forEach(function (row) {
                dict[row.R_BARCODE] = row;
            });
            return dict;
        };
        $mol_app_inventory_domain.prototype.position_rows_by_id = function () {
            var table = this.positions_table();
            var dict = {};
            table.forEach(function (row) {
                dict[row.R_MOVEMENT_ID] = row;
            });
            return dict;
        };
        $mol_app_inventory_domain.prototype.products = function () {
            var _this = this;
            return this.products_table().map(function (row) { return _this.product(row.R_MATERIAL_ID); });
        };
        $mol_app_inventory_domain.prototype.product = function (id) {
            var _this = this;
            var next = new $mol_app_inventory_domain_product;
            next.id = $.$mol_const(id);
            next.code = function () { return _this.product_code(id); };
            next.title = function () { return _this.product_title(id); };
            return next;
        };
        $mol_app_inventory_domain.prototype.product_code = function (id) {
            return this.product_rows_by_id()[id].R_BARCODE;
        };
        $mol_app_inventory_domain.prototype.product_title = function (id) {
            return this.product_rows_by_id()[id].R_NAME;
        };
        $mol_app_inventory_domain.prototype.positions = function (next) {
            var _this = this;
            var table = next && next.map(function (position) {
                return {
                    R_MOVEMENT_ID: position.id(),
                    R_MATERIAL_ID: position.product().id(),
                    R_QUANTITY: position.count(),
                    R_COMMENT: position.remark(),
                    R_STATUS: $.$mol_app_inventory_domain_position_status[position.status()]
                };
            });
            return this.positions_table(table)
                .map(function (row) { return _this.position(row.R_MOVEMENT_ID); })
                .filter(function (position) { return position.status(); });
        };
        $mol_app_inventory_domain.prototype.positions_by_product_id = function () {
            var positions = this.positions();
            var dict = {};
            positions.forEach(function (position) {
                if (position.status() === 'completed')
                    return;
                dict[position.product().id()] = position;
            });
            return dict;
        };
        $mol_app_inventory_domain.prototype.position_by_product_id = function (product_id) {
            var position = this.positions_by_product_id()[product_id];
            if (position)
                return position;
            this.positions_table([{
                    R_MOVEMENT_ID: null,
                    R_MATERIAL_ID: product_id,
                    R_STATUS: $.$mol_app_inventory_domain_position_status.draft,
                    R_QUANTITY: 0,
                    R_COMMENT: '',
                }]);
            return this.positions_by_product_id()[product_id];
        };
        $mol_app_inventory_domain.prototype.position = function (id) {
            var _this = this;
            var next = new $mol_app_inventory_domain_position();
            next.id = $.$mol_const(id);
            next.product = function () { return _this.position_product(id); };
            next.count = function (next) { return _this.position_count(id, next); };
            next.status = function (next) { return _this.position_status(id, next); };
            return next;
        };
        $mol_app_inventory_domain.prototype.position_product = function (id, next) {
            return this.product(this.position_rows_by_id()[id].R_MATERIAL_ID);
        };
        $mol_app_inventory_domain.prototype.position_count = function (id, next) {
            if (next >= 0) {
                var pos = this.position(id);
                var row = this.position_rows_by_id()[id];
                if (row.R_QUANTITY === next)
                    return next;
                this.positions_table([
                    {
                        R_MOVEMENT_ID: id,
                        R_MATERIAL_ID: pos.product().id(),
                        R_QUANTITY: next,
                        R_COMMENT: pos.remark(),
                        R_STATUS: $.$mol_app_inventory_domain_position_status.draft,
                    }
                ]);
            }
            return this.position_rows_by_id()[id].R_QUANTITY;
        };
        $mol_app_inventory_domain.prototype.position_status = function (id, next) {
            var remap = {};
            for (var key in $.$mol_app_inventory_domain_position_status) {
                remap[$.$mol_app_inventory_domain_position_status[key]] = key;
            }
            if (next) {
                var pos = this.position(id);
                this.positions_table([{
                        R_MOVEMENT_ID: id,
                        R_MATERIAL_ID: pos.product().id(),
                        R_QUANTITY: pos.count(),
                        R_COMMENT: pos.remark(),
                        R_STATUS: $.$mol_app_inventory_domain_position_status[next],
                    }]);
            }
            return remap[this.position_rows_by_id()[id].R_STATUS];
        };
        $mol_app_inventory_domain.prototype.credentials = function (next) {
            return $.$mol_state_session.value('credentials', next);
        };
        $mol_app_inventory_domain.prototype.authentificated = function () {
            $.$mol_hyperhive.initialize({
                host: "mobrun.sp.saprun.com",
                version: "v0.5",
                environment: "demo",
                project: "demo",
                application: "inventory",
            });
            var creds = this.credentials();
            if (!creds)
                return false;
            return $.$mol_hyperhive.authentificated(creds);
        };
        $mol_app_inventory_domain.prototype.can_write_off = function () {
            return Boolean(this.credentials().login.match('keeper'));
        };
        $mol_app_inventory_domain.prototype.can_approve = function () {
            return Boolean(this.credentials().login.match('controller'));
        };
        $mol_app_inventory_domain.prototype.message = function () {
            return void 0;
        };
        return $mol_app_inventory_domain;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "products_table", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "positions_table", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "product_rows_by_id", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "product_rows_by_code", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "position_rows_by_id", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "products", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_inventory_domain.prototype, "product", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "positions", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "positions_by_product_id", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_inventory_domain.prototype, "position_by_product_id", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_inventory_domain.prototype, "position", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "credentials", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "authentificated", null);
    $.$mol_app_inventory_domain = $mol_app_inventory_domain;
    var $mol_app_inventory_domain_product = (function (_super) {
        __extends($mol_app_inventory_domain_product, _super);
        function $mol_app_inventory_domain_product() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_domain_product.prototype.id = function () { return void 0; };
        $mol_app_inventory_domain_product.prototype.code = function () { return void 0; };
        $mol_app_inventory_domain_product.prototype.title = function () { return void 0; };
        $mol_app_inventory_domain_product.prototype.description = function () { return void 0; };
        return $mol_app_inventory_domain_product;
    }($.$mol_object));
    $.$mol_app_inventory_domain_product = $mol_app_inventory_domain_product;
    var $mol_app_inventory_domain_position = (function (_super) {
        __extends($mol_app_inventory_domain_position, _super);
        function $mol_app_inventory_domain_position() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_domain_position.prototype.id = function () { return void 0; };
        $mol_app_inventory_domain_position.prototype.product = function () { return void 0; };
        $mol_app_inventory_domain_position.prototype.count = function (next) {
            return next || 0;
        };
        $mol_app_inventory_domain_position.prototype.status = function (next) {
            return next || 'draft';
        };
        $mol_app_inventory_domain_position.prototype.remark = function (next) {
            return next;
        };
        return $mol_app_inventory_domain_position;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain_position.prototype, "count", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain_position.prototype, "status", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain_position.prototype, "remark", null);
    $.$mol_app_inventory_domain_position = $mol_app_inventory_domain_position;
})($ || ($ = {}));
//domain.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var localStorage = localStorage || {
    getItem: function (key) {
        return this[':' + key];
    },
    setItem: function (key, value) {
        this[':' + key] = value;
    },
    removeItem: function (key) {
        this[':' + key] = void 0;
    }
};
var $;
(function ($) {
    var $mol_state_local = (function (_super) {
        __extends($mol_state_local, _super);
        function $mol_state_local() {
            return _super.apply(this, arguments) || this;
        }
        $mol_state_local.value = function (key, next, force) {
            if (next === void 0)
                return JSON.parse(localStorage.getItem(key) || 'null');
            if (next === null)
                localStorage.removeItem(key);
            else
                localStorage.setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_local.prototype.prefix = function () { return ''; };
        $mol_state_local.prototype.value = function (key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        };
        return $mol_state_local;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
;
var $;
(function ($) {
    window.addEventListener('storage', function (event) {
        $.$mol_state_local.value(event.key, void 0, $.$mol_atom_force);
    });
})($ || ($ = {}));
//local.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_file = (function (_super) {
        __extends($mol_file, _super);
        function $mol_file() {
            return _super.apply(this, arguments) || this;
        }
        $mol_file.absolute = function (path) {
            return new $mol_file().setup(function (obj) {
                obj.path = function () { return path; };
            });
        };
        $mol_file.relative = function (path) {
            if (/^[\w-]+:/.test(path)) {
                return $mol_file.absolute(path);
            }
            if (/^\/[^\/]/.test(path)) {
                var prefix_1 = $.$mol_dom_context.document.location.href.replace(/([^\/])\/[^\/]+.*/, '$1');
                return $mol_file.absolute(prefix_1 + path);
            }
            var prefix = $.$mol_dom_context.document.location.href.replace(/[\?#].*$/, '').replace(/\/[^\/]*$/, '/');
            return $mol_file.absolute(prefix + path);
        };
        $mol_file.prototype.path = function () {
            return '.';
        };
        $mol_file.prototype.parent = function () {
            return this.resolve('..');
        };
        $mol_file.prototype.name = function () {
            return this.path().replace(/^.*\//, '');
        };
        $mol_file.prototype.ext = function () {
            var match = /((?:\.\w+)+)$/.exec(this.path());
            return match && match[1].substring(1);
        };
        $mol_file.prototype.content = function (next, force) {
            return $.$mol_http_resource.item(this.path()).text(next);
        };
        $mol_file.prototype.resolve = function (path) {
            return this.Class().relative(path);
        };
        $mol_file.prototype.relate = function (base) {
            if (base === void 0) { base = this.Class().relative('.'); }
            throw new Error('Not implemented yet');
        };
        return $mol_file;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "content", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_file, "absolute", null);
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//file.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_locale = (function (_super) {
        __extends($mol_locale, _super);
        function $mol_locale() {
            return _super.apply(this, arguments) || this;
        }
        $mol_locale.lang = function (next) {
            return $.$mol_state_local.value('locale', next) || $.$mol_state_arg.value('locale') || 'en';
        };
        $mol_locale.texts = function (next) {
            if (next)
                return next;
            var path = "-/web.locale=" + this.lang() + ".json";
            var content = $.$mol_file.relative(path).content();
            return JSON.parse(content);
        };
        $mol_locale.text = function (contexts, key) {
            var texts = this.texts();
            for (var i = 0; i < contexts.length; ++i) {
                var text = texts[contexts[i] + "_" + key];
                if (text)
                    return text;
            }
            console.warn('Locale tet not found: ', contexts, key);
            return "<" + key + ">";
        };
        return $mol_locale;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "lang", null);
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "texts", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//locale.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_string = (function (_super) {
        __extends($mol_string, _super);
        function $mol_string() {
            return _super.apply(this, arguments) || this;
        }
        $mol_string.prototype.dom_name = function () {
            return "input";
        };
        $mol_string.prototype.enabled = function () {
            return true;
        };
        $mol_string.prototype.disabled = function () {
            return false;
        };
        $mol_string.prototype.value = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_string.prototype.value_changed = function (val) {
            return this.value(val);
        };
        $mol_string.prototype.autofocus = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_string.prototype.hint = function () {
            return "";
        };
        $mol_string.prototype.type = function (val) {
            return (val !== void 0) ? val : "text";
        };
        $mol_string.prototype.field = function () {
            return (__assign({}, _super.prototype.field.call(this), { "disabled": this.disabled(), "value": this.value_changed(), "autofocus": this.autofocus(), "placeholder": this.hint(), "type": this.type() }));
        };
        $mol_string.prototype.event_change = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_string.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "input": function (event) { return _this.event_change(event); } }));
        };
        return $mol_string;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "value_changed", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "autofocus", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "event_change", null);
    $.$mol_string = $mol_string;
})($ || ($ = {}));
//string.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_string = (function (_super) {
            __extends($mol_string, _super);
            function $mol_string() {
                return _super.apply(this, arguments) || this;
            }
            $mol_string.prototype.event_change = function (next) {
                this.value(this.dom_node().value.trim());
            };
            $mol_string.prototype.disabled = function () {
                return !this.enabled();
            };
            return $mol_string;
        }($.$mol_string));
        $mol.$mol_string = $mol_string;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//string.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_row = (function (_super) {
        __extends($mol_row, _super);
        function $mol_row() {
            return _super.apply(this, arguments) || this;
        }
        $mol_row.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "minHeight": this.minimal_height() }));
        };
        return $mol_row;
    }($.$mol_view));
    $.$mol_row = $mol_row;
})($ || ($ = {}));
(function ($) {
    var $mol_row_sub = (function (_super) {
        __extends($mol_row_sub, _super);
        function $mol_row_sub() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_row_sub;
    }($.$mol_view));
    $.$mol_row_sub = $mol_row_sub;
})($ || ($ = {}));
//row.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_row = (function (_super) {
            __extends($mol_row, _super);
            function $mol_row() {
                return _super.apply(this, arguments) || this;
            }
            $mol_row.prototype.item_offsets_top = function () {
                var next = [];
                var sub = this.sub();
                if (!sub)
                    return next;
                var context = this.context_sub();
                var widthLimit = context.$mol_view_visible_width();
                var allHeight = 0;
                var rowWidth = 0;
                var row_height = 0;
                for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                    var child = sub_1[_i];
                    next.push(allHeight);
                    if (!(child instanceof $.$mol_view))
                        continue;
                    var width = child.minimal_width();
                    var height = child.minimal_height();
                    rowWidth += width;
                    if (rowWidth > widthLimit) {
                        allHeight += row_height;
                        rowWidth = width;
                        row_height = height;
                    }
                    else {
                        row_height = Math.max(row_height, height);
                    }
                }
                next.push(allHeight + row_height);
                return next;
            };
            $mol_row.prototype.sub_visible = function () {
                var sub = this.sub();
                var visible = [];
                var context = this.context_sub();
                var heightLimit = context.$mol_view_visible_height();
                var offsets = this.item_offsets_top();
                var height = 0;
                for (var i = 0; i < offsets.length - 1; ++i) {
                    if (offsets[i] > heightLimit)
                        break;
                    var child = sub[i];
                    if (child instanceof $.$mol_view) {
                        child.context(context);
                    }
                    visible.push(child);
                }
                return visible;
            };
            $mol_row.prototype.minimal_height = function () {
                var offsets = this.item_offsets_top();
                return offsets[offsets.length - 1];
            };
            return $mol_row;
        }($.$mol_row));
        __decorate([
            $.$mol_mem()
        ], $mol_row.prototype, "item_offsets_top", null);
        $mol.$mol_row = $mol_row;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//row.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_form = (function (_super) {
        __extends($mol_form, _super);
        function $mol_form() {
            return _super.apply(this, arguments) || this;
        }
        $mol_form.prototype.submit_blocked = function () {
            return false;
        };
        $mol_form.prototype.form_fields = function () {
            return [];
        };
        $mol_form.prototype.barFields = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.form_fields(); };
            });
        };
        $mol_form.prototype.buttons = function () {
            return [];
        };
        $mol_form.prototype.barButtons = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.buttons(); };
            });
        };
        $mol_form.prototype.sub = function () {
            return [].concat(this.barFields(), this.barButtons());
        };
        return $mol_form;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_form.prototype, "barFields", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form.prototype, "barButtons", null);
    $.$mol_form = $mol_form;
})($ || ($ = {}));
//form.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_form = (function (_super) {
            __extends($mol_form, _super);
            function $mol_form() {
                return _super.apply(this, arguments) || this;
            }
            $mol_form.prototype.submit_blocked = function () {
                return this.form_fields().some(function (field) { return field.errors().length !== 0; });
            };
            return $mol_form;
        }($.$mol_form));
        __decorate([
            $.$mol_mem()
        ], $mol_form.prototype, "submit_blocked", null);
        $mol.$mol_form = $mol_form;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//form.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_form_field = (function (_super) {
        __extends($mol_form_field, _super);
        function $mol_form_field() {
            return _super.apply(this, arguments) || this;
        }
        $mol_form_field.prototype.name = function () {
            return "";
        };
        $mol_form_field.prototype.namer = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.name()); };
            });
        };
        $mol_form_field.prototype.errors = function () {
            return [];
        };
        $mol_form_field.prototype.bider = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.errors(); };
            });
        };
        $mol_form_field.prototype.label = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.namer(), _this.bider()); };
            });
        };
        $mol_form_field.prototype.control = function () {
            return null;
        };
        $mol_form_field.prototype.sub = function () {
            return [].concat(this.label(), this.control());
        };
        return $mol_form_field;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_form_field.prototype, "namer", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_field.prototype, "bider", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_field.prototype, "label", null);
    $.$mol_form_field = $mol_form_field;
})($ || ($ = {}));
//field.view.tree.js.map
;
var $;
(function ($) {
    var $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));
//code.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_button = (function (_super) {
        __extends($mol_button, _super);
        function $mol_button() {
            return _super.apply(this, arguments) || this;
        }
        $mol_button.prototype.enabled = function () {
            return true;
        };
        $mol_button.prototype.event_click = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_button.prototype.event_activate = function (event) {
            return this.event_click(event);
        };
        $mol_button.prototype.evenet_key_press = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_button.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "click": function (event) { return _this.event_activate(event); }, "keypress": function (event) { return _this.evenet_key_press(event); } }));
        };
        $mol_button.prototype.disabled = function () {
            return false;
        };
        $mol_button.prototype.tab_index = function () {
            return "0";
        };
        $mol_button.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "disabled": this.disabled(), "role": "button", "tabindex": this.tab_index() }));
        };
        $mol_button.prototype.sub = function () {
            return [].concat(this.title());
        };
        return $mol_button;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_click", null);
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_activate", null);
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "evenet_key_press", null);
    $.$mol_button = $mol_button;
})($ || ($ = {}));
//button.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_button = (function (_super) {
            __extends($mol_button, _super);
            function $mol_button() {
                return _super.apply(this, arguments) || this;
            }
            $mol_button.prototype.disabled = function () {
                return !this.enabled();
            };
            $mol_button.prototype.event_activate = function (next) {
                if (!this.enabled())
                    return;
                this.event_click(next);
            };
            $mol_button.prototype.evenet_key_press = function (event) {
                if (event.keyCode === $.$mol_keyboard_code.enter)
                    return this.event_activate(event);
            };
            $mol_button.prototype.tab_index = function () {
                return this.enabled() ? _super.prototype.tab_index.call(this) : null;
            };
            return $mol_button;
        }($.$mol_button));
        $mol.$mol_button = $mol_button;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//button.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_button_major = (function (_super) {
        __extends($mol_button_major, _super);
        function $mol_button_major() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_button_major;
    }($.$mol_button));
    $.$mol_button_major = $mol_button_major;
})($ || ($ = {}));
(function ($) {
    var $mol_button_minor = (function (_super) {
        __extends($mol_button_minor, _super);
        function $mol_button_minor() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_button_minor;
    }($.$mol_button));
    $.$mol_button_minor = $mol_button_minor;
})($ || ($ = {}));
(function ($) {
    var $mol_button_danger = (function (_super) {
        __extends($mol_button_danger, _super);
        function $mol_button_danger() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_button_danger;
    }($.$mol_button));
    $.$mol_button_danger = $mol_button_danger;
})($ || ($ = {}));
//button_types.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_enter = (function (_super) {
        __extends($mol_app_inventory_enter, _super);
        function $mol_app_inventory_enter() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_enter.prototype.domain = function () {
            return new $.$mol_app_inventory_domain();
        };
        $mol_app_inventory_enter.prototype.entered = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_inventory_enter.prototype.loginLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "loginLabel");
        };
        $mol_app_inventory_enter.prototype.loginErrors = function () {
            return [];
        };
        $mol_app_inventory_enter.prototype.login = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_inventory_enter.prototype.loginControl = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.login(val); };
            });
        };
        $mol_app_inventory_enter.prototype.loginField = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.loginLabel(); };
                obj.errors = function () { return _this.loginErrors(); };
                obj.control = function () { return _this.loginControl(); };
            });
        };
        $mol_app_inventory_enter.prototype.passwordLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "passwordLabel");
        };
        $mol_app_inventory_enter.prototype.passwordErrors = function () {
            return [];
        };
        $mol_app_inventory_enter.prototype.password = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_inventory_enter.prototype.passControl = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.password(val); };
                obj.type = function () { return "password"; };
            });
        };
        $mol_app_inventory_enter.prototype.passwordField = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.passwordLabel(); };
                obj.errors = function () { return _this.passwordErrors(); };
                obj.control = function () { return _this.passControl(); };
            });
        };
        $mol_app_inventory_enter.prototype.submitLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "submitLabel");
        };
        $mol_app_inventory_enter.prototype.event_submit = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_app_inventory_enter.prototype.submit_blocked = function () {
            return false;
        };
        $mol_app_inventory_enter.prototype.submit = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.submitLabel()); };
                obj.event_click = function (event) { return _this.event_submit(event); };
                obj.disabled = function () { return _this.submit_blocked(); };
            });
        };
        $mol_app_inventory_enter.prototype.form = function () {
            var _this = this;
            return new $.$mol_form().setup(function (obj) {
                obj.form_fields = function () { return [].concat(_this.loginField(), _this.passwordField()); };
                obj.buttons = function () { return [].concat(_this.submit()); };
            });
        };
        $mol_app_inventory_enter.prototype.message = function () {
            return "";
        };
        $mol_app_inventory_enter.prototype.sub = function () {
            return [].concat(this.form(), this.message());
        };
        $mol_app_inventory_enter.prototype.messageNoAccess = function () {
            return $.$mol_locale.text(this.locale_contexts(), "messageNoAccess");
        };
        return $mol_app_inventory_enter;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "domain", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "entered", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "login", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "loginControl", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "loginField", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "password", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "passControl", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "passwordField", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "event_submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "form", null);
    $.$mol_app_inventory_enter = $mol_app_inventory_enter;
})($ || ($ = {}));
//enter.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_inventory_enter = (function (_super) {
            __extends($mol_app_inventory_enter, _super);
            function $mol_app_inventory_enter() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_inventory_enter.prototype.event_submit = function () {
                this.domain().credentials({
                    login: this.login(),
                    password: this.password(),
                });
            };
            $mol_app_inventory_enter.prototype.message = function () {
                var domain = this.domain();
                if (domain.credentials() && !domain.authentificated()) {
                    return this.messageNoAccess();
                }
                return '';
            };
            return $mol_app_inventory_enter;
        }($.$mol_app_inventory_enter));
        $mol.$mol_app_inventory_enter = $mol_app_inventory_enter;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//enter.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_scroll = (function (_super) {
        __extends($mol_scroll, _super);
        function $mol_scroll() {
            return _super.apply(this, arguments) || this;
        }
        $mol_scroll.prototype.minimal_height = function () {
            return 0;
        };
        $mol_scroll.prototype.scroll_top = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_left = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.field = function () {
            return (__assign({}, _super.prototype.field.call(this), { "scrollTop": this.scroll_top(), "scrollLeft": this.scroll_left() }));
        };
        $mol_scroll.prototype.event_scroll = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_scroll.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "scroll": function (event) { return _this.event_scroll(event); }, "overflow": function (event) { return _this.event_scroll(event); }, "underflow": function (event) { return _this.event_scroll(event); } }));
        };
        return $mol_scroll;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_top", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_left", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "event_scroll", null);
    $.$mol_scroll = $mol_scroll;
})($ || ($ = {}));
//scroll.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_view_context.$mol_scroll_scroll_top = function () { return 0; };
    $.$mol_view_context.$mol_scroll_scroll_left = function () { return 0; };
    $.$mol_view_context.$mol_scroll_moving = function () { return false; };
})($ || ($ = {}));
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_scroll = (function (_super) {
            __extends($mol_scroll, _super);
            function $mol_scroll() {
                return _super.apply(this, arguments) || this;
            }
            $mol_scroll.prototype.scroll_top = function (next) {
                return $.$mol_state_session.value(this + ".scroll_top()", next) || 0;
            };
            $mol_scroll.prototype.scroll_left = function (next) {
                return $.$mol_state_session.value(this + ".scroll_left()", next) || 0;
            };
            $mol_scroll.prototype.scroll_bottom = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.scroll_right = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.event_scroll = function (next) {
                var _this = this;
                this.moving(true);
                new $.$mol_defer(function () {
                    var el = _this.dom_node();
                    _this.scroll_top(Math.max(0, el.scrollTop));
                    _this.scroll_left(Math.max(0, el.scrollLeft));
                    _this.scroll_bottom(Math.max(0, el.scrollHeight - el.scrollTop - el.offsetHeight));
                    _this.scroll_right(Math.max(0, el.scrollWidth - el.scrollLeft - el.offsetWidth));
                });
            };
            $mol_scroll.prototype.moving = function (next) {
                var _this = this;
                if (next) {
                    setTimeout(function () {
                        _this.moving(false);
                    });
                }
                return next || false;
            };
            $mol_scroll.prototype.context_sub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_view_visible_height = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_height();
                    return _this.scroll_top() + Math.min(sizeWin.height, limit);
                };
                subContext.$mol_view_visible_width = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_width();
                    return _this.scroll_left() + Math.min(sizeWin.width, limit);
                };
                subContext.$mol_scroll_scroll_top = function () { return _this.scroll_top(); };
                subContext.$mol_scroll_scroll_left = function () { return _this.scroll_left(); };
                subContext.$mol_scroll_moving = function () { return _this.moving(); };
                return subContext;
            };
            return $mol_scroll;
        }($.$mol_scroll));
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "scroll_bottom", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "scroll_right", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "moving", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "context_sub", null);
        $mol.$mol_scroll = $mol_scroll;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//scroll.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_page = (function (_super) {
        __extends($mol_page, _super);
        function $mol_page() {
            return _super.apply(this, arguments) || this;
        }
        $mol_page.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_page.prototype.head = function () {
            return [].concat(this.Title());
        };
        $mol_page.prototype.Head = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.head(); };
            });
        };
        $mol_page.prototype.body = function () {
            return [];
        };
        $mol_page.prototype.Body = function () {
            var _this = this;
            return new $.$mol_scroll().setup(function (obj) {
                obj.sub = function () { return _this.body(); };
            });
        };
        $mol_page.prototype.foot = function () {
            return [];
        };
        $mol_page.prototype.Foot = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.foot(); };
            });
        };
        $mol_page.prototype.sub = function () {
            return [].concat(this.Head(), this.Body(), this.Foot());
        };
        return $mol_page;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Head", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Body", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Foot", null);
    $.$mol_page = $mol_page;
})($ || ($ = {}));
//page.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_bar = (function (_super) {
        __extends($mol_bar, _super);
        function $mol_bar() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_bar;
    }($.$mol_view));
    $.$mol_bar = $mol_bar;
})($ || ($ = {}));
//bar.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_svg = (function (_super) {
        __extends($mol_svg, _super);
        function $mol_svg() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg.prototype.dom_name = function () {
            return "svg";
        };
        $mol_svg.prototype.dom_name_space = function () {
            return "http://www.w3.org/2000/svg";
        };
        return $mol_svg;
    }($.$mol_view));
    $.$mol_svg = $mol_svg;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_root = (function (_super) {
        __extends($mol_svg_root, _super);
        function $mol_svg_root() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg_root.prototype.dom_name = function () {
            return "svg";
        };
        $mol_svg_root.prototype.viewBox = function () {
            return "0 0 100 100 ";
        };
        $mol_svg_root.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "viewBox": this.viewBox() }));
        };
        return $mol_svg_root;
    }($.$mol_view));
    $.$mol_svg_root = $mol_svg_root;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_path = (function (_super) {
        __extends($mol_svg_path, _super);
        function $mol_svg_path() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg_path.prototype.dom_name = function () {
            return "path";
        };
        $mol_svg_path.prototype.geometry = function () {
            return "";
        };
        $mol_svg_path.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "d": this.geometry() }));
        };
        return $mol_svg_path;
    }($.$mol_svg));
    $.$mol_svg_path = $mol_svg_path;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_circle = (function (_super) {
        __extends($mol_svg_circle, _super);
        function $mol_svg_circle() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg_circle.prototype.dom_name = function () {
            return "circle";
        };
        $mol_svg_circle.prototype.radius = function () {
            return "";
        };
        $mol_svg_circle.prototype.pos_x = function () {
            return "";
        };
        $mol_svg_circle.prototype.pos_y = function () {
            return "";
        };
        $mol_svg_circle.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "r": this.radius(), "cx": this.pos_x(), "cy": this.pos_y() }));
        };
        return $mol_svg_circle;
    }($.$mol_svg));
    $.$mol_svg_circle = $mol_svg_circle;
})($ || ($ = {}));
//svg.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_icon = (function (_super) {
        __extends($mol_icon, _super);
        function $mol_icon() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon.prototype.viewBox = function () {
            return "0 0 24 24";
        };
        $mol_icon.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "viewBox": this.viewBox() }));
        };
        $mol_icon.prototype.path = function () {
            return "";
        };
        $mol_icon.prototype.pather = function () {
            var _this = this;
            return new $.$mol_svg_path().setup(function (obj) {
                obj.geometry = function () { return _this.path(); };
            });
        };
        $mol_icon.prototype.sub = function () {
            return [].concat(this.pather());
        };
        return $mol_icon;
    }($.$mol_svg));
    __decorate([
        $.$mol_mem()
    ], $mol_icon.prototype, "pather", null);
    $.$mol_icon = $mol_icon;
})($ || ($ = {}));
//icon.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_minus = (function (_super) {
        __extends($mol_icon_minus, _super);
        function $mol_icon_minus() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon_minus.prototype.path = function () {
            return "M19 13H5v-2h14v2z";
        };
        return $mol_icon_minus;
    }($.$mol_icon));
    $.$mol_icon_minus = $mol_icon_minus;
})($ || ($ = {}));
//minus.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_plus = (function (_super) {
        __extends($mol_icon_plus, _super);
        function $mol_icon_plus() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon_plus.prototype.path = function () {
            return "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z";
        };
        return $mol_icon_plus;
    }($.$mol_icon));
    $.$mol_icon_plus = $mol_icon_plus;
})($ || ($ = {}));
//plus.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_number = (function (_super) {
        __extends($mol_number, _super);
        function $mol_number() {
            return _super.apply(this, arguments) || this;
        }
        $mol_number.prototype.precision = function () {
            return 1;
        };
        $mol_number.prototype.precision_view = function () {
            return this.precision();
        };
        $mol_number.prototype.precision_change = function () {
            return this.precision();
        };
        $mol_number.prototype.value = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_number.prototype.event_wheel = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_number.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "wheel": function (val) { return _this.event_wheel(val); } }));
        };
        $mol_number.prototype.event_dec = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_number.prototype.enabled = function () {
            return true;
        };
        $mol_number.prototype.dec_enabled = function () {
            return this.enabled();
        };
        $mol_number.prototype.dec_icon = function () {
            return new $.$mol_icon_minus();
        };
        $mol_number.prototype.Dec = function () {
            var _this = this;
            return new $.$mol_button().setup(function (obj) {
                obj.event_click = function (val) { return _this.event_dec(val); };
                obj.enabled = function () { return _this.dec_enabled(); };
                obj.sub = function () { return [].concat(_this.dec_icon()); };
            });
        };
        $mol_number.prototype.value_string = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_number.prototype.hint = function () {
            return "";
        };
        $mol_number.prototype.string_enabled = function () {
            return this.enabled();
        };
        $mol_number.prototype.String = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.type = function () { return "number"; };
                obj.value = function (val) { return _this.value_string(val); };
                obj.hint = function () { return _this.hint(); };
                obj.enabled = function () { return _this.string_enabled(); };
            });
        };
        $mol_number.prototype.event_inc = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_number.prototype.inc_enabled = function () {
            return this.enabled();
        };
        $mol_number.prototype.inc_icon = function () {
            return new $.$mol_icon_plus();
        };
        $mol_number.prototype.Inc = function () {
            var _this = this;
            return new $.$mol_button().setup(function (obj) {
                obj.event_click = function (val) { return _this.event_inc(val); };
                obj.enabled = function () { return _this.inc_enabled(); };
                obj.sub = function () { return [].concat(_this.inc_icon()); };
            });
        };
        $mol_number.prototype.sub = function () {
            return [].concat(this.Dec(), this.String(), this.Inc());
        };
        return $mol_number;
    }($.$mol_bar));
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "event_wheel", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "event_dec", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "dec_icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "Dec", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "value_string", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "String", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "event_inc", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "inc_icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "Inc", null);
    $.$mol_number = $mol_number;
})($ || ($ = {}));
//number.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_number = (function (_super) {
            __extends($mol_number, _super);
            function $mol_number() {
                return _super.apply(this, arguments) || this;
            }
            $mol_number.prototype.event_dec = function (next) {
                this.value(this.value() - this.precision_change());
            };
            $mol_number.prototype.event_inc = function (next) {
                this.value(Number(this.value()) + this.precision_change());
            };
            $mol_number.prototype.value_string = function (next) {
                if (next !== void 0) {
                    this.value(next === '' ? null : Number(next));
                }
                var precisionView = this.precision_view();
                var value = next ? Number(next) : this.value();
                if (value === null)
                    return '';
                if (precisionView >= 1) {
                    return (value / precisionView).toFixed();
                }
                else {
                    var fixedNumber = Math.log(1 / precisionView) / Math.log(10);
                    return value.toFixed(fixedNumber);
                }
            };
            $mol_number.prototype.event_wheel = function (next) {
                next.preventDefault();
                if (next.wheelDelta < 0 && this.inc_enabled())
                    this.event_inc(next);
                if (next.wheelDelta > 0 && this.dec_enabled())
                    this.event_dec(next);
            };
            return $mol_number;
        }($.$mol_number));
        $mol.$mol_number = $mol_number;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//number.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check = (function (_super) {
        __extends($mol_check, _super);
        function $mol_check() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check.prototype.checked = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_check.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_check_checked": this.checked(), "aria-checked": this.checked(), "role": "checkbox" }));
        };
        $mol_check.prototype.Icon = function () {
            return null;
        };
        $mol_check.prototype.label = function () {
            return [];
        };
        $mol_check.prototype.Label = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.label()); };
            });
        };
        $mol_check.prototype.sub = function () {
            return [].concat(this.Icon(), this.Label());
        };
        return $mol_check;
    }($.$mol_button));
    __decorate([
        $.$mol_mem()
    ], $mol_check.prototype, "checked", null);
    __decorate([
        $.$mol_mem()
    ], $mol_check.prototype, "Label", null);
    $.$mol_check = $mol_check;
})($ || ($ = {}));
//check.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_check = (function (_super) {
            __extends($mol_check, _super);
            function $mol_check() {
                return _super.apply(this, arguments) || this;
            }
            $mol_check.prototype.event_click = function (next) {
                this.checked(!this.checked());
            };
            return $mol_check;
        }($.$mol_check));
        $mol.$mol_check = $mol_check;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//check.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_switch = (function (_super) {
        __extends($mol_switch, _super);
        function $mol_switch() {
            return _super.apply(this, arguments) || this;
        }
        $mol_switch.prototype.minimal_height = function () {
            return 44;
        };
        $mol_switch.prototype.option_checked = function (id, val) {
            return (val !== void 0) ? val : false;
        };
        $mol_switch.prototype.option_title = function (id) {
            return "";
        };
        $mol_switch.prototype.enabled = function () {
            return true;
        };
        $mol_switch.prototype.option_enabled = function (id) {
            return this.enabled();
        };
        $mol_switch.prototype.Option = function (id) {
            var _this = this;
            return new $.$mol_check().setup(function (obj) {
                obj.checked = function (val) { return _this.option_checked(id, val); };
                obj.label = function () { return [].concat(_this.option_title(id)); };
                obj.enabled = function () { return _this.option_enabled(id); };
            });
        };
        $mol_switch.prototype.value = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_switch.prototype.options = function () {
            return ({});
        };
        $mol_switch.prototype.items = function () {
            return [];
        };
        $mol_switch.prototype.sub = function () {
            return this.items();
        };
        return $mol_switch;
    }($.$mol_view));
    __decorate([
        $.$mol_mem_key()
    ], $mol_switch.prototype, "option_checked", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_switch.prototype, "Option", null);
    __decorate([
        $.$mol_mem()
    ], $mol_switch.prototype, "value", null);
    $.$mol_switch = $mol_switch;
})($ || ($ = {}));
//switch.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_switch = (function (_super) {
            __extends($mol_switch, _super);
            function $mol_switch() {
                return _super.apply(this, arguments) || this;
            }
            $mol_switch.prototype.value = function (next) {
                return $.$mol_state_session.value(this + ".value()", next);
            };
            $mol_switch.prototype.options = function () {
                return {};
            };
            $mol_switch.prototype.items = function () {
                var _this = this;
                return Object.keys(this.options()).map(function (key) { return _this.Option(key); });
            };
            $mol_switch.prototype.option_title = function (key) {
                return this.options()[key];
            };
            $mol_switch.prototype.option_checked = function (key, next) {
                if (next === void 0)
                    return this.value() === key;
                this.value(next ? key : null);
            };
            return $mol_switch;
        }($.$mol_switch));
        __decorate([
            $.$mol_mem()
        ], $mol_switch.prototype, "items", null);
        $mol.$mol_switch = $mol_switch;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//switch.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_position = (function (_super) {
        __extends($mol_app_inventory_position, _super);
        function $mol_app_inventory_position() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_position.prototype.position = function () {
            return null;
        };
        $mol_app_inventory_position.prototype.title = function () {
            return "";
        };
        $mol_app_inventory_position.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_app_inventory_position.prototype.description = function () {
            return "";
        };
        $mol_app_inventory_position.prototype.Description = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.description()); };
            });
        };
        $mol_app_inventory_position.prototype.Product = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Title(), _this.Description()); };
            });
        };
        $mol_app_inventory_position.prototype.count_editable = function () {
            return true;
        };
        $mol_app_inventory_position.prototype.count = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_app_inventory_position.prototype.Count = function () {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.enabled = function () { return _this.count_editable(); };
                obj.value = function (val) { return _this.count(val); };
            });
        };
        $mol_app_inventory_position.prototype.status = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_inventory_position.prototype.status_label_pending = function () {
            return $.$mol_locale.text(this.locale_contexts(), "status_label_pending");
        };
        $mol_app_inventory_position.prototype.status_label_approved = function () {
            return $.$mol_locale.text(this.locale_contexts(), "status_label_approved");
        };
        $mol_app_inventory_position.prototype.status_label_rejected = function () {
            return $.$mol_locale.text(this.locale_contexts(), "status_label_rejected");
        };
        $mol_app_inventory_position.prototype.Status = function () {
            var _this = this;
            return new $.$mol_switch().setup(function (obj) {
                obj.value = function (val) { return _this.status(val); };
                obj.options = function () { return ({
                    "pending": _this.status_label_pending(),
                    "approved": _this.status_label_approved(),
                    "rejected": _this.status_label_rejected(),
                }); };
            });
        };
        $mol_app_inventory_position.prototype.sub = function () {
            return [].concat(this.Product(), this.Count(), this.Status());
        };
        return $mol_app_inventory_position;
    }($.$mol_row));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "Description", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "Product", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "count", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "Count", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "status", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "Status", null);
    $.$mol_app_inventory_position = $mol_app_inventory_position;
})($ || ($ = {}));
//position.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_inventory_position = (function (_super) {
            __extends($mol_app_inventory_position, _super);
            function $mol_app_inventory_position() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_inventory_position.prototype.position = function () {
                return new $.$mol_app_inventory_domain_position();
            };
            $mol_app_inventory_position.prototype.title = function () {
                return this.position().product().title();
            };
            $mol_app_inventory_position.prototype.description = function () {
                return this.position().product().description();
            };
            $mol_app_inventory_position.prototype.count = function (next) {
                return this.position().count(next);
            };
            $mol_app_inventory_position.prototype.status = function (next) {
                return this.position().status(next);
            };
            return $mol_app_inventory_position;
        }($.$mol_app_inventory_position));
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_position.prototype, "position", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_position.prototype, "status", null);
        $mol.$mol_app_inventory_position = $mol_app_inventory_position;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//position.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_controller = (function (_super) {
        __extends($mol_app_inventory_controller, _super);
        function $mol_app_inventory_controller() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_controller.prototype.domain = function () {
            return new $.$mol_app_inventory_domain();
        };
        $mol_app_inventory_controller.prototype.position_rows = function () {
            return [];
        };
        $mol_app_inventory_controller.prototype.body = function () {
            return this.position_rows();
        };
        $mol_app_inventory_controller.prototype.position = function (id) {
            return null;
        };
        $mol_app_inventory_controller.prototype.Position_row = function (id) {
            var _this = this;
            return new $.$mol_app_inventory_position().setup(function (obj) {
                obj.count_editable = function () { return false; };
                obj.position = function () { return _this.position(id); };
            });
        };
        $mol_app_inventory_controller.prototype.event_sweep = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_app_inventory_controller.prototype.submit_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "submit_label");
        };
        $mol_app_inventory_controller.prototype.Sweep = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.event_click = function (event) { return _this.event_sweep(event); };
                obj.sub = function () { return [].concat(_this.submit_label()); };
            });
        };
        $mol_app_inventory_controller.prototype.Controls_row = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Sweep()); };
            });
        };
        $mol_app_inventory_controller.prototype.foot = function () {
            return [].concat(this.Controls_row());
        };
        return $mol_app_inventory_controller;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller.prototype, "domain", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_inventory_controller.prototype, "Position_row", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller.prototype, "event_sweep", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller.prototype, "Sweep", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller.prototype, "Controls_row", null);
    $.$mol_app_inventory_controller = $mol_app_inventory_controller;
})($ || ($ = {}));
//controller.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_inventory_controller = (function (_super) {
            __extends($mol_app_inventory_controller, _super);
            function $mol_app_inventory_controller() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_inventory_controller.prototype.position = function (id) {
                return this.domain().position(id);
            };
            $mol_app_inventory_controller.prototype.position_rows = function () {
                var _this = this;
                return this.positions().map(function (position) { return _this.Position_row(position.id()); });
            };
            $mol_app_inventory_controller.prototype.positions = function () {
                return this.domain().positions().filter(function (position) {
                    switch (position.status()) {
                        case 'pending': return true;
                        case 'rejected': return true;
                        case 'approved': return true;
                    }
                    return false;
                });
            };
            $mol_app_inventory_controller.prototype.event_sweep = function (next) {
                this.positions().forEach(function (position) {
                    if (position.status() === 'approved') {
                        position.status('completed');
                    }
                });
            };
            return $mol_app_inventory_controller;
        }($.$mol_app_inventory_controller));
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_controller.prototype, "position_rows", null);
        $mol.$mol_app_inventory_controller = $mol_app_inventory_controller;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//controller.view.js.map
;
var cordova;
var $;
(function ($) {
    $.$mol_cordova = cordova || {
        plugins: {
            barcodeScanner: null
        }
    };
    function $mol_cordova_camera() {
        return navigator['camera'];
    }
    $.$mol_cordova_camera = $mol_cordova_camera;
})($ || ($ = {}));
//cordova.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_code = (function (_super) {
        __extends($mol_code, _super);
        function $mol_code() {
            return _super.apply(this, arguments) || this;
        }
        $mol_code.prototype.value = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_code.prototype.format = function () {
            return "";
        };
        $mol_code.prototype.hint = function () {
            return this.format();
        };
        $mol_code.prototype.Manual = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.value(val); };
                obj.hint = function () { return _this.hint(); };
            });
        };
        $mol_code.prototype.event_scan = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_code.prototype.scan_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "scan_label");
        };
        $mol_code.prototype.Scan = function () {
            var _this = this;
            return new $.$mol_button().setup(function (obj) {
                obj.event_click = function (val) { return _this.event_scan(val); };
                obj.sub = function () { return [].concat(_this.scan_label()); };
            });
        };
        $mol_code.prototype.sub = function () {
            return [].concat(this.Manual(), this.Scan());
        };
        return $mol_code;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "Manual", null);
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "event_scan", null);
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "Scan", null);
    $.$mol_code = $mol_code;
})($ || ($ = {}));
//code.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_code = (function (_super) {
            __extends($mol_code, _super);
            function $mol_code() {
                return _super.apply(this, arguments) || this;
            }
            $mol_code.prototype.scan_support = function () {
                return Boolean($.$mol_cordova.plugins.barcodeScanner);
            };
            $mol_code.prototype.Scan = function () {
                return this.scan_support() ? _super.prototype.Scan.call(this) : null;
            };
            $mol_code.prototype.event_scan = function () {
                var _this = this;
                $.$mol_cordova.plugins.barcodeScanner.scan(function (result) {
                    if (result.cancelled)
                        return;
                    _this.value(result.text);
                }, function (error) {
                    alert("Scanning failed: " + error);
                });
            };
            return $mol_code;
        }($.$mol_code));
        $mol.$mol_code = $mol_code;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//code.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_keeper = (function (_super) {
        __extends($mol_app_inventory_keeper, _super);
        function $mol_app_inventory_keeper() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_keeper.prototype.domain = function () {
            return new $.$mol_app_inventory_domain();
        };
        $mol_app_inventory_keeper.prototype.position_rows = function () {
            return [];
        };
        $mol_app_inventory_keeper.prototype.body = function () {
            return this.position_rows();
        };
        $mol_app_inventory_keeper.prototype.position = function (id) {
            return null;
        };
        $mol_app_inventory_keeper.prototype.Position_row = function (id) {
            var _this = this;
            return new $.$mol_app_inventory_position().setup(function (obj) {
                obj.Status = function () { return null; };
                obj.position = function () { return _this.position(id); };
            });
        };
        $mol_app_inventory_keeper.prototype.code_new = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_inventory_keeper.prototype.code_new_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "code_new_hint");
        };
        $mol_app_inventory_keeper.prototype.Code = function () {
            var _this = this;
            return new $.$mol_code().setup(function (obj) {
                obj.value = function (val) { return _this.code_new(val); };
                obj.hint = function () { return _this.code_new_hint(); };
            });
        };
        $mol_app_inventory_keeper.prototype.event_submit = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_app_inventory_keeper.prototype.submit_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "submit_label");
        };
        $mol_app_inventory_keeper.prototype.Submit = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.event_click = function (event) { return _this.event_submit(event); };
                obj.sub = function () { return [].concat(_this.submit_label()); };
            });
        };
        $mol_app_inventory_keeper.prototype.Action_row = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Code(), _this.Submit()); };
            });
        };
        $mol_app_inventory_keeper.prototype.foot = function () {
            return [].concat(this.Action_row());
        };
        return $mol_app_inventory_keeper;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper.prototype, "domain", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_inventory_keeper.prototype, "Position_row", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper.prototype, "code_new", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper.prototype, "Code", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper.prototype, "event_submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper.prototype, "Submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper.prototype, "Action_row", null);
    $.$mol_app_inventory_keeper = $mol_app_inventory_keeper;
})($ || ($ = {}));
//keeper.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_inventory_keeper = (function (_super) {
            __extends($mol_app_inventory_keeper, _super);
            function $mol_app_inventory_keeper() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_inventory_keeper.prototype.position = function (id) {
                return this.domain().position(id);
            };
            $mol_app_inventory_keeper.prototype.code_new = function (next) {
                if (next === void 0)
                    return '';
                var domain = this.domain();
                var product = domain.product_by_code(next);
                if (!product)
                    return next;
                var position = domain.position_by_product_id(product.id());
                position.count(position.count() + 1);
                return '';
            };
            $mol_app_inventory_keeper.prototype.position_rows = function () {
                var _this = this;
                return this.positions().map(function (position) { return _this.Position_row(position.id()); });
            };
            $mol_app_inventory_keeper.prototype.positions = function () {
                return this.domain().positions().filter(function (position) {
                    switch (position.status()) {
                        case 'draft': return true;
                        case 'rejected': return true;
                    }
                    return false;
                });
            };
            $mol_app_inventory_keeper.prototype.event_submit = function (next) {
                this.positions().forEach(function (position) {
                    position.status('pending');
                });
            };
            return $mol_app_inventory_keeper;
        }($.$mol_app_inventory_keeper));
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper.prototype, "code_new", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper.prototype, "position_rows", null);
        $mol.$mol_app_inventory_keeper = $mol_app_inventory_keeper;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//keeper.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_stats = (function (_super) {
        __extends($mol_app_inventory_stats, _super);
        function $mol_app_inventory_stats() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_stats.prototype.domain = function () {
            return new $.$mol_app_inventory_domain();
        };
        return $mol_app_inventory_stats;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_stats.prototype, "domain", null);
    $.$mol_app_inventory_stats = $mol_app_inventory_stats;
})($ || ($ = {}));
//stats.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory = (function (_super) {
        __extends($mol_app_inventory, _super);
        function $mol_app_inventory() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory.prototype.domain = function () {
            return new $.$mol_app_inventory_domain();
        };
        $mol_app_inventory.prototype.Page = function () {
            return null;
        };
        $mol_app_inventory.prototype.sub = function () {
            return [].concat(this.Page());
        };
        $mol_app_inventory.prototype.can_write_off = function () {
            return false;
        };
        $mol_app_inventory.prototype.can_approve = function () {
            return false;
        };
        $mol_app_inventory.prototype.Head = function () {
            var _this = this;
            return new $.$mol_app_inventory_head().setup(function (obj) {
                obj.keeper_show = function () { return _this.can_write_off(); };
                obj.control_show = function () { return _this.can_approve(); };
            });
        };
        $mol_app_inventory.prototype.Enter = function () {
            var _this = this;
            return new $.$mol_app_inventory_enter().setup(function (obj) {
                obj.domain = function () { return _this.domain(); };
            });
        };
        $mol_app_inventory.prototype.Controller = function () {
            var _this = this;
            return new $.$mol_app_inventory_controller().setup(function (obj) {
                obj.Head = function () { return _this.Head(); };
                obj.domain = function () { return _this.domain(); };
            });
        };
        $mol_app_inventory.prototype.Keeper = function () {
            var _this = this;
            return new $.$mol_app_inventory_keeper().setup(function (obj) {
                obj.Head = function () { return _this.Head(); };
                obj.domain = function () { return _this.domain(); };
            });
        };
        $mol_app_inventory.prototype.Stats = function () {
            var _this = this;
            return new $.$mol_app_inventory_stats().setup(function (obj) {
                obj.Head = function () { return _this.Head(); };
                obj.domain = function () { return _this.domain(); };
            });
        };
        return $mol_app_inventory;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory.prototype, "domain", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory.prototype, "Head", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory.prototype, "Enter", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory.prototype, "Controller", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory.prototype, "Keeper", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory.prototype, "Stats", null);
    $.$mol_app_inventory = $mol_app_inventory;
})($ || ($ = {}));
(function ($) {
    var $mol_app_inventory_head = (function (_super) {
        __extends($mol_app_inventory_head, _super);
        function $mol_app_inventory_head() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_head.prototype.keeper_show = function () {
            return false;
        };
        $mol_app_inventory_head.prototype.control_show = function () {
            return false;
        };
        $mol_app_inventory_head.prototype.keeper_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "keeper_label");
        };
        $mol_app_inventory_head.prototype.Keeper_link = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.arg = function () { return ({
                    "page": "keeper",
                }); };
                obj.sub = function () { return [].concat(_this.keeper_label()); };
            });
        };
        $mol_app_inventory_head.prototype.control_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "control_label");
        };
        $mol_app_inventory_head.prototype.Control_link = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.arg = function () { return ({
                    "page": "controller",
                }); };
                obj.sub = function () { return [].concat(_this.control_label()); };
            });
        };
        $mol_app_inventory_head.prototype.stats_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "stats_label");
        };
        $mol_app_inventory_head.prototype.Stats_link = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.arg = function () { return ({
                    "page": "stats",
                }); };
                obj.sub = function () { return [].concat(_this.stats_label()); };
            });
        };
        $mol_app_inventory_head.prototype.sub = function () {
            return [].concat(this.Keeper_link(), this.Control_link(), this.Stats_link());
        };
        return $mol_app_inventory_head;
    }($.$mol_row));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_head.prototype, "Keeper_link", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_head.prototype, "Control_link", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_head.prototype, "Stats_link", null);
    $.$mol_app_inventory_head = $mol_app_inventory_head;
})($ || ($ = {}));
//inventory.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_inventory = (function (_super) {
            __extends($mol_app_inventory, _super);
            function $mol_app_inventory() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_inventory.prototype.Page = function () {
                if (!this.domain().authentificated()) {
                    return this.Enter();
                }
                switch (this.page_name()) {
                    case 'keeper': return this.Keeper();
                    case 'controller': return this.Controller();
                    case 'stats': return this.Stats();
                }
                if (this.can_write_off())
                    return this.Keeper();
                if (this.can_approve())
                    return this.Controller();
                return null;
            };
            $mol_app_inventory.prototype.page_name = function (next) {
                return $.$mol_state_arg.value(this.state_key('page'), next) || '';
            };
            $mol_app_inventory.prototype.can_write_off = function () {
                return this.domain().can_write_off();
            };
            $mol_app_inventory.prototype.can_approve = function () {
                return this.domain().can_approve();
            };
            return $mol_app_inventory;
        }($.$mol_app_inventory));
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory.prototype, "page_name", null);
        $mol.$mol_app_inventory = $mol_app_inventory;
        var $mol_app_inventory_head = (function (_super) {
            __extends($mol_app_inventory_head, _super);
            function $mol_app_inventory_head() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_inventory_head.prototype.sub = function () {
                return [
                    this.keeper_show() ? this.Keeper_link() : null,
                    this.control_show() ? this.Control_link() : null,
                ];
            };
            return $mol_app_inventory_head;
        }($.$mol_app_inventory_head));
        $mol.$mol_app_inventory_head = $mol_app_inventory_head;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//inventory.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_unit = (function (_super) {
        __extends($mol_unit, _super);
        function $mol_unit(value) {
            var _this = _super.call(this) || this;
            _this['valueOf()'] = value;
            return _this;
        }
        $mol_unit.prototype.prefix = function () {
            return '';
        };
        $mol_unit.prototype.postfix = function () {
            return '';
        };
        $mol_unit.prototype.valueOf = function () {
            return this['valueOf()'];
        };
        $mol_unit.prototype.delimiter = function () {
            return ' ';
        };
        $mol_unit.prototype.value_view = function () {
            return String(this.valueOf()).split(/(?=(?:...)+$)/).join(this.delimiter());
        };
        $mol_unit.prototype.toString = function () {
            return this.prefix() + this.value_view() + this.postfix();
        };
        $mol_unit.summ = function (a, b) {
            var Class = a.Class();
            if (Class !== b.Class())
                throw new Error("Not same measure: " + Class + " , " + b.Class());
            return new Class(a.valueOf() + b.valueOf());
        };
        $mol_unit.prototype.mult = function (m) {
            var Class = this.Class();
            return new Class(this.valueOf() * m);
        };
        return $mol_unit;
    }($.$mol_object));
    $.$mol_unit = $mol_unit;
})($ || ($ = {}));
//unit.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_unit_money = (function (_super) {
        __extends($mol_unit_money, _super);
        function $mol_unit_money() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_unit_money;
    }($.$mol_unit));
    $.$mol_unit_money = $mol_unit_money;
    var $mol_unit_money_usd = (function (_super) {
        __extends($mol_unit_money_usd, _super);
        function $mol_unit_money_usd() {
            return _super.apply(this, arguments) || this;
        }
        $mol_unit_money_usd.prototype.prefix = function () {
            return '$';
        };
        return $mol_unit_money_usd;
    }($mol_unit_money));
    $.$mol_unit_money_usd = $mol_unit_money_usd;
    var $mol_unit_money_rur = (function (_super) {
        __extends($mol_unit_money_rur, _super);
        function $mol_unit_money_rur() {
            return _super.apply(this, arguments) || this;
        }
        $mol_unit_money_rur.prototype.postfix = function () {
            return ' ₽';
        };
        return $mol_unit_money_rur;
    }($mol_unit_money));
    $.$mol_unit_money_rur = $mol_unit_money_rur;
})($ || ($ = {}));
//money.js.map
;
var $jin = this.$jin = {}

;
var $jin;
(function ($jin) {
    function concater(funcs) {
        switch (funcs.length) {
            case 0:
                return function (value) { return value; };
            case 1:
                return funcs[0];
            default:
                var mid = Math.ceil(funcs.length / 2);
                var first = $jin.concater(funcs.slice(0, mid));
                var second = $jin.concater(funcs.slice(mid));
                return function (value) {
                    return first(value) + second(value);
                };
        }
    }
    $jin.concater = concater;
})($jin || ($jin = {}));
//jin-concater.js.map
;
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var base_class = (function () {
            function base_class() {
            }
            base_class.formatter = function (pattern) {
                var _this = this;
                if (this.patterns[pattern])
                    return this.patterns[pattern];
                var tokens = Object.keys(this.patterns)
                    .sort()
                    .reverse()
                    .map(function (token) { return token.replace(/([-+*.\[\]()\^])/g, '\\$1'); });
                var lexer = RegExp('(.*?)(' + tokens.join('|') + '|$)', 'g');
                var funcs = [];
                pattern.replace(lexer, function (str, text, token) {
                    if (text)
                        funcs.push(function () { return text; });
                    if (token)
                        funcs.push(_this.patterns[token]);
                    return str;
                });
                return this.patterns[pattern] = $jin.concater(funcs);
            };
            base_class.prototype.toString = function (pattern) {
                var Base = this.constructor;
                var formatter = Base.formatter(pattern);
                return formatter.call(Base, this);
            };
            return base_class;
        }());
        base_class.patterns = {};
        time.base_class = base_class;
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//base.js.map
;
function $jin_type(value) {
    var str = {}.toString.apply(value);
    var type = str.substring(8, str.length - 1);
    if (['Window', 'global'].indexOf(type) >= 0)
        type = 'Global';
    return type;
}
//type.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var duration_class = (function (_super) {
            __extends(duration_class, _super);
            function duration_class(config) {
                var _this = _super.call(this) || this;
                _this._year = config.year && Number(config.year) || 0;
                _this._month = config.month && Number(config.month) || 0;
                _this._day = config.day && Number(config.day) || 0;
                _this._hour = config.hour && Number(config.hour) || 0;
                _this._minute = config.minute && Number(config.minute) || 0;
                _this._second = config.second && Number(config.second) || 0;
                return _this;
            }
            duration_class.make = function (duration) {
                if (!arguments.length)
                    duration = [];
                var type = $jin_type(duration);
                switch (type) {
                    case 'Number':
                        return new this({ second: duration / 1000 });
                    case 'Array':
                        var dur = duration;
                        return new this({
                            year: dur[0],
                            month: dur[1],
                            day: dur[2],
                            hour: dur[3],
                            minute: dur[4],
                            second: dur[5],
                        });
                    case 'Object':
                        if (duration instanceof this)
                            return duration;
                        return new this(duration);
                    case 'String':
                        if (duration === 'Z') {
                            return new this({});
                        }
                        var parser = /^P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                        var found = parser.exec(duration);
                        if (found) {
                            return new this({
                                year: found[1],
                                month: found[2],
                                day: found[3],
                                hour: found[4],
                                minute: found[5],
                                second: found[6],
                            });
                        }
                        var parser = /^[+-](\d\d)(?::?(\d\d))?$/i;
                        var found = parser.exec(duration);
                        if (found) {
                            return new this({
                                hour: found[1],
                                minute: found[2],
                            });
                        }
                        throw new Error('Can not parse time duration (' + duration + ')');
                    default:
                        throw new Error('Wrong type of time duration (' + type + ')');
                }
            };
            Object.defineProperty(duration_class.prototype, "year", {
                get: function () { return this._year; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "month", {
                get: function () { return this._month; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "day", {
                get: function () { return this._day; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "hour", {
                get: function () { return this._hour; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "minute", {
                get: function () { return this._minute; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "second", {
                get: function () { return this._second; },
                enumerable: true,
                configurable: true
            });
            duration_class.prototype.summ = function (config) {
                var Duration = this.constructor;
                var duration = Duration.make(config);
                return new Duration({
                    year: this.year + duration.year,
                    month: this.month + duration.month,
                    day: this.day + duration.day,
                    hour: this.hour + duration.hour,
                    minute: this.minute + duration.minute,
                    second: this.second + duration.second,
                });
            };
            duration_class.prototype.sub = function (config) {
                var Duration = this.constructor;
                var duration = Duration.make(config);
                return new Duration({
                    year: this.year - duration.year,
                    month: this.month - duration.month,
                    day: this.day - duration.day,
                    hour: this.hour - duration.hour,
                    minute: this.minute - duration.minute,
                    second: this.second - duration.second,
                });
            };
            duration_class.prototype.valueOf = function () {
                var day = this.year * 365 + this.month * 30.4 + this.day;
                var second = ((day * 24 + this.hour) * 60 + this.minute) * 60 + this.second;
                return second * 1000;
            };
            duration_class.prototype.toJSON = function () { return this.toString(); };
            duration_class.prototype.toString = function (pattern) {
                if (pattern === void 0) { pattern = 'P#Y#M#DT#h#m#s'; }
                return _super.prototype.toString.call(this, pattern);
            };
            return duration_class;
        }($jin.time.base_class));
        duration_class.patterns = {
            '#Y': function (duration) {
                if (!duration.year)
                    return '';
                return duration.year + 'Y';
            },
            '#M': function (duration) {
                if (!duration.month)
                    return '';
                return duration.month + 'M';
            },
            '#D': function (duration) {
                if (!duration.day)
                    return '';
                return duration.day + 'D';
            },
            '#h': function (duration) {
                if (!duration.hour)
                    return '';
                return duration.hour + 'H';
            },
            '#m': function (duration) {
                if (!duration.minute)
                    return '';
                return duration.minute + 'M';
            },
            '#s': function (duration) {
                if (!duration.second)
                    return '';
                return duration.second + 'S';
            },
            '+hh': function (duration) {
                var hour = duration.hour;
                var sign = '+';
                if (hour < 0) {
                    sign = '-';
                    hour = -hour;
                }
                return (hour < 10)
                    ? (sign + '0' + hour)
                    : (sign + hour);
            },
            'mm': function (duration) {
                return (duration.minute < 10)
                    ? ('0' + duration.minute)
                    : String(duration.minute);
            },
        };
        time.duration_class = duration_class;
        time.duration = duration_class.make.bind(duration_class);
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//duration.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var moment_class = (function (_super) {
            __extends(moment_class, _super);
            function moment_class(config) {
                var _this = _super.call(this) || this;
                _this._year = config.year && Number(config.year);
                _this._month = config.month && Number(config.month);
                _this._day = config.day && Number(config.day);
                _this._hour = config.hour && Number(config.hour);
                _this._minute = config.minute && Number(config.minute);
                _this._second = config.second && Number(config.second);
                _this._offset = config.offset && _this.constructor.duration_class.make(config.offset);
                _this._native = null;
                return _this;
            }
            moment_class.make = function (moment) {
                if (!arguments.length)
                    moment = new Date;
                var type = $jin_type(moment);
                switch (type) {
                    case 'Number':
                        moment = new Date(moment);
                    case 'Date':
                        var native = moment;
                        var offset = -native.getTimezoneOffset();
                        return new this({
                            year: native.getFullYear(),
                            month: native.getMonth(),
                            day: native.getDate() - 1,
                            hour: native.getHours(),
                            minute: native.getMinutes(),
                            second: native.getSeconds() + native.getMilliseconds() / 1000,
                            offset: {
                                hour: (offset < 0) ? Math.ceil(offset / 60) : Math.floor(offset / 60),
                                minute: offset % 60
                            }
                        });
                    case 'String':
                        var parsed = /^(?:(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d))?)?)?(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d(?:\.\d\d\d)?))?)?(Z|[\+\-]\d\d(?::?(?:\d\d)?)?)?)?$/.exec(moment);
                        if (!parsed)
                            throw new Error('Can not parse time moment (' + moment + ')');
                        return new this({
                            year: parsed[1],
                            month: parsed[2] ? (Number(parsed[2]) - 1) : void 0,
                            day: parsed[3] ? (Number(parsed[3]) - 1) : void 0,
                            hour: parsed[4],
                            minute: parsed[5],
                            second: parsed[6],
                            offset: parsed[7]
                        });
                    case 'Array':
                        var mom = moment;
                        return new this({
                            year: mom[0],
                            month: mom[1],
                            day: mom[2],
                            hour: mom[3],
                            minute: mom[4],
                            second: mom[5],
                            offset: mom[6],
                        });
                    case 'Object':
                        if (moment instanceof this)
                            return moment;
                        return new this(moment);
                    default:
                        throw new Error('Wrong type of time moment (' + type + ')');
                }
            };
            Object.defineProperty(moment_class.prototype, "year", {
                get: function () { return this._year; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "month", {
                get: function () { return this._month; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "day", {
                get: function () { return this._day; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "hour", {
                get: function () { return this._hour; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "minute", {
                get: function () { return this._minute; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "second", {
                get: function () { return this._second; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "offset", {
                get: function () { return this._offset; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "native", {
                get: function () {
                    if (this._native)
                        return this._native;
                    var utc = this.toOffset('Z');
                    return this._native = new Date(Date.UTC(utc.year || 0, utc.month || 0, (utc.day || 0) + 1, utc.hour || 0, utc.minute || 0, utc.second && Math.ceil(utc.second) || 0, utc.second && (utc.second - Math.ceil(utc.second)) || 0));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "normal", {
                get: function () {
                    return this.constructor.make(this.native).merge({
                        year: (this._year === void 0) ? null : void 0,
                        month: (this._month === void 0) ? null : void 0,
                        day: (this._day === void 0) ? null : void 0,
                        hour: (this._hour === void 0) ? null : void 0,
                        minute: (this._minute === void 0) ? null : void 0,
                        second: (this._second === void 0) ? null : void 0,
                        offset: (this._offset === void 0) ? null : void 0,
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "weekDay", {
                get: function () {
                    return this.native.getDay();
                },
                enumerable: true,
                configurable: true
            });
            moment_class.prototype.merge = function (config) {
                var Moment = this.constructor;
                var moment = Moment.make(config);
                return new Moment({
                    year: (moment.year === void 0)
                        ? this._year
                        : (moment.year === null)
                            ? void 0
                            : moment.year,
                    month: (moment.month === void 0)
                        ? this._month
                        : (moment.month === null)
                            ? void 0
                            : moment.month,
                    day: (moment.day === void 0)
                        ? this._day
                        : (moment.day === null)
                            ? void 0
                            : moment.day,
                    hour: (moment.hour === void 0)
                        ? this._hour
                        : (moment.hour === null)
                            ? void 0
                            : moment.hour,
                    minute: (moment.minute === void 0)
                        ? this._minute
                        : (moment.minute === null)
                            ? void 0
                            : moment.minute,
                    second: (moment.second === void 0)
                        ? this._second
                        : (moment.second === null)
                            ? void 0
                            : moment.second,
                    offset: (moment.offset === void 0)
                        ? this._offset
                        : (moment.offset === null)
                            ? void 0
                            : moment.offset,
                });
            };
            moment_class.prototype.shift = function (config) {
                var Moment = this.constructor;
                var duration = Moment.duration_class.make(config);
                var moment = Moment.make().merge(this);
                var second = moment.second + duration.second;
                var native = new Date(moment.year + duration.year, moment.month + duration.month, moment.day + duration.day + 1, moment.hour + duration.hour, moment.minute + duration.minute, Math.floor(second), (second - Math.floor(second)) * 1000);
                if (isNaN(native.valueOf()))
                    throw new Error('Wrong time');
                return new Moment({
                    year: (this._year === void 0) ? void 0 : native.getFullYear(),
                    month: (this._month === void 0) ? void 0 : native.getMonth(),
                    day: (this._day === void 0) ? void 0 : native.getDate() - 1,
                    hour: (this._hour === void 0) ? void 0 : native.getHours(),
                    minute: (this._minute === void 0) ? void 0 : native.getMinutes(),
                    second: (this._second === void 0) ? void 0 : native.getSeconds() + native.getMilliseconds() / 1000,
                    offset: this.offset,
                });
            };
            moment_class.prototype.sub = function (config) {
                var Moment = this.constructor;
                var moment = Moment.make(config);
                var dur = {
                    year: (moment.year === void 0)
                        ? this.year
                        : (this.year || 0) - moment.year,
                    month: (moment.month === void 0)
                        ? this.month
                        : (this.month || 0) - moment.month,
                    day: (moment.day === void 0)
                        ? this.day
                        : (this.day || 0) - moment.day,
                    hour: (moment.hour === void 0)
                        ? this.hour
                        : (this.hour || 0) - moment.hour,
                    minute: (moment.minute === void 0)
                        ? this.minute
                        : (this.minute || 0) - moment.minute,
                    second: (moment.second === void 0)
                        ? this.second
                        : (this.second || 0) - moment.second,
                };
                return new Moment.duration_class(dur);
            };
            moment_class.prototype.toOffset = function (duration) {
                if (this._offset) {
                    var Moment = this.constructor;
                    return this
                        .shift(Moment.duration_class.make(duration).sub(this._offset))
                        .merge({ offset: duration });
                }
                else {
                    return this.merge({ offset: duration });
                }
            };
            moment_class.prototype.valueOf = function () { return this.native.getTime(); };
            moment_class.prototype.toJSON = function () { return this.toString(); };
            moment_class.prototype.toString = function (pattern) {
                if (pattern === void 0) { pattern = 'YYYY-MM-DDThh:mm:ss.sssZ'; }
                return _super.prototype.toString.call(this, pattern);
            };
            return moment_class;
        }($jin.time.base_class));
        moment_class.duration_class = $jin.time.duration_class;
        moment_class.patterns = {
            'YYYY': function (moment) {
                if (moment.year == null)
                    return '';
                return String(moment.year);
            },
            'AD': function (moment) {
                if (moment.year == null)
                    return '';
                return String(Math.floor(moment.year / 100) + 1);
            },
            'YY': function (moment) {
                if (moment.year == null)
                    return '';
                return String(moment.year % 100);
            },
            'Month': function (moment) {
                if (moment.month == null)
                    return '';
                return moment.constructor.monthLong[moment.month];
            },
            'Mon': function (moment) {
                if (moment.month == null)
                    return '';
                return moment.constructor.monthShort[moment.month];
            },
            '-MM': function (moment) {
                if (moment.month == null)
                    return '';
                return '-' + moment.constructor.patterns['MM'](moment);
            },
            'MM': function (moment) {
                if (moment.month == null)
                    return '';
                var month = moment.month + 1;
                return (month < 10)
                    ? ('0' + month)
                    : ('' + month);
            },
            'M': function (moment) {
                if (moment.month == null)
                    return '';
                return String(moment.month + 1);
            },
            'WeekDay': function (moment) {
                if (moment.weekDay == null)
                    return '';
                return moment.constructor.weekDayLong[moment.weekDay];
            },
            'WD': function (moment) {
                if (moment.weekDay == null)
                    return '';
                return moment.constructor.weekDayShort[moment.weekDay];
            },
            '-DD': function (moment) {
                if (moment.day == null)
                    return '';
                return '-' + moment.constructor.patterns['DD'](moment);
            },
            'DD': function (moment) {
                if (moment.day == null)
                    return '';
                var day = moment.day + 1;
                return (day < 10)
                    ? ('0' + day)
                    : String(day);
            },
            'D': function (moment) {
                if (moment.day == null)
                    return '';
                return String(moment.day + 1);
            },
            'Thh': function (moment) {
                if (moment.hour == null)
                    return '';
                return 'T' + moment.constructor.patterns['hh'](moment);
            },
            'hh': function (moment) {
                if (moment.hour == null)
                    return '';
                return (moment.hour < 10)
                    ? ('0' + moment.hour)
                    : String(moment.hour);
            },
            'h': function (moment) {
                if (moment.hour == null)
                    return '';
                return String(moment.hour);
            },
            ':mm': function (moment) {
                if (moment.minute == null)
                    return '';
                return ':' + moment.constructor.patterns['mm'](moment);
            },
            'mm': function (moment) {
                if (moment.minute == null)
                    return '';
                return (moment.minute < 10)
                    ? ('0' + moment.minute)
                    : String(moment.minute);
            },
            'm': function (moment) {
                if (moment.minute == null)
                    return '';
                return String(moment.minute);
            },
            ':ss': function (moment) {
                if (moment.second == null)
                    return '';
                return ':' + moment.constructor.patterns['ss'](moment);
            },
            'ss': function (moment) {
                if (moment.second == null)
                    return '';
                var second = Math.floor(moment.second);
                return (second < 10)
                    ? ('0' + second)
                    : String(second);
            },
            's': function (moment) {
                if (moment.second == null)
                    return '';
                return String(Math.floor(moment.second));
            },
            '.sss': function (moment) {
                if (moment.second == null)
                    return '';
                if (moment.second - Math.floor(moment.second) === 0)
                    return '';
                return '.' + moment.constructor.patterns['sss'](moment);
            },
            'sss': function (moment) {
                if (moment.second == null)
                    return '';
                var millisecond = Math.floor((moment.second - Math.floor(moment.second)) * 1000);
                return (millisecond < 10)
                    ? ('00' + millisecond)
                    : (millisecond < 100)
                        ? ('0' + millisecond)
                        : String(millisecond);
            },
            'Z': function (moment) {
                var offset = moment.offset;
                if (!offset)
                    return '';
                return offset.toString('+hh:mm');
            }
        };
        moment_class.monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        moment_class.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        moment_class.weekDayLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        moment_class.weekDayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        time.moment_class = moment_class;
        time.moment = moment_class.make.bind(moment_class);
        time.moment['en'] = moment_class.make.bind(moment_class);
        var moment_class_ru = (function (_super) {
            __extends(moment_class_ru, _super);
            function moment_class_ru() {
                return _super.apply(this, arguments) || this;
            }
            return moment_class_ru;
        }(moment_class));
        moment_class_ru.monthLong = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        moment_class_ru.monthShort = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        moment_class_ru.weekDayLong = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        moment_class_ru.weekDayShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        time.moment_class_ru = moment_class_ru;
        time.moment['ru'] = moment_class_ru.make.bind(moment_class_ru);
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//moment.js.map
;
var $;
(function ($) {
    function $mol_stub_select_random(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    $.$mol_stub_select_random = $mol_stub_select_random;
    function $mol_stub_strings(prefix, count, length) {
        if (prefix === void 0) { prefix = ''; }
        if (count === void 0) { count = 10; }
        if (length === void 0) { length = 10; }
        if (prefix.length >= length)
            return [];
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('');
        var strings = [];
        for (var i = 0; i < count; i++) {
            var text = prefix;
            for (var j = prefix.length; j < length; j++) {
                text += $mol_stub_select_random(possible);
            }
            strings.push(text);
        }
        return strings;
    }
    $.$mol_stub_strings = $mol_stub_strings;
    function $mol_stub_code(length) {
        if (length === void 0) { length = 8; }
        var max = Math.pow(16, length);
        var min = Math.pow(16, length - 1);
        var value = min + Math.floor(Math.random() * (max - min));
        return value.toString(16).toUpperCase();
    }
    $.$mol_stub_code = $mol_stub_code;
    function $mol_stub_price(max) {
        if (max === void 0) { max = 1000; }
        var min = Math.floor(max / 16 / 16);
        var value = min + Math.floor(Math.random() * (max - min));
        return new $.$mol_unit_money_usd(value);
    }
    $.$mol_stub_price = $mol_stub_price;
    function $mol_stub_product_name() {
        var name = $mol_stub_select_random([
            'Monitor 15"',
            'Monitor 17"',
            'Monitor 19"',
            'Graphics card',
            'Frame grabber card'
        ]);
        var port = $mol_stub_select_random(['D-SUB', 'DVI', 'HDMI']);
        var resolution = $mol_stub_select_random(['VGA', 'Full HD', '4K']);
        return [name, port, resolution].join(', ');
    }
    $.$mol_stub_product_name = $mol_stub_product_name;
    function $mol_stub_company_name_big() {
        var product = $mol_stub_select_random(['Everything', 'Something', 'Anything', 'Nothing']);
        var type = $mol_stub_select_random(['Company', 'Corporation', 'Holding']);
        return "A " + type + " that makes " + product;
    }
    $.$mol_stub_company_name_big = $mol_stub_company_name_big;
    function $mol_stub_company_name_small() {
        return $mol_stub_select_random(['ACME inc.', 'Dream Company', 'Just Company']);
    }
    $.$mol_stub_company_name_small = $mol_stub_company_name_small;
    function $mol_stub_company_name() {
        return $mol_stub_select_random([$mol_stub_company_name_small, $mol_stub_company_name_big])();
    }
    $.$mol_stub_company_name = $mol_stub_company_name;
    function $mol_stub_person_name() {
        var first = $mol_stub_select_random(['Ivan', 'Petr', 'Sidor']);
        var last = $mol_stub_select_random(['Ivanov', 'Petrov', 'Sidorov']);
        return first + " " + last;
    }
    $.$mol_stub_person_name = $mol_stub_person_name;
    function $mol_stub_city() {
        return $mol_stub_select_random(['Moscow', 'London', 'Washington', 'Buenos Aires']);
    }
    $.$mol_stub_city = $mol_stub_city;
    function $mol_stub_time(maxShift) {
        if (maxShift === void 0) { maxShift = 60 * 24 * 365; }
        return $jin.time.moment().shift({ minute: Math.round(Math.random() * maxShift) });
    }
    $.$mol_stub_time = $mol_stub_time;
})($ || ($ = {}));
//stub.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_domain_mock = (function (_super) {
        __extends($mol_app_inventory_domain_mock, _super);
        function $mol_app_inventory_domain_mock() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_domain_mock.prototype.products_table = function () {
            return [
                {
                    R_MATERIAL_ID: '01',
                    R_NAME: $.$mol_stub_product_name(),
                    R_BARCODE: '12345',
                }
            ];
        };
        $mol_app_inventory_domain_mock.prototype.positions_table = function (next) {
            var table = $.$mol_state_local.value('positions') || [];
            if (next === void 0)
                return table;
            var index = table.length;
            next.forEach(function (row) {
                if (!row.R_MOVEMENT_ID)
                    row.R_MOVEMENT_ID = String(index++);
            });
            table = table.filter(function (row) {
                return next.some(function (row2) { return row.R_MOVEMENT_ID === row2.R_MOVEMENT_ID; });
            });
            table = table.concat(next);
            return $.$mol_state_local.value('positions', next);
        };
        $mol_app_inventory_domain_mock.prototype.authentificated = function () {
            var creds = this.credentials();
            if (!creds)
                return false;
            if (creds.login && creds.password)
                return true;
            return false;
        };
        $mol_app_inventory_domain_mock.prototype.message = function () {
            return '';
        };
        return $mol_app_inventory_domain_mock;
    }($.$mol_app_inventory_domain));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain_mock.prototype, "positions_table", null);
    $.$mol_app_inventory_domain_mock = $mol_app_inventory_domain_mock;
})($ || ($ = {}));
//mock.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_demo = (function (_super) {
        __extends($mol_app_inventory_demo, _super);
        function $mol_app_inventory_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_demo.prototype.domain = function () {
            return new $.$mol_app_inventory_domain_mock();
        };
        return $mol_app_inventory_demo;
    }($.$mol_app_inventory));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_demo.prototype, "domain", null);
    $.$mol_app_inventory_demo = $mol_app_inventory_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
//# sourceMappingURL=web.js.map