/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
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
        { type: Directive, args: [{
                    selector: '[numberOnly]'
                },] }
    ];
    /** @nocollapse */
    NumberOnlyDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    NumberOnlyDirective.propDecorators = {
        disabledNumberOnly: [{ type: Input }]
    };
    return NumberOnlyDirective;
}());
export { NumberOnlyDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLW9ubHkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctb3RwLWlucHV0LyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvbnVtYmVyLW9ubHkuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhFO0lBS0UsNkJBQXFCLE1BQWtCLEVBQVUsU0FBb0I7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFBSSxDQUFDOzs7O0lBRTFFLHNDQUFROzs7SUFBUjtRQUNFLElBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLDhFQUE4RSxDQUFDLENBQUM7U0FDdEo7SUFDSCxDQUFDOztnQkFYRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzs7O2dCQUptQixVQUFVO2dCQUFFLFNBQVM7OztxQ0FNdEMsS0FBSzs7SUFTUiwwQkFBQztDQUFBLEFBYkQsSUFhQztTQVZZLG1CQUFtQjs7O0lBQzlCLGlEQUFvQzs7Ozs7SUFDdkIscUNBQTBCOzs7OztJQUFFLHdDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbnVtYmVyT25seV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOdW1iZXJPbmx5RGlyZWN0aXZlIHtcclxuICBASW5wdXQoKSBkaXNhYmxlZE51bWJlck9ubHk6Ym9vbGVhbjtcclxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmKCF0aGlzLmRpc2FibGVkTnVtYmVyT25seSl7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCAnb25rZXlwcmVzcycsICdyZXR1cm4gKGV2ZW50LmNoYXJDb2RlID49IDQ4ICYmIGV2ZW50LmNoYXJDb2RlIDw9IDU3KSB8fCBldmVudC5jaGFyQ29kZSA9PSAwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSJdfQ==