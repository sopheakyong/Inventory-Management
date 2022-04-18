import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ScrollToDirective } from './scroll-to.directive';
import { ScrollToService } from './scroll-to.service';
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
export { ScrollToModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXRvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuaWNreS1sZW5hZXJzL25neC1zY3JvbGwtdG8vIiwic291cmNlcyI6WyJsaWIvc2Nyb2xsLXRvLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELHVCQUF1QjtBQVN2QjtJQUFBO0lBZUEsQ0FBQzt1QkFmWSxjQUFjO0lBRXpCOzs7O09BSUc7SUFDSSxzQkFBTyxHQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsZUFBZTthQUNoQjtTQUNGLENBQUM7SUFDSixDQUFDOztJQWRVLGNBQWM7UUFSMUIsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNaLGlCQUFpQjthQUNsQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxpQkFBaUI7YUFDbEI7U0FDRixDQUFDO09BQ1csY0FBYyxDQWUxQjtJQUFELHFCQUFDO0NBQUEsQUFmRCxJQWVDO1NBZlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY3JvbGxUb0RpcmVjdGl2ZSB9IGZyb20gJy4vc2Nyb2xsLXRvLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxUb1NlcnZpY2UgfSBmcm9tICcuL3Njcm9sbC10by5zZXJ2aWNlJztcblxuLyoqIFNjcm9sbCBUbyBNb2R1bGUgKi9cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFNjcm9sbFRvRGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTY3JvbGxUb0RpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFRvTW9kdWxlIHtcblxuICAvKipcbiAgICogR3VhcmFudGVlZCBzaW5nbGV0b25zIGZvciBwcm92aWRlZCBTZXJ2aWNlcyBhY3Jvc3MgQXBwLlxuICAgKlxuICAgKiBAcmV0dXJuICAgICAgICAgIEFuIEFuZ3VsYXIgTW9kdWxlIHdpdGggUHJvdmlkZXJzXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFNjcm9sbFRvTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTY3JvbGxUb01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBTY3JvbGxUb1NlcnZpY2VcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=