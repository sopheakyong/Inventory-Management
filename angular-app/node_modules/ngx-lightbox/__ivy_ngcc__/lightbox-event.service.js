"use strict";
var ɵngcc0 = require('@angular/core');
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
exports.LIGHTBOX_EVENT = {
    CHANGE_PAGE: 1,
    CLOSE: 2,
    OPEN: 3,
    ZOOM_IN: 4,
    ZOOM_OUT: 5,
    ROTATE_LEFT: 6,
    ROTATE_RIGHT: 7
};
var LightboxEvent = /** @class */ (function () {
    function LightboxEvent() {
        this._lightboxEventSource = new rxjs_1.Subject();
        this.lightboxEvent$ = this._lightboxEventSource.asObservable();
    }
    LightboxEvent.prototype.broadcastLightboxEvent = function (event) {
        this._lightboxEventSource.next(event);
    };
    LightboxEvent = __decorate([ __metadata("design:paramtypes", [])
    ], LightboxEvent);
LightboxEvent.ɵfac = function LightboxEvent_Factory(t) { return new (t || LightboxEvent)(); };
LightboxEvent.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: LightboxEvent, factory: function (t) { return LightboxEvent.ɵfac(t); } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(LightboxEvent, [{
        type: core_1.Injectable
    }], function () { return []; }, null); })();
    return LightboxEvent;
}());
exports.LightboxEvent = LightboxEvent;
function getWindow() {
    return window;
}
var LightboxWindowRef = /** @class */ (function () {
    function LightboxWindowRef() {
    }
    Object.defineProperty(LightboxWindowRef.prototype, "nativeWindow", {
        get: function () {
            return getWindow();
        },
        enumerable: true,
        configurable: true
    });
LightboxWindowRef.ɵfac = function LightboxWindowRef_Factory(t) { return new (t || LightboxWindowRef)(); };
LightboxWindowRef.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: LightboxWindowRef, factory: function (t) { return LightboxWindowRef.ɵfac(t); } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(LightboxWindowRef, [{
        type: core_1.Injectable
    }], function () { return []; }, null); })();
    return LightboxWindowRef;
}());
exports.LightboxWindowRef = LightboxWindowRef;

//# sourceMappingURL=lightbox-event.service.js.map