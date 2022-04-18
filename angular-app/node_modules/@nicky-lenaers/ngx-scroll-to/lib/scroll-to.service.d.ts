import { ScrollToConfigOptions } from './scroll-to-config.interface';
import { Observable } from 'rxjs';
/**
 * The Scroll To Service handles starting, interrupting
 * and ending the actual Scroll Animation. It provides
 * some utilities to find the proper HTML Element on a
 * given page to setup Event Listeners and calculate
 * distances for the Animation.
 */
import * as ɵngcc0 from '@angular/core';
export declare class ScrollToService {
    private document;
    private platformId;
    /**
     * The animation that provides the scrolling
     * to happen smoothly over time. Defining it here
     * allows for usage of e.g. `start` and `stop`
     * methods within this Angular Service.
     */
    private animation;
    /**
     * Interruptive Events allow to scrolling animation
     * to be interrupted before it is finished. The list
     * of Interruptive Events represents those.
     */
    private interruptiveEvents;
    /**
     * Construct and setup required paratemeters.
     *
     * @param document         A Reference to the Document
     * @param platformId       Angular Platform ID
     */
    constructor(document: any, platformId: any);
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
    scrollTo(options: ScrollToConfigOptions): Observable<any>;
    /**
     * Start a new Animation.
     *
     * @todo Emit proper events from subscription
     *
     * @param options         Configuration Object
     * @returns               Observable
     */
    private start;
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
    private subscribeToAnimation;
    /**
     * Get the container HTML Element in which
     * the scrolling should happen.
     *
     * @param options         The Merged Configuration Object
     * @param targetNode    the targeted HTMLElement
     */
    private getContainer;
    /**
     * Add listeners for the Animation Interruptive Events
     * to the Listener Target.
     *
     * @param events            List of events to listen to
     * @param listenerTarget    Target to attach the listener on
     * @param handler           Handler for when the listener fires
     * @returns                 Void
     */
    private addInterruptiveEventListeners;
    /**
     * Feature-detect support for passive event listeners.
     *
     * @returns       Whether or not passive event listeners are supported
     */
    private supportPassive;
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
    private removeInterruptiveEventListeners;
    /**
     * Find the first scrollable parent Node of a given
     * Element. The DOM Tree gets searched upwards
     * to find this first scrollable parent. Parents might
     * be ignored by CSS styles applied to the HTML Element.
     *
     * @param nativeElement     The Element to search the DOM Tree upwards from
     * @returns                 The first scrollable parent HTML Element
     */
    private getFirstScrollableParent;
    /**
     * Get the Target Node to scroll to.
     *
     * @param id              The given ID of the node, either a string or
     *                        an element reference
     * @param allowBodyTag    Indicate whether or not the Document Body is
     *                        considered a valid Target Node
     * @returns               The Target Node to scroll to
     */
    private getNode;
    /**
     * Retrieve the Listener target. This Listener Target is used
     * to attach Event Listeners on. In case of the target being
     * the Document Body, we need the actual `window` to listen
     * for events.
     *
     * @param container           The HTML Container element
     * @returns                   The Listener Target to attach events on
     */
    private getListenerTarget;
    /**
     * Test if a given HTML Element is the Document Body.
     *
     * @param element             The given HTML Element
     * @returns                   Whether or not the Element is the
     *                            Document Body Element
     */
    private isDocumentBody;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<ScrollToService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<ScrollToService>;
}

//# sourceMappingURL=scroll-to.service.d.ts.map