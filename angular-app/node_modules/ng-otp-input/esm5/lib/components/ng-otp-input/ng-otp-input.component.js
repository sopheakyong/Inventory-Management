/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { KeysPipe } from '../../pipes/keys.pipe';
import { Config } from '../../models/config';
var NgOtpInputComponent = /** @class */ (function () {
    function NgOtpInputComponent(keysPipe) {
        this.keysPipe = keysPipe;
        this.config = { length: 4 };
        // tslint:disable-next-line: no-output-on-prefix
        this.onInputChange = new EventEmitter();
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
        this.otpForm = new FormGroup({});
        for (var index = 0; index < this.config.length; index++) {
            this.otpForm.addControl(this.getControlName(index), new FormControl());
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
        { type: Component, args: [{
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
        config: [{ type: Input }],
        onInputChange: [{ type: Output }]
    };
    return NgOtpInputComponent;
}());
export { NgOtpInputComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctb3RwLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW90cC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL25nLW90cC1pbnB1dC9uZy1vdHAtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QztJQWlCRSw2QkFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVY3QixXQUFNLEdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7O1FBRTlCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVyRCxrQkFBYSxHQUFrQixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdELGlCQUFZLEdBQ1YsSUFBSSxDQUFDLE1BQU0sRUFBRTthQUNWLFFBQVEsQ0FBQyxFQUFFLENBQUM7YUFDWixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFYixDQUFDOzs7O0lBRTFDLHNDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxF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bnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQWZ0ZXJWaWV3SW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBLZXlzUGlwZSB9IGZyb20gJy4uLy4uL3BpcGVzL2tleXMucGlwZSc7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVscy9jb25maWcnO1xyXG5AQ29tcG9uZW50KHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnbmctb3RwLWlucHV0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmctb3RwLWlucHV0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZy1vdHAtaW5wdXQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdPdHBJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KCkgY29uZmlnOiBDb25maWcgPSB7IGxlbmd0aDogNCB9O1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tb3V0cHV0LW9uLXByZWZpeFxyXG4gIEBPdXRwdXQoKSBvbklucHV0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgb3RwRm9ybTogRm9ybUdyb3VwO1xyXG4gIGlucHV0Q29udHJvbHM6IEZvcm1Db250cm9sW10gPSBuZXcgQXJyYXkodGhpcy5jb25maWcubGVuZ3RoKTtcclxuICBjb21wb25lbnRLZXkgPVxyXG4gICAgTWF0aC5yYW5kb20oKVxyXG4gICAgICAudG9TdHJpbmcoMzYpXHJcbiAgICAgIC5zdWJzdHJpbmcoMikgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygzNik7XHJcbiAgaW5wdXRUeXBlOiBzdHJpbmc7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBrZXlzUGlwZTogS2V5c1BpcGUpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5vdHBGb3JtID0gbmV3IEZvcm1Hcm91cCh7fSk7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5jb25maWcubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMub3RwRm9ybS5hZGRDb250cm9sKHRoaXMuZ2V0Q29udHJvbE5hbWUoaW5kZXgpLCBuZXcgRm9ybUNvbnRyb2woKSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlucHV0VHlwZSA9IHRoaXMuZ2V0SW5wdXRUeXBlKCk7XHJcbiAgICBcclxuICB9XHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5kaXNhYmxlQXV0b0ZvY3VzKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRhaW5lckl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY18ke3RoaXMuY29tcG9uZW50S2V5fWApO1xyXG4gICAgICBpZiAoY29udGFpbmVySXRlbSkge1xyXG4gICAgICAgIGNvbnRhaW5lckl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCAoZXZ0KSA9PiB0aGlzLmhhbmRsZVBhc3RlKGV2dCkpO1xyXG4gICAgICAgIGNvbnN0IGVsZTogYW55ID0gY29udGFpbmVySXRlbS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvdHAtaW5wdXQnKVswXTtcclxuICAgICAgICBpZiAoZWxlICYmIGVsZS5mb2N1cykge1xyXG4gICAgICAgICAgZWxlLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0Q29udHJvbE5hbWUoaWR4KSB7XHJcbiAgICByZXR1cm4gYGN0cmxfJHtpZHh9YDtcclxuICB9XHJcblxyXG4gIGlmTGVmdEFycm93KGV2ZW50KSB7XHJcbiAgICByZXR1cm4gdGhpcy5pZktleUNvZGUoZXZlbnQsIDM3KTtcclxuICB9XHJcblxyXG5cclxuICBpZlJpZ2h0QXJyb3coZXZlbnQpIHtcclxuICAgIHJldHVybiB0aGlzLmlmS2V5Q29kZShldmVudCwgMzkpO1xyXG4gIH1cclxuXHJcbiAgaWZCYWNrc3BhY2VPckRlbGV0ZShldmVudCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgZXZlbnQua2V5ID09PSAnQmFja3NwYWNlJyB8fFxyXG4gICAgICBldmVudC5rZXkgPT09ICdEZWxldGUnIHx8XHJcbiAgICAgIHRoaXMuaWZLZXlDb2RlKGV2ZW50LCA4KSB8fFxyXG4gICAgICB0aGlzLmlmS2V5Q29kZShldmVudCwgNDYpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWZLZXlDb2RlKGV2ZW50LCB0YXJnZXRDb2RlKSB7XHJcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LmNoYXJDb2RlO1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB0cmlwbGUtZXF1YWxzXHJcbiAgICByZXR1cm4ga2V5ID09IHRhcmdldENvZGUgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIG9uS2V5RG93bigkZXZlbnQpIHtcclxuICAgIHZhciBpc1NwYWNlPXRoaXMuaWZLZXlDb2RlKCRldmVudCwzMilcclxuICAgIGlmIChpc1NwYWNlKSB7Ly8gcHJldmVudCBzcGFjZVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25LZXlVcCgkZXZlbnQsIGlucHV0SWR4KSB7XHJcbiAgICBjb25zdCBuZXh0SW5wdXRJZCA9IHRoaXMuYXBwZW5kS2V5KGBvdHBfJHtpbnB1dElkeCArIDF9YCk7XHJcbiAgICBjb25zdCBwcmV2SW5wdXRJZCA9IHRoaXMuYXBwZW5kS2V5KGBvdHBfJHtpbnB1dElkeCAtIDF9YCk7XHJcbiAgICBpZiAodGhpcy5pZlJpZ2h0QXJyb3coJGV2ZW50KSkge1xyXG4gICAgICB0aGlzLnNldFNlbGVjdGVkKG5leHRJbnB1dElkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaWZMZWZ0QXJyb3coJGV2ZW50KSkge1xyXG4gICAgICB0aGlzLnNldFNlbGVjdGVkKHByZXZJbnB1dElkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaXNCYWNrc3BhY2UgPSB0aGlzLmlmQmFja3NwYWNlT3JEZWxldGUoJGV2ZW50KTtcclxuICAgIGlmIChpc0JhY2tzcGFjZSAmJiAhJGV2ZW50LnRhcmdldC52YWx1ZSkge1xyXG4gICAgICB0aGlzLnNldFNlbGVjdGVkKHByZXZJbnB1dElkKTtcclxuICAgICAgdGhpcy5yZWJ1aWxkVmFsdWUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCEkZXZlbnQudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlmVmFsaWRFbnRyeSgkZXZlbnQpKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWQobmV4dElucHV0SWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZWJ1aWxkVmFsdWUoKTtcclxuICB9XHJcblxyXG4gIGFwcGVuZEtleShpZCkge1xyXG4gICAgcmV0dXJuIGAke2lkfV8ke3RoaXMuY29tcG9uZW50S2V5fWA7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3RlZChlbGVJZCkge1xyXG4gICAgdGhpcy5mb2N1c1RvKGVsZUlkKTtcclxuICAgIGNvbnN0IGVsZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlSWQpO1xyXG4gICAgaWYgKGVsZSAmJiBlbGUuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZWxlLnNldFNlbGVjdGlvblJhbmdlKDAsIDEpO1xyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmVmFsaWRFbnRyeShldmVudCkge1xyXG4gICAgY29uc3QgaW5wID0gU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC5rZXlDb2RlKTtcclxuICAgIGNvbnN0IGlzTW9iaWxlID0gL2lQaG9uZXxpUGFkfGlQb2R8QW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBpc01vYmlsZSB8fFxyXG4gICAgICAvW2EtekEtWjAtOS1fXS8udGVzdChpbnApIHx8XHJcbiAgICAgICh0aGlzLmNvbmZpZy5hbGxvd0tleUNvZGVzICYmXHJcbiAgICAgICAgdGhpcy5jb25maWcuYWxsb3dLZXlDb2Rlcy5pbmNsdWRlcyhldmVudC5rZXlDb2RlKSkgfHxcclxuICAgICAgKGV2ZW50LmtleUNvZGUgPj0gOTYgJiYgZXZlbnQua2V5Q29kZSA8PSAxMDUpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZm9jdXNUbyhlbGVJZCkge1xyXG4gICAgY29uc3QgZWxlOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVJZCk7XHJcbiAgICBpZiAoZWxlKSB7XHJcbiAgICAgIGVsZS5mb2N1cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gbWV0aG9kIHRvIHNldCBjb21wb25lbnQgdmFsdWVcclxuICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5jb25maWcuYWxsb3dOdW1iZXJzT25seSAmJiBpc05hTih2YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLm90cEZvcm0ucmVzZXQoKTtcclxuICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICB0aGlzLnJlYnVpbGRWYWx1ZSgpO1xyXG4gICAgICAgcmV0dXJuO1xyXG4gICAgIH1cclxuICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxzL2csICcnKTsgLy8gcmVtb3ZlIHdoaXRlc3BhY2VcclxuICAgICBBcnJheS5mcm9tKHZhbHVlKS5mb3JFYWNoKChjLCBpZHgpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLm90cEZvcm0uZ2V0KHRoaXMuZ2V0Q29udHJvbE5hbWUoaWR4KSkpIHtcclxuICAgICAgICAgICAgdGhpcy5vdHBGb3JtLmdldCh0aGlzLmdldENvbnRyb2xOYW1lKGlkeCkpLnNldFZhbHVlKGMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgIH0pO1xyXG4gICAgIGlmICghdGhpcy5jb25maWcuZGlzYWJsZUF1dG9Gb2N1cykge1xyXG4gICAgICBjb25zdCBjb250YWluZXJJdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNfJHt0aGlzLmNvbXBvbmVudEtleX1gKTtcclxuICAgICAgdmFyIGluZGV4T2ZFbGVtZW50VG9Gb2N1cyA9IHZhbHVlLmxlbmd0aCA8IHRoaXMuY29uZmlnLmxlbmd0aCA/IHZhbHVlLmxlbmd0aCA6ICh0aGlzLmNvbmZpZy5sZW5ndGggLSAxKTtcclxuICAgICAgbGV0IGVsZSA6IGFueSA9IGNvbnRhaW5lckl0ZW0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3RwLWlucHV0JylbaW5kZXhPZkVsZW1lbnRUb0ZvY3VzXTtcclxuICAgICAgaWYgKGVsZSAmJiBlbGUuZm9jdXMpIHtcclxuICAgICAgICBlbGUuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgIH1cclxuICAgICB0aGlzLnJlYnVpbGRWYWx1ZSgpO1xyXG4gIH1cclxuXHJcblxyXG4gIHJlYnVpbGRWYWx1ZSgpIHtcclxuICAgIGxldCB2YWwgPSAnJztcclxuICAgIHRoaXMua2V5c1BpcGUudHJhbnNmb3JtKHRoaXMub3RwRm9ybS5jb250cm9scykuZm9yRWFjaChrID0+IHtcclxuICAgICAgaWYgKHRoaXMub3RwRm9ybS5jb250cm9sc1trXS52YWx1ZSkge1xyXG4gICAgICAgIHZhbCArPSB0aGlzLm90cEZvcm0uY29udHJvbHNba10udmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbklucHV0Q2hhbmdlLmVtaXQodmFsKTtcclxuICB9XHJcbiAgZ2V0SW5wdXRUeXBlKCk6c3RyaW5ne1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmlzUGFzc3dvcmRJbnB1dCBcclxuICAgICAgPyAncGFzc3dvcmQnIFxyXG4gICAgICA6IHRoaXMuY29uZmlnLmFsbG93TnVtYmVyc09ubHkgXHJcbiAgICAgICAgPyAndGVsJ1xyXG4gICAgICAgIDogJ3RleHQnO1xyXG4gIH1cclxuICBoYW5kbGVQYXN0ZShlKSB7XHJcbiAgICAvLyBHZXQgcGFzdGVkIGRhdGEgdmlhIGNsaXBib2FyZCBBUElcclxuICAgIGxldCBjbGlwYm9hcmREYXRhID0gZS5jbGlwYm9hcmREYXRhIHx8IHdpbmRvd1snY2xpcGJvYXJkRGF0YSddO1xyXG4gICAgaWYoY2xpcGJvYXJkRGF0YSl7XHJcbiAgICAgdmFyIHBhc3RlZERhdGEgPWNsaXBib2FyZERhdGEuZ2V0RGF0YSgnVGV4dCcpO1xyXG4gICAgfVxyXG4gICAgLy8gU3RvcCBkYXRhIGFjdHVhbGx5IGJlaW5nIHBhc3RlZCBpbnRvIGRpdlxyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmICghcGFzdGVkRGF0YSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFZhbHVlKHBhc3RlZERhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=