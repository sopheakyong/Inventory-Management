var ScrollToModule_1;
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ScrollToDirective } from './scroll-to.directive';
import { ScrollToService } from './scroll-to.service';
/** Scroll To Module */
let ScrollToModule = ScrollToModule_1 = class ScrollToModule {
    /**
     * Guaranteed singletons for provided Services across App.
     *
     * @return          An Angular Module with Providers
     */
    static forRoot() {
        return {
            ngModule: ScrollToModule_1,
            providers: [
                ScrollToService
            ]
        };
    }
};
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
export { ScrollToModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXRvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuaWNreS1sZW5hZXJzL25neC1zY3JvbGwtdG8vIiwic291cmNlcyI6WyJsaWIvc2Nyb2xsLXRvLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RCx1QkFBdUI7QUFTdkIsSUFBYSxjQUFjLHNCQUEzQixNQUFhLGNBQWM7SUFFekI7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsZUFBZTthQUNoQjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQWZZLGNBQWM7SUFSMUIsUUFBUSxDQUFDO1FBQ1IsWUFBWSxFQUFFO1lBQ1osaUJBQWlCO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsaUJBQWlCO1NBQ2xCO0tBQ0YsQ0FBQztHQUNXLGNBQWMsQ0FlMUI7U0FmWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjcm9sbFRvRGlyZWN0aXZlIH0gZnJvbSAnLi9zY3JvbGwtdG8uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbFRvU2VydmljZSB9IGZyb20gJy4vc2Nyb2xsLXRvLnNlcnZpY2UnO1xuXG4vKiogU2Nyb2xsIFRvIE1vZHVsZSAqL1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2Nyb2xsVG9EaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNjcm9sbFRvRGlyZWN0aXZlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsVG9Nb2R1bGUge1xuXG4gIC8qKlxuICAgKiBHdWFyYW50ZWVkIHNpbmdsZXRvbnMgZm9yIHByb3ZpZGVkIFNlcnZpY2VzIGFjcm9zcyBBcHAuXG4gICAqXG4gICAqIEByZXR1cm4gICAgICAgICAgQW4gQW5ndWxhciBNb2R1bGUgd2l0aCBQcm92aWRlcnNcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U2Nyb2xsVG9Nb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNjcm9sbFRvTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFNjcm9sbFRvU2VydmljZVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==