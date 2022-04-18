(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-otp-input', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (global = global || self, factory(global['ng-otp-input'] = {}, global.ng.core, global.ng.forms, global.ng.common));
}(this, (function (exports, core, forms, common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var KeysPipe = /** @class */ (function () {
        function KeysPipe() {
        }
        /**
         * @param {?} value
         * @return {?}
         */
        KeysPipe.prototype.transform = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return Object.keys(value);
        };
        KeysPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'keys'
                    },] }
        ];
        return KeysPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Config = /** @class */ (function () {
        function Config() {
        }
        return Config;
    }());
    if (false) {
        /** @type {?} */
        Config.prototype.inputStyles;
        /** @type {?} */
        Config.prototype.containerStyles;
        /** @type {?} */
        Config.prototype.allowKeyCodes;
        /** @type {?} */
        Config.prototype.length;
        /** @type {?} */
        Config.prototype.allowNumbersOnly;
        /** @type {?} */
        Config.prototype.inputClass;
        /** @type {?} */
        Config.prototype.containerClass;
        /** @type {?} */
        Config.prototype.isPasswordInput;
        /** @type {?} */
        Config.prototype.disableAutoFocus;
        /** @type {?} */
        Config.prototype.placeholder;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgOtpInputComponent = /** @class */ (function () {
        function NgOtpInputComponent(keysPipe) {
            this.keysPipe = keysPipe;
            this.config = { length: 4 };
            // tslint:disable-next-line: no-output-on-prefix
            this.onInputChange = new core.EventEmitter();
            this.inputControls = new Array(this.config.length);
            this.componentKey = Math.random()
                .toString(36)
                .substring(2) + new Date().getTime().toString(36);
        }
        /**
         * @return {?}
         */
        NgOtpInputComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.otpForm = new forms.FormGroup({});
            for (var index = 0; index < this.config.length; index++) {
                this.otpForm.addControl(this.getControlName(index), new forms.FormControl());
            }
            this.inputType = this.getInputType();
        };
        /**
         * @return {?}
         */
        NgOtpInputComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.config.disableAutoFocus) {
                /** @type {?} */
                var containerItem = document.getElementById("c_" + this.componentKey);
                if (containerItem) {
                    containerItem.addEventListener('paste', (/**
                     * @param {?} evt
                     * @return {?}
                     */
                    function (evt) { return _this.handlePaste(evt); }));
                    /** @type {?} */
                    var ele = containerItem.getElementsByClassName('otp-input')[0];
                    if (ele && ele.focus) {
                        ele.focus();
                    }
                }
            }
        };
        /**
         * @private
         * @param {?} idx
         * @return {?}
         */
        NgOtpInputComponent.prototype.getControlName = /**
         * @private
         * @param {?} idx
         * @return {?}
         */
        function (idx) {
            return "ctrl_" + idx;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NgOtpInputComponent.prototype.ifLeftArrow = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return this.ifKeyCode(event, 37);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NgOtpInputComponent.prototype.ifRightArrow = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return this.ifKeyCode(event, 39);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NgOtpInputComponent.prototype.ifBackspaceOrDelete = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return (event.key === 'Backspace' ||
                event.key === 'Delete' ||
                this.ifKeyCode(event, 8) ||
                this.ifKeyCode(event, 46));
        };
        /**
         * @param {?} event
         * @param {?} targetCode
         * @return {?}
         */
        NgOtpInputComponent.prototype.ifKeyCode = /**
         * @param {?} event
         * @param {?} targetCode
         * @return {?}
         */
        function (event, targetCode) {
            /** @type {?} */
            var key = event.keyCode || event.charCode;
            // tslint:disable-next-line: triple-equals
            return key == targetCode ? true : false;
        };
        /**
         * @param {?} $event
         * @return {?}
         */
        NgOtpInputComponent.prototype.onKeyDown = /**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            /** @type {?} */
            var isSpace = this.ifKeyCode($event, 32);
            if (isSpace) { // prevent space
                return false;
            }
        };
        /**
         * @param {?} $event
         * @param {?} inputIdx
         * @return {?}
         */
        NgOtpInputComponent.prototype.onKeyUp = /**
         * @param {?} $event
         * @param {?} inputIdx
         * @return {?}
         */
        function ($event, inputIdx) {
            /** @type {?} */
            var nextInputId = this.appendKey("otp_" + (inputIdx + 1));
            /** @type {?} */
            var prevInputId = this.appendKey("otp_" + (inputIdx - 1));
            if (this.ifRightArrow($event)) {
                this.setSelected(nextInputId);
                return;
            }
            if (this.ifLeftArrow($event)) {
                this.setSelected(prevInputId);
                return;
            }
            /** @type {?} */
            var isBackspace = this.ifBackspaceOrDelete($event);
            if (isBackspace && !$event.target.value) {
                this.setSelected(prevInputId);
                this.rebuildValue();
                return;
            }
            if (!$event.target.value) {
                return;
            }
            if (this.ifValidEntry($event)) {
                this.setSelected(nextInputId);
            }
            this.rebuildValue();
        };
        /**
         * @param {?} id
         * @return {?}
         */
        NgOtpInputComponent.prototype.appendKey = /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            return id + "_" + this.componentKey;
        };
        /**
         * @param {?} eleId
         * @return {?}
         */
        NgOtpInputComponent.prototype.setSelected = /**
         * @param {?} eleId
         * @return {?}
         */
        function (eleId) {
            this.focusTo(eleId);
            /** @type {?} */
            var ele = document.getElementById(eleId);
            if (ele && ele.setSelectionRange) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    ele.setSelectionRange(0, 1);
                }), 0);
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        NgOtpInputComponent.prototype.ifValidEntry = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var inp = String.fromCharCode(event.keyCode);
            /** @type {?} */
            var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            return (isMobile ||
                /[a-zA-Z0-9-_]/.test(inp) ||
                (this.config.allowKeyCodes &&
                    this.config.allowKeyCodes.includes(event.keyCode)) ||
                (event.keyCode >= 96 && event.keyCode <= 105));
        };
        /**
         * @param {?} eleId
         * @return {?}
         */
        NgOtpInputComponent.prototype.focusTo = /**
         * @param {?} eleId
         * @return {?}
         */
        function (eleId) {
            /** @type {?} */
            var ele = document.getElementById(eleId);
            if (ele) {
                ele.focus();
            }
        };
        // method to set component value
        // method to set component value
        /**
         * @param {?} value
         * @return {?}
         */
        NgOtpInputComponent.prototype.setValue = 
        // method to set component value
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (this.config.allowNumbersOnly && isNaN(value)) {
                return;
            }
            this.otpForm.reset();
            if (!value) {
                this.rebuildValue();
                return;
            }
            value = value.toString().replace(/\s/g, ''); // remove whitespace
            Array.from(value).forEach((/**
             * @param {?} c
             * @param {?} idx
             * @return {?}
             */
            function (c, idx) {
                if (_this.otpForm.get(_this.getControlName(idx))) {
                    _this.otpForm.get(_this.getControlName(idx)).setValue(c);
                }
            }));
            if (!this.config.disableAutoFocus) {
                /** @type {?} */
                var containerItem = document.getElementById("c_" + this.componentKey);
                /** @type {?} */
                var indexOfElementToFocus = value.length < this.config.length ? value.length : (this.config.length - 1);
                /** @type {?} */
                var ele = containerItem.getElementsByClassName('otp-input')[indexOfElementToFocus];
                if (ele && ele.focus) {
                    ele.focus();
                }
            }
            this.rebuildValue();
        };
        /**
         * @return {?}
         */
        NgOtpInputComponent.prototype.rebuildValue = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var val = '';
            this.keysPipe.transform(this.otpForm.controls).forEach((/**
             * @param {?} k
             * @return {?}
             */
            function (k) {
                if (_this.otpForm.controls[k].value) {
                    val += _this.otpForm.controls[k].value;
                }
            }));
            this.onInputChange.emit(val);
        };
        /**
         * @return {?}
         */
        NgOtpInputComponent.prototype.getInputType = /**
         * @return {?}
         */
        function () {
            return this.config.isPasswordInput
                ? 'password'
                : this.config.allowNumbersOnly
                    ? 'tel'
                    : 'text';
        };
        /**
         * @param {?} e
         * @return {?}
         */
        NgOtpInputComponent.prototype.handlePaste = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            // Get pasted data via clipboard API
            /** @type {?} */
            var clipboardData = e.clipboardData || window['clipboardData'];
            if (clipboardData) {
                /** @type {?} */
                var pastedData = clipboardData.getData('Text');
            }
            // Stop data actually being pasted into div
            e.stopPropagation();
            e.preventDefault();
            if (!pastedData) {
                return;
            }
            this.setValue(pastedData);
        };
        NgOtpInputComponent.decorators = [
            { type: core.Component, args: [{
                        // tslint:disable-next-line: component-selector
                        selector: 'ng-otp-input',
                        template: "<div class=\"wrapper {{config.containerClass}}\" id=\"c_{{componentKey}}\" *ngIf=\"otpForm?.controls\"\r\n  [ngStyle]=\"config.containerStyles\">\r\n  <input [pattern]=\"config.allowNumbersOnly ? '\\\\d*' : ''\" [type]=\"inputType\" numberOnly [placeholder]=\"config?.placeholder || ''\"\r\n    [disabledNumberOnly]=\"!config.allowNumbersOnly\" [ngStyle]=\"config.inputStyles\" maxlength=\"1\"\r\n    class=\"otp-input {{config.inputClass}}\" autocomplete=\"off\" *ngFor=\"let item of otpForm?.controls | keys;let i=index\"\r\n    [formControl]=\"otpForm.controls[item]\" id=\"otp_{{i}}_{{componentKey}}\" (keydown)=\"onKeyDown($event)\"\r\n    (keyup)=\"onKeyUp($event,i)\">\r\n</div>",
                        styles: [".otp-input{width:50px;height:50px;border-radius:4px;border:1px solid #c5c5c5;text-align:center;font-size:32px}.wrapper .otp-input:not(:last-child){margin-right:8px}@media screen and (max-width:767px){.otp-input{width:40px;font-size:24px;height:40px}}@media screen and (max-width:420px){.otp-input{width:30px;font-size:18px;height:30px}}"]
                    }] }
        ];
        /** @nocollapse */
        NgOtpInputComponent.ctorParameters = function () { return [
            { type: KeysPipe }
        ]; };
        NgOtpInputComponent.propDecorators = {
            config: [{ type: core.Input }],
            onInputChange: [{ type: core.Output }]
        };
        return NgOtpInputComponent;
    }());
    if (false) {
        /** @type {?} */
        NgOtpInputComponent.prototype.config;
        /** @type {?} */
        NgOtpInputComponent.prototype.onInputChange;
        /** @type {?} */
        NgOtpInputComponent.prototype.otpForm;
        /** @type {?} */
        NgOtpInputComponent.prototype.inputControls;
        /** @type {?} */
        NgOtpInputComponent.prototype.componentKey;
        /** @type {?} */
        NgOtpInputComponent.prototype.inputType;
        /**
         * @type {?}
         * @private
         */
        NgOtpInputComponent.prototype.keysPipe;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NumberOnlyDirective = /** @class */ (function () {
        function NumberOnlyDirective(_elRef, _renderer) {
            this._elRef = _elRef;
            this._renderer = _renderer;
        }
        /**
         * @return {?}
         */
        NumberOnlyDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            if (!this.disabledNumberOnly) {
                this._renderer.setAttribute(this._elRef.nativeElement, 'onkeypress', 'return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0');
            }
        };
        NumberOnlyDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[numberOnly]'
                    },] }
        ];
        /** @nocollapse */
        NumberOnlyDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        NumberOnlyDirective.propDecorators = {
            disabledNumberOnly: [{ type: core.Input }]
        };
        return NumberOnlyDirective;
    }());
    if (false) {
        /** @type {?} */
        NumberOnlyDirective.prototype.disabledNumberOnly;
        /**
         * @type {?}
         * @private
         */
        NumberOnlyDirective.prototype._elRef;
        /**
         * @type {?}
         * @private
         */
        NumberOnlyDirective.prototype._renderer;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgOtpInputModule = /** @class */ (function () {
        function NgOtpInputModule() {
        }
        NgOtpInputModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule
                        ],
                        declarations: [NgOtpInputComponent, KeysPipe, NumberOnlyDirective],
                        exports: [NgOtpInputComponent],
                        providers: [KeysPipe]
                    },] }
        ];
        return NgOtpInputModule;
    }());

    exports.NgOtpInputModule = NgOtpInputModule;
    exports.ɵa = NgOtpInputComponent;
    exports.ɵb = KeysPipe;
    exports.ɵc = NumberOnlyDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-otp-input.umd.js.map
