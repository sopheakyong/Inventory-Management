import { __decorate } from "tslib";
import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { DEFAULTS, EVENTS } from './scroll-to-helpers';
import { ScrollToService } from './scroll-to.service';
let ScrollToDirective = class ScrollToDirective {
    constructor(elementRef, scrollToService, renderer2) {
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
    ngAfterViewInit() {
        // Test Event Support
        if (EVENTS.indexOf(this.ngxScrollToEvent) === -1) {
            throw new Error(`Unsupported Event '${this.ngxScrollToEvent}'`);
        }
        // Listen for the trigger...
        this.renderer2.listen(this.elementRef.nativeElement, this.ngxScrollToEvent, (event) => {
            this.options = {
                target: this.ngxScrollTo,
                duration: this.ngxScrollToDuration,
                easing: this.ngxScrollToEasing,
                offset: this.ngxScrollToOffset,
                offsetMap: this.ngxScrollToOffsetMap
            };
            this.scrollToService.scrollTo(this.options);
        });
    }
};
ScrollToDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ScrollToService },
    { type: Renderer2 }
];
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
export { ScrollToDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXRvLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuaWNreS1sZW5hZXJzL25neC1zY3JvbGwtdG8vIiwic291cmNlcyI6WyJsaWIvc2Nyb2xsLXRvLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUl2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFLdEQsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFzQjVCLFlBQ1UsVUFBc0IsRUFDdEIsZUFBZ0MsRUFDaEMsU0FBb0I7UUFGcEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQXRCOUIsZ0JBQVcsR0FBbUIsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUc5QyxxQkFBZ0IsR0FBa0IsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUdsRCx3QkFBbUIsR0FBVyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBR2hELHNCQUFpQixHQUE0QixRQUFRLENBQUMsTUFBTSxDQUFDO1FBRzdELHNCQUFpQixHQUFXLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFHNUMseUJBQW9CLEdBQXNCLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFRN0QsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGVBQWU7UUFFYixxQkFBcUI7UUFDckIsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7U0FDakU7UUFFRCw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUN4RSxDQUFDLEtBQVksRUFBRSxFQUFFO1lBRWYsSUFBSSxDQUFDLE9BQU8sR0FBRztnQkFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQ3hCLFFBQVEsRUFBRSxJQUFJLENBQUMsbUJBQW1CO2dCQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtnQkFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7Z0JBQzlCLFNBQVMsRUFBRSxJQUFJLENBQUMsb0JBQW9CO2FBQ3JDLENBQUM7WUFFRixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0YsQ0FBQTs7WUFsQ3VCLFVBQVU7WUFDTCxlQUFlO1lBQ3JCLFNBQVM7O0FBdEI5QjtJQURDLEtBQUssRUFBRTtzREFDc0M7QUFHOUM7SUFEQyxLQUFLLEVBQUU7MkRBQzBDO0FBR2xEO0lBREMsS0FBSyxFQUFFOzhEQUN3QztBQUdoRDtJQURDLEtBQUssRUFBRTs0REFDcUQ7QUFHN0Q7SUFEQyxLQUFLLEVBQUU7NERBQ29DO0FBRzVDO0lBREMsS0FBSyxFQUFFOytEQUNxRDtBQWxCbEQsaUJBQWlCO0lBSDdCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO0tBQzFCLENBQUM7R0FDVyxpQkFBaUIsQ0F5RDdCO1NBekRZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBERUZBVUxUUywgRVZFTlRTIH0gZnJvbSAnLi9zY3JvbGwtdG8taGVscGVycyc7XG5pbXBvcnQgeyBTY3JvbGxUb0NvbmZpZ09wdGlvbnMsIFNjcm9sbFRvT2Zmc2V0TWFwLCBTY3JvbGxUb1RhcmdldCB9IGZyb20gJy4vc2Nyb2xsLXRvLWNvbmZpZy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2Nyb2xsVG9BbmltYXRpb25FYXNpbmcgfSBmcm9tICcuL3Njcm9sbC10by1lYXNpbmcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNjcm9sbFRvRXZlbnQgfSBmcm9tICcuL3Njcm9sbC10by1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2Nyb2xsVG9TZXJ2aWNlIH0gZnJvbSAnLi9zY3JvbGwtdG8uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ3hTY3JvbGxUb10nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFRvRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KClcbiAgbmd4U2Nyb2xsVG86IFNjcm9sbFRvVGFyZ2V0ID0gREVGQVVMVFMudGFyZ2V0O1xuXG4gIEBJbnB1dCgpXG4gIG5neFNjcm9sbFRvRXZlbnQ6IFNjcm9sbFRvRXZlbnQgPSBERUZBVUxUUy5hY3Rpb247XG5cbiAgQElucHV0KClcbiAgbmd4U2Nyb2xsVG9EdXJhdGlvbjogbnVtYmVyID0gREVGQVVMVFMuZHVyYXRpb247XG5cbiAgQElucHV0KClcbiAgbmd4U2Nyb2xsVG9FYXNpbmc6IFNjcm9sbFRvQW5pbWF0aW9uRWFzaW5nID0gREVGQVVMVFMuZWFzaW5nO1xuXG4gIEBJbnB1dCgpXG4gIG5neFNjcm9sbFRvT2Zmc2V0OiBudW1iZXIgPSBERUZBVUxUUy5vZmZzZXQ7XG5cbiAgQElucHV0KClcbiAgbmd4U2Nyb2xsVG9PZmZzZXRNYXA6IFNjcm9sbFRvT2Zmc2V0TWFwID0gREVGQVVMVFMub2Zmc2V0TWFwO1xuXG4gIHByaXZhdGUgb3B0aW9uczogU2Nyb2xsVG9Db25maWdPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHNjcm9sbFRvU2VydmljZTogU2Nyb2xsVG9TZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXIyOiBSZW5kZXJlcjIpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbmd1bGFyIExpZmVjeWNsZSBIb29rIC0gQWZ0ZXIgVmlldyBJbml0XG4gICAqXG4gICAqIEB0b2RvIEltcGxlbWVudCBTdWJzY3JpcHRpb24gZm9yIEV2ZW50c1xuICAgKlxuICAgKiBAcmV0dXJucyB2b2lkXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG5cbiAgICAvLyBUZXN0IEV2ZW50IFN1cHBvcnRcbiAgICBpZiAoRVZFTlRTLmluZGV4T2YodGhpcy5uZ3hTY3JvbGxUb0V2ZW50KSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgRXZlbnQgJyR7dGhpcy5uZ3hTY3JvbGxUb0V2ZW50fSdgKTtcbiAgICB9XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHRoZSB0cmlnZ2VyLi4uXG4gICAgdGhpcy5yZW5kZXJlcjIubGlzdGVuKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLm5neFNjcm9sbFRvRXZlbnQsXG4gICAgICAoZXZlbnQ6IEV2ZW50KSA9PiB7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgIHRhcmdldDogdGhpcy5uZ3hTY3JvbGxUbyxcbiAgICAgICAgICBkdXJhdGlvbjogdGhpcy5uZ3hTY3JvbGxUb0R1cmF0aW9uLFxuICAgICAgICAgIGVhc2luZzogdGhpcy5uZ3hTY3JvbGxUb0Vhc2luZyxcbiAgICAgICAgICBvZmZzZXQ6IHRoaXMubmd4U2Nyb2xsVG9PZmZzZXQsXG4gICAgICAgICAgb2Zmc2V0TWFwOiB0aGlzLm5neFNjcm9sbFRvT2Zmc2V0TWFwXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zY3JvbGxUb1NlcnZpY2Uuc2Nyb2xsVG8odGhpcy5vcHRpb25zKTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=