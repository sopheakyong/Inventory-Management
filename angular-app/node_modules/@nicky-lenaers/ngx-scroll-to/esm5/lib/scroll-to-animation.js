import { ReplaySubject } from 'rxjs';
import { EASING } from './scroll-to-helpers';
/** Scroll To Animation */
var ScrollToAnimation = /** @class */ (function () {
    /**
     * Class Constructor.
     *
     * @param container            The Container
     * @param listenerTarget       The Element that listens for DOM Events
     * @param isWindow             Whether or not the listener is the Window
     * @param to                   Position to scroll to
     * @param options              Additional options for scrolling
     * @param isBrowser            Whether or not execution runs in the browser
     *                              (as opposed to the server)
     */
    function ScrollToAnimation(container, listenerTarget, isWindow, to, options, isBrowser) {
        var _this = this;
        this.container = container;
        this.listenerTarget = listenerTarget;
        this.isWindow = isWindow;
        this.to = to;
        this.options = options;
        this.isBrowser = isBrowser;
        /** Recursively loop over the Scroll Animation */
        this.loop = function () {
            _this.timeLapsed += _this.tick;
            _this.percentage = (_this.timeLapsed / _this.options.duration);
            _this.percentage = (_this.percentage > 1) ? 1 : _this.percentage;
            // Position Update
            _this.position = _this.startPosition +
                ((_this.startPosition - _this.to <= 0 ? 1 : -1) *
                    _this.distance *
                    EASING[_this.options.easing](_this.percentage));
            if (_this.lastPosition !== null && _this.position === _this.lastPosition) {
                _this.stop();
            }
            else {
                _this.source$.next(_this.position);
                _this.isWindow
                    ? _this.listenerTarget.scrollTo(0, Math.floor(_this.position))
                    : _this.container.scrollTop = Math.floor(_this.position);
                _this.lastPosition = _this.position;
            }
        };
        this.tick = 16;
        this.interval = null;
        this.lastPosition = null;
        this.timeLapsed = 0;
        this.windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (!this.container) {
            this.startPosition = this.windowScrollTop;
        }
        else {
            this.startPosition = this.isWindow ? this.windowScrollTop : this.container.scrollTop;
        }
        // Correction for Starting Position of nested HTML Elements
        if (this.container && !this.isWindow) {
            this.to = this.to - this.container.getBoundingClientRect().top + this.startPosition;
        }
        // Set Distance
        var directionalDistance = this.startPosition - this.to;
        this.distance = this.container ? Math.abs(this.startPosition - this.to) : this.to;
        this.mappedOffset = this.options.offset;
        // Set offset from Offset Map
        if (this.isBrowser) {
            this.options
                .offsetMap
                .forEach(function (value, key) { return _this.mappedOffset = window.innerWidth > key ? value : _this.mappedOffset; });
        }
        this.distance += this.mappedOffset * (directionalDistance <= 0 ? 1 : -1);
        this.source$ = new ReplaySubject();
    }
    /**
     * Start the new Scroll Animation.
     *
     * @returns         Observable containing a number
     */
    ScrollToAnimation.prototype.start = function () {
        clearInterval(this.interval);
        this.interval = setInterval(this.loop, this.tick);
        return this.source$.asObservable();
    };
    /**
     * Stop the current Scroll Animation Loop.
     *
     * @param force          Force to stop the Animation Loop
     * @returns               Void
     */
    ScrollToAnimation.prototype.stop = function () {
        clearInterval(this.interval);
        this.interval = null;
        this.source$.complete();
    };
    return ScrollToAnimation;
}());
export { ScrollToAnimation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXRvLWFuaW1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuaWNreS1sZW5hZXJzL25neC1zY3JvbGwtdG8vIiwic291cmNlcyI6WyJsaWIvc2Nyb2xsLXRvLWFuaW1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUc3QywwQkFBMEI7QUFDMUI7SUFtQ0U7Ozs7Ozs7Ozs7T0FVRztJQUNILDJCQUNVLFNBQXNCLEVBQ3RCLGNBQXNDLEVBQzdCLFFBQWlCLEVBQ2pCLEVBQVUsRUFDVixPQUE4QixFQUN2QyxTQUFrQjtRQU41QixpQkF5Q0M7UUF4Q1MsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQUN0QixtQkFBYyxHQUFkLGNBQWMsQ0FBd0I7UUFDN0IsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFDdkMsY0FBUyxHQUFULFNBQVMsQ0FBUztRQTRENUIsaURBQWlEO1FBQ3pDLFNBQUksR0FBRztZQUViLEtBQUksQ0FBQyxVQUFVLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQztZQUM3QixLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVELEtBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUM7WUFFOUQsa0JBQWtCO1lBQ2xCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGFBQWE7Z0JBQ2hDLENBQUMsQ0FBQyxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUks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dkUsQ0FBdUUsQ0FBQyxDQUFDO1NBQ3JHO1FBRUQsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsbUJBQW1CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsaUNBQUssR0FBTDtRQUNFLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGdDQUFJLEdBQUo7UUFDRSxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQXlCSCx3QkFBQztBQUFELENBQUMsQUF2SUQsSUF1SUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEVBU0lORyB9IGZyb20gJy4vc2Nyb2xsLXRvLWhlbHBlcnMnO1xuaW1wb3J0IHsgU2Nyb2xsVG9Db25maWdPcHRpb25zLCBTY3JvbGxUb0xpc3RlbmVyVGFyZ2V0IH0gZnJvbSAnLi9zY3JvbGwtdG8tY29uZmlnLmludGVyZmFjZSc7XG5cbi8qKiBTY3JvbGwgVG8gQW5pbWF0aW9uICovXG5leHBvcnQgY2xhc3MgU2Nyb2xsVG9BbmltYXRpb24ge1xuXG4gIC8qKiBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIGZvciBlYWNoIFRpY2sgKi9cbiAgcHJpdmF0ZSB0aWNrOiBudW1iZXI7XG5cbiAgLyoqIEludGVydmFsICovXG4gIHByaXZhdGUgaW50ZXJ2YWw6IGFueTtcblxuICAvKiogVGltZSBMYXBzZWQgaW4gbWlsbGlzZWNvbmRzICovXG4gIHByaXZhdGUgdGltZUxhcHNlZDogbnVtYmVyO1xuXG4gIC8qKiBQZXJjZW50YWdlIG9mIHRpbWUgbGFwc2VkICovXG4gIHByaXZhdGUgcGVyY2VudGFnZTogbnVtYmVyO1xuXG4gIC8qKiBQb3NpdGlvbiBvZiB0aGUgRWxlbWVudCAqL1xuICBwcml2YXRlIHBvc2l0aW9uOiBudW1iZXI7XG5cbiAgLyoqIExhc3QgRWxlbWVudCBQb3NpdGlvbiAqL1xuICBwcml2YXRlIGxhc3RQb3NpdGlvbjogbnVtYmVyO1xuXG4gIC8qKiBTdGFydCBQb3NpdGlvbiBvZiB0aGUgRWxlbWVudCAqL1xuICBwcml2YXRlIHN0YXJ0UG9zaXRpb246IG51bWJlcjtcblxuICAvKiogVGhlIERpc3RhbmNlIHRvIHNjcm9sbCAqL1xuICBwcml2YXRlIGRpc3RhbmNlOiBudW1iZXI7XG5cbiAgLyoqIE9ic2VydmFibGUgU291cmNlICovXG4gIHByaXZhdGUgc291cmNlJDogUmVwbGF5U3ViamVjdDxudW1iZXI+O1xuXG4gIC8qKiBTY3JvbGwgVG9wIG9mIHRoZSBXaW5kb3cgKi9cbiAgcHJpdmF0ZSB3aW5kb3dTY3JvbGxUb3A6IG51bWJlcjtcblxuICAvKiogTWFwcGVkIE9mZnNldCB0YWtlbiBmcm9tIHRoZSBhY3RpdmUgT2Zmc2V0IE1hcCAqL1xuICBwcml2YXRlIG1hcHBlZE9mZnNldDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDbGFzcyBDb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHBhcmFtIGNvbnRhaW5lciAgICAgICAgICAgIFRoZSBDb250YWluZXJcbiAgICogQHBhcmFtIGxpc3RlbmVyVGFyZ2V0ICAgICAgIFRoZSBFbGVtZW50IHRoYXQgbGlzdGVucyBmb3IgRE9NIEV2ZW50c1xuICAgKiBAcGFyYW0gaXNXaW5kb3cgICAgICAgICAgICAgV2hldGhlciBvciBub3QgdGhlIGxpc3RlbmVyIGlzIHRoZSBXaW5kb3dcbiAgICogQHBhcmFtIHRvICAgICAgICAgICAgICAgICAgIFBvc2l0aW9uIHRvIHNjcm9sbCB0b1xuICAgKiBAcGFyYW0gb3B0aW9ucyAgICAgICAgICAgICAgQWRkaXRpb25hbCBvcHRpb25zIGZvciBzY3JvbGxpbmdcbiAgICogQHBhcmFtIGlzQnJvd3NlciAgICAgICAgICAgIFdoZXRoZXIgb3Igbm90IGV4ZWN1dGlvbiBydW5zIGluIHRoZSBicm93c2VyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFzIG9wcG9zZWQgdG8gdGhlIHNlcnZlcilcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgICBwcml2YXRlIGxpc3RlbmVyVGFyZ2V0OiBTY3JvbGxUb0xpc3RlbmVyVGFyZ2V0LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXNXaW5kb3c6IGJvb2xlYW4sXG4gICAgcHJpdmF0ZSByZWFkb25seSB0bzogbnVtYmVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgb3B0aW9uczogU2Nyb2xsVG9Db25maWdPcHRpb25zLFxuICAgIHByaXZhdGUgaXNCcm93c2VyOiBib29sZWFuXG4gICkge1xuICAgIHRoaXMudGljayA9IDE2O1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsO1xuICAgIHRoaXMubGFzdFBvc2l0aW9uID0gbnVsbDtcbiAgICB0aGlzLnRpbWVMYXBzZWQgPSAwO1xuXG4gICAgdGhpcy53aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwO1xuXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy5zdGFydFBvc2l0aW9uID0gdGhpcy53aW5kb3dTY3JvbGxUb3A7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHRoaXMuaXNXaW5kb3cgPyB0aGlzLndpbmRvd1Njcm9sbFRvcCA6IHRoaXMuY29udGFpbmVyLnNjcm9sbFRvcDtcbiAgICB9XG5cbiAgICAvLyBDb3JyZWN0aW9uIGZvciBTdGFydGluZyBQb3NpdGlvbiBvZiBuZXN0ZWQgSFRNTCBFbGVtZW50c1xuICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiAhdGhpcy5pc1dpbmRvdykge1xuICAgICAgdGhpcy50byA9IHRoaXMudG8gLSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB0aGlzLnN0YXJ0UG9zaXRpb247XG4gICAgfVxuXG4gICAgLy8gU2V0IERpc3RhbmNlXG4gICAgY29uc3QgZGlyZWN0aW9uYWxEaXN0YW5jZSA9IHRoaXMuc3RhcnRQb3NpdGlvbiAtIHRoaXMudG87XG4gICAgdGhpcy5kaXN0YW5jZSA9IHRoaXMuY29udGFpbmVyID8gTWF0aC5hYnModGhpcy5zdGFydFBvc2l0aW9uIC0gdGhpcy50bykgOiB0aGlzLnRvO1xuXG4gICAgdGhpcy5tYXBwZWRPZmZzZXQgPSB0aGlzLm9wdGlvbnMub2Zmc2V0O1xuXG4gICAgLy8gU2V0IG9mZnNldCBmcm9tIE9mZnNldCBNYXBcbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICAub2Zmc2V0TWFwXG4gICAgICAgIC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB0aGlzLm1hcHBlZE9mZnNldCA9IHdpbmRvdy5pbm5lcldpZHRoID4ga2V5ID8gdmFsdWUgOiB0aGlzLm1hcHBlZE9mZnNldCk7XG4gICAgfVxuXG4gICAgdGhpcy5kaXN0YW5jZSArPSB0aGlzLm1hcHBlZE9mZnNldCAqIChkaXJlY3Rpb25hbERpc3RhbmNlIDw9IDAgPyAxIDogLTEpO1xuICAgIHRoaXMuc291cmNlJCA9IG5ldyBSZXBsYXlTdWJqZWN0KCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgdGhlIG5ldyBTY3JvbGwgQW5pbWF0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyAgICAgICAgIE9ic2VydmFibGUgY29udGFpbmluZyBhIG51bWJlclxuICAgKi9cbiAgc3RhcnQoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLmxvb3AsIHRoaXMudGljayk7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIHRoZSBjdXJyZW50IFNjcm9sbCBBbmltYXRpb24gTG9vcC5cbiAgICpcbiAgICogQHBhcmFtIGZvcmNlICAgICAgICAgIEZvcmNlIHRvIHN0b3AgdGhlIEFuaW1hdGlvbiBMb29wXG4gICAqIEByZXR1cm5zICAgICAgICAgICAgICAgVm9pZFxuICAgKi9cbiAgc3RvcCgpOiB2b2lkIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsO1xuICAgIHRoaXMuc291cmNlJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqIFJlY3Vyc2l2ZWx5IGxvb3Agb3ZlciB0aGUgU2Nyb2xsIEFuaW1hdGlvbiAqL1xuICBwcml2YXRlIGxvb3AgPSAoKTogdm9pZCA9PiB7XG5cbiAgICB0aGlzLnRpbWVMYXBzZWQgKz0gdGhpcy50aWNrO1xuICAgIHRoaXMucGVyY2VudGFnZSA9ICh0aGlzLnRpbWVMYXBzZWQgLyB0aGlzLm9wdGlvbnMuZHVyYXRpb24pO1xuICAgIHRoaXMucGVyY2VudGFnZSA9ICh0aGlzLnBlcmNlbnRhZ2UgPiAxKSA/IDEgOiB0aGlzLnBlcmNlbnRhZ2U7XG5cbiAgICAvLyBQb3NpdGlvbiBVcGRhdGVcbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5zdGFydFBvc2l0aW9uICtcbiAgICAgICgodGhpcy5zdGFydFBvc2l0aW9uIC0gdGhpcy50byA8PSAwID8gMSA6IC0xKSAqXG4gICAgICAgIHRoaXMuZGlzdGFuY2UgKlxuICAgICAgICBFQVNJTkdbdGhpcy5vcHRpb25zLmVhc2luZ10odGhpcy5wZXJjZW50YWdlKSk7XG5cbiAgICBpZiAodGhpcy5sYXN0UG9zaXRpb24gIT09IG51bGwgJiYgdGhpcy5wb3NpdGlvbiA9PT0gdGhpcy5sYXN0UG9zaXRpb24pIHtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNvdXJjZSQubmV4dCh0aGlzLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMuaXNXaW5kb3dcbiAgICAgICAgPyB0aGlzLmxpc3RlbmVyVGFyZ2V0LnNjcm9sbFRvKDAsIE1hdGguZmxvb3IodGhpcy5wb3NpdGlvbikpXG4gICAgICAgIDogdGhpcy5jb250YWluZXIuc2Nyb2xsVG9wID0gTWF0aC5mbG9vcih0aGlzLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==