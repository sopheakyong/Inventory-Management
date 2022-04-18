(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@nicky-lenaers/ngx-scroll-to', ['exports', '@angular/core', '@angular/common', 'rxjs'], factory) :
    (global = global || self, factory((global['nicky-lenaers'] = global['nicky-lenaers'] || {}, global['nicky-lenaers']['ngx-scroll-to'] = {}), global.ng.core, global.ng.common, global.rxjs));
}(this, (function (exports, core, common, rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /** Default values for Component Input */
    var DEFAULTS = {
        target: null,
        action: 'click',
        duration: 650,
        easing: 'easeInOutQuad',
        offset: 0,
        offsetMap: new Map()
    };
    var ɵ0 = function (time) {
        return time * time;
    }, ɵ1 = function (time) {
        return time * (2 - time);
    }, ɵ2 = function (time) {
        return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
    }, ɵ3 = function (time) {
        return time * time * time;
    }, ɵ4 = function (time) {
        return (--time) * time * time + 1;
    }, ɵ5 = function (time) {
        return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
    }, ɵ6 = function (time) {
        return time * time * time * time;
    }, ɵ7 = function (time) {
        return 1 - (--time) * time * time * time;
    }, ɵ8 = function (time) {
        return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time;
    }, ɵ9 = function (time) {
        return time * time * time * time * time;
    }, ɵ10 = function (time) {
        return 1 + (--time) * time * time * time * time;
    }, ɵ11 = function (time) {
        return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time;
    }, ɵ12 = function (time) {
        return Math.pow(2, -10 * time) * Math.sin((time - 1 / 4) * (2 * Math.PI) / 1) + 1;
    };
    /** Easing Colleciton */
    var EASING = {
        easeInQuad: ɵ0,
        easeOutQuad: ɵ1,
        easeInOutQuad: ɵ2,
        easeInCubic: ɵ3,
        easeOutCubic: ɵ4,
        easeInOutCubic: ɵ5,
        easeInQuart: ɵ6,
        easeOutQuart: ɵ7,
        easeInOutQuart: ɵ8,
        easeInQuint: ɵ9,
        easeOutQuint: ɵ10,
        easeInOutQuint: ɵ11,
        easeOutElastic: ɵ12
    };
    /**
     * Set of allowed events as triggers
     * for the Animation to start.
     */
    var EVENTS = [
        'click',
        'mouseenter',
        'mouseover',
        'mousedown',
        'mouseup',
        'dblclick',
        'contextmenu',
        'wheel',
        'mouseleave',
        'mouseout'
    ];
    /**
     * Strip hash (#) from value.
     *
     * @param value 				The given string value
     * @returns 					The stripped string value
     */
    function stripHash(value) {
        return value.substring(0, 1) === '#' ? value.substring(1) : value;
    }
    /**
     * Test if a given value is a string.
     *
     * @param value 					The given value
     * @returns 						Whether the given value is a string
     */
    function isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    /**
     * Test if a given Element is the Window.
     *
     * @param container 				The given Element
     * @returns 						Whether the given Element is Window
     */
    function isWindow(container) {
        return container === window;
    }
    /**
     * Test if a given value is of type ElementRef.
     *
     * @param value 					The given value
     * @returns               Whether the given value is a number
     */
    function isElementRef(value) {
        return value instanceof core.ElementRef;
    }
    /**
     * Whether or not the given value is a Native Element.
     *
     * @param value           The given value
     * @returns               Whether or not the value is a Native Element
     */
    function isNativeElement(value) {
        return value instanceof HTMLElement;
    }
    /**
     * Test if a given value is type number.
     *
     * @param value 					The given value
     * @returns 						Whether the given value is a number
     */
    function isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    /** Scroll To Animation */
    var ScrollToAnimation = /** @class */ (function () {
        /**
         * Class Constructor.
         *
         * @param container            The Container
         * @param listenerTarget       The Element that listens for DOM Events
         * @param isWindow             Whether or not the listener is the Window
         * @param to                   Position to scroll to
         * @param options              Additional options for scrolling
         * @param isBrowser            Whether or not execution runs in the browser
         *                              (as opposed to the server)
         */
        function ScrollToAnimation(container, listenerTarget, isWindow, to, options, isBrowser) {
            var _this = this;
            this.container = container;
            this.listenerTarget = listenerTarget;
            this.isWindow = isWindow;
            this.to = to;
            this.options = options;
            this.isBrowser = isBrowser;
            /** Recursively loop over the Scroll Animation */
            this.loop = function () {
                _this.timeLapsed += _this.tick;
                _this.percentage = (_this.timeLapsed / _this.options.duration);
                _this.percentage = (_this.percentage > 1) ? 1 : _this.percentage;
                // Position Update
                _this.position = _this.startPosition +
                    ((_this.startPosition - _this.to <= 0 ? 1 : -1) *
                        _this.distance *
                        EASING[_this.options.easing](_this.percentage));
                if (_this.lastPosition !== null && _this.position === _this.lastPosition) {
                    _this.stop();
                }
                else {
                    _this.source$.next(_this.position);
                    _this.isWindow
                        ? _this.listenerTarget.scrollTo(0, Math.floor(_this.position))
                        : _this.container.scrollTop = Math.floor(_this.position);
                    _this.lastPosition = _this.position;
                }
            };
            this.tick = 16;
            this.interval = null;
            this.lastPosition = null;
            this.timeLapsed = 0;
            this.windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (!this.container) {
                this.startPosition = this.windowScrollTop;
            }
            else {
                this.startPosition = this.isWindow ? this.windowScrollTop : this.container.scrollTop;
            }
            // Correction for Starting Position of nested HTML Elements
            if (this.container && !this.isWindow) {
                this.to = this.to - this.container.getBoundingClientRect().top + this.startPosition;
            }
            // Set Distance
            var directionalDistance = this.startPosition - this.to;
            this.distance = this.container ? Math.abs(this.startPosition - this.to) : this.to;
            this.mappedOffset = this.options.offset;
            // Set offset from Offset Map
            if (this.isBrowser) {
                this.options
                    .offsetMap
                    .forEach(function (value, key) { return _this.mappedOffset = window.innerWidth > key ? value : _this.mappedOffset; });
            }
            this.distance += this.mappedOffset * (directionalDistance <= 0 ? 1 : -1);
            this.source$ = new rxjs.ReplaySubject();
        }
        /**
         * Start the new Scroll Animation.
         *
         * @returns         Observable containing a number
         */
        ScrollToAnimation.prototype.start = function () {
            clearInterval(this.interval);
            this.interval = setInterval(this.loop, this.tick);
            return this.source$.asObservable();
        };
        /**
         * Stop the current Scroll Animation Loop.
         *
         * @param force          Force to stop the Animation Loop
         * @returns               Void
         */
        ScrollToAnimation.prototype.stop = function () {
            clearInterval(this.interval);
            this.interval = null;
            this.source$.complete();
        };
        return ScrollToAnimation;
    }());

    /**
     * The Scroll To Service handles starting, interrupting
     * and ending the actual Scroll Animation. It provides
     * some utilities to find the proper HTML Element on a
     * given page to setup Event Listeners and calculate
     * distances for the Animation.
     */
    var ScrollToService = /** @class */ (function () {
        /**
         * Construct and setup required paratemeters.
         *
         * @param document         A Reference to the Document
         * @param platformId       Angular Platform ID
         */
        function ScrollToService(document, platformId) {
            this.document = document;
            this.platformId = platformId;
            this.interruptiveEvents = ['mousewheel', 'DOMMouseScroll', 'touchstart'];
        }
        /**
         * Target an Element to scroll to. Notice that the `TimeOut` decorator
         * ensures the executing to take place in the next Angular lifecycle.
         * This allows for scrolling to elements that are e.g. initially hidden
         * by means of `*ngIf`, but ought to be scrolled to eventually.
         *
         * @todo type 'any' in Observable should become custom type like 'ScrollToEvent' (base class), see issue comment:
         *  - https://github.com/nicky-lenaers/ngx-scroll-to/issues/10#issuecomment-317198481
         *
         * @param options         Configuration Object
         * @returns               Observable
         */
        ScrollToService.prototype.scrollTo = function (options) {
            if (!common.isPlatformBrowser(this.platformId)) {
                return new rxjs.ReplaySubject().asObservable();
            }
            return this.start(options);
        };
        /**
         * Start a new Animation.
         *
         * @todo Emit proper events from subscription
         *
         * @param options         Configuration Object
         * @returns               Observable
         */
        ScrollToService.prototype.start = function (options) {
            var _this = this;
            // Merge config with default values
            var mergedConfigOptions = __assign(__assign({}, DEFAULTS), options);
            if (this.animation) {
                this.animation.stop();
            }
            var targetNode = this.getNode(mergedConfigOptions.target);
            if (mergedConfigOptions.target && !targetNode) {
                return rxjs.throwError('Unable to find Target Element');
            }
            var container = this.getContainer(mergedConfigOptions, targetNode);
            if (mergedConfigOptions.container && !container) {
                return rxjs.throwError('Unable to find Container Element');
            }
            var listenerTarget = this.getListenerTarget(container) || window;
            var to = container ? container.getBoundingClientRect().top : 0;
            if (targetNode) {
                to = isWindow(listenerTarget) ?
                    window.scrollY + targetNode.getBoundingClientRect().top :
                    targetNode.getBoundingClientRect().top;
            }
            // Create Animation
            this.animation = new ScrollToAnimation(container, listenerTarget, isWindow(listenerTarget), to, mergedConfigOptions, common.isPlatformBrowser(this.platformId));
            var onInterrupt = function () { return _this.animation.stop(); };
            this.addInterruptiveEventListeners(listenerTarget, onInterrupt);
            // Start Animation
            var animation$ = this.animation.start();
            this.subscribeToAnimation(animation$, listenerTarget, onInterrupt);
            return animation$;
        };
        /**
         * Subscribe to the events emitted from the Scrolling
         * Animation. Events might be used for e.g. unsubscribing
         * once finished.
         *
         * @param animation$              The Animation Observable
         * @param listenerTarget          The Listener Target for events
         * @param onInterrupt             The handler for Interruptive Events
         * @returns                       Void
         */
        ScrollToService.prototype.subscribeToAnimation = function (animation$, listenerTarget, onInterrupt) {
            var _this = this;
            var subscription = animation$
                .subscribe(function () {
            }, function () {
            }, function () {
                _this.removeInterruptiveEventListeners(_this.interruptiveEvents, listenerTarget, onInterrupt);
                subscription.unsubscribe();
            });
        };
        /**
         * Get the container HTML Element in which
         * the scrolling should happen.
         *
         * @param options         The Merged Configuration Object
         * @param targetNode    the targeted HTMLElement
         */
        ScrollToService.prototype.getContainer = function (options, targetNode) {
            var container = null;
            if (options.container) {
                container = this.getNode(options.container, true);
            }
            else if (targetNode) {
                container = this.getFirstScrollableParent(targetNode);
            }
            return container;
        };
        /**
         * Add listeners for the Animation Interruptive Events
         * to the Listener Target.
         *
         * @param events            List of events to listen to
         * @param listenerTarget    Target to attach the listener on
         * @param handler           Handler for when the listener fires
         * @returns                 Void
         */
        ScrollToService.prototype.addInterruptiveEventListeners = function (listenerTarget, handler) {
            var _this = this;
            if (!listenerTarget) {
                listenerTarget = window;
            }
            this.interruptiveEvents
                .forEach(function (event) { return listenerTarget
                .addEventListener(event, handler, _this.supportPassive() ? { passive: true } : false); });
        };
        /**
         * Feature-detect support for passive event listeners.
         *
         * @returns       Whether or not passive event listeners are supported
         */
        ScrollToService.prototype.supportPassive = function () {
            var supportsPassive = false;
            try {
                var opts = Object.defineProperty({}, 'passive', {
                    get: function () {
                        supportsPassive = true;
                    }
                });
                window.addEventListener('testPassive', null, opts);
                window.removeEventListener('testPassive', null, opts);
            }
            catch (e) {
            }
            return supportsPassive;
        };
        /**
         * Remove listeners for the Animation Interrupt Event from
         * the Listener Target. Specifying the correct handler prevents
         * memory leaks and makes the allocated memory available for
         * Garbage Collection.
         *
         * @param events            List of Interruptive Events to remove
         * @param listenerTarget    Target to attach the listener on
         * @param handler           Handler for when the listener fires
         * @returns                 Void
         */
        ScrollToService.prototype.removeInterruptiveEventListeners = function (events, listenerTarget, handler) {
            if (!listenerTarget) {
                listenerTarget = window;
            }
            events.forEach(function (event) { return listenerTarget.removeEventListener(event, handler); });
        };
        /**
         * Find the first scrollable parent Node of a given
         * Element. The DOM Tree gets searched upwards
         * to find this first scrollable parent. Parents might
         * be ignored by CSS styles applied to the HTML Element.
         *
         * @param nativeElement     The Element to search the DOM Tree upwards from
         * @returns                 The first scrollable parent HTML Element
         */
        ScrollToService.prototype.getFirstScrollableParent = function (nativeElement) {
            var style = window.getComputedStyle(nativeElement);
            var overflowRegex = /(auto|scroll|overlay)/;
            if (style.position === 'fixed') {
                return null;
            }
            var parent = nativeElement;
            while (parent.parentElement) {
                parent = parent.parentElement;
                style = window.getComputedStyle(parent);
                if (style.position === 'absolute'
                    || style.overflow === 'hidden'
                    || style.overflowY === 'hidden') {
                    continue;
                }
                if (overflowRegex.test(style.overflow + style.overflowY)
                    || parent.tagName === 'BODY') {
                    return parent;
                }
            }
            return null;
        };
        /**
         * Get the Target Node to scroll to.
         *
         * @param id              The given ID of the node, either a string or
         *                        an element reference
         * @param allowBodyTag    Indicate whether or not the Document Body is
         *                        considered a valid Target Node
         * @returns               The Target Node to scroll to
         */
        ScrollToService.prototype.getNode = function (id, allowBodyTag) {
            if (allowBodyTag === void 0) { allowBodyTag = false; }
            var targetNode;
            if (isString(id)) {
                if (allowBodyTag && (id === 'body' || id === 'BODY')) {
                    targetNode = this.document.body;
                }
                else {
                    targetNode = this.document.getElementById(stripHash(id));
                }
            }
            else if (isNumber(id)) {
                targetNode = this.document.getElementById(String(id));
            }
            else if (isElementRef(id)) {
                targetNode = id.nativeElement;
            }
            else if (isNativeElement(id)) {
                targetNode = id;
            }
            return targetNode;
        };
        /**
         * Retrieve the Listener target. This Listener Target is used
         * to attach Event Listeners on. In case of the target being
         * the Document Body, we need the actual `window` to listen
         * for events.
         *
         * @param container           The HTML Container element
         * @returns                   The Listener Target to attach events on
         */
        ScrollToService.prototype.getListenerTarget = function (container) {
            if (!container) {
                return null;
            }
            return this.isDocumentBody(container) ? window : container;
        };
        /**
         * Test if a given HTML Element is the Document Body.
         *
         * @param element             The given HTML Element
         * @returns                   Whether or not the Element is the
         *                            Document Body Element
         */
        ScrollToService.prototype.isDocumentBody = function (element) {
            return element.tagName.toUpperCase() === 'BODY';
        };
        ScrollToService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
        ]; };
        ScrollToService = __decorate([
            core.Injectable(),
            __param(0, core.Inject(common.DOCUMENT)),
            __param(1, core.Inject(core.PLATFORM_ID))
        ], ScrollToService);
        return ScrollToService;
    }());

    var ScrollToDirective = /** @class */ (function () {
        function ScrollToDirective(elementRef, scrollToService, renderer2) {
            this.elementRef = elementRef;
            this.scrollToService = scrollToService;
            this.renderer2 = renderer2;
            this.ngxScrollTo = DEFAULTS.target;
            this.ngxScrollToEvent = DEFAULTS.action;
            this.ngxScrollToDuration = DEFAULTS.duration;
            this.ngxScrollToEasing = DEFAULTS.easing;
            this.ngxScrollToOffset = DEFAULTS.offset;
            this.ngxScrollToOffsetMap = DEFAULTS.offsetMap;
        }
        /**
         * Angular Lifecycle Hook - After View Init
         *
         * @todo Implement Subscription for Events
         *
         * @returns void
         */
        ScrollToDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            // Test Event Support
            if (EVENTS.indexOf(this.ngxScrollToEvent) === -1) {
                throw new Error("Unsupported Event '" + this.ngxScrollToEvent + "'");
            }
            // Listen for the trigger...
            this.renderer2.listen(this.elementRef.nativeElement, this.ngxScrollToEvent, function (event) {
                _this.options = {
                    target: _this.ngxScrollTo,
                    duration: _this.ngxScrollToDuration,
                    easing: _this.ngxScrollToEasing,
                    offset: _this.ngxScrollToOffset,
                    offsetMap: _this.ngxScrollToOffsetMap
                };
                _this.scrollToService.scrollTo(_this.options);
            });
        };
        ScrollToDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: ScrollToService },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input()
        ], ScrollToDirective.prototype, "ngxScrollTo", void 0);
        __decorate([
            core.Input()
        ], ScrollToDirective.prototype, "ngxScrollToEvent", void 0);
        __decorate([
            core.Input()
        ], ScrollToDirective.prototype, "ngxScrollToDuration", void 0);
        __decorate([
            core.Input()
        ], ScrollToDirective.prototype, "ngxScrollToEasing", void 0);
        __decorate([
            core.Input()
        ], ScrollToDirective.prototype, "ngxScrollToOffset", void 0);
        __decorate([
            core.Input()
        ], ScrollToDirective.prototype, "ngxScrollToOffsetMap", void 0);
        ScrollToDirective = __decorate([
            core.Directive({
                selector: '[ngxScrollTo]'
            })
        ], ScrollToDirective);
        return ScrollToDirective;
    }());

    /** Scroll To Module */
    var ScrollToModule = /** @class */ (function () {
        function ScrollToModule() {
        }
        ScrollToModule_1 = ScrollToModule;
        /**
         * Guaranteed singletons for provided Services across App.
         *
         * @return          An Angular Module with Providers
         */
        ScrollToModule.forRoot = function () {
            return {
                ngModule: ScrollToModule_1,
                providers: [
                    ScrollToService
                ]
            };
        };
        var ScrollToModule_1;
        ScrollToModule = ScrollToModule_1 = __decorate([
            core.NgModule({
                declarations: [
                    ScrollToDirective
                ],
                exports: [
                    ScrollToDirective
                ]
            })
        ], ScrollToModule);
        return ScrollToModule;
    }());

    exports.ScrollToDirective = ScrollToDirective;
    exports.ScrollToModule = ScrollToModule;
    exports.ScrollToService = ScrollToService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=nicky-lenaers-ngx-scroll-to.umd.js.map
