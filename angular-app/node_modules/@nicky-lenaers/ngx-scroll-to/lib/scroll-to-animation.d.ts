import { Observable } from 'rxjs';
import { ScrollToConfigOptions, ScrollToListenerTarget } from './scroll-to-config.interface';
/** Scroll To Animation */
export declare class ScrollToAnimation {
    private container;
    private listenerTarget;
    private readonly isWindow;
    private readonly to;
    private readonly options;
    private isBrowser;
    /** Number of milliseconds for each Tick */
    private tick;
    /** Interval */
    private interval;
    /** Time Lapsed in milliseconds */
    private timeLapsed;
    /** Percentage of time lapsed */
    private percentage;
    /** Position of the Element */
    private position;
    /** Last Element Position */
    private lastPosition;
    /** Start Position of the Element */
    private startPosition;
    /** The Distance to scroll */
    private distance;
    /** Observable Source */
    private source$;
    /** Scroll Top of the Window */
    private windowScrollTop;
    /** Mapped Offset taken from the active Offset Map */
    private mappedOffset;
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
    constructor(container: HTMLElement, listenerTarget: ScrollToListenerTarget, isWindow: boolean, to: number, options: ScrollToConfigOptions, isBrowser: boolean);
    /**
     * Start the new Scroll Animation.
     *
     * @returns         Observable containing a number
     */
    start(): Observable<number>;
    /**
     * Stop the current Scroll Animation Loop.
     *
     * @param force          Force to stop the Animation Loop
     * @returns               Void
     */
    stop(): void;
    /** Recursively loop over the Scroll Animation */
    private loop;
}
