/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
export class NumberOnlyDirective {
    /**
     * @param {?} _elRef
     * @param {?} _renderer
     */
    constructor(_elRef, _renderer) {
        this._elRef = _elRef;
        this._renderer = _renderer;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.disabledNumberOnly) {
            this._renderer.setAttribute(this._elRef.nativeElement, 'onkeypress', 'return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0');
        }
    }
}
NumberOnlyDirective.decorators = [
    { type: Directive, args: [{
                selector: '[numberOnly]'
            },] }
];
/** @nocollapse */
NumberOnlyDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NumberOnlyDirective.propDecorators = {
    disabledNumberOnly: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLW9ubHkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctb3RwLWlucHV0LyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvbnVtYmVyLW9ubHkuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3hFLE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBRTlCLFlBQXFCLE1BQWtCLEVBQVUsU0FBb0I7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFBSSxDQUFDOzs7O0lBRTFFLFFBQVE7UUFDTixJQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSw4RUFBOEUsQ0FBQyxDQUFDO1NBQ3RKO0lBQ0gsQ0FBQzs7O1lBWEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2FBQ3pCOzs7O1lBSm1CLFVBQVU7WUFBRSxTQUFTOzs7aUNBTXRDLEtBQUs7Ozs7SUFBTixpREFBb0M7Ozs7O0lBQ3ZCLHFDQUEwQjs7Ozs7SUFBRSx3Q0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW251bWJlck9ubHldJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTnVtYmVyT25seURpcmVjdGl2ZSB7XHJcbiAgQElucHV0KCkgZGlzYWJsZWROdW1iZXJPbmx5OmJvb2xlYW47XHJcbiAgY29uc3RydWN0b3IgKHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZighdGhpcy5kaXNhYmxlZE51bWJlck9ubHkpe1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgJ29ua2V5cHJlc3MnLCAncmV0dXJuIChldmVudC5jaGFyQ29kZSA+PSA0OCAmJiBldmVudC5jaGFyQ29kZSA8PSA1NykgfHwgZXZlbnQuY2hhckNvZGUgPT0gMCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0iXX0=