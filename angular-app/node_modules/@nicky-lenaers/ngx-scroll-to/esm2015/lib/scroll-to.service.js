import { __decorate, __param } from "tslib";
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ScrollToAnimation } from './scroll-to-animation';
import { DEFAULTS, isElementRef, isNativeElement, isNumber, isString, isWindow, stripHash } from './scroll-to-helpers';
import { ReplaySubject, throwError } from 'rxjs';
/**
 * The Scroll To Service handles starting, interrupting
 * and ending the actual Scroll Animation. It provides
 * some utilities to find the proper HTML Element on a
 * given page to setup Event Listeners and calculate
 * distances for the Animation.
 */
let ScrollToService = class ScrollToService {
    /**
     * Construct and setup required paratemeters.
     *
     * @param document         A Reference to the Document
     * @param platformId       Angular Platform ID
     */
    constructor(document, platformId) {
        this.document = document;
        this.platformId = platformId;
        this.interruptiveEvents = ['mousewheel', 'DOMMouseScroll', 'touchstart'];
    }
    /**
     * Target an Element to scroll to. Notice that the `TimeOut` decorator
     * ensures the executing to take place in the next Angular lifecycle.
     * This allows for scrolling to elements that are e.g. initially hidden
     * by means of `*ngIf`, but ought to be scrolled to eventually.
     *
     * @todo type 'any' in Observable should become custom type like 'ScrollToEvent' (base class), see issue comment:
     *  - https://github.com/nicky-lenaers/ngx-scroll-to/issues/10#issuecomment-317198481
     *
     * @param options         Configuration Object
     * @returns               Observable
     */
    scrollTo(options) {
        if (!isPlatformBrowser(this.platformId)) {
            return new ReplaySubject().asObservable();
        }
        return this.start(options);
    }
    /**
     * Start a new Animation.
     *
     * @todo Emit proper events from subscription
     *
     * @param options         Configuration Object
     * @returns               Observable
     */
    start(options) {
        // Merge config with default values
        const mergedConfigOptions = Object.assign(Object.assign({}, DEFAULTS), options);
        if (this.animation) {
            this.animation.stop();
        }
        const targetNode = this.getNode(mergedConfigOptions.target);
        if (mergedConfigOptions.target && !targetNode) {
            return throwError('Unable to find Target Element');
        }
        const container = this.getContainer(mergedConfigOptions, targetNode);
        if (mergedConfigOptions.container && !container) {
            return throwError('Unable to find Container Element');
        }
        const listenerTarget = this.getListenerTarget(container) || window;
        let to = container ? container.getBoundingClientRect().top : 0;
        if (targetNode) {
            to = isWindow(listenerTarget) ?
                window.scrollY + targetNode.getBoundingClientRect().top :
                targetNode.getBoundingClientRect().top;
        }
        // Create Animation
        this.animation = new ScrollToAnimation(container, listenerTarget, isWindow(listenerTarget), to, mergedConfigOptions, isPlatformBrowser(this.platformId));
        const onInterrupt = () => this.animation.stop();
        this.addInterruptiveEventListeners(listenerTarget, onInterrupt);
        // Start Animation
        const animation$ = this.animation.start();
        this.subscribeToAnimation(animation$, listenerTarget, onInterrupt);
        return animation$;
    }
    /**
     * Subscribe to the events emitted from the Scrolling
     * Animation. Events might be used for e.g. unsubscribing
     * once finished.
     *
     * @param animation$              The Animation Observable
     * @param listenerTarget          The Listener Target for events
     * @param onInterrupt             The handler for Interruptive Events
     * @returns                       Void
     */
    subscribeToAnimation(animation$, listenerTarget, onInterrupt) {
        const subscription = animation$
            .subscribe(() => {
        }, () => {
        }, () => {
            this.removeInterruptiveEventListeners(this.interruptiveEvents, listenerTarget, onInterrupt);
            subscription.unsubscribe();
        });
    }
    /**
     * Get the container HTML Element in which
     * the scrolling should happen.
     *
     * @param options         The Merged Configuration Object
     * @param targetNode    the targeted HTMLElement
     */
    getContainer(options, targetNode) {
        let container = null;
        if (options.container) {
            container = this.getNode(options.container, true);
        }
        else if (targetNode) {
            container = this.getFirstScrollableParent(targetNode);
        }
        return container;
    }
    /**
     * Add listeners for the Animation Interruptive Events
     * to the Listener Target.
     *
     * @param events            List of events to listen to
     * @param listenerTarget    Target to attach the listener on
     * @param handler           Handler for when the listener fires
     * @returns                 Void
     */
    addInterruptiveEventListeners(listenerTarget, handler) {
        if (!listenerTarget) {
            listenerTarget = window;
        }
        this.interruptiveEvents
            .forEach(event => listenerTarget
            .addEventListener(event, handler, this.supportPassive() ? { passive: true } : false));
    }
    /**
     * Feature-detect support for passive event listeners.
     *
     * @returns       Whether or not passive event listeners are supported
     */
    supportPassive() {
        let supportsPassive = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: () => {
                    supportsPassive = true;
                }
            });
            window.addEventListener('testPassive', null, opts);
            window.removeEventListener('testPassive', null, opts);
        }
        catch (e) {
        }
        return supportsPassive;
    }
    /**
     * Remove listeners for the Animation Interrupt Event from
     * the Listener Target. Specifying the correct handler prevents
     * memory leaks and makes the allocated memory available for
     * Garbage Collection.
     *
     * @param events            List of Interruptive Events to remove
     * @param listenerTarget    Target to attach the listener on
     * @param handler           Handler for when the listener fires
     * @returns                 Void
     */
    removeInterruptiveEventListeners(events, listenerTarget, handler) {
        if (!listenerTarget) {
            listenerTarget = window;
        }
        events.forEach(event => listenerTarget.removeEventListener(event, handler));
    }
    /**
     * Find the first scrollable parent Node of a given
     * Element. The DOM Tree gets searched upwards
     * to find this first scrollable parent. Parents might
     * be ignored by CSS styles applied to the HTML Element.
     *
     * @param nativeElement     The Element to search the DOM Tree upwards from
     * @returns                 The first scrollable parent HTML Element
     */
    getFirstScrollableParent(nativeElement) {
        let style = window.getComputedStyle(nativeElement);
        const overflowRegex = /(auto|scroll|overlay)/;
        if (style.position === 'fixed') {
            return null;
        }
        let parent = nativeElement;
        while (parent.parentElement) {
            parent = parent.parentElement;
            style = window.getComputedStyle(parent);
            if (style.position === 'absolute'
                || style.overflow === 'hidden'
                || style.overflowY === 'hidden') {
                continue;
            }
            if (overflowRegex.test(style.overflow + style.overflowY)
                || parent.tagName === 'BODY') {
                return parent;
            }
        }
        return null;
    }
    /**
     * Get the Target Node to scroll to.
     *
     * @param id              The given ID of the node, either a string or
     *                        an element reference
     * @param allowBodyTag    Indicate whether or not the Document Body is
     *                        considered a valid Target Node
     * @returns               The Target Node to scroll to
     */
    getNode(id, allowBodyTag = false) {
        let targetNode;
        if (isString(id)) {
            if (allowBodyTag && (id === 'body' || id === 'BODY')) {
                targetNode = this.document.body;
            }
            else {
                targetNode = this.document.getElementById(stripHash(id));
            }
        }
        else if (isNumber(id)) {
            targetNode = this.document.getElementById(String(id));
        }
        else if (isElementRef(id)) {
            targetNode = id.nativeElement;
        }
        else if (isNativeElement(id)) {
            targetNode = id;
        }
        return targetNode;
    }
    /**
     * Retrieve the Listener target. This Listener Target is used
     * to attach Event Listeners on. In case of the target being
     * the Document Body, we need the actual `window` to listen
     * for events.
     *
     * @param container           The HTML Container element
     * @returns                   The Listener Target to attach events on
     */
    getListenerTarget(container) {
        if (!container) {
            return null;
        }
        return this.isDocumentBody(container) ? window : container;
    }
    /**
     * Test if a given HTML Element is the Document Body.
     *
     * @param element             The given HTML Element
     * @returns                   Whether or not the Element is the
     *                            Document Body Element
     */
    isDocumentBody(element) {
        return element.tagName.toUpperCase() === 'BODY';
    }
};
ScrollToService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
ScrollToService = __decorate([
    Injectable(),
    __param(0, Inject(DOCUMENT)),
    __param(1, Inject(PLATFORM_ID))
], ScrollToService);
export { ScrollToService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXRvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmlja3ktbGVuYWVycy9uZ3gtc2Nyb2xsLXRvLyIsInNvdXJjZXMiOlsibGliL3Njcm9sbC10by5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2SCxPQUFPLEVBQWMsYUFBYSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU3RDs7Ozs7O0dBTUc7QUFFSCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBaUIxQjs7Ozs7T0FLRztJQUNILFlBQzRCLFFBQWEsRUFDVixVQUFlO1FBRGxCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDVixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBRTVDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxRQUFRLENBQUMsT0FBOEI7UUFFckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2QyxPQUFPLElBQUksYUFBYSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDM0M7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7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LFFBQVEsQ0FBQyxDQUFBO0lBQ2hCLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0dBekJYLGVBQWUsQ0FnVTNCO1NBaFVZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBTY3JvbGxUb0NvbmZpZ09wdGlvbnMsIFNjcm9sbFRvQ29uZmlnT3B0aW9uc1RhcmdldCwgU2Nyb2xsVG9MaXN0ZW5lclRhcmdldCwgU2Nyb2xsVG9UYXJnZXQgfSBmcm9tICcuL3Njcm9sbC10by1jb25maWcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNjcm9sbFRvQW5pbWF0aW9uIH0gZnJvbSAnLi9zY3JvbGwtdG8tYW5pbWF0aW9uJztcbmltcG9ydCB7IERFRkFVTFRTLCBpc0VsZW1lbnRSZWYsIGlzTmF0aXZlRWxlbWVudCwgaXNOdW1iZXIsIGlzU3RyaW5nLCBpc1dpbmRvdywgc3RyaXBIYXNoIH0gZnJvbSAnLi9zY3JvbGwtdG8taGVscGVycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogVGhlIFNjcm9sbCBUbyBTZXJ2aWNlIGhhbmRsZXMgc3RhcnRpbmcsIGludGVycnVwdGluZ1xuICogYW5kIGVuZGluZyB0aGUgYWN0dWFsIFNjcm9sbCBBbmltYXRpb24uIEl0IHByb3ZpZGVzXG4gKiBzb21lIHV0aWxpdGllcyB0byBmaW5kIHRoZSBwcm9wZXIgSFRNTCBFbGVtZW50IG9uIGFcbiAqIGdpdmVuIHBhZ2UgdG8gc2V0dXAgRXZlbnQgTGlzdGVuZXJzIGFuZCBjYWxjdWxhdGVcbiAqIGRpc3RhbmNlcyBmb3IgdGhlIEFuaW1hdGlvbi5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNjcm9sbFRvU2VydmljZSB7XG5cbiAgLyoqXG4gICAqIFRoZSBhbmltYXRpb24gdGhhdCBwcm92aWRlcyB0aGUgc2Nyb2xsaW5nXG4gICAqIHRvIGhhcHBlbiBzbW9vdGhseSBvdmVyIHRpbWUuIERlZmluaW5nIGl0IGhlcmVcbiAgICogYWxsb3dzIGZvciB1c2FnZSBvZiBlLmcuIGBzdGFydGAgYW5kIGBzdG9wYFxuICAgKiBtZXRob2RzIHdpdGhpbiB0aGlzIEFuZ3VsYXIgU2VydmljZS5cbiAgICovXG4gIHByaXZhdGUgYW5pbWF0aW9uOiBTY3JvbGxUb0FuaW1hdGlvbjtcblxuICAvKipcbiAgICogSW50ZXJydXB0aXZlIEV2ZW50cyBhbGxvdyB0byBzY3JvbGxpbmcgYW5pbWF0aW9uXG4gICAqIHRvIGJlIGludGVycnVwdGVkIGJlZm9yZSBpdCBpcyBmaW5pc2hlZC4gVGhlIGxpc3RcbiAgICogb2YgSW50ZXJydXB0aXZlIEV2ZW50cyByZXByZXNlbnRzIHRob3NlLlxuICAgKi9cbiAgcHJpdmF0ZSBpbnRlcnJ1cHRpdmVFdmVudHM6IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYW5kIHNldHVwIHJlcXVpcmVkIHBhcmF0ZW1ldGVycy5cbiAgICpcbiAgICogQHBhcmFtIGRvY3VtZW50ICAgICAgICAgQSBSZWZlcmVuY2UgdG8gdGhlIERvY3VtZW50XG4gICAqIEBwYXJhbSBwbGF0Zm9ybUlkICAgICAgIEFuZ3VsYXIgUGxhdGZvcm0gSURcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueVxuICApIHtcbiAgICB0aGlzLmludGVycnVwdGl2ZUV2ZW50cyA9IFsnbW91c2V3aGVlbCcsICdET01Nb3VzZVNjcm9sbCcsICd0b3VjaHN0YXJ0J107XG4gIH1cblxuICAvKipcbiAgICogVGFyZ2V0IGFuIEVsZW1lbnQgdG8gc2Nyb2xsIHRvLiBOb3RpY2UgdGhhdCB0aGUgYFRpbWVPdXRgIGRlY29yYXRvclxuICAgKiBlbnN1cmVzIHRoZSBleGVjdXRpbmcgdG8gdGFrZSBwbGFjZSBpbiB0aGUgbmV4dCBBbmd1bGFyIGxpZmVjeWNsZS5cbiAgICogVGhpcyBhbGxvd3MgZm9yIHNjcm9sbGluZyB0byBlbGVtZW50cyB0aGF0IGFyZSBlLmcuIGluaXRpYWxseSBoaWRkZW5cbiAgICogYnkgbWVhbnMgb2YgYCpuZ0lmYCwgYnV0IG91Z2h0IHRvIGJlIHNjcm9sbGVkIHRvIGV2ZW50dWFsbHkuXG4gICAqXG4gICAqIEB0b2RvIHR5cGUgJ2FueScgaW4gT2JzZXJ2YWJsZSBzaG91bGQgYmVjb21lIGN1c3RvbSB0eXBlIGxpa2UgJ1Njcm9sbFRvRXZlbnQnIChiYXNlIGNsYXNzKSwgc2VlIGlzc3VlIGNvbW1lbnQ6XG4gICAqICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWNreS1sZW5hZXJzL25neC1zY3JvbGwtdG8vaXNzdWVzLzEwI2lzc3VlY29tbWVudC0zMTcxOTg0ODFcbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgICAgICAgICBDb25maWd1cmF0aW9uIE9iamVjdFxuICAgKiBAcmV0dXJucyAgICAgICAgICAgICAgIE9ic2VydmFibGVcbiAgICovXG4gIHNjcm9sbFRvKG9wdGlvbnM6IFNjcm9sbFRvQ29uZmlnT3B0aW9ucyk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybiBuZXcgUmVwbGF5U3ViamVjdCgpLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnN0YXJ0KG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGEgbmV3IEFuaW1hdGlvbi5cbiAgICpcbiAgICogQHRvZG8gRW1pdCBwcm9wZXIgZXZlbnRzIGZyb20gc3Vic2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zICAgICAgICAgQ29uZmlndXJhdGlvbiBPYmplY3RcbiAgICogQHJldHVybnMgICAgICAgICAgICAgICBPYnNlcnZhYmxlXG4gICAqL1xuICBwcml2YXRlIHN0YXJ0KG9wdGlvbnM6IFNjcm9sbFRvQ29uZmlnT3B0aW9ucyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG5cbiAgICAvLyBNZXJnZSBjb25maWcgd2l0aCBkZWZhdWx0IHZhbHVlc1xuICAgIGNvbnN0IG1lcmdlZENvbmZpZ09wdGlvbnMgPSB7XG4gICAgICAuLi5ERUZBVUxUUyBhcyBTY3JvbGxUb0NvbmZpZ09wdGlvbnMsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfSBhcyBTY3JvbGxUb0NvbmZpZ09wdGlvbnNUYXJnZXQ7XG5cbiAgICBpZiAodGhpcy5hbmltYXRpb24pIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uLnN0b3AoKTtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXROb2RlID0gdGhpcy5nZXROb2RlKG1lcmdlZENvbmZpZ09wdGlvbnMudGFyZ2V0KTtcbiAgICBpZiAobWVyZ2VkQ29uZmlnT3B0aW9ucy50YXJnZXQgJiYgIXRhcmdldE5vZGUpIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKCdVbmFibGUgdG8gZmluZCBUYXJnZXQgRWxlbWVudCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSB0aGlzLmdldENvbnRhaW5lcihtZXJnZWRDb25maWdPcHRpb25zLCB0YXJnZXROb2RlKTtcbiAgICBpZiAobWVyZ2VkQ29uZmlnT3B0aW9ucy5jb250YWluZXIgJiYgIWNvbnRhaW5lcikge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IoJ1VuYWJsZSB0byBmaW5kIENvbnRhaW5lciBFbGVtZW50Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgbGlzdGVuZXJUYXJnZXQgPSB0aGlzLmdldExpc3RlbmVyVGFyZ2V0KGNvbnRhaW5lcikgfHwgd2luZG93O1xuXG4gICAgbGV0IHRvID0gY29udGFpbmVyID8gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA6IDA7XG5cbiAgICBpZiAodGFyZ2V0Tm9kZSkge1xuICAgICAgdG8gPSBpc1dpbmRvdyhsaXN0ZW5lclRhcmdldCkgP1xuICAgICAgICB3aW5kb3cuc2Nyb2xsWSArIHRhcmdldE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDpcbiAgICAgICAgdGFyZ2V0Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIEFuaW1hdGlvblxuICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IFNjcm9sbFRvQW5pbWF0aW9uKFxuICAgICAgY29udGFpbmVyLFxuICAgICAgbGlzdGVuZXJUYXJnZXQsXG4gICAgICBpc1dpbmRvdyhsaXN0ZW5lclRhcmdldCksXG4gICAgICB0byxcbiAgICAgIG1lcmdlZENvbmZpZ09wdGlvbnMsXG4gICAgICBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpXG4gICAgKTtcbiAgICBjb25zdCBvbkludGVycnVwdCA9ICgpID0+IHRoaXMuYW5pbWF0aW9uLnN0b3AoKTtcbiAgICB0aGlzLmFkZEludGVycnVwdGl2ZUV2ZW50TGlzdGVuZXJzKGxpc3RlbmVyVGFyZ2V0LCBvbkludGVycnVwdCk7XG5cbiAgICAvLyBTdGFydCBBbmltYXRpb25cbiAgICBjb25zdCBhbmltYXRpb24kID0gdGhpcy5hbmltYXRpb24uc3RhcnQoKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvQW5pbWF0aW9uKGFuaW1hdGlvbiQsIGxpc3RlbmVyVGFyZ2V0LCBvbkludGVycnVwdCk7XG5cbiAgICByZXR1cm4gYW5pbWF0aW9uJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGV2ZW50cyBlbWl0dGVkIGZyb20gdGhlIFNjcm9sbGluZ1xuICAgKiBBbmltYXRpb24uIEV2ZW50cyBtaWdodCBiZSB1c2VkIGZvciBlLmcuIHVuc3Vic2NyaWJpbmdcbiAgICogb25jZSBmaW5pc2hlZC5cbiAgICpcbiAgICogQHBhcmFtIGFuaW1hdGlvbiQgICAgICAgICAgICAgIFRoZSBBbmltYXRpb24gT2JzZXJ2YWJsZVxuICAgKiBAcGFyYW0gbGlzdGVuZXJUYXJnZXQgICAgICAgICAgVGhlIExpc3RlbmVyIFRhcmdldCBmb3IgZXZlbnRzXG4gICAqIEBwYXJhbSBvbkludGVycnVwdCAgICAgICAgICAgICBUaGUgaGFuZGxlciBmb3IgSW50ZXJydXB0aXZlIEV2ZW50c1xuICAgKiBAcmV0dXJucyAgICAgICAgICAgICAgICAgICAgICAgVm9pZFxuICAgKi9cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0FuaW1hdGlvbihcbiAgICBhbmltYXRpb24kOiBPYnNlcnZhYmxlPGFueT4sXG4gICAgbGlzdGVuZXJUYXJnZXQ6IFNjcm9sbFRvTGlzdGVuZXJUYXJnZXQsXG4gICAgb25JbnRlcnJ1cHQ6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3RcbiAgKSB7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gYW5pbWF0aW9uJFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUludGVycnVwdGl2ZUV2ZW50TGlzdGVuZXJzKHRoaXMuaW50ZXJydXB0aXZlRXZlbnRzLCBsaXN0ZW5lclRhcmdldCwgb25JbnRlcnJ1cHQpO1xuICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29udGFpbmVyIEhUTUwgRWxlbWVudCBpbiB3aGljaFxuICAgKiB0aGUgc2Nyb2xsaW5nIHNob3VsZCBoYXBwZW4uXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zICAgICAgICAgVGhlIE1lcmdlZCBDb25maWd1cmF0aW9uIE9iamVjdFxuICAgKiBAcGFyYW0gdGFyZ2V0Tm9kZSAgICB0aGUgdGFyZ2V0ZWQgSFRNTEVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgZ2V0Q29udGFpbmVyKG9wdGlvbnM6IFNjcm9sbFRvQ29uZmlnT3B0aW9ucywgdGFyZ2V0Tm9kZTogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuXG4gICAgbGV0IGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAgIGlmIChvcHRpb25zLmNvbnRhaW5lcikge1xuICAgICAgY29udGFpbmVyID0gdGhpcy5nZXROb2RlKG9wdGlvbnMuY29udGFpbmVyLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldE5vZGUpIHtcbiAgICAgIGNvbnRhaW5lciA9IHRoaXMuZ2V0Rmlyc3RTY3JvbGxhYmxlUGFyZW50KHRhcmdldE5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXI7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGxpc3RlbmVycyBmb3IgdGhlIEFuaW1hdGlvbiBJbnRlcnJ1cHRpdmUgRXZlbnRzXG4gICAqIHRvIHRoZSBMaXN0ZW5lciBUYXJnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudHMgICAgICAgICAgICBMaXN0IG9mIGV2ZW50cyB0byBsaXN0ZW4gdG9cbiAgICogQHBhcmFtIGxpc3RlbmVyVGFyZ2V0ICAgIFRhcmdldCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIG9uXG4gICAqIEBwYXJhbSBoYW5kbGVyICAgICAgICAgICBIYW5kbGVyIGZvciB3aGVuIHRoZSBsaXN0ZW5lciBmaXJlc1xuICAgKiBAcmV0dXJucyAgICAgICAgICAgICAgICAgVm9pZFxuICAgKi9cbiAgcHJpdmF0ZSBhZGRJbnRlcnJ1cHRpdmVFdmVudExpc3RlbmVycyhcbiAgICBsaXN0ZW5lclRhcmdldDogU2Nyb2xsVG9MaXN0ZW5lclRhcmdldCxcbiAgICBoYW5kbGVyOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KTogdm9pZCB7XG5cbiAgICBpZiAoIWxpc3RlbmVyVGFyZ2V0KSB7XG4gICAgICBsaXN0ZW5lclRhcmdldCA9IHdpbmRvdztcbiAgICB9XG5cbiAgICB0aGlzLmludGVycnVwdGl2ZUV2ZW50c1xuICAgICAgLmZvckVhY2goZXZlbnQgPT4gbGlzdGVuZXJUYXJnZXRcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIHRoaXMuc3VwcG9ydFBhc3NpdmUoKSA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlKSk7XG4gIH1cblxuICAvKipcbiAgICogRmVhdHVyZS1kZXRlY3Qgc3VwcG9ydCBmb3IgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMuXG4gICAqXG4gICAqIEByZXR1cm5zICAgICAgIFdoZXRoZXIgb3Igbm90IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzIGFyZSBzdXBwb3J0ZWRcbiAgICovXG4gIHByaXZhdGUgc3VwcG9ydFBhc3NpdmUoKTogYm9vbGVhbiB7XG5cbiAgICBsZXQgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlJywgbnVsbCwgb3B0cyk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdFBhc3NpdmUnLCBudWxsLCBvcHRzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgbGlzdGVuZXJzIGZvciB0aGUgQW5pbWF0aW9uIEludGVycnVwdCBFdmVudCBmcm9tXG4gICAqIHRoZSBMaXN0ZW5lciBUYXJnZXQuIFNwZWNpZnlpbmcgdGhlIGNvcnJlY3QgaGFuZGxlciBwcmV2ZW50c1xuICAgKiBtZW1vcnkgbGVha3MgYW5kIG1ha2VzIHRoZSBhbGxvY2F0ZWQgbWVtb3J5IGF2YWlsYWJsZSBmb3JcbiAgICogR2FyYmFnZSBDb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnRzICAgICAgICAgICAgTGlzdCBvZiBJbnRlcnJ1cHRpdmUgRXZlbnRzIHRvIHJlbW92ZVxuICAgKiBAcGFyYW0gbGlzdGVuZXJUYXJnZXQgICAgVGFyZ2V0IHRvIGF0dGFjaCB0aGUgbGlzdGVuZXIgb25cbiAgICogQHBhcmFtIGhhbmRsZXIgICAgICAgICAgIEhhbmRsZXIgZm9yIHdoZW4gdGhlIGxpc3RlbmVyIGZpcmVzXG4gICAqIEByZXR1cm5zICAgICAgICAgICAgICAgICBWb2lkXG4gICAqL1xuICBwcml2YXRlIHJlbW92ZUludGVycnVwdGl2ZUV2ZW50TGlzdGVuZXJzKFxuICAgIGV2ZW50czogc3RyaW5nW10sXG4gICAgbGlzdGVuZXJUYXJnZXQ6IFNjcm9sbFRvTGlzdGVuZXJUYXJnZXQsXG4gICAgaGFuZGxlcjogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCk6IHZvaWQge1xuXG4gICAgaWYgKCFsaXN0ZW5lclRhcmdldCkge1xuICAgICAgbGlzdGVuZXJUYXJnZXQgPSB3aW5kb3c7XG4gICAgfVxuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IGxpc3RlbmVyVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBmaXJzdCBzY3JvbGxhYmxlIHBhcmVudCBOb2RlIG9mIGEgZ2l2ZW5cbiAgICogRWxlbWVudC4gVGhlIERPTSBUcmVlIGdldHMgc2VhcmNoZWQgdXB3YXJkc1xuICAgKiB0byBmaW5kIHRoaXMgZmlyc3Qgc2Nyb2xsYWJsZSBwYXJlbnQuIFBhcmVudHMgbWlnaHRcbiAgICogYmUgaWdub3JlZCBieSBDU1Mgc3R5bGVzIGFwcGxpZWQgdG8gdGhlIEhUTUwgRWxlbWVudC5cbiAgICpcbiAgICogQHBhcmFtIG5hdGl2ZUVsZW1lbnQgICAgIFRoZSBFbGVtZW50IHRvIHNlYXJjaCB0aGUgRE9NIFRyZWUgdXB3YXJkcyBmcm9tXG4gICAqIEByZXR1cm5zICAgICAgICAgICAgICAgICBUaGUgZmlyc3Qgc2Nyb2xsYWJsZSBwYXJlbnQgSFRNTCBFbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGdldEZpcnN0U2Nyb2xsYWJsZVBhcmVudChuYXRpdmVFbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcblxuICAgIGxldCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgY29uc3Qgb3ZlcmZsb3dSZWdleDogUmVnRXhwID0gLyhhdXRvfHNjcm9sbHxvdmVybGF5KS87XG5cbiAgICBpZiAoc3R5bGUucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBwYXJlbnQgPSBuYXRpdmVFbGVtZW50O1xuICAgIHdoaWxlIChwYXJlbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHBhcmVudCk7XG5cbiAgICAgIGlmIChzdHlsZS5wb3NpdGlvbiA9PT0gJ2Fic29sdXRlJ1xuICAgICAgICB8fCBzdHlsZS5vdmVyZmxvdyA9PT0gJ2hpZGRlbidcbiAgICAgICAgfHwgc3R5bGUub3ZlcmZsb3dZID09PSAnaGlkZGVuJykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG92ZXJmbG93UmVnZXgudGVzdChzdHlsZS5vdmVyZmxvdyArIHN0eWxlLm92ZXJmbG93WSlcbiAgICAgICAgfHwgcGFyZW50LnRhZ05hbWUgPT09ICdCT0RZJykge1xuICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgVGFyZ2V0IE5vZGUgdG8gc2Nyb2xsIHRvLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgIFRoZSBnaXZlbiBJRCBvZiB0aGUgbm9kZSwgZWl0aGVyIGEgc3RyaW5nIG9yXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgYW4gZWxlbWVudCByZWZlcmVuY2VcbiAgICogQHBhcmFtIGFsbG93Qm9keVRhZyAgICBJbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCB0aGUgRG9jdW1lbnQgQm9keSBpc1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNpZGVyZWQgYSB2YWxpZCBUYXJnZXQgTm9kZVxuICAgKiBAcmV0dXJucyAgICAgICAgICAgICAgIFRoZSBUYXJnZXQgTm9kZSB0byBzY3JvbGwgdG9cbiAgICovXG4gIHByaXZhdGUgZ2V0Tm9kZShpZDogU2Nyb2xsVG9UYXJnZXQsIGFsbG93Qm9keVRhZzogYm9vbGVhbiA9IGZhbHNlKTogSFRNTEVsZW1lbnQge1xuXG4gICAgbGV0IHRhcmdldE5vZGU6IEhUTUxFbGVtZW50O1xuXG4gICAgaWYgKGlzU3RyaW5nKGlkKSkge1xuICAgICAgaWYgKGFsbG93Qm9keVRhZyAmJiAoaWQgPT09ICdib2R5JyB8fCBpZCA9PT0gJ0JPRFknKSkge1xuICAgICAgICB0YXJnZXROb2RlID0gdGhpcy5kb2N1bWVudC5ib2R5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0Tm9kZSA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3RyaXBIYXNoKGlkKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc051bWJlcihpZCkpIHtcbiAgICAgIHRhcmdldE5vZGUgPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFN0cmluZyhpZCkpO1xuICAgIH0gZWxzZSBpZiAoaXNFbGVtZW50UmVmKGlkKSkge1xuICAgICAgdGFyZ2V0Tm9kZSA9IGlkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmIChpc05hdGl2ZUVsZW1lbnQoaWQpKSB7XG4gICAgICB0YXJnZXROb2RlID0gaWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldE5vZGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIExpc3RlbmVyIHRhcmdldC4gVGhpcyBMaXN0ZW5lciBUYXJnZXQgaXMgdXNlZFxuICAgKiB0byBhdHRhY2ggRXZlbnQgTGlzdGVuZXJzIG9uLiBJbiBjYXNlIG9mIHRoZSB0YXJnZXQgYmVpbmdcbiAgICogdGhlIERvY3VtZW50IEJvZHksIHdlIG5lZWQgdGhlIGFjdHVhbCBgd2luZG93YCB0byBsaXN0ZW5cbiAgICogZm9yIGV2ZW50cy5cbiAgICpcbiAgICogQHBhcmFtIGNvbnRhaW5lciAgICAgICAgICAgVGhlIEhUTUwgQ29udGFpbmVyIGVsZW1lbnRcbiAgICogQHJldHVybnMgICAgICAgICAgICAgICAgICAgVGhlIExpc3RlbmVyIFRhcmdldCB0byBhdHRhY2ggZXZlbnRzIG9uXG4gICAqL1xuICBwcml2YXRlIGdldExpc3RlbmVyVGFyZ2V0KGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiBTY3JvbGxUb0xpc3RlbmVyVGFyZ2V0IHtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzRG9jdW1lbnRCb2R5KGNvbnRhaW5lcikgPyB3aW5kb3cgOiBjb250YWluZXI7XG4gIH1cblxuICAvKipcbiAgICogVGVzdCBpZiBhIGdpdmVuIEhUTUwgRWxlbWVudCBpcyB0aGUgRG9jdW1lbnQgQm9keS5cbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnQgICAgICAgICAgICAgVGhlIGdpdmVuIEhUTUwgRWxlbWVudFxuICAgKiBAcmV0dXJucyAgICAgICAgICAgICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgRWxlbWVudCBpcyB0aGVcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9jdW1lbnQgQm9keSBFbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGlzRG9jdW1lbnRCb2R5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogZWxlbWVudCBpcyBIVE1MQm9keUVsZW1lbnQge1xuICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0JPRFknO1xuICB9XG59XG4iXX0=