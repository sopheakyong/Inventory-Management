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
var core_1 = require("@angular/core");
var LightboxConfig = /** @class */ (function () {
    function LightboxConfig() {
        this.fadeDuration = 0.7;
        this.resizeDuration = 0.5;
        this.fitImageInViewPort = true;
        this.positionFromTop = 20;
        this.showImageNumberLabel = false;
        this.alwaysShowNavOnTouchDevices = false;
        this.wrapAround = false;
        this.disableKeyboardNav = false;
        this.disableScrolling = false;
        this.centerVertically = false;
        this.enableTransition = true;
        this.albumLabel = 'Image %1 of %2';
        this.showZoom = false;
        this.showRotate = false;
        this.containerElementResolver = function (documentRef) { return documentRef.querySelector('body'); };
    }
    LightboxConfig = __decorate([ __metadata("design:paramtypes", [])
    ], LightboxConfig);
LightboxConfig.ɵfac = function LightboxConfig_Factory(t) { return new (t || LightboxConfig)(); };
LightboxConfig.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: LightboxConfig, factory: function (t) { return LightboxConfig.ɵfac(t); } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(LightboxConfig, [{
        type: core_1.Injectable
    }], function () { return []; }, null); })();
    return LightboxConfig;
}());
exports.LightboxConfig = LightboxConfig;

//# sourceMappingURL=lightbox-config.service.js.map