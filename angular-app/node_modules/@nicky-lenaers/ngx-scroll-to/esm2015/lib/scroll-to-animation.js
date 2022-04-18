import { ReplaySubject } from 'rxjs';
import { EASING } from './scroll-to-helpers';
/** Scroll To Animation */
export class ScrollToAnimation {
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
    constructor(container, listenerTarget, isWindow, to, options, isBrowser) {
        this.container = container;
        this.listenerTarget = listenerTarget;
        this.isWindow = isWindow;
        this.to = to;
        this.options = options;
        this.isBrowser = isBrowser;
        /** Recursively loop over the Scroll Animation */
        this.loop = () => {
            this.timeLapsed += this.tick;
            this.percentage = (this.timeLapsed / this.options.duration);
            this.percentage = (this.percentage > 1) ? 1 : this.percentage;
            // Position Update
            this.position = this.startPosition +
                ((this.startPosition - this.to <= 0 ? 1 : -1) *
                    this.distance *
                    EASING[this.options.easing](this.percentage));
            if (this.lastPosition !== null && this.position === this.lastPosition) {
                this.stop();
            }
            else {
                this.source$.next(this.position);
                this.isWindow
                    ? this.listenerTarget.scrollTo(0, Math.floor(this.position))
                    : this.container.scrollTop = Math.floor(this.position);
                this.lastPosition = this.position;
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
        const directionalDistance = this.startPosition - this.to;
        this.distance = this.container ? Math.abs(this.startPosition - this.to) : this.to;
        this.mappedOffset = this.options.offset;
        // Set offset from Offset Map
        if (this.isBrowser) {
            this.options
                .offsetMap
                .forEach((value, key) => this.mappedOffset = window.innerWidth > key ? value : this.mappedOffset);
        }
        this.distance += this.mappedOffset * (directionalDistance <= 0 ? 1 : -1);
        this.source$ = new ReplaySubject();
    }
    /**
     * Start the new Scroll Animation.
     *
     * @returns         Observable containing a number
     */
    start() {
        clearInterval(this.interval);
        this.interval = setInterval(this.loop, this.tick);
        return this.source$.asObservable();
    }
    /**
     * Stop the current Scroll Animation Loop.
     *
     * @param force          Force to stop the Animation Loop
     * @returns               Void
     */
    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.source$.complete();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXRvLWFuaW1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuaWNreS1sZW5hZXJzL25neC1zY3JvbGwtdG8vIiwic291cmNlcyI6WyJsaWIvc2Nyb2xsLXRvLWFuaW1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUc3QywwQkFBMEI7QUFDMUIsTUFBTSxPQUFPLGlCQUFpQjtJQW1DNUI7Ozs7Ozs7Ozs7T0FVRztJQUNILFlBQ1UsU0FBc0IsRUFDdEIsY0FBc0MsRUFDN0IsUUFBaUIsRUFDakIsRUFBVSxFQUNWLE9BQThCLEVBQ3ZDLFNBQWtCO1FBTGxCLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQXdCO1FBQzdCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNWLFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBQ3ZDLGNBQVMsR0FBVCxTQUFTLENBQVM7UUE0RDVCLGlEQUFpRDtRQUN6QyxTQUFJLEdBQUcsR0FBUyxFQUFFO1lBRXhCLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFFOUQsa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWE7Z0JBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMs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QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDckc7UUFFRCxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLO1FBQ0gsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsSUFBSTtRQUNGLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBeUJGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFQVNJTkcgfSBmcm9tICcuL3Njcm9sbC10by1oZWxwZXJzJztcbmltcG9ydCB7IFNjcm9sbFRvQ29uZmlnT3B0aW9ucywgU2Nyb2xsVG9MaXN0ZW5lclRhcmdldCB9IGZyb20gJy4vc2Nyb2xsLXRvLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG4vKiogU2Nyb2xsIFRvIEFuaW1hdGlvbiAqL1xuZXhwb3J0IGNsYXNzIFNjcm9sbFRvQW5pbWF0aW9uIHtcblxuICAvKiogTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBmb3IgZWFjaCBUaWNrICovXG4gIHByaXZhdGUgdGljazogbnVtYmVyO1xuXG4gIC8qKiBJbnRlcnZhbCAqL1xuICBwcml2YXRlIGludGVydmFsOiBhbnk7XG5cbiAgLyoqIFRpbWUgTGFwc2VkIGluIG1pbGxpc2Vjb25kcyAqL1xuICBwcml2YXRlIHRpbWVMYXBzZWQ6IG51bWJlcjtcblxuICAvKiogUGVyY2VudGFnZSBvZiB0aW1lIGxhcHNlZCAqL1xuICBwcml2YXRlIHBlcmNlbnRhZ2U6IG51bWJlcjtcblxuICAvKiogUG9zaXRpb24gb2YgdGhlIEVsZW1lbnQgKi9cbiAgcHJpdmF0ZSBwb3NpdGlvbjogbnVtYmVyO1xuXG4gIC8qKiBMYXN0IEVsZW1lbnQgUG9zaXRpb24gKi9cbiAgcHJpdmF0ZSBsYXN0UG9zaXRpb246IG51bWJlcjtcblxuICAvKiogU3RhcnQgUG9zaXRpb24gb2YgdGhlIEVsZW1lbnQgKi9cbiAgcHJpdmF0ZSBzdGFydFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgLyoqIFRoZSBEaXN0YW5jZSB0byBzY3JvbGwgKi9cbiAgcHJpdmF0ZSBkaXN0YW5jZTogbnVtYmVyO1xuXG4gIC8qKiBPYnNlcnZhYmxlIFNvdXJjZSAqL1xuICBwcml2YXRlIHNvdXJjZSQ6IFJlcGxheVN1YmplY3Q8bnVtYmVyPjtcblxuICAvKiogU2Nyb2xsIFRvcCBvZiB0aGUgV2luZG93ICovXG4gIHByaXZhdGUgd2luZG93U2Nyb2xsVG9wOiBudW1iZXI7XG5cbiAgLyoqIE1hcHBlZCBPZmZzZXQgdGFrZW4gZnJvbSB0aGUgYWN0aXZlIE9mZnNldCBNYXAgKi9cbiAgcHJpdmF0ZSBtYXBwZWRPZmZzZXQ6IG51bWJlcjtcblxuICAvKipcbiAgICogQ2xhc3MgQ29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBwYXJhbSBjb250YWluZXIgICAgICAgICAgICBUaGUgQ29udGFpbmVyXG4gICAqIEBwYXJhbSBsaXN0ZW5lclRhcmdldCAgICAgICBUaGUgRWxlbWVudCB0aGF0IGxpc3RlbnMgZm9yIERPTSBFdmVudHNcbiAgICogQHBhcmFtIGlzV2luZG93ICAgICAgICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBsaXN0ZW5lciBpcyB0aGUgV2luZG93XG4gICAqIEBwYXJhbSB0byAgICAgICAgICAgICAgICAgICBQb3NpdGlvbiB0byBzY3JvbGwgdG9cbiAgICogQHBhcmFtIG9wdGlvbnMgICAgICAgICAgICAgIEFkZGl0aW9uYWwgb3B0aW9ucyBmb3Igc2Nyb2xsaW5nXG4gICAqIEBwYXJhbSBpc0Jyb3dzZXIgICAgICAgICAgICBXaGV0aGVyIG9yIG5vdCBleGVjdXRpb24gcnVucyBpbiB0aGUgYnJvd3NlclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhcyBvcHBvc2VkIHRvIHRoZSBzZXJ2ZXIpXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgcHJpdmF0ZSBsaXN0ZW5lclRhcmdldDogU2Nyb2xsVG9MaXN0ZW5lclRhcmdldCxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGlzV2luZG93OiBib29sZWFuLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdG86IG51bWJlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnM6IFNjcm9sbFRvQ29uZmlnT3B0aW9ucyxcbiAgICBwcml2YXRlIGlzQnJvd3NlcjogYm9vbGVhblxuICApIHtcbiAgICB0aGlzLnRpY2sgPSAxNjtcbiAgICB0aGlzLmludGVydmFsID0gbnVsbDtcbiAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IG51bGw7XG4gICAgdGhpcy50aW1lTGFwc2VkID0gMDtcblxuICAgIHRoaXMud2luZG93U2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMDtcblxuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IHRoaXMud2luZG93U2Nyb2xsVG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSB0aGlzLmlzV2luZG93ID8gdGhpcy53aW5kb3dTY3JvbGxUb3AgOiB0aGlzLmNvbnRhaW5lci5zY3JvbGxUb3A7XG4gICAgfVxuXG4gICAgLy8gQ29ycmVjdGlvbiBmb3IgU3RhcnRpbmcgUG9zaXRpb24gb2YgbmVzdGVkIEhUTUwgRWxlbWVudHNcbiAgICBpZiAodGhpcy5jb250YWluZXIgJiYgIXRoaXMuaXNXaW5kb3cpIHtcbiAgICAgIHRoaXMudG8gPSB0aGlzLnRvIC0gdGhpcy5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgdGhpcy5zdGFydFBvc2l0aW9uO1xuICAgIH1cblxuICAgIC8vIFNldCBEaXN0YW5jZVxuICAgIGNvbnN0IGRpcmVjdGlvbmFsRGlzdGFuY2UgPSB0aGlzLnN0YXJ0UG9zaXRpb24gLSB0aGlzLnRvO1xuICAgIHRoaXMuZGlzdGFuY2UgPSB0aGlzLmNvbnRhaW5lciA/IE1hdGguYWJzKHRoaXMuc3RhcnRQb3NpdGlvbiAtIHRoaXMudG8pIDogdGhpcy50bztcblxuICAgIHRoaXMubWFwcGVkT2Zmc2V0ID0gdGhpcy5vcHRpb25zLm9mZnNldDtcblxuICAgIC8vIFNldCBvZmZzZXQgZnJvbSBPZmZzZXQgTWFwXG4gICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgLm9mZnNldE1hcFxuICAgICAgICAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4gdGhpcy5tYXBwZWRPZmZzZXQgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IGtleSA/IHZhbHVlIDogdGhpcy5tYXBwZWRPZmZzZXQpO1xuICAgIH1cblxuICAgIHRoaXMuZGlzdGFuY2UgKz0gdGhpcy5tYXBwZWRPZmZzZXQgKiAoZGlyZWN0aW9uYWxEaXN0YW5jZSA8PSAwID8gMSA6IC0xKTtcbiAgICB0aGlzLnNvdXJjZSQgPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IHRoZSBuZXcgU2Nyb2xsIEFuaW1hdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMgICAgICAgICBPYnNlcnZhYmxlIGNvbnRhaW5pbmcgYSBudW1iZXJcbiAgICovXG4gIHN0YXJ0KCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy5sb29wLCB0aGlzLnRpY2spO1xuICAgIHJldHVybiB0aGlzLnNvdXJjZSQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCB0aGUgY3VycmVudCBTY3JvbGwgQW5pbWF0aW9uIExvb3AuXG4gICAqXG4gICAqIEBwYXJhbSBmb3JjZSAgICAgICAgICBGb3JjZSB0byBzdG9wIHRoZSBBbmltYXRpb24gTG9vcFxuICAgKiBAcmV0dXJucyAgICAgICAgICAgICAgIFZvaWRcbiAgICovXG4gIHN0b3AoKTogdm9pZCB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB0aGlzLmludGVydmFsID0gbnVsbDtcbiAgICB0aGlzLnNvdXJjZSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBSZWN1cnNpdmVseSBsb29wIG92ZXIgdGhlIFNjcm9sbCBBbmltYXRpb24gKi9cbiAgcHJpdmF0ZSBsb29wID0gKCk6IHZvaWQgPT4ge1xuXG4gICAgdGhpcy50aW1lTGFwc2VkICs9IHRoaXMudGljaztcbiAgICB0aGlzLnBlcmNlbnRhZ2UgPSAodGhpcy50aW1lTGFwc2VkIC8gdGhpcy5vcHRpb25zLmR1cmF0aW9uKTtcbiAgICB0aGlzLnBlcmNlbnRhZ2UgPSAodGhpcy5wZXJjZW50YWdlID4gMSkgPyAxIDogdGhpcy5wZXJjZW50YWdlO1xuXG4gICAgLy8gUG9zaXRpb24gVXBkYXRlXG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuc3RhcnRQb3NpdGlvbiArXG4gICAgICAoKHRoaXMuc3RhcnRQb3NpdGlvbiAtIHRoaXMudG8gPD0gMCA/IDEgOiAtMSkgKlxuICAgICAgICB0aGlzLmRpc3RhbmNlICpcbiAgICAgICAgRUFTSU5HW3RoaXMub3B0aW9ucy5lYXNpbmddKHRoaXMucGVyY2VudGFnZSkpO1xuXG4gICAgaWYgKHRoaXMubGFzdFBvc2l0aW9uICE9PSBudWxsICYmIHRoaXMucG9zaXRpb24gPT09IHRoaXMubGFzdFBvc2l0aW9uKSB7XG4gICAgICB0aGlzLnN0b3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zb3VyY2UkLm5leHQodGhpcy5wb3NpdGlvbik7XG4gICAgICB0aGlzLmlzV2luZG93XG4gICAgICAgID8gdGhpcy5saXN0ZW5lclRhcmdldC5zY3JvbGxUbygwLCBNYXRoLmZsb29yKHRoaXMucG9zaXRpb24pKVxuICAgICAgICA6IHRoaXMuY29udGFpbmVyLnNjcm9sbFRvcCA9IE1hdGguZmxvb3IodGhpcy5wb3NpdGlvbik7XG4gICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XG4gICAgfVxuICB9XG59XG4iXX0=