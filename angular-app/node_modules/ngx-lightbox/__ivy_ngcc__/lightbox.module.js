"use strict";
var ɵngcc0 = require('@angular/core');
var ɵngcc1 = require('./lightbox-overlay.component');
var ɵngcc2 = require('./lightbox.component');
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lightbox_service_1 = require("./lightbox.service");
var lightbox_component_1 = require("./lightbox.component");
var lightbox_config_service_1 = require("./lightbox-config.service");
var lightbox_event_service_1 = require("./lightbox-event.service");
var lightbox_overlay_component_1 = require("./lightbox-overlay.component");
var core_1 = require("@angular/core");
var LightboxModule = /** @class */ (function () {
    function LightboxModule() {
    }
LightboxModule.ɵfac = function LightboxModule_Factory(t) { return new (t || LightboxModule)(); };
LightboxModule.ɵmod = /*@__PURE__*/ ɵngcc0.ɵɵdefineNgModule({ type: LightboxModule });
LightboxModule.ɵinj = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjector({ providers: [
        lightbox_service_1.Lightbox,
        lightbox_config_service_1.LightboxConfig,
        lightbox_event_service_1.LightboxEvent,
        lightbox_event_service_1.LightboxWindowRef
    ] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(LightboxModule, [{
        type: core_1.NgModule,
        args: [{
                declarations: [lightbox_overlay_component_1.LightboxOverlayComponent, lightbox_component_1.LightboxComponent],
                providers: [
                    lightbox_service_1.Lightbox,
                    lightbox_config_service_1.LightboxConfig,
                    lightbox_event_service_1.LightboxEvent,
                    lightbox_event_service_1.LightboxWindowRef
                ],
                entryComponents: [lightbox_overlay_component_1.LightboxOverlayComponent, lightbox_component_1.LightboxComponent]
            }]
    }], function () { return []; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(LightboxModule, { declarations: [ɵngcc1.LightboxOverlayComponent, ɵngcc2.LightboxComponent] }); })();
    return LightboxModule;
}());
exports.LightboxModule = LightboxModule;

//# sourceMappingURL=lightbox.module.js.map