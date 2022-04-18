/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { KeysPipe } from '../../pipes/keys.pipe';
import { Config } from '../../models/config';
export class NgOtpInputComponent {
    /**
     * @param {?} keysPipe
     */
    constructor(keysPipe) {
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
    ngOnInit() {
        this.otpForm = new FormGroup({});
        for (let index = 0; index < this.config.length; index++) {
            this.otpForm.addControl(this.getControlName(index), new FormControl());
        }
        this.inputType = this.getInputType();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.config.disableAutoFocus) {
            /** @type {?} */
            const containerItem = document.getElementById(`c_${this.componentKey}`);
            if (containerItem) {
                containerItem.addEventListener('paste', (/**
                 * @param {?} evt
                 * @return {?}
                 */
                (evt) => this.handlePaste(evt)));
                /** @type {?} */
                const ele = containerItem.getElementsByClassName('otp-input')[0];
                if (ele && ele.focus) {
                    ele.focus();
                }
            }
        }
    }
    /**
     * @private
     * @param {?} idx
     * @return {?}
     */
    getControlName(idx) {
        return `ctrl_${idx}`;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ifLeftArrow(event) {
        return this.ifKeyCode(event, 37);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ifRightArrow(event) {
        return this.ifKeyCode(event, 39);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ifBackspaceOrDelete(event) {
        return (event.key === 'Backspace' ||
            event.key === 'Delete' ||
            this.ifKeyCode(event, 8) ||
            this.ifKeyCode(event, 46));
    }
    /**
     * @param {?} event
     * @param {?} targetCode
     * @return {?}
     */
    ifKeyCode(event, targetCode) {
        /** @type {?} */
        const key = event.keyCode || event.charCode;
        // tslint:disable-next-line: triple-equals
        return key == targetCode ? true : false;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onKeyDown($event) {
        /** @type {?} */
        var isSpace = this.ifKeyCode($event, 32);
        if (isSpace) { // prevent space
            return false;
        }
    }
    /**
     * @param {?} $event
     * @param {?} inputIdx
     * @return {?}
     */
    onKeyUp($event, inputIdx) {
        /** @type {?} */
        const nextInputId = this.appendKey(`otp_${inputIdx + 1}`);
        /** @type {?} */
        const prevInputId = this.appendKey(`otp_${inputIdx - 1}`);
        if (this.ifRightArrow($event)) {
            this.setSelected(nextInputId);
            return;
        }
        if (this.ifLeftArrow($event)) {
            this.setSelected(prevInputId);
            return;
        }
        /** @type {?} */
        const isBackspace = this.ifBackspaceOrDelete($event);
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
    }
    /**
     * @param {?} id
     * @return {?}
     */
    appendKey(id) {
        return `${id}_${this.componentKey}`;
    }
    /**
     * @param {?} eleId
     * @return {?}
     */
    setSelected(eleId) {
        this.focusTo(eleId);
        /** @type {?} */
        const ele = document.getElementById(eleId);
        if (ele && ele.setSelectionRange) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                ele.setSelectionRange(0, 1);
            }), 0);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ifValidEntry(event) {
        /** @type {?} */
        const inp = String.fromCharCode(event.keyCode);
        /** @type {?} */
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return (isMobile ||
            /[a-zA-Z0-9-_]/.test(inp) ||
            (this.config.allowKeyCodes &&
                this.config.allowKeyCodes.includes(event.keyCode)) ||
            (event.keyCode >= 96 && event.keyCode <= 105));
    }
    /**
     * @param {?} eleId
     * @return {?}
     */
    focusTo(eleId) {
        /** @type {?} */
        const ele = document.getElementById(eleId);
        if (ele) {
            ele.focus();
        }
    }
    // method to set component value
    /**
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
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
        (c, idx) => {
            if (this.otpForm.get(this.getControlName(idx))) {
                this.otpForm.get(this.getControlName(idx)).setValue(c);
            }
        }));
        if (!this.config.disableAutoFocus) {
            /** @type {?} */
            const containerItem = document.getElementById(`c_${this.componentKey}`);
            /** @type {?} */
            var indexOfElementToFocus = value.length < this.config.length ? value.length : (this.config.length - 1);
            /** @type {?} */
            let ele = containerItem.getElementsByClassName('otp-input')[indexOfElementToFocus];
            if (ele && ele.focus) {
                ele.focus();
            }
        }
        this.rebuildValue();
    }
    /**
     * @return {?}
     */
    rebuildValue() {
        /** @type {?} */
        let val = '';
        this.keysPipe.transform(this.otpForm.controls).forEach((/**
         * @param {?} k
         * @return {?}
         */
        k => {
            if (this.otpForm.controls[k].value) {
                val += this.otpForm.controls[k].value;
            }
        }));
        this.onInputChange.emit(val);
    }
    /**
     * @return {?}
     */
    getInputType() {
        return this.config.isPasswordInput
            ? 'password'
            : this.config.allowNumbersOnly
                ? 'tel'
                : 'text';
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handlePaste(e) {
        // Get pasted data via clipboard API
        /** @type {?} */
        let clipboardData = e.clipboardData || window['clipboardData'];
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
    }
}
NgOtpInputComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line: component-selector
                selector: 'ng-otp-input',
                template: "<div class=\"wrapper {{config.containerClass}}\" id=\"c_{{componentKey}}\" *ngIf=\"otpForm?.controls\"\r\n  [ngStyle]=\"config.containerStyles\">\r\n  <input [pattern]=\"config.allowNumbersOnly ? '\\\\d*' : ''\" [type]=\"inputType\" numberOnly [placeholder]=\"config?.placeholder || ''\"\r\n    [disabledNumberOnly]=\"!config.allowNumbersOnly\" [ngStyle]=\"config.inputStyles\" maxlength=\"1\"\r\n    class=\"otp-input {{config.inputClass}}\" autocomplete=\"off\" *ngFor=\"let item of otpForm?.controls | keys;let i=index\"\r\n    [formControl]=\"otpForm.controls[item]\" id=\"otp_{{i}}_{{componentKey}}\" (keydown)=\"onKeyDown($event)\"\r\n    (keyup)=\"onKeyUp($event,i)\">\r\n</div>",
                styles: [".otp-input{width:50px;height:50px;border-radius:4px;border:1px solid #c5c5c5;text-align:center;font-size:32px}.wrapper .otp-input:not(:last-child){margin-right:8px}@media screen and (max-width:767px){.otp-input{width:40px;font-size:24px;height:40px}}@media screen and (max-width:420px){.otp-input{width:30px;font-size:18px;height:30px}}"]
            }] }
];
/** @nocollapse */
NgOtpInputComponent.ctorParameters = () => [
    { type: KeysPipe }
];
NgOtpInputComponent.propDecorators = {
    config: [{ type: Input }],
    onInputChange: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctb3RwLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW90cC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL25nLW90cC1pbnB1dC9uZy1vdHAtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU83QyxNQUFNLE9BQU8sbUJBQW1COzs7O0lBVzlCLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFWN0IsV0FBTSxHQUFXLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDOztRQUU5QixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFckQsa0JBQWEsR0FBa0IsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxpQkFBWSxHQUNWLElBQUksQ0FBQyxNQUFNLEVBQUU7YUFDVixRQUFRLENBQUMsRUFBRSxDQUFDO2FBQ1osU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWIsQ0FBQzs7OztJQUUxQyxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0s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QUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZTtZQUNoQyxDQUFDLENBQUMsVUFBVTtZQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtnQkFDNUIsQ0FBQyxDQUFDLEtBQUs7Z0JBQ1AsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNmLENBQUM7Ozs7O0lBQ0QsV0FBVyxDQUFDLENBQUM7OztZQUVQLGFBQWEsR0FBRyxDQUFDLENBQUMsYUFBYSxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDOUQsSUFBRyxhQUFhLEVBQUM7O2dCQUNaLFVBQVUsR0FBRSxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUM3QztRQUNELDJDQUEyQztRQUMzQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7OztZQTdMRixTQUFTLFNBQUM7O2dCQUVULFFBQVEsRUFBRSxjQUFjO2dCQUN4Qix5ckJBQTRDOzthQUU3Qzs7OztZQVBRLFFBQVE7OztxQkFTZCxLQUFLOzRCQUVMLE1BQU07Ozs7SUFGUCxxQ0FBd0M7O0lBRXhDLDRDQUFxRDs7SUFDckQsc0NBQW1COztJQUNuQiw0Q0FBNkQ7O0lBQzdELDJDQUdzRDs7SUFDdEQsd0NBQWtCOzs7OztJQUNOLHVDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEFmdGVyVmlld0luaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgS2V5c1BpcGUgfSBmcm9tICcuLi8uLi9waXBlcy9rZXlzLnBpcGUnO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbHMvY29uZmlnJztcclxuQENvbXBvbmVudCh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ25nLW90cC1pbnB1dCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25nLW90cC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbmctb3RwLWlucHV0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nT3RwSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpIGNvbmZpZzogQ29uZmlnID0geyBsZW5ndGg6IDQgfTtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLW91dHB1dC1vbi1wcmVmaXhcclxuICBAT3V0cHV0KCkgb25JbnB1dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gIG90cEZvcm06IEZvcm1Hcm91cDtcclxuICBpbnB1dENvbnRyb2xzOiBGb3JtQ29udHJvbFtdID0gbmV3IEFycmF5KHRoaXMuY29uZmlnLmxlbmd0aCk7XHJcbiAgY29tcG9uZW50S2V5ID1cclxuICAgIE1hdGgucmFuZG9tKClcclxuICAgICAgLnRvU3RyaW5nKDM2KVxyXG4gICAgICAuc3Vic3RyaW5nKDIpICsgbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoMzYpO1xyXG4gIGlucHV0VHlwZTogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUga2V5c1BpcGU6IEtleXNQaXBlKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMub3RwRm9ybSA9IG5ldyBGb3JtR3JvdXAoe30pO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuY29uZmlnLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB0aGlzLm90cEZvcm0uYWRkQ29udHJvbCh0aGlzLmdldENvbnRyb2xOYW1lKGluZGV4KSwgbmV3IEZvcm1Db250cm9sKCkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbnB1dFR5cGUgPSB0aGlzLmdldElucHV0VHlwZSgpO1xyXG4gICAgXHJcbiAgfVxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5jb25maWcuZGlzYWJsZUF1dG9Gb2N1cykge1xyXG4gICAgICBjb25zdCBjb250YWluZXJJdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNfJHt0aGlzLmNvbXBvbmVudEtleX1gKTtcclxuICAgICAgaWYgKGNvbnRhaW5lckl0ZW0pIHtcclxuICAgICAgICBjb250YWluZXJJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgKGV2dCkgPT4gdGhpcy5oYW5kbGVQYXN0ZShldnQpKTtcclxuICAgICAgICBjb25zdCBlbGU6IGFueSA9IGNvbnRhaW5lckl0ZW0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3RwLWlucHV0JylbMF07XHJcbiAgICAgICAgaWYgKGVsZSAmJiBlbGUuZm9jdXMpIHtcclxuICAgICAgICAgIGVsZS5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIGdldENvbnRyb2xOYW1lKGlkeCkge1xyXG4gICAgcmV0dXJuIGBjdHJsXyR7aWR4fWA7XHJcbiAgfVxyXG5cclxuICBpZkxlZnRBcnJvdyhldmVudCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaWZLZXlDb2RlKGV2ZW50LCAzNyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgaWZSaWdodEFycm93KGV2ZW50KSB7XHJcbiAgICByZXR1cm4gdGhpcy5pZktleUNvZGUoZXZlbnQsIDM5KTtcclxuICB9XHJcblxyXG4gIGlmQmFja3NwYWNlT3JEZWxldGUoZXZlbnQpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGV2ZW50LmtleSA9PT0gJ0JhY2tzcGFjZScgfHxcclxuICAgICAgZXZlbnQua2V5ID09PSAnRGVsZXRlJyB8fFxyXG4gICAgICB0aGlzLmlmS2V5Q29kZShldmVudCwgOCkgfHxcclxuICAgICAgdGhpcy5pZktleUNvZGUoZXZlbnQsIDQ2KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmS2V5Q29kZShldmVudCwgdGFyZ2V0Q29kZSkge1xyXG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5Q29kZSB8fCBldmVudC5jaGFyQ29kZTtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdHJpcGxlLWVxdWFsc1xyXG4gICAgcmV0dXJuIGtleSA9PSB0YXJnZXRDb2RlID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuICBvbktleURvd24oJGV2ZW50KSB7XHJcbiAgICB2YXIgaXNTcGFjZT10aGlzLmlmS2V5Q29kZSgkZXZlbnQsMzIpXHJcbiAgICBpZiAoaXNTcGFjZSkgey8vIHByZXZlbnQgc3BhY2VcclxuICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uS2V5VXAoJGV2ZW50LCBpbnB1dElkeCkge1xyXG4gICAgY29uc3QgbmV4dElucHV0SWQgPSB0aGlzLmFwcGVuZEtleShgb3RwXyR7aW5wdXRJZHggKyAxfWApO1xyXG4gICAgY29uc3QgcHJldklucHV0SWQgPSB0aGlzLmFwcGVuZEtleShgb3RwXyR7aW5wdXRJZHggLSAxfWApO1xyXG4gICAgaWYgKHRoaXMuaWZSaWdodEFycm93KCRldmVudCkpIHtcclxuICAgICAgdGhpcy5zZXRTZWxlY3RlZChuZXh0SW5wdXRJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlmTGVmdEFycm93KCRldmVudCkpIHtcclxuICAgICAgdGhpcy5zZXRTZWxlY3RlZChwcmV2SW5wdXRJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGlzQmFja3NwYWNlID0gdGhpcy5pZkJhY2tzcGFjZU9yRGVsZXRlKCRldmVudCk7XHJcbiAgICBpZiAoaXNCYWNrc3BhY2UgJiYgISRldmVudC50YXJnZXQudmFsdWUpIHtcclxuICAgICAgdGhpcy5zZXRTZWxlY3RlZChwcmV2SW5wdXRJZCk7XHJcbiAgICAgIHRoaXMucmVidWlsZFZhbHVlKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghJGV2ZW50LnRhcmdldC52YWx1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pZlZhbGlkRW50cnkoJGV2ZW50KSkge1xyXG4gICAgICB0aGlzLnNldFNlbGVjdGVkKG5leHRJbnB1dElkKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVidWlsZFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBhcHBlbmRLZXkoaWQpIHtcclxuICAgIHJldHVybiBgJHtpZH1fJHt0aGlzLmNvbXBvbmVudEtleX1gO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0ZWQoZWxlSWQpIHtcclxuICAgIHRoaXMuZm9jdXNUbyhlbGVJZCk7XHJcbiAgICBjb25zdCBlbGU6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZUlkKTtcclxuICAgIGlmIChlbGUgJiYgZWxlLnNldFNlbGVjdGlvblJhbmdlKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGVsZS5zZXRTZWxlY3Rpb25SYW5nZSgwLCAxKTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZlZhbGlkRW50cnkoZXZlbnQpIHtcclxuICAgIGNvbnN0IGlucCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQua2V5Q29kZSk7XHJcbiAgICBjb25zdCBpc01vYmlsZSA9IC9pUGhvbmV8aVBhZHxpUG9kfEFuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgaXNNb2JpbGUgfHxcclxuICAgICAgL1thLXpBLVowLTktX10vLnRlc3QoaW5wKSB8fFxyXG4gICAgICAodGhpcy5jb25maWcuYWxsb3dLZXlDb2RlcyAmJlxyXG4gICAgICAgIHRoaXMuY29uZmlnLmFsbG93S2V5Q29kZXMuaW5jbHVkZXMoZXZlbnQua2V5Q29kZSkpIHx8XHJcbiAgICAgIChldmVudC5rZXlDb2RlID49IDk2ICYmIGV2ZW50LmtleUNvZGUgPD0gMTA1KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZvY3VzVG8oZWxlSWQpIHtcclxuICAgIGNvbnN0IGVsZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlSWQpO1xyXG4gICAgaWYgKGVsZSkge1xyXG4gICAgICBlbGUuZm9jdXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIG1ldGhvZCB0byBzZXQgY29tcG9uZW50IHZhbHVlXHJcbiAgc2V0VmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLmFsbG93TnVtYmVyc09ubHkgJiYgaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vdHBGb3JtLnJlc2V0KCk7XHJcbiAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgdGhpcy5yZWJ1aWxkVmFsdWUoKTtcclxuICAgICAgIHJldHVybjtcclxuICAgICB9XHJcbiAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL1xccy9nLCAnJyk7IC8vIHJlbW92ZSB3aGl0ZXNwYWNlXHJcbiAgICAgQXJyYXkuZnJvbSh2YWx1ZSkuZm9yRWFjaCgoYywgaWR4KSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5vdHBGb3JtLmdldCh0aGlzLmdldENvbnRyb2xOYW1lKGlkeCkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3RwRm9ybS5nZXQodGhpcy5nZXRDb250cm9sTmFtZShpZHgpKS5zZXRWYWx1ZShjKTtcclxuICAgICAgICAgIH1cclxuICAgICB9KTtcclxuICAgICBpZiAoIXRoaXMuY29uZmlnLmRpc2FibGVBdXRvRm9jdXMpIHtcclxuICAgICAgY29uc3QgY29udGFpbmVySXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjXyR7dGhpcy5jb21wb25lbnRLZXl9YCk7XHJcbiAgICAgIHZhciBpbmRleE9mRWxlbWVudFRvRm9jdXMgPSB2YWx1ZS5sZW5ndGggPCB0aGlzLmNvbmZpZy5sZW5ndGggPyB2YWx1ZS5sZW5ndGggOiAodGhpcy5jb25maWcubGVuZ3RoIC0gMSk7XHJcbiAgICAgIGxldCBlbGUgOiBhbnkgPSBjb250YWluZXJJdGVtLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ290cC1pbnB1dCcpW2luZGV4T2ZFbGVtZW50VG9Gb2N1c107XHJcbiAgICAgIGlmIChlbGUgJiYgZWxlLmZvY3VzKSB7XHJcbiAgICAgICAgZWxlLmZvY3VzKCk7XHJcbiAgICAgIH1cclxuICAgICB9XHJcbiAgICAgdGhpcy5yZWJ1aWxkVmFsdWUoKTtcclxuICB9XHJcblxyXG5cclxuICByZWJ1aWxkVmFsdWUoKSB7XHJcbiAgICBsZXQgdmFsID0gJyc7XHJcbiAgICB0aGlzLmtleXNQaXBlLnRyYW5zZm9ybSh0aGlzLm90cEZvcm0uY29udHJvbHMpLmZvckVhY2goayA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm90cEZvcm0uY29udHJvbHNba10udmFsdWUpIHtcclxuICAgICAgICB2YWwgKz0gdGhpcy5vdHBGb3JtLmNvbnRyb2xzW2tdLnZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMub25JbnB1dENoYW5nZS5lbWl0KHZhbCk7XHJcbiAgfVxyXG4gIGdldElucHV0VHlwZSgpOnN0cmluZ3tcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5pc1Bhc3N3b3JkSW5wdXQgXHJcbiAgICAgID8gJ3Bhc3N3b3JkJyBcclxuICAgICAgOiB0aGlzLmNvbmZpZy5hbGxvd051bWJlcnNPbmx5IFxyXG4gICAgICAgID8gJ3RlbCdcclxuICAgICAgICA6ICd0ZXh0JztcclxuICB9XHJcbiAgaGFuZGxlUGFzdGUoZSkge1xyXG4gICAgLy8gR2V0IHBhc3RlZCBkYXRhIHZpYSBjbGlwYm9hcmQgQVBJXHJcbiAgICBsZXQgY2xpcGJvYXJkRGF0YSA9IGUuY2xpcGJvYXJkRGF0YSB8fCB3aW5kb3dbJ2NsaXBib2FyZERhdGEnXTtcclxuICAgIGlmKGNsaXBib2FyZERhdGEpe1xyXG4gICAgIHZhciBwYXN0ZWREYXRhID1jbGlwYm9hcmREYXRhLmdldERhdGEoJ1RleHQnKTtcclxuICAgIH1cclxuICAgIC8vIFN0b3AgZGF0YSBhY3R1YWxseSBiZWluZyBwYXN0ZWQgaW50byBkaXZcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiAoIXBhc3RlZERhdGEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRWYWx1ZShwYXN0ZWREYXRhKTtcclxuICB9XHJcbn1cclxuIl19