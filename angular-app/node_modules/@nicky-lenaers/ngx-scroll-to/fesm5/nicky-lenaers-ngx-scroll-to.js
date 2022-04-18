import { __assign, __decorate, __param } from 'tslib';
import { ElementRef, Inject, PLATFORM_ID, Injectable, Renderer2, Input, Directive, NgModule } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ReplaySubject, throwError } from 'rxjs';

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
    return value instanceof ElementRef;
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
        this.source$ = new ReplaySubject();
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
        if (!isPlatformBrowser(this.platformId)) {
            return new ReplaySubject().asObservable();
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
            return throwError('Unable to find Target Element');
        }
        var container = this.getContainer(mergedConfigOptions, targetNode);
        if (mergedConfigOptions.container && !container) {
            return throwError('Unable to find Container Element');
        }
        var listenerTarget = this.getListenerTarget(container) || window;
        var to = container ? container.getBoundingClientRect().top : 0;
        if (targetNode) {
            to = isWindow(listenerTarget) ?
                window.scrollY + targetNode.getBoundingClientRect().top :
                targetNode.getBoundingClientRect().top;
        }
        // Create Animation
        this.animation = new ScrollToAnimation(container, listenerTarget, isWindow(listenerTarget), to, mergedConfigOptions, isPlatformBrowser(this.platformId));
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
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    ScrollToService = __decorate([
        Injectable(),
        __param(0, Inject(DOCUMENT)),
        __param(1, Inject(PLATFORM_ID))
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
        { type: ElementRef },
        { type: ScrollToService },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input()
    ], ScrollToDirective.prototype, "ngxScrollTo", void 0);
    __decorate([
        Input()
    ], ScrollToDirective.prototype, "ngxScrollToEvent", void 0);
    __decorate([
        Input()
    ], ScrollToDirective.prototype, "ngxScrollToDuration", void 0);
    __decorate([
        Input()
    ], ScrollToDirective.prototype, "ngxScrollToEasing", void 0);
    __decorate([
        Input()
    ], ScrollToDirective.prototype, "ngxScrollToOffset", void 0);
    __decorate([
        Input()
    ], ScrollToDirective.prototype, "ngxScrollToOffsetMap", void 0);
    ScrollToDirective = __decorate([
        Directive({
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
        NgModule({
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

/*
 * Public API Surface of ngx-scroll-to
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ScrollToDirective, ScrollToModule, ScrollToService };
//# sourceMappingURL=nicky-lenaers-ngx-scroll-to.js.map
